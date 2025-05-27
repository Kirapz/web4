import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const OrdersPage = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setOrders(data);
      setError("");
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Не вдалося завантажити замовлення");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setError("Увійдіть, будь ласка");
        setLoading(false);
        return;
      }
      await fetchOrders();
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order.status === "processing" || order.status === "delivering") {
            const remainingTime = order.expectedDeliveryTime - Date.now();
            if (remainingTime <= 0) {
              return { ...order, status: "delivered" };
            }
          }
          return order;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [orders]);

  const confirmOrderReceived = async (orderId) => {
    try {
      const token = await user.getIdToken();
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}/confirm`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to confirm order");
      await fetchOrders();
    } catch (err) {
      console.error("Error confirming order:", err);
      setError("Сталася помилка при підтвердженні отримання");
    }
  };

  if (!user) return <p>Увійдіть, щоб переглянути замовлення</p>;
  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="orders-container">
      <h2 className="orders-title">Історія замовлень</h2>
      {orders.length === 0 ? (
        <p>Замовлень поки що немає.</p>
      ) : (
        orders.map((order, orderIndex) => {
          const remainingTime = order.expectedDeliveryTime - Date.now();
          const timeLeft = remainingTime > 0 ? Math.ceil(remainingTime / 1000) : 0;
          return (
            <div key={order.id || orderIndex} className="order-block">
              <div className="order-header">
                <h4>Замовлення #{orders.length - orderIndex}</h4>
                <p className={`order-status ${order.status}`}>
                  {order.status === "processing" || order.status === "delivering"
                    ? `Доставляється (${timeLeft}с)`
                    : order.status === "delivered"
                    ? "Доставлено"
                    : order.status === "received"
                    ? "Отримано"
                    : order.status}
                </p>
                {order.status === "delivered" && (
                  <button className="order-btn" onClick={() => confirmOrderReceived(order.id)}>
                    Підтвердити отримання
                  </button>
                )}
              </div>
              <table className="order-table">
                <thead>
                  <tr>
                    <th>Товар</th>
                    <th>Ціна</th>
                    <th>Опис</th>
                  </tr>
                </thead>
                <tbody>
                  {(order.dishes || []).map((item, itemIndex) => (
                    <tr key={itemIndex}>
                      <td>{item.name}</td>
                      <td>{item.price || "—"} грн</td>
                      <td>{item.details || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })
      )}
    </div>
  );
};

export default OrdersPage;
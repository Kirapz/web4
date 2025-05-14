import React, { useEffect, useState } from "react";

const DELIVERY_TIME = 30; // у секундах

const OrdersPage = ({ orders }) => {
  const [timers, setTimers] = useState({});
  const [showDescriptions, setShowDescriptions] = useState({});

  // Завантаження стартових таймерів
  useEffect(() => {
    const storedTimers = JSON.parse(localStorage.getItem("orderTimers") || "{}");
    setTimers(storedTimers);
  }, []);

  // Оновлення таймерів кожну секунду
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const updated = { ...prev };

        Object.keys(updated).forEach((orderKey) => {
          const timer = updated[orderKey];
          if (!timer.delivered) {
            const elapsed = Math.floor((Date.now() - timer.startTime) / 1000);
            const remaining = DELIVERY_TIME - elapsed;

            if (remaining <= 0) {
              updated[orderKey].delivered = true;
              updated[orderKey].remaining = 0;
            } else {
              updated[orderKey].remaining = remaining;
            }
          }
        });

        localStorage.setItem("orderTimers", JSON.stringify(updated));
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleDescription = (orderIndex, itemIndex) => {
    const key = `${orderIndex}-${itemIndex}`;
    setShowDescriptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">Історія замовлень</h2>
      {orders.length === 0 ? (
        <p>Замовлень поки що немає.</p>
      ) : (
        orders.map((order, orderIndex) => {
          const orderKey = `order-${orderIndex}`;
          const timer = timers[orderKey];
          const isDelivered = timer?.delivered;

          return (
            <div key={orderIndex} className="order-block">
              <div className="order-header">
                <h4>Замовлення #{orderIndex + 1}</h4>
                {timer ? (
                  <p className="order-status">
                    Статус:{" "}
                    {isDelivered ? (
                      <span className="delivered">Доставлено</span>
                    ) : (
                      <>Очікує ({timer.remaining ?? DELIVERY_TIME} сек)</>
                    )}
                  </p>
                ) : (
                  <p className="order-status">Статус: Обробляється</p>
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
                  {order.map((item, itemIndex) => {
                    const descKey = `${orderIndex}-${itemIndex}`;
                    return (
                      <tr key={itemIndex}>
                        <td className="item-name">
                          <img src={`images/${item.image}`} alt={item.name} />
                          <span>{item.name}</span>
                        </td>
                        <td>{item.price} грн</td>
                        <td>
                          {item.details ? (
                            <>
                              <button
                                className="cart-btn"
                                onClick={() => toggleDescription(orderIndex, itemIndex)}
                              >
                                {showDescriptions[descKey] ? "Сховати" : "Переглянути"}
                              </button>
                              {showDescriptions[descKey] && (
                                <p style={{ marginTop: "8px" }}>{item.details}</p>
                              )}
                            </>
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    );
                  })}
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

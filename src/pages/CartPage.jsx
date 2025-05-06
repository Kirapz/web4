import React from "react";

const CartPage = ({ cartItems, onPlaceOrder, onRemoveFromCart }) => {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Ваш кошик</h2>
      {cartItems.length === 0 ? (
        <p>Кошик порожній.</p>
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
            {cartItems.map((item, index) => (
              <div
                key={index}
                style={{
                  width: "200px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "10px",
                  textAlign: "center",
                  backgroundColor: "white",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={`images/${item.image}`}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <h4>{item.name}</h4>
                <p style={{ color: "#f48fb1", fontWeight: "bold" }}>
                  {item.price} грн
                </p>
                <button
                  onClick={() => onRemoveFromCart(item.id)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#ff6347",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  Видалити
                </button>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: "20px" }}>Загалом до сплати: {totalPrice} грн</h3>

          <button
            onClick={onPlaceOrder}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#f48fb1",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              color: "white",
              fontSize: "16px",
            }}
          >
            Оформити замовлення
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;

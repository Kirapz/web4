import React from "react";

const OrdersPage = ({ orders }) => {
  return (
    <div style={{ padding: "20px" }}>
      <div style = {{textAlign: "center"}}>
      <h2>Історія замовлень </h2>
        </div>
      {orders.length === 0 ? (
        <p>Замовлень поки що немає.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            style={{ 
              marginBottom: "30px",
              padding: "15px",
              border: "2px solid #f48fb1",
              borderRadius: "10px",
              backgroundColor: "#fff0f5",
              margin : "15px 300px"
            }}
          >
            <h4>Замовлення #{index + 1}</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginTop: "10px" }}>
              {order.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    
                    width: "150px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "8px",
                    textAlign: "center",
                    backgroundColor: "white",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <img
                   src={`images/${item.image}`} 
                    alt={item.name}
                    style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                  />
                  <p style={{ margin: "5px 0" }}>{item.name}</p>
                  <p style={{ color: "#f48fb1", fontWeight: "bold" }}>{item.price} грн</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;

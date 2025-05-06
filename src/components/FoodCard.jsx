import React from "react";

const FoodCard = ({ item, onAdd }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "500px",
        height: "500px", 
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        textAlign: "center",
        display: "flex",        
        flexDirection: "column", 
        justifyContent: "space-between", 
        transition: "transform 0.2s ease",
       margin: "10px"
      
      }}

      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    >
      <img
        src={`images/${item.image}`}
        alt={item.name}
        style={{
          width: "100%",
          height: "300px",
          objectFit: "cover",
          borderRadius: "4px"
        }}
      />
      <h4>{item.name}</h4>
      <p>{item.price} грн</p>
      <button
        onClick={() => onAdd(item)}
        style={{
          padding: "10px 12px",
          backgroundColor: "#f48fb1",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "background-color 0.3s"
        }}
        onMouseEnter={e => e.target.style.backgroundColor = "#ec407a"}
        onMouseLeave={e => e.target.style.backgroundColor = "#f48fb1"}
      >
        Додати в кошик
      </button>
    </div>
  );
};

export default FoodCard;

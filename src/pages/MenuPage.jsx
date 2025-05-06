import React, { useState } from "react";
import foodData from "../data/foodData";
import FoodCard from "../components/FoodCard";

const MenuPage = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState("всі");

  const categories = ["всі", "торти", "еклери", "круасан", "тістечка", "печево", "напої"];

  const filteredItems = selectedCategory === "всі"
    ? foodData
    : foodData.filter(item => item.category === selectedCategory);

  return (
    <div style={{ padding: "20px" }}>
        
        <div style = {{textAlign: "center"}}>
      <h2>Меню кондитерської </h2>
        </div>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              margin: "5px",
              padding: "8px 16px",
              backgroundColor: selectedCategory === cat ? "#ffb6c1" : "#e0e0e0",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center"  }}>
      {filteredItems.map(item => (
  <FoodCard key={item.id} item={item} onAdd={onAddToCart} />
        ))}  
      </div>
    </div>
  );
};

export default MenuPage;

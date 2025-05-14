import React, { useState } from "react";

const FoodCard = ({ item, onAdd }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`food-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={`images/${item.image}`} alt={item.name} className="food-card-image" />
      <h4>{item.name}</h4>
      <p>{item.price} грн</p>
      <button onClick={() => onAdd(item)} className="food-card-btn">
        Додати в кошик
      </button>
    </div>
  );
};

export const CustomOrderCard = ({ onAdd }) => {
  const [customOrder, setCustomOrder] = useState({
    flavor: "",
    weight: 500,
    design: "",
  });

  const handleCustomOrderSubmit = (e) => {
    e.preventDefault();

    const basePrice = 300;
    const weightMultiplier = customOrder.weight / 500;
    const finalPrice = basePrice * weightMultiplier;

    const customItem = {
      id: Date.now(),
      name: `Індивідуальне замовлення`,
      price: finalPrice,
      details: `Смак: ${customOrder.flavor}, Вага: ${customOrder.weight} г, Дизайн: ${customOrder.design}`,
      image: "custom_cake.jpg",
    };

    onAdd(customItem);
    setCustomOrder({ flavor: "", weight: 500, design: "" });
  };

  return (
    <div className="food-card custom-order-card">
      <img
        src="/images/custom_cake.jpg"
        alt="Індивідуальне замовлення"
        className="custom-order-image"
      />
      <h4>Індивідуальне замовлення</h4>
      <form className="custom-order-form" onSubmit={handleCustomOrderSubmit}>
        <select
          value={customOrder.flavor}
          onChange={(e) => setCustomOrder({ ...customOrder, flavor: e.target.value })}
          required
        >
          <option value="">Оберіть смак</option>
          <option value="Шоколадний">Шоколадний</option>
          <option value="Ванільний">Ванільний</option>
          <option value="Полуничний">Полуничний</option>
        </select>
        <select
          value={customOrder.weight}
          onChange={(e) => setCustomOrder({ ...customOrder, weight: parseInt(e.target.value) })}
          required
        >
          <option value={500}>500 г</option>
          <option value={1000}>1000 г</option>
          <option value={1500}>1500 г</option>
          <option value={2000}>2000 г</option>
        </select>
        <input
          type="text"
          placeholder="Дизайн"
          value={customOrder.design}
          onChange={(e) => setCustomOrder({ ...customOrder, design: e.target.value })}
          required
        />
        <button type="submit" className="food-card-btn">
          Додати індивідуальне замовлення
        </button>
      </form>
    </div>
  );
};


export default FoodCard;

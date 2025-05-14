import React, { useState } from "react";

const CartPage = ({ cartItems, onPlaceOrder, onRemoveFromCart, user }) => {
  const [visibleDescriptions, setVisibleDescriptions] = useState({});

  const toggleDescription = (id) => {
    setVisibleDescriptions((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price, 0);
  };

  return (
    <div className="cart-page">
      <h2>Ваш кошик</h2>
      {cartItems.length === 0 ? (
        <p>Кошик порожній.</p>
      ) : (
        <div>
          <div className="cart-grid">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={item.image ? `images/${item.image}` : "/images/default.jpg"}
                  alt={item.name}
                  className="cart-item-image"
                />
                <h4>{item.name}</h4>
                {item.details && (
                  <>
                    <button
                      onClick={() => toggleDescription(item.id)}
                      className="cart-item-description-btn"
                    >
                      Опис
                    </button>
                    {visibleDescriptions[item.id] && (
                      <p className="cart-item-details">{item.details}</p>
                    )}
                  </>
                )}
                <p className="cart-item-price">{item.price} грн</p>
                <button
                  onClick={() => onRemoveFromCart(item.id)}
                  className="cart-item-remove-btn"
                >
                  Видалити
                </button>
              </div>
            ))}
          </div>

          <h3 className="cart-total">Загалом до сплати: {calculateTotalPrice()} грн</h3>
            {user ? (
          <button onClick={onPlaceOrder} className="cart-place-order-btn">
            Оформити замовлення
          </button> ) : (
            <div className="cart-login-prompt">
              <p>Будь ласка, увійдіть, щоб оформити замовлення!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;

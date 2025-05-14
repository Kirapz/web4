import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import AuthPage from "./pages/AuthPage";
// import { uploadMenuData } from "./uploadMenuData";


import './App.css';

const App = () => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const [message, setMessage] = useState("");    
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    showMessage("Товар додано до кошика!");
  };

  
  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex(item => item.id === productId);
      if (itemIndex !== -1) {
        return [
          ...prevItems.slice(0, itemIndex),
          ...prevItems.slice(itemIndex + 1),
        ];
      }
      return prevItems;
    });
    showMessage("Товар видалено з кошика!");
  };
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  //  useEffect(() => {
  //   uploadMenuData(); // Run once to upload data
  // }, []);

const handlePlaceOrder = () => {
  if (!user) {
    showMessage("Будь ласка, увійдіть, щоб оформити замовлення!");
    return;
  }
  if (cartItems.length === 0) {
    showMessage("Кошик порожній!");
    return;
  }

 

  const newOrders = [...orders, cartItems];
  setOrders(newOrders);
  setCartItems([]);
  showMessage("Замовлення успішно оформлено!");

  const orderTimers = JSON.parse(localStorage.getItem("orderTimers") || "{}");
  const newOrderIndex = newOrders.length - 1;

  orderTimers[`order-${newOrderIndex}`] = {
    startTime: Date.now(),
    delivered: false,
    remaining: 30
  };

  localStorage.setItem("orderTimers", JSON.stringify(orderTimers));
};



  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000); // 2 секунди
  };

  

 return (
    <div className="App">
      <nav className="navbar">
        <ul>
          <li><Link to="/home">Головна</Link></li>
          <li><Link to="/menu">Меню</Link></li>
          <li><Link to="/cart">Кошик</Link></li>
          <li><Link to="/orders">Замовлення</Link></li>
          <li><Link to="/auth">Вхід</Link></li>
        </ul>
        <div className="user-status">
          {user ? `Logged in as ${user.email}` : "Not logged in"}
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage onAddToCart={handleAddToCart} />} />
           <Route path="/cart" element={<CartPage cartItems={cartItems} onPlaceOrder={handlePlaceOrder} onRemoveFromCart={handleRemoveFromCart} user={user} />} /> 
           <Route path="/orders" element={<OrdersPage orders={orders} />} />
          <Route path="/auth" element={<AuthPage setMessage={setMessage} />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <footer>
        &copy; {new Date().getFullYear()} Кондитерська
      </footer>

      {message && (
  <div
    style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      backgroundColor: "#ffe13a",
      color: "#633814",
      padding: "10px 20px",
      borderRadius: "5px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      zIndex: 1000,
    }}
  >
    {message}
  </div>
)}

    </div> 

  );
};

export default App;



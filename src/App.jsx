import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import AuthPage from "./pages/AuthPage";
import "./App.css";

const App = () => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    showMessage("Товар додано до кошика!");
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showMessage("Товар видалено з кошика!");
  };

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <ul>
          <li><Link to="/home">Головна</Link></li>
          <li><Link to="/menu">Меню</Link></li>
          <li><Link to="/cart">Кошик</Link></li>
          <li><Link to="/orders">Замовлення</Link></li>
          <li><Link to="/auth">Акаунт</Link></li>
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
          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartItems}
                onRemoveFromCart={removeFromCart}
                user={user}
                showMessage={showMessage}
                setCartItems={setCartItems}
              />
            }
          />
          <Route path="/orders" element={<OrdersPage user={user} />} />
          <Route path="/auth" element={<AuthPage setMessage={setMessage} setUser={setUser} />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <footer>
        © {new Date().getFullYear()} Кондитерська
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
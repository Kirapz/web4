import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";


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


  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      showMessage("Кошик порожній!");
      return;
    }
    setOrders((prevOrders) => [...prevOrders, cartItems]);
    setCartItems([]);
    showMessage("Замовлення успішно оформлено!");
  };

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000); // 2 секунди
  };

  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "98vh",
      backgroundImage: "url('images/back.jpg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
    }}
  >
    
      <nav style={{ display: "flex", justifyContent: "center", marginTop : "0px" ,  gap: "20px", padding: "10px", background: "#DBEEF3" }}>
        <Link to="/home" style={{ textDecoration: "none"}}>Головна</Link>
        <Link to="/menu" style={{ textDecoration: "none"}}>Меню</Link>
        <Link to="/cart" style={{ textDecoration: "none"}}>Кошик</Link>
        <Link to="/orders" style={{ textDecoration: "none"}}>Замовлення</Link>
      </nav>


      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<CartPage cartItems={cartItems} onPlaceOrder={handlePlaceOrder} onRemoveFromCart={handleRemoveFromCart} />} />
        <Route path="/orders" element={<OrdersPage orders={orders} />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
  

 <footer
      style={{
        backgroundColor: "#f48fb1",
        color: "white",
        textAlign: "center",
        padding: "10px",
        marginTop: "auto",
      }}
    >
      &copy; {new Date().getFullYear()} Кондитерська
    </footer>

      {message && (
  <div
    style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      backgroundColor: "#f48fb1",
      color: "white",
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



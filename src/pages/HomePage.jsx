import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Ласкаво просимо в Kira's Bakery!!</h1>
      <p style={styles.description}>
        Ми готуємо з любов’ю найсмачніші десерти: торти, еклери, макарони, круасани, напої та інші смаколики.
        Замовляй онлайн — і насолоджуйся солодким без турбот!
      </p>

      <img
        src="images/bakery.jpg"
        alt="Кондитерська"
        style={styles.image}
      />

      <Link to="/menu">
        <button style={styles.button}>Переглянути меню</button>
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "40px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  title: {
    fontSize: "2.5rem",
    color: "#d81b60",
  },
  description: {
    fontSize: "1.2rem",
    marginBottom: "30px",
    color: "#555",
  },
  image: {
    width: "100%",
    maxHeight: "400px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "30px",
  },
  button: {
    backgroundColor: "#f48fb1",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "1rem",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default HomePage;

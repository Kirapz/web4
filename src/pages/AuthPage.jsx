import React, { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import "../App.css"; 

const AuthPage = ({ setMessage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleSignUp = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    setMessage(`User created: ${userCredential.user.email}`);

    setTimeout(() => {
      setMessage("");
    }, 2000);

  } catch (err) {
    setMessage(`Error: ${err.message}`);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  }
};

const handleLogin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setMessage(`Logged in: ${userCredential.user.email}`);

    setTimeout(() => {
      setMessage("");
    }, 2000);

  } catch (err) {
    setMessage(`Error: ${err.message}`);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  }
};


const handleLogout = async () => {
  try {
    await signOut(auth);
    setMessage("Logged out successfully");
    
    setTimeout(() => {
      setMessage(""); // Очищає повідомлення через 2 секунди
    }, 2000);
    
  } catch (err) {
    setMessage(`Error: ${err.message}`);

    setTimeout(() => {
      setMessage(""); // Також очищає помилку через 2 секунди
    }, 2000);
  }
};


  return (
    <div className="auth-container">
      <h2>Вхід</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AuthPage;
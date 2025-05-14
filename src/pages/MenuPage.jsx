import React, { useState, useEffect } from "react";
     import { db } from "../firebase";
     import { collection, getDocs } from "firebase/firestore";
     import FoodCard, { CustomOrderCard } from "../components/FoodCard";
     import "../App.css";

     const MenuPage = ({ onAddToCart }) => {
       const [menuItems, setMenuItems] = useState([]);
       const [selectedCategory, setSelectedCategory] = useState("всі");
       const [loading, setLoading] = useState(true);

       const categories = ["всі", "торти", "еклери", "круасан", "тістечка", "печево", "напої"];

       useEffect(() => {
         const fetchMenu = async () => {
           try {
             const querySnapshot = await getDocs(collection(db, "menu"));
             const items = querySnapshot.docs.map((doc) => ({
               id: doc.id,
               ...doc.data(),
             }));
             setMenuItems(items);
             setLoading(false);
           } catch (error) {
             console.error("Error fetching menu:", error);
             setLoading(false);
           }
         };
         fetchMenu();
       }, []);

       const filteredItems = selectedCategory === "всі"
         ? menuItems
         : menuItems.filter(item => item.category === selectedCategory);

       return (
         <div className="menu-page">
           <div className="menu-header">
             <h2>Меню кондитерської</h2>
           </div>

           <div className="menu-categories">
             {categories.map(cat => (
               <button
                 key={cat}
                 onClick={() => setSelectedCategory(cat)}
                 className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
               >
                 {cat}
               </button>
             ))}
           </div>

           <div className="menu-grid">
             {loading ? (
               <p>Завантаження меню...</p>
             ) : filteredItems.length === 0 && !loading ? (
               <p>Немає елементів у цій категорії</p>
             ) : (
               <>
                 {(selectedCategory === "всі" || selectedCategory === "торти") && (
                   <CustomOrderCard onAdd={onAddToCart} />
                 )}
                 {filteredItems.map(item => (
                   <FoodCard key={item.id} item={item} onAdd={onAddToCart} />
                 ))}
               </>
             )}
           </div>
         </div>
       );
     };

     export default MenuPage;
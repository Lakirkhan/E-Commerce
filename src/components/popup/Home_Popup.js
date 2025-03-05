import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Popup/Home_Popup.css";

const HomePopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        axios.get("https://dummyjson.com/products?limit=4")
            .then(response => {
                if (response.data && Array.isArray(response.data.products)) {
                    setProducts(response.data.products);
                } else {
                    setProducts([]);
                }
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setProducts([]);
            });
    }, []);

    return (
        <>
            {showPopup && (
                <div className="home-popup-overlay">
                    <div className="home-popup-content">
                        <h2>Limited-Time Offer! 🎉</h2>
                        <p>Get 20% off your first order. Use code: <strong>WELCOME20</strong></p>
                        <div className="home-popup-products">
                            {products.length > 0 ? (
                                products.map(product => (
                                    <div key={product.id} className="home-popup-product">
                                        <img src={product.thumbnail} alt={product.title} />
                                        <h4>{product.title}</h4>
                                        <p>${product.price}</p>
                                    </div>
                                ))
                            ) : (
                                <p>Loading products...</p>
                            )}
                        </div>
                        <button className="home-shop-now-btn" onClick={() => navigate("/products")}>Shop Now</button>
                        <button className="home-close-btn" onClick={() => setShowPopup(false)}>✖</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default HomePopup;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OfferPage.css";

const OffersPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("https://dummyjson.com/products")
            .then(response => {
                if (response.data && Array.isArray(response.data.products)) {
                    const discountedProducts = response.data.products.filter(product => product.discountPercentage > 0);
                    setProducts(discountedProducts.slice(0,4));
                }
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    }, []);

    return (
        <div className="offers-container">
            <h2>🔥 Exclusive Offers On Beauty Products! 🔥</h2>
            <div className="offers-grid">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product.id} className="offer-card">
                            <img src={product.thumbnail} alt={product.title} className="offer-image" />
                            <h4 className="offer-title">{product.title}</h4>
                            {/* <p className="original-price">${product.price}</p>
                            <p className="discounted-price">${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}</p>
                            <p className="discount-tag">Save {product.discountPercentage}%</p> */}
                            {/* <button className="buy-now-btn">Buy Now</button> */}
                        </div>
                    ))
                ) : (
                    <p>Loading offers...</p>
                )}
            </div>
        </div>
    );
};

export default OffersPage;

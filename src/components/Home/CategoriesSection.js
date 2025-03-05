import React from "react";
import { Link } from "react-router-dom";
import "./CategoriesSection.css";
import { FaTshirt, FaMobileAlt, FaLaptop, FaShoppingBag } from "react-icons/fa";

const categories = [
    { name: "Men's Fashion", icon: <FaTshirt />, description: "Latest trends in men's fashion", path: "/category/mens-fashion" },
    { name: "Women's Fashion", icon: <FaShoppingBag />, description: "Stylish and trendy outfits", path: "/category/womens-fashion" },
    { name: "Electronics", icon: <FaMobileAlt />, description: "Best gadgets & accessories", path: "/category/electronics" },
    { name: "smart Phones", icon: <FaLaptop />, description: "Top-performing Phones", path: "/category/smartphones" },
];

const CategoriesSection = () => {
    return (
        <div className="categories-section">
            <h1 className="section-title-category">
                Categories <FaShoppingBag />
            </h1>
            <div className="categories-container">
                {categories.map((category, index) => (
                    <Link to={category.path} key={index} className="category-item">
                        <div className="category-icon">{category.icon}</div>
                        <h3 className="category-name">{category.name}</h3>
                        <p className="category-desc">{category.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoriesSection;

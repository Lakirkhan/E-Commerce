import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CategoryPage.css";

const categoryData = {
    "mens-fashion": { title: "Men's Fashion", apiUrl: "https://fakestoreapi.com/products/category/men's clothing" },
    "womens-fashion": { title: "Women's Fashion", apiUrl: "https://fakestoreapi.com/products/category/women's clothing" },
    "electronics": { title: "Electronics", apiUrl: "https://fakestoreapi.com/products/category/electronics" },
    "smartphones": { title: "smart phones", apiUrl: "https://dummyjson.com/products/category/smartphones" },
};

const CategoryPage = () => {
    const { category } = useParams();
    const categoryInfo = categoryData[category] || { title: "Category Not Found", apiUrl: "" };
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!categoryInfo.apiUrl) {
            setProducts([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        fetch(categoryInfo.apiUrl)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                return res.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [category]);

    return (
        <div className="category-page">
            <h1>{categoryInfo.title}</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="products">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.title} />
                            <h3>{product.title}</h3>
                            <p>${product.price}</p>
                        </div>
                    ))
                ) : (
                    !loading && <p>No products available.</p>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;

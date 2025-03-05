import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../redux/action";
import "../styles/Admin_styles/ProductManagement.css";

const ProductManagement = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productData);

    const [entries, setEntries] = useState(10);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        dispatch(getProductList());
    }, [dispatch]);

    useEffect(() => {
        setFilteredProducts(products.slice(0, entries));
    }, [products, entries]);

    return (
        <div className="container">
            {/* Top Section */}
            <div className="top-bar">
                <div className="entries-container">
                    <label htmlFor="entries">Showing</label>
                    <select
                        id="entries"
                        className="select-entries"
                        value={entries}
                        onChange={(e) => setEntries(Number(e.target.value))}
                    >
                        <option value="" disabled>Select option</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                    <span>entries</span>
                </div>

                <div className="search-container">
                    <input type="text" placeholder="Search here..." />
                    <img src="/search-icon.svg" className="search-icon" alt="Search" />
                </div>
                <button className="add-button">Add new</button>
            </div>

            {/* Table */}
            <table className="table-container">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Product ID</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product.id}>
                            <td className="product-info">
                                <img src={product.image} alt={product.title} />
                                {product.title}
                            </td>
                            <td>#{product.id}</td>
                            <td>${product.price}</td>
                            <td>{product.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductManagement;

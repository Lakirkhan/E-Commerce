import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    FaUserCircle, FaSearch, FaTimes, FaSignOutAlt, FaShoppingBag,
    FaFileInvoiceDollar, FaEnvelope, FaClipboardList, FaCalendarAlt, FaBox, FaFilter
} from "react-icons/fa";
import { jsPDF } from "jspdf";
import "../styles/Profile.css";
import { logoutUser } from "../redux/action";
import Footer from "./Footer";

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const orders = useSelector((state) => state.auth.orders);
    const [search, setSearch] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const clearFilters = () => {
        setSearch("");
        setDateFilter("");
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
    };

    const generateInvoice = (order) => {
        const doc = new jsPDF();
        doc.text(`Order ID: ${order.id}`, 10, 30);
        doc.text(`Date: ${order.date}`, 10, 40);
        doc.text(`Status: ${order.status}`, 10, 50);
        doc.text("Items:", 10, 60);

        let y = 70;
        order.items.forEach((item, index) => {
            doc.text(`${index + 1}. ${item.title} - $${item.price} x ${item.quantity}`, 10, y);
            y += 10;
        });

        doc.text(`Total Amount: $${order.totalAmount}`, 10, y + 10);
        doc.save(`Invoice_Order_${order.id}.pdf`);
    };

    const filteredOrders = orders.filter((order) => {
        return (
            order.userId === user?.id &&
            (order.id.toString().includes(search) || search === "") &&
            (dateFilter === "" || order.date === dateFilter)
        );
    });


    return (
        <>
            <div className="profile-container">
                {user ? (
                    <div>
                        <div className="profile-header">
                            <FaUserCircle className="profile-icon" />
                            <h2>Welcome, {user.name}!</h2>
                            <button className="logout-btn-profile" onClick={handleLogout}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </div>
                        <p><FaEnvelope /> Email: {user.email}</p>

                        <h3><FaClipboardList /> Your Order History</h3>

                        <div className="filters">
                            <div className="search-filter">
                                <FaSearch className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search by Order ID"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="date-filter">
                                <div className="calendar-icon">
                                    <FaCalendarAlt />
                                </div>
                                <input
                                    type="date"
                                    value={dateFilter}
                                    onChange={(e) => setDateFilter(e.target.value)}
                                />
                            </div>
                            <div className="clear-filter">
                                <button className="clear-btn" onClick={clearFilters}>
                                    <FaTimes /> Clear Filters
                                </button>
                            </div>
                        </div>

                        {filteredOrders.length === 0 ? (
                            <p>No orders found.</p>
                        ) : (
                            <table className="order-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Total Amount</th>
                                        <th>Items</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map((order) => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.date}</td>
                                            <td>{order.status}</td>
                                            <td>${order.totalAmount}</td>
                                            <td>
                                                <ul className="item-list">
                                                    {order.items.map((item) => (
                                                        <li key={item.id} className="item">
                                                            <img src={item.image} alt={item.name} className="item-img" />
                                                            {item.title} - ${item.price} x {item.quantity}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td>
                                                <div className="Profile-buttons">
                                                <button className="details-btn" onClick={() => setSelectedOrder(order)}>View Details</button>
                                                <button className="invoice-btn" onClick={() => generateInvoice(order)}>
                                                    <FaFileInvoiceDollar className="invoice-icon" /> Download 
                                                </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                ) : (
                    <div className="profile-suggestion">
                        <h2>Login for a better experience</h2>
                        <p>Sign in to view your profile, manage orders, and more.</p>
                        <Link to="/login" className="login-btn">Login</Link>
                        <p>New here? <Link to="/signup" className="signup-link">Sign Up</Link></p>
                    </div>
                )}

                {selectedOrder && (
                    <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2>Order Details</h2>
                            <table className="order-table-modal">
                                <thead>
                                    <tr>
                                        <th>Order Id</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Total Amount</th>
                                        <th>Items</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{selectedOrder.id}</td>
                                        <td>{selectedOrder.date}</td>
                                        <td>{selectedOrder.status}</td>
                                        <td>${selectedOrder.totalAmount}</td>
                                        <td>
                                            <ul className="item-list">
                                                {selectedOrder.items.map((item) => (
                                                    <li key={item.id} className="item">
                                                        <img src={item.image} alt={item.name} className="item-img" />
                                                        {item.title} - ${item.price} x {item.quantity}
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                        <p><strong>Date:</strong> {selectedOrder.date}</p>
                        <p><strong>Status:</strong> {selectedOrder.status}</p>
                        <p><strong>Total Amount:</strong> ${selectedOrder.totalAmount}</p>
                        <h3><FaBox /> Items:</h3>
                        <ul>
                            {selectedOrder.items.map((item) => (
                                <li key={item.id}>
                                    <img src={item.image} alt={item.name} className="modal-item-img" />
                                    {item.title} - ${item.price} x {item.quantity}
                                </li>
                            ))} */}
                            {/* </ul> */}
                            <button onClick={() => setSelectedOrder(null)} className="close-modal">
                                <FaTimes /> Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Profile;

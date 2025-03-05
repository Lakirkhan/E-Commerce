import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/action";
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import "../styles/Admin_styles/AdminDashboard.css";

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.auth.users);
    const orders = useSelector((state) => state.auth.orders);

    const [userStats, setUserStats] = useState({ totalUsers: 0, admins: 0, customers: 0 });
    const [orderStats, setOrderStats] = useState([]);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        if (users.length) {
            const admins = users.filter((user) => user.role === "admin").length;
            const customers = users.length - admins;
            setUserStats({ totalUsers: users.length, admins, customers });
        }

        if (orders.length) {
            const orderSummary = orders.reduce((acc, order) => {
                const month = new Date(order.date).toLocaleString("default", { month: "short" });
                acc[month] = (acc[month] || 0) + 1;
                return acc;
            }, {});

            const orderData = Object.keys(orderSummary).map((month) => ({
                name: month,
                Orders: orderSummary[month],
            }));

            setOrderStats(orderData);
        }
    }, [users, orders]);

    const COLORS = ["#0088FE", "#FFBB28"];

    return (
        <div className="admin-dashboard-container">
            <h1 className="admin-dashboard-title">Admin Dashboard</h1>

            {/* User Statistics */}
            <div className="admin-dashboard-cards">
                <div className="admin-dashboard-card">
                    <h3>Total Users</h3>
                    <p>{userStats.totalUsers}</p>
                </div>
                <div className="admin-dashboard-card">
                    <h3>Admins</h3>
                    <p>{userStats.admins}</p>
                </div>
                <div className="admin-dashboard-card">
                    <h3>Customers</h3>
                    <p>{userStats.customers}</p>
                </div>
                <div className="admin-dashboard-card">
                    <h3>Total Orders</h3>
                    <p>{orders.length}</p>
                </div>
            </div>

            {/* Graphs & Charts */}
            <div className="admin-dashboard-charts">
                {/* User Role Distribution (Pie Chart) */}
                <div className="admin-dashboard-chart-box">
                    <h3>User Role Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={[
                                    { name: "Admins", value: userStats.admins },
                                    { name: "Customers", value: userStats.customers },
                                ]}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                                dataKey="value"
                            >
                                {COLORS.map((color, index) => (
                                    <Cell key={index} fill={color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Orders per Month (Bar Chart) */}
                <div className="admin-dashboard-chart-box">
                    <h3>Orders Per Month</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={orderStats}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Orders" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

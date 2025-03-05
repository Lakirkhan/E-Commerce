import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
    const user = useSelector((state) => state.auth.user);
    const isAdmin = useSelector((state) => state.auth.isAdmin);

    return user && isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;

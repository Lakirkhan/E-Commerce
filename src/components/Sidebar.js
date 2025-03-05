import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Admin Panel</h2>
            <ul>
                <li><Link to="/admin/">Dashboard</Link></li>
                <li><Link to="/admin/users">Users</Link></li>
                <li><Link to="/admin/products">Products</Link></li>
                <li><Link to="/admin/orders">Orders</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;

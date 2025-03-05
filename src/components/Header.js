import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import "../styles/Header.css";
import { logoutUser } from "../redux/action";
import Header_Popup from "./popup/Header_Popup";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const cartItems = useSelector((state) => state.cartData);
  const products = useSelector((state) => state.productData);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showText, setShowText] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const searchResults = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchQuery("");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Header_Popup/>
      <div className="nav-left">
        <div className="nav-logo">
          <Link to="/" className="logo-container">
            <img src="./images/Navbar-Logo/logo1.png" alt="Logo" className="logo" />
          </Link>
          <div className="nav-search">
            <input
              type="text"
              placeholder="Search Products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">
              <FaSearch />
            </button>
            {searchQuery && searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((product) => (
                  <div key={product.id} className="search-result-item" onClick={() => handleProductClick(product.id)}>
                    <img src={product.image} alt={product.title} />
                    <div className="search-result-info">
                      <p>{product.title}</p>
                      <p>${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="nav-links">
        <Link to="/products">Products</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </div>

      <div className="nav-right">
        <Link to="/cart">
          <div className="nav-cart" onMouseEnter={() => setShowText(true)} onMouseLeave={() => setShowText(false)}>
            <span className="cart-count">{cartItems.length}</span>
            <FaShoppingCart />
            {showText && <div className="cart-text">Cart</div>}
          </div>
        </Link>

        <div
          className="nav-profile"
          onMouseEnter={() => setShowProfileDropdown(true)}
          onMouseLeave={() => setShowProfileDropdown(false)}
        >
          <FaUserCircle className="user-icon" />
          {showProfileDropdown && (
            <div className="profile-dropdown">
              {user ? (
                <>
                  <Link to="/profile">Profile</Link>
                  <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="auth-link">Login</Link>
                  <Link to="/signup" className="auth-link">Sign Up</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;

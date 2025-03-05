import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getProductList } from "../redux/action";
import { useNavigate } from "react-router-dom";
import "../styles/Products.css";
import Footer from "./Footer";
import { FaFilter, FaShoppingCart, FaEye } from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner"
export const selectCurrentUser = (state) => state.cart.currentUser;
export const selectUsers = (state) => state.cart.users;

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productData);
  const cart = useSelector((state) => state.cartData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const filterRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(getProductList())
    const timer = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(timer)
  }, [dispatch])



  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };

    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    }


    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter]);

  const handleMouseEnter = (product, event) => {
    setHoveredProduct(product);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  const sortedProducts = [...products]
    .filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    )
    .sort((a, b) => {
      if (sortOrder === "low-to-high") return a.price - b.price;
      if (sortOrder === "high-to-low") return b.price - a.price;
      return 0;
    });

  const isInCart = (productId) => cart.some((item) => item.id === productId);

  const handleAddToCart = (product) => {
    if (!isInCart(product.id)) {
      dispatch(addToCart(product, navigate));
    }
  };


  if (loading) return <LoadingSpinner />

  return (
    <div>
      <div className="product-filter-div">
        <button
          className="product-filter-toggle-btn"
          onClick={() => setShowFilter(!showFilter)}
        >
          <FaFilter />
        </button>

        {showFilter && (
          <div className="product-filter-container" ref={filterRef}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="product-search-input"
            />
            <select
              onChange={(e) => setSortOrder(e.target.value)}
              className="product-sort-select"
            >
              <option value="">Sort By</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="product-category-select"
            >
              <option value="">All Categories</option>
              {Array.from(new Set(products.map((p) => p.category))).map(
                (category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                )
              )}
            </select>
            <div className="product-filter-btn-group">
              <button
                className="product-filter-apply-btn"
                onClick={() => setShowFilter(false)}
              >
                Apply
              </button>
              <button
                className="product-filter-clear-btn"
                onClick={() => {
                  setSelectedCategory("");
                  setSortOrder("");
                  setSearchQuery("");
                }}
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={`product-main-container ${showFilter ? "filter-active" : ""}`}>
        <div className="product-grid">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img
                    className="product-image"
                    src={product.image}
                    alt={product.title}
                  />
                </div>

                <div className="product-info">
                  <h3>{product.title}</h3>
                </div>
                <div className="product-rating-container">
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <p
                    className="product-rating"
                    onMouseEnter={(e) => handleMouseEnter(product, e)}
                    onMouseMove={(e) =>
                      setTooltipPosition({ x: e.clientX, y: e.clientY })
                    }
                    onMouseLeave={handleMouseLeave}
                  >
                    Rating:- {product.rating.rate}⭐
                  </p>
                </div>
                <div className="product-button-container">
                  <button
                    className="product-view-details-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product.id}`);
                    }}
                  >
                    <FaEye /> <span>View Details</span>
                  </button>
                  {isInCart(product.id) ? (
                    <button className="product-in-cart-btn" disabled>
                      <FaShoppingCart /> <span>Added</span>
                    </button>
                  ) : (
                    <button
                      className="product-add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    >
                      <FaShoppingCart /> <span>Add to Cart</span>
                    </button>
                  )}
                </div>

              </div>
            ))
          ) : (
            <p className="product-no-products">No products found.</p>
          )}
        </div>
      </div>

      {hoveredProduct && (
        <div
          className="rating-breakdown-box"
          style={{ top: tooltipPosition.y + 15, left: tooltipPosition.x }}
        >
          <h4>Rating Breakdown</h4>
          <p>Total Ratings: {hoveredProduct.rating.count} Reviews</p>
          {Array(5)
            .fill()
            .map((_, index) => {
              const percentage = (
                (hoveredProduct.rating.count / 100) *
                (5 - index)
              ).toFixed(1);
              return (
                <div key={index} className="rating-breakdown-item">
                  <span className="rating-label">{5 - index} ⭐</span>
                  <div className="rating-bar-container">
                    <div
                      className="rating-bar"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="rating-percentage">{percentage}%</span>
                </div>
              );
            })}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Products;

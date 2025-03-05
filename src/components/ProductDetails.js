import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/action";
import Footer from "./Footer";
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartData);
  const { id } = useParams();
  const allProducts = useSelector((state) => state.productData);
  const product = allProducts.find((item) => item.id === Number(id));

  const isInCart = (productId) => cart.some((item) => item.id === productId);

  const handleAddToCart = (product) => {
    if (!isInCart(product.id)) {
      dispatch(addToCart(product));
    }
  };

  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!product) {
    return <h2 className="product-not-found-pd">Product not found</h2>;
  }

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const shortDescription = product.description.slice(0, 100);

  const relatedProducts = allProducts
    .filter(
      (item) => item.category === product.category && item.id !== product.id
    )
    .slice(0, 5);

  const recommendedProducts = allProducts
    .filter((item) => {
      if (product.category === "Shirts") {
        return ["Pants", "Belts", "Rings"].includes(item.category);
      }
      return item.category !== product.category && item.category !== "Shirts";
    })
    .slice(0, 5);

  const renderStars = (rating) => {
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);
    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar && "☆"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <div>
      <div className="product-page-pd">
        <div className="product-container-pd">
          <div className="product-image-pd">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-info-pd">
            <h1 className="product-title-pd">{product.title}</h1>
            <p className="product-price-pd">
              Price: ${product.price.toFixed(2)}
            </p>
            <h4 className="product-category-pd">
              Category: {product.category}
            </h4>
            <p className="product-description-pd">
              {showFullDescription
                ? product.description
                : shortDescription + "... "}
              <span
                className="product-read-more-pd"
                onClick={toggleDescription}
              >
                {showFullDescription ? "Read Less" : "Read More"}
              </span>
            </p>
            <p className="product-rating-pd">
              Rating:{" "}
              <span className="product-stars-pd">
                {renderStars(product.rating.rate)}
              </span>{" "}
              ({product.rating.rate})
            </p>

            {isInCart(product.id) ? (
              <p className="product-in-cart-msg-pd">
                Product is already in cart
              </p>
            ) : (
              <button
                className="product-add-to-cart-btn-pd"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>

        <div className="product-suggested-products-pd">
          <h2>Suggested Products</h2>
          <div className="product-suggested-products-grid-pd">
            {relatedProducts.map((item) => (
              <div key={item.id} className="product-suggested-product-card-pd">
                <Link
                  to={`/product/${item.id}`}
                  className="product-suggested-product-link-pd"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="product-suggested-product-image-pd"
                  />
                  <h3 className="product-suggested-product-title-pd">
                    {item.title}
                  </h3>
                  <p className="product-suggested-product-price-pd">
                    ${item.price.toFixed(2)}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="product-recommended-products-pd">
          <h2>Recommended Products</h2>
          <div
            className="product-recommended-products-grid-pd"
            style={{ textDecoration: "none" }}
          >
            {recommendedProducts.map((item) => (
              <div
                key={item.id}
                className="product-recommended-product-card-pd"
              >
                <Link
                  to={`/product/${item.id}`}
                  className="product-recommended-product-link-pd"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="product-recommended-product-image-pd"
                  />
                  <h3 className="product-recommended-product-title-pd">
                    {item.title}
                  </h3>
                  <p className="product-recommended-product-price-pd">
                    ${item.price.toFixed(2)}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;

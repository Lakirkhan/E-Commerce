import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/action";
import Slider from "react-slick";
import { FaCartPlus, FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";

const TopPicksSection = ({ products, navigate }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartData);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const toppickSettings = {
    dots: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    rtl: true,
    autoplay: false,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const isInCart = (productId) => cart.some((item) => item.id === productId);

  const handleAddToCart = (product, event) => {
    event.stopPropagation();
    if (!isInCart(product.id)) {
      dispatch(addToCart(product, navigate));
    } else {
      toast.error("Product already in cart", { position: "top-center", autoClose: 1000 });
    }
  };

  return (
    <div className="hero-slider">
      <h1 className="section-title">Top Picks</h1>
      <Slider {...toppickSettings}>
        {products.map((product) => (
          <div
            key={product.id}
            className="hero-slide-item"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
            style={{ cursor: "pointer", position: "relative" }}
          // onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="hero-slide-overlay">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="hero-slide-image"
              />
              {hoveredProduct === product.id && (
                <div className="hover-icons">
                  <FaEye className="icon eye" onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }} />
                  {/* {isInCart(product.id) ? (
                    <div className="product-in-cart">
                      <p className="product-in-cart-msg">Already in cart</p>
                    </div>
                  ) : ( */}
                  <FaCartPlus className="icon cart" onClick={(e) => handleAddToCart(product, e)} />
                  {/* )} */}
                </div>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return <FaChevronLeft className={`${className} custom-arrow left`} onClick={onClick} />;
};

const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return <FaChevronRight className={`${className} custom-arrow right`} onClick={onClick} />;
};

export default TopPicksSection;

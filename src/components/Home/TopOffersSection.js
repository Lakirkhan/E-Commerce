import { useRef } from "react"
import Slider from "react-slick"

const TopOffersSection = ({ products, navigate }) => {
  const sliderRef = useRef(null)

  const topOffersSettings = {
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
  }

  return (
    <div className="top-offers-section">
      <h1 className="section-title">🔥 Top Picks For Cloth's 🔥</h1>
      <div className="slider-container">
        <Slider ref={sliderRef} {...topOffersSettings}>
          {products.map((product) => (
            <div key={product.id} className="top-offer-card" onClick={() => navigate(`/product/${product.id}`)}>
              <div className="discount-banner">50% OFF</div>
              <img src={product.image || "/placeholder.svg"} alt={product.title} className="top-offer-image" />
              <p className="top-offer-title">{product.title}</p>
              <p className="top-offer-discount">{product.discount ? `Save ${product.discount}%` : "Best Deal"}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default TopOffersSection;


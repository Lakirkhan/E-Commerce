import Slider from "react-slick"

const BannerSection = () => {
  const bannerImages = [
    "https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/43e26378e18b32a2.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/df71df999c4d6023.jpg?q=20",
    "https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/5fbe79d96b10223e.jpg?q=20",
  ]

  const bannerSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  }

  return (
    <div className="banner-container">
      <Slider {...bannerSettings} className="banner-slider">
        {bannerImages.map((image, index) => (
          <div key={index} className="banner-slide">
            <img
              src={image || "/placeholder.svg"}
              alt={`Banner ${index + 1}`}
              loading="eager"
              className="banner-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default BannerSection;


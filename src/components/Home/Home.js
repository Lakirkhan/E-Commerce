import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getProductList } from "../../redux/action"
import Footer from "../Footer"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./Home.css"
import LoadingSpinner from "../LoadingSpinner"
import BannerSection from "./BannerSection"
import TopOffersSection from "./TopOffersSection"
import TopPicksSection from "./TopPicksSection"
import ProductSection from "./ProductSection"
import ScrollToTop from "../ScrollBar/ScrollToTop"
import { FaShoppingCart } from "react-icons/fa"
import Features from "../Features/Features"
import Popup from "../popup/Home_Popup";
import BrandLogos from "../BrandLogos/BrandLogos"
import OffersPage from "./OfferPage"
import CategoriesSection from "./CategoriesSection"


const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(getProductList())
    const timer = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(timer)
  }, [dispatch])

  const productList = useSelector((state) => state.productData) || [];

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <div className="home-wrapper">
        {/* <Popup /> */}
        <BannerSection />
        <OfferBanner />
        <OffersPage />
        <TopOffersSection products={productList.slice(15, 20)} navigate={navigate} />
        <CategoriesSection/>

        {/* <TopPicksSection products={productList.slice(0, 10)} navigate={navigate} /> */}
        {/* <ProductSection title="Featured Products" products={productList} navigate={navigate} /> */}
        {/* <BrandLogos />
        <ProductSection title="Trending Products" products={productList.slice(12, 17)} navigate={navigate} />
        <ProductSection title="Recommended Products" products={productList.slice(10)} navigate={navigate} /> */}
        {/* <Features /> */}

      
      </div>
      < ScrollToTop />
      <Footer />
    </div>
  )
}

const OfferBanner = () => (
  <div className="offer-banner">
    <span className="offer-badge">⭐</span>
    <p>
      <FaShoppingCart /> Extra up to <strong>5% back</strong> with ICICI Credit Card
    </p>
  </div>
)

export default Home


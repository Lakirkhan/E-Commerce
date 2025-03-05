import { useState } from "react"

const ProductSection = ({ title, products, navigate }) => {
  const [limit, setLimit] = useState(4)

  const handleShowMore = () => {
    setLimit((prev) => (prev === 4 ? products.length : 4))
  }

  return (
    <div className={`product-section-${title.toLowerCase().replace(" ", "-")}`}>
      <h1 className="section-title">{title}</h1>
      <div className="product-grid-home">
        {products.slice(0, limit).map((product) => (
          <div key={product.id} className="product-card-hm" onClick={() => navigate(`/product/${product.id}`)}>
            <img
              src={product.image || "/placeholder.svg"}
              alt={`${title} - ${product.title}`}
              className="product-image-hm"
            />
            <p className="product-title">{product.title}</p>
          </div>
        ))}
      </div>
      <button className="show-more-btn" onClick={handleShowMore}>
        {limit > 4 ? "Show Less" : "Show More"}
      </button>
    </div>
  )
}

export default ProductSection


import { useState } from "react";
import "./styles/productCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("black");

  return (
    <div className="product-card text-center h-100">
      <div className="product-card-image-container">
        <img
          className="product-card-img-top p-3"
          src={product.image}
          alt={product.title}
          height={300}
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className="product-card-body">
        <div className="d-flex justify-content-between gap-2">
          <h5 className="product-card-title">{product.title}</h5>
          <h5 className="product-card-price">$ {product.price}</h5>
        </div>

        {/* Variant Row: Size and Color with Vertical Line */}
        <div className="variant-row d-flex justify-content-center align-items-center mt-3 gap-3">
          {/* Sizes */}
          <div className="d-flex gap-2">
            {["S", "M", "L", "XL"].map((size, index) => (
              <button
                key={index}
                className={`variant-circle size-circle ${
                  selectedSize === size ? "selected-red" : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="variant-divider"></div>

          {/* Colors */}
          <div className="d-flex gap-2">
            {["black", "blue"].map((color, index) => (
              <button
                key={index}
                className={`variant-circle color-circle ${color} ${
                  selectedColor === color ? "selected-color" : ""
                }`}
                onClick={() => setSelectedColor(color)}
              ></button>
            ))}
          </div>
        </div>
      </div>

      <div className="product-card-body d-flex justify-content-center gap-2 flex-wrap">
        <button
          className="product-card-btn btn btn-dark"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

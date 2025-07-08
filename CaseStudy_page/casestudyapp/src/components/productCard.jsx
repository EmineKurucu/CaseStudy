import React, { useState } from "react";
import "./productCard.css";

const ProductCard = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState("yellow");

  const colorOptions = [
    { key: "yellow", color: "#E6CA97", label: "Yellow Gold" },
    { key: "white", color: "#D9D9D9", label: "White Gold" },
    { key: "rose", color: "#E1A4A9", label: "Rose Gold" }
  ];

  const renderStars = (score) => {
    const rating = score * 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="rating">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`star ${
              i < fullStars ? "filled" : i === fullStars && hasHalfStar ? "half" : ""
            }`}
          >
            ★
          </span>
        ))}
        <span className="rating-text">{rating.toFixed(1)}/5</span>
      </div>
    );
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={product.images[selectedColor]}
          alt={product.name}
          onError={(e) => {
            e.target.src = product.images.yellow;
          }}
        />
      </div>

      <div className="product-info">
        <div className="product-title">{product.name}</div>
        <div className="product-price">${product.priceUSD}</div>

        <div className="color-options">
          {colorOptions.map((option) => (
            <button
              key={option.key}
              className={`color-option ${
                selectedColor === option.key ? "selected" : ""
              }`}
              style={{ backgroundColor: option.color }}
              onClick={() => setSelectedColor(option.key)}
              title={option.label}
            />
          ))}
        </div>

        <span className="color-label">
          {colorOptions.find((opt) => opt.key === selectedColor)?.label}
        </span>

        {renderStars(product.popularityScore)}
      </div>
    </div>
  );
};

export default ProductCard;

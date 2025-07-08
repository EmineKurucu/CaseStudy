import React, { useState } from 'react';
import './productCard.css';

const ProductCard = ({ product }) => {
  const {
    name,
    priceUSD,
    popularityScore,
    displayScore,
    images = {},
    colorOptions = []
  } = product;

  // Renk isimleri ve kodları eşleştirmesi
  const colorMap = {
    'yellow': { name: 'Yellow Gold', code: '#E6CA97' },
    'white': { name: 'White Gold', code: '#D9D9D9' },
    'rose': { name: 'Rose Gold', code: '#E1A4A9' }
  };
  
  const availableColors = Object.keys(images).filter(color => colorMap[color]);
  const [selectedColor, setSelectedColor] = useState(availableColors[0] || 'yellow');
  
  const imageUrl = images[selectedColor] || 'https://via.placeholder.com/150';

  // Puan hesaplama
  const rating = displayScore ?? (popularityScore * 5);
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={imageUrl} alt={`${name} - ${selectedColor}`} />
      </div>

      <div className="product-info">
        <h3 className="product-title">{name}</h3>

        <p className="product-price">${Number(priceUSD).toFixed(2)}</p>
        <div className="color-options">
          {availableColors.map((color) => (
            <div
              key={color}
              className={`color-option ${selectedColor === color ? 'selected' : ''}`}
              style={{ backgroundColor: colorMap[color]?.code || color }}
              onClick={() => setSelectedColor(color)}
              title={colorMap[color]?.name || color}
            />
          ))}
        </div>
        <div className="selected-color-name">{colorMap[selectedColor]?.name || selectedColor}</div>

        <div className="rating">
          {[...Array(fullStars)].map((_, i) => (
            <span key={`full-${i}`} className="star filled">★</span>
          ))}
          {halfStar && <span className="star half">★</span>}
          {[...Array(emptyStars)].map((_, i) => (
            <span key={`empty-${i}`} className="star">☆</span>
          ))}
          <span className="rating-text">({rating.toFixed(1)})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ProductCard from './productCard';
import './productList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
      } catch (err) {
        console.error('Veriler alınamadı:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  };

  return (
    <div className="product-list-wrapper">
      <div className="heading">Product List</div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-carousel">
          <button className="scroll-button left" onClick={scrollLeft}>&lt;</button>

          <div className="product-scroll-container" ref={scrollContainerRef}>
            {products.length > 0 ? (
              products.slice(0, 8).map(product => (
                <ProductCard key={product.name} product={product} />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>

          <button className="scroll-button right" onClick={scrollRight}>&gt;</button>
        </div>
      )}
    </div>
  );
};

export default ProductList;

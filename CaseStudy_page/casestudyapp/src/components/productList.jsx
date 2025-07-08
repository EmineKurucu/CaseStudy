import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ProductCard from './productCard';
import './productList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [popularityFilter, setPopularityFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        console.error('Veriler alınamadı:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let updated = [...products];

    if (popularityFilter !== 'all') {
      updated = updated.filter(product => {
        const stars = product.popularityScore * 5;
        if (popularityFilter === '0-2') return stars >= 0 && stars < 2;
        if (popularityFilter === '2-4') return stars >= 2 && stars < 4;
        if (popularityFilter === '4+') return stars >= 4;
        return true;
      });
    }

    if (priceFilter !== 'all') {
      updated = updated.filter(product => {
        const price = product.priceUSD;
        if (priceFilter === '0-500') return price >= 0 && price <= 500;
        if (priceFilter === '500-800') return price > 500 && price <= 800;
        if (priceFilter === '800+') return price > 800;
        return true;
      });
    }

    setFilteredProducts(updated);
  }, [popularityFilter, priceFilter, products]);

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

      <div className="filters">
        <div>
          <label>Popularity:</label>
          <select value={popularityFilter} onChange={(e) => setPopularityFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="0-2">0 - 2 stars</option>
            <option value="2-4">2 - 4 stars</option>
            <option value="4+">4+ stars</option>
          </select>
        </div>

        <div>
          <label>Price (USD):</label>
          <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="0-500">$0 - $500</option>
            <option value="500-800">$500 - $800</option>
            <option value="800+">$800+</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-carousel">
          <button className="scroll-button left" onClick={scrollLeft}>&lt;</button>

          <div className="product-scroll-container" ref={scrollContainerRef}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.name} product={product} />
              ))
            ) : (
              <p>No products match your filters.</p>
            )}
          </div>

          <button className="scroll-button right" onClick={scrollRight}>&gt;</button>
        </div>
      )}
    </div>
  );
};

export default ProductList;

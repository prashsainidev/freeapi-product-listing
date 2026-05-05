import { useState, useEffect, useRef } from 'react';
import { StarIcon } from './icons/Icons';

function ProductCard({ product, index, setSelectedProduct, addToCart }) {
  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fallback for broken DummyJSON images
  let safeThumbnail = product.thumbnail;
  if (safeThumbnail && safeThumbnail.includes('cdn.dummyjson.com/product-images')) {
    safeThumbnail = `https://placehold.co/600x400/1a1a1a/a3e635?text=${encodeURIComponent(product.title.split(' ').join('+'))}`;
  }

  return (
    <div
      ref={cardRef}
      className={`product-card scroll-reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className="image-area">
        <span className="category-badge">{product.category}</span>
        <img
          src={safeThumbnail}
          alt={product.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/600x400/1a1a1a/a3e635?text=${encodeURIComponent(product.title.split(' ').join('+'))}`;
          }}
        />
        <div className="image-overlay">
          <button className="quick-view-btn" onClick={() => setSelectedProduct(product)}>
            Quick View
          </button>
        </div>
      </div>
      
      <div className="card-body">
        <div className="card-header-info">
          <span className="brand">{product.brand || 'Generic'}</span>
          <div className="rating">
            <StarIcon />
            <span>{product.rating}</span>
          </div>
        </div>
        
        <h3 className="title">{product.title}</h3>
        <p className="description">{product.description}</p>

        <div className="price-block">
          <span className="discounted-price">${discountedPrice}</span>
          <span className="original-price">${product.price}</span>
          <span className="discount-pill">-{product.discountPercentage}%</span>
        </div>

        <div className="stock-info">
          {product.stock < 50 ? (
            <span className="stock-warning">Only {product.stock} left in stock</span>
          ) : (
            <span className="stock-normal">In Stock</span>
          )}
        </div>
      </div>
      
      <div className="card-footer">
        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

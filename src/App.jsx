import { useState, useEffect } from 'react';

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.freeapi.app/api/v1/public/randomproducts?page=${page}`
      );
      const data = await response.json();
      setProducts(data.data.data);
      setMeta(data.data);
    } catch (err) {
      setError('Something went wrong while fetching products!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePrev = () => {
    if (meta?.previousPage) setCurrentPage((p) => p - 1);
  };
  const handleNext = () => {
    if (meta?.nextPage) setCurrentPage((p) => p + 1);
  };

  return (
    <div className="app-wrapper">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-shape"></div>
            <span className="logo-text">LUMIÈRE</span>
          </div>
          
          <div className="nav-links">
            <button className="nav-link active"><HomeIcon /> Home</button>
            <button className="nav-link">New Arrivals</button>
            <button className="nav-link">Categories</button>
            <button className="nav-link">Trending</button>
          </div>

          <div className="nav-actions">
            <button className="action-btn"><SearchIcon /></button>
            <button className="action-btn cart-btn">
              <CartIcon />
              <span className="cart-badge">3</span>
            </button>
            <button className="action-btn"><UserIcon /></button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-glow"></div>
        <div className="hero-content">
          <span className="hero-badge">Spring Collection 2026</span>
          <h1 className="hero-title">Elevate Your Everyday.</h1>
          <p className="hero-subtitle">
            Discover a curated selection of premium products designed for modern living. Uncompromising quality meets timeless aesthetics.
          </p>
          <button className="hero-cta">Shop the Collection</button>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-container">
        <div className="section-header">
          <div className="section-title-wrapper">
            <h2>Featured Catalog</h2>
            <div className="title-underline"></div>
          </div>
          {meta && !loading && !error && (
            <div className="results-count">
              Showing <span className="highlight">{meta.currentPageItems}</span> of <span className="highlight">{meta.totalItems}</span> products
            </div>
          )}
        </div>

        {loading && (
          <div className="products-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="skeleton-card">
                <div className="skeleton-image"></div>
                <div className="skeleton-body">
                  <div className="skeleton-line w-80"></div>
                  <div className="skeleton-line w-100"></div>
                  <div className="skeleton-line w-40 mt-10"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="error-state">
            <div className="error-card">
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="products-grid">
            {products.map((product, index) => {
              const discountedPrice = (
                product.price -
                (product.price * product.discountPercentage) / 100
              ).toFixed(2);

              // Fix broken dummyjson URLs to prevent 404 console errors and show actual images
              let safeThumbnail = product.thumbnail;
              if (safeThumbnail && safeThumbnail.includes('cdn.dummyjson.com/product-images')) {
                safeThumbnail = `https://loremflickr.com/400/300/${product.category}?lock=${product.id}`;
              }

              return (
                <div
                  key={product.id}
                  className="product-card card-enter"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="image-area">
                    <span className="category-badge">{product.category}</span>
                    <img
                      src={safeThumbnail}
                      alt={product.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/600x400/111111/52525b?text=No+Image';
                      }}
                    />
                    <div className="image-overlay">
                      <button className="quick-view-btn">Quick View</button>
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
                    <button className="add-to-cart-btn">
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && !error && meta && (
          <div className="pagination-wrapper">
            <div className="pagination-bar">
              <button className="page-btn" onClick={handlePrev} disabled={!meta.previousPage}>
                &larr; Previous
              </button>
              <div className="page-indicators">
                {Array.from({ length: Math.min(5, meta.totalPages) }).map((_, idx) => {
                  // Simplified pagination display for 5 pages max visible
                  let pageNum = idx + 1;
                  if (meta.totalPages > 5 && currentPage > 3) {
                    pageNum = currentPage - 2 + idx;
                    if (pageNum > meta.totalPages) return null;
                  }
                  return (
                    <button 
                      key={pageNum} 
                      className={`page-dot ${currentPage === pageNum ? 'active' : ''}`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button className="page-btn" onClick={handleNext} disabled={!meta.nextPage}>
                Next &rarr;
              </button>
            </div>
          </div>
        )}
      </main>
      
      <footer className="store-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo-shape"></div>
            <span>LUMIÈRE</span>
          </div>
          <p className="footer-text">© 2026 Lumière Inc. All rights reserved. Crafted with precision.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

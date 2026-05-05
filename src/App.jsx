import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductSkeleton from './components/ProductSkeleton';
import ProductCard from './components/ProductCard';
import Pagination from './components/Pagination';
import QuickViewModal from './components/QuickViewModal';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Feature 1: Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Feature 2: Toast State
  const [toastMessage, setToastMessage] = useState(null);

  // Feature 3: Category Filter State
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Feature 5: Theme State
  const [theme, setTheme] = useState('dark');

  // Feature 6: Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== debouncedSearchQuery) {
        setDebouncedSearchQuery(searchQuery);
        setCurrentPage(1); // Reset to page 1 on new search
        setSelectedCategory('All'); // Reset category filter on new search
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, debouncedSearchQuery]);

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : '';
  }, [theme]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setToastMessage(product.title);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const fetchProducts = async (page = 1, query = '') => {
    try {
      setLoading(true);
      setError(null);
      let url = `https://api.freeapi.app/api/v1/public/randomproducts?page=${page}`;
      if (query) {
        url += `&query=${encodeURIComponent(query)}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.data.data);
      setMeta(data.data);
    } catch (err) {
      setError('Something went wrong while fetching products!');
    } finally {
      setLoading(false);
    }
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    fetchProducts(currentPage, debouncedSearchQuery);
    
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    const mainContainer = document.querySelector('.main-container');
    if (mainContainer) {
      const yOffset = -80; // Navbar offset
      const y = mainContainer.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [currentPage, debouncedSearchQuery]);

  // Apply filters: Category only (Search is now handled globally by the API)
  const filteredProducts = products.filter(p => {
    return selectedCategory === 'All' || p.category === selectedCategory;
  });

  return (
    <div className="app-wrapper">
      <Navbar 
        cartCount={cart.length} 
        setIsCartOpen={setIsCartOpen} 
        theme={theme} 
        setTheme={setTheme} 
        setSearchQuery={setSearchQuery}
      />
      <Hero />

      <main className="main-container">
        <div className="section-header">
          <div className="section-title-wrapper">
            <h2>Featured Catalog</h2>
            <div className="title-underline"></div>
          </div>
          {meta && !loading && !error && (
            <div className="results-count">
              Showing <span className="highlight">{filteredProducts.length}</span> of <span className="highlight">{meta.totalItems}</span> products
            </div>
          )}
        </div>

        {!loading && !error && (
          <div className="category-filters">
            {['All', ...new Set(products.map(p => p.category))].map(cat => (
              <button 
                key={cat} 
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="products-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <ProductSkeleton key={n} />
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

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="empty-cart" style={{ marginTop: '80px', marginBottom: '80px' }}>
            <span style={{ fontSize: '3rem' }}>🔍</span>
            <h3 style={{ marginTop: '16px', color: 'var(--text-main)' }}>No products found</h3>
            <p style={{ marginTop: '8px' }}>We couldn't find any products matching your search.</p>
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="products-grid">
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index} 
                setSelectedProduct={setSelectedProduct}
                addToCart={addToCart}
              />
            ))}
          </div>
        )}

        {!loading && !error && meta && (
          <Pagination 
            meta={meta} 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
          />
        )}
      </main>
      
      <Footer />
      <QuickViewModal 
        selectedProduct={selectedProduct} 
        setSelectedProduct={setSelectedProduct}
        addToCart={addToCart}
      />
      <CartDrawer 
        cart={cart} 
        isCartOpen={isCartOpen} 
        setIsCartOpen={setIsCartOpen} 
        removeFromCart={removeFromCart} 
      />
      <Toast 
        message={toastMessage} 
        onClose={() => setToastMessage(null)} 
      />
    </div>
  );
}

export default App;

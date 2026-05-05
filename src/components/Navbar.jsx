import { useState, useRef, useEffect } from 'react';
import { HomeIcon, SearchIcon, CartIcon, UserIcon, SunIcon, MoonIcon } from './icons/Icons';

function Navbar({ cartCount, setIsCartOpen, theme, setTheme, setSearchQuery }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <div className="logo-shape"></div>
          <span className="logo-text">AURA</span>
        </div>
        
        <div className="nav-links">
          <button className="nav-link active"><HomeIcon /> Home</button>
          <button className="nav-link">New Arrivals</button>
          <button className="nav-link">Categories</button>
          <button className="nav-link">Trending</button>
        </div>

        <div className={`nav-actions ${isSearchOpen ? 'search-active' : ''}`}>
          <button className="action-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          
          <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
            <input 
              ref={searchInputRef}
              type="text" 
              className="search-input" 
              placeholder="Search catalog..." 
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={(e) => {
                if (e.target.value === '') setIsSearchOpen(false);
              }}
            />
            <button 
              className="action-btn search-btn" 
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <SearchIcon />
            </button>
          </div>

          <button className="action-btn cart-btn" onClick={() => setIsCartOpen(true)}>
            <CartIcon />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button className="action-btn"><UserIcon /></button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

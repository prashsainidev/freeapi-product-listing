import { HomeIcon, SearchIcon, CartIcon, UserIcon, SunIcon, MoonIcon } from './icons/Icons';

function Navbar({ cartCount, setIsCartOpen, theme, setTheme }) {
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

        <div className="nav-actions">
          <button className="action-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button className="action-btn"><SearchIcon /></button>
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

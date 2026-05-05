function CartDrawer({ cart, isCartOpen, setIsCartOpen, removeFromCart }) {
  if (!isCartOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <div className="drawer-overlay" onClick={() => setIsCartOpen(false)}></div>
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h3>Your Cart ({cart.length})</h3>
          <button className="close-drawer" onClick={() => setIsCartOpen(false)}>✕</button>
        </div>
        
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty.</p>
              <button className="hero-cta" onClick={() => setIsCartOpen(false)}>Continue Shopping</button>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map((item, idx) => {
                let safeThumbnail = item.thumbnail;
                if (safeThumbnail && safeThumbnail.includes('cdn.dummyjson.com/product-images')) {
                  safeThumbnail = `https://placehold.co/100x100/1a1a1a/a3e635?text=${encodeURIComponent(item.title.split(' ')[0])}`;
                }

                return (
                  <div key={idx} className="cart-item">
                    <div className="cart-item-image">
                      <img 
                        src={safeThumbnail} 
                        alt={item.title} 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://placehold.co/100x100/1a1a1a/a3e635?text=${encodeURIComponent(item.title.split(' ')[0])}`;
                        }}
                      />
                    </div>
                    <div className="cart-item-details">
                      <p className="cart-item-title">{item.title}</p>
                      <p className="cart-item-price">${item.price}</p>
                    </div>
                    <button className="remove-item" onClick={() => removeFromCart(idx)}>✕</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="cart-total">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="checkout-btn hero-cta">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;

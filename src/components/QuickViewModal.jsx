import { StarIcon } from './icons/Icons';

function QuickViewModal({ selectedProduct, setSelectedProduct, addToCart }) {
  if (!selectedProduct) return null;

  return (
    <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setSelectedProduct(null)}>✕</button>
        <div className="modal-body">
          <div className="modal-image">
            <img 
              src={`https://placehold.co/600x400/1a1a1a/a3e635?text=${encodeURIComponent(selectedProduct.title.split(' ').join('+'))}`} 
              alt={selectedProduct.title} 
            />
          </div>
          <div className="modal-details">
            <p className="modal-brand">{selectedProduct.brand || 'Generic'}</p>
            <h2>{selectedProduct.title}</h2>
            <div className="rating" style={{ marginBottom: '16px' }}>
              <StarIcon />
              <span style={{ color: '#fbbf24', fontWeight: 600 }}>{selectedProduct.rating}</span>
            </div>
            <p className="modal-desc">{selectedProduct.description}</p>
            
            <div className="modal-price">
              ${(selectedProduct.price - (selectedProduct.price * selectedProduct.discountPercentage) / 100).toFixed(2)}
              <span style={{ fontSize: '1rem', textDecoration: 'line-through', color: '#71717a', marginLeft: '12px' }}>
                ${selectedProduct.price}
              </span>
            </div>
            
            <button 
              className="hero-cta" 
              style={{ marginTop: '32px', width: '100%' }}
              onClick={() => {
                addToCart(selectedProduct);
                setSelectedProduct(null);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickViewModal;

function ProductSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-body">
        <div className="skeleton-line w-80"></div>
        <div className="skeleton-line w-100"></div>
        <div className="skeleton-line w-40 mt-10"></div>
      </div>
    </div>
  );
}

export default ProductSkeleton;

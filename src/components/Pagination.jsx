function Pagination({ meta, currentPage, setCurrentPage }) {
  const handlePrev = () => {
    if (meta?.previousPage) setCurrentPage((p) => p - 1);
  };
  const handleNext = () => {
    if (meta?.nextPage) setCurrentPage((p) => p + 1);
  };

  return (
    <div className="pagination-wrapper">
      <div className="pagination-bar">
        <button className="page-btn" onClick={handlePrev} disabled={!meta.previousPage}>
          &larr; Previous
        </button>
        <div className="page-indicators">
          {Array.from({ length: Math.min(5, meta.totalPages) }).map((_, idx) => {
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
  );
}

export default Pagination;

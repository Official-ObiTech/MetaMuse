

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="blogpagination">
      <button onClick={handlePrev} disabled={currentPage === 1}>
        Prev
      </button>

      {pageNumbers
        .slice(
          Math.max(currentPage - 3, 0),
          Math.min(currentPage + 2, pageNumbers.length)
        )
        .map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={currentPage === number ? "active" : ""}
          >
            {number}
          </button>
        ))}

      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;

import React from 'react';
import style from './Pagination.module.css';
import { PaginationProps } from '../interfaces';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={style.pagination}>
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={style.button}
      >
        Previous
      </button>
      <span className={style.pageInfo}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={style.button}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
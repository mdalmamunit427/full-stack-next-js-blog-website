// components/common/Pagination.tsx
import React from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'; // Import FaArrowLeft for previous button

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-12" aria-label="Pagination">
      <ul className="flex justify-start space-x-2 items-center text-gray-500 "> {/* 
        {/* Previous Button */}
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md transition-colors font-semibold flex items-center
              ${currentPage === 1
                ? 'text-gray-500  cursor-not-allowed' 
                : 'hover:text-primary  cursor-pointer'
              }`}
            aria-label="Previous page"
          >
            <FaArrowLeft size={14} />
          </button>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`px-4 py-2 rounded-md transition-colors font-semibold cursor-pointer
                ${currentPage === number
                  ? 'text-primary cursor-default' 
                  : 'hover:text-primary'
                }`}
              aria-current={currentPage === number ? 'page' : undefined}
            >
              {number}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md transition-colors font-semibold flex items-center
              ${currentPage === totalPages
                ? 'text-gray-500  cursor-not-allowed' 
                : 'hover:text-primary  cursor-pointer' 
              }`}
            aria-label="Next page"
          >
            <FaArrowRight size={14} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
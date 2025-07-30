import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface PaginationProps{
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void
}

const Pagination = ({currentPage, totalPages, onPageChange}: PaginationProps) => {
    const pageNumbers = [];
    for(let i =1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }

  return (
    <div className='mt-12' aria-label='Pagination'>
        <ul className='flex justify-start space-x-2 items-center text-gray-500'>
            <li>
                <button 
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className={`px-4 py-2 rounded-md transition-colors font-semibold flex items-center justify-center ${currentPage === 1 ? "text-gray-500 cursor-not-allowed" : "hover:text-primary cursor-pointer"}`}>
                    <FaArrowLeft size={14}/>
                </button>
            </li>

            {
                pageNumbers.map((number) => (
                    <li key={number}>
                        <button
                        onClick={() => onPageChange(number)}
                        className={`px-4 py-2 rounded-md transition-colors font-semibold flex items-center justify-center ${currentPage === number ? "text-primary cursor-default" : "hover:text-primary cursor-pointer"}`}
                        >{number}</button>
                    </li>
                ))
            }

            <li>
                <button 
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className={`px-4 py-2 rounded-md transition-colors font-semibold flex items-center justify-center ${currentPage === totalPages ? "text-gray-500 cursor-not-allowed" : "hover:text-primary cursor-pointer"}`}>
                    <FaArrowRight size={14}/>
                </button>
            </li>

        </ul>
    </div>
  )
}

export default Pagination
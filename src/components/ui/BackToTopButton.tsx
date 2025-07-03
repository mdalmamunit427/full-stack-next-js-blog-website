
"use client"; 

import React, { useState, useEffect } from 'react';
import { FaChevronUp } from 'react-icons/fa'; 

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll the page to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  };

  // Function to check scroll position and update visibility
  const handleScroll = () => {
    // Check if vertical scroll position is greater than 100vh
    if (window.scrollY > window.innerHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Add and remove the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);


    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 lg:bottom-8 lg:right-8 
        bg-white 
        text-gray-600 
        rounded-md 
        w-10 lg:w-12 h-20 lg:h-24 
        flex flex-col items-center justify-center
        hover:text-primary
        cursor-pointer 
        transition-all duration-300 ease-in-out 
        z-50  focus:outline-none 
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'} 
      `}
      aria-label="Scroll to top"
    >
      <FaChevronUp size={16} className="mb-1" /> 
      <span className="text-sm font-semibold transform rotate-90 origin-center">
        Top
      </span>
    </button>
  );
};

export default BackToTopButton;
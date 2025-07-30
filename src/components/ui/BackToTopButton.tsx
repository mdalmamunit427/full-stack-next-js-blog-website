"use client"

import React, { useEffect, useState } from 'react'
import { FaChevronUp } from 'react-icons/fa';

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const handleScroll = () => {
        if(window.scrollY > window.innerHeight){
            setIsVisible(true)
        }else {
            setIsVisible(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
             window.addEventListener('scroll', handleScroll);
        }
    }, [])


  return (
    <button type='button' onClick={scrollToTop} className={`fixed bottom-6 right-6 lg:bottom-8 lg:right-8 bg-white text-gray-600 rounded-md w-10 lg:w-12 h-20 lg:h-24 flex flex-col items-center justify-center hover:text-primary cursor-pointer transition-all duration-300 ease-in-out z-50 focus:outline-none ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"}`}>
        <FaChevronUp size={16} className='mb-1'/>
        <span className='text-sm font-semibold transform rotate-90 origin-center'>Top</span>
    </button>
  )
}

export default BackToTopButton
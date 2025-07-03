// components/layout/Footer.tsx
import React from 'react';
import Link from 'next/link';

// Import icons from react-icons
import { BsFacebook } from 'react-icons/bs';
import { FaXTwitter, FaBehance } from 'react-icons/fa6'; 

const Footer: React.FC = () => {
  return (
    <footer className=" py-8 bg-white  text-gray-800 ">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Divider */}
        <div className="border-t border-gray-200 mb-6"></div>

        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Copyright Section */}
          <div className="w-full md:w-auto text-center md:text-left text-sm text-gray-600 ">
            <p>
              Copyright {new Date().getFullYear()} Merinda inc. Designed by{' '}
              <Link
                href="https://alithemes.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-primary transition-colors"
              >
                CodeTutorBD.com
              </Link>
            </p>
          </div>

          {/* Social Network Section */}
          <ul className="flex space-x-3">
            <li>
              <a
                href="#"
                aria-label="Facebook"
                className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300  text-gray-500 hover:text-primary hover:border-primary transition-colors"
              >
                <BsFacebook size={14} />
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-label="Twitter"
                className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300  text-gray-500 hover:text-primary hover:border-primary transition-colors"
              >
                <FaXTwitter size={14} /> 
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-label="Behance"
                className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300  text-gray-500 hover:text-primary hover:border-primary   transition-colors"
              >
                <FaBehance size={14} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
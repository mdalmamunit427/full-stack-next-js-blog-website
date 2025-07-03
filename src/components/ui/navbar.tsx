"use client"
import React, { useState } from 'react';


// Import icons from react-icons
import { BsSearch, BsFacebook, BsInstagram, BsChevronDown } from 'react-icons/bs'; 
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'; 
import { FaFacebookF, FaXTwitter } from 'react-icons/fa6'; 
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import Link from 'next/link';
import { FaBlog } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

// Define the shape of a navigation item
interface NavItem {
  label: string;
  href: string;
  subItems?: NavItem[];
}

// Props for the Navbar component
interface NavbarProps {
  isAuthenticated: boolean; // Simulate Clerk's authentication status
  userName?: string;
  userAvatarUrl?: string;
  onThemeToggle?: () => void; // Optional function for theme toggling
}

const mainNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Categories',
    href: '/categories',
    subItems: [
      { label: 'Politics', href: '/categories/politics' },
      { label: 'Health', href: '/categories/health' },
      { label: 'Design', href: '/categories/design' },
    ],
  },
  { label: 'Lifestyle', href: '/categories/lifestyle' },
  { label: 'Education', href: '/categories/education' },
  { label: 'Health', href: '/categories/health' },
  { label: 'Design', href: '/categories/design' },
  { label: 'Technology', href: '/categories/tech' },
  { label: 'Culture', href: '/categories/culture' },
  { label: 'Contact', href: '/contact' },
  {
    label: 'More...',
    href: '#', // Placeholder for more...
    subItems: [
      { label: 'Search', href: '/search' },
      { label: 'Author', href: '/author' },
      { label: '404', href: '/404' },
    ],
  },
];

const Navbar: React.FC<NavbarProps> = ({
  isAuthenticated,
  userName = 'Author',
  onThemeToggle,
}) => {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const theme = 'light'

  return (
    <header className="relative bg-white font-inter text-gray-800">
      {/* Top Header - Visible only on large screens and above */}
      <div className="hidden lg:block  py-3">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <h1 className="flex-shrink-0">
            <Link href="/" className="text-2xl flex items-center font-semibold text-gray-900 rounded-md hover:text-primary transition-colors">
            <FaBlog /> <span className='ml-1'>Blogs</span>
            </Link>
          </h1>

          {/* Header Right Section */}
          <div className="flex items-center space-x-3">
            {/* Search Form Toggle */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100  transition-colors focus:outline-none  "
                aria-label="Toggle search"
              >
                <BsSearch size={18} />
              </button>
              {isSearchOpen && (
                <form
                  action="/search"
                  method="get"
                  className="absolute top-full right-0 mt-2 p-2 bg-white  rounded-md shadow-lg border border-gray-200  z-10 w-48 md:w-72"
                >
                  <input
                    type="text"
                    name="q"
                    placeholder="Search..."
                    className="w-full px-3 py-2 rounded-md border border-gray-300  bg-gray-50 text-gray-900  focus:outline-none"
                  />
                </form>
              )}
            </div>

            {/* Dark/Light Toggle */}
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100  transition-colors focus:outline-none"
              aria-label="Toggle dark/light mode"
            >
              {theme === 'light' ? <IoMdMoon size={18} /> : <IoMdSunny size={18} />}
            </button>

            {/* Social Network */}
            <ul className="flex items-center space-x-3">
              <li className='border p-2 rounded-full hover:bg-gray-100  transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                <Link href="#" className="text-gray-500  transition-colors">
                  <FaXTwitter size={12} /> 
                </Link>
              </li>
              <li className='border p-2 rounded-full hover:bg-gray-100  transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                <Link href="#" className="text-gray-500  transition-colors">
                  <FaFacebookF size={12} />
                </Link>
              </li>
              <li className='border p-2 rounded-full hover:bg-gray-100  transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                <Link href="#" className="text-gray-500   transition-colors">
                  <BsInstagram size={12} />
                </Link>
              </li>
            </ul>

            {/* Contact Button (Styled to match screenshot) */}
            <Link
              href="/contact"
              className="px-4 py-2 border border-gray-300  text-gray-800  rounded-md hover:bg-gray-100  transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
            >
              Contact
            </Link>

            {/* Author Avatar or Login/Signup */}
            <SignedOut>

              <SignInButton mode='modal' >
                <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 cursor-pointer transition-colors">
                Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            
          </div>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <nav className="py-3 border-b border-gray-200">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Menu Toggle (Hamburger) */}
          <div className="lg:hidden flex items-center justify-between w-full">
            <h1 className="flex-shrink-0">
            <Link href="/" className="text-2xl flex items-center font-semibold text-gray-900 rounded-md hover:text-primary transition-colors">
            <FaBlog /> <span className='ml-1'>Blogs</span>
            </Link>
            </h1>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 "
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex items-center justify-between space-x-6">
            {mainNavItems.map((item) => {
               const isActive = pathname === item.href;
              return(<li key={item.label} className="relative group ">
                <Link
                  href={item.href}
                  className={`inline-flex items-center  text-sm uppercase font-medium rounded-md text-gray-500 hover:text-green-600  ${isActive ? "font-semibold text-primary": ""} transition-colors`}
                >
                  {item.label}
                  {item.subItems && <BsChevronDown size={16} className="ml-1 group-hover:rotate-180 transition-transform" />}
                </Link>
                {item.subItems && (
                  <ul className="absolute left-0 top-full mt-0 hidden group-hover:block bg-white  shadow-lg rounded-md overflow-hidden z-20 min-w-[230px] border border-gray-200 ">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.label} className='mt-1'>
                        <Link
                          href={subItem.href}
                          className="block px-4 py-2 text-sm uppercase text-gray-700 hover:bg-gray-100  transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>)}
            )}
          </ul>
        </div>

        {/* Mobile Menu Overlay (unchanged) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-white  z-50 overflow-y-auto">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 "
                aria-label="Close mobile menu"
              >
                <HiOutlineX size={24} />
              </button>
            </div>
            <ul className="flex flex-col p-4 space-y-2">
              {mainNavItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-md  transition-colors"
                  >
                    {item.label}
                  </Link>
                  {item.subItems && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.label}>
                          <Link
                            href={subItem.href}
                            className="block px-4 py-2 text-base text-gray-600 hover:bg-gray-50 rounded-md  transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              {!isAuthenticated && (
                <li className="mt-4">
                  <Link
                    href="/sign-in"
                    className="block px-4 py-2 bg-indigo-600 text-white rounded-md text-center hover:bg-indigo-700 transition-colors"
                  >
                    Sign In
                  </Link>
                </li>
              )}
               <li className="mt-2">
                <button
                  onClick={onThemeToggle}
                  className="w-full text-left px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-md  transition-colors flex items-center space-x-2"
                >
              {theme === 'light' ? <IoMdMoon size={16} /> : <IoMdSunny size={16} />}
                  <span>Toggle Theme</span>
                </button>
              </li>
              <li className="mt-2">
                <div className="flex justify-center space-x-4 p-4 border-t border-gray-200 ">
                  <Link href="#" className="text-gray-500 hover:text-gray-700   transition-colors">
                    <BsFacebook size={24} />
                  </Link>
                  <Link href="#" className="text-gray-500 hover:text-gray-700  transition-colors">
                    <BsInstagram size={24} />
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { BsChevronDown, BsInstagram, BsSearch } from 'react-icons/bs';
import { FaBlog, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

interface NavItem {
    label: string;
    href: string;
    subItems?: NavItem[];
}

const mainNavItems:NavItem[] =[
    {label: "Home", href: "/"},
    {label: "Categories", href: "/categories", subItems: [
        {label: 'Politics', href: '/categories/politics'},
        {label: "Health", href: "/categories/health"},
        {label: "Design", href: "/categories/design"},
    ]},
    {label: "Lifestyle", href: "/categories/lifestyle"},
    {label: "Education", href: "/categories/education"},
    {label: "Health", href: "/categories/health"},
    {label: "Design", href: "/categories/design"},
    {label: "Technology", href: "/categories/technology"},
    {label: "Culture", href: "/categories/culture"},
    {label: "Contact", href: "/contact"},
    {
        label: "More",
        href: "#",
        subItems: [
            {label: "Search", href: "/search"},
            {label: "About", href: "/about"},
            {label: "Privacy Policy", href: "/privacy-policy"},
            {label: "Terms of Service", href: "/terms-of-service"},
        ]
    }
]

const Navbar = () => {
    const pathName = usePathname();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const theme = "light"; // This should be replaced with actual theme logic
  return (
    <header className='relative bg-white font-lora text-gray-800'>
        {/* top header */}
        <div className='hidden lg:block py-3'>
            <div className='blog-container flex items-center justify-between'>
                <h1 className='flex-shrink-0'>
                    <Link href="/" className='text-2xl flex items-center font-semibold text-gray-900 hover:text-primary transition-colors duration-300'>
                    <FaBlog/>
                    <span className='ml-1'>Blogs</span>
                    </Link>
                </h1>

                {/* top header rignt side */}
                <div className='flex items-center space-x-3'>
                    <div className='relative'>
                        <button onClick={() => setIsSearchOpen(!isSearchOpen)} className='p-2 rounded-full text-gray-500 hover:text-primary cursor-pointer transition-colors focus:outline-none'><BsSearch size={18}/></button>
                        {
                            isSearchOpen && (
                                <form action="/search" className='absolute top-full right-0 mt-2 p-2 bg-white rounded-md shadow-lg w-48 md:w-72 z-10 border border-gray-300'>
                                    <input type="text" name='q' placeholder='Search...' className='w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-500 focus:outline-none'/>
                                </form>
                            )
                        }
                    </div>
                    <button className='p-2 rounded-full text-gray-500 hover:text-primary cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary'>
                        {theme === 'light' ? <IoMdMoon size={18}/> : <IoMdSunny size={18}/>}
                    </button>

                    {/* social network */}
                    <ul className='flex items-center space-x-3'>
                        <li className='border p-2 border-gray-300 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary'>
                            <Link href="#" className='text-gray-500'>
                            <FaTwitter size={12}/>
                            </Link>
                        </li>
                        <li className='border p-2 border-gray-300 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary'>
                            <Link href="#" className='text-gray-500'>
                            <FaFacebookF size={12}/>
                            </Link>
                        </li>
                        <li className='border p-2 border-gray-300 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary'>
                            <Link href="#" className='text-gray-500'>
                            <BsInstagram size={12}/>
                            </Link>
                        </li>
                    </ul>

                    <Link href="/contact" className='px-5 py-1.5 border border-gray-300 text-gray-800 rounded-md hover:bg-green-600 hover:text-white trasition-colors focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer'>
                    Contact
                    </Link>

                    <SignedOut>
                        <SignInButton mode='modal'>
                            <button className='px-5 py-2 border border-gray-300 bg-green-600 text-white rounded-md hover:bg-green-700 hover:text-white trasition-colors focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer'>Sign In</button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                   
                </div>
            </div>
        </div>

        {/* main navigation */}
        <nav className='py-3 border-b border-gray-200'>
            {/* larger device */}
            <div className='blog-container '>
                {/* mobile menu toggle (hamburger) */}
                <div className='lg:hidden flex items-center justify-between w-full'>
                        <h1 className='flex-shrink-0'>
                        <Link href="/" className='text-2xl flex items-center font-semibold text-gray-900 hover:text-primary transition-colors duration-300'>
                            <FaBlog/>
                            <span className='ml-1'>Blogs</span>
                         </Link>
                         </h1>
                         <button 
                         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                         className='p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none  transition-colors duration-300 lg:hidden'>
                            {isMobileMenuOpen ? <HiOutlineX size={24}/> : <HiOutlineMenu size={24}/>}
                         </button>

                </div>

                <ul className='hidden lg:flex items-center justify-between space-x-6'>
                    {mainNavItems.map((item) => {
                        const isActive = pathName === item.href;
                        return (
                            <li key={item.label} className='group relative'>
                                <Link href={item.href} className={`inline-flex items-center text-sm uppercase font-medium rounded-md text-gray-500 hover:text-primary ${isActive ? ' text-primary' : ""}`}>
                                {item.label}
                                {item.subItems && <BsChevronDown size={16} className='ml-1 group-hover:rotate-180 transition-transform'/>}
                                </Link>
                                {
                                    item.subItems && (
                                        <ul className='absolute left-0 top-full mt-2 hidden group-hover:block bg-white shadow-lg rounded-md overflow-hidden z-20 min-w-[230px] border border-gray-200 '>
                                            {item.subItems.map((subItem) => (
                                                <li className='mt-1' key={subItem.label}>
                                                    <Link href={subItem.href} className='block px-4 py-2 text-sm uppercase text-gray-700 hover:bg-gray-100 transition-colors'>{subItem.label}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )
                                }
                            </li>
                        )
                    })}
                </ul>
            </div>

            {/* mobile menu  */}
            {isMobileMenuOpen && (
                <div className='lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto'>
                    <div className='flex justify-end p-4'>
                        <button className='p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300' onClick={() => setIsMobileMenuOpen(false)}>
                            <HiOutlineX size={24}/>
                        </button>
                    </div>
                    <ul className='flex flex-col p-4  space-y-2'>
                        {mainNavItems.map((item) => {
                             const isActive = pathName === item.href;
                            return (
                             <li key={item.label} className='group relative'>
                                <Link href={item.href} className={`inline-flex items-center text-sm uppercase font-medium rounded-md text-gray-500 hover:text-primary ${isActive ? ' text-primary' : ""}`}>
                                {item.label}
                                {item.subItems && <BsChevronDown size={16} className='ml-1 group-hover:rotate-180 transition-transform'/>}
                                </Link>
                                {
                                    item.subItems && (
                                        <ul className='absolute left-0 top-full mt-2 hidden group-hover:block bg-white shadow-lg rounded-md overflow-hidden z-20 min-w-[230px] border border-gray-200 '>
                                            {item.subItems.map((subItem) => (
                                                <li className='mt-1' key={subItem.label}>
                                                    <Link href={subItem.href} className='block px-4 py-2 text-sm uppercase text-gray-700 hover:bg-gray-100 transition-colors'>{subItem.label}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )
                                }
                            </li>
                        )
                        })}
                        <li>
                            <SignedOut>
                        <SignInButton mode='modal'>
                            <button className='px-5 py-2 border border-gray-300 bg-green-600 text-white rounded-md hover:bg-green-700 hover:text-white trasition-colors focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer'>Sign In</button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    </header>
  )
}

export default Navbar
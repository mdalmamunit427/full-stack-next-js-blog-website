"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { user, isLoaded } = useUser()

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Add New Post", href: "/dashboard/add-post" },
    { label: "Manage Posts", href: "/dashboard/manage-posts" },
  ];

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if(!user?.publicMetadata?.role || user?.publicMetadata?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">You must be signed in to access the admin panel.</p>
          <SignInButton>
                <button className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Sign In to Admin Panel
                </button>
          </SignInButton>
          
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen container max-w-7xl mx-auto -mt-16  px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-800 text-white flex-shrink-0">
        <nav className="p-6 space-y-4">
          <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                    pathname === item.href ? "bg-gray-700 font-semibold" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
            <div className="mt-6">
                <Link
                href="/"
                className="block px-4 py-2 text-center bg-blue-600 hover:bg-blue-700 rounded transition"
                >
                Go to Home
                </Link>
            </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default Layout;

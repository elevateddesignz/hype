// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from './CartContext';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items } = useCart();
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);

  const toggleMobileMenu = () => setMobileOpen(open => !open);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/logo.PNG" alt="HypeEmUp" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/builder"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Build a Chain
            </Link>
            <Link
              to="/shop"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Shop
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative text-gray-700 hover:text-indigo-600 p-2">
              <ShoppingCartIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {[
              { to: '/', label: 'Home' },
              { to: '/builder', label: 'Build a Chain' },
              { to: '/shop', label: 'Shop' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
              >
                {label}
              </Link>
            ))}

            {/* Cart in Mobile Menu */}
            <Link
              to="/cart"
              onClick={() => setMobileOpen(false)}
              className="flex items-center text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
            >
              <ShoppingCartIcon className="h-6 w-6 mr-2" />
              Cart
              {itemCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

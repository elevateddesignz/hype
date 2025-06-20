// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { CartProvider } from '../components/CartContext';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { FeaturedProducts } from '../components/FeaturedProducts';
import BuilderPage from './pages/Builder';
import CartPage from './pages/Cart';
import { ThankYou } from './pages/ThankYou';
import { Cancel } from './pages/Cancel';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        {/* Global Navbar */}
        <Navbar />

        <main className="min-h-screen">
          <Routes>
            {/* Home */}
            <Route
              path="/"
              element={
                <div className="min-h-screen bg-gray-50 flex flex-col">
                  <Hero />
                  <FeaturedProducts />
                </div>
              }
            />

            {/* Build a Chain */}
            <Route
              path="/builder"
              element={
                <div
                  className="min-h-screen bg-fixed bg-cover bg-center flex items-center justify-center"
                  style={{ backgroundImage: "url('/backmaker.png')" }}
                >
                  <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                    <BuilderPage />
                  </div>
                </div>
              }
            />

            {/* Cart / Shop */}
            <Route path="/shop" element={<CartPage />} />
            <Route path="/cart" element={<CartPage />} />

            {/* Post-checkout: Thank You */}
            <Route
              path="/thank-you"
              element={
                <div
                  className="min-h-screen bg-fixed bg-cover bg-center flex items-center justify-center"
                  style={{ backgroundImage: "url('/backmaker.png')" }}
                >
                  <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                    <ThankYou />
                  </div>
                </div>
              }
            />

            {/* Post-checkout: Cancel */}
            <Route
              path="/cancel"
              element={
                <div
                  className="min-h-screen bg-fixed bg-cover bg-center flex items-center justify-center"
                  style={{ backgroundImage: "url('/backmaker.png')" }}
                >
                  <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                    <Cancel />
                  </div>
                </div>
              }
            />

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  );
}

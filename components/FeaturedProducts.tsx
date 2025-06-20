// src/components/FeaturedProducts.tsx
import React from 'react';

interface Product {
  id: string;
  name: string;
  priceCents: number;
  image: string;
}

const PRODUCTS: Product[] = [
  { id: 'graduation', name: 'Graduation Chain', priceCents: 5500, image: '/kchain.png' },
  { id: 'birthday',   name: 'Birthday Champion Chain', priceCents: 5500, image: '/ethan.png' },
  { id: 'mvp',        name: 'MVP Chain', priceCents: 6000, image: '/mvp.png' },
];

export function FeaturedProducts() {
  return (
    <section className="w-full bg-gray-100 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Chains</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map(p => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transform transition"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-72 h-72 object-contain mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
              <p className="text-primary text-lg font-bold">
                ${(p.priceCents / 100).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

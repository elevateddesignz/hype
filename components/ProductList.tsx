// ProductList.js
import React from 'react';
import { useCart } from './CartContext';

const PRODUCTS = [
  { id: 1, name: 'T-shirt', priceCents: 2000 },
  { id: 2, name: 'Coffee Mug', priceCents: 1500 },
  // …etc
];

export default function ProductList() {
  const { addItem } = useCart();
  return (
    <div>
      {PRODUCTS.map(p => (
        <div key={p.id} style={{ marginBottom: 16 }}>
          <strong>{p.name}</strong> — ${(p.priceCents / 100).toFixed(2)}  
          <button onClick={() => addItem(p)} style={{ marginLeft: 8 }}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

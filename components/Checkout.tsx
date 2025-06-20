// src/components/Checkout.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useCart } from './CartContext';

declare global {
  interface Window { paypal: any }
}

export function Checkout() {
  const { items, totalCents, clearCart } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!window.paypal || !containerRef.current) return;

    window.paypal.Buttons({
      style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'paypal' },

      // 1. Create order on our server
      createOrder: async () => {
        const resp = await fetch(
          'https://api.hypeemup.com/api/create-paypal-order',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: totalCents() }),
          }
        );
        const { orderID } = await resp.json();
        return orderID;
      },

      // 2. Capture payment in the browser
      onApprove: async data => {
        try {
          const details = await window.paypal
            .Buttons({}) // dummy to get types
            .order
            .capture({ orderID: data.orderID });
          
          clearCart();
          window.location.href = '/thank-you';
        } catch (e: any) {
          console.error(e);
          setError('Capture failed');
        }
      },

      onError: err => {
        console.error(err);
        setError('Payment could not be processed');
      },
    }).render(containerRef.current);
  }, [totalCents, clearCart]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-disc ml-6 mt-2">
            {items.map(i => (
              <li key={i.id}>
                {i.name} × {i.qty} — ${(i.priceCents * i.qty / 100).toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-semibold">
            Total: ${(totalCents() / 100).toFixed(2)}
          </p>

          <div ref={containerRef} className="my-4" />
          {error && <p className="text-red-600">{error}</p>}
        </>
      )}
    </div>
  );
}

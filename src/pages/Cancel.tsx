// src/pages/Cancel.tsx
import React from 'react';

export function Cancel() {
  return (
    <div className="max-w-md mx-auto p-6 mt-12 bg-white rounded-2xl shadow-lg text-center">
      <h1 className="text-2xl font-bold mb-4">Payment Canceled</h1>
      <p>Your payment was canceled. You can go back and try again.</p>
      <button
        onClick={() => (window.location.href = '/')}
        className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
      >
        Return Home
      </button>
    </div>
  );
}

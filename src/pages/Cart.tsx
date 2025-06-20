// src/pages/Cart.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../components/CartContext';
import { Button } from '../../components/ui/Button';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();

  const totalCents = items.reduce((sum, i) => sum + i.priceCents * i.qty, 0);
  const totalDollars = (totalCents / 100).toFixed(2);

  const bgWrapper = (content: React.ReactNode) => (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/backmaker.png')" }}
    >
      {content}
    </div>
  );

  if (items.length === 0) {
    return bgWrapper(
      <div className="bg-white bg-opacity-90 rounded-2xl p-8 shadow-lg text-center">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">
          Your cart is empty
        </h2>
        <Link to="/builder">
          <Button>Build Your First Chain</Button>
        </Link>
      </div>
    );
  }

  return bgWrapper(
    <div className="w-full max-w-3xl bg-white bg-opacity-90 rounded-2xl shadow-lg p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Your Cart</h1>

      <ul className="divide-y divide-gray-200 mb-8 space-y-6">
        {items.map((item) => (
          <li
            key={item.id}
            className="py-6 flex flex-col sm:flex-row sm:items-center justify-between"
          >
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-medium text-gray-800">
                {item.name}
              </h3>

              <p>
                <strong>Pendant Style:</strong> {item.pendantStyle}
              </p>
              <p>
                <strong>Chain Type:</strong> {item.chainType}
              </p>
              {item.engraving && (
                <p>
                  <strong>Engraving:</strong> {item.engraving}
                </p>
              )}
              {item.year && (
                <p>
                  <strong>Year:</strong> {item.year}
                </p>
              )}
              <p>
                <strong>Primary Color:</strong> {item.primaryColorName}
              </p>
              <p>
                <strong>Secondary Color:</strong> {item.secondaryColorName}
              </p>
              {item.comment && (
                <p>
                  <strong>Special Instructions:</strong> {item.comment}
                </p>
              )}

              {item.previewUrl && (
                <img
                  src={item.previewUrl}
                  alt="Reference"
                  className="w-24 h-24 object-cover rounded"
                />
              )}

              <div className="mt-4 flex items-center space-x-3">
                <label className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Qty:</span>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) =>
                      updateQuantity(
                        item.id,
                        Math.max(1, parseInt(e.target.value, 10))
                      )
                    }
                    className="w-16 rounded-md border border-gray-300 p-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </label>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </Button>
              </div>
            </div>

            <div className="mt-6 sm:mt-0 flex-shrink-0 text-lg font-semibold text-gray-800">
              ${(item.priceCents * item.qty / 100).toFixed(2)}
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <span className="text-2xl font-semibold text-gray-800">Total:</span>
        <span className="mt-2 sm:mt-0 text-3xl font-bold text-indigo-600">
          ${totalDollars}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <Button
          onClick={() => {
            /* TODO: call your Square checkout endpoint here */
          }}
          className="flex-1"
        >
          Proceed to Checkout
        </Button>
        <Button variant="secondary" onClick={clearCart} className="flex-1">
          Clear Cart
        </Button>
      </div>
    </div>
  );
}

// src/pages/ThankYou.tsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';

export function ThankYou() {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');

  return (
    <div className="max-w-md mx-auto p-6 mt-12 bg-white rounded-2xl shadow-lg text-center">
      <h1 className="text-2xl font-bold mb-4">Thank You for Your Purchase!</h1>
      <p className="mb-2">Your payment was successful.</p>
      {sessionId && (
        <p className="text-sm text-gray-500">
          Session ID: <code>{sessionId}</code>
        </p>
      )}
      <p className="mt-4">
        You’ll receive a confirmation email soon. If you have questions, contact support.
      </p>
    </div>
  );
}

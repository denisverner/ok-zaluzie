'use client';

import { useState, useEffect } from 'react';

const COOKIE_KEY = 'ok_zaluzie_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage not available (private mode etc.) – hide banner
    }
  }, []);

  function accept() {
    try { localStorage.setItem(COOKIE_KEY, 'accepted'); } catch { /* ignore */ }
    setVisible(false);
  }

  function decline() {
    try { localStorage.setItem(COOKIE_KEY, 'declined'); } catch { /* ignore */ }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Souhlas s cookies"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-[60] bg-gray-900 text-white rounded-2xl shadow-2xl p-5 animate-fade-in-up"
    >
      <p className="text-sm text-gray-300 leading-relaxed mb-4">
        Používáme cookies pro analýzu návštěvnosti a zlepšení webu. Žádné osobní údaje neprodáváme.{' '}
        <a href="/gdpr" className="underline text-accent-400 hover:text-accent-300 transition-colors">
          Více informací
        </a>
      </p>
      <div className="flex gap-2">
        <button
          onClick={accept}
          className="flex-1 bg-accent-600 hover:bg-accent-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
        >
          Souhlasím
        </button>
        <button
          onClick={decline}
          className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium py-2.5 rounded-xl transition-colors"
        >
          Odmítnout
        </button>
      </div>
    </div>
  );
}

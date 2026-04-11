'use client';

import { useState, useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

const NAV = [
  { label: 'O nás',   href: '#o-nas'   },
  { label: 'Žaluzie', href: '#zaluzie' },
  { label: 'Sítě proti hmyzu', href: '#site' },
  { label: 'Kontakt', href: '#kontakt' },
];

export default function Header() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile menu on outside-click */
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [menuOpen]);

  const handleCta = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackEvent('click_cta_poptavka', { location: 'header' });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group" aria-label="OK-ŽALUZIE – domů">
            {/* Slat icon */}
            <div className="flex flex-col gap-[3px] w-6">
              {[100, 80, 90, 70].map((w, i) => (
                <span
                  key={i}
                  className="block h-[3px] rounded-full bg-accent-600 transition-all duration-300 group-hover:bg-accent-700"
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900">
              OK<span className="text-accent-600">‑ŽALUZIE</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Hlavní navigace">
            {NAV.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="nav-link text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#kontakt"
            onClick={handleCta}
            className="hidden md:inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            Poptávka
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label={menuOpen ? 'Zavřít menu' : 'Otevřít menu'}
            aria-expanded={menuOpen}
            onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v); }}
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? (
                <>
                  <line x1="4" y1="4" x2="18" y2="18" />
                  <line x1="18" y1="4" x2="4" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="7"  x2="19" y2="7"  />
                  <line x1="3" y1="12" x2="19" y2="12" />
                  <line x1="3" y1="17" x2="19" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden bg-white border-t border-gray-100 ${
          menuOpen ? 'max-h-80 shadow-lg' : 'max-h-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="flex flex-col px-4 py-3 gap-1" aria-label="Mobilní navigace">
          {NAV.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="py-3 px-2 text-sm font-medium text-gray-700 hover:text-accent-600 border-b border-gray-50 transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={handleCta}
            className="mt-3 mb-2 text-center bg-accent-600 hover:bg-accent-700 text-white text-sm font-semibold px-5 py-3 rounded-lg transition-colors"
          >
            Poptávka
          </a>
        </nav>
      </div>

      {/* Sticky bottom CTA on mobile (visible after scroll) */}
      {scrolled && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-white border-t border-gray-200 flex gap-2 shadow-lg">
          <a
            href="tel:+420773071707"
            onClick={() => trackEvent('click_phone', { location: 'sticky_bar' })}
            className="flex-1 text-center border border-gray-300 text-gray-800 text-sm font-semibold py-3 rounded-lg transition-colors hover:bg-gray-50"
          >
            Zavolat
          </a>
          <a
            href="#kontakt"
            onClick={() => trackEvent('click_cta_poptavka', { location: 'sticky_bar' })}
            className="flex-1 text-center bg-accent-600 text-white text-sm font-semibold py-3 rounded-lg transition-colors hover:bg-accent-700"
          >
            Poptávka
          </a>
        </div>
      )}
    </header>
  );
}

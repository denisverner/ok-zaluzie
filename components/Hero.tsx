'use client';

import { trackEvent } from '@/lib/analytics';

const TRUST_ITEMS = [
  { icon: '✓', text: '10+ let zkušeností' },
  { icon: '⚡', text: 'Rychlá montáž'      },
  { icon: '📍', text: 'Jihomoravský kraj'  },
  { icon: '🔧', text: 'Servis & opravy'    },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-white via-accent-50 to-slate-50 pt-16"
    >
      {/* Background decorative slats */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute right-[-60px] top-[15%] w-[340px] opacity-[0.07]">
          <div className="blind-deco">
            {[...Array(10)].map((_, i) => (
              <span key={i} style={{ width: `${90 - i * 4}%` }} className="block h-[14px] rounded-full bg-accent-600" />
            ))}
          </div>
        </div>
        <div className="absolute left-[-40px] bottom-[10%] w-[220px] opacity-[0.05]">
          <div className="blind-deco">
            {[...Array(7)].map((_, i) => (
              <span key={i} style={{ width: `${80 - i * 5}%` }} className="block h-[10px] rounded-full bg-accent-600" />
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent-50 border border-accent-100 text-accent-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" aria-hidden />
            Jihomoravský kraj
          </div>

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6 animate-fade-in-up">
            Žaluzie a sítě proti hmyzu{' '}
            <span className="text-accent-600">na míru</span>
            <br />
            pro váš domov
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            Montáž, opravy a servis stínění. Interiérové i vertikální žaluzie,
            sítě proti hmyzu. Vše na míru s odbornou montáží.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <a
              href="#kontakt"
              onClick={() => trackEvent('click_cta_poptavka', { location: 'hero' })}
              className="inline-flex items-center justify-center gap-2 bg-accent-600 hover:bg-accent-700 active:bg-accent-800 text-white font-semibold px-7 py-4 rounded-xl text-base shadow-md shadow-accent-200 transition-all hover:-translate-y-0.5"
            >
              Nezávazná poptávka
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="tel:+420773071707"
              onClick={() => trackEvent('click_phone', { location: 'hero' })}
              className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-800 font-semibold px-7 py-4 rounded-xl text-base transition-all hover:-translate-y-0.5 shadow-sm"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012 .92h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              +420 773 071 707
            </a>
          </div>
        </div>

        {/* Trust strip */}
        <div
          className="mt-16 pt-10 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-6 animate-fade-in-up"
          style={{ animationDelay: '0.35s', animationFillMode: 'both' }}
        >
          {TRUST_ITEMS.map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <span className="text-xl" aria-hidden>{icon}</span>
              <span className="text-sm font-medium text-gray-600">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

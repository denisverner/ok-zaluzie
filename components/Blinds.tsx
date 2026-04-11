'use client';

import { trackEvent } from '@/lib/analytics';

const TYPES = [
  {
    title: 'Horizontální žaluzie',
    desc:  'Klasické hliníkové lamely pro dokonalou regulaci světla a soukromí. Dostupné v desítkách barev a povrchových úprav, přesně na míru vašim oknům.',
    img: {
      src: '/images/horizontalni-zaluzie.jpg',
      alt: 'Horizontální žaluzie – hliníkové lamely na okně',
    },
  },
  {
    title: 'Vertikální žaluzie',
    desc:  'Elegantní textilní lamely vhodné pro velká okna, balkonové dveře i kancelářské prostory. Snadné ovládání, výborné stínění, moderní vzhled.',
    img: {
      src: '/images/vertikalni-zaluzie.jpg',
      alt: 'Vertikální žaluzie – textilní lamely v interiéru',
    },
  },
];

export default function Blinds() {
  return (
    <section id="zaluzie" className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <span className="text-sm font-semibold text-accent-600 tracking-widest uppercase">Služby</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Žaluzie</h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Nabízíme kompletní dodávku, montáž i servis žaluzií. Vždy na míru vašim oknům.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {TYPES.map(({ title, desc, img }, i) => (
            <div
              key={title}
              className={`reveal reveal-delay-${i + 1} bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Image */}
              <div className="w-full h-56 overflow-hidden bg-gray-100">
                <img
                  src={img.src}
                  alt={img.alt}
                  width={640}
                  height={380}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Text */}
              <div className="p-7">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal text-center">
          <a
            href="#kontakt"
            onClick={() => trackEvent('click_cta_poptavka', { location: 'blinds_section' })}
            className="inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-md shadow-accent-200"
          >
            Poptat žaluzie
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

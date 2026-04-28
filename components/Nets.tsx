'use client';

import Image from 'next/image';
import { trackEvent } from '@/lib/analytics';

const TYPES = [
  {
    title: 'Okenní sítě',
    desc:  'Pevné okenní sítě pro každý typ okna. Neomezuje výhled ani proudění vzduchu a je vhodná pro všechny typy oken v bytech i rodinných domech. Instalace bez vrtání, přesně na míru.',
    img: {
      src: '/images/okenni-sit.jpg',
      alt: 'Okenní síť proti hmyzu – rámová montáž',
    },
  },
  {
    title: 'Dveřní sítě',
    desc:  'Dveřní síť proti hmyzu je praktickým a spolehlivým řešením pro ochranu vašeho domova před nežádoucím hmyzem. Díky pevnému hliníkovému rámu vyniká dlouhou životností, odolností a stabilitou při každodenním používání. Vhodné pro vchodové dveře, terasy i balkóny.',
    img: {
      src: '/images/dverni-sit.jpg',
      alt: 'Dveřní síť proti hmyzu – vstupní dveře',
    },
  },
];

export default function Nets() {
  return (
    <section id="site" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <span className="text-sm font-semibold text-accent-600 tracking-widest uppercase">Služby</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Sítě proti hmyzu</h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Nechte přírodu venku. Sítě instalujeme na míru každého okna i dveří.
          </p>
          <p className="mt-2 text-gray-400 text-sm leading-relaxed">
            Pevné okenní sítě rámové pro každý typ okna. Instalace bez vrtání přesně na míru.
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
              <div className="relative w-full h-56 overflow-hidden bg-gray-100">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
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
            onClick={() => trackEvent('click_cta_poptavka', { location: 'nets_section' })}
            className="inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-md shadow-accent-200"
          >
            Poptat sítě proti hmyzu
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

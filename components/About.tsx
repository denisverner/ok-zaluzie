const TRUST = [
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Rodinná firma',
    desc:  'Osobní přístup a záruka spokojenosti s každou zakázkou.',
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: '10+ let zkušeností',
    desc:  'Stovky spokojených zákazníků v celém Jihomoravském kraji.',
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Rychlá montáž',
    desc:  'Profesionální instalace na první dobrou, bez zbytečných průtahů.',
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: 'Lokální působnost',
    desc:  'Jsme vždy blízko, ať potřebujete cokoli.',
  },
];

export default function About() {
  return (
    <section id="o-nas" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div className="reveal">
            <span className="text-sm font-semibold text-accent-600 tracking-widest uppercase">O nás</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Spolehlivý partner pro stínění vašeho domova
            </h2>
            <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
              <p>
                Jsme firma <strong className="text-gray-800">DULUX SERVICE s.r.o.</strong> a specializujeme
                se na dodávku, montáž a servis žaluzií a sítí proti hmyzu pro domácnosti i firmy.
              </p>
            </div>
          </div>

          {/* Trust grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TRUST.map(({ icon, title, desc }, i) => (
              <div
                key={title}
                className={`reveal reveal-delay-${i + 1} bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow`}
              >
                <div className="w-10 h-10 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center mb-4">
                  {icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

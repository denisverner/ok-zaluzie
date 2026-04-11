const NAV_LINKS = [
  { label: 'O nás',   href: '#o-nas'   },
  { label: 'Žaluzie', href: '#zaluzie' },
  { label: 'Sítě proti hmyzu',    href: '#site'    },
  { label: 'Kontakt', href: '#kontakt' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex flex-col gap-[3px] w-5">
                {[100, 80, 90, 70].map((w, i) => (
                  <span key={i} className="block h-[2.5px] rounded-full bg-accent-500" style={{ width: `${w}%` }} />
                ))}
              </div>
              <span className="text-white font-bold text-base tracking-tight">
                OK<span className="text-accent-500">‑ŽALUZIE</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              Montáž, opravy a servis žaluzií a sítí proti hmyzu v Jihomoravském kraji.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Navigace</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company info */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Firma</h3>
            <address className="not-italic space-y-1.5 text-sm">
              <p className="text-gray-300 font-medium">DULUX SERVICE s.r.o.</p>
              <p>Nové Město 297/2a, 742 35 Odry</p>
              <p>IČ: 02512491</p>
              <p>DIČ: CZ02512491</p>
              <div className="pt-2 space-y-1">
                <p>
                  <a href="tel:+420773071707" className="hover:text-white transition-colors">
                    +420 773 071 707
                  </a>
                </p>
                <p>
                  <a href="mailto:info@ok-zaluzie.cz" className="hover:text-white transition-colors">
                    info@ok-zaluzie.cz
                  </a>
                </p>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-600">
          <p>© {year} DULUX SERVICE s.r.o. Všechna práva vyhrazena.</p>
          <a href="/gdpr" className="hover:text-gray-400 transition-colors">
            Ochrana osobních údajů & Cookies
          </a>
        </div>
      </div>
    </footer>
  );
}

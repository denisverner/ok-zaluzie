import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Ochrana osobních údajů & Cookies | OK-ŽALUZIE',
  description:
    'Informace o zpracování osobních údajů a používání cookies na webu OK-ŽALUZIE (DULUX SERVICE s.r.o.).',
  robots: { index: false, follow: false },
};

export default function GdprPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Zpět na hlavní stránku
          </Link>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Ochrana osobních údajů
        </h1>
        <p className="text-sm text-gray-400 mb-10">Platné od 1. 1. 2024</p>

        <div className="space-y-10 text-gray-700 leading-relaxed">

          {/* 1 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Správce osobních údajů</h2>
            <p>
              Správcem osobních údajů je společnost <strong>DULUX SERVICE s.r.o.</strong>,
              se sídlem Nové Město 297/2a, 742 35 Odry, IČ: 02512491, DIČ: CZ02512491
              (dále jen „správce" nebo „my").
            </p>
            <div className="mt-3 space-y-1 text-sm">
              <p>E-mail: <a href="mailto:info@ok-zaluzie.cz" className="text-accent-600 hover:underline">info@ok-zaluzie.cz</a></p>
              <p>Telefon: <a href="tel:+420773071707" className="text-accent-600 hover:underline">+420 773 071 707</a></p>
            </div>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Jaké osobní údaje zpracováváme</h2>
            <p className="mb-3">Zpracováváme pouze údaje, které nám sami sdělíte prostřednictvím kontaktního formuláře:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Jméno a příjmení</li>
              <li>Telefonní číslo</li>
              <li>E-mailová adresa</li>
              <li>Obsah vaší zprávy (nepovinné)</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Účel a právní základ zpracování</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700 rounded-tl-lg">Účel</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Právní základ</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700 rounded-tr-lg">Doba uchování</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2 px-3">Odpověď na poptávku / dotaz</td>
                    <td className="py-2 px-3">Oprávněný zájem (čl. 6 odst. 1 písm. f) GDPR)</td>
                    <td className="py-2 px-3">2 roky od posledního kontaktu</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Plnění smlouvy (objednávka montáže)</td>
                    <td className="py-2 px-3">Plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR)</td>
                    <td className="py-2 px-3">5 let (zákonná archivace dokladů)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Příjemci osobních údajů</h2>
            <p className="mb-2">
              Vaše údaje neprodáváme ani nepředáváme třetím stranám za účelem marketingu.
              Údaje mohou být sdíleny pouze s:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <strong>Resend, Inc.</strong> – poskytovatel e-mailové služby pro doručení vaší poptávky
                (zpracovatel dle čl. 28 GDPR, smlouva o zpracování dat uzavřena)
              </li>
              <li>Orgány veřejné moci, pokud to ukládá zákon</li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Vaše práva</h2>
            <p className="mb-3">Máte právo kdykoliv:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><strong>Přístupu</strong> – zjistit, jaké údaje o vás zpracováváme</li>
              <li><strong>Opravy</strong> – požádat o opravu nepřesných údajů</li>
              <li><strong>Výmazu</strong> – požádat o smazání údajů („právo být zapomenut")</li>
              <li><strong>Omezení zpracování</strong> – požádat o omezení v zákonem stanovených případech</li>
              <li><strong>Přenositelnosti</strong> – obdržet údaje ve strojově čitelném formátu</li>
              <li><strong>Námitky</strong> – vznést námitku proti zpracování na základě oprávněného zájmu</li>
              <li>
                <strong>Podání stížnosti</strong> u dozorového orgánu –{' '}
                <a
                  href="https://www.uoou.cz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-600 hover:underline"
                >
                  Úřad pro ochranu osobních údajů (uoou.cz)
                </a>
              </li>
            </ul>
            <p className="mt-3 text-sm">
              Svá práva uplatněte e-mailem na{' '}
              <a href="mailto:info@ok-zaluzie.cz" className="text-accent-600 hover:underline">
                info@ok-zaluzie.cz
              </a>. Odpovíme do 30 dnů.
            </p>
          </section>

          {/* 6 – Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Cookies</h2>

            <h3 className="font-semibold text-gray-800 mb-2">Co jsou cookies</h3>
            <p className="mb-4 text-sm">
              Cookies jsou malé textové soubory ukládané do vašeho prohlížeče. Slouží ke
              správnému fungování webu a analýze návštěvnosti. Neobsahují osobní identifikační údaje.
            </p>

            <h3 className="font-semibold text-gray-800 mb-2">Typy cookies, které používáme</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700 rounded-tl-lg">Typ</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Název / účel</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700 rounded-tr-lg">Platnost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2 px-3 font-medium">Nezbytné</td>
                    <td className="py-2 px-3">
                      <code className="bg-gray-100 px-1 rounded text-xs">ok_zaluzie_cookie_consent</code>
                      {' '}– uložení vašeho souhlasu / odmítnutí cookies
                    </td>
                    <td className="py-2 px-3">Do smazání</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Analytické</td>
                    <td className="py-2 px-3">Google Analytics 4 – anonymizovaná analýza návštěvnosti (pouze při souhlasu)</td>
                    <td className="py-2 px-3">2 roky</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-semibold text-gray-800 mb-2">Správa souhlasu</h3>
            <p className="text-sm mb-3">
              Svůj souhlas s analytickými cookies můžete kdykoliv odvolat smazáním
              uložených dat v prohlížeči:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              <li>Otevřete nastavení prohlížeče</li>
              <li>Přejděte do sekce <em>Soukromí a zabezpečení → Cookies a data stránek</em></li>
              <li>Vyhledejte <strong>ok-zaluzie.cz</strong> a smažte uložená data</li>
            </ol>
            <p className="mt-3 text-sm">
              Po smazání se při příští návštěvě opět zobrazí banner s volbou souhlasu.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Zabezpečení údajů</h2>
            <p className="text-sm">
              Veškerá komunikace probíhá šifrovaně přes HTTPS. Přístup k osobním údajům
              mají pouze oprávněné osoby. Přijali jsme technická i organizační opatření
              odpovídající riziku zpracování.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Změny tohoto dokumentu</h2>
            <p className="text-sm">
              Tento dokument můžeme aktualizovat. Aktuální verze je vždy dostupná na této stránce.
              Datum platnosti je uveden v záhlaví.
            </p>
          </section>

        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Zpět na hlavní stránku
          </Link>
        </div>
      </main>
    </div>
  );
}

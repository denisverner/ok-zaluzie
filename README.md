# OK-ŽALUZIE

Web pro firmu **DULUX SERVICE s.r.o.** – montáž, opravy a servis žaluzií a sítí proti hmyzu v Jihomoravském kraji.

## Technologie

- [Next.js 15](https://nextjs.org/) (App Router)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Resend](https://resend.com/) – odesílání e-mailů z kontaktního formuláře
- TypeScript

## Spuštění lokálně

```bash
# 1. Nainstaluj závislosti
npm install

# 2. Vytvoř soubor s proměnnými
cp .env.example .env.local
# → doplň RESEND_API_KEY a CONTACT_EMAIL

# 3. Spusť vývojový server
npm run dev
# → http://localhost:3000
```

## Proměnné prostředí

| Proměnná | Popis |
|---|---|
| `RESEND_API_KEY` | API klíč z [resend.com](https://resend.com) |
| `CONTACT_EMAIL` | E-mail, kam chodí poptávky (výchozí: `info@ok-zaluzie.cz`) |

## Struktura projektu

```
app/
  page.tsx          – hlavní one-page web
  layout.tsx        – metadata, fonty, cookie banner
  gdpr/page.tsx     – stránka ochrany osobních údajů
  api/contact/      – API endpoint pro formulář (Resend)
components/
  Header.tsx        – navigace + sticky CTA
  Hero.tsx          – úvodní sekce
  About.tsx         – o nás
  Blinds.tsx        – žaluzie
  Nets.tsx          – sítě proti hmyzu
  Contact.tsx       – formulář + kontaktní info
  Footer.tsx        – patička
  CookieBanner.tsx  – souhlas s cookies
lib/
  analytics.ts      – helper pro GA4 / GTM events
public/images/      – vlastní fotky (sem nahrát obrázky)
```

## Nasazení (Vercel)

```bash
npx vercel --prod
```

V nastavení projektu na Vercel přidej environment variables `RESEND_API_KEY` a `CONTACT_EMAIL`.

## Vlastní obrázky

Fotky vlož do složky `public/images/` a uprav `src` v souborech `Blinds.tsx` a `Nets.tsx`:

```
horizontalni-zaluzie.jpg
vertikalni-zaluzie.jpg
okenni-sit.jpg
dverni-sit.jpg
```

Doporučený formát: **JPG nebo WebP**, rozměr min. **800 × 500 px**, velikost do **300 kB**.

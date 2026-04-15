import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? 'info@ok-zaluzie.cz';

/* ─── Simple in-memory rate limiter (resets on cold start) ─── */
const rateMap = new Map<string, { count: number; firstAt: number }>();
const LIMIT  = 5;
const WINDOW = 60 * 60 * 1000; // 1 hour

function checkRate(ip: string): boolean {
  const now  = Date.now();
  const data = rateMap.get(ip);
  if (!data || now - data.firstAt > WINDOW) {
    rateMap.set(ip, { count: 1, firstAt: now });
    return true;
  }
  if (data.count >= LIMIT) return false;
  data.count++;
  return true;
}

/* ─── Input sanitisation (XSS prevention) ─── */
function sanitize(raw: unknown, maxLen = 500): string {
  if (typeof raw !== 'string') return '';
  return raw
    .slice(0, maxLen)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

/* ─── Email regex ─── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: NextRequest) {
  /* Rate limit */
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (!checkRate(ip)) {
    return NextResponse.json(
      { error: 'Příliš mnoho požadavků. Zkuste to prosím za hodinu.' },
      { status: 429 },
    );
  }

  /* Parse body */
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Neplatný požadavek.' }, { status: 400 });
  }

  /* Honeypot – bots fill hidden fields; silently accept to avoid fingerprinting */
  if (body.website) {
    return NextResponse.json({ success: true });
  }

  const name    = sanitize(body.name,    100);
  const phone   = sanitize(body.phone,    30);
  const email   = sanitize(body.email,   254);
  const message = sanitize(body.message, 1000);

  /* Validation */
  if (!name || !phone || !email) {
    return NextResponse.json(
      { error: 'Vyplňte prosím všechna povinná pole.' },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: 'Zadejte prosím platnou e-mailovou adresu.' },
      { status: 400 },
    );
  }

  if (!/^[+\d\s\-()]{6,20}$/.test(phone.replace(/\s/g, ''))) {
    return NextResponse.json(
      { error: 'Zadejte prosím platné telefonní číslo.' },
      { status: 400 },
    );
  }

  /* Send via Resend (lazy init so build doesn't require the key) */
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from:    'Poptávka OK-ŽALUZIE <info@ok-zaluzie.cz>',
      to:      [CONTACT_EMAIL],
      replyTo: email,
      subject: `Nová poptávka – ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="cs"><body style="font-family:sans-serif;line-height:1.6;color:#111827;max-width:520px;margin:auto;padding:24px">
          <h2 style="color:#2563eb;margin-bottom:16px">Nová poptávka z webu OK-ŽALUZIE</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;font-weight:600;width:100px;vertical-align:top">Jméno:</td>    <td style="padding:8px 0">${name}</td></tr>
            <tr><td style="padding:8px 0;font-weight:600;vertical-align:top">Telefon:</td> <td style="padding:8px 0">${phone}</td></tr>
            <tr><td style="padding:8px 0;font-weight:600;vertical-align:top">E-mail:</td>  <td style="padding:8px 0">${email}</td></tr>
            ${message ? `<tr><td style="padding:8px 0;font-weight:600;vertical-align:top">Zpráva:</td>  <td style="padding:8px 0;white-space:pre-wrap">${message}</td></tr>` : ''}
          </table>
          <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb">
          <p style="font-size:12px;color:#6b7280">Odesláno z webu ok-zaluzie.cz</p>
        </body></html>
      `,
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return NextResponse.json(
        { error: 'Nepodařilo se odeslat zprávu. Zavolejte nám prosím na +420 773 071 707.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json(
      { error: 'Nastala neočekávaná chyba. Zavolejte nám prosím na +420 773 071 707.' },
      { status: 500 },
    );
  }
}

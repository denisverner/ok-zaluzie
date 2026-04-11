'use client';

import { useState, useRef, FormEvent } from 'react';
import { trackEvent } from '@/lib/analytics';

type Status = 'idle' | 'loading' | 'success' | 'error';

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-sm text-red-600" role="alert">{msg}</p>;
}

export default function Contact() {
  const [status,  setStatus]  = useState<Status>('idle');
  const [errMsg,  setErrMsg]  = useState('');
  const [errors,  setErrors]  = useState<Record<string, string>>({});

  const nameRef    = useRef<HTMLInputElement>(null);
  const phoneRef   = useRef<HTMLInputElement>(null);
  const emailRef   = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const honeypotRef= useRef<HTMLInputElement>(null);

  function validate() {
    const errs: Record<string, string> = {};
    const name  = nameRef.current?.value.trim()  ?? '';
    const phone = phoneRef.current?.value.trim()  ?? '';
    const email = emailRef.current?.value.trim()  ?? '';

    if (!name)  errs.name  = 'Zadejte prosím své jméno.';
    if (!phone) errs.phone = 'Zadejte prosím telefonní číslo.';
    if (!email) {
      errs.email = 'Zadejte prosím e-mailovou adresu.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      errs.email = 'E-mailová adresa není platná.';
    }
    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      // Focus first invalid field
      if (errs.name)  nameRef.current?.focus();
      else if (errs.phone) phoneRef.current?.focus();
      else if (errs.email) emailRef.current?.focus();
      return;
    }
    setErrors({});
    setStatus('loading');
    trackEvent('form_submit');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:     nameRef.current?.value.trim(),
          phone:    phoneRef.current?.value.trim(),
          email:    emailRef.current?.value.trim(),
          message:  messageRef.current?.value.trim(),
          website:  honeypotRef.current?.value, // honeypot
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        trackEvent('form_success');
      } else {
        setStatus('error');
        setErrMsg(data.error ?? 'Nastala chyba. Zkuste to prosím znovu.');
        trackEvent('form_error', { reason: data.error ?? 'unknown' });
      }
    } catch {
      setStatus('error');
      setErrMsg('Nepodařilo se odeslat zprávu. Zavolejte nám prosím na +420 773 071 707.');
      trackEvent('form_error', { reason: 'network' });
    }
  }

  const inputCls = (field: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm text-gray-900 placeholder-gray-400 bg-white
     focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-shadow
     ${errors[field] ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200 hover:border-gray-300'}`;

  return (
    <section id="kontakt" className="py-20 lg:py-28 bg-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14 reveal">
          <span className="text-sm font-semibold text-accent-600 tracking-widest uppercase">Kontakt</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Poptejte nás</h2>
          <p className="mt-4 text-gray-500">
            Vyplňte formulář a ozveme se vám do 24 hodin. Nebo nám rovnou zavolejte.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Form */}
          <div className="lg:col-span-3 reveal">
            {status === 'success' ? (
              <div className="flex flex-col items-center text-center py-16 px-8 bg-green-50 rounded-2xl border border-green-100">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
                  <svg className="text-green-600" width="32" height="32" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Děkujeme!</h3>
                <p className="text-gray-600">Vaše poptávka byla odeslána. Ozveme se vám co nejdříve.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Kontaktní formulář"
                className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100"
              >
                {/* Honeypot – hidden from humans, visible to bots */}
                <div className="absolute w-0 h-0 overflow-hidden" aria-hidden>
                  <input
                    ref={honeypotRef}
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="cf-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Jméno <span className="text-red-500" aria-hidden>*</span>
                    </label>
                    <input
                      id="cf-name"
                      ref={nameRef}
                      type="text"
                      autoComplete="name"
                      placeholder="Jana Nováková"
                      className={inputCls('name')}
                      aria-required
                      aria-describedby={errors.name ? 'err-name' : undefined}
                    />
                    {errors.name && <FieldError msg={errors.name} />}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="cf-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Telefon <span className="text-red-500" aria-hidden>*</span>
                    </label>
                    <input
                      id="cf-phone"
                      ref={phoneRef}
                      type="tel"
                      autoComplete="tel"
                      placeholder="+420 600 000 000"
                      className={inputCls('phone')}
                      aria-required
                      aria-describedby={errors.phone ? 'err-phone' : undefined}
                    />
                    {errors.phone && <FieldError msg={errors.phone} />}
                  </div>
                </div>

                {/* Email */}
                <div className="mb-5">
                  <label htmlFor="cf-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    E-mail <span className="text-red-500" aria-hidden>*</span>
                  </label>
                  <input
                    id="cf-email"
                    ref={emailRef}
                    type="email"
                    autoComplete="email"
                    placeholder="jana@email.cz"
                    className={inputCls('email')}
                    aria-required
                    aria-describedby={errors.email ? 'err-email' : undefined}
                  />
                  {errors.email && <FieldError msg={errors.email} />}
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label htmlFor="cf-message" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Zpráva <span className="text-gray-400 font-normal">(nepovinné)</span>
                  </label>
                  <textarea
                    id="cf-message"
                    ref={messageRef}
                    rows={4}
                    placeholder="Popište vaše okna, počet kusů, případně přiložte rozměry…"
                    className={`${inputCls('message')} resize-none`}
                  />
                </div>

                {/* Server error */}
                {status === 'error' && (
                  <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700" role="alert">
                    {errMsg}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 bg-accent-600 hover:bg-accent-700 disabled:bg-accent-400 text-white font-semibold py-3.5 px-6 rounded-xl transition-all text-sm"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin" width="18" height="18" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                      Odesílám…
                    </>
                  ) : (
                    'Odeslat poptávku'
                  )}
                </button>

                <p className="mt-3 text-center text-xs text-gray-400">
                  Odesláním souhlasíte se zpracováním osobních údajů za účelem odpovědi na poptávku.
                </p>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 reveal reveal-delay-2">
            <div className="space-y-6">
              {/* Phone */}
              <a
                href="tel:+420773071707"
                onClick={() => trackEvent('click_phone', { location: 'contact_section' })}
                className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-accent-200 hover:bg-accent-50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-accent-100 text-accent-600 flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012 .92h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Telefon</p>
                  <p className="font-semibold text-gray-900 group-hover:text-accent-700 transition-colors">+420 773 071 707</p>
                  <p className="text-xs text-gray-400 mt-0.5">Po–Pá 7:00–17:00</p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:info@ok-zaluzie.cz"
                onClick={() => trackEvent('click_email', { location: 'contact_section' })}
                className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-accent-200 hover:bg-accent-50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-accent-100 text-accent-600 flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">E-mail</p>
                  <p className="font-semibold text-gray-900 group-hover:text-accent-700 transition-colors">info@ok-zaluzie.cz</p>
                  <p className="text-xs text-gray-400 mt-0.5">Odpovídáme do 24 hodin</p>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-accent-100 text-accent-600 flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Oblast</p>
                  <p className="font-semibold text-gray-900">Jihomoravský kraj</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

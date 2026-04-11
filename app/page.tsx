'use client';

import { useEffect } from 'react';
import Header   from '@/components/Header';
import Hero     from '@/components/Hero';
import About    from '@/components/About';
import Blinds   from '@/components/Blinds';
import Nets     from '@/components/Nets';
import Contact  from '@/components/Contact';
import Footer   from '@/components/Footer';
import { trackEvent } from '@/lib/analytics';

export default function Home() {
  /* ─── Page-view + scroll-depth tracking ─── */
  useEffect(() => {
    trackEvent('page_view');

    const milestones = new Set<number>();
    const thresholds = [25, 50, 75, 100];

    const onScroll = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      thresholds.forEach((t) => {
        if (scrolled >= t && !milestones.has(t)) {
          milestones.add(t);
          trackEvent('scroll_depth', { percent: t });
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ─── Intersection Observer – reveal animations ─── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Blinds />
      <Nets />
      <Contact />
      <Footer />
    </main>
  );
}

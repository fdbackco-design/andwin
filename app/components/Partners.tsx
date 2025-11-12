'use client';

import { useEffect, useRef } from 'react';

const partners = [
  { image: '/assets/logos/풀무원.jpg', alt: 'Pulmuone' },
  { image: '/assets/logos/쿠첸.jpg', alt: 'CUCHEN' },
  { image: '/assets/logos/로보락.jpg', alt: 'roborock' },
  { image: '/assets/logos/삼성전자.jpg', alt: 'SAMSUNG' },
  { image: '/assets/logos/하만카돈.jpg', alt: 'harman/kardon' },
  { image: '/assets/logos/jbl.jpg', alt: 'JBL' },
  { image: '/assets/logos/인바디.jpg', alt: 'InBody' },
  { image: '/assets/logos/풀리오.jpg', alt: 'Pullio' },
  { image: '/assets/logos/보국.jpg', alt: 'Bokuk' },
  { image: '/assets/logos/테팔.jpg', alt: 'Tefal' },
  { image: '/assets/logos/드롱기.jpg', alt: 'DeLonghi' },
  { image: '/assets/logos/제니퍼룸.jpg', alt: 'JENNIFERROOM' },
  { image: '/assets/logos/쌍용.jpg', alt: '쌍용C&B' },
  { image: '/assets/logos/로투스.jpg', alt: 'Lotus Biscoff' },
  { image: '/assets/logos/힘펠.jpg', alt: 'HIMPEL' },
  { image: '/assets/logos/위닉스.jpg', alt: 'WINIX' },
  { image: '/assets/logos/루메나.jpg', alt: 'LUMENA' },
  { image: '/assets/logos/듀오덤.jpg', alt: '듀오덤' },
  { image: '/assets/logos/jmw.jpg', alt: 'JMW' },
  { image: '/assets/logos/필립스.jpg', alt: 'PHILIPS' },
  { image: '/assets/logos/나비엔.jpg', alt: 'NAVIEN' },
  { image: '/assets/logos/이너시아.jpg', alt: 'INERTIA' },
  { image: '/assets/logos/메디폼.jpg', alt: '메디폼' },
  { image: '/assets/logos/아이리버.jpg', alt: 'IRIVER' },
];

export default function Partners() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="our-partner" className="partners fade-in" ref={sectionRef}>
      <div className="container">
        <h2 className="partners__title">OUR PARTNERS</h2>
        <p className="partners__subtitle">앤드윈과 함께하는 브랜드</p>
        <ul className="partners__grid">
          {partners.map((partner, index) => (
            <li key={index}>
              <img src={partner.image} alt={partner.alt} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

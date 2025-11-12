'use client';

import { useEffect, useRef } from 'react';

const concepts = [
  { image: '/assets/concept/약국컨셉-그린스토어.JPG', alt: '약국 컨셉', caption: '약국 컨셉 · 그린스토어' },
  { image: '/assets/concept/고구마 밭-나성주꿀고구마.png', alt: '고구마 밭', caption: '고구마밭 · 나성주 꿀고구마' },
  { image: '/assets/concept/크로마키-현대쿡푸드.jpg', alt: '크로마키', caption: '크로마키 · 현대쿡푸드' },
  { image: '/assets/concept/탕비실컨셉-디자인밀.JPG', alt: '탕비실컨셉', caption: '탕비실 컨셉 · 디자인밀' },

  { image: '/assets/concept/휴게소컨셉-식자재왕.JPG', alt: '휴게소컨셉', caption: '휴게소 컨셉 · 식자재왕' },
  { image: '/assets/concept/야구장컨셉 -위칙x불꽃야구.JPG', alt: '야구장 컨셉', caption: '야구장 컨셉 · 위칙x불꽃야구' },
  { image: '/assets/concept/실험실컨셉-이너시아.JPG', alt: '실험실 컨셉', caption: '실험실 컨셉 · 이너시아' },
  { image: '/assets/concept/전후비교-제니퍼룸.JPG', alt: '전후 비교', caption: '전후 비교 · 제니퍼룸' },

  { image: '/assets/concept/흑백요리사-쿠첸.JPG', alt: '흑백요리사', caption: '흑백요리사 · 쿠첸' },
  { image: '/assets/concept/영상통화컨셉-풀무원가전.JPG', alt: '영상통화 컨셉', caption: '영상통화 컨셉 · 풀무원가전' },
  { image: '/assets/concept/보이는라디오-삼성음향.JPG', alt: '보이는 라디오', caption: '보이는 라디오 · 삼성음향' },
  { image: '/assets/concept/취조실컨셉-현대HT.JPG', alt: '취조실 컨셉', caption: '취조실컨셉 · 현대HT 도어락' },
];

export default function ConceptGallery() {
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
    <section className="concept-section fade-in" ref={sectionRef}>
      <div className="container">
        <header className="concept-header">
          <p className="concept-eyebrow">CONCEPT LIVE</p>
          <h3 className="concept-title">다양한 라이브 컨셉&촬영구도</h3>
        </header>

        <div className="concept-grid">
          {concepts.map((concept, index) => (
            <figure key={index} className="concept-card">
              <img
                src={concept.image}
                alt={concept.alt}
                className="concept-card__image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <figcaption className="concept-card__caption">{concept.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';

export default function Service() {
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
    <section id="service" className="section fade-in" ref={sectionRef}>
      <div className="container">
        <div className="section-heading">
          <h2 className="section-heading__title">라이브커머스의 모든것</h2>
          <p className="section-heading__subtitle">
            라이브 기획부터 송출, 마케팅, 섭외 등 전문 프로세스를 통한 수준 높은 컨텐츠 제작
          </p>
        </div>
        <div className="service-grid">
          <div className="service-card">
            <h3 className="service-card__title">LIVE COMMERCE</h3>
            <ul className="service-card__list">
              <li className="service-card__item">자체 스튜디오 운영</li>
              <li className="service-card__item">전문 쇼호스트 섭외</li>
              <li className="service-card__item">라이브 기획 & 연출</li>
            </ul>
          </div>
          <div className="service-card">
            <h3 className="service-card__title">ANDWIN ACADEMY</h3>
            <ul className="service-card__list">
              <li className="service-card__item">전문화 교육 과정</li>
              <li className="service-card__item">실전 중심 커리큘럼</li>
              <li className="service-card__item">카테고리 특화 교육</li>
            </ul>
          </div>
          <div className="service-card">
            <h3 className="service-card__title">MARKETING & CONSULTING</h3>
            <ul className="service-card__list">
              <li className="service-card__item">이커머스 성과 분석</li>
              <li className="service-card__item">브랜딩 전략</li>
              <li className="service-card__item">데이터 기반 컨설팅</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}


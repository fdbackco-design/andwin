'use client';

import { useEffect, useRef } from 'react';

export default function Academy() {
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
    <section id="academy" className="section academy fade-in" ref={sectionRef}>
      <div className="container">
        <div className="academy__inner">
          {/* 왼쪽: 이미지 */}
          <div className="academy__image">
            <img
              src="/assets/academy/academy-image.jpg"
              alt="LIVE ACADEMY"
              className="academy__image-img"
            />
          </div>

          {/* 오른쪽: 텍스트 콘텐츠 */}
          <div className="academy__content">
            <h2 className="academy__title">LIVE ACADEMY</h2>
            <h3 className="academy__heading">라이브커머스에 특화된 전문화 교육과정</h3>
            <div className="academy__text">
              <p>빠르고 정확하게 모바일에 라이브 쇼호스트를 위한 교육을 진행합니다</p>
              <p>홈쇼핑과 다르게 모바일라이브는 양방향 소통을 합니다.</p>
              <p>가전/뷰티/패션/리빙 등 모바일라이브에 맞는 교육을 합니다.</p>
            </div>
            <a href="#academy" className="academy__button">
              아카데미 알아보기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

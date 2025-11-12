'use client';

import { useEffect, useRef } from 'react';

export default function AndwinIs() {
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
    <section id="andwin-is" className="section andwin-is fade-in" ref={sectionRef}>
      <div className="container">
        <div className="section-heading">
          <h2 className="section-heading__title">ANDWIN LIVE STUDIO</h2>
        </div>
        <div className="andwin-is__content">
          <p>
            라이브커머스 기획·전략부터 스튜디오 및 온·오프라인 촬영, 전문 쇼호스트/제작진과의
            협업까지, 라이브커머스의 모든 것을 제공합니다.
          </p>
          <p>
            고품질의 방송 제작과 트렌디한 컨텐츠를 통해 브랜드와 소비자를 연결하는 전문
            라이브커머스 스튜디오입니다.
          </p>
        </div>
      </div>
    </section>
  );
}


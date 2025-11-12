'use client';

import { useState, useEffect, useRef } from 'react';

const slides = [
  {
    id: 1,
    image: '/assets/service/라이브커머스.jpg',
    title: 'LIVE COMMERCE',
  },
  {
    id: 2,
    image: '/assets/service/아카데미.jpg',
    title: 'ANDWIN ACADEMY',
  },
  {
    id: 3,
    image: '/assets/service/마케팅컨설팅.jpg',
    title: 'MARKETING & CONSULTING',
  },
];

const SPEED = 0.5; // 속도 (px/frame)

export default function AndwinServiceSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const positionRef = useRef<number>(0);
  const itemWidthRef = useRef<number>(0);
  const originalItemsCountRef = useRef<number>(0);

  // 무한 슬라이드 초기화 및 애니메이션
  useEffect(() => {
    if (!trackRef.current) return;

    // 기본 스타일 설정
    if (trackRef.current) {
      trackRef.current.style.display = 'flex';
      trackRef.current.style.transition = 'none';
      trackRef.current.style.willChange = 'transform';
    }

    // 아이템 복제
    const items = Array.from(trackRef.current.querySelectorAll('.gallery__item')) as HTMLElement[];
    if (items.length === 0) return;

    originalItemsCountRef.current = items.length;
    
    // 각 아이템을 복제해서 끝에 추가
    items.forEach((item) => {
      const clone = item.cloneNode(true) as HTMLElement;
      trackRef.current?.appendChild(clone);
    });

    // 첫 번째 아이템의 너비 계산 (gap 포함)
    const firstItem = items[0];
    if (firstItem) {
      const computedStyle = window.getComputedStyle(trackRef.current);
      const gapValue = parseFloat(computedStyle.gap || '0');
      const gap = Number.isFinite(gapValue) && gapValue > 0 ? gapValue : 24;
      itemWidthRef.current = firstItem.offsetWidth + gap;
    }

    // 루프 애니메이션
    const loop = () => {
      if (!trackRef.current) return;

      positionRef.current -= SPEED;

      // 원본 아이템들의 총 너비만큼 이동하면 처음으로 리셋
      if (Math.abs(positionRef.current) >= itemWidthRef.current * originalItemsCountRef.current) {
        positionRef.current = 0;
      }

      trackRef.current.style.transform = `translateX(${positionRef.current}px)`;
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // 복제된 아이템 제거
      if (trackRef.current) {
        const allItems = Array.from(trackRef.current.querySelectorAll('.gallery__item')) as HTMLElement[];
        if (allItems.length > originalItemsCountRef.current) {
          allItems.slice(originalItemsCountRef.current).forEach((item) => item.remove());
        }
      }
    };
  }, []);

  // Intersection Observer
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

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Parallax 스크롤 효과
  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current || !sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top + window.scrollY;
      const scrolled = window.scrollY;
      
      // 섹션이 뷰포트에 보일 때만 parallax 효과 적용
      if (rect.top < windowHeight && rect.bottom > 0) {
        // 섹션의 상대적 위치를 기준으로 parallax 계산
        const offset = scrolled - sectionTop;
        const rate = offset * 0.3; // parallax 속도 조절 (0.3 = 배경이 더 느리게 움직임)
        parallaxRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 초기 위치 설정

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 리사이즈 처리 - 아이템 너비 재계산
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!trackRef.current) return;

        const items = Array.from(trackRef.current.querySelectorAll('.gallery__item')) as HTMLElement[];
        if (items.length === 0) return;

        const firstItem = items[0];
        if (firstItem) {
          const computedStyle = window.getComputedStyle(trackRef.current);
          const gapValue = parseFloat(computedStyle.gap || '0');
          const gap = Number.isFinite(gapValue) && gapValue > 0 ? gapValue : 24;
          itemWidthRef.current = firstItem.offsetWidth + gap;
        }
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <>
      {/* Hero 섹션 */}
      <section className="andwin-hero fade-in" ref={heroRef}>
        <p className="andwin-hero__eyebrow">
          소비자의 니즈와 제품에 맞는 퀄리티 높은 방송과 트렌디한 컨텐츠 제작
        </p>
        <h1 className="andwin-hero__title">ANDWIN LIVE STUDIO</h1>
      </section>

      {/* Service 섹션 */}
      <section
        id="andwin-is"
        className="andwin-service fade-in"
        ref={sectionRef}
      >
        {/* Parallax 배경 */}
        <div className="andwin-service__parallax" ref={parallaxRef}></div>
        {/* 좌측: 갤러리 슬라이더 */}
        <div className="andwin-service__gallery">
            <div className="gallery__wrapper" ref={wrapperRef}>
              <div className="gallery__track" ref={trackRef}>
                {slides.map((slide) => (
                  <div key={slide.id} className="gallery__item">
                    <div className="gallery__item-container">
                      <div
                        className="gallery__image-wrap"
                        style={{
                          backgroundImage: `url(${slide.image})`,
                        }}
                      >
                        <img src={slide.image} alt={slide.title} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* 우측: 텍스트 콘텐츠 */}
          <div className="andwin-service__content">
            <div className="andwin-service__text-block">
              <h2 className="andwin-service__title">라이브커머스의 모든것</h2>
              <p className="andwin-service__subtitle">
                라이브 기획부터 송출, 마케팅, 섭외 등<br />
                라이브커머스 전문 프로세스를 통한 수준높은 컨텐츠 제작
                </p>
            </div>

            <div className="andwin-service__divider-wrapper">
              <hr className="andwin-service__divider" />
            </div>

            <div className="andwin-service__items">
              <div className="service-item">
                <p className="service-item__title">
                  <strong>LIVE COMMERCE</strong>
                </p>
                <p className="service-item__description">자체스튜디오 및 전문쇼호스트 보유</p>
              </div>

              <div className="service-item">
                <p className="service-item__title">
                  <strong>ANDWIN ACADEMY</strong>
                </p>
                <p className="service-item__description">아카데미를 통한 전문인력 양성</p>
              </div>

              <div className="service-item">
                <p className="service-item__title">
                  <strong>MARKETING & CONSULTING</strong>
                </p>
                <p className="service-item__description">이커머스 전반적인 마케팅 및 컨설팅</p>
              </div>
            </div>
          </div>
      </section>
    </>
  );
}

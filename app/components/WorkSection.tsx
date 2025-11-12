'use client';

import { useEffect, useRef, useState } from 'react';
import { workData, categoryLabels, WorkCategory } from '../data/workData';

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 767;
    }
    return false;
  });
  const sliderRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const trackRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const animationFrameRefs = useRef<{ [key: string]: number | null }>({});
  const positionRefs = useRef<{ [key: string]: number }>({});
  const itemWidthRefs = useRef<{ [key: string]: number }>({});
  const originalItemsCountRefs = useRef<{ [key: string]: number }>({});

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    // 초기 체크를 즉시 실행
    if (typeof window !== 'undefined') {
      checkMobile();
    }
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // 모바일 슬라이더 초기화 (AndwinServiceSection 방식 참고)
  useEffect(() => {
    if (!isMobile) {
      // 데스크톱일 때는 모든 애니메이션 정리 및 복제 아이템 제거
      Object.keys(animationFrameRefs.current).forEach((key) => {
        if (animationFrameRefs.current[key]) {
          cancelAnimationFrame(animationFrameRefs.current[key]!);
          animationFrameRefs.current[key] = null;
        }
      });

      // 복제된 아이템 제거
      Object.keys(trackRefs.current).forEach((key) => {
        const track = trackRefs.current[key];
        if (track) {
          const allItems = Array.from(track.querySelectorAll('.work-card')) as HTMLElement[];
          const originalCount = originalItemsCountRefs.current[key] || 0;
          if (allItems.length > originalCount) {
            allItems.slice(originalCount).forEach((item) => item.remove());
          }
          // 데스크톱에서는 스타일 초기화
          track.style.display = '';
          track.style.transition = '';
          track.style.willChange = '';
          track.style.transform = '';
        }
      });
      return;
    }

    const categories: WorkCategory[] = ['appliance', 'living', 'food', 'supplement'];
    const SPEED = 0.5;

    const initSlider = (category: WorkCategory) => {
      const trackKey = category;
      const track = trackRefs.current[trackKey];
      if (!track) return;

      // 기본 스타일 설정 (AndwinServiceSection 방식)
      track.style.display = 'flex';
      track.style.transition = 'none';
      track.style.willChange = 'transform';

      // 기존 복제 아이템 제거
      const allItems = Array.from(track.querySelectorAll('.work-card')) as HTMLElement[];
      const originalCount = originalItemsCountRefs.current[trackKey] || 0;
      if (allItems.length > originalCount) {
        allItems.slice(originalCount).forEach((item) => item.remove());
      }

      // 기존 애니메이션 정리
      if (animationFrameRefs.current[trackKey]) {
        cancelAnimationFrame(animationFrameRefs.current[trackKey]!);
      }

      // 아이템 복제 - DOM이 준비될 때까지 대기
      let retryCount = 0;
      const maxRetries = 50; // 최대 50번 재시도 (약 3초)
      const checkAndInit = () => {
        const items = Array.from(track.querySelectorAll('.work-card')) as HTMLElement[];
        if (items.length === 0 && retryCount < maxRetries) {
          // 아이템이 아직 없으면 다시 시도
          retryCount++;
          requestAnimationFrame(checkAndInit);
          return;
        }
        
        if (items.length === 0) {
          // 최대 재시도 횟수 초과 시 종료
          console.warn(`WorkSection: No items found for category ${trackKey} after ${maxRetries} retries`);
          return;
        }

        originalItemsCountRefs.current[trackKey] = items.length;
        positionRefs.current[trackKey] = 0;

        // 각 아이템을 복제해서 끝에 추가
        items.forEach((item) => {
          const clone = item.cloneNode(true) as HTMLElement;
          track.appendChild(clone);
        });

        // 첫 번째 아이템의 너비 계산 (gap 포함)
        const firstItem = items[0];
        if (firstItem) {
          const computedStyle = window.getComputedStyle(track);
          const gapValue = parseFloat(computedStyle.gap || '0');
          const gap = Number.isFinite(gapValue) && gapValue > 0 ? gapValue : 10;
          itemWidthRefs.current[trackKey] = firstItem.offsetWidth + gap;
        }

        // 루프 애니메이션
        const loop = () => {
          if (!trackRefs.current[trackKey]) return;

          positionRefs.current[trackKey] -= SPEED;

          // 원본 아이템들의 총 너비만큼 이동하면 처음으로 리셋
          if (
            Math.abs(positionRefs.current[trackKey]) >=
            itemWidthRefs.current[trackKey] * originalItemsCountRefs.current[trackKey]
          ) {
            positionRefs.current[trackKey] = 0;
          }

          if (trackRefs.current[trackKey]) {
            trackRefs.current[trackKey].style.transform = `translateX(${positionRefs.current[trackKey]}px)`;
          }
          animationFrameRefs.current[trackKey] = requestAnimationFrame(loop);
        };

        loop();
      };

      // DOM이 준비될 때까지 대기
      checkAndInit();
    };

    // 각 카테고리별 슬라이더 초기화 - DOM이 준비될 때까지 대기
    const initTimer = setTimeout(() => {
      categories.forEach((category) => {
        initSlider(category);
      });
    }, 100);

    // 리사이즈 처리 - 아이템 너비 재계산
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth <= 767) {
          categories.forEach((category) => {
            const trackKey = category;
            const track = trackRefs.current[trackKey];
            if (!track) return;

            const items = Array.from(track.querySelectorAll('.work-card')) as HTMLElement[];
            const originalCount = originalItemsCountRefs.current[trackKey] || 0;
            const originalItems = items.slice(0, originalCount);

            if (originalItems.length > 0) {
              const firstItem = originalItems[0];
              if (firstItem) {
                const computedStyle = window.getComputedStyle(track);
                const gapValue = parseFloat(computedStyle.gap || '0');
                const gap = Number.isFinite(gapValue) && gapValue > 0 ? gapValue : 10;
                itemWidthRefs.current[trackKey] = firstItem.offsetWidth + gap;
              }
            }
          });
        }
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(initTimer);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);

      // 정리
      Object.keys(animationFrameRefs.current).forEach((key) => {
        if (animationFrameRefs.current[key]) {
          cancelAnimationFrame(animationFrameRefs.current[key]!);
        }
      });

      // 복제된 아이템 제거
      Object.keys(trackRefs.current).forEach((key) => {
        const track = trackRefs.current[key];
        if (track) {
          const allItems = Array.from(track.querySelectorAll('.work-card')) as HTMLElement[];
          const originalCount = originalItemsCountRefs.current[key] || 0;
          if (allItems.length > originalCount) {
            allItems.slice(originalCount).forEach((item) => item.remove());
          }
        }
      });
    };
  }, [isMobile]);

  const categories: WorkCategory[] = ['appliance', 'living', 'food', 'supplement'];

  const getItemsByCategory = (category: WorkCategory) => {
    return workData.filter((item) => item.category === category).slice(0, 5);
  };

  return (
    <section id="work" className="section work fade-in" ref={sectionRef}>
      <div className="container">
        <div className="work__heading">
          <h2 className="work__heading-title">
            <strong>LIVE REFERENCE</strong>
          </h2>
          <p className="work__heading-subtitle">By ANDWIN</p>
        </div>
        {categories.map((category) => {
          const items = getItemsByCategory(category);
          
          if (!items || items.length === 0) {
            return null;
          }
          
          return (
            <div key={category} className="work__category-section">
              <h4 className="work__category-title">
                <span className="work__category-title-inner">
                  <strong>
                    {categoryLabels[category]}
                    <span className="work__category-others">
                      {categories
                        .filter((c) => c !== category)
                        .map((c) => `\u00A0\u00A0${categoryLabels[c]}`)
                        .join('\u00A0\u00A0')}
                      {'\u00A0\u00A0'}
                    </span>
                  </strong>
                </span>
              </h4>
              <div className="work__grid-wrapper">
                <div
                  className="work__grid-slider"
                  ref={(el) => {
                    sliderRefs.current[category] = el;
                  }}
                >
                  <div
                    className="work__grid work__grid-track"
                    ref={(el) => {
                      trackRefs.current[category] = el;
                    }}
                  >
                    {items.map((item, index) => {
                      const CardContent = (
                        <>
                          <div
                            className="work-card__image-wrap"
                            style={{
                              backgroundImage: `url(${item.image})`,
                              minHeight: '383px',
                              height: '383px',
                            }}
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="work-card__image"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          </div>
                          <div className="work-card__title">{item.title}</div>
                        </>
                      );

                      if (item.url) {
                        return (
                          <a
                            key={index}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="work-card"
                          >
                            {CardContent}
                          </a>
                        );
                      }

                      return (
                        <div key={index} className="work-card">
                          {CardContent}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


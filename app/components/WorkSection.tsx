'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
    // 데스크톱일 때는 모든 애니메이션 정리만 수행 (복제 아이템 제거는 하지 않음)
    if (!isMobile) {
      // 데스크톱에서는 슬라이더 초기화를 하지 않음 - CSS가 grid를 유지하도록
      Object.keys(animationFrameRefs.current).forEach((key) => {
        if (animationFrameRefs.current[key]) {
          cancelAnimationFrame(animationFrameRefs.current[key]!);
          animationFrameRefs.current[key] = null;
        }
      });

      // 데스크톱에서는 복제 아이템이 없으므로 제거 로직을 실행하지 않음
      // originalItemsCountRefs가 0이면 모든 원본 아이템까지 삭제될 수 있음
      return;
    }

    // 모바일일 때만 슬라이더 초기화 - DOM이 완전히 렌더링된 후 실행
    const categories: WorkCategory[] = ['appliance', 'living', 'food', 'supplement'];
    const SPEED = 0.5;

    const initSlider = (category: WorkCategory) => {
      const trackKey = category;
      const track = trackRefs.current[trackKey];
      if (!track) {
        //console.warn(`WorkSection: Track not found for category ${trackKey}`);
        return;
      }

      // 아이템 찾기 - 아이템이 렌더링될 때까지 대기
      let retryCount = 0;
      const maxRetries = 200; // 최대 200번 재시도 (약 12초)
      const checkAndInit = () => {
        const items = Array.from(track.querySelectorAll('.work-card')) as HTMLElement[];
        
        if (items.length === 0 && retryCount < maxRetries) {
          retryCount++;
          requestAnimationFrame(checkAndInit);
          return;
        }

        if (items.length === 0) {
          //console.warn(`WorkSection: No items found for category ${trackKey} after ${maxRetries} retries`);
          return;
        }

        // 기본 스타일 설정 (AndwinServiceSection 방식) - 아이템을 찾은 후에만 설정
        track.style.display = 'flex';
        track.style.transition = 'none';
        track.style.willChange = 'transform';

        // 기존 복제 아이템 제거 (originalCount가 0이면 실행하지 않음)
        const allItems = Array.from(track.querySelectorAll('.work-card')) as HTMLElement[];
        const originalCount = originalItemsCountRefs.current[trackKey] || 0;
        // originalCount가 0이면 복제 아이템이 없는 것이므로 제거하지 않음
        if (originalCount > 0 && allItems.length > originalCount) {
          allItems.slice(originalCount).forEach((item) => item.remove());
        }

        // 기존 애니메이션 정리
        if (animationFrameRefs.current[trackKey]) {
          cancelAnimationFrame(animationFrameRefs.current[trackKey]!);
        }

        originalItemsCountRefs.current[trackKey] = items.length;
        positionRefs.current[trackKey] = 0;

        // 각 아이템을 복제해서 끝에 추가
        items.forEach((item) => {
          const clone = item.cloneNode(true) as HTMLElement;
          track.appendChild(clone);
        });

        // 첫 번째 아이템의 너비 계산 (gap 포함) - 약간의 지연 후
        setTimeout(() => {
          const firstItem = items[0];
          if (firstItem) {
            const computedStyle = window.getComputedStyle(track);
            const gapValue = parseFloat(computedStyle.gap || '0');
            const gap = Number.isFinite(gapValue) && gapValue > 0 ? gapValue : 10;
            itemWidthRefs.current[trackKey] = firstItem.offsetWidth + gap;

            // 루프 애니메이션 시작
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
          }
        }, 50);
      };

      // 아이템이 렌더링될 때까지 대기
      checkAndInit();
    };

    // 각 카테고리별 슬라이더 초기화 - DOM이 완전히 렌더링된 후 실행
    const initTimer = setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          categories.forEach((category) => {
            initSlider(category);
          });
        });
      });
    }, 300);

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

      // 복제된 아이템 제거 (모바일에서만, originalCount가 0이면 실행하지 않음)
      Object.keys(trackRefs.current).forEach((key) => {
        const track = trackRefs.current[key];
        if (track) {
          const allItems = Array.from(track.querySelectorAll('.work-card')) as HTMLElement[];
          const originalCount = originalItemsCountRefs.current[key] || 0;
          // originalCount가 0이면 복제 아이템이 없는 것이므로 제거하지 않음
          if (originalCount > 0 && allItems.length > originalCount) {
            allItems.slice(originalCount).forEach((item) => item.remove());
          }
        }
      });
    };
  }, [isMobile]);

  const categories: WorkCategory[] = ['appliance', 'living', 'food', 'supplement'];

  const getItemsByCategory = (category: WorkCategory) => {
    const filtered = workData.filter((item) => item.category === category);
    return filtered.slice(0, 5);
  };

  // 디버깅: workData 확인 및 DOM 렌더링 확인 - DOM이 준비된 후 실행
  useEffect(() => {
    // 더 긴 지연 시간으로 DOM이 완전히 렌더링된 후 확인
    const timer = setTimeout(() => {
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            //console.log('WorkSection: workData length:', workData.length);
            categories.forEach((category) => {
              const items = getItemsByCategory(category);
              //console.log(`WorkSection: Category ${category} has ${items.length} items:`, items);
              
              // DOM에서 실제로 렌더링되었는지 확인
              const track = trackRefs.current[category];
              if (track) {
                const renderedItems = track.querySelectorAll('.work-card');
                //console.log(`WorkSection: Category ${category} - Rendered items in DOM:`, renderedItems.length);
                if (renderedItems.length > 0) {
                  const firstItem = renderedItems[0] as HTMLElement;
                  const img = firstItem.querySelector('img');
                  //console.log(`WorkSection: Category ${category} - First item image src:`, img?.src);
                  //console.log(`WorkSection: Category ${category} - First item image complete:`, img?.complete);
                } else {
                  //console.warn(`WorkSection: Category ${category} - No items rendered in DOM, track children:`, track.children.length);
                  //console.warn(`WorkSection: Category ${category} - Track innerHTML length:`, track.innerHTML.length);
                  //console.warn(`WorkSection: Category ${category} - Track outerHTML:`, track.outerHTML.substring(0, 200));
                }
              } else {
                //console.warn(`WorkSection: Category ${category} - Track not found`);
              }
            });
          });
        });
      });
      return () => cancelAnimationFrame(id);
    }, 1000); // 1초 지연
    
    return () => clearTimeout(timer);
  }, [categories.join(','), isMobile]);

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
            //console.warn(`WorkSection: No items found for category ${category}`);
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
                    {items && items.length > 0 ? items.map((item, index) => {
                      if (!item || !item.image) {
                        return null;
                      }

                      const cardKey = `${category}-${index}-${item.title}`;
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
                                //console.error(`WorkSection: Image failed to load: ${item.image}`);
                              }}
                              onLoad={() => {
                                //console.log(`WorkSection: Image loaded successfully: ${item.image}`);
                              }}
                            />
                          </div>
                          <div className="work-card__title">{item.title}</div>
                        </>
                      );

                      if (item.url) {
                        return (
                          <a
                            key={cardKey}
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
                        <div key={cardKey} className="work-card">
                          {CardContent}
                        </div>
                      );
                    }) : null}
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


'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const updateScrollState = () => {
      const scrollPosition = window.scrollY;
      const scrolled = scrollPosition > 50;
      setIsScrolled(scrolled);
      
      // 모바일에서 스크롤 시 body에 클래스 추가/제거
      if (window.innerWidth <= 767) {
        if (scrolled) {
          document.body.classList.add('header-scrolled');
        } else {
          document.body.classList.remove('header-scrolled');
        }
      } else {
        // 데스크톱에서는 클래스 제거
        document.body.classList.remove('header-scrolled');
      }
    };

    const handleScroll = () => {
      updateScrollState();
    };

    const handleResize = () => {
      updateScrollState();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    updateScrollState(); // 초기 상태 확인

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.body.classList.remove('header-scrolled');
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={`header ${isScrolled ? 'is-scrolled' : ''}`}>
      {/* 데스크톱 헤더 */}
      <div className="header__inner">
        <a href="#hero" className="header__logo" onClick={(e) => handleNavClick(e, '#hero')}>
          <img
            src="/assets/andwin-logo.png"
            alt="ANDWIN"
            className="header__logo-image"
          />
        </a>
        <nav className="header__nav">
          <a
            href="#andwin-is"
            className="header__nav-link"
            onClick={(e) => handleNavClick(e, '#andwin-is')}
          >
            ANDWIN IS
          </a>
          <a
            href="#work"
            className="header__nav-link"
            onClick={(e) => handleNavClick(e, '#work')}
          >
            WORK
          </a>
          <a
            href="#academy"
            className="header__nav-link"
            onClick={(e) => handleNavClick(e, '#academy')}
          >
            ACADEMY
          </a>
          <a
            href="#our-partner"
            className="header__nav-link"
            onClick={(e) => handleNavClick(e, '#our-partner')}
          >
            OUR PARTNER
          </a>
          <a
            href="#service"
            className="header__nav-link"
            onClick={(e) => handleNavClick(e, '#service')}
          >
            SERVICE
          </a>
          <a
            href="#contact-us"
            className="header__nav-link"
            onClick={(e) => handleNavClick(e, '#contact-us')}
          >
            CONTACT US
          </a>
        </nav>
      </div>

      {/* 모바일 헤더 */}
      <div className={`header__top ${isScrolled ? 'is-scrolled' : ''}`}>
        <button
          className={`header__menu-toggle ${isMenuOpen ? 'is-open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="메뉴 토글"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1 className="header__title">앤드윈 스튜디오</h1>
      </div>
      {!isScrolled && (
        <nav className={`header__nav header__nav--mobile ${isMenuOpen ? 'is-open' : ''}`}>
          <a
            href="#andwin-is"
            className="header__nav-link"
            onClick={(e) => handleNavClick(e, '#andwin-is')}
          >
            ANDWIN IS
          </a>
          <a
            href="#work"
            className="header__nav-link"
            onClick={(e) => handleNavClick(e, '#work')}
          >
            WORK
          </a>
          <a
            href="#academy"
            className="header__nav-link"
            onClick={(e) => handleNavClick(e, '#academy')}
          >
            ACADEMY
          </a>
          <a
            href="#our-partner"
            className="header__nav-link"
            onClick={(e) => handleNavClick(e, '#our-partner')}
          >
            OUR PARTNER
          </a>
          <a
            href="#service"
            className="header__nav-link"
            onClick={(e) => handleNavClick(e, '#service')}
          >
            SERVICE
          </a>
          <a
            href="#contact-us"
            className="header__nav-link"
            onClick={(e) => handleNavClick(e, '#contact-us')}
          >
            CONTACT US
          </a>
        </nav>
      )}
      
      {/* 좌측 사이드 드로어 메뉴 */}
      <div className={`header__drawer ${isMenuOpen ? 'is-open' : ''}`} onClick={() => setIsMenuOpen(false)}>
        <nav className="header__drawer-nav" onClick={(e) => e.stopPropagation()}>
          <a
            href="#andwin-is"
            className="header__drawer-link"
            onClick={(e) => handleNavClick(e, '#andwin-is')}
          >
            ANDWIN IS
          </a>
          <a
            href="#work"
            className="header__drawer-link"
            onClick={(e) => handleNavClick(e, '#work')}
          >
            WORK
          </a>
          <a
            href="#academy"
            className="header__drawer-link"
            onClick={(e) => handleNavClick(e, '#academy')}
          >
            ACADEMY
          </a>
          <a
            href="#our-partner"
            className="header__drawer-link"
            onClick={(e) => handleNavClick(e, '#our-partner')}
          >
            OUR PARTNER
          </a>
          <a
            href="#service"
            className="header__drawer-link"
            onClick={(e) => handleNavClick(e, '#service')}
          >
            SERVICE
          </a>
          <a
            href="#contact-us"
            className="header__drawer-link"
            onClick={(e) => handleNavClick(e, '#contact-us')}
          >
            CONTACT US
          </a>
        </nav>
      </div>
    </header>
  );
}


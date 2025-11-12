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
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 상태 확인

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
      <div className="header__inner">
        <a href="#hero" className="header__logo" onClick={(e) => handleNavClick(e, '#hero')}>
          <img
            src="/assets/andwin-logo.png"
            alt="ANDWIN"
            className="header__logo-image"
          />
        </a>
        <nav className={`header__nav ${isMenuOpen ? 'is-open' : ''}`}>
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
      </div>
    </header>
  );
}


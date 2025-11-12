'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    storeUrl: '',
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
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

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9-]+$/;
    return phoneRegex.test(phone) && phone.replace(/-/g, '').length >= 10;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }

    if (!formData.phone.trim() || !validatePhone(formData.phone)) {
      alert('올바른 연락처를 입력해주세요.');
      return;
    }

    if (!formData.email.trim() || !validateEmail(formData.email)) {
      alert('올바른 이메일을 입력해주세요.');
      return;
    }

    // 실제 API 호출은 나중에 추가 가능
    // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });

    setShowSuccess(true);
    setFormData({
      storeUrl: '',
      name: '',
      phone: '',
      email: '',
      message: '',
    });

    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact-us" className="section contact fade-in" ref={sectionRef}>
      <div className="container">
        <div className="contact__inner">
          <div className="contact__left">
            <div className="contact__info">
              <h2>라이브커머스 문의하기</h2>
              <p>서울특별시 강남구 학동로19길 16</p>
              <p>Tel: 070-8806-4080</p>
              <p>Email: andwinn@naver.com</p>
            </div>
            <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__form-group">
              <label htmlFor="storeUrl" className="contact__form-label">
                브랜드 스토어 URL
              </label>
              <input
                type="url"
                id="storeUrl"
                name="storeUrl"
                className="contact__form-input"
                value={formData.storeUrl}
                onChange={handleChange}
                placeholder="https://"
              />
            </div>
            <div className="contact__form-group">
              <label htmlFor="name" className="contact__form-label">
                이름 <span style={{ color: '#ff6b6b' }}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="contact__form-input"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="이름을 입력해주세요"
              />
            </div>
            <div className="contact__form-group">
              <label htmlFor="phone" className="contact__form-label">
                연락처 <span style={{ color: '#ff6b6b' }}>*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="contact__form-input"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="010-0000-0000"
              />
            </div>
            <div className="contact__form-group">
              <label htmlFor="email" className="contact__form-label">
                이메일 <span style={{ color: '#ff6b6b' }}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="contact__form-input"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@email.com"
              />
            </div>
            <div className="contact__form-group">
              <label htmlFor="message" className="contact__form-label">
                문의 내용
              </label>
              <textarea
                id="message"
                name="message"
                className="contact__form-textarea"
                value={formData.message}
                onChange={handleChange}
                placeholder="문의 내용을 입력해주세요"
              />
            </div>
            <button type="submit" className="contact__form-button">
              문의하기
            </button>
            {showSuccess && (
              <div className="contact__form-message is-visible">
                정상적으로 접수되었습니다.
              </div>
            )}
          </form>
          </div>
          <div className="contact__maps">
            <div className="contact__map-wrapper">
              <iframe
                src="https://www.google.com/maps?q=서울특별시+강남구+학동로19길+16&hl=ko&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="학동로19길 16"
              ></iframe>
            </div>
            <div className="contact__map-wrapper">
              <iframe
                src="https://www.google.com/maps?q=서울특별시+강남구+논현동+6-5&hl=ko&z=18&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="논현동 6-5"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


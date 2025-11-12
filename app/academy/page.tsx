import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AcademyPage() {
  return (
    <>
      <Header />
      <main className="academy-page">
        <div className="academy-page__container">
          <img
            src="/assets/academy/promotion.jpg"
            alt="ANDWIN Live Academy"
            className="academy-page__image"
          />
          <img
            src="/assets/academy/curriculum.jpg"
            alt="쇼호스트 과정 커리큘럼"
            className="academy-page__image"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}


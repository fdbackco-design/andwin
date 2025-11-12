import Header from './components/Header';
import Hero from './components/Hero';
import AndwinServiceSection from './components/AndwinServiceSection';
import WorkSection from './components/WorkSection';
import ConceptGallery from './components/ConceptGallery';
import Academy from './components/Academy';
import Partners from './components/Partners';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingButton from './components/FloatingButton';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <AndwinServiceSection />
      <WorkSection />
      <ConceptGallery />
      <Academy />
      <Partners />
      <Contact />
      <Footer />
      <FloatingButton />
    </main>
  );
}


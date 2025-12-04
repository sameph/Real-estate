import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Amenities from '@/components/Amenities';
import Gallery from '@/components/Gallery';
import Location from '@/components/Location';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Update page title and meta
    document.title = 'Balhir Apartment | Luxury Living in Addis Ababa, Ethiopia';
  }, []);

  return (
    <main className="relative bg-background text-foreground overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Amenities />
      <Gallery />
      <Location />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;

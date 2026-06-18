import HeroSection from '@/components/home/HeroSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import ProductCatalog from '@/components/products/ProductCatalog';
import ContactSection from '@/components/home/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyUsSection />
      <ProductCatalog />
      <ContactSection />
    </>
  );
}

import HeroSection from '@/components/home/HeroSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import BestSellersSection from '@/components/home/BestSellersSection';
import BundleBannerSection from '@/components/home/BundleBannerSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import HomeFaqSection from '@/components/home/HomeFaqSection';
import VisitUsSection from '@/components/home/VisitUsSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyUsSection />
      <BestSellersSection />
      <BundleBannerSection />
      <ReviewsSection />
      <HomeFaqSection />
      <VisitUsSection />
    </>
  );
}

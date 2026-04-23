import { AIAssistant } from '@/components/home/AIAssistant';
import { ContentSection } from '@/components/home/ContentSection';
import { Ecosystem } from '@/components/home/Ecosystem';
import { FeaturedTours } from '@/components/home/FeaturedTours';
import { Hero } from '@/components/home/Hero';
import { HowItWorks } from '@/components/home/HowItWorks';
import { MapPreview } from '@/components/home/MapPreview';
import { StatsSection } from '@/components/home/StatsSection';
import { contentItems, mapPoints, tours } from '@/lib/data';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <HowItWorks />
      <FeaturedTours tours={tours} />
      <MapPreview points={mapPoints} />
      <ContentSection items={contentItems} />
      <AIAssistant />
      <Ecosystem />
    </>
  );
}

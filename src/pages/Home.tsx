import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { SocialProofSection } from '../components/home/SocialProofSection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { CTASection } from '../components/home/CTASection';

export function Home({ onRegisterClick }: { onRegisterClick: () => void }) {
  return (
    <>
      <HeroSection onRegisterClick={onRegisterClick} />
      <SocialProofSection />
      <FeaturesSection />
      <CTASection onRegisterClick={onRegisterClick} />
    </>
  );
}

import React from 'react';
import { HeroSalesSection } from '../components/home/HeroSalesSection';
import { ProblemSection } from '../components/home/ProblemSection';
import { ValuePropositionSection } from '../components/home/ValuePropositionSection';
import { BenefitsSection } from '../components/home/BenefitsSection';
import { MidPageCTA } from '../components/home/MidPageCTA';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { DemoSection } from '../components/home/DemoSection';
import { ConceptSection } from '../components/home/ConceptSection';
import { ExampleProfileSection } from '../components/home/ExampleProfileSection';
import { ForWhoSection } from '../components/home/ForWhoSection';
import { PricingSection } from '../components/home/PricingSection';
import { FAQSection } from '../components/home/FAQSection';
import { ClosingSection } from '../components/home/ClosingSection';

export function Home({ onRegisterClick }: { onRegisterClick: () => void }) {
  const handleBuyClick = () => {
    // Scroll to pricing section or open buy modal
    const pricingEl = document.getElementById('precio');
    if (pricingEl) {
      pricingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* HERO */}
      <HeroSalesSection onBuyClick={handleBuyClick} />

      {/* PROBLEM IDENTIFICATION */}
      <ProblemSection />

      {/* VALUE PROPOSITION */}
      <ValuePropositionSection />

      {/* BENEFITS */}
      <BenefitsSection />

      {/* MID-PAGE CTA */}
      <MidPageCTA onBuyClick={handleBuyClick} />

      {/* HOW IT WORKS */}
      <HowItWorksSection />

      {/* DEMO / MOCKUP */}
      <DemoSection onBuyClick={handleBuyClick} />

      {/* CONCEPT */}
      <ConceptSection />

      {/* EXAMPLE PROFILE */}
      <ExampleProfileSection />

      {/* FOR WHO */}
      <ForWhoSection />

      {/* PRICING + CTA */}
      <PricingSection onBuyClick={handleBuyClick} />

      {/* FAQ */}
      <FAQSection />

      {/* CLOSING */}
      <ClosingSection onBuyClick={handleBuyClick} />
    </>
  );
}

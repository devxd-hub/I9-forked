/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Container } from '../primitives/Container.tsx';
import { SectionLabel } from '../primitives/SectionLabel.tsx';
import { PrimaryButton, SecondaryButton } from '../primitives/Button.tsx';
import { NexusIcon } from '../brand/NexusLogo.tsx';
import { RevealSection, RevealText } from '../motion/MotionPrimitives.tsx';
import { AppRoute } from '../../types.ts';

interface FinalCTAProps {
  onRouteChange: (route: AppRoute) => void;
}

/**
 * FINAL CALL TO ACTION
 * Heading: BUILD WHAT'S NEXT.
 * Subhead: If you want to make projects with people who care about craft, design, and code, NEXUS is where you start.
 * CTA: JOIN NEXUS →
 * Secondary CTA: EXPLORE PROJECTS →
 */
export const FinalCTA: React.FC<FinalCTAProps> = ({ onRouteChange }) => {
  return (
    <RevealSection
      id="nexus-final-cta"
      className="relative w-full py-28 md:py-40 bg-[#0A0A09] text-[#F3EEE5] overflow-hidden"
    >
      {/* Background Watermark of Authentic X */}
      <div
        className="absolute -right-16 -bottom-16 opacity-10 pointer-events-none select-none"
        aria-hidden="true"
      >
        <NexusIcon size="custom" className="w-80 h-80 sm:w-96 sm:h-96" />
      </div>

      <Container>
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Centered Brand Emblem */}
          <div className="flex justify-center">
            <div className="p-3.5 bg-[#151311] border border-[rgba(239,90,42,0.4)] shadow-lg inline-flex items-center justify-center transform transition-transform duration-300 hover:scale-105">
              <NexusIcon size="lg" />
            </div>
          </div>

          <SectionLabel
            number="06"
            label="JOIN THE SQUAD"
            className="justify-center text-[#F3EEE5]/70"
          />

          <RevealText
            as="h2"
            staggerMs={45}
            className="font-fraunces font-bold text-4xl sm:text-5xl lg:text-6xl text-[#F3EEE5] tracking-tight uppercase"
          >
            BUILD WHAT'S NEXT.
          </RevealText>

          <p className="font-bitter text-lg sm:text-xl text-[#F3EEE5]/80 max-w-2xl mx-auto leading-relaxed">
            If you want to make projects with people who care about craft, design, and code, NEXUS is where you start.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <PrimaryButton
              label="JOIN NEXUS →"
              onClick={() => onRouteChange('/contact')}
              magnetic={true}
              className="bg-[#EF5A2A] border-[#EF5A2A] text-white hover:bg-white hover:text-[#0A0A09] hover:border-white"
            />
            <SecondaryButton
              label="EXPLORE PROJECTS →"
              onClick={() => onRouteChange('/projects')}
              magnetic={true}
              className="text-[#F3EEE5] border-[rgba(243,238,229,0.3)] hover:bg-[rgba(243,238,229,0.1)] hover:border-[#F3EEE5]"
            />
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-dosis tracking-[0.2em] text-[#F3EEE5]/50 border-t border-[rgba(243,238,229,0.1)] max-w-xl mx-auto">
            <span>OPEN TO ALL MAJORS</span>
            <span>•</span>
            <span>WEEKLY STUDIO LAB</span>
            <span>•</span>
            <span>HARDWARE & MENTORSHIP</span>
          </div>
        </div>
      </Container>
    </RevealSection>
  );
};

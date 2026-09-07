/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Container } from '../primitives/Container.tsx';
import { SectionLabel } from '../primitives/SectionLabel.tsx';
import { PrimaryButton } from '../primitives/Button.tsx';
import { ImageReveal } from '../primitives/ImageReveal.tsx';
import { RevealSection, RevealText } from '../motion/MotionPrimitives.tsx';
import { AppRoute } from '../../types.ts';

interface AboutPreviewProps {
  onRouteChange: (route: AppRoute) => void;
}

/**
 * ABOUT PREVIEW
 * Heading: IDEAS ARE BETTER TOGETHER.
 * Supporting copy: NEXUS brings students from different disciplines together...
 * CTA: ABOUT NEXUS →
 */
export const AboutPreview: React.FC<AboutPreviewProps> = ({ onRouteChange }) => {
  return (
    <RevealSection
      id="nexus-about-preview"
      className="w-full py-24 md:py-36 border-b border-[rgba(10,10,9,0.12)] bg-[#F3EEE5]"
    >
      <Container>
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Narrative Text (Cols 1-7) */}
          <div className="col-span-4 md:col-span-8 lg:col-span-7 space-y-8">
            <SectionLabel number="01" label="THE COLLECTIVE" />

            <div className="space-y-1">
              <RevealText
                as="h2"
                staggerMs={45}
                className="font-fraunces font-bold text-4xl sm:text-5xl lg:text-6xl text-[#0A0A09] leading-[1.08] tracking-tight uppercase"
              >
                IDEAS ARE BETTER TOGETHER.
              </RevealText>
            </div>

            <p className="font-bitter text-lg sm:text-xl text-[#66615A] leading-relaxed max-w-xl">
              NEXUS brings students from different disciplines together to explore questions,
              form teams, experiment with ideas, and build projects that have a life beyond
              the classroom.
            </p>

            <div className="pt-2">
              <PrimaryButton
                label="ABOUT NEXUS →"
                onClick={() => onRouteChange('/about')}
              />
            </div>
          </div>

          {/* Right Visual Frame / Scaffold (Cols 8-12) */}
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <ImageReveal
              alt="Students collaborating during an open studio build session at NEXUS"
              caption="Cross-disciplinary studio sprint — Engineering × Design × Media"
              tag="STUDIO LAB"
              aspectRatio="4/3"
            />
          </div>
        </div>
      </Container>
    </RevealSection>
  );
};

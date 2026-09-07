/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Container } from '../primitives/Container.tsx';
import { PrimaryButton, SecondaryButton } from '../primitives/Button.tsx';
import { NexusLogo } from '../brand/NexusLogo.tsx';
import { OrangeThread, RevealText } from '../motion/MotionPrimitives.tsx';
import { AppRoute } from '../../types.ts';

interface HeroProps {
  onRouteChange: (route: AppRoute) => void;
}

/**
 * HOME HERO
 * Signature editorial visual with generous spacing and the Orange Thread motif.
 * Centered: NEXUS
 * Above: WHERE IDEAS FIND PEOPLE.
 * Below: A student-led community for building, experimenting, and creating projects that matter.
 */
export const Hero: React.FC<HeroProps> = ({ onRouteChange }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="nexus-hero-section"
      className="relative w-full pt-10 sm:pt-14 md:pt-18 lg:pt-20 pb-16 sm:pb-20 md:pb-24 lg:pb-28 border-b border-[rgba(10,10,9,0.12)] flex flex-col items-center justify-start text-center overflow-hidden"
    >
      {/* Visual Motif: The Orange Thread (Idea → People → Project) */}
      <OrangeThread />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
          {/* Above the logo: WHERE IDEAS FIND PEOPLE. */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center space-y-1"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#EF5A2A]" />
              <p className="font-dosis text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#EF5A2A] uppercase">
                WHERE IDEAS
              </p>
              <span className="w-8 h-px bg-[#EF5A2A]" />
            </div>
            <p className="font-dosis text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#EF5A2A] uppercase">
              FIND PEOPLE.
            </p>
          </motion.div>

          {/* Centered NEXUS wordmark - Visually connected space */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 sm:mt-5 md:mt-6"
          >
            <NexusLogo
              size="hero"
              showSubtitle={true}
              subtitleLayout="below"
              className="items-center"
            />
          </motion.div>

          {/* Below: A student-led community for building, experimenting, and creating projects that matter. */}
          <div className="max-w-2xl mx-auto px-4 mt-6 sm:mt-8 md:mt-9">
            <RevealText
              as="p"
              staggerMs={35}
              delayMs={220}
              className="font-bitter text-lg sm:text-xl md:text-2xl text-[#66615A] leading-relaxed mx-auto font-normal"
            >
              A student-led community for building, experimenting, and creating projects that matter.
            </RevealText>
          </div>

          {/* Tactile Action Buttons */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 sm:mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <PrimaryButton
              label="EXPLORE NEXUS →"
              onClick={() => onRouteChange('/about')}
              magnetic={true}
            />
            <SecondaryButton
              label="JOIN THE CLUB →"
              onClick={() => onRouteChange('/contact')}
              magnetic={true}
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

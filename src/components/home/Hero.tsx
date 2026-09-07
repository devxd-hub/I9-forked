/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Container } from '../primitives/Container.tsx';
import { ExploreNexusButton } from './ExploreButton.tsx';
import { NexusLogo } from '../brand/NexusLogo.tsx';
import { RevealText } from '../motion/MotionPrimitives.tsx';
import RotatingText from './RotatingText.tsx';
import { AppRoute } from '../../types.ts';

interface HeroProps {
  onRouteChange: (route: AppRoute) => void;
}

/**
 * HOME HERO
 * Signature editorial visual with generous spacing.
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
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
          {/* Above the logo: WHERE IDEAS FIND [PEOPLE / BUILDERS / CREATORS / MAKERS / COLLABORATORS] */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-6 sm:w-8 h-px bg-[#EF5A2A]" />
              <p className="font-dosis text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#EF5A2A] uppercase">
                WHERE IDEAS FIND
              </p>
              <span className="w-6 sm:w-8 h-px bg-[#EF5A2A]" />
            </div>

            {/* Rotating identity accent - Zero layout shift container */}
            <div className="mt-1.5 flex items-center justify-center">
              <div
                className="relative inline-flex items-center justify-center min-w-[210px] sm:min-w-[240px] md:min-w-[260px] h-7 sm:h-8 px-3 border border-[rgba(239,90,42,0.32)] bg-[#EBE5DB]/40 backdrop-blur-xs select-none"
                aria-label="Where ideas find people, builders, creators, makers, and collaborators"
              >
                {/* Subtle Orange Thread micro-marker at bottom center */}
                <div
                  className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#EF5A2A]"
                  aria-hidden="true"
                />

                <RotatingText
                  texts={['PEOPLE.', 'BUILDERS.', 'CREATORS.', 'MAKERS.', 'COLLABORATORS.']}
                  mainClassName="font-dosis text-xs sm:text-sm font-bold tracking-[0.28em] sm:tracking-[0.32em] text-[#0A0A09] uppercase justify-center overflow-hidden w-full"
                  splitLevelClassName="overflow-hidden justify-center pb-0.5"
                  staggerFrom="last"
                  staggerDuration={0.02}
                  rotationInterval={3000}
                  transition={{ type: 'spring', damping: 30, stiffness: 380 }}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-120%', opacity: 0 }}
                />
              </div>
            </div>
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

          {/* Tactile Action Button */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 sm:mt-8 md:mt-10 flex items-center justify-center w-full sm:w-auto"
          >
            <ExploreNexusButton
              id="hero-explore-button"
              label="EXPLORE NEXUS"
              onClick={() => onRouteChange('/about')}
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

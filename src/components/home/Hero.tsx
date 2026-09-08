/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Container } from '../primitives/Container.tsx';
import { ExploreNexusButton } from './ExploreButton.tsx';
import { NexusLogo } from '../brand/NexusLogo.tsx';
import RotatingText from './RotatingText.tsx';
import { PixelBlast } from '../motion/PixelBlast.tsx';
import { AppRoute } from '../../types.ts';

interface HeroProps {
  onRouteChange: (route: AppRoute) => void;
}

/**
 * RECOMPOSED EDITORIAL NEXUS HERO
 *
 * Designed around a strict Swiss editorial grid and single visual hierarchy:
 * 1. Eyebrow: WHERE IDEAS FIND [PEOPLE / BUILDERS / CREATORS / MAKERS]
 * 2. Dominant Anchor: NEXUS Identity (optically centered, controlled proportion)
 * 3. Position: COLLEGE CLUB
 * 4. Supporting Measure: "A student-led community for building, experimenting and creating projects that matter."
 * 5. Primary Action: EXPLORE NEXUS
 *
 * Accompanied by:
 * - PixelBlast: A living orange digital field with soft quiet-zone protection for the central X
 * - A single graphic trajectory line passing safely behind content
 */
export const Hero: React.FC<HeroProps> = ({ onRouteChange }) => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const logoAnchorRef = useRef<HTMLDivElement | null>(null);

  // Responsive Quiet Zone tracking to guarantee the central X remains pristine
  const [quietZone, setQuietZone] = useState<{
    center: { x: number; y: number };
    radius: { rx: number; ry: number };
  }>({
    center: { x: 0.5, y: 0.46 },
    radius: { rx: 0.22, ry: 0.18 },
  });

  useEffect(() => {
    const updateQuietZone = () => {
      if (!sectionRef.current || !logoAnchorRef.current) return;
      const secRect = sectionRef.current.getBoundingClientRect();
      const logoRect = logoAnchorRef.current.getBoundingClientRect();
      if (secRect.width <= 0 || secRect.height <= 0) return;

      const cx = (logoRect.left + logoRect.width / 2 - secRect.left) / secRect.width;
      const cy = (logoRect.top + logoRect.height * 0.44 - secRect.top) / secRect.height;
      const rx = (logoRect.width * 0.38) / secRect.width;
      const ry = (logoRect.height * 0.95) / secRect.height;

      setQuietZone({
        center: {
          x: Math.max(0.15, Math.min(0.85, cx)),
          y: Math.max(0.15, Math.min(0.85, cy)),
        },
        radius: {
          rx: Math.max(0.12, Math.min(0.38, rx)),
          ry: Math.max(0.1, Math.min(0.32, ry)),
        },
      });
    };

    updateQuietZone();
    window.addEventListener('resize', updateQuietZone);
    const timeout = setTimeout(updateQuietZone, 250);
    return () => {
      window.removeEventListener('resize', updateQuietZone);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="nexus-hero-section"
      className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center pt-10 sm:pt-14 md:pt-18 pb-14 sm:pb-20 md:pb-24 border-b border-[rgba(10,10,9,0.1)] overflow-hidden bg-[#F3EEE5] select-none"
    >
      {/* 1. Subtle Editorial Paper Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply z-0"
        style={{
          backgroundImage: 'radial-gradient(#0A0A09 0.75px, transparent 0.75px)',
          backgroundSize: '18px 18px',
        }}
        aria-hidden="true"
      />

      {/* 2. PixelBlast: Living Orange Digital Field (Isolated Background Layer) */}
      <div
        className="absolute inset-0 pointer-events-auto z-[1] overflow-hidden"
        aria-hidden="true"
      >
        <PixelBlast
          variant="circle"
          pixelSize={5}
          color="#EF5A2A"
          secondaryColor="#D94A1F"
          patternScale={3.2}
          patternDensity={0.76}
          pixelSizeJitter={0.3}
          enableRipples={true}
          rippleSpeed={0.32}
          rippleThickness={0.1}
          rippleIntensityScale={0.85}
          liquid={true}
          liquidStrength={0.07}
          liquidRadius={1.0}
          liquidWobbleSpeed={3.0}
          speed={0.35}
          edgeFade={0.35}
          transparent={true}
          intensity={0.42}
          scrollReactive={true}
          scrollParallax={1.1}
          cursorReactive={true}
          cursorInfluence={0.76}
          cursorRadius={0.28}
          quietZoneCenter={quietZone.center}
          quietZoneRadius={quietZone.radius}
          quietZoneFeather={0.55}
          className="w-full h-full"
        />
      </div>

      {/* 3. Outer Editorial Frame Metadata */}
      <div className="absolute inset-x-6 sm:inset-x-10 md:inset-x-14 top-6 pointer-events-none hidden sm:flex items-center justify-between text-[9px] font-dosis font-semibold tracking-[0.28em] text-[#66615A]/60 uppercase z-10" aria-hidden="true">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#EF5A2A] rounded-full inline-block" />
          <span>NEXUS // 00</span>
        </div>
        <span>CAMPUS CREATIVE &amp; TECH COLLECTIVE</span>
        <span>EST. 2026</span>
      </div>

      {/* 4. Core Hero Composition */}
      <Container className="relative z-10 w-full flex flex-col items-center justify-center my-auto">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center">

          {/* HIERARCHY LEVEL 1: Small Eyebrow Label ("WHERE IDEAS FIND PEOPLE") */}
          <motion.div
            id="hero-eyebrow-label"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center mb-4 sm:mb-5 md:mb-6"
          >
            <div className="inline-flex items-center gap-2.5 sm:gap-3 px-3.5 py-1 border border-[rgba(239,90,42,0.28)] bg-[#EBE5DB]/40 backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EF5A2A] inline-block shrink-0" aria-hidden="true" />
              <p className="font-dosis text-[11px] sm:text-xs md:text-[13px] font-semibold tracking-[0.28em] text-[#EF5A2A] uppercase whitespace-nowrap">
                WHERE IDEAS FIND
              </p>
              <div className="inline-flex items-center min-w-[100px] sm:min-w-[120px] justify-start">
                <RotatingText
                  texts={['PEOPLE.', 'BUILDERS.', 'CREATORS.', 'MAKERS.', 'COLLABORATORS.']}
                  mainClassName="font-dosis text-[11px] sm:text-xs md:text-[13px] font-bold tracking-[0.25em] text-[#0A0A09] uppercase overflow-hidden text-left"
                  splitLevelClassName="overflow-hidden justify-start pb-0.5"
                  staggerFrom="first"
                  staggerDuration={0.015}
                  rotationInterval={3200}
                  transition={{ type: 'spring', damping: 28, stiffness: 360 }}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                />
              </div>
            </div>
          </motion.div>

          {/* HIERARCHY LEVEL 2: NEXUS Principal Visual Anchor (Controlled proportion & optical centering) */}
          <motion.div
            ref={logoAnchorRef}
            id="hero-nexus-logo-anchor"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center justify-center my-1 sm:my-2"
          >
            <NexusLogo
              id="hero-main-nexus-logo"
              size="hero"
              showSubtitle={true}
              subtitleLayout="below"
              className="items-center max-w-[90vw] sm:max-w-[75vw] md:max-w-[720px] lg:max-w-[800px]"
            />
          </motion.div>

          {/* HIERARCHY LEVEL 3: Supporting Copy (Readable Editorial Measure: 500-620px max-width) */}
          <motion.div
            id="hero-supporting-description"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[580px] mx-auto px-4 mt-5 sm:mt-7 md:mt-8"
          >
            <p className="font-bitter text-base sm:text-lg md:text-xl text-[#66615A] leading-relaxed font-normal">
              A student-led community for building, experimenting and creating projects that matter.
            </p>
          </motion.div>

          {/* HIERARCHY LEVEL 4: Primary Action Button ("EXPLORE NEXUS") */}
          <motion.div
            id="hero-primary-action-wrap"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 md:mt-9 flex items-center justify-center w-full"
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

export default Hero;

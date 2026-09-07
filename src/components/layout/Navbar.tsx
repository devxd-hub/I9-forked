/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Container } from '../primitives/Container.tsx';
import { NexusLogo } from '../brand/NexusLogo.tsx';
import { AppRoute, NavItem } from '../../types.ts';

interface NavbarProps {
  currentRoute: AppRoute;
  onRouteChange: (route: AppRoute) => void;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/about' },
  { label: 'PROJECTS', href: '/projects' },
  { label: 'GALLERY', href: '/gallery' },
  { label: 'TEAM', href: '/team' },
  { label: 'CONTACT', href: '/contact' },
];

/**
 * RE-ARCHITECTED EDITORIAL NEXUS NAVBAR
 *
 * 1. Larger, crisp, high-presence typography (16-18px desktop).
 * 2. Shared sliding active indicator track (dot + physical connecting line).
 * 3. Subtle hover preview states and micro-translations.
 * 4. Refined tactile "JOIN THE CLUB ↗" action CTA.
 * 5. Architectural responsive mobile drawer with editorial numbering.
 * 6. Smooth scroll compression and subtle backdrop separation.
 */
export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onRouteChange }) => {
  const shouldReduceMotion = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  // Monitor scroll state for smooth architectural compression
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (href: AppRoute, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    onRouteChange(href);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="nexus-main-navbar"
      className={`sticky top-0 z-50 w-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? 'bg-[#F3EEE5]/94 backdrop-blur-md border-b border-[rgba(10,10,9,0.12)] shadow-[0_4px_24px_-6px_rgba(10,10,9,0.06)]'
          : 'bg-[#F3EEE5] border-b border-[rgba(10,10,9,0.08)]'
      }`}
    >
      <Container>
        {/* Responsive Navbar Height with Refined Breathing Room */}
        <div
          className={`flex items-center justify-between transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled ? 'h-18 md:h-20' : 'h-22 md:h-26'
          }`}
        >
          {/* ====================================================
              1. LEFT: NEXUS LOGO / IDENTITY WITH REFINED TRACE HOVER
             ==================================================== */}
          <div className="flex items-center">
            <a
              href="/"
              onClick={(e) => handleNavClick('/', e)}
              className="group relative flex flex-col items-start py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EF5A2A] rounded-xs"
              aria-label="NEXUS Home"
            >
              <NexusLogo size="md" />

              {/* Delicate Orange Baseline Marker on Hover */}
              <span
                className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#EF5A2A] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full opacity-0 group-hover:opacity-100"
                aria-hidden="true"
              />
            </a>
          </div>

          {/* ====================================================
              2. CENTER: EDITORIAL NAVIGATION WITH SHARED TRACK
             ==================================================== */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-6 xl:gap-8 2xl:gap-10"
            onMouseLeave={() => setHoveredHref(null)}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = currentRoute === item.href;
              const isHovered = hoveredHref === item.href;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  onMouseEnter={() => setHoveredHref(item.href)}
                  className={`group relative py-2.5 px-1.5 text-[15px] xl:text-[17px] font-dosis font-bold tracking-[0.16em] xl:tracking-[0.18em] uppercase transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EF5A2A] rounded-xs select-none ${
                    isActive
                      ? 'text-[#0A0A09] font-extrabold'
                      : 'text-[#66615A] hover:text-[#0A0A09]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Micro-motion on text */}
                  <span
                    className={`relative z-10 flex items-center gap-1.5 transition-transform duration-200 ease-out ${
                      isHovered && !isActive ? '-translate-y-[1px]' : ''
                    }`}
                  >
                    <span>{item.label}</span>
                  </span>

                  {/* Shared Active Sliding Track System (Sliding Orange Node + Line) */}
                  {isActive && (
                    <motion.div
                      layoutId={shouldReduceMotion ? undefined : 'navbar-active-track'}
                      className="absolute -bottom-0.5 left-0 right-0 flex items-center justify-start pointer-events-none"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 32,
                        mass: 0.8,
                      }}
                      aria-hidden="true"
                    >
                      <div className="w-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#EF5A2A] shrink-0 inline-block shadow-[0_0_8px_rgba(239,90,42,0.4)]" />
                        <span className="h-[2px] w-full bg-[#EF5A2A] rounded-full inline-block" />
                      </div>
                    </motion.div>
                  )}

                  {/* Temporary Hover Preview Accent (when not active) */}
                  {!isActive && isHovered && (
                    <motion.span
                      layoutId={shouldReduceMotion ? undefined : 'navbar-hover-preview'}
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-[#EF5A2A]/40 origin-left pointer-events-none rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ====================================================
              3. RIGHT: "JOIN THE CLUB ↗" ACTION CTA & MOBILE TOGGLE
             ==================================================== */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Desktop / Tablet CTA: Refined Architectural Rectangular Treatment */}
            <button
              type="button"
              id="navbar-join-club-cta"
              onClick={(e) => handleNavClick('/contact', e)}
              className="group relative hidden sm:inline-flex items-center justify-center px-4.5 py-2.5 sm:px-5 sm:py-2.5 bg-[#0A0A09] text-[#F3EEE5] border border-[#0A0A09] hover:border-[#EF5A2A] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EF5A2A] select-none"
            >
              {/* Subtle Orange Accent Dot */}
              <span className="w-1.5 h-1.5 rounded-full bg-[#EF5A2A] mr-2.5 transition-transform duration-300 group-hover:scale-125" />

              {/* Action Label */}
              <span className="font-dosis font-bold text-xs sm:text-[13px] tracking-[0.2em] uppercase text-[#F3EEE5]">
                JOIN THE CLUB
              </span>

              {/* Responsive Arrow Outward Translation */}
              <span className="ml-2 font-mono text-sm text-[#EF5A2A] inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5">
                ↗
              </span>
            </button>

            {/* Mobile Architectural Toggle Button: [ MENU + ] / [ CLOSE × ] */}
            <button
              type="button"
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 border border-[rgba(10,10,9,0.2)] bg-[#EBE5DB]/60 hover:bg-[#EBE5DB] hover:border-[#EF5A2A] transition-colors duration-200 text-[#0A0A09] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EF5A2A]"
              aria-label={mobileMenuOpen ? 'Close main navigation menu' : 'Open main navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-drawer"
            >
              <span className="font-dosis font-bold text-xs tracking-[0.2em] uppercase">
                {mobileMenuOpen ? 'CLOSE' : 'MENU'}
              </span>
              <span className="font-mono text-xs font-bold text-[#EF5A2A]">
                {mobileMenuOpen ? '✕' : '+'}
              </span>
            </button>
          </div>
        </div>
      </Container>

      {/* ====================================================
          4. MOBILE EDITORIAL NAVIGATION DRAWER
         ==================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:hidden border-b border-[rgba(10,10,9,0.18)] bg-[#F3EEE5] px-6 py-8 shadow-2xl overflow-hidden"
          >
            {/* Editorial Header in Drawer */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[rgba(10,10,9,0.1)]">
              <span className="font-dosis font-bold text-[11px] tracking-[0.28em] text-[#EF5A2A] uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#EF5A2A] rounded-full inline-block" />
                NAVIGATION INDEX
              </span>
              <span className="font-mono text-[10px] text-[#66615A] uppercase tracking-widest">
                NEXUS // 2026
              </span>
            </div>

            {/* Staggered Navigation Items */}
            <nav aria-label="Mobile Navigation" className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = currentRoute === item.href;
                const paddedIndex = String(idx + 1).padStart(2, '0');

                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.04 * idx,
                      duration: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`flex items-center justify-between px-4 py-3.5 border transition-all duration-200 ${
                      isActive
                        ? 'border-[#EF5A2A] bg-[rgba(239,90,42,0.06)] text-[#0A0A09]'
                        : 'border-transparent text-[#66615A] hover:text-[#0A0A09] hover:bg-[rgba(10,10,9,0.03)]'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#EF5A2A] font-medium">
                        {paddedIndex}
                      </span>
                      <span className="font-dosis font-bold text-lg sm:text-xl tracking-[0.16em] uppercase">
                        {item.label}
                      </span>
                    </div>

                    {isActive && (
                      <div className="flex items-center gap-1.5 text-xs font-dosis font-bold text-[#EF5A2A] tracking-[0.2em] uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#EF5A2A] inline-block" />
                        <span>ACTIVE</span>
                      </div>
                    )}
                  </motion.a>
                );
              })}
            </nav>

            {/* Full-Width Mobile Action CTA */}
            <div className="mt-8 pt-6 border-t border-[rgba(10,10,9,0.1)]">
              <button
                type="button"
                onClick={(e) => handleNavClick('/contact', e)}
                className="w-full flex items-center justify-center gap-3 py-3.5 px-6 bg-[#0A0A09] text-[#F3EEE5] border border-[#0A0A09] hover:border-[#EF5A2A] transition-colors font-dosis font-bold text-sm tracking-[0.22em] uppercase"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF5A2A]" />
                <span>JOIN THE CLUB</span>
                <span className="font-mono text-base text-[#EF5A2A]">↗</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

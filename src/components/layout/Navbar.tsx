/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Container } from '../primitives/Container.tsx';
import { NexusLogo, NexusIcon } from '../brand/NexusLogo.tsx';
import { useMagnetic } from '../primitives/Button.tsx';
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

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onRouteChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ctaMagnetic = useMagnetic(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: AppRoute, e: React.MouseEvent) => {
    e.preventDefault();
    onRouteChange(href);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="nexus-main-navbar"
      className={`sticky top-0 z-50 w-full bg-[#F3EEE5] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? 'border-b border-[rgba(10,10,9,0.14)] shadow-2xs'
          : 'border-b border-[rgba(10,10,9,0.08)]'
      }`}
    >
      <Container>
        {/* Height reduces slightly on scroll (h-20/22 -> h-16/18) without any layout jitter */}
        <div
          className={`flex items-center justify-between transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled ? 'h-16 sm:h-18' : 'h-20 sm:h-22'
          }`}
        >
          {/* Logo Area */}
          <a
            href="/"
            onClick={(e) => handleNavClick('/', e)}
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-[#EF5A2A]"
            aria-label="NEXUS Home"
          >
            <NexusLogo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-8 xl:gap-10"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = currentRoute === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className={`group relative text-xs font-dosis font-bold tracking-[0.2em] uppercase py-2 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus:text-[#EF5A2A] ${
                    isActive
                      ? 'text-[#EF5A2A] font-extrabold'
                      : 'text-[#66615A] hover:text-[#0A0A09]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EF5A2A] inline-block" aria-hidden="true" />
                    )}
                    <span>{item.label}</span>
                  </span>

                  {/* Clean underline animation on hover (starts at width 0, expands from left in orange) */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-[#EF5A2A] transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Menu Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              id="navbar-join-button"
              type="button"
              onMouseMove={ctaMagnetic.handleMouseMove}
              onMouseLeave={ctaMagnetic.handleMouseLeave}
              style={ctaMagnetic.style}
              onClick={(e) => handleNavClick('/contact', e)}
              className="group hidden sm:inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#0A0A09] text-[#F3EEE5] text-xs font-dosis font-bold tracking-[0.2em] uppercase transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#EF5A2A] hover:text-white cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[#EF5A2A] active:scale-[0.98]"
            >
              <NexusIcon size="xs" />
              <span>JOIN THE CLUB</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              id="mobile-menu-trigger"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-[#0A0A09] hover:text-[#EF5A2A] border border-[rgba(10,10,9,0.15)] focus:outline-none focus:ring-2 focus:ring-[#EF5A2A]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open main menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="lg:hidden border-b border-[rgba(10,10,9,0.15)] bg-[#F3EEE5] px-5 py-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="flex items-center justify-between pb-4 mb-3 border-b border-[rgba(10,10,9,0.08)] px-2">
            <NexusLogo size="sm" />
            <span className="font-mono text-[10px] text-[#66615A] uppercase tracking-widest">STUDENT CLUB</span>
          </div>
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = currentRoute === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className={`flex items-center justify-between px-4 py-3.5 text-sm font-dosis font-bold tracking-[0.2em] uppercase border-l-2 transition-colors ${
                    isActive
                      ? 'border-[#EF5A2A] bg-[rgba(10,10,9,0.04)] text-[#EF5A2A]'
                      : 'border-transparent text-[#66615A] hover:text-[#0A0A09] hover:bg-[rgba(10,10,9,0.02)]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs font-dosis text-[#EF5A2A] font-bold">CURRENT</span>}
                </a>
              );
            })}

            <div className="pt-4 mt-2 border-t border-[rgba(10,10,9,0.1)]">
              <button
                type="button"
                onClick={(e) => handleNavClick('/contact', e)}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#0A0A09] text-[#F3EEE5] text-sm font-dosis font-bold tracking-[0.2em] uppercase hover:bg-[#EF5A2A] hover:text-white transition-colors"
              >
                <NexusIcon size="xs" />
                <span>JOIN THE CLUB</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

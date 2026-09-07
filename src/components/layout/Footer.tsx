/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Container } from '../primitives/Container.tsx';
import { NexusLogo, NexusWordmark } from '../brand/NexusLogo.tsx';
import { AppRoute } from '../../types.ts';

interface FooterProps {
  onRouteChange: (route: AppRoute) => void;
}

/**
 * FOOTER
 * Minimal, clean footer containing:
 * - NEXUS COLLEGE CLUB
 * - Navigation
 * - Socials
 * - University
 * - Location
 * - © 2026 NEXUS
 */
export const Footer: React.FC<FooterProps> = ({ onRouteChange }) => {
  const handleNavClick = (href: AppRoute, e: React.MouseEvent) => {
    e.preventDefault();
    onRouteChange(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="nexus-global-footer"
      className="w-full bg-[#151311] text-[#F3EEE5] pt-16 md:pt-20 pb-12 border-t border-[rgba(243,238,229,0.1)]"
    >
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12 pb-14 border-b border-[rgba(243,238,229,0.12)]">
          {/* Logo & College Club */}
          <div className="col-span-2 md:col-span-4 space-y-4">
            <NexusLogo
              size="md"
              inverted={true}
              showSubtitle={true}
              subtitleLayout="below"
              onClick={() => {
                onRouteChange('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <p className="font-bitter text-sm text-[#F3EEE5]/75 max-w-sm pt-2 leading-relaxed">
              A student-led community for building, experimenting, and creating projects that matter.
            </p>
          </div>

          {/* Navigation */}
          <div className="col-span-1 md:col-span-3 space-y-3">
            <h4 className="font-dosis text-xs uppercase tracking-[0.22em] text-[#EF5A2A] font-bold">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs font-dosis font-semibold tracking-[0.2em] uppercase text-[#F3EEE5]/75">
              <li>
                <a href="/" onClick={(e) => handleNavClick('/', e)} className="hover:text-[#EF5A2A] transition-colors">
                  HOME
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => handleNavClick('/about', e)} className="hover:text-[#EF5A2A] transition-colors">
                  ABOUT
                </a>
              </li>
              <li>
                <a href="/projects" onClick={(e) => handleNavClick('/projects', e)} className="hover:text-[#EF5A2A] transition-colors">
                  PROJECTS
                </a>
              </li>
              <li>
                <a href="/gallery" onClick={(e) => handleNavClick('/gallery', e)} className="hover:text-[#EF5A2A] transition-colors">
                  GALLERY
                </a>
              </li>
              <li>
                <a href="/team" onClick={(e) => handleNavClick('/team', e)} className="hover:text-[#EF5A2A] transition-colors">
                  TEAM
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => handleNavClick('/contact', e)} className="hover:text-[#EF5A2A] transition-colors">
                  CONTACT
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="font-dosis text-xs uppercase tracking-[0.22em] text-[#EF5A2A] font-bold">
              SOCIALS
            </h4>
            <ul className="space-y-2 text-xs font-dosis font-semibold tracking-[0.2em] uppercase text-[#F3EEE5]/75">
              <li>
                <a
                  href="https://github.com/nexus-club"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#EF5A2A] transition-colors"
                >
                  GITHUB ↗
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#EF5A2A] transition-colors"
                >
                  INSTAGRAM ↗
                </a>
              </li>
              <li>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#EF5A2A] transition-colors"
                >
                  DISCORD ↗
                </a>
              </li>
              <li>
                <a
                  href="https://substack.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#EF5A2A] transition-colors"
                >
                  SUBSTACK ↗
                </a>
              </li>
            </ul>
          </div>

          {/* University & Location */}
          <div className="col-span-2 md:col-span-3 space-y-4">
            <div className="space-y-1">
              <h4 className="font-dosis text-xs uppercase tracking-[0.22em] text-[#EF5A2A] font-bold">
                UNIVERSITY
              </h4>
              <p className="text-xs font-bitter text-[#F3EEE5]/85">
                Center for Student Innovation
              </p>
              <p className="text-xs font-bitter text-[#F3EEE5]/65">
                Campus Innovation Commons
              </p>
            </div>

            <div className="space-y-1 pt-1">
              <h4 className="font-dosis text-xs uppercase tracking-[0.22em] text-[#EF5A2A] font-bold">
                LOCATION
              </h4>
              <p className="text-xs font-bitter text-[#F3EEE5]/85">
                Design & Technology Pavilion
              </p>
              <p className="text-xs font-bitter text-[#F3EEE5]/65">
                Studio Lab 204 • North Campus
              </p>
            </div>
          </div>
        </div>

        {/* Minimal Copyright Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-dosis tracking-[0.2em] uppercase text-[#F3EEE5]/50">
          <div className="flex items-center gap-1.5">
            <span>© 2026</span>
            <NexusWordmark size="xs" inverted={true} />
          </div>
          <p className="text-[#F3EEE5]/40 tracking-[0.2em]">
            STUDENT-LED COLLEGE CLUB
          </p>
        </div>
      </Container>
    </footer>
  );
};

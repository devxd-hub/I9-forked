/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Container } from '../components/primitives/Container.tsx';
import { SectionLabel } from '../components/primitives/SectionLabel.tsx';
import { PrimaryButton, SecondaryButton } from '../components/primitives/Button.tsx';
import { ImageReveal } from '../components/primitives/ImageReveal.tsx';
import { GalleryTile } from '../components/primitives/GalleryTile.tsx';
import { NexusIcon } from '../components/brand/NexusLogo.tsx';
import { RevealSection, RevealText } from '../components/motion/MotionPrimitives.tsx';
import { AppRoute, GalleryItem } from '../types.ts';
import { GALLERY_ITEMS } from '../data/nexusData.ts';
import { X, Maximize2, Calendar, MapPin } from 'lucide-react';

interface GalleryPageProps {
  onRouteChange: (route: AppRoute) => void;
}

/**
 * GALLERY PAGE
 * Responsive asymmetric image grid with:
 * - Different aspect ratios (16/9, 4/3, 1/1, 3/2)
 * - Detailed editorial captions
 * - Hover states
 * - Lightbox image expansion modal
 * - Editorial composition (not an Instagram feed)
 */
export const GalleryPage: React.FC<GalleryPageProps> = ({ onRouteChange }) => {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const categories = ['ALL', 'PEOPLE', 'WORKSHOPS', 'PROJECTS', 'PROTOTYPING', 'COLLABORATION', 'PRESENTATIONS'];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (categoryFilter === 'ALL') return true;
    return item.category.toUpperCase() === categoryFilter;
  });

  return (
    <main id="nexus-gallery-page" className="w-full bg-[#F3EEE5]">
      {/* Header */}
      <RevealSection className="pt-20 md:pt-28 pb-16 md:pb-24 border-b border-[rgba(10,10,9,0.12)]">
        <Container>
          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <SectionLabel number="03" label="STUDIO ARCHIVE" />
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0A0A09] text-white text-xs font-dosis tracking-[0.2em] uppercase border border-[rgba(239,90,42,0.3)]">
                <NexusIcon size="xs" />
                <span>NEXUS GALLERY</span>
              </span>
            </div>
            <RevealText
              as="h1"
              staggerMs={40}
              className="font-fraunces font-bold text-4xl sm:text-5xl lg:text-6xl text-[#0A0A09] leading-[1.08] tracking-tight"
            >
              Inside the studio: crits, sprints, and builds.
            </RevealText>
            <p className="font-bitter text-lg text-[#66615A] leading-relaxed max-w-3xl">
              An asymmetric visual record of student teams in the lab, working through late-night PCB routing, testing code in open studios, and presenting projects to the college community.
            </p>
          </div>
        </Container>
      </RevealSection>

      {/* Filter Tabs */}
      <section className="py-6 border-b border-[rgba(10,10,9,0.12)] bg-[#EBE5DB]">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-dosis text-xs font-bold text-[#66615A] tracking-[0.2em] mr-2">CATEGORY:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 font-dosis text-xs uppercase tracking-[0.2em] transition-all duration-200 cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-[#0A0A09] text-[#F3EEE5] font-bold shadow-xs'
                      : 'bg-[#F3EEE5] text-[#0A0A09] font-semibold border border-[rgba(10,10,9,0.15)] hover:border-[#0A0A09]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="font-dosis text-xs tracking-[0.18em] text-[#66615A] font-semibold">
              {filteredItems.length} RECORDS CATALOGED
            </span>
          </div>
        </Container>
      </section>

      {/* Responsive Asymmetric Editorial Grid */}
      <section className="py-20 md:py-28 border-b border-[rgba(10,10,9,0.12)]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {filteredItems.map((item, idx) => {
              // Create deliberate asymmetric span rhythm:
              const spanClasses = [
                'md:col-span-7',
                'md:col-span-5',
                'md:col-span-5',
                'md:col-span-7',
                'md:col-span-8',
                'md:col-span-4',
                'md:col-span-6',
                'md:col-span-6',
              ][idx % 8];

              return (
                <div key={item.id} className={spanClasses}>
                  <GalleryTile
                    item={item}
                    aspectRatio={item.aspectRatio || '16/9'}
                    onSelect={(selected) => setActiveItem(selected)}
                  />
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Lightbox / Image Expansion Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A09]/80 backdrop-blur-xs"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="bg-[#FAF6F0] border border-[#0A0A09] max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[rgba(10,10,9,0.1)] pb-4">
              <div className="flex items-center gap-2">
                <NexusIcon size="xs" />
                <span className="font-dosis text-xs uppercase font-bold text-[#EF5A2A] tracking-[0.2em]">
                  STUDIO ARCHIVE // {activeItem.category}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="p-1.5 text-[#0A0A09] hover:text-[#EF5A2A] border border-[rgba(10,10,9,0.2)] cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Visual */}
            <div className="w-full">
              <ImageReveal
                alt={activeItem.title}
                aspectRatio="16/9"
                tag={activeItem.category}
                caption={activeItem.caption}
              />
            </div>

            <div className="space-y-3">
              <h2 className="font-fraunces text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#0A0A09]">
                {activeItem.title}
              </h2>

              <p className="font-bitter text-base text-[#0A0A09] leading-relaxed">
                {activeItem.caption}
              </p>

              <p className="font-bitter text-sm text-[#66615A] leading-relaxed">
                {activeItem.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[rgba(10,10,9,0.1)] flex flex-wrap items-center justify-between gap-4 font-dosis text-xs text-[#66615A]">
              <div className="flex items-center gap-2 font-semibold tracking-[0.15em]">
                <Calendar className="w-4 h-4 text-[#EF5A2A]" />
                <span>DATE: {activeItem.eventDate}</span>
              </div>
              <div className="flex items-center gap-2 font-semibold tracking-[0.15em]">
                <MapPin className="w-4 h-4 text-[#EF5A2A]" />
                <span>STUDIO LAB // CAMPUS INNOVATION</span>
              </div>
            </div>

            <div className="pt-2 text-right">
              <SecondaryButton
                label="CLOSE LIGHTBOX"
                onClick={() => setActiveItem(null)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Action */}
      <RevealSection className="py-24 md:py-36 bg-[#151311] text-[#F3EEE5]">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <SectionLabel
              number="03.1"
              label="GET INVOLVED"
              className="justify-center text-[#F3EEE5]/70"
            />
            <h2 className="font-fraunces font-bold text-3xl sm:text-4xl text-[#F3EEE5] uppercase tracking-tight">
              Be part of the next studio session.
            </h2>
            <p className="font-bitter text-[#F3EEE5]/75 text-base sm:text-lg leading-relaxed">
              NEXUS studio crits and build sprints happen every week. No prior club membership required to visit during open studio hours.
            </p>
            <div className="pt-4">
              <PrimaryButton
                label="JOIN THE CLUB →"
                onClick={() => onRouteChange('/contact')}
                className="bg-[#EF5A2A] border-[#EF5A2A] text-white hover:bg-white hover:text-[#0A0A09]"
              />
            </div>
          </div>
        </Container>
      </RevealSection>
    </main>
  );
};

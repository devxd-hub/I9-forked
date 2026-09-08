/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppRoute } from '../types.ts';
import { StoryChapterHUD, STORY_CHAPTERS } from '../components/about/StoryChapterHUD.tsx';
import { Act01XApproach } from '../components/about/Act01XApproach.tsx';
import { Act02ManifestoEmergence } from '../components/about/Act02ManifestoEmergence.tsx';
import { Act03HorizontalArchive } from '../components/about/Act03HorizontalArchive.tsx';
import { Act04CollectiveNetwork } from '../components/about/Act04CollectiveNetwork.tsx';
import { Act05ProcessLoop } from '../components/about/Act05ProcessLoop.tsx';
import { Act06FinalBeginning } from '../components/about/Act06FinalBeginning.tsx';

interface AboutPageProps {
  onRouteChange: (route: AppRoute) => void;
}

/**
 * REDESIGNED NEXUS ABOUT STORYTELLING EXPERIENCE
 * An interactive visual digital editorial driven purely by vertical scroll:
 *
 * Act 01: THE X APPROACH, ORANGE RADIATION & MANIFESTO EMERGENCE (Chapter 01)
 * Act 02: THE STRUCTURAL PROBLEM & CORE THESIS (Chapter 02)
 * Act 03: THE PINNED HORIZONTAL PHOTOGRAPHIC ARCHIVE (Chapter 03)
 * Act 04: THE INTERDISCIPLINARY SQUADS & DISCIPLINES (Chapter 04)
 * Act 05: THE 4-STAGE CADENCE & THE SHARE->IDEATE LIVING LOOP (Chapter 05)
 * Act 06: THE HORIZON, THE RETURNING X CALLBACK & NEXT STEPS (Chapter 06)
 */
export const AboutPage: React.FC<AboutPageProps> = ({ onRouteChange }) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Ensure fresh start at the top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Monitor window scroll to update reading progress & active chapter
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
      setScrollProgress(progress);

      // Determine which chapter element is currently intersecting
      const chapterElements = STORY_CHAPTERS.map((chap) => document.getElementById(chap.id));
      const windowCenter = window.innerHeight * 0.45;

      let currentIdx = 0;
      chapterElements.forEach((el, idx) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowCenter) {
            currentIdx = idx;
          }
        }
      });

      setActiveChapterIndex(currentIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectChapter = (index: number) => {
    const targetChapter = STORY_CHAPTERS[index];
    if (targetChapter) {
      const el = document.getElementById(targetChapter.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div id="nexus-about-story-page" className="w-full bg-[#F3EEE5] text-[#0A0A09] relative selection:bg-[#EF5A2A] selection:text-white">
      {/* Floating Story Chapter Progression HUD */}
      <StoryChapterHUD
        activeChapterIndex={activeChapterIndex}
        scrollProgress={scrollProgress}
        onSelectChapter={handleSelectChapter}
      />

      {/* Act 01: The X / The Cinematic Approach, Orange Field & Manifesto Emergence */}
      <Act01XApproach />

      {/* Act 02: The Core Thesis & Silos vs Squads Structural Breakdown */}
      <Act02ManifestoEmergence />

      {/* Act 03: Pinned Horizontal Photographic Filmstrip Archive */}
      <Act03HorizontalArchive />

      {/* Act 04: The Interdisciplinary Collective Network */}
      <Act04CollectiveNetwork onRouteChange={onRouteChange} />

      {/* Act 05: The 4-Stage Cadence & Living Recursive Loop */}
      <Act05ProcessLoop />

      {/* Act 06: The Horizon, The Returning X Callback & CTAs */}
      <Act06FinalBeginning onRouteChange={onRouteChange} />
    </div>
  );
};

export default AboutPage;

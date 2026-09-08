/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { AppRoute } from '../types.ts';
import { StoryChapterHUD, STORY_CHAPTERS } from '../components/about/StoryChapterHUD.tsx';
import { StoryScrollProvider } from '../components/about/ScrollStoryContext.tsx';
import { StoryContinuousSpine } from '../components/about/StoryContinuousSpine.tsx';
import { StoryChapter01Intersection } from '../components/about/StoryChapter01Intersection.tsx';
import { StoryChapter02Thesis } from '../components/about/StoryChapter02Thesis.tsx';
import { StoryHorizontalArchiveChapter } from '../components/about/StoryHorizontalArchiveChapter.tsx';
import { StoryChapter03Problem } from '../components/about/StoryChapter03Problem.tsx';
import { StoryChapter04Connection } from '../components/about/StoryChapter04Connection.tsx';
import { StoryChapter05Process } from '../components/about/StoryChapter05Process.tsx';
import { StoryChapter06Artifacts } from '../components/about/StoryChapter06Artifacts.tsx';
import { StoryChapter07People } from '../components/about/StoryChapter07People.tsx';
import { StoryChapter08Archive } from '../components/about/StoryChapter08Archive.tsx';
import { StoryChapter09Horizon } from '../components/about/StoryChapter09Horizon.tsx';

interface AboutPageProps {
  onRouteChange: (route: AppRoute) => void;
}

/**
 * RESTRUCTURED NEXUS ABOUT STORYTELLING EXPERIENCE (01–09 CHAPTER ARCHITECTURE)
 * Powered by a continuous, reversible scroll engine.
 *
 * Chapter 01: THE INTERSECTION (The Signature Opening Story: X → Approach → Orange Field → Text Emergence)
 * Chapter 02: WHY WE EXIST (The Core Thesis & 1:00 AM Lab Bench)
 * Horizontal Visual Journey: THE CHRONOLOGY OF CRAFT (01 Question → 07 Community)
 * Chapter 03: THE STRUCTURAL PROBLEM (Classrooms Build Silos Not Squads)
 * Chapter 04: THE CONNECTION (The Harmonic Convergence of 6 Disciplines)
 * Chapter 05: HOW WE WORK (The 6-Week Sprint Cadence & Living Recursive Loop)
 * Chapter 06: WHAT WE BUILD (The Shipped Artifacts & Interactive Filtering)
 * Chapter 07: THE PEOPLE (The Student Collective & Group Roster)
 * Chapter 08: THE ARCHIVE (Photographic Chronology Across 6 Studio Moments)
 * Chapter 09: WHAT COMES NEXT (The Horizon, 3 Expansion Pillars & Returning X)
 */
export const AboutPage: React.FC<AboutPageProps> = ({ onRouteChange }) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const pageContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to top on initial mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Monitor window scroll to update reading progress & active chapter HUD
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
      setScrollProgress(progress);

      // Determine which chapter element is currently intersecting
      const chapterElements = STORY_CHAPTERS.map((chap) => document.getElementById(chap.id));
      const windowCenter = window.innerHeight * 0.4;

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

  const handleScrollToNext = () => {
    handleSelectChapter(1);
  };

  return (
    <div
      ref={pageContainerRef}
      id="nexus-about-story-page"
      className="w-full bg-[#F3EEE5] text-[#0A0A09] relative selection:bg-[#EF5A2A] selection:text-white"
    >
      <StoryScrollProvider containerRef={pageContainerRef}>
        {/* Continuous Background Trajectory Story Spine */}
        <StoryContinuousSpine />

        {/* Floating Story Chapter Progression HUD */}
        <StoryChapterHUD
          activeChapterIndex={activeChapterIndex}
          scrollProgress={scrollProgress}
          onSelectChapter={handleSelectChapter}
        />

        {/* Chapter 01: The Intersection Point & Signature Opening Story Sequence */}
        <StoryChapter01Intersection onScrollToNext={handleScrollToNext} />

        {/* Chapter 02: Why We Exist & The Core Thesis */}
        <StoryChapter02Thesis />

        {/* Horizontal Visual Story Chapter: Chronology of Craft (01 Question → 07 Community) */}
        <StoryHorizontalArchiveChapter />

        {/* Chapter 03: The Structural Problem (Silos vs Squads) */}
        <StoryChapter03Problem />

        {/* Chapter 04: The Connection (Harmonic Convergence of 6 Disciplines) */}
        <StoryChapter04Connection />

        {/* Chapter 05: How We Work (6-Week Sprint Cadence & Living Loop) */}
        <StoryChapter05Process />

        {/* Chapter 06: What We Build (The Shipped Artifacts) */}
        <StoryChapter06Artifacts onRouteChange={onRouteChange} />

        {/* Chapter 07: The People (The Student Collective) */}
        <StoryChapter07People onRouteChange={onRouteChange} />

        {/* Chapter 08: The Archive (Photographic Chronology of 6 Studio Moments) */}
        <StoryChapter08Archive onRouteChange={onRouteChange} />

        {/* Chapter 09: What Comes Next (The Horizon, 3 Pillars & Returning X) */}
        <StoryChapter09Horizon onRouteChange={onRouteChange} />
      </StoryScrollProvider>
    </div>
  );
};

export default AboutPage;

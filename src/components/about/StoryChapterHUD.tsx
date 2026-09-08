/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface StoryChapterInfo {
  id: string;
  number: string;
  title: string;
  subtitle: string;
}

export const STORY_CHAPTERS: StoryChapterInfo[] = [
  { id: 'act-01-the-x', number: '01', title: 'THE INTERSECTION', subtitle: 'The Iconic X & Orange Field' },
  { id: 'act-02-orange-field', number: '02', title: 'THE QUESTION', subtitle: 'Thesis & Silos vs Squads' },
  { id: 'act-03-archive', number: '03', title: 'THE ARCHIVE', subtitle: 'Photographic Journey' },
  { id: 'act-04-collective', number: '04', title: 'THE SQUADS', subtitle: 'Convergence of Disciplines' },
  { id: 'act-05-process-loop', number: '05', title: 'THE LIVING LOOP', subtitle: 'Sprint Cycle & Rebirth' },
  { id: 'act-06-beginning', number: '06', title: 'THE HORIZON', subtitle: 'Expansion & Returning X' },
];

interface StoryChapterHUDProps {
  activeChapterIndex: number;
  scrollProgress: number;
  onSelectChapter: (index: number) => void;
}

export const StoryChapterHUD: React.FC<StoryChapterHUDProps> = ({
  activeChapterIndex,
  scrollProgress,
  onSelectChapter,
}) => {
  const currentChapter = STORY_CHAPTERS[activeChapterIndex] || STORY_CHAPTERS[0];

  return (
    <aside
      aria-label="Story chapter progression navigation"
      className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-3 bg-[#0A0A09]/90 text-[#F3EEE5] backdrop-blur-md px-4 py-2.5 rounded-full border border-[rgba(243,238,229,0.18)] shadow-[0_12px_32px_rgba(0,0,0,0.3)] select-none transition-all duration-300 font-mono text-xs"
    >
      {/* Chapter Indicator */}
      <div className="flex items-center gap-2 pr-3 border-r border-white/15">
        <span className="w-2 h-2 rounded-full bg-[#EF5A2A] animate-pulse" />
        <span className="text-[#EF5A2A] font-bold">{currentChapter.number}</span>
        <span className="text-[#66615A]">/ 06</span>
      </div>

      {/* Chapter Title & Subtitle */}
      <div className="flex flex-col">
        <span className="font-dosis font-bold text-xs tracking-[0.18em] uppercase text-white">
          {currentChapter.title}
        </span>
        <span className="text-[10px] text-[#A6A095] font-bitter tracking-normal hidden lg:inline">
          {currentChapter.subtitle}
        </span>
      </div>

      {/* Mini Progress Bar Line */}
      <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden ml-2 hidden sm:block">
        <div
          className="h-full bg-[#EF5A2A] transition-all duration-150"
          style={{ width: `${Math.min(100, Math.max(5, scrollProgress * 100))}%` }}
        />
      </div>

      {/* Clickable Dots to Jump Across Story Chapters */}
      <div className="flex items-center gap-1.5 ml-2 pl-2 border-l border-white/15">
        {STORY_CHAPTERS.map((chap, idx) => (
          <button
            key={chap.id}
            onClick={() => onSelectChapter(idx)}
            title={`${chap.number}: ${chap.title}`}
            aria-label={`Jump to ${chap.title}`}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
              idx === activeChapterIndex
                ? 'bg-[#EF5A2A] scale-125'
                : 'bg-white/30 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </aside>
  );
};

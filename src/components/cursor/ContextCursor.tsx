/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';

/**
 * ContextCursor
 * Optional, ultra-minimal contextual indicator for desktop fine pointers.
 * Displays a tiny editorial badge ("VIEW →" or "OPEN →") ONLY when hovering
 * marked interactive elements (e.g. data-cursor="project" or data-cursor="gallery").
 *
 * Fully disabled on touch devices and reduced-motion preferences.
 * Native cursor is preserved. No giant glowing circles, no trails, no particles.
 */
export const ContextCursor: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop devices with hover and fine pointer
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = (e.target as HTMLElement)?.closest('[data-cursor]');
      if (target) {
        const cursorType = target.getAttribute('data-cursor');
        if (cursorType === 'project') {
          setCursorText('VIEW →');
          setIsVisible(true);
        } else if (cursorType === 'gallery') {
          setCursorText('OPEN →');
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        setIsVisible(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isEnabled || !isVisible || !cursorText) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed pointer-events-none z-50 transition-opacity duration-200 ease-out"
      style={{
        left: `${position.x + 14}px`,
        top: `${position.y + 14}px`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#0A0A09] text-[#F3EEE5] text-[10px] font-dosis font-bold tracking-[0.2em] uppercase border border-[rgba(239,90,42,0.4)] shadow-md select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#EF5A2A]" />
        <span>{cursorText}</span>
      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { NexusPenguinSprite } from './NexusPenguinSprite.tsx';
import { PixelHeart } from './PixelHeart.tsx';
import { PenguinFrameKey } from './penguinData.ts';
import { AppRoute } from '../../types.ts';

interface NexusPenguinProps {
  currentRoute: AppRoute;
  preloaderFinished?: boolean;
}

interface ActiveMascotState {
  page: AppRoute;
  frame: PenguinFrameKey;
  positionClass: string;
  showHearts: boolean;
  initialY: number;
  initialX: number;
  peekOffsetPx: number; // ensures only partial body peeks over edge
}

const SESSION_PAGEMAP_KEY = 'nexus_penguin_sighting_count';

export const NexusPenguin: React.FC<NexusPenguinProps> = ({
  currentRoute,
  preloaderFinished = true,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [activeMascot, setActiveMascot] = useState<ActiveMascotState | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const lastScrollY = useRef(0);
  const isRetreatingRef = useRef(false);

  const clearAllTimers = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const getPageSightingCount = (route: string): number => {
    if (typeof window === 'undefined') return 0;
    try {
      const stored = sessionStorage.getItem(SESSION_PAGEMAP_KEY);
      if (!stored) return 0;
      const parsed = JSON.parse(stored);
      return parsed[route] || 0;
    } catch {
      return 0;
    }
  };

  const incrementPageSighting = (route: string) => {
    if (typeof window === 'undefined') return;
    try {
      const stored = sessionStorage.getItem(SESSION_PAGEMAP_KEY);
      const parsed = stored ? JSON.parse(stored) : {};
      parsed[route] = (parsed[route] || 0) + 1;
      sessionStorage.setItem(SESSION_PAGEMAP_KEY, JSON.stringify(parsed));
    } catch {
      // Ignore
    }
  };

  // Scroll awareness: fast scrolling causes a gentle and instant retreat
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const velocity = Math.abs(currentY - lastScrollY.current);
      lastScrollY.current = currentY;

      if (velocity > 40 && activeMascot && !isRetreatingRef.current) {
        isRetreatingRef.current = true;
        clearAllTimers();
        setActiveMascot(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeMascot, clearAllTimers]);

  // Route-Specific Choreography Engine
  useEffect(() => {
    clearAllTimers();
    setActiveMascot(null);
    isRetreatingRef.current = false;

    // Guard: Do not spawn while preloader is active
    if (!preloaderFinished) return;

    // Frequency control: Max 2 sneak-peeks per page per session to preserve rarity
    const count = getPageSightingCount(currentRoute);
    if (count >= 2) return;

    // Organic entry delay (4.5s on home, 3.8s on subpages)
    const initialDelay = currentRoute === '/' ? 4800 : 3800;

    const spawnTimer = setTimeout(() => {
      incrementPageSighting(currentRoute);

      switch (currentRoute) {
        // ----------------------------------------------------
        // 1. HOME: SHY PEEK & GREETING
        // Only partial body emerges (peek_bottom).
        // Looks at visitor -> smile -> wave -> 2-3 hearts -> hold -> retreat.
        // ----------------------------------------------------
        case '/': {
          setActiveMascot({
            page: '/',
            frame: 'peek_bottom',
            positionClass: 'fixed bottom-0 right-6 sm:right-16 z-30 pointer-events-none',
            showHearts: false,
            initialY: 42,
            initialX: 0,
            peekOffsetPx: 14, // only top ~65% of head & eyes visible over screen edge
          });

          // 0.8s: Look toward user
          const t1 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'look_left' });
          }, 800);

          // 1.5s: Smile
          const t2 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'peek_bottom_happy' });
          }, 1500);

          // 2.0s: Friendly wave + 2-3 floating pixel hearts
          const t3 = setTimeout(() => {
            setActiveMascot((prev) =>
              prev && {
                ...prev,
                frame: 'wave_smile',
                showHearts: !shouldReduceMotion,
              }
            );
          }, 2000);

          // 3.6s: Hold friendly smile
          const t4 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'peek_bottom_happy', showHearts: false });
          }, 3600);

          // 4.5s: Prepare retreat
          const t5 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'peek_bottom' });
          }, 4500);

          // 5.2s: Disappear downward
          const t6 = setTimeout(() => {
            setActiveMascot(null);
          }, 5200);

          timeoutsRef.current.push(t1, t2, t3, t4, t5, t6);
          break;
        }

        // ----------------------------------------------------
        // 2. ABOUT: CURIOUS OBSERVATION (~5.5s)
        // Peek -> stop -> look at visitor -> blink -> curious head tilt -> another look -> slow retreat.
        // No waving. No hearts.
        // ----------------------------------------------------
        case '/about': {
          setActiveMascot({
            page: '/about',
            frame: 'peek_bottom',
            positionClass: 'fixed bottom-0 left-6 sm:left-14 z-30 pointer-events-none',
            showHearts: false,
            initialY: 42,
            initialX: 0,
            peekOffsetPx: 14,
          });

          // 0.9s: Look toward user
          const t1 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'look_right' });
          }, 900);

          // 2.0s: Gentle blink
          const t2 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'blink' });
          }, 2000);

          // 2.3s: Resume looking
          const t3 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'look_right' });
          }, 2300);

          // 3.4s: Curious head tilt
          const t4 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'curious' });
          }, 3400);

          // 4.5s: Look once more
          const t5 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'look_right' });
          }, 4500);

          // 5.3s: Duck down
          const t6 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'peek_bottom' });
          }, 5300);

          // 6.0s: Clean disappearance
          const t7 = setTimeout(() => {
            setActiveMascot(null);
          }, 6000);

          timeoutsRef.current.push(t1, t2, t3, t4, t5, t6, t7);
          break;
        }

        // ----------------------------------------------------
        // 3. PROJECTS: INSPECTION
        // Enter from right edge -> inspect toward projects -> lean forward -> surprised/curious -> exit
        // ----------------------------------------------------
        case '/projects': {
          setActiveMascot({
            page: '/projects',
            frame: 'peek_right',
            positionClass: 'fixed bottom-24 right-0 z-30 pointer-events-none',
            showHearts: false,
            initialY: 0,
            initialX: 38,
            peekOffsetPx: 0,
          });

          // 1.0s: Lean forward and inspect the project showcase
          const t1 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'inspect' });
          }, 1000);

          // 2.4s: Surprised / curious reaction
          const t2 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'surprised' });
          }, 2400);

          // 3.5s: Curious tilt
          const t3 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'curious' });
          }, 3500);

          // 4.5s: Duck back behind edge
          const t4 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'peek_right' });
          }, 4500);

          // 5.2s: Disappear
          const t5 = setTimeout(() => {
            setActiveMascot(null);
          }, 5200);

          timeoutsRef.current.push(t1, t2, t3, t4, t5);
          break;
        }

        // ----------------------------------------------------
        // 4. GALLERY: ADMIRATION
        // Peek from bottom corner -> look at visual art -> head tilt -> admire with glints -> retreat
        // ----------------------------------------------------
        case '/gallery': {
          setActiveMascot({
            page: '/gallery',
            frame: 'peek_bottom',
            positionClass: 'fixed bottom-0 right-1/4 z-30 pointer-events-none',
            showHearts: false,
            initialY: 42,
            initialX: 0,
            peekOffsetPx: 14,
          });

          // 0.9s: Admire artwork with sparkling eyes
          const t1 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'admire' });
          }, 900);

          // 2.2s: Look up toward gallery dome
          const t2 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'look_up' });
          }, 2200);

          // 3.3s: Curious appreciative tilt
          const t3 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'curious' });
          }, 3300);

          // 4.4s: Duck down
          const t4 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'peek_bottom' });
          }, 4400);

          // 5.1s: Disappear
          const t5 = setTimeout(() => {
            setActiveMascot(null);
          }, 5100);

          timeoutsRef.current.push(t1, t2, t3, t4, t5);
          break;
        }

        // ----------------------------------------------------
        // 5. TEAM: SOCIAL GREETING
        // Appear -> look around -> cheerful wave -> tiny smile -> retreat
        // ----------------------------------------------------
        case '/team': {
          setActiveMascot({
            page: '/team',
            frame: 'peek_bottom',
            positionClass: 'fixed bottom-0 right-10 sm:right-24 z-30 pointer-events-none',
            showHearts: false,
            initialY: 42,
            initialX: 0,
            peekOffsetPx: 14,
          });

          // 0.8s: Look around at team
          const t1 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'look_left' });
          }, 800);

          // 1.8s: Cheerful social wave
          const t2 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'wave' });
          }, 1800);

          // 2.9s: Smile
          const t3 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'happy' });
          }, 2900);

          // 3.8s: Duck down
          const t4 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'peek_bottom' });
          }, 3800);

          // 4.5s: Disappear
          const t5 = setTimeout(() => {
            setActiveMascot(null);
          }, 4500);

          timeoutsRef.current.push(t1, t2, t3, t4, t5);
          break;
        }

        // ----------------------------------------------------
        // 6. CONTACT: HESITANT
        // Peek shyly -> look at contact box -> step slightly forward -> hesitate -> tiny wave -> retreat
        // ----------------------------------------------------
        case '/contact': {
          setActiveMascot({
            page: '/contact',
            frame: 'shy',
            positionClass: 'fixed bottom-0 left-8 sm:left-20 z-30 pointer-events-none',
            showHearts: false,
            initialY: 42,
            initialX: 0,
            peekOffsetPx: 14,
          });

          // 1.0s: Look toward contact form
          const t1 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'look_right' });
          }, 1000);

          // 2.2s: Hesitant bashful look
          const t2 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'shy' });
          }, 2200);

          // 3.1s: Tiny shy wave toward visitor
          const t3 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'wave' });
          }, 3100);

          // 4.1s: Duck down
          const t4 = setTimeout(() => {
            setActiveMascot((prev) => prev && { ...prev, frame: 'peek_bottom' });
          }, 4100);

          // 4.8s: Disappear
          const t5 = setTimeout(() => {
            setActiveMascot(null);
          }, 4800);

          timeoutsRef.current.push(t1, t2, t3, t4, t5);
          break;
        }

        default:
          break;
      }
    }, initialDelay);

    timeoutsRef.current.push(spawnTimer);

    return () => {
      clearAllTimers();
    };
  }, [currentRoute, preloaderFinished, shouldReduceMotion, clearAllTimers]);

  if (!activeMascot) return null;

  return (
    <AnimatePresence>
      <div className={activeMascot.positionClass} aria-hidden="true">
        <motion.div
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : activeMascot.initialY,
            x: shouldReduceMotion ? 0 : activeMascot.initialX,
          }}
          animate={{
            opacity: 1,
            y: activeMascot.peekOffsetPx,
            x: 0,
          }}
          exit={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : activeMascot.initialY,
            x: shouldReduceMotion ? 0 : activeMascot.initialX,
            transition: { duration: 0.35, ease: [0.32, 0, 0.67, 0] },
          }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative flex items-center justify-center"
        >
          {/* 2-3 Floating Pixel Hearts for Home Greeting */}
          {activeMascot.showHearts && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 pointer-events-none">
              <PixelHeart delay={0} startX={-10} startY={0} driftX={-7} scale={2} />
              <PixelHeart delay={0.25} startX={8} startY={-4} driftX={8} scale={1.8} />
              <PixelHeart delay={0.5} startX={0} startY={-8} driftX={-2} scale={2.2} />
            </div>
          )}

          {/* Crisp Pixel-Art Mascot Sprite (Integer scale 2.4x) */}
          <NexusPenguinSprite
            frame={activeMascot.frame}
            scale={2.4}
            className="filter drop-shadow-[0_4px_10px_rgba(10,10,9,0.25)]"
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

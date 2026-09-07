/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface CinematicPreloaderProps {
  onComplete: () => void;
  onSkip?: () => void;
}

type PreloaderStage =
  | 'dormant'      // 0.0s - 0.5s: Quiet warm atmosphere, coordinates appear
  | 'signals'      // 0.5s - 1.2s: First two signals materialize independently
  | 'movement'     // 1.2s - 2.1s: Choreographed trajectories draw toward center
  | 'convergence'  // 2.1s - 2.7s: Trajectories bend & accelerate to focal point
  | 'connection'   // 2.7s - 3.4s: Precision intersection flash, official logo emerges from blur
  | 'stillness'    // 3.4s - 3.9s: Logo crystal clear, outward ripple, calm hold
  | 'handoff'      // 3.9s - 4.5s: Smooth dissolution revealing the live website
  | 'done';

/**
 * CINEMATIC PRELOADER: "WHERE IDEAS CONVERGE"
 *
 * A brand film in miniature crafted specifically for NEXUS:
 * 1. SEPARATION: Independent signals exist in space.
 * 2. MOVEMENT: Trajectory lines form along curved architectural coordinates.
 * 3. CONVERGENCE: Paths bend and accelerate toward a shared intersection.
 * 4. CONNECTION: Geometric crossing event at center.
 * 5. DISCOVERY: Official uncropped, undistorted logo (/NEXUS-removebg-preview-1.png)
 *    emerges via atmospheric focus and soft illumination.
 * 6. RIPPLE & STILLNESS: Brand identity establishes in quiet confidence.
 * 7. SEAMLESS HANDOFF: Preloader dissolves invisibly into the underlying website.
 */
export const CinematicPreloader: React.FC<CinematicPreloaderProps> = ({
  onComplete,
  onSkip,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [stage, setStage] = useState<PreloaderStage>('dormant');
  const [hasStartedHandoff, setHasStartedHandoff] = useState(false);
  const stageTimeoutRef = useRef<NodeJS.Timeout[]>([]);

  // Prevent background scroll while preloader is active to guarantee visual alignment
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Orchestrate deterministically timed stage progression
  useEffect(() => {
    // Clear any previous timers
    stageTimeoutRef.current.forEach(clearTimeout);
    stageTimeoutRef.current = [];

    if (shouldReduceMotion) {
      // Streamlined sequence for reduced motion preference
      const t1 = setTimeout(() => setStage('connection'), 300);
      const t2 = setTimeout(() => setStage('stillness'), 1200);
      const t3 = setTimeout(() => {
        setHasStartedHandoff(true);
        setStage('handoff');
      }, 2000);
      const t4 = setTimeout(() => {
        setStage('done');
        onComplete();
      }, 2600);

      stageTimeoutRef.current = [t1, t2, t3, t4];
      return () => stageTimeoutRef.current.forEach(clearTimeout);
    }

    // Standard Cinematic Timeline (~4.2s total to full handoff)
    const timers = [
      setTimeout(() => setStage('signals'), 450),       // 0.45s: Signals wake up
      setTimeout(() => setStage('movement'), 1150),     // 1.15s: Trajectories launch
      setTimeout(() => setStage('convergence'), 2050),  // 2.05s: Tension & bend
      setTimeout(() => setStage('connection'), 2650),   // 2.65s: Intersection & logo discovery
      setTimeout(() => setStage('stillness'), 3350),    // 3.35s: Stillness & outward ripple
      setTimeout(() => {
        setHasStartedHandoff(true);
        setStage('handoff');
      }, 3900),                                         // 3.90s: Seamless dissolve begins
      setTimeout(() => {
        setStage('done');
        onComplete();
      }, 4550),                                         // 4.55s: Complete & unmount
    ];

    stageTimeoutRef.current = timers;
    return () => stageTimeoutRef.current.forEach(clearTimeout);
  }, [shouldReduceMotion, onComplete]);

  // Handle immediate skip
  const handleSkip = () => {
    stageTimeoutRef.current.forEach(clearTimeout);
    setHasStartedHandoff(true);
    setStage('handoff');
    if (onSkip) onSkip();
    setTimeout(() => {
      setStage('done');
      onComplete();
    }, 450);
  };

  if (stage === 'done') return null;

  // Viewport center is at (600, 400) in our 1200x800 coordinate space
  // Path 1 (Idea): Starts top-left (140, 160), sweeps through center (600, 400) to bottom-right (1060, 640)
  const path1 = 'M 140 160 C 320 250, 470 375, 600 400 C 730 425, 880 550, 1060 640';

  // Path 2 (People/Talent): Starts bottom-left (140, 640), sweeps through center (600, 400) to top-right (1060, 160)
  const path2 = 'M 140 640 C 320 550, 470 425, 600 400 C 730 375, 880 250, 1060 160';

  // Path 3 (Ambient Horizontal Guideline): passes gently across center
  const pathHorizon = 'M 0 400 C 350 395, 520 400, 600 400 C 680 400, 850 405, 1200 400';

  return (
    <motion.aside
      id="nexus-cinematic-preloader"
      role="status"
      aria-live="polite"
      aria-label="Loading NEXUS experience"
      initial={{ opacity: 1 }}
      animate={{
        opacity: stage === 'handoff' ? 0 : 1,
      }}
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="fixed inset-0 z-[999] w-full h-full bg-[#F3EEE5] flex flex-col items-center justify-center overflow-hidden select-none pointer-events-auto"
      style={{
        // Ensure seamless background tone matching the website
        backgroundColor: '#F3EEE5',
      }}
    >
      {/* Subtle Atmospheric Paper Grain (Non-distracting, purely tactile) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage: `radial-gradient(#0A0A09 0.75px, transparent 0.75px)`,
          backgroundSize: '16px 16px',
        }}
        aria-hidden="true"
      />

      {/* Atmospheric Ambient Warmth Centerpiece */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: stage === 'convergence' || stage === 'connection' || stage === 'stillness' ? 0.35 : 0.08,
          scale: stage === 'connection' || stage === 'stillness' ? 1.2 : 1,
        }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(239,90,42,0.18) 0%, rgba(243,238,229,0) 70%)',
        }}
      />

      {/* Editorial Canvas Perimeter Framing */}
      <div
        className="absolute inset-4 sm:inset-6 md:inset-8 pointer-events-none border border-[rgba(10,10,9,0.06)] flex flex-col justify-between p-3 sm:p-5"
        aria-hidden="true"
      >
        {/* Top Header Framing */}
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-dosis font-semibold tracking-[0.28em] text-[#66615A]/60 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#EF5A2A] rounded-full inline-block" />
            <span>NEXUS // 2026</span>
          </div>
          <span className="hidden sm:inline-block">WHERE IDEAS CONVERGE</span>
          <span>EST. CAMPUS</span>
        </div>

        {/* Bottom Framing & Skip Option */}
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-dosis font-semibold tracking-[0.25em] text-[#66615A]/50 uppercase">
          <div className="flex items-center gap-4">
            <span>[ 01 // TRAJECTORY ]</span>
            <span className="hidden md:inline-block">SEPARATION → CONVERGENCE</span>
          </div>

          {/* Discreet Skip Button for returning or impatient users */}
          <button
            type="button"
            onClick={handleSkip}
            className="pointer-events-auto text-[#66615A] hover:text-[#EF5A2A] transition-colors duration-200 tracking-[0.25em] cursor-pointer focus:outline-none focus:text-[#EF5A2A]"
            aria-label="Skip introductory animation"
          >
            SKIP INTRO →
          </button>
        </div>
      </div>

      {/* Core Dynamic Vector Choreography Canvas */}
      <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center">
        <svg
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-contain max-w-[1400px] max-h-[900px]"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Faint Architectural Grid Lines */}
          <line
            x1="600"
            y1="100"
            x2="600"
            y2="700"
            stroke="rgba(10,10,9,0.05)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1="200"
            y1="400"
            x2="1000"
            y2="400"
            stroke="rgba(10,10,9,0.05)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* Subtly animated horizontal horizon guide */}
          <path
            d={pathHorizon}
            stroke="rgba(239, 90, 42, 0.12)"
            strokeWidth="1"
            strokeDasharray="4 4"
            fill="none"
          />

          {/* ========================================================================= */}
          {/* TRAJECTORY 1 (Upper-Left to Lower-Right through Center)                   */}
          {/* ========================================================================= */}
          {/* Static subtle trace */}
          <path
            d={path1}
            stroke="rgba(239, 90, 42, 0.14)"
            strokeWidth="1"
            fill="none"
          />

          {/* Active travelling dashed trajectory 1 */}
          <motion.path
            d={path1}
            stroke="#EF5A2A"
            strokeWidth="1.75"
            strokeDasharray="6 4"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              shouldReduceMotion
                ? { pathLength: 1, opacity: 0.4 }
                : {
                    pathLength:
                      stage === 'dormant' || stage === 'signals'
                        ? 0
                        : stage === 'movement'
                        ? 0.5
                        : 1,
                    opacity:
                      stage === 'dormant'
                        ? 0
                        : stage === 'signals'
                        ? 0.2
                        : stage === 'stillness' || stage === 'handoff'
                        ? 0.3
                        : 0.85,
                  }
            }
            transition={{
              duration: stage === 'movement' ? 0.9 : 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* ========================================================================= */}
          {/* TRAJECTORY 2 (Lower-Left to Upper-Right through Center)                   */}
          {/* ========================================================================= */}
          {/* Static subtle trace */}
          <path
            d={path2}
            stroke="rgba(239, 90, 42, 0.14)"
            strokeWidth="1"
            fill="none"
          />

          {/* Active travelling dashed trajectory 2 */}
          <motion.path
            d={path2}
            stroke="#EF5A2A"
            strokeWidth="1.75"
            strokeDasharray="6 4"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              shouldReduceMotion
                ? { pathLength: 1, opacity: 0.4 }
                : {
                    pathLength:
                      stage === 'dormant' || stage === 'signals'
                        ? 0
                        : stage === 'movement'
                        ? 0.5
                        : 1,
                    opacity:
                      stage === 'dormant'
                        ? 0
                        : stage === 'signals'
                        ? 0.2
                        : stage === 'stillness' || stage === 'handoff'
                        ? 0.3
                        : 0.85,
                  }
            }
            transition={{
              duration: stage === 'movement' ? 0.9 : 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* ========================================================================= */}
          {/* SIGNAL 1: THE IDEA (Origin at 140, 160 -> moves toward 600, 400)          */}
          {/* ========================================================================= */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{
              opacity:
                stage === 'dormant'
                  ? 0
                  : stage === 'connection' || stage === 'stillness' || stage === 'handoff'
                  ? 0
                  : 1,
            }}
            transition={{ duration: 0.4 }}
          >
            {/* Travelling node using motion coordinates */}
            <motion.circle
              cx={140}
              cy={160}
              r={3.5}
              fill="#EF5A2A"
              animate={
                shouldReduceMotion
                  ? { cx: 600, cy: 400 }
                  : stage === 'movement'
                  ? { cx: 370, cy: 280 }
                  : stage === 'convergence' || stage === 'connection'
                  ? { cx: 600, cy: 400 }
                  : { cx: 140, cy: 160 }
              }
              transition={{
                duration: stage === 'convergence' ? 0.6 : 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* Orbit ring around Signal 1 */}
            <motion.circle
              cx={140}
              cy={160}
              r={9}
              stroke="#EF5A2A"
              strokeWidth="0.75"
              strokeDasharray="2 2"
              fill="none"
              animate={
                shouldReduceMotion
                  ? { cx: 600, cy: 400, opacity: 0 }
                  : stage === 'movement'
                  ? { cx: 370, cy: 280, opacity: 0.7 }
                  : stage === 'convergence'
                  ? { cx: 600, cy: 400, opacity: 0 }
                  : { cx: 140, cy: 160, opacity: 0.8 }
              }
              transition={{
                duration: stage === 'convergence' ? 0.6 : 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* Label for Signal 1: visible during signals & early movement */}
            <motion.text
              x={155}
              y={164}
              fill="#66615A"
              fontSize="9"
              fontFamily="Dosis, sans-serif"
              fontWeight="600"
              letterSpacing="0.25em"
              animate={{
                opacity: stage === 'signals' ? 0.8 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              SIGNAL.01 // IDEA
            </motion.text>
          </motion.g>

          {/* ========================================================================= */}
          {/* SIGNAL 2: THE PEOPLE (Origin at 140, 640 -> moves toward 600, 400)        */}
          {/* ========================================================================= */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{
              opacity:
                stage === 'dormant'
                  ? 0
                  : stage === 'connection' || stage === 'stillness' || stage === 'handoff'
                  ? 0
                  : 1,
            }}
            transition={{ duration: 0.4 }}
          >
            {/* Travelling node using motion coordinates */}
            <motion.circle
              cx={140}
              cy={640}
              r={3.5}
              fill="#EF5A2A"
              animate={
                shouldReduceMotion
                  ? { cx: 600, cy: 400 }
                  : stage === 'movement'
                  ? { cx: 370, cy: 520 }
                  : stage === 'convergence' || stage === 'connection'
                  ? { cx: 600, cy: 400 }
                  : { cx: 140, cy: 640 }
              }
              transition={{
                duration: stage === 'convergence' ? 0.6 : 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* Orbit ring around Signal 2 */}
            <motion.circle
              cx={140}
              cy={640}
              r={9}
              stroke="#EF5A2A"
              strokeWidth="0.75"
              strokeDasharray="2 2"
              fill="none"
              animate={
                shouldReduceMotion
                  ? { cx: 600, cy: 400, opacity: 0 }
                  : stage === 'movement'
                  ? { cx: 370, cy: 520, opacity: 0.7 }
                  : stage === 'convergence'
                  ? { cx: 600, cy: 400, opacity: 0 }
                  : { cx: 140, cy: 640, opacity: 0.8 }
              }
              transition={{
                duration: stage === 'convergence' ? 0.6 : 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* Label for Signal 2: visible during signals & early movement */}
            <motion.text
              x={155}
              y={644}
              fill="#66615A"
              fontSize="9"
              fontFamily="Dosis, sans-serif"
              fontWeight="600"
              letterSpacing="0.25em"
              animate={{
                opacity: stage === 'signals' ? 0.8 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              SIGNAL.02 // PEOPLE
            </motion.text>
          </motion.g>

          {/* ========================================================================= */}
          {/* THE MOMENT OF CONNECTION EVENT (Occurs precisely at (600, 400))           */}
          {/* ========================================================================= */}
          {stage === 'connection' || stage === 'stillness' || stage === 'handoff' ? (
            <g>
              {/* Expanding geometric connection pulse ring */}
              <motion.circle
                cx={600}
                cy={400}
                initial={{ r: 4, opacity: 0.9 }}
                animate={{ r: 42, opacity: 0 }}
                transition={{ duration: 0.75, ease: 'easeOut' }}
                stroke="#EF5A2A"
                strokeWidth="1.5"
                fill="none"
              />

              {/* Second subtle delayed outward pulse */}
              <motion.circle
                cx={600}
                cy={400}
                initial={{ r: 2, opacity: 0.8 }}
                animate={{ r: 72, opacity: 0 }}
                transition={{ duration: 0.95, delay: 0.15, ease: 'easeOut' }}
                stroke="#EF5A2A"
                strokeWidth="0.75"
                strokeDasharray="4 4"
                fill="none"
              />

              {/* Precision intersection crosshair */}
              <motion.g
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.9, 0.3], scale: [0.8, 1, 1] }}
                transition={{ duration: 0.6 }}
              >
                <line x1="585" y1="400" x2="615" y2="400" stroke="#EF5A2A" strokeWidth="1" />
                <line x1="600" y1="385" x2="600" y2="415" stroke="#EF5A2A" strokeWidth="1" />
              </motion.g>
            </g>
          ) : null}

          {/* ========================================================================= */}
          {/* OUTWARD RIPPLE TRAJECTORIES (Extends during stillness)                    */}
          {/* ========================================================================= */}
          {(stage === 'stillness' || stage === 'handoff') && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              {/* Horizontal left-right extension */}
              <line
                x1="450"
                y1="400"
                x2="750"
                y2="400"
                stroke="#EF5A2A"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
              {/* Diagonal accent markers echoing the NEXUS X geometry */}
              <line
                x1="520"
                y1="340"
                x2="680"
                y2="460"
                stroke="rgba(239,90,42,0.25)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <line
                x1="520"
                y1="460"
                x2="680"
                y2="340"
                stroke="rgba(239,90,42,0.25)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            </motion.g>
          )}
        </svg>
      </div>

      {/* =========================================================================== */}
      {/* ACT IV & V: OFFICIAL NEXUS LOGO DISCOVERY & REVEAL                          */}
      {/* Rules strictly respected:                                                  */}
      {/* - Official PNG asset "/NEXUS-removebg-preview-1.png"                       */}
      {/* - Zero cropping, zero letter separation, zero distortions                   */}
      {/* - Sophisticated atmospheric blur-to-focus and gentle directional reveal     */}
      {/* =========================================================================== */}
      <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none px-4 text-center">
        {/* The Official Uncropped Logo Asset */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.94,
            filter: 'blur(10px)',
          }}
          animate={
            stage === 'connection' || stage === 'stillness' || stage === 'handoff'
              ? {
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px)',
                }
              : {
                  opacity: 0,
                  scale: 0.94,
                  filter: 'blur(10px)',
                }
          }
          transition={{
            duration: shouldReduceMotion ? 0.4 : 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative flex items-center justify-center"
        >
          {/* Soft directional illumination backplate that radiates from convergence */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={
              stage === 'connection' || stage === 'stillness' || stage === 'handoff'
                ? { opacity: 0.4, scale: 1.1 }
                : { opacity: 0, scale: 0.7 }
            }
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0 -m-8 rounded-full bg-radial from-[#EF5A2A]/20 via-[#EF5A2A]/5 to-transparent blur-md pointer-events-none"
            aria-hidden="true"
          />

          {/* Official NEXUS Logo Asset PNG */}
          <img
            id="nexus-preloader-official-logo"
            src="/NEXUS-removebg-preview-1.png"
            alt="NEXUS"
            className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 object-contain aspect-square select-none pointer-events-none drop-shadow-2xs"
            loading="eager"
            decoding="async"
          />
        </motion.div>

        {/* Brand Tagline & Subtitle: "WHERE IDEAS FIND PEOPLE" */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={
            stage === 'stillness' || stage === 'handoff'
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 8 }
          }
          transition={{
            duration: 0.45,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-4 sm:mt-5 flex flex-col items-center justify-center space-y-1.5"
        >
          <div className="flex items-center gap-3">
            <span className="w-6 sm:w-8 h-px bg-[#EF5A2A]" />
            <p className="font-dosis text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.32em] text-[#EF5A2A] uppercase">
              WHERE IDEAS FIND PEOPLE
            </p>
            <span className="w-6 sm:w-8 h-px bg-[#EF5A2A]" />
          </div>
          <p className="font-dosis text-[9px] sm:text-[10px] font-semibold tracking-[0.28em] text-[#66615A] uppercase">
            COLLEGE CLUB
          </p>
        </motion.div>
      </div>

      {/* Screen reader notification */}
      <div className="sr-only" aria-live="assertive">
        {stage === 'stillness' || stage === 'handoff'
          ? 'NEXUS — Where Ideas Find People. Welcome to the official community.'
          : 'Connecting ideas and people...'}
      </div>
    </motion.aside>
  );
};

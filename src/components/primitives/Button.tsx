/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface BaseButtonProps {
  children?: React.ReactNode;
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  className?: string;
  id?: string;
  showArrow?: boolean;
  arrowType?: 'right' | 'upRight';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  target?: string;
  rel?: string;
  magnetic?: boolean;
}

/**
 * Hook for subtle magnetic effect on desktop fine pointers.
 * Moves only 3-5px towards cursor, zero distortion, resets smoothly.
 */
export function useMagnetic(enabled: boolean = true) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsFinePointer(fine && !reducedMotion);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!enabled || !isFinePointer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.14;
    const deltaY = (e.clientY - centerY) * 0.14;
    // Clamp to max 5px
    const clampedX = Math.max(-5, Math.min(5, deltaX));
    const clampedY = Math.max(-5, Math.min(5, deltaY));
    setOffset({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    if (!enabled || !isFinePointer) return;
    setOffset({ x: 0, y: 0 });
  };

  return {
    offset,
    handleMouseMove,
    handleMouseLeave,
    style: enabled && isFinePointer ? {
      transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
      transition: offset.x === 0 && offset.y === 0
        ? 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)'
        : 'transform 120ms ease-out',
    } : undefined,
  };
}

/**
 * Primary Button
 * Solid deep black #0A0A09, light text #F3EEE5, smooth hover transition to orange/dark
 */
export const PrimaryButton: React.FC<BaseButtonProps> = ({
  children,
  label,
  onClick,
  href,
  className = '',
  id,
  showArrow = true,
  arrowType = 'right',
  disabled = false,
  type = 'button',
  ariaLabel,
  target,
  rel,
  magnetic = false,
}) => {
  const content = label || children;
  const ArrowIcon = arrowType === 'upRight' ? ArrowUpRight : ArrowRight;
  const { style, handleMouseMove, handleMouseLeave } = useMagnetic(magnetic);

  const baseClasses = `
    inline-flex items-center justify-center gap-3 px-6 py-3.5
    bg-[#0A0A09] text-[#F3EEE5] text-xs font-dosis font-bold tracking-[0.18em] uppercase
    rounded-none border border-[#0A0A09]
    transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
    hover:bg-[#EF5A2A] hover:border-[#EF5A2A] hover:text-white
    active:scale-[0.98]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EF5A2A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EEE5]
    disabled:opacity-50 disabled:pointer-events-none cursor-pointer
    group select-none
    ${className}
  `;

  if (href) {
    return (
      <a
        id={id}
        href={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        className={baseClasses}
        aria-label={ariaLabel || (typeof content === 'string' ? content : undefined)}
        target={target}
        rel={rel}
      >
        <span className="whitespace-nowrap transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">{content}</span>
        {showArrow && (
          <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
        )}
      </a>
    );
  }

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      disabled={disabled}
      className={baseClasses}
      aria-label={ariaLabel || (typeof content === 'string' ? content : undefined)}
    >
      <span className="whitespace-nowrap transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">{content}</span>
      {showArrow && (
        <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
      )}
    </button>
  );
};

/**
 * Secondary Button
 * Outlined with light line / deep black border, subtle hover fill
 */
export const SecondaryButton: React.FC<BaseButtonProps> = ({
  children,
  label,
  onClick,
  href,
  className = '',
  id,
  showArrow = false,
  arrowType = 'right',
  disabled = false,
  type = 'button',
  ariaLabel,
  target,
  rel,
}) => {
  const content = label || children;
  const ArrowIcon = arrowType === 'upRight' ? ArrowUpRight : ArrowRight;

  const baseClasses = `
    inline-flex items-center justify-center gap-3 px-6 py-3.5
    bg-transparent text-[#0A0A09] text-xs font-dosis font-bold tracking-[0.18em] uppercase
    border border-[rgba(10,10,9,0.25)]
    transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
    hover:bg-[rgba(10,10,9,0.06)] hover:border-[#0A0A09]
    active:scale-[0.98]
    focus:outline-none focus:ring-2 focus:ring-[#0A0A09] focus:ring-offset-2 focus:ring-offset-[#F3EEE5]
    disabled:opacity-50 disabled:pointer-events-none cursor-pointer
    group select-none
    ${className}
  `;

  if (href) {
    return (
      <a
        id={id}
        href={href}
        onClick={onClick}
        className={baseClasses}
        aria-label={ariaLabel || (typeof content === 'string' ? content : undefined)}
        target={target}
        rel={rel}
      >
        <span className="whitespace-nowrap transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5">{content}</span>
        {showArrow && (
          <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5" />
        )}
      </a>
    );
  }

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      aria-label={ariaLabel || (typeof content === 'string' ? content : undefined)}
    >
      <span className="whitespace-nowrap transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5">{content}</span>
      {showArrow && (
        <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5" />
      )}
    </button>
  );
};

/**
 * Text Link
 * Clean inline/block link with subtle indicator and hover transition
 */
export const TextLink: React.FC<BaseButtonProps> = ({
  children,
  label,
  onClick,
  href,
  className = '',
  id,
  showArrow = true,
  arrowType = 'right',
  ariaLabel,
  target,
  rel,
}) => {
  const content = label || children;
  const ArrowIcon = arrowType === 'upRight' ? ArrowUpRight : ArrowRight;

  const baseClasses = `
    inline-flex items-center gap-2 text-xs font-dosis font-bold tracking-[0.18em] uppercase
    text-[#0A0A09] hover:text-[#EF5A2A]
    transition-colors duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer
    group
    focus:outline-none focus:ring-1 focus:ring-[#EF5A2A]
    ${className}
  `;

  if (href) {
    return (
      <a
        id={id}
        href={href}
        onClick={onClick}
        className={baseClasses}
        aria-label={ariaLabel || (typeof content === 'string' ? content : undefined)}
        target={target}
        rel={rel}
      >
        <span className="transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5">{content}</span>
        {showArrow && (
          <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
        )}
      </a>
    );
  }

  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      className={baseClasses}
      aria-label={ariaLabel || (typeof content === 'string' ? content : undefined)}
    >
      <span className="transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5">{content}</span>
      {showArrow && (
        <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
      )}
    </button>
  );
};

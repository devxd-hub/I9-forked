/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface NexusIconProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'hero' | 'custom';
  color?: string;
  id?: string;
  alt?: string;
}

/**
 * Geometric, distinctive orange 'X' — the defining identity element of NEXUS.
 * Rendered as a carefully constructed geometric SVG mark with authentic brand proportions.
 */
export const NexusIcon: React.FC<NexusIconProps> = ({
  className = '',
  size = 'md',
  id,
  alt = 'NEXUS X',
}) => {
  const sizeClasses = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
    xl: 'w-12 h-12',
    '2xl': 'w-16 h-16',
    '3xl': 'w-24 h-24',
    hero: 'w-28 h-28 md:w-36 md:h-36',
    custom: '',
  }[size];

  return (
    <img
      id={id}
      src="/NEXUS-removebg-preview-1.png"
      alt={alt}
      referrerPolicy="no-referrer"
      className={`inline-block shrink-0 select-none object-contain aspect-square pointer-events-none ${sizeClasses} ${className}`}
      loading="eager"
      decoding="async"
    />
  );
};

export interface NexusWordmarkProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';
  inverted?: boolean;
  id?: string;
}

/**
 * NEXUS Wordmark: "N E [ICONIC X] U S"
 * The X acts as the visual centerpiece.
 */
export const NexusWordmark: React.FC<NexusWordmarkProps> = ({
  className = '',
  size = 'md',
  inverted = false,
  id,
}) => {
  const typographySizes = {
    xs: 'text-xs tracking-[0.14em]',
    sm: 'text-sm tracking-[0.16em]',
    md: 'text-lg md:text-xl tracking-[0.18em]',
    lg: 'text-xl md:text-2xl tracking-[0.2em]',
    xl: 'text-3xl md:text-4xl tracking-[0.22em]',
    '2xl': 'text-5xl md:text-6xl tracking-[0.24em]',
    hero: 'text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.22em]',
  }[size];

  const textColor = inverted ? 'text-[#F3EEE5]' : 'text-[#0A0A09]';

  return (
    <span
      id={id}
      className={`inline-flex items-center font-fraunces font-bold uppercase select-none ${typographySizes} ${textColor} ${className}`}
      aria-label="NEXUS"
    >
      <span>NE</span>
      <span className="inline-flex items-center justify-center mx-[0.06em] self-center">
        <NexusIcon
          size="custom"
          className="w-[0.84em] h-[0.84em] -translate-y-[0.02em] transform transition-transform duration-200 group-hover:scale-105"
        />
      </span>
      <span>US</span>
    </span>
  );
};

export interface NexusLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';
  showSubtitle?: boolean;
  subtitleLayout?: 'below' | 'beside';
  inverted?: boolean;
  id?: string;
  onClick?: () => void;
}

/**
 * Reusable <NexusLogo /> component.
 * Features:
 * - N E [ICONIC X] U S
 * - Geometric, distinctive orange X centerpiece
 * - Subtle "COLLEGE CLUB" badge below or beside the wordmark
 */
export const NexusLogo: React.FC<NexusLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  subtitleLayout = 'below',
  inverted = false,
  id = 'nexus-logo',
  onClick,
}) => {
  const subtitleColor = inverted ? 'text-[#F3EEE5]/60' : 'text-[#66615A]';

  const subtitleSizes = {
    xs: 'text-[9px] tracking-[0.2em]',
    sm: 'text-[10px] tracking-[0.22em]',
    md: 'text-[11px] tracking-[0.25em]',
    lg: 'text-xs tracking-[0.28em]',
    xl: 'text-xs tracking-[0.3em]',
    '2xl': 'text-sm tracking-[0.32em]',
    hero: 'text-sm md:text-base tracking-[0.35em]',
  }[size];

  if (subtitleLayout === 'beside') {
    return (
      <div
        id={id}
        onClick={onClick}
        className={`inline-flex items-center gap-3 select-none group ${onClick ? 'cursor-pointer' : ''} ${className}`}
        aria-label="NEXUS College Club"
      >
        <NexusWordmark size={size} inverted={inverted} />
        {showSubtitle && (
          <span
            className={`font-dosis uppercase font-semibold pl-3 border-l ${
              inverted ? 'border-[rgba(243,238,229,0.2)]' : 'border-[rgba(10,10,9,0.18)]'
            } ${subtitleSizes} ${subtitleColor}`}
          >
            COLLEGE CLUB
          </span>
        )}
      </div>
    );
  }

  // Default: Stacked with subtle "COLLEGE CLUB" below
  return (
    <div
      id={id}
      onClick={onClick}
      className={`inline-flex flex-col select-none group ${onClick ? 'cursor-pointer' : ''} ${className}`}
      aria-label="NEXUS College Club"
    >
      <NexusWordmark size={size} inverted={inverted} />
      {showSubtitle && (
        <span
          className={`font-dosis uppercase font-semibold tracking-[0.28em] mt-0.5 ${subtitleSizes} ${subtitleColor}`}
        >
          COLLEGE CLUB
        </span>
      )}
    </div>
  );
};

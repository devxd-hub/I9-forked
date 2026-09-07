/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NexusIcon } from '../brand/NexusLogo.tsx';
import { TeamMember } from '../../types.ts';

interface TeamCardProps {
  member: TeamMember;
  showBio?: boolean;
  className?: string;
}

/**
 * TeamCard
 * Compact, interactive profile card designed with editorial balance.
 *
 * Hover specifications:
 * - Portrait image subtly changes scale (1 -> 1.03) inside overflow-hidden container
 * - Role becomes stronger (contrast, weight, tracking)
 * - Small accent line appears under role
 * - Clean subtle border change, no glassmorphism, no large floating shadows
 * - Keyboard accessible with tabIndex and focus ring
 */
export const TeamCard: React.FC<TeamCardProps> = ({
  member,
  showBio = false,
  className = '',
}) => {
  return (
    <article
      tabIndex={0}
      role="region"
      aria-label={`Profile: ${member.name}, ${member.role}`}
      className={`
        bg-[#FAF6F0] border border-[rgba(10,10,9,0.14)] p-6
        flex flex-col justify-between group
        transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
        hover:border-[#EF5A2A]/60 hover:bg-white hover:shadow-2xs
        active:scale-[0.99]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EF5A2A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EEE5]
        select-none
        ${className}
      `}
    >
      <div>
        {/* Portrait container (overflow-hidden, image scales 1 -> 1.03 on hover) */}
        <div className="relative aspect-square w-full bg-[#E8E2D7] border border-[rgba(10,10,9,0.1)] overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-[#EF5A2A]/40">
          <div className="w-full h-full flex flex-col items-center justify-center p-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
            {/* Background texture */}
            <div
              className="absolute inset-0 opacity-30 bg-[radial-gradient(#0a0a0912_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"
              aria-hidden="true"
            />
            <NexusIcon
              size="lg"
              className="mb-2 opacity-70 group-hover:opacity-100 transition-opacity transform group-hover:scale-105 duration-300"
            />
            <span className="font-dosis text-[11px] uppercase tracking-[0.2em] text-[#66615A] text-center font-semibold">
              PORTRAIT // {member.name}
            </span>
          </div>

          {/* Framing corner accents */}
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#0A0A09]/30 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#0A0A09]/30 pointer-events-none" />
        </div>

        {/* Member Name */}
        <h3 className="font-bitter text-2xl font-bold uppercase tracking-tight text-[#0A0A09] mt-6 group-hover:text-[#EF5A2A] transition-colors duration-300">
          {member.name}
        </h3>

        {/* Role (becomes stronger on hover) */}
        <div className="mt-1">
          <p className="font-dosis text-xs font-bold text-[#66615A] group-hover:text-[#EF5A2A] tracking-[0.2em] uppercase transition-all duration-300">
            {member.role}
          </p>
          {/* Small accent line appears */}
          <div
            className="w-0 h-[2px] bg-[#EF5A2A] mt-1.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-8"
            aria-hidden="true"
          />
        </div>

        {/* Discipline */}
        <p className="font-bitter text-xs text-[#66615A] mt-2.5 pb-2 leading-relaxed">
          {member.discipline}
        </p>

        {/* Optional Bio */}
        {showBio && member.bio && (
          <p className="font-bitter text-xs text-[#66615A] mt-2 pt-2 border-t border-[rgba(10,10,9,0.06)] leading-relaxed">
            {member.bio}
          </p>
        )}
      </div>

      {/* Footer metadata */}
      <div className="mt-4 pt-3 border-t border-[rgba(10,10,9,0.08)] flex items-center justify-between">
        <span className="font-dosis text-[10px] font-bold uppercase tracking-[0.2em] text-[#66615A]">
          {member.group}
        </span>
        {member.yearOfStudy && (
          <span className="font-dosis text-[10px] font-bold tracking-[0.16em] text-[#0A0A09]">
            {member.yearOfStudy}
          </span>
        )}
      </div>
    </article>
  );
};

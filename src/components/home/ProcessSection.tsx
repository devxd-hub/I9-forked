/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Container } from '../primitives/Container.tsx';
import { SectionLabel } from '../primitives/SectionLabel.tsx';
import { NexusIcon } from '../brand/NexusLogo.tsx';
import { RevealSection, RevealText } from '../motion/MotionPrimitives.tsx';

interface Stage {
  number: string;
  name: string;
  copy: string;
  tag: string;
}

const STAGES: Stage[] = [
  {
    number: '01',
    name: 'IDEATE',
    copy: 'Bring the question, idea, problem or experiment.',
    tag: 'EXPLORATION & INQUIRY',
  },
  {
    number: '02',
    name: 'ASSEMBLE',
    copy: 'Find students whose skills and perspective complement yours.',
    tag: 'TEAM & DISCIPLINE MATCH',
  },
  {
    number: '03',
    name: 'BUILD',
    copy: 'Prototype, test, break, redesign and make.',
    tag: 'PROTOTYPE & ITERATION',
  },
  {
    number: '04',
    name: 'SHARE',
    copy: 'Present the result, document the process and let others build on it.',
    tag: 'EXHIBIT & OPEN KNOWLEDGE',
  },
];

/**
 * HOW NEXUS WORKS
 * Heading: FROM IDEA TO SOMETHING REAL.
 * Four stages as editorial rows (NOT a SaaS feature grid).
 */
export const ProcessSection: React.FC = () => {
  return (
    <RevealSection
      id="nexus-how-it-works"
      className="w-full py-24 md:py-36 bg-[#EBE5DB] border-b border-[rgba(10,10,9,0.12)]"
    >
      <Container>
        <div className="max-w-4xl mb-16 space-y-4">
          <SectionLabel number="02" label="METHOD & PROGRESSION" />
          <RevealText
            as="h2"
            staggerMs={45}
            className="font-fraunces font-bold text-4xl sm:text-5xl lg:text-6xl text-[#0A0A09] leading-[1.08] tracking-tight uppercase"
          >
            FROM IDEA TO SOMETHING REAL.
          </RevealText>
          <p className="font-bitter text-[#66615A] max-w-xl text-lg pt-2 leading-relaxed">
            A continuous loop from raw curiosity to functional, shared student work.
          </p>
        </div>

        {/* Editorial Interactive Rows */}
        <div className="divide-y divide-[rgba(10,10,9,0.14)] border-t border-b border-[rgba(10,10,9,0.14)]">
          {STAGES.map((stage) => (
            <div
              key={stage.number}
              tabIndex={0}
              role="region"
              aria-label={`Process stage ${stage.number}: ${stage.name}`}
              className="relative py-10 sm:py-12 px-5 sm:px-8 -mx-5 sm:-mx-8 group transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#E2DBCF]/80 focus:outline-none focus-visible:bg-[#E2DBCF] cursor-default select-none"
            >
              {/* Left accent indicator */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0 bg-[#EF5A2A] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-1 group-focus-visible:w-1"
                aria-hidden="true"
              />

              <div className="grid grid-cols-4 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
                {/* Stage Number (changes color from muted to vivid orange on hover) */}
                <div className="col-span-1 md:col-span-2">
                  <span className="font-dosis text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A0A09]/35 group-hover:text-[#EF5A2A] group-focus-visible:text-[#EF5A2A] tracking-wider transition-colors duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    {stage.number}
                  </span>
                </div>

                {/* Stage Name (shifts translateX(4px) on hover) */}
                <div className="col-span-3 md:col-span-3">
                  <h3 className="font-bitter text-2xl sm:text-3xl font-bold text-[#0A0A09] tracking-wide uppercase flex items-center gap-3 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-focus-visible:translate-x-1">
                    <span>{stage.name}</span>
                    <NexusIcon
                      size="xs"
                      className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 text-[#EF5A2A]"
                    />
                  </h3>
                  <span className="font-dosis text-[11px] font-semibold uppercase tracking-[0.2em] text-[#66615A] group-hover:text-[#0A0A09] mt-1.5 block transition-colors duration-300">
                    {stage.tag}
                  </span>
                </div>

                {/* Stage Description (increases opacity and contrast on hover) */}
                <div className="col-span-4 md:col-span-7 md:pl-6">
                  <p className="font-bitter text-lg sm:text-xl text-[#66615A] group-hover:text-[#0A0A09] group-focus-visible:text-[#0A0A09] font-normal leading-relaxed opacity-80 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    {stage.copy}
                  </p>
                </div>
              </div>

              {/* Expanding Orange Rule */}
              <div
                className="mt-6 h-[2px] w-0 bg-[#EF5A2A] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full group-focus-visible:w-full"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </Container>
    </RevealSection>
  );
};

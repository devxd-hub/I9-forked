/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Container } from '../components/primitives/Container.tsx';
import { SectionLabel } from '../components/primitives/SectionLabel.tsx';
import { PrimaryButton } from '../components/primitives/Button.tsx';
import { TeamCard } from '../components/primitives/TeamCard.tsx';
import { NexusIcon } from '../components/brand/NexusLogo.tsx';
import { RevealSection, RevealText } from '../components/motion/MotionPrimitives.tsx';
import { AppRoute, TeamMember } from '../types.ts';
import { TEAM_MEMBERS } from '../data/nexusData.ts';

interface TeamPageProps {
  onRouteChange: (route: AppRoute) => void;
}

/**
 * TEAM PAGE
 * Complete team directory including:
 * - Leads
 * - Core Members
 * - Advisors / Mentors (faculty mentors)
 * Shows roles and disciplines clearly.
 */
export const TeamPage: React.FC<TeamPageProps> = ({ onRouteChange }) => {
  const [activeGroup, setActiveGroup] = useState<string>('ALL');

  const groups = ['ALL', 'LEADS', 'CORE MEMBERS', 'ADVISORS / MENTORS'];

  const leads = TEAM_MEMBERS.filter(
    (m) => m.group === 'CORE TEAM' || m.group === 'LEADS' || m.role.includes('LEAD')
  );
  const coreMembers = TEAM_MEMBERS.filter(
    (m) =>
      m.group === 'TECH' ||
      m.group === 'DESIGN' ||
      m.group === 'MEDIA' ||
      m.group === 'PROJECTS' ||
      m.group === 'CORE MEMBERS'
  );
  const advisors = TEAM_MEMBERS.filter((m) => m.group === 'ADVISORS / MENTORS');

  const renderMemberCard = (member: TeamMember) => (
    <TeamCard key={member.id} member={member} showBio={true} />
  );

  return (
    <main id="nexus-team-page" className="w-full bg-[#F3EEE5]">
      {/* Header */}
      <RevealSection className="pt-20 md:pt-28 pb-16 md:pb-24 border-b border-[rgba(10,10,9,0.12)]">
        <Container>
          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <SectionLabel number="04" label="PEOPLE" />
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0A0A09] text-white text-xs font-dosis tracking-[0.2em] uppercase border border-[rgba(239,90,42,0.3)]">
                <NexusIcon size="xs" />
                <span>STUDENT DIRECTORY</span>
              </span>
            </div>
            <RevealText
              as="h1"
              staggerMs={40}
              className="font-fraunces font-bold text-4xl sm:text-5xl lg:text-6xl text-[#0A0A09] leading-[1.08] tracking-tight"
            >
              The people behind the work.
            </RevealText>
            <p className="font-bitter text-lg text-[#66615A] leading-relaxed max-w-3xl">
              NEXUS is organized and directed entirely by college students, supported by volunteer domain mentors and faculty advisors who care about student experimentation.
            </p>
          </div>
        </Container>
      </RevealSection>

      {/* Filter Tabs */}
      <section className="py-6 border-b border-[rgba(10,10,9,0.12)] bg-[#EBE5DB]">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-dosis text-xs font-bold text-[#66615A] tracking-[0.2em] mr-2">GROUP:</span>
              {groups.map((group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => setActiveGroup(group)}
                  className={`px-3.5 py-1.5 font-dosis text-xs uppercase tracking-[0.2em] transition-all duration-200 cursor-pointer ${
                    activeGroup === group
                      ? 'bg-[#0A0A09] text-[#F3EEE5] font-bold shadow-xs'
                      : 'bg-[#F3EEE5] text-[#0A0A09] font-semibold border border-[rgba(10,10,9,0.15)] hover:border-[#0A0A09]'
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>
            <span className="font-dosis text-xs tracking-[0.18em] text-[#66615A] font-semibold">
              {TEAM_MEMBERS.length} CONTRIBUTORS
            </span>
          </div>
        </Container>
      </section>

      {/* 1. LEADS */}
      {(activeGroup === 'ALL' || activeGroup === 'LEADS') && (
        <RevealSection className="py-20 md:py-28 border-b border-[rgba(10,10,9,0.12)]">
          <Container>
            <div className="space-y-4 mb-12">
              <SectionLabel number="04.1" label="COORDINATION" />
              <h2 className="font-fraunces font-bold text-3xl sm:text-4xl text-[#0A0A09] uppercase tracking-tight">
                CLUB LEADS
              </h2>
              <p className="font-bitter text-[#66615A] max-w-2xl text-base leading-relaxed">
                Students directing technology pipelines, creative direction, hardware lab sessions, and sprint cohorts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {leads.map(renderMemberCard)}
            </div>
          </Container>
        </RevealSection>
      )}

      {/* 2. CORE MEMBERS */}
      {(activeGroup === 'ALL' || activeGroup === 'CORE MEMBERS') && (
        <RevealSection className="py-20 md:py-28 bg-[#EBE5DB] border-b border-[rgba(10,10,9,0.12)]">
          <Container>
            <div className="space-y-4 mb-12">
              <SectionLabel number="04.2" label="STUDIO BUILDERS" />
              <h2 className="font-fraunces font-bold text-3xl sm:text-4xl text-[#0A0A09] uppercase tracking-tight">
                CORE MEMBERS
              </h2>
              <p className="font-bitter text-[#66615A] max-w-2xl text-base leading-relaxed">
                Active makers, engineers, and designers driving project squads and technical sprints across Tech, Design, Media, and Projects.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreMembers.map(renderMemberCard)}
            </div>
          </Container>
        </RevealSection>
      )}

      {/* 3. ADVISORS / MENTORS */}
      {(activeGroup === 'ALL' || activeGroup === 'ADVISORS / MENTORS') && (
        <RevealSection className="py-20 md:py-28 border-b border-[rgba(10,10,9,0.12)]">
          <Container>
            <div className="space-y-4 mb-12">
              <SectionLabel number="04.3" label="CAMPUS FACULTY" />
              <h2 className="font-fraunces font-bold text-3xl sm:text-4xl text-[#0A0A09] uppercase tracking-tight">
                FACULTY ADVISORS & MENTORS
              </h2>
              <p className="font-bitter text-[#66615A] max-w-2xl text-base leading-relaxed">
                Campus professors and lab researchers who provide studio space support, advice, and academic backing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {advisors.map(renderMemberCard)}
            </div>
          </Container>
        </RevealSection>
      )}

      {/* Leadership / Join CTA */}
      <RevealSection className="py-24 md:py-36 bg-[#151311] text-[#F3EEE5]">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <SectionLabel
              number="04.4"
              label="JOIN THE SQUAD"
              className="justify-center text-[#F3EEE5]/70"
            />
            <h2 className="font-fraunces font-bold text-3xl sm:text-4xl text-[#F3EEE5] uppercase tracking-tight">
              Want to join a NEXUS squad or lead a project?
            </h2>
            <p className="font-bitter text-[#F3EEE5]/75 text-base sm:text-lg leading-relaxed">
              We welcome new members of any major, skill level, or background. Come to a studio sprint, find peers who share your interests, and start building.
            </p>
            <div className="pt-4">
              <PrimaryButton
                label="JOIN THE CLUB →"
                onClick={() => onRouteChange('/contact')}
                className="bg-[#EF5A2A] border-[#EF5A2A] text-white hover:bg-white hover:text-[#0A0A09]"
              />
            </div>
          </div>
        </Container>
      </RevealSection>
    </main>
  );
};

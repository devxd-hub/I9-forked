/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Container } from '../components/primitives/Container.tsx';
import { SectionLabel } from '../components/primitives/SectionLabel.tsx';
import { PrimaryButton, SecondaryButton } from '../components/primitives/Button.tsx';
import { ImageReveal } from '../components/primitives/ImageReveal.tsx';
import { NexusIcon } from '../components/brand/NexusLogo.tsx';
import { RevealSection, RevealText, OrangeThread } from '../components/motion/MotionPrimitives.tsx';
import { AppRoute } from '../types.ts';

interface AboutPageProps {
  onRouteChange: (route: AppRoute) => void;
}

const PHILOSOPHY_CHAIN = [
  'IDEA',
  'PEOPLE',
  'TEAM',
  'BUILD',
  'PROJECT',
  'REALITY',
];

const DISCIPLINES = [
  { name: 'TECHNOLOGY', desc: 'Modern software systems, distributed apps, local-first protocols, and open tooling.' },
  { name: 'ENGINEERING', desc: 'Physical electronics, PCB layout, microcontroller firmware, and mechanical enclosures.' },
  { name: 'DESIGN', desc: 'Typographic precision, interaction design, ergonomics, and clean visual identity.' },
  { name: 'MEDIA', desc: 'Audio engineering, editorial publishing, photo documentation, and video essays.' },
  { name: 'RESEARCH', desc: 'Inquiry into learning tools, interface human factors, and environmental monitoring.' },
  { name: 'CREATIVE EXPERIMENTATION', desc: 'Generative systems, tactile musical controllers, and speculative physical computing.' },
  { name: 'PROBLEM SOLVING', desc: 'Tools built for genuine campus needs, open education, and peer-to-peer collaboration.' },
];

/**
 * ABOUT PAGE
 * Fuller NEXUS story with required sections:
 * - WHY NEXUS EXISTS
 * - WHAT WE BELIEVE
 * - HOW WE COLLABORATE (incorporating IDEA → PEOPLE → TEAM → BUILD → PROJECT → REALITY)
 * - WHAT WE BUILD (technology, engineering, design, media, research, creative experimentation, problem solving)
 * - WHERE WE ARE GOING
 */
export const AboutPage: React.FC<AboutPageProps> = ({ onRouteChange }) => {
  return (
    <main id="nexus-about-page" className="w-full bg-[#F3EEE5]">
      {/* Page Header */}
      <RevealSection className="pt-20 md:pt-28 pb-16 md:pb-24 border-b border-[rgba(10,10,9,0.12)] bg-[#F3EEE5]">
        <Container>
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <SectionLabel number="01" label="ABOUT NEXUS" />
              <span className="font-dosis text-xs text-[#66615A] uppercase tracking-[0.2em] font-semibold">
                // STUDENT-LED INNOVATION CLUB
              </span>
            </div>
            <RevealText
              as="h1"
              staggerMs={40}
              className="font-fraunces font-bold text-4xl sm:text-5xl lg:text-6xl text-[#0A0A09] leading-[1.08] tracking-tight"
            >
              Where ideas find people, and people build what matters.
            </RevealText>
            <p className="font-bitter text-lg sm:text-xl text-[#66615A] leading-relaxed max-w-3xl">
              NEXUS is a student-led college innovation club. We bring students together from engineering, design, media, and research to move raw ideas into reality.
            </p>
          </div>
        </Container>
      </RevealSection>

      {/* 1. WHY NEXUS EXISTS */}
      <RevealSection className="py-24 md:py-32 border-b border-[rgba(10,10,9,0.12)]">
        <Container>
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="col-span-4 md:col-span-8 lg:col-span-6 space-y-6">
              <SectionLabel number="01.1" label="FOUNDATION" />
              <h2 className="font-fraunces font-bold text-3xl sm:text-4xl text-[#0A0A09] uppercase tracking-tight">
                WHY NEXUS EXISTS
              </h2>
              <p className="font-bitter text-lg text-[#0A0A09] leading-relaxed">
                College courses teach fundamentals, but the classroom rarely creates space to follow an independent curiosity through to completion.
              </p>
              <p className="font-bitter text-[#66615A] leading-relaxed">
                Too often, engineering students never interact with designers; design students lack software collaborators; and students with interesting ideas give up simply because they cannot find peers to build with.
              </p>
              <p className="font-bitter text-[#66615A] leading-relaxed">
                NEXUS was created to remove that barrier. We provide the studio benches, the sprint framework, and the community where students from different majors can test ideas, make mistakes together, and ship projects they are proud of.
              </p>
            </div>

            <div className="col-span-4 md:col-span-8 lg:col-span-6">
              <ImageReveal
                alt="Students collaborating during open studio build session"
                tag="STUDIO LAB"
                aspectRatio="16/9"
                caption="Open studio tables — cross-major collaboration in progress."
              />
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* 2. WHAT WE BELIEVE */}
      <RevealSection className="py-24 md:py-32 bg-[#EBE5DB] border-b border-[rgba(10,10,9,0.12)]">
        <Container>
          <div className="max-w-3xl space-y-6 mb-16">
            <SectionLabel number="01.2" label="PRINCIPLES" />
            <h2 className="font-fraunces font-bold text-3xl sm:text-4xl text-[#0A0A09] uppercase tracking-tight">
              WHAT WE BELIEVE
            </h2>
            <p className="font-bitter text-lg text-[#66615A] leading-relaxed">
              We believe in honest craft, deep curiosity, and building things that outlive a course syllabus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#FAF6F0] border border-[rgba(10,10,9,0.14)] space-y-4 shadow-xs transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#EF5A2A]/60 hover:bg-white">
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(10,10,9,0.1)]">
                <span className="font-dosis text-xs font-bold text-[#EF5A2A] tracking-[0.2em]">01</span>
                <NexusIcon size="xs" />
              </div>
              <h3 className="font-bitter text-lg font-bold uppercase tracking-tight text-[#0A0A09]">
                CRAFT OVER RESUME PADDING
              </h3>
              <p className="font-bitter text-[#66615A] text-sm leading-relaxed">
                We don’t build generic portfolio clones to impress recruiters. We build things because the underlying question is interesting and deserves careful execution.
              </p>
            </div>

            <div className="p-8 bg-[#FAF6F0] border border-[rgba(10,10,9,0.14)] space-y-4 shadow-xs transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#EF5A2A]/60 hover:bg-white">
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(10,10,9,0.1)]">
                <span className="font-dosis text-xs font-bold text-[#EF5A2A] tracking-[0.2em]">02</span>
                <NexusIcon size="xs" />
              </div>
              <h3 className="font-bitter text-lg font-bold uppercase tracking-tight text-[#0A0A09]">
                DISCIPLINES BELONG TOGETHER
              </h3>
              <p className="font-bitter text-[#66615A] text-sm leading-relaxed">
                Code without good interaction design feels sterile. Hardware without aesthetic attention feels unfinished. When technical and creative students build as equals, the result is better.
              </p>
            </div>

            <div className="p-8 bg-[#FAF6F0] border border-[rgba(10,10,9,0.14)] space-y-4 shadow-xs transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#EF5A2A]/60 hover:bg-white">
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(10,10,9,0.1)]">
                <span className="font-dosis text-xs font-bold text-[#EF5A2A] tracking-[0.2em]">03</span>
                <NexusIcon size="xs" />
              </div>
              <h3 className="font-bitter text-lg font-bold uppercase tracking-tight text-[#0A0A09]">
                SHIPPED IS LESSON LEARNED
              </h3>
              <p className="font-bitter text-[#66615A] text-sm leading-relaxed">
                An unfinished idea teaches nothing. Putting a real project in front of fellow students, testing it under real conditions, and taking feedback is where real growth happens.
              </p>
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* 3. HOW WE COLLABORATE */}
      <RevealSection className="py-24 md:py-32 border-b border-[rgba(10,10,9,0.12)]">
        <Container>
          <div className="max-w-3xl space-y-6 mb-16">
            <SectionLabel number="01.3" label="PHILOSOPHY & PROGRESSION" />
            <h2 className="font-fraunces font-bold text-3xl sm:text-4xl text-[#0A0A09] uppercase tracking-tight">
              HOW WE COLLABORATE
            </h2>
            <p className="font-bitter text-lg text-[#0A0A09] leading-relaxed">
              NEXUS provides the environment where ideas can move from concept to tangible reality through a clear, human progression.
            </p>
          </div>

          {/* IDEA → PEOPLE → TEAM → BUILD → PROJECT → REALITY Chain */}
          <div className="relative p-8 sm:p-12 bg-[#FAF6F0] border border-[rgba(10,10,9,0.14)] shadow-xs overflow-hidden">
            <div className="text-center pb-8 border-b border-[rgba(10,10,9,0.1)]">
              <span className="font-dosis text-xs uppercase tracking-[0.24em] text-[#EF5A2A] font-bold">
                THE NEXUS PROGRESSION
              </span>
            </div>

            <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6">
              {PHILOSOPHY_CHAIN.map((stage, idx) => (
                <React.Fragment key={stage}>
                  <div className="flex flex-col items-center">
                    <span className="font-dosis text-xs font-bold text-[#EF5A2A] mb-1">0{idx + 1}</span>
                    <span className="px-4 py-2.5 bg-[#0A0A09] text-[#F3EEE5] font-dosis text-sm sm:text-base font-bold tracking-[0.2em] uppercase border border-[rgba(239,90,42,0.3)] shadow-xs">
                      {stage}
                    </span>
                  </div>
                  {idx < PHILOSOPHY_CHAIN.length - 1 && (
                    <span className="text-[#EF5A2A] font-dosis text-xl font-bold px-1 select-none">
                      →
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Subtle thread motif beneath progression */}
            <div className="max-w-lg mx-auto mt-8 opacity-60">
              <OrangeThread variant="wave" className="w-full h-8" />
            </div>

            <p className="font-bitter text-center text-sm text-[#66615A] max-w-2xl mx-auto mt-6 leading-relaxed">
              Students pitch thoughts during open floor nights, assemble balanced squads, agree on milestones, build working prototypes, and showcase finished projects to the campus community.
            </p>
          </div>
        </Container>
      </RevealSection>

      {/* 4. WHAT WE BUILD */}
      <RevealSection className="py-24 md:py-32 bg-[#EBE5DB] border-b border-[rgba(10,10,9,0.12)]">
        <Container>
          <div className="max-w-3xl space-y-6 mb-16">
            <SectionLabel number="01.4" label="AREAS OF INQUIRY" />
            <h2 className="font-fraunces font-bold text-3xl sm:text-4xl text-[#0A0A09] uppercase tracking-tight">
              WHAT WE BUILD
            </h2>
            <p className="font-bitter text-lg text-[#66615A] leading-relaxed">
              Our projects sit at the intersection of seven core areas, welcoming students with varied curiosities and skill sets.
            </p>
          </div>

          <div className="divide-y divide-[rgba(10,10,9,0.14)] border-t border-b border-[rgba(10,10,9,0.14)]">
            {DISCIPLINES.map((item, idx) => (
              <div
                key={item.name}
                className="py-6 sm:py-8 px-4 sm:px-6 -mx-4 sm:-mx-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline group transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#E2DBCF]/60"
              >
                <div className="md:col-span-1">
                  <span className="font-dosis text-xs font-bold text-[#EF5A2A] tracking-[0.2em]">0{idx + 1}</span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-bitter text-base sm:text-lg font-bold text-[#0A0A09] tracking-wide uppercase flex items-center gap-2 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                    <span>{item.name}</span>
                    <NexusIcon size="xs" className="opacity-0 group-hover:opacity-100 transition-opacity duration-250" />
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="font-bitter text-[#66615A] text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </RevealSection>

      {/* 5. WHERE WE ARE GOING */}
      <RevealSection className="py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="col-span-4 md:col-span-8 lg:col-span-7 space-y-6">
              <SectionLabel number="01.5" label="THE HORIZON" />
              <h2 className="font-fraunces font-bold text-3xl sm:text-4xl text-[#0A0A09] uppercase tracking-tight">
                WHERE WE ARE GOING
              </h2>
              <p className="font-bitter text-lg text-[#0A0A09] leading-relaxed">
                NEXUS is expanding beyond single-semester projects into a continuous studio archive.
              </p>
              <p className="font-bitter text-[#66615A] leading-relaxed">
                We are building permanent hardware fabrication stations, expanding open-source student toolkits, and creating documented blueprints so future cohorts can stand on the work of previous students rather than starting from scratch each autumn.
              </p>
              <p className="font-bitter text-[#66615A] leading-relaxed">
                Whether you want to build a compiler visualizer, a custom midi controller, or an open campus transit monitor, there is a workbench and a team waiting for you.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <PrimaryButton
                  label="JOIN THE CLUB →"
                  onClick={() => onRouteChange('/contact')}
                />
                <SecondaryButton
                  label="EXPLORE PROJECTS →"
                  onClick={() => onRouteChange('/projects')}
                />
              </div>
            </div>

            <div className="col-span-4 md:col-span-8 lg:col-span-5 p-8 bg-[#FAF6F0] border border-[rgba(10,10,9,0.14)] space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-[rgba(10,10,9,0.1)] pb-3">
                <span className="font-dosis text-xs font-bold text-[#0A0A09] uppercase tracking-[0.2em] flex items-center gap-2">
                  <NexusIcon size="xs" />
                  <span>CLUB AT A GLANCE</span>
                </span>
                <span className="font-dosis text-xs text-[#EF5A2A] font-bold tracking-[0.2em]">2026–2027</span>
              </div>
              <ul className="space-y-3 font-dosis text-xs text-[#66615A] pt-2">
                <li className="flex justify-between border-b border-[rgba(10,10,9,0.06)] pb-2 font-semibold">
                  <span className="tracking-[0.16em]">MEMBERSHIP</span>
                  <span className="text-[#0A0A09]">Open to all majors & years</span>
                </li>
                <li className="flex justify-between border-b border-[rgba(10,10,9,0.06)] pb-2 font-semibold">
                  <span className="tracking-[0.16em]">MEETING LAB</span>
                  <span className="text-[#0A0A09]">Thursday & Saturday</span>
                </li>
                <li className="flex justify-between border-b border-[rgba(10,10,9,0.06)] pb-2 font-semibold">
                  <span className="tracking-[0.16em]">SPRINT CADENCE</span>
                  <span className="text-[#0A0A09]">6-Week Project Cohorts</span>
                </li>
                <li className="flex justify-between font-semibold">
                  <span className="tracking-[0.16em]">STRUCTURE</span>
                  <span className="text-[#0A0A09]">100% Student Led</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </RevealSection>
    </main>
  );
};

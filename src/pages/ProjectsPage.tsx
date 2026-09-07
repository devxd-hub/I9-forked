/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Container } from '../components/primitives/Container.tsx';
import { SectionLabel } from '../components/primitives/SectionLabel.tsx';
import { PrimaryButton, SecondaryButton } from '../components/primitives/Button.tsx';
import { ImageReveal } from '../components/primitives/ImageReveal.tsx';
import { ProjectCard } from '../components/primitives/ProjectCard.tsx';
import { NexusIcon } from '../components/brand/NexusLogo.tsx';
import { RevealSection, RevealText } from '../components/motion/MotionPrimitives.tsx';
import { AppRoute, Project } from '../types.ts';
import { PROJECTS } from '../data/nexusData.ts';
import { X, ArrowRight } from 'lucide-react';

interface ProjectsPageProps {
  onRouteChange: (route: AppRoute) => void;
}

/**
 * PROJECTS PAGE (PROJECT ARCHIVE)
 * Editorial project entries containing:
 * - project number
 * - title
 * - year
 * - description
 * - disciplines
 * - visual
 * - view project
 *
 * Avoids dashboard-style UI. Authentic student-led work.
 */
export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onRouteChange }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterDiscipline, setFilterDiscipline] = useState<string>('ALL');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const disciplinesList = ['ALL', 'TECH', 'RESEARCH', 'COMMUNITY', 'HARDWARE', 'DESIGN', 'IOT'];

  const filteredProjects = PROJECTS.filter((p) => {
    if (filterDiscipline === 'ALL') return true;
    return p.disciplines.toUpperCase().includes(filterDiscipline);
  });

  return (
    <main id="nexus-projects-page" className="w-full bg-[#F3EEE5]">
      {/* Header */}
      <RevealSection className="pt-20 md:pt-28 pb-16 md:pb-24 border-b border-[rgba(10,10,9,0.12)]">
        <Container>
          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <SectionLabel number="02" label="PROJECT ARCHIVE" />
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0A0A09] text-white text-xs font-dosis tracking-[0.2em] uppercase border border-[rgba(239,90,42,0.3)]">
                <NexusIcon size="xs" />
                <span>NEXUS REGISTRY</span>
              </span>
            </div>
            <RevealText
              as="h1"
              staggerMs={40}
              className="font-fraunces font-bold text-4xl sm:text-5xl lg:text-6xl text-[#0A0A09] leading-[1.08] tracking-tight"
            >
              Things built with purpose, rigor, and craft.
            </RevealText>
            <p className="font-bitter text-lg text-[#66615A] leading-relaxed max-w-3xl">
              An archive of student-led software, interactive hardware, open toolkits, and research experiments developed during NEXUS studio cohorts.
            </p>
          </div>
        </Container>
      </RevealSection>

      {/* Filter / Filter Bar */}
      <section className="py-6 border-b border-[rgba(10,10,9,0.12)] bg-[#EBE5DB]">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-dosis text-xs font-bold text-[#66615A] tracking-[0.2em] mr-2">DISCIPLINE:</span>
              {disciplinesList.map((disc) => (
                <button
                  key={disc}
                  type="button"
                  onClick={() => setFilterDiscipline(disc)}
                  className={`px-3 py-1.5 font-dosis text-xs uppercase tracking-[0.2em] transition-all duration-200 cursor-pointer ${
                    filterDiscipline === disc
                      ? 'bg-[#0A0A09] text-[#F3EEE5] font-bold shadow-xs'
                      : 'bg-[#F3EEE5] text-[#0A0A09] font-semibold border border-[rgba(10,10,9,0.15)] hover:border-[#0A0A09]'
                  }`}
                >
                  {disc}
                </button>
              ))}
            </div>

            <span className="font-dosis text-xs tracking-[0.18em] text-[#66615A] font-semibold">
              SHOWING {filteredProjects.length} OF {PROJECTS.length} ARCHIVED
            </span>
          </div>
        </Container>
      </section>

      {/* Editorial Project Entries */}
      <section className="py-20 md:py-28 border-b border-[rgba(10,10,9,0.12)]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(p) => setSelectedProject(p)}
                isDimmed={Boolean(hoveredId && hoveredId !== project.id)}
                onHoverStart={() => setHoveredId(project.id)}
                onHoverEnd={() => setHoveredId(null)}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A09]/80 backdrop-blur-xs"
        >
          <div className="bg-[#FAF6F0] border border-[#0A0A09] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative shadow-2xl space-y-6">
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 text-[#0A0A09] hover:text-[#EF5A2A] border border-[rgba(10,10,9,0.2)] focus:outline-none cursor-pointer"
              aria-label="Close Project Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-dosis text-xs font-bold text-[#EF5A2A] tracking-[0.2em]">
                  {selectedProject.projectNumber}
                </span>
                <span className="font-dosis text-xs text-[#66615A] tracking-[0.2em] font-semibold">
                  {selectedProject.year}
                </span>
                <span className="font-dosis text-xs px-2.5 py-0.5 bg-[rgba(10,10,9,0.06)] font-bold text-[#0A0A09] tracking-[0.16em]">
                  {selectedProject.status}
                </span>
              </div>
              <h3 className="font-fraunces text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#0A0A09]">
                {selectedProject.title}
              </h3>
              <p className="font-dosis text-xs uppercase font-bold text-[#EF5A2A] tracking-[0.2em]">
                {selectedProject.disciplines}
              </p>
            </div>

            <ImageReveal
              alt={selectedProject.title}
              aspectRatio="16/9"
              tag={selectedProject.disciplines}
              caption={`${selectedProject.title} project build documentation`}
            />

            <div className="space-y-3">
              <h4 className="font-dosis text-xs uppercase tracking-[0.2em] text-[#66615A] font-bold">
                ABOUT THIS BUILD
              </h4>
              <p className="font-bitter text-base text-[#0A0A09] leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {selectedProject.deliverables && (
              <div className="space-y-2 pt-2 border-t border-[rgba(10,10,9,0.1)]">
                <h4 className="font-dosis text-xs uppercase tracking-[0.2em] text-[#66615A] font-bold">
                  DELIVERABLES
                </h4>
                <ul className="space-y-1.5 text-xs font-dosis font-semibold tracking-[0.15em] text-[#0A0A09]">
                  {selectedProject.deliverables.map((deliv) => (
                    <li key={deliv} className="flex items-center gap-2">
                      <span className="text-[#EF5A2A]">▸</span>
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-2 border-t border-[rgba(10,10,9,0.1)] flex flex-wrap items-center justify-between gap-4">
              <div className="font-dosis text-xs tracking-[0.15em] text-[#66615A] font-semibold">
                <span className="text-[#0A0A09] font-bold">BUILD SQUAD: </span>
                {selectedProject.leadStudents.join(', ')}
              </div>
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-dosis text-xs font-bold tracking-[0.2em] text-[#EF5A2A] hover:underline inline-flex items-center gap-1"
                >
                  <span>SOURCE CODE ↗</span>
                </a>
              )}
            </div>

            <div className="pt-4 border-t border-[rgba(10,10,9,0.1)] text-right">
              <SecondaryButton
                label="CLOSE WINDOW"
                onClick={() => setSelectedProject(null)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Propose a Project CTA */}
      <RevealSection className="py-24 md:py-36 bg-[#151311] text-[#F3EEE5]">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <SectionLabel
              number="02.1"
              label="PROJECT PROPOSALS"
              className="justify-center text-[#F3EEE5]/70"
            />
            <h2 className="font-fraunces font-bold text-3xl sm:text-4xl text-[#F3EEE5] uppercase tracking-tight">
              Bring an idea to the next studio cohort.
            </h2>
            <p className="font-bitter text-[#F3EEE5]/75 text-base sm:text-lg leading-relaxed">
              We provide team matching, technical mentorship, equipment benches, and sprint accountability to help you build something real.
            </p>
            <div className="pt-4">
              <PrimaryButton
                label="PROPOSE AN IDEA →"
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

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, TeamMember, GalleryItem } from '../types.ts';

export const PROJECTS: Project[] = [
  {
    id: 'nxs-001',
    projectNumber: 'NXS / 001',
    title: 'ALGOLAB',
    year: '2026',
    disciplines: 'TECH × EDUCATION',
    category: 'Technology',
    summary:
      'A learning environment that helps students practice algorithms through structured repetition.',
    description:
      'Algolab was built by first- and second-year students frustrated with opaque online coding problem platforms. It breaks complex graph and tree algorithms into visual mental models, allowing learners to step forward and backward through memory state at their own pace.',
    status: 'Active',
    leadStudents: ['Arjun Sharma (CS)', 'Elena Vance (HCI)'],
    tags: ['TypeScript', 'Canvas API', 'Algorithm Visualization', 'Open Source'],
    deliverables: ['Interactive Web Sandbox', 'Curated Algorithm Visualizer', 'Self-paced Exercises'],
    githubUrl: 'https://github.com/nexus-club/algolab',
  },
  {
    id: 'nxs-002',
    projectNumber: 'NXS / 002',
    title: 'ARCANUM',
    year: '2026',
    disciplines: 'RESEARCH × SOFTWARE',
    category: 'Research & Software',
    summary:
      'A collaborative academic communication platform built around structured discussion and shared knowledge.',
    description:
      'Arcanum replaces fragmented Discord servers and disorganized chat groups with threaded, citation-friendly discourse rooms. Students attach lab notes, papers, and code snippets directly to debate points, keeping knowledge permanently indexed.',
    status: 'Active',
    leadStudents: ['Rohan Mehta (ECE)', 'Maya Lin (Media Arts)'],
    tags: ['WebSockets', 'Markdown Engine', 'Knowledge Graph', 'Postgres'],
    deliverables: ['Real-time Discourse Engine', 'Zotero Citation Sync', 'Campus Authentication'],
    githubUrl: 'https://github.com/nexus-club/arcanum',
  },
  {
    id: 'nxs-003',
    projectNumber: 'NXS / 003',
    title: 'CLUBSPHERE',
    year: '2025',
    disciplines: 'COMMUNITY × DESIGN × CODE',
    category: 'Community Tools',
    summary:
      'A digital space connecting student communities, events and campus initiatives.',
    description:
      'Born out of a weekend hack sprint, Clubsphere gives student clubs a shared bulletin, calendar synchronization, and cross-club collaboration channels without needing proprietary corporate software.',
    status: 'Completed',
    leadStudents: ['Priya Nair (InfoSci)', 'Liam O’Connor (Design)'],
    tags: ['Next.js', 'Tailwind', 'iCal Integration', 'Campus Directory'],
    deliverables: ['Public Campus Calendar', 'Club Discovery Portal', 'Event RSVP System'],
    demoUrl: 'https://clubsphere.nexus.campus',
  },
  {
    id: 'nxs-004',
    projectNumber: 'NXS / 004',
    title: 'VOXEN',
    year: '2026',
    disciplines: 'HARDWARE × INTERACTION × DESIGN',
    category: 'Physical Computing',
    summary:
      'A modular tactile MIDI controller carved from reclaimed wood with capacitive touch sensors.',
    description:
      'Built in collaboration with the university woodshop and electronic music guild, Voxen combines precision digital potentiometers, capacitive touch strips, and USB-MIDI class compliance for live audio performance.',
    status: 'Active',
    leadStudents: ['Daniel Kim (Mechanical Eng)', 'Maya Lin (Media Arts)'],
    tags: ['Arduino / C++', 'CNC Milling', 'USB MIDI', 'Industrial Design'],
    deliverables: ['Physical Hardware Prototype', 'Custom Firmware', 'Open CAD Schematics'],
    githubUrl: 'https://github.com/nexus-club/voxen-midi',
  },
  {
    id: 'nxs-005',
    projectNumber: 'NXS / 005',
    title: 'HABITAT',
    year: '2025',
    disciplines: 'IOT × EMBEDDED × ECOLOGY',
    category: 'Physical Computing',
    summary:
      'Microclimate monitoring mesh network for the campus greenhouse research facilities.',
    description:
      'Low-power solar-charged micro-nodes deployed across botany research tents measuring soil moisture, humidity gradients, and photosynthetic active radiation.',
    status: 'Completed',
    leadStudents: ['Sofia Rossi (Env Sci)', 'Arjun Sharma (CS)'],
    tags: ['ESP32', 'LoRa Mesh', 'Grafana Dashboard', 'Solar Harvesting'],
    deliverables: ['12 Deployed Sensor Nodes', 'Telemetry Dashboard', 'Automated Alerting'],
  },
  {
    id: 'nxs-006',
    projectNumber: 'NXS / 006',
    title: 'TYPESTREAM',
    year: '2026',
    disciplines: 'DESIGN × WEB TOOLS',
    category: 'Creative Production',
    summary:
      'An open-source typographic variable font playground built for student publication designers.',
    description:
      'A zero-friction browser tool that lets student typesetters, zine editors, and web designers inspect variable font axes, generate CSS font-variation-settings, and preview glyph sets under real editorial conditions.',
    status: 'Active',
    leadStudents: ['Sofia Rossi (Design)', 'Rohan Mehta (ECE)'],
    tags: ['Opentype.js', 'Variable Fonts', 'SVG Export', 'CSS Tooling'],
    deliverables: ['Browser Variable Font Tester', 'CSS Export Utility', 'Glyph Specimen Viewer'],
    githubUrl: 'https://github.com/nexus-club/typestream',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  // CORE TEAM
  {
    id: 'team-01',
    name: 'ARJUN',
    role: 'TECH LEAD',
    group: 'CORE TEAM',
    discipline: 'Computer Science',
    yearOfStudy: 'Senior // 2026',
    bio: 'Oversees codebase standards, software architecture, and runs weekly systems pair-programming labs.',
  },
  {
    id: 'team-02',
    name: 'MAYA',
    role: 'CREATIVE LEAD',
    group: 'CORE TEAM',
    discipline: 'Design & Media Arts',
    yearOfStudy: 'Junior // 2027',
    bio: 'Guides visual identity, editorial publications, interaction design, and interdisciplinary workshop critiques.',
  },
  {
    id: 'team-03',
    name: 'ROHAN',
    role: 'PROJECT LEAD',
    group: 'CORE TEAM',
    discipline: 'Electrical & Computer Engineering',
    yearOfStudy: 'Senior // 2026',
    bio: 'Coordinates project scoping, hardware component sourcing, sprint roadmaps, and final project exhibitions.',
  },
  {
    id: 'team-04',
    name: 'PRIYA',
    role: 'STUDIO & OPERATIONS LEAD',
    group: 'CORE TEAM',
    discipline: 'Information Sciences',
    yearOfStudy: 'Junior // 2027',
    bio: 'Manages studio bench schedules, team matching sessions, club admissions, and community archive records.',
  },

  // TECH
  {
    id: 'team-05',
    name: 'LIAM',
    role: 'SYSTEMS ARCHITECT',
    group: 'TECH',
    discipline: 'Software Engineering',
    yearOfStudy: 'Sophomore // 2028',
    bio: 'Focused on distributed backends, developer ergonomics, and local-first data synchronization.',
  },
  {
    id: 'team-06',
    name: 'TARIQ',
    role: 'EMBEDDED & FIRMWARE',
    group: 'TECH',
    discipline: 'Electrical Engineering',
    yearOfStudy: 'Senior // 2026',
    bio: 'Bridges physical electronics to microcontrollers, PCB design, and communication protocols.',
  },

  // DESIGN
  {
    id: 'team-07',
    name: 'SOFIA',
    role: 'VISUAL & TYPOGRAPHIC CRAFT',
    group: 'DESIGN',
    discipline: 'Communication Design',
    yearOfStudy: 'Junior // 2027',
    bio: 'Crafts design systems, print posters for campus demo crits, and variable font experiment tools.',
  },
  {
    id: 'team-08',
    name: 'KAI',
    role: 'INTERACTION DESIGNER',
    group: 'DESIGN',
    discipline: 'Human-Centered Design',
    yearOfStudy: 'Sophomore // 2028',
    bio: 'Translates student technical ideas into clear interfaces with thoughtful ergonomic details.',
  },

  // MEDIA
  {
    id: 'team-09',
    name: 'DANIEL',
    role: 'CREATIVE PRODUCTION & DOCUMENTATION',
    group: 'MEDIA',
    discipline: 'Film & Photographic Studies',
    yearOfStudy: 'Senior // 2026',
    bio: 'Documents sprint builds, photographs prototypes, and edits process records for public release.',
  },
  {
    id: 'team-10',
    name: 'ELENA',
    role: 'AUDIO & SOUND DESIGN',
    group: 'MEDIA',
    discipline: 'Music Technology',
    yearOfStudy: 'Junior // 2027',
    bio: 'Designs soundscapes, sonic branding, and audio synthesis experiments for hardware projects.',
  },

  // PROJECTS
  {
    id: 'team-11',
    name: 'ANANYA',
    role: 'HARDWARE PROTOTYPER',
    group: 'PROJECTS',
    discipline: 'Mechanical Engineering',
    yearOfStudy: 'Junior // 2027',
    bio: 'Focuses on 3D rapid fabrication, CNC milling, and physical enclosure design for student gadgets.',
  },
  {
    id: 'team-12',
    name: 'MARCUS',
    role: 'RESEARCH SPRINT COORDINATOR',
    group: 'PROJECTS',
    discipline: 'Cognitive Science',
    yearOfStudy: 'Senior // 2026',
    bio: 'Facilitates interdisciplinary inquiry groups exploring educational tech and open knowledge tools.',
  },

  // ADVISORS / MENTORS
  {
    id: 'team-13',
    name: 'PROF. DAVID STERLING',
    role: 'FACULTY ADVISOR',
    group: 'ADVISORS / MENTORS',
    discipline: 'Dept. of Computer Science',
    yearOfStudy: 'Faculty Sponsor',
    bio: 'Advises on systems research ethics, university lab facilities, and interdisciplinary student grants.',
  },
  {
    id: 'team-14',
    name: 'DR. ARIS THORNE',
    role: 'FACULTY MENTOR',
    group: 'ADVISORS / MENTORS',
    discipline: 'School of Design & Media',
    yearOfStudy: 'Faculty Sponsor',
    bio: 'Mentors students on interaction design ergonomics, typographic history, and exhibition curation.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'Late Night PCB Soldering Session',
    category: 'Prototyping',
    eventDate: 'OCT 2026',
    caption: 'Tariq and Ananya debugging power rail traces on the Voxen prototype boards.',
    description: 'Hardware lab bench during the 48-hour hardware prototyping weekend.',
    aspectRatio: '16/9',
  },
  {
    id: 'gal-02',
    title: 'Open Studio Floor & Team Formation',
    category: 'People',
    eventDate: 'SEP 2026',
    caption: 'Students clustering around project pitch boards on welcome week.',
    description: 'First semester gathering where over 80 students brought raw project questions to the floor.',
    aspectRatio: '4/3',
  },
  {
    id: 'gal-03',
    title: 'Real-time Web Audio Synthesizer Test',
    category: 'Projects',
    eventDate: 'NOV 2026',
    caption: 'Testing the Algolab audio feedback loops using studio monitors.',
    description: 'Interactive demonstration of sound-based algorithmic debugging tools.',
    aspectRatio: '1/1',
  },
  {
    id: 'gal-04',
    title: 'Mid-Semester Design Critique',
    category: 'Workshops',
    eventDate: 'OCT 2026',
    caption: 'Pin-up review of UI typography and physical housing iterations.',
    description: 'Peer feedback session led by Maya and Sofia examining typographic scales.',
    aspectRatio: '3/2',
  },
  {
    id: 'gal-05',
    title: 'Public Campus Demo Night',
    category: 'Presentations',
    eventDate: 'DEC 2026',
    caption: 'Rohan demonstrating the Arcanum citation graph to visiting faculty.',
    description: 'End-of-term exhibition in the engineering courtyard attended by over 200 students.',
    aspectRatio: '16/9',
  },
  {
    id: 'gal-06',
    title: 'Collaborative Code Review Sprints',
    category: 'Collaboration',
    eventDate: 'NOV 2026',
    caption: 'Pair-programming session refactoring Algolab graph rendering routines.',
    description: 'CS and design students working side-by-side to improve web rendering performance.',
    aspectRatio: '4/3',
  },
  {
    id: 'gal-07',
    title: 'Hands-On Variable Font Workshop',
    category: 'Workshops',
    eventDate: 'JAN 2027',
    caption: 'Sofia guiding members through glyph bezier curves and OpenType axes.',
    description: 'Weekend crash course introducing variable font mechanics for digital editors.',
    aspectRatio: '1/1',
  },
  {
    id: 'gal-08',
    title: 'Enclosure Assembly in the Woodshop',
    category: 'Prototyping',
    eventDate: 'FEB 2027',
    caption: 'Milling walnut faceplates for the Voxen tactile controller.',
    description: 'Combining traditional wood joinery with laser-cut acrylic capacitive pads.',
    aspectRatio: '3/2',
  },
];

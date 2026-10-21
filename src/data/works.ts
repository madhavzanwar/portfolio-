export interface WorkListItem {
  name: string
  meta?: string
  tags?: string[]
  link?: string
  slug: string
}

export interface WorkGroup {
  heading: string
  items: string[]
}

export interface WorkSection {
  id: string
  no: string
  title: string
  tagline: string
  items?: WorkListItem[]
  groups?: WorkGroup[]
  awards?: string[]
  footer?: string
}

export interface WorksLang {
  title: string
  closeLabel: string
  openLabel: string
  hint: string
  awardsLabel: string
  visitLabel: string
  detailPlaceholder: string
  phImageLabel: string
  phButtonLabel: string
  countLabel: (n: number) => string
  sections: WorkSection[]
}

// 100% Madhav's actual project screenshots from public/images/projects/
export const SECTION_COVERS: Record<string, string> = {
  'computer-vision': `${import.meta.env.BASE_URL}images/projects/quicksketch.jpg`,
  'llm-intelligence': `${import.meta.env.BASE_URL}images/projects/memoryverse.jpg`,
  'edtech-career': `${import.meta.env.BASE_URL}images/projects/placement.jpg`,
  'systems-engineering': `${import.meta.env.BASE_URL}images/projects/pulseforge.jpg`,
}

export const WORKS: WorksLang = {
  title: 'Selected Works',
  closeLabel: 'Close',
  openLabel: 'Read Case Study',
  hint: 'Click any project to explore architecture & live links',
  awardsLabel: 'Recognition',
  visitLabel: 'Live Experience / GitHub',
  detailPlaceholder: 'Case Study Preview',
  phImageLabel: 'Architecture & System Overview',
  phButtonLabel: 'Launch Project',
  countLabel: (n) => `${n} Projects`,
  sections: [
    {
      id: 'computer-vision',
      no: '01',
      title: 'Computer Vision & Deep Learning',
      tagline: 'Custom CNN Doodle Recognition & Industrial Surveillance',
      items: [
        {
          name: 'QuickSketch — Neural Doodle & Sketch Recognition',
          meta: 'Custom CNN · 92% Acc',
          tags: ['Python', 'Custom CNN', 'Interactive Canvas', 'Flask'],
          slug: 'quicksketch',
          link: 'https://madhavzanwar.github.io/quicksketch/',
        },
        {
          name: 'TraceGuard — Industrial Safety & Surveillance',
          meta: 'Hack Carnival Finalist',
          tags: ['YOLOv8', 'Computer Vision', 'OpenCV', 'FastAPI'],
          slug: 'traceguard',
          link: 'https://github.com/madhavzanwar/traceguard',
        },
      ],
      awards: ['Hack Carnival 2026 Finalist Round'],
      footer: 'Real-time neural inference · Sub-50ms canvas doodle classification · YOLOv8 surveillance',
    },
    {
      id: 'llm-intelligence',
      no: '02',
      title: 'LLM Systems & Document Intelligence',
      tagline: 'Google Gemini API, Vector Embeddings & Multilingual Voice',
      items: [
        {
          name: 'MemoryVerse AI — Document Intelligence Engine',
          meta: "Wooble '26 Challenge",
          tags: ['Gemini API', 'ChromaDB', 'Vector Embeddings', 'Python'],
          slug: 'memoryverse',
          link: 'https://memoryverse-ai-wheat.vercel.app',
        },
        {
          name: 'Kisan Sathi — Agricultural Advisory Platform',
          meta: 'Multilingual Voice AI',
          tags: ['Voice AI', 'Crop Diagnostics', 'AgriTech ML', 'Vercel'],
          slug: 'kisansathi',
          link: 'https://kisan-sathi-app-kappa.vercel.app',
        },
      ],
      awards: ['MemoryVerse AI Challenge Recognized Builder'],
      footer: 'Context-grounded semantic retrieval · Multi-turn reasoning · Regional voice guidance',
    },
    {
      id: 'edtech-career',
      no: '03',
      title: 'EdTech & Career Intelligence',
      tagline: 'Automated Placement Preparation & Adaptive Mentorship',
      items: [
        {
          name: 'Placement AI — Mock Interview & Scoring Platform',
          meta: 'Full Placement Suite',
          tags: ['Resume Parsing', 'Mock Interview', 'Python', 'Flask'],
          slug: 'placement',
          link: 'https://placement-ai-g6ye.onrender.com',
        },
        {
          name: 'Synapse AI Tutor — Adaptive Cognitive Tutoring',
          meta: 'Learning Telemetry',
          tags: ['Cognitive AI', 'Adaptive Pacing', 'FastAPI', 'Python'],
          slug: 'synapse',
          link: 'https://github.com/madhavzanwar/synapse-ai-tutor',
        },
      ],
      awards: ['PCCOE Reading & Critical Reflection 2nd Place (₹12,000)'],
      footer: 'Automated rubric scoring · Interactive behavioral interviews · Mastery telemetry',
    },
    {
      id: 'systems-engineering',
      no: '04',
      title: 'Full-Stack & Systems Engineering',
      tagline: 'Engineering Telemetry Dashboards & Clinical Diagnostics',
      items: [
        {
          name: 'Pulse Forge — Real-Time Developer Telemetry',
          meta: 'Engineering Analytics',
          tags: ['React', 'TypeScript', 'Tailwind CSS', 'WebSockets'],
          slug: 'pulseforge',
          link: 'https://github.com/madhavzanwar/pulseforge',
        },
        {
          name: 'HealthDoctor — Clinical Diagnostic Screening',
          meta: 'Supervised ML',
          tags: ['Supervised ML', 'Healthcare AI', 'Python', 'Flask'],
          slug: 'healthdoctor',
          link: 'https://github.com/madhavzanwar/healthdoctor',
        },
      ],
      awards: ['PCCOE Spectrum Tech Winner (1st Place · ₹14,000 Cash Prize)'],
      footer: 'WebSocket event streams · High-throughput telemetry pipelines · Predictive ML models',
    },
  ],
}

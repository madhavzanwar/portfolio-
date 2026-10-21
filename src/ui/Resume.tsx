import { motion } from 'framer-motion'
import { FOCUS_POINTS } from '../data/focusPoints'
import { SOCIAL_LINKS, SocialIconSvg } from './SocialIcons'

interface ResumeEntry {
  period: string
  place: string
  subtitle?: string
  role?: string
  badge?: string
  points?: string[]
  links?: typeof SOCIAL_LINKS
}

const RESUME_ENTRIES: ResumeEntry[] = [
  {
    period: '2025 – Present',
    place: 'Pimpri Chinchwad College of Engineering (PCCOE)',
    subtitle: 'Pune, Maharashtra, India',
    role: 'B.Tech in Computer Science (AI & ML)',
    badge: 'Core Academic Excellence',
    points: [
      'Focusing on Artificial Intelligence, Machine Learning, Deep Learning, and Advanced Data Structures & Algorithms.',
      'Active researcher in applied AI systems, computer vision architectures, and environmental engineering.',
    ],
  },
  {
    period: '2025 – 2026',
    place: 'PCCOE Tech Ecosystem & Developer Leadership',
    subtitle: 'Campus Leadership & Community Building',
    role: 'Technical Organizer & Mentor',
    badge: 'GDGC · IEEE · AIMSA · MLSC',
    points: [
      'Organized and coordinated campus-wide HackerRank competitive coding contests for Google Developer Groups On Campus (GDGC PCCOE).',
      'Designed technical brand identity systems and hosted hands-on machine learning & LLM workshops for collegiate developer chapters.',
    ],
  },
  {
    period: '2026',
    place: 'Competitive Programming & Algorithmic Problem Solving',
    subtitle: 'LeetCode & Global Platforms',
    role: 'Competitive Problem Solver',
    badge: '350+ LeetCode DSA Solutions',
    points: [
      'Solved 350+ Data Structures & Algorithms challenges in C++ and Python on LeetCode (@madhav_builds) across DP, Trees, and Graphs.',
      'Active participant in international algorithmic grand challenges and collegiate hackathons.',
    ],
  },
  {
    period: '2026',
    place: 'Hackathons & Technical Honors',
    subtitle: 'Competitive Engineering Distinction',
    role: 'Hackathon Finalist & Winner',
    badge: 'Spectrum Tech 1st Place & Hack Carnival Finalist',
    points: [
      '1st Place Winner — PCCOE Spectrum Campus Fest Technical Challenge (₹14,000 Cash Prize).',
      'Finalist Round — Hack Carnival 2026 (36-Hour Hackathon) for building TraceGuard industrial computer vision surveillance.',
      '2nd Place — PCCOE Reading & Critical Reflection Analytical Competition (₹12,000 Cash Prize).',
    ],
  },
  {
    period: '2026 – Present',
    place: 'AI Systems & Full-Stack Engineering Studio',
    subtitle: 'Independent Software Craft',
    role: 'AI & Full-Stack Developer',
    badge: 'QuickSketch · MemoryVerse AI · Kisan Sathi',
    points: [
      'Creator of QuickSketch — real-time neural doodle recognition web platform powered by custom CNN models.',
      'Architect of MemoryVerse AI — document intelligence and digital identity engine integrated with the Google Gemini API.',
      'Engineer of Kisan Sathi — multimodal AI agricultural advisory app featuring multilingual voice guidance for farmers.',
    ],
    links: SOCIAL_LINKS,
  },
]

export default function Resume() {
  return (
    <section className="timeline-wrap">
      <div className="timeline-rail-header">
        <span className="timeline-eyebrow">Academic & Engineering Journey</span>
        <h2 className="timeline-main-title">Chronicle</h2>
      </div>

      <div className="timeline-list">
        {RESUME_ENTRIES.map((entry, idx) => {
          const pointKey = FOCUS_POINTS[idx] || `focus-${idx + 1}`
          return (
            <motion.article
              key={pointKey}
              data-point={pointKey}
              className="timeline-card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="timeline-card-header">
                <span className="timeline-period">{entry.period}</span>
                {entry.badge && <span className="timeline-pill">{entry.badge}</span>}
              </div>

              <h3 className="timeline-place">{entry.place}</h3>
              {entry.subtitle && <p className="timeline-sub">{entry.subtitle}</p>}
              {entry.role && <p className="timeline-role">{entry.role}</p>}

              {entry.points && (
                <ul className="timeline-points">
                  {entry.points.map((pt, pIdx) => (
                    <li key={pIdx} className="timeline-point">
                      <span className="timeline-bullet">―</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}

              {entry.links && (
                <div className="timeline-links">
                  {entry.links.map((lnk) => (
                    <a
                      key={lnk.id}
                      href={lnk.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="timeline-social-btn"
                    >
                      <span className="ts-icon">
                        <SocialIconSvg id={lnk.id} />
                      </span>
                      <span>{lnk.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}

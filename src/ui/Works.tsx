import { useState, type Ref } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { WORKS, SECTION_COVERS, type WorkListItem, type WorkSection } from '../data/works'
import { getWorkDoc } from '../data/workDocs'
import { useStore } from '../store'

function WorkLine({ item, onOpen }: { item: WorkListItem; onOpen: (item: WorkListItem) => void }) {
  const hasMeta = item.meta || (item.tags && item.tags.length)
  return (
    <li className="wk-line">
      <button className="wk-line-btn" onClick={() => onOpen(item)}>
        <span className="wk-line-name">{item.name}</span>
        {hasMeta && (
          <span className="wk-line-meta">
            {item.meta && <span className="wk-line-num">{item.meta}</span>}
            {item.tags &&
              item.tags.map((t, i) => (
                <span key={i} className="wk-line-tag">
                  {t}
                </span>
              ))}
          </span>
        )}
        <span className="wk-line-arrow">→</span>
      </button>
    </li>
  )
}

function SectionCard({
  section,
  onOpen,
}: {
  section: WorkSection
  onOpen: (item: WorkListItem) => void
}) {
  const [coverError, setCoverError] = useState(false)
  const cover = SECTION_COVERS[section.id]
  return (
    <div className="wk-card">
      <div className="wk-card-head">
        <span className="wk-card-no">{section.no}</span>
        <h3 className="wk-card-title">{section.title}</h3>
        <span className="wk-card-tagline">{section.tagline}</span>
      </div>
      <div className="wk-card-cover">
        {cover && !coverError ? (
          <img src={cover} alt="" onError={() => setCoverError(true)} />
        ) : (
          <div className="wk-card-cover-ph" aria-hidden="true">
            <span className="wk-card-cover-no">{section.no}</span>
          </div>
        )}
      </div>
      <div className="wk-card-body">
        {section.items && (
          <ul className="wk-list">
            {section.items.map((it, i) => (
              <WorkLine key={i} item={it} onOpen={onOpen} />
            ))}
          </ul>
        )}

        {(section.awards || section.footer) && (
          <div className="wk-foot">
            {section.awards && (
              <p className="wk-foot-line">
                <span className="wk-foot-label">{WORKS.awardsLabel}</span>
                <span className="wk-foot-val accent">{section.awards.join('  ·  ')}</span>
              </p>
            )}
            {section.footer && <p className="wk-foot-line">{section.footer}</p>}
          </div>
        )}
      </div>
    </div>
  )
}

function WorkDetailModal({ slug, onClose }: { slug: string; onClose: () => void }) {
  const doc = getWorkDoc(slug)

  return (
    <motion.div
      className="wk-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="wk-modal-dialog"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="wk-modal-close" onClick={onClose} aria-label="Close dialog">
          ✕
        </button>

        {doc?.banner && (
          <div className="wk-modal-banner">
            <img src={doc.banner} alt={doc.title || 'Project banner'} />
          </div>
        )}

        <div className="wk-modal-content">
          <header className="wk-modal-header">
            {doc?.year && <span className="wk-modal-year">{doc.year}</span>}
            <h2 className="wk-modal-title">{doc?.title || slug}</h2>
            {doc?.role && <p className="wk-modal-role">{doc.role}</p>}

            {doc?.tags && (
              <div className="wk-modal-tags">
                {doc.tags.map((t, i) => (
                  <span key={i} className="wk-modal-tag">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="wk-modal-markdown">
            {doc?.body ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {doc.body}
              </ReactMarkdown>
            ) : (
              <p className="wk-empty-desc">Full case study coming soon.</p>
            )}
          </div>

          {doc?.link && (
            <footer className="wk-modal-footer">
              <a
                href={doc.link}
                target="_blank"
                rel="noopener noreferrer"
                className="wk-modal-cta"
              >
                <span>{WORKS.visitLabel}</span>
                <span className="wk-cta-arrow">↗</span>
              </a>
            </footer>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Works({ innerRef }: { innerRef?: Ref<HTMLDivElement> }) {
  const activeSlug = useStore((s) => s.active)
  const setActive = useStore((s) => s.setActive)

  const handleOpen = (item: WorkListItem) => {
    setActive(item.slug)
  }

  return (
    <section className="works-wrap" ref={innerRef}>
      <header className="works-header">
        <span className="works-eyebrow">Portfolio Index</span>
        <h2 className="works-title">{WORKS.title}</h2>
        <p className="works-hint">{WORKS.hint}</p>
      </header>

      <div className="wk-gallery">
        {WORKS.sections.map((sec) => (
          <SectionCard key={sec.id} section={sec} onOpen={handleOpen} />
        ))}
      </div>

      <AnimatePresence>
        {activeSlug && <WorkDetailModal slug={activeSlug} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}

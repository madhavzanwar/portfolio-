import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import * as THREE from 'three'
import Scene from './scene/Scene'
import NoiseOverlay from './ui/NoiseOverlay'
import Resume from './ui/Resume'
import Works from './ui/Works'
import LoadingScreen from './ui/LoadingScreen'
import { SOCIAL_LINKS, SocialIconSvg } from './ui/SocialIcons'
import { useStore } from './store'

function Backdrop() {
  const setActive = useStore((s) => s.setActive)
  return (
    <mesh position={[0, 0, -40]} onClick={() => setActive(null)}>
      <planeGeometry args={[600, 300]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
  )
}

const COPY = {
  title: 'About Madhav',
  paragraphs: [
    "I'm Madhav — a Computer Science (AI & ML) engineer at PCCOE Pune. Passionate about machine learning, deep learning, data structures & algorithms, and contributing to open-source ecosystems. I build intelligent web applications, computer vision tools, and RAG pipelines that bridge deep technical engineering with tactile interactive design.",
  ],
}

function Hero({ cueOpacity }: { cueOpacity: MotionValue<number> }) {
  const aboutRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ['start 0.6', 'start start'],
  })

  const blur = useTransform(scrollYProgress, [0, 0.5], ['blur(0px)', 'blur(16px)'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -96])
  const bodyY = useTransform(scrollYProgress, [0, 1], [0, -52])
  const titleSpacing = useTransform(scrollYProgress, [0, 1], ['0.01em', '0.42em'])

  return (
    <section className="hero">
      <motion.div className="about" ref={aboutRef} style={{ filter: blur, opacity }}>
        <div className="about-intro">
          <motion.h1
            className="about-title font-mansalva"
            style={{ y: titleY, letterSpacing: titleSpacing }}
          >
            {COPY.title}
          </motion.h1>

          {COPY.paragraphs.map((p, i) => (
            <motion.p key={i} className="about-body font-cormorant" style={{ y: bodyY }}>
              {p}
            </motion.p>
          ))}

          {/* Social Links */}
          <motion.div className="about-socials" style={{ y: bodyY }}>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="about-social-pill"
                aria-label={link.label}
              >
                <span className="asp-icon">
                  <SocialIconSvg id={link.id} />
                </span>
                <span>{link.label}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="scroll-cue" style={{ opacity: cueOpacity }} aria-hidden="true">
        <span className="scroll-cue-label">SCROLL</span>
        <span className="scroll-cue-track">
          <span className="scroll-cue-dot" />
        </span>
      </motion.div>
    </section>
  )
}

export default function App() {
  const { scrollY } = useScroll()
  const worksRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: worksProgress } = useScroll({
    target: worksRef,
    offset: ['start end', 'start center'],
  })

  const fogBg = useTransform(
    worksProgress,
    [0, 1],
    ['rgba(10, 14, 22, 0)', 'rgba(10, 14, 22, 0.55)']
  )

  const scrimOpacity = useTransform(scrollY, [0, 520], [0, 0.4])
  const cueOpacity = useTransform(scrollY, [0, 160], [1, 0])
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const railOpacity = useTransform(scrollY, [vh * 0.5, vh * 1.1], [0, 1])
  const heroChromeOpacity = useTransform(scrollY, [0, 280], [1, 0])

  return (
    <>
      <LoadingScreen />

      {/* Fixed 3D Scene Layer */}
      <div className="scene-bg">
        <Canvas
          shadows={{ type: THREE.PCFShadowMap }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 5, 19], fov: 39, near: 0.1, far: 500 }}
          gl={{
            antialias: false,
            stencil: false,
            depth: true,
            toneMapping: THREE.ACESFilmicToneMapping,
          }}
        >
          <color attach="background" args={['#0a0e16']} />
          <Suspense fallback={null}>
            <Backdrop />
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Atmospheric Scrim & Fog */}
      <motion.div className="scrim" style={{ opacity: scrimOpacity }} aria-hidden="true" />
      <motion.div className="stage-fog" style={{ background: fogBg }} aria-hidden="true" />

      {/* Frosted Glass Timeline Rail */}
      <motion.div className="glass-rail" style={{ opacity: railOpacity }} aria-hidden="true" />

      {/* Fixed Hero HUD Frame */}
      <motion.div className="hero-chrome" style={{ opacity: heroChromeOpacity }} aria-hidden="true">
        <div className="hero-frame" />
        <span className="hero-mark tl">+</span>
        <span className="hero-mark tr">+</span>
        <span className="hero-mark bl">+</span>
        <span className="hero-mark br">+</span>

        <div className="hero-meta hm-tl">
          <span className="hm-name">Madhav Zanwar</span>
          <span className="hm-role">AI & ML Engineer</span>
        </div>

        <div className="hero-meta hm-tr">Portfolio — 2026</div>
        <div className="hero-meta hm-bl">Code · AI · Research</div>
        <div className="hero-meta hm-right">Based in Pune, India</div>
      </motion.div>

      {/* Ambient Film Grain Overlay */}
      <NoiseOverlay />

      {/* Scrollable Foreground Content */}
      <main className="content">
        <Hero cueOpacity={cueOpacity} />
        <Resume />
        <Works innerRef={worksRef} />
      </main>
    </>
  )
}

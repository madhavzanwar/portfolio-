import React, { useState } from 'react';
import { ArrowRight, Github, Linkedin, FileText, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section id="hero" className="h-screen p-3 sm:p-4 md:p-6 relative">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-black">
        
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-85' : 'opacity-40'
          }`}
        >
          <source src={PORTFOLIO_DATA.personal.heroVideo} type="video/mp4" />
        </video>

        {/* Noise overlay texture */}
        <div className="absolute inset-0 noise-overlay opacity-60 mix-blend-overlay pointer-events-none z-10" />

        {/* Ambient Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/50 z-10 pointer-events-none" />

        {/* Main Hero Typography & Call-to-Action (Bottom Grid) */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-5 sm:p-8 md:p-12 lg:p-14">
          <div className="grid grid-cols-12 gap-6 items-end">
            
            {/* Left Column: Clean, Massive Name Headline */}
            <div className="col-span-12 lg:col-span-7">
              <span className="font-script text-2xl sm:text-3xl md:text-4xl text-ivory/70 block mb-1 select-none">
                portfolio of
              </span>
              <h1 className="text-[15vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] font-display font-bold leading-[0.85] tracking-[-0.04em] text-ivory">
                Madhav
              </h1>
            </div>

            {/* Right Column: Natural Tagline & CTAs */}
            <div className="col-span-12 lg:col-span-5 pb-2 lg:pb-3">
              <p className="text-xs sm:text-sm md:text-base text-ivory-muted mb-6 leading-relaxed">
                Computer Science (AI &amp; ML) Engineer at PCCOE. Passionate about machine learning, data structures and algorithms, and contributing to open-source ecosystems.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                {/* Primary Pill Button */}
                <a 
                  href="#projects"
                  className="group inline-flex items-center gap-2 bg-ivory hover:bg-white text-black font-semibold rounded-full pl-5 pr-1.5 py-1.5 transition-all duration-300 shadow-lg hover:shadow-white/20"
                >
                  <span className="text-xs sm:text-sm font-medium">Explore Work</span>
                  <span className="w-8 h-8 rounded-full bg-black flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4 text-ivory" />
                  </span>
                </a>

                {/* Resume Direct Link Button */}
                <a 
                  href={PORTFOLIO_DATA.personal.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-ivory hover:text-white font-medium rounded-full px-4 py-2 border border-white/15 backdrop-blur-md transition-all duration-300 hover:scale-105"
                >
                  <FileText className="w-4 h-4 text-ivory-muted group-hover:text-white" />
                  <span className="text-xs sm:text-sm font-medium">Resume</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-ivory-muted group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Social Quick Links */}
                <div className="flex items-center gap-2">
                  <a 
                    href={PORTFOLIO_DATA.personal.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub Profile"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 flex items-center justify-center text-ivory hover:text-white transition-all hover:scale-105"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a 
                    href={PORTFOLIO_DATA.personal.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn Profile"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 flex items-center justify-center text-ivory hover:text-white transition-all hover:scale-105"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

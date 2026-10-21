import React, { useState } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, Check, Copy } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-28 sm:py-36 md:py-44 px-4 sm:px-6 md:px-8 bg-void border-t border-white/5 relative overflow-hidden">
      {/* Subtle radial glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent-azure/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Giant Editorial Headline matching reference image */}
        <span className="font-script text-3xl sm:text-4xl md:text-5xl text-ivory/60 block mb-3 lowercase select-none">
          start a conversation
        </span>
        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter text-[#c5d1de] uppercase leading-[0.92] select-none">
          LET&rsquo;S BUILD<br />
          SOMETHING<br />
          TOGETHER.
        </h2>

        {/* Subtitle Paragraph */}
        <p className="mt-8 sm:mt-10 text-sm sm:text-base md:text-lg text-ivory-muted max-w-2xl mx-auto leading-relaxed font-normal">
          Have a project in mind, a leadership opportunity, or want to connect?<br className="hidden sm:inline" />
          Feel free to reach out &mdash; I&rsquo;m always open to discussing new ideas and collaborations.
        </p>

        {/* Primary CTA: Big White Pill Button */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-white text-black font-medium text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:bg-[#f2f4f8] shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <span>Connect on LinkedIn</span>
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-black stroke-[2.5]" />
          </a>
        </div>

        {/* Secondary Channels: 3 Dark Rounded Pills matching reference */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          
          {/* LinkedIn Pill */}
          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111317] border border-white/10 hover:border-white/25 text-white/80 hover:text-white transition-all text-xs sm:text-sm font-medium hover:bg-[#181b20]"
          >
            <Linkedin className="w-4 h-4 text-white/70" />
            <span>LinkedIn</span>
          </a>

          {/* GitHub Pill */}
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111317] border border-white/10 hover:border-white/25 text-white/80 hover:text-white transition-all text-xs sm:text-sm font-medium hover:bg-[#181b20]"
          >
            <Github className="w-4 h-4 text-white/70" />
            <span>GitHub</span>
          </a>

          {/* Email Pill with Interactive Copy and Mailto */}
          <div className="relative inline-flex items-center">
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="inline-flex items-center gap-2 pl-5 pr-3 py-2.5 rounded-full bg-[#111317] border border-white/10 hover:border-white/25 text-white/80 hover:text-white transition-all text-xs sm:text-sm font-medium hover:bg-[#181b20]"
            >
              <Mail className="w-4 h-4 text-white/70" />
              <span>Email</span>
            </a>
            
            <button
              onClick={handleCopyEmail}
              title="Copy email address"
              aria-label="Copy email address"
              className="ml-1 p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>

            {copied && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-white text-black text-[11px] font-mono font-medium shadow-lg animate-fade-in pointer-events-none whitespace-nowrap">
                Email copied!
              </span>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

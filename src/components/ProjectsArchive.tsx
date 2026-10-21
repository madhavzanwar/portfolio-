import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { TechBadge } from './TechBadge';

export const ProjectsArchive: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-void border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        
        {/* Archive Header - Clean, no unnecessary kickers or wordy subheadings */}
        <div className="mb-10 sm:mb-12">
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-ivory">
            Additional Projects
          </h3>
        </div>

        {/* Grid of Archive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.archiveProjects.map((item) => (
            <div 
              key={item.id}
              className="p-6 sm:p-7 rounded-2xl bg-surface border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-ivory-muted px-2.5 py-0.5 rounded bg-white/5 border border-white/10">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-mono text-ivory-faint">{item.date}</span>
                </div>

                <h4 className="text-xl font-display font-bold text-ivory group-hover:text-white transition-colors mb-2">
                  {item.title}
                </h4>

                <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* Tech Stack Pills with Logos on the Left */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
                  {item.tags.map((t) => (
                    <TechBadge key={t} name={t} />
                  ))}
                </div>
              </div>

              {/* Action Buttons: Repository & Demo */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                {item.githubUrl && (
                  <a 
                    href={item.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-ivory hover:text-white px-3.5 py-1.5 rounded-full border border-white/15 hover:border-white/30 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Repository</span>
                  </a>
                )}
                {item.liveUrl && (
                  <a 
                    href={item.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-ivory hover:text-white px-3.5 py-1.5 rounded-full border border-white/15 hover:border-white/30 transition-colors ml-auto"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-ivory-muted" />
                    <span>Demo</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

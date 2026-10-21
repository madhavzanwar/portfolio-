import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-void">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Heading Only - Clean & Direct */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ivory tracking-tight">
            Experience &amp; Open Source
          </h2>
        </div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.experiences.map((exp) => (
            <div 
              key={exp.id}
              className="p-6 sm:p-8 rounded-2xl md:rounded-3xl bg-surface border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ivory-muted px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                      {exp.employmentType}
                    </span>
                    <h3 className="text-xl font-display font-bold text-ivory mt-2.5">
                      {exp.role}
                    </h3>
                    <div className="text-xs sm:text-sm text-ivory-muted font-medium mt-0.5">
                      {exp.organization}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-ivory-faint mb-5">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-ivory-faint" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-ivory-faint" />
                    {exp.location}
                  </span>
                </div>

                {/* Description Bullets Only - Skills removed as requested */}
                <ul className="space-y-2.5">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-xs sm:text-sm text-ivory-muted flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 shrink-0"></span>
                      <span className="leading-relaxed">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

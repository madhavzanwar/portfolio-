import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { TechBadge } from './TechBadge';

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <div 
      className="sticky transition-all duration-300 w-full"
      style={{
        top: `calc(85px + ${index * 20}px)`,
        zIndex: index + 10,
        marginBottom: '40px'
      }}
    >
      <div className="bg-[#111111] rounded-2xl md:rounded-3xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300 hover:border-white/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Image Column */}
          <div className={`lg:col-span-6 p-4 sm:p-6 md:p-8 ${
            index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
          }`}>
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden group border border-white/10 bg-black aspect-video flex items-center justify-center shadow-lg">
              <img 
                src={project.image} 
                alt={`${project.title} Product Showcase`}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              {/* Category pill on image */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10">
                <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono bg-black/85 backdrop-blur-md text-ivory border border-white/15">
                  {project.category}
                </span>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className={`lg:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between ${
            index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
          }`}>
            <div>
              {/* Meta header */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono text-ivory-faint">
                  0{index + 1}
                </span>
                <span className="text-[11px] font-mono text-ivory-faint">{project.date}</span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-ivory tracking-tight mb-2">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-ivory-muted font-medium mb-4">
                {project.tagline}
              </p>

              {/* Tech Stack Pills with Logos on the Left (Flow / BitLab Style) */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <TechBadge key={tag.name} name={tag.name} />
                ))}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed mb-6">
                {project.description}
              </p>
            </div>

            {/* Action Buttons: Code and Preview (Exact Flow / BitLab Style) */}
            <div className="flex items-center gap-3 pt-2">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 hover:border-white text-xs sm:text-sm font-medium text-ivory hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <Github className="w-4 h-4" />
                  <span>Code</span>
                </a>
              )}

              {project.liveUrl && (
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 hover:border-white text-xs sm:text-sm font-medium text-ivory hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <ExternalLink className="w-4 h-4 text-ivory-muted" />
                  <span>Preview</span>
                </a>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { ProjectCard } from './ProjectCard';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ProjectsStack: React.FC = () => {
  return (
    <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-void relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16 border-b border-white/10 pb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ivory tracking-tight">
            Featured Projects
          </h2>
        </div>

        {/* Sticky Stacking Cards Container */}
        <div className="relative pb-16">
          {PORTFOLIO_DATA.flagshipProjects.map((project, idx) => (
            <ProjectCard 
              key={project.id}
              project={project}
              index={idx}
              total={PORTFOLIO_DATA.flagshipProjects.length}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

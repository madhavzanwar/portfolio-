import React from 'react';
import { Trophy, Compass, BookOpen, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Achievements: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'LeetCode':
        return (
          <img 
            src="/images/logos/leetcode.svg" 
            alt="LeetCode Logo" 
            className="w-6 h-6 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/logos/leetcode-brand.png';
            }}
          />
        );
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-amber-300" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-cyan-300" />;
      default:
        return <BookOpen className="w-5 h-5 text-indigo-300" />;
    }
  };

  return (
    <section id="achievements" className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-void border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16 border-b border-white/10 pb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ivory tracking-tight">
            Key Achievements
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.achievements.map((item) => (
            <div 
              key={item.id}
              className="p-6 sm:p-8 rounded-2xl md:rounded-3xl bg-surface border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-105 transition-transform">
                    {getIcon(item.icon)}
                  </div>
                  {item.highlight && (
                    <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-white/10 text-ivory border border-white/15">
                      {item.highlight}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-display font-bold text-ivory group-hover:text-white transition-colors mb-1">
                  {item.title}
                </h3>
                <div className="text-xs font-mono text-ivory-muted mb-3">
                  {item.organization}
                </div>

                <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.id === 'leetcode' && (
                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-ivory-faint font-mono">leetcode.com/u/madhav_builds/</span>
                  <a 
                    href={PORTFOLIO_DATA.personal.leetcode}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-ivory hover:underline font-medium"
                  >
                    <span>View Solutions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

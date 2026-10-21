import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const TechMatrix: React.FC = () => {
  // Split logos into two alternating streams
  const half = Math.ceil(PORTFOLIO_DATA.techLogos.length / 2);
  const row1 = PORTFOLIO_DATA.techLogos.slice(0, half);
  const row2 = PORTFOLIO_DATA.techLogos.slice(half);

  // Duplicate for seamless infinite marquee loop
  const infiniteRow1 = [...row1, ...row1, ...row1, ...row1];
  const infiniteRow2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <section id="skills" className="py-20 sm:py-28 bg-void overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ivory tracking-tight">
          Technologies &amp; Systems
        </h2>
      </div>

      {/* Marquee Row 1: Moving Right to Left */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Left and right fade gradient edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-4 sm:gap-6">
          {infiniteRow1.map((item, idx) => (
            <div 
              key={`${item.slug}-${idx}`}
              className="group relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#131313] border border-white/10 hover:border-white/30 shadow-md transition-all duration-300 hover:scale-110 hover:bg-[#1a1a1a] cursor-pointer"
            >
              <img 
                src={item.iconUrl} 
                alt={item.name}
                className="w-9 h-9 sm:w-11 sm:h-11 object-contain filter transition-all duration-300"
                loading="lazy"
              />
              {/* Tooltip */}
              <div className="absolute -bottom-8 px-2.5 py-1 rounded-md bg-black/95 border border-white/15 text-[10px] font-mono text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2: Moving Left to Right (Reverse) */}
      <div className="relative w-full overflow-hidden py-3 mt-4">
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-reverse flex items-center gap-4 sm:gap-6">
          {infiniteRow2.map((item, idx) => (
            <div 
              key={`${item.slug}-${idx}`}
              className="group relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#131313] border border-white/10 hover:border-white/30 shadow-md transition-all duration-300 hover:scale-110 hover:bg-[#1a1a1a] cursor-pointer"
            >
              <img 
                src={item.iconUrl} 
                alt={item.name}
                className="w-9 h-9 sm:w-11 sm:h-11 object-contain filter transition-all duration-300"
                loading="lazy"
              />
              {/* Tooltip */}
              <div className="absolute -bottom-8 px-2.5 py-1 rounded-md bg-black/95 border border-white/15 text-[10px] font-mono text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

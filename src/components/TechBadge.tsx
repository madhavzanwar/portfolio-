import React from 'react';

interface TechBadgeProps {
  name: string;
}

export const TechBadge: React.FC<TechBadgeProps> = ({ name }) => {
  // Return icon + custom styling based on tech
  const getBadgeConfig = (tech: string) => {
    const lower = tech.toLowerCase();

    if (lower.includes('python')) {
      return {
        bg: 'bg-[#3776AB]/15 text-[#8ac4f3] border-[#3776AB]/30',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
      };
    }
    if (lower.includes('react')) {
      return {
        bg: 'bg-[#61DAFB]/15 text-[#93e7fb] border-[#61DAFB]/30',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
      };
    }
    if (lower.includes('flask')) {
      return {
        bg: 'bg-[#EF4444]/15 text-[#fca5a5] border-[#EF4444]/35',
        icon: '/images/logos/flask.svg'
      };
    }
    if (lower.includes('javascript')) {
      return {
        bg: 'bg-[#F7DF1E]/15 text-[#fae863] border-[#F7DF1E]/30',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
      };
    }
    if (lower.includes('typescript')) {
      return {
        bg: 'bg-[#3178C6]/15 text-[#7db5f5] border-[#3178C6]/30',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
      };
    }
    if (lower.includes('matlab')) {
      return {
        bg: 'bg-[#E16728]/15 text-[#f59e6c] border-[#E16728]/30',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg'
      };
    }
    if (lower.includes('c++') || lower.includes('cpp')) {
      return {
        bg: 'bg-[#00599C]/15 text-[#6eb9f0] border-[#00599C]/30',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg'
      };
    }
    if (lower === 'c') {
      return {
        bg: 'bg-[#A8B9CC]/15 text-[#dbe3ec] border-[#A8B9CC]/30',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg'
      };
    }
    if (lower.includes('vercel')) {
      return {
        bg: 'bg-white/10 text-white border-white/20',
        icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 116 100" fill="white"><polygon points="58 0 116 100 0 100"/></svg>'
      };
    }
    if (lower.includes('railway')) {
      return {
        bg: 'bg-[#8B5CF6]/15 text-[#c8b4fa] border-[#8B5CF6]/30',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/railway/railway-original.svg'
      };
    }
    if (lower.includes('render')) {
      return {
        bg: 'bg-[#46E3B7]/15 text-[#46e3b7] border-[#46E3B7]/30',
        icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2346E3B7"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.6 4.8 8 12 4.8z"/></svg>'
      };
    }
    if (lower.includes('gemini') || lower.includes('claude') || lower.includes('llm') || lower.includes('ai integration')) {
      return {
        bg: 'bg-[#10B981]/15 text-[#6ee7b7] border-[#10B981]/30',
        icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2310B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>'
      };
    }
    if (lower.includes('cnn') || lower.includes('computer vision') || lower.includes('eigenfaces')) {
      return {
        bg: 'bg-[#06B6D4]/15 text-[#7ce7f5] border-[#06B6D4]/30',
        icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2306B6D4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>'
      };
    }
    if (lower.includes('voice')) {
      return {
        bg: 'bg-[#3B82F6]/15 text-[#a5cbfa] border-[#3B82F6]/30',
        icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%233B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>'
      };
    }
    if (lower.includes('scikit') || lower.includes('ml') || lower.includes('learning')) {
      return {
        bg: 'bg-[#F97316]/15 text-[#fdba74] border-[#F97316]/30',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg'
      };
    }
    if (lower.includes('desmos') || lower.includes('calculus') || lower.includes('math')) {
      return {
        bg: 'bg-[#22C55E]/15 text-[#98f3b6] border-[#22C55E]/30',
        icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2322C55E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19h16"/><path d="M4 15l4-8 4 12 4-6 4 2"/></svg>'
      };
    }
    if (lower.includes('vector') || lower.includes('search') || lower.includes('semantic')) {
      return {
        bg: 'bg-[#A855F7]/15 text-[#d8b4fe] border-[#A855F7]/30',
        icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23A855F7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>'
      };
    }
    if (lower.includes('canvas') || lower.includes('interactive')) {
      return {
        bg: 'bg-[#EC4899]/15 text-[#f472b6] border-[#EC4899]/30',
        icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23EC4899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>'
      };
    }
    if (lower.includes('iot') || lower.includes('esp32')) {
      return {
        bg: 'bg-[#E7352C]/15 text-[#f87171] border-[#E7352C]/30',
        icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23E7352C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>'
      };
    }
    if (lower.includes('next')) {
      return {
        bg: 'bg-white/10 text-white border-white/20',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'
      };
    }
    if (lower.includes('mongo')) {
      return {
        bg: 'bg-[#47A248]/15 text-[#86efac] border-[#47A248]/30',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'
      };
    }

    // Default fallback
    return {
      bg: 'bg-white/10 text-ivory border-white/15',
      icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23E1E0CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>'
    };
  };

  const config = getBadgeConfig(name);

  return (
    <span className={`inline-flex items-center gap-2 pl-1.5 pr-3 sm:pr-3.5 py-1 rounded-full text-xs sm:text-sm font-medium border shadow-sm transition-all duration-200 hover:scale-105 ${config.bg}`}>
      {/* Prominent Circular Box housing the logo */}
      <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black/40 border border-white/15 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
        <img 
          src={config.icon} 
          alt="" 
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain" 
          onError={(e) => {
            // Hide broken image gracefully if offline
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </span>
      <span>{name}</span>
    </span>
  );
};

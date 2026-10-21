import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, FileText } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Stack', href: '#skills' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav 
        aria-label="Main navigation" 
        className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-300"
      >
        <div className={`glass-nav rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-2xl transition-all duration-300 ${
          scrolled ? 'bg-black/95 border-white/20' : 'bg-black/75 border-white/10'
        }`}>
          {/* Brand Name - Clean, no blinking dot */}
          <a href="#" className="flex items-center gap-2 group shrink-0">
            <span className="font-display font-bold text-sm sm:text-base tracking-tight text-ivory group-hover:text-white transition-colors">
              Madhav Zanwar
            </span>
          </a>

          {/* Desktop Nav Links - well spaced, no overlap */}
          <ul className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-medium text-ivory-muted shrink-0">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  className="hover:text-white transition-colors duration-200 tracking-wider uppercase text-[11px] whitespace-nowrap"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Action Button: Resume Request */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <a 
              href={PORTFOLIO_DATA.personal.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 text-ivory px-3.5 py-1.5 rounded-full border border-white/10 transition-all duration-200"
            >
              <FileText className="w-3.5 h-3.5 text-ivory-muted" />
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-ivory p-1.5 rounded-full hover:bg-white/10 transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 glass-panel rounded-2xl p-5 border border-white/10 shadow-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-ivory-muted hover:text-white py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs text-ivory-faint">PCCOE Pune · AIML</span>
              <a 
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-ivory hover:text-white font-medium hover:underline flex items-center gap-1"
              >
                Get in Touch &rarr;
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

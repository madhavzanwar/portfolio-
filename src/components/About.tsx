import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HighlightParagraphProps {
  text: string;
  progress: any;
  range: [number, number];
}

const HighlightParagraph: React.FC<HighlightParagraphProps> = ({ text, progress, range }) => {
  const words = text.split(' ');
  const amount = range[1] - range[0];
  const step = amount / words.length;

  return (
    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-medium leading-[1.35] tracking-tight mb-8">
      {words.map((word, i) => {
        const start = range[0] + i * step;
        const end = range[0] + (i + 1) * step;
        return (
          <Word key={i} progress={progress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};

const Word: React.FC<{ children: React.ReactNode; progress: any; range: [number, number] }> = ({ children, progress, range }) => {
  // Baseline visibility is now 0.45 so text is clearly readable before scrolling
  const opacity = useTransform(progress, range, [0.45, 1]);
  const color = useTransform(progress, range, ['rgba(225, 224, 204, 0.45)', 'rgba(255, 255, 255, 1)']);
  
  return (
    <span className="relative inline-block mr-2.5">
      <motion.span style={{ opacity, color }}>
        {children}
      </motion.span>
    </span>
  );
};

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.3'],
  });

  const paragraph1 = "I am a second-year Computer Science (AI & ML) student at Pimpri Chinchwad College of Engineering, Pune. I love building things, engineering intelligent software, and exploring what happens when curiosity meets deep technical focus.";
  
  const paragraph2 = "My core interests span machine learning, computer vision architectures, and rigorous data structures and algorithms. I take pride in understanding how systems work from foundational mathematics to real, responsive web interfaces.";

  const paragraph3 = "Beyond coursework, I am an active competitive programmer with over 350+ problems solved on LeetCode, and a dedicated open-source contributor participating in programs like GirlScript Summer of Code and IEEE Student Branch initiatives.";

  return (
    <section id="about" ref={containerRef} className="py-24 sm:py-32 px-4 sm:px-6 md:px-8 bg-void">
      <div className="max-w-5xl mx-auto">
        {/* Subtle Aesthetic Accent */}
        <div className="mb-8 flex items-center gap-4">
          <span className="font-script text-3xl sm:text-4xl text-ivory/70 select-none">
            curiosity &amp; engineering
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
        </div>

        {/* Newspaper Reading Highlight Container with higher baseline visibility */}
        <div className="py-4">
          <HighlightParagraph 
            text={paragraph1} 
            progress={scrollYProgress} 
            range={[0.0, 0.35]} 
          />
          <HighlightParagraph 
            text={paragraph2} 
            progress={scrollYProgress} 
            range={[0.35, 0.70]} 
          />
          <HighlightParagraph 
            text={paragraph3} 
            progress={scrollYProgress} 
            range={[0.70, 1.0]} 
          />
        </div>

      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  X, 
  FileText, 
  Eye, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';
import { PORTFOLIO_DATA, Certification } from '../data/portfolioData';

type FilterCategory = 'All' | 'AI & Machine Learning' | 'Hackathons & Competitions' | 'Skills & Engineering';

export const Certifications: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories: FilterCategory[] = [
    'All',
    'AI & Machine Learning',
    'Hackathons & Competitions',
    'Skills & Engineering'
  ];

  const filteredCerts = activeCategory === 'All'
    ? PORTFOLIO_DATA.certifications
    : PORTFOLIO_DATA.certifications.filter(c => c.category === activeCategory);

  const currentIndex = selectedCert 
    ? filteredCerts.findIndex(c => c.id === selectedCert.id)
    : -1;

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (filteredCerts.length === 0) return;
    const prevIdx = (currentIndex - 1 + filteredCerts.length) % filteredCerts.length;
    setSelectedCert(filteredCerts[prevIdx]);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (filteredCerts.length === 0) return;
    const nextIdx = (currentIndex + 1) % filteredCerts.length;
    setSelectedCert(filteredCerts[nextIdx]);
  };

  const handleCopyId = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCert) return;
      if (e.key === 'Escape') {
        setSelectedCert(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCert, currentIndex, filteredCerts]);

  return (
    <section id="certifications" className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-void border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-8 md:mb-12 border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ivory tracking-tight">
              Licenses and Certifications
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const count = cat === 'All' 
                ? PORTFOLIO_DATA.certifications.length 
                : PORTFOLIO_DATA.certifications.filter(c => c.category === cat).length;
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all duration-200 border ${
                    isActive
                      ? 'bg-ivory text-black border-ivory font-semibold shadow-sm'
                      : 'bg-white/[0.03] hover:bg-white/[0.08] text-ivory-muted hover:text-ivory border-white/10'
                  }`}
                >
                  {cat} <span className={`ml-1 text-[11px] ${isActive ? 'text-black/70' : 'text-ivory-faint'}`}>({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div 
              key={cert.id}
              className="rounded-2xl bg-surface border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
            >
              {/* Certificate Visual Image Preview */}
              <div 
                onClick={() => setSelectedCert(cert)}
                className="relative aspect-[16/11] bg-black/60 overflow-hidden cursor-pointer border-b border-white/10 flex items-center justify-center p-3 group/thumb"
              >
                <div className="w-full h-full rounded-lg overflow-hidden bg-[#181818] border border-white/15 flex items-center justify-center relative shadow-sm">
                  {cert.certificateImage ? (
                    <img 
                      src={cert.certificateImage} 
                      alt={`${cert.title} Certificate`}
                      loading="lazy"
                      className="w-full h-full object-contain object-center transition-transform duration-500 group-hover/thumb:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 text-ivory-muted">
                      <FileText className="w-8 h-8" />
                      <span className="text-xs">Preview</span>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/85 text-ivory text-xs font-semibold border border-white/20 backdrop-blur-md shadow-lg transform translate-y-1 group-hover/thumb:translate-y-0 transition-transform duration-200">
                      <Eye className="w-3.5 h-3.5 text-blue-400" />
                      <span>View Preview</span>
                    </span>
                  </div>
                </div>

                {/* Issued Date Pill */}
                <span className="absolute top-4 right-4 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-ivory border border-white/20 shadow-sm">
                  {cert.date}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category & Icon */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-white/5 text-ivory-faint border border-white/10">
                      {cert.category || 'Certification'}
                    </span>
                    <Award className="w-4 h-4 text-ivory-muted" />
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => setSelectedCert(cert)}
                    className="text-base font-display font-bold text-ivory group-hover:text-white transition-colors leading-snug mb-1.5 cursor-pointer line-clamp-2"
                  >
                    {cert.title}
                  </h3>

                  {/* Issuer */}
                  <div className="text-xs font-medium text-ivory-muted mb-3 line-clamp-1">
                    {cert.issuer}
                  </div>

                  {/* Credential ID */}
                  {cert.credentialId && (
                    <div className="flex items-center gap-2 text-[11px] font-mono text-ivory-faint mb-3">
                      <span>ID:</span>
                      <code className="text-ivory bg-white/5 px-1.5 py-0.5 rounded text-[10px]">
                        {cert.credentialId}
                      </code>
                      <button
                        onClick={(e) => handleCopyId(e, cert.credentialId!)}
                        className="p-1 rounded hover:bg-white/10 text-ivory-muted hover:text-ivory transition-colors"
                        title="Copy Credential ID"
                      >
                        {copiedId === cert.credentialId ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  )}

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cert.skills.slice(0, 4).map((s) => (
                      <span 
                        key={s}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-ivory-faint border border-white/5"
                      >
                        {s}
                      </span>
                    ))}
                    {cert.skills.length > 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-ivory-faint">
                        +{cert.skills.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Actions Row */}
                <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-ivory transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-ivory" />
                    <span>View</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {cert.certificatePdf && (
                      <a 
                        href={cert.certificatePdf}
                        download
                        title="Download Certificate PDF"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-xs text-ivory-muted hover:text-ivory transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">PDF</span>
                      </a>
                    )}

                    {cert.credentialUrl && (
                      <a 
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-ivory-muted hover:text-white transition-colors"
                      >
                        <span>Verify</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Certificate Modal Lightbox View */}
        {selectedCert && (
          <div 
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#111111] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            >
              
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-4 bg-[#141414]">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-white/10 text-ivory-muted">
                      {selectedCert.category || 'Certification'}
                    </span>
                    <span className="text-xs text-ivory-faint font-mono">
                      Issued {selectedCert.date}
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-display font-bold text-ivory truncate">
                    {selectedCert.title}
                  </h4>
                  <p className="text-xs text-ivory-muted truncate">
                    {selectedCert.issuer}
                  </p>
                </div>

                {/* Lightbox Controls: Prev, Next, Close */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {filteredCerts.length > 1 && (
                    <>
                      <button
                        onClick={handlePrev}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-ivory transition-colors"
                        title="Previous Certificate (Left Arrow)"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-mono text-ivory-faint px-1">
                        {currentIndex + 1} / {filteredCerts.length}
                      </span>
                      <button
                        onClick={handleNext}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-ivory transition-colors"
                        title="Next Certificate (Right Arrow)"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button 
                    onClick={() => setSelectedCert(null)}
                    className="p-2 ml-2 rounded-lg hover:bg-white/10 text-ivory transition-colors"
                    aria-label="Close certificate modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body: Certificate Document Display */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
                {selectedCert.certificateImage ? (
                  <div className="rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-[#1c1c1c] flex items-center justify-center p-2 sm:p-4">
                    <img 
                      src={selectedCert.certificateImage} 
                      alt={`${selectedCert.title} Certificate`}
                      className="w-full h-auto max-h-[58vh] object-contain rounded-lg shadow-lg"
                    />
                  </div>
                ) : (
                  <div className="p-10 rounded-xl bg-white/[0.02] border border-white/10 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-ivory">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="text-base font-semibold text-ivory">{selectedCert.title}</div>
                    <p className="text-xs text-ivory-muted max-w-md mx-auto">
                      {selectedCert.summary || "Verified credential on official issuer directory."}
                    </p>
                  </div>
                )}

                {/* Summary Description */}
                {selectedCert.summary && (
                  <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed px-1">
                    {selectedCert.summary}
                  </p>
                )}

                {/* Skills tags in modal */}
                <div className="flex flex-wrap gap-1.5 px-1">
                  {selectedCert.skills.map((s) => (
                    <span 
                      key={s}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-ivory-muted border border-white/10"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 sm:p-5 border-t border-white/10 bg-[#141414] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-ivory-muted">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="font-medium">Authenticated Credential</span>
                  {selectedCert.credentialId && (
                    <span className="hidden sm:inline font-mono text-[11px] text-ivory-faint ml-1">
                      (ID: {selectedCert.credentialId})
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2.5">
                  {selectedCert.certificatePdf && (
                    <a 
                      href={selectedCert.certificatePdf}
                      download
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-ivory transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>
                  )}

                  {selectedCert.credentialUrl && (
                    <a 
                      href={selectedCert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-ivory hover:bg-white text-black text-xs font-semibold transition-colors"
                    >
                      <span>Verify Authenticity</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

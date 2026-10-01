import React from 'react';
import { Sparkles, Download, Globe, Award } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

export default function Header({ lang, setLang, onPrint }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-amber-500/30 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20 animate-pulse">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-black bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent tracking-wide">
                AstroEngine Enterprise Pro
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono font-bold">
                v2.4 Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block font-medium">
              {lang === 'ta' ? 'தொழில்முறை ஜோதிட திருமணப் பொருத்தல் கணிப்பீடு இயங்குதளம்' : 'Enterprise Professional Vedic Marriage Matching Platform'}
            </p>
          </div>
        </div>

        {/* Top Action Pills (Reference screenshot style) */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'ta' ? 'தென்னிந்தியா' : 'South Indian Grid'}</span>
          </span>

          {onPrint && (
            <button
              onClick={onPrint}
              className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-bold hover:brightness-110 transition shadow-md flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? 'அறிக்கை பதிவிறக்கம்' : 'Download PDF'}</span>
            </button>
          )}

          <LanguageSelector lang={lang} setLang={setLang} />
        </div>

      </div>
    </header>
  );
}

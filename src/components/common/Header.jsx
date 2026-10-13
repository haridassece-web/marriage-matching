import React from 'react';
import { Sparkles, Download, Globe, Award, Sun, Moon } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

export default function Header({ lang, setLang, onPrint, theme = 'light', setTheme }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-amber-500/30 shadow-2xl transition-colors">
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

          {/* Theme Switcher Toggle (#F1F5F9 Soft Slate Light / Cosmic Dark) */}
          {setTheme && (
            <button
              onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
              className={`px-3 py-1 rounded-full font-bold transition shadow-sm flex items-center gap-1.5 border ${
                theme === 'light'
                  ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                  : 'bg-slate-800 text-amber-300 border-amber-500/40 hover:bg-slate-700'
              }`}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Soft Slate Light Mode (#F1F5F9)'}
            >
              {theme === 'light' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                  <span>{lang === 'ta' ? 'வெளிர் (#F1F5F9)' : 'Light (#F1F5F9)'}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{lang === 'ta' ? 'இருண்ட' : 'Dark'}</span>
                </>
              )}
            </button>
          )}

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

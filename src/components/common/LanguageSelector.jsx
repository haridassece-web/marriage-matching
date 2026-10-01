import React from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSelector({ lang, setLang }) {
  return (
    <div className="flex items-center gap-1 bg-slate-900/80 border border-amber-500/30 rounded-full p-1 shadow-inner">
      <button
        type="button"
        onClick={() => setLang('ta')}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
          lang === 'ta'
            ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md font-bold'
            : 'text-slate-300 hover:text-white'
        }`}
      >
        தமிழ்
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
          lang === 'en'
            ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md font-bold'
            : 'text-slate-300 hover:text-white'
        }`}
      >
        English
      </button>
    </div>
  );
}

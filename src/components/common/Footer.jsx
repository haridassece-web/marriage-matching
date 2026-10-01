import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer({ lang }) {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-medium text-slate-400">
            {lang === 'ta' ? 'தமிழ் ஜோதிட திருமண பொருத்தல் கணக்கிடு பொறி' : 'Vedic Marriage Matching & Rule-Based Compatibility Engine'}
          </p>
          <p className="text-slate-600 mt-0.5">
            {lang === 'ta' ? 'பாரம்பரிய கணித விதிகள் (11 பொருத்தம் + ரஜ்ஜு + வேதா + செவ்வாய் தோஷம்)' : 'Decoupled Rule Engine Architecture (11 Poruthams + Rajju + Vedha + Dosha Samyam)'}
          </p>
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <span>{lang === 'ta' ? 'அன்புடன் உருவாக்கப்பட்டது' : 'Designed for Astrologers & Families'}</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        </div>
      </div>
    </footer>
  );
}

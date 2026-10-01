import React from 'react';
import { Award, AlertTriangle, CheckCircle2, ShieldAlert, Sparkles, Activity } from 'lucide-react';

export default function MatchingSummary({ matchingData, lang }) {
  const { summary, warnings, bride, groom } = matchingData;
  const { overallPercentage, moduleBreakdown } = summary;

  const isUttamam = summary.grade === 'UTTAMAM';
  const isMadhyamam = summary.grade === 'MADHYAMAM';
  const isAdhamam = summary.grade === 'ADHAMAM';

  return (
    <div className={`rounded-3xl border p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md transition-all ${
      isUttamam
        ? 'bg-gradient-to-br from-slate-950 via-emerald-950/40 to-slate-950 border-emerald-500/40 shadow-emerald-950/30'
        : isMadhyamam
        ? 'bg-gradient-to-br from-slate-950 via-amber-950/40 to-slate-950 border-amber-500/40 shadow-amber-950/30'
        : 'bg-gradient-to-br from-slate-950 via-rose-950/40 to-slate-950 border-rose-500/40 shadow-rose-950/30'
    }`}>
      
      {/* Background Decorative Glow */}
      <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none ${
        isUttamam ? 'bg-emerald-500' : isMadhyamam ? 'bg-amber-500' : 'bg-rose-500'
      }`} />

      <div className="relative z-10 space-y-6">
        
        {/* Top Header Row: Percentage Gauge & Name Verdict */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-5">
            {/* Big Circular Percentage Gauge */}
            <div className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center shadow-xl shrink-0 ${
              isUttamam
                ? 'border-emerald-400 bg-emerald-950/80 text-emerald-200 shadow-emerald-500/20'
                : isMadhyamam
                ? 'border-amber-400 bg-amber-950/80 text-amber-200 shadow-amber-500/20'
                : 'border-rose-400 bg-rose-950/80 text-rose-200 shadow-rose-500/20'
            }`}>
              <span className="text-3xl font-black">{overallPercentage}%</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-300">
                {lang === 'ta' ? 'மொத்த பொருத்தம்' : 'Overall Match'}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow ${
                  isUttamam
                    ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300'
                    : isMadhyamam
                    ? 'bg-amber-500/20 border-amber-400/50 text-amber-300'
                    : 'bg-rose-500/20 border-rose-400/50 text-rose-300'
                }`}>
                  {lang === 'ta' ? summary.gradeTa : summary.gradeEn}
                </span>
                <span className="text-xs font-mono font-semibold text-amber-300">
                  ({summary.scoreFormatted} பொருத்தம்)
                </span>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {bride.name || (lang === 'ta' ? 'பெண்' : 'Bride')} & {groom.name || (lang === 'ta' ? 'ஆண்' : 'Groom')}
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                {isUttamam
                  ? (lang === 'ta' ? '5 சாஸ்திர பிரிவுகளிலும் (11 பொருத்தம், தோஷங்கள், கட்டப் பொருத்தம், சிறப்பு விதிகள், புத்திர பாக்கியம்) மிகச் சிறந்த சேர்க்கை உள்ளது.' : 'High astrological compatibility across all 5 evaluation modules.')
                  : isMadhyamam
                  ? (lang === 'ta' ? 'மிதமான பொருத்தம் அமைந்தது. சாஸ்திர பரிகாரங்களை மேற்கொண்டு நிச்சயிக்கலாம்.' : 'Moderate overall match percentage. Astrological remedies advised.')
                  : (lang === 'ta' ? 'தோஷ முரண் அல்லது குறைந்த சாஸ்திர புள்ளிகளால் திருமணத்தை தவிர்க்கவும்.' : 'Low compatibility percentage or high-risk dosha present.')
                }
              </p>
            </div>
          </div>

        </div>

        {/* 5-Module Overall % Breakdown Progress Bars */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-amber-300 font-bold border-b border-slate-800 pb-2">
            <span className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-amber-400" />
              {lang === 'ta' ? '5 சாஸ்திர பிரிவுகளின் சதவீத ஒப்பீடு (5 Module Percentage Breakdown):' : '5 Module Percentage Breakdown:'}
            </span>
            <span className="font-mono text-amber-400 font-black">{overallPercentage}% Overall</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            {/* 1. 11 Poruthams */}
            <div className="space-y-1 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300 font-semibold">{lang === 'ta' ? '1. 11 பொருத்தம்' : '1. 11 Poruthams'}</span>
                <span className="font-mono font-bold text-amber-400">{moduleBreakdown.poruthamPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full transition-all duration-500" style={{ width: `${moduleBreakdown.poruthamPercent}%` }} />
              </div>
            </div>

            {/* 2. 9 Marriage Doshas */}
            <div className="space-y-1 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300 font-semibold">{lang === 'ta' ? '2. 9 தோஷங்கள்' : '2. 9 Doshas'}</span>
                <span className="font-mono font-bold text-orange-400">{moduleBreakdown.doshaPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-orange-400 h-full transition-all duration-500" style={{ width: `${moduleBreakdown.doshaPercent}%` }} />
              </div>
            </div>

            {/* 3. Katta Porutham */}
            <div className="space-y-1 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300 font-semibold">{lang === 'ta' ? '3. கட்டப் பொருத்தம்' : '3. Katta Match'}</span>
                <span className="font-mono font-bold text-yellow-400">{moduleBreakdown.kattaPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-yellow-400 h-full transition-all duration-500" style={{ width: `${moduleBreakdown.kattaPercent}%` }} />
              </div>
            </div>

            {/* 4. Special Rules */}
            <div className="space-y-1 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300 font-semibold">{lang === 'ta' ? '4. சிறப்பு விதிகள்' : '4. Special Rules'}</span>
                <span className="font-mono font-bold text-emerald-400">{moduleBreakdown.specialPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full transition-all duration-500" style={{ width: `${moduleBreakdown.specialPercent}%` }} />
              </div>
            </div>

            {/* 5. Progeny Rules */}
            <div className="space-y-1 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300 font-semibold">{lang === 'ta' ? '5. புத்திர பாக்கியம்' : '5. Progeny'}</span>
                <span className="font-mono font-bold text-pink-400">{moduleBreakdown.progenyPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-pink-400 h-full transition-all duration-500" style={{ width: `${moduleBreakdown.progenyPercent}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Warnings Bar */}
        {warnings.length > 0 && (
          <div className="pt-2 space-y-2">
            {warnings.map((w, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs font-medium">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">{lang === 'ta' ? w.msgTa : w.msgEn}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

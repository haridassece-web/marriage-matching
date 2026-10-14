import React, { useState } from 'react';
import { 
  Scroll, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Sparkles, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Flame, 
  HeartHandshake, 
  Compass, 
  Clock,
  ShieldCheck
} from 'lucide-react';
import { evaluateSaaraamsaVidhigal } from '../../rules/jathagam/saaraamsaVidhigalEngine';

export default function SaaraamsaVidhigalReport({ bride, groom, lang = 'ta' }) {
  const result = evaluateSaaraamsaVidhigal(bride, groom);
  const { 
    scorePercent, 
    passedCount, 
    warningCount, 
    criticalCount, 
    totalRules, 
    overallStatusTa, 
    overallStatusEn, 
    badgeColor, 
    rulesList 
  } = result;

  const [expandedRule, setExpandedRule] = useState(null);

  const toggleRule = (idx) => {
    setExpandedRule(prev => prev === idx ? null : idx);
  };

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-6 backdrop-blur-md">
      
      {/* Top Header Card */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-amber-500/40 text-amber-400 shadow-lg">
            <Scroll className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
                {lang === 'ta' ? 'சுவடி சாஸ்திர விதிகள்' : 'Palm-Leaf Astrological Rules'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono">
                6 Essence Rules
              </span>
            </div>
            <h3 className="text-xl font-black text-amber-100 flex items-center gap-2">
              <span>{lang === 'ta' ? 'திருமண பொருத்தத்தின் 6 சாராம்ச விதிகள்' : '6 Essence Rules of Marriage Matching'}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'ta' 
                ? 'சம சப்தம லக்னம், ஒரே ராசி/லக்னம், ஒரே தசா 3,5,7 விலக்கு, பாதகாதிபதி உயிர்ஸ்தானம், உபய லக்னம் & 1-4 விலக்கு சுவடி விதிகள்'
                : 'Sama Saptama Lagna, Same/Odd Signs, Same 3,5,7 Dasa Avoidance, Badhaka Uyir Sthana, Ubhaya Lagna & 1-4 Placement Core Rules'}
            </p>
          </div>
        </div>

        {/* Big Overall Status Badge */}
        <div className={`px-5 py-3 rounded-2xl border shadow-xl flex items-center gap-3 shrink-0 ${
          badgeColor === 'emerald'
            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
            : badgeColor === 'amber'
            ? 'bg-amber-500/15 border-amber-500/40 text-amber-200'
            : 'bg-rose-500/15 border-rose-500/40 text-rose-200'
        }`}>
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">
              {lang === 'ta' ? 'மதிப்பெண்' : 'Score'}
            </div>
            <div className="text-2xl font-black font-mono">
              {scorePercent}%
            </div>
          </div>
          <div className="h-8 w-px bg-current opacity-30" />
          <div className="text-xs font-bold leading-tight">
            <div>{lang === 'ta' ? overallStatusTa : overallStatusEn}</div>
            <div className="text-[11px] opacity-80 mt-0.5">
              {passedCount} / {totalRules} {lang === 'ta' ? 'விதிகள் சுபம்' : 'Rules Passed'}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Summary Pill Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <div className="text-slate-400 text-[10px] uppercase font-bold">{lang === 'ta' ? 'பொருந்தியவை' : 'Passed'}</div>
            <div className="text-emerald-300 font-extrabold text-sm">{passedCount} / {totalRules}</div>
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <div className="text-slate-400 text-[10px] uppercase font-bold">{lang === 'ta' ? 'கவனம் தேவை' : 'Warnings'}</div>
            <div className="text-amber-300 font-extrabold text-sm">{warningCount}</div>
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
          <div>
            <div className="text-slate-400 text-[10px] uppercase font-bold">{lang === 'ta' ? 'விலக்கு தோஷம்' : 'Critical'}</div>
            <div className="text-rose-300 font-extrabold text-sm">{criticalCount}</div>
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-yellow-400 shrink-0" />
          <div>
            <div className="text-slate-400 text-[10px] uppercase font-bold">{lang === 'ta' ? 'சுவடி சாஸ்திரம்' : 'Authenticity'}</div>
            <div className="text-yellow-300 font-extrabold text-sm">100% பாரம்பரியம்</div>
          </div>
        </div>
      </div>

      {/* All 6 Individual Rule Cards */}
      <div className="space-y-4 pt-2">
        {rulesList.map((rule, idx) => {
          const isExpanded = expandedRule === idx || rule.status !== 'PASS';
          const isCritical = rule.status === 'CRITICAL';
          const isWarn = rule.status === 'WARN';
          const isMitigated = rule.status === 'MITIGATED';
          const isPass = rule.status === 'PASS';

          return (
            <div 
              key={idx}
              className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                isCritical
                  ? 'bg-gradient-to-r from-rose-950/30 via-slate-950 to-slate-950 border-rose-500/40 shadow-rose-950/20'
                  : isWarn
                  ? 'bg-gradient-to-r from-amber-950/30 via-slate-950 to-slate-950 border-amber-500/40 shadow-amber-950/20'
                  : isMitigated
                  ? 'bg-gradient-to-r from-cyan-950/30 via-slate-950 to-slate-950 border-cyan-500/40 shadow-cyan-950/20'
                  : 'bg-gradient-to-r from-emerald-950/20 via-slate-950 to-slate-950 border-emerald-500/30'
              }`}
            >
              {/* Card Header Accordion Trigger */}
              <div 
                onClick={() => toggleRule(idx)}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className={`p-2 rounded-xl mt-0.5 sm:mt-0 shrink-0 ${
                    isCritical
                      ? 'bg-rose-500/20 text-rose-400'
                      : isWarn
                      ? 'bg-amber-500/20 text-amber-400'
                      : isMitigated
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {isCritical ? <ShieldAlert className="w-5 h-5" /> :
                     isWarn ? <AlertTriangle className="w-5 h-5" /> :
                     isMitigated ? <Sparkles className="w-5 h-5" /> :
                     <ShieldCheck className="w-5 h-5" />}
                  </div>

                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white flex flex-wrap items-center gap-2">
                      <span>{lang === 'ta' ? rule.titleTa : rule.titleEn}</span>
                    </h4>
                    <p className="text-[11px] text-amber-300/80 font-mono mt-0.5 line-clamp-1 italic">
                      "{rule.manuscriptQuoteTa}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border whitespace-nowrap hidden sm:inline-flex ${
                    isCritical
                      ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                      : isWarn
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : isMitigated
                      ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                      : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  }`}>
                    {lang === 'ta' ? rule.statusTextTa : rule.statusTextEn}
                  </span>

                  <button className="text-slate-400 hover:text-white transition p-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Card Body Details */}
              {isExpanded && (
                <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-4 text-xs">
                  
                  {/* Status Badge for mobile view */}
                  <div className="sm:hidden">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border inline-flex ${
                      isCritical
                        ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                        : isWarn
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                        : isMitigated
                        ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                        : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    }`}>
                      {lang === 'ta' ? rule.statusTextTa : rule.statusTextEn}
                    </span>
                  </div>

                  {/* Manuscript Hand-Written Quote Box */}
                  <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-3 flex items-start gap-2.5">
                    <BookOpen className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                        {lang === 'ta' ? 'ஓலைச்சுவடி மூலக் குறிப்பு (Manuscript Citation):' : 'Original Manuscript Citation:'}
                      </span>
                      <p className="text-amber-200 font-serif text-xs md:text-sm italic mt-0.5 leading-relaxed">
                        "{rule.manuscriptQuoteTa}"
                      </p>
                    </div>
                  </div>

                  {/* Dynamic Technical Indicators Box */}
                  {rule.ruleNumber === 1 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-[11px]">
                      <div>
                        <span className="text-slate-400 block">பெண் லக்னம் (உயிர் லக்னம்):</span>
                        <strong className="text-rose-300 text-xs">{rule.bLagnaNameTa} ({rule.bLagnaNameEn})</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">ஆண் லக்னம்:</span>
                        <strong className="text-amber-300 text-xs">{rule.gLagnaNameTa} ({rule.gLagnaNameEn})</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">லக்ன இடைவெளி:</span>
                        <strong className={`${rule.isSamaSaptama ? 'text-rose-400' : 'text-emerald-400'} text-xs`}>
                          {rule.lagnaCount}-ம் இடம் {rule.isSamaSaptama ? '(சம சப்தமம் - 1-7)' : '(சுப இடைவெளி)'}
                        </strong>
                      </div>
                    </div>
                  )}

                  {rule.ruleNumber === 2 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-[11px]">
                      <div>
                        <span className="text-slate-400 block">ராசி & லக்ன நிலை:</span>
                        <strong className={`text-xs ${rule.isSameRasiAndLagna ? 'text-rose-400 font-black' : rule.isSameRasi || rule.isSameLagna ? 'text-amber-300' : 'text-emerald-300'}`}>
                          {rule.isSameRasiAndLagna 
                            ? '🛑 ஒரே ராசி & ஒரே லக்னம்' 
                            : rule.isSameRasi 
                            ? `ஒரே ராசி (${rule.bRasiNameTa})` 
                            : rule.isSameLagna 
                            ? `ஒரே லக்னம் (${rule.bLagnaNameTa})` 
                            : 'சுப சமநிலை'}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">பெண் தசா-புத்தி:</span>
                        <strong className="text-rose-300 text-xs">{rule.brideDasaLordTa} தசை / {rule.brideBhuktiLordTa} புத்தி</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">ஆண் தசா-புத்தி:</span>
                        <strong className="text-amber-300 text-xs">{rule.groomDasaLordTa} தசை / {rule.groomBhuktiLordTa} புத்தி</strong>
                      </div>
                    </div>
                  )}

                  {rule.ruleNumber === 3 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-[11px]">
                      <div>
                        <span className="text-slate-400 block">பெண் நடப்பு தசா:</span>
                        <strong className="text-rose-300 text-xs">
                          {rule.brideDasaLordTa} தசை ({rule.brideDasaName})
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">ஆண் நடப்பு தசா:</span>
                        <strong className="text-amber-300 text-xs">
                          {rule.groomDasaLordTa} தசை ({rule.groomDasaName})
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">ஒரே தசா & 3,5,7 நிலை:</span>
                        <strong className={`${rule.status === 'CRITICAL' ? 'text-rose-400 font-black' : rule.status === 'WARN' ? 'text-amber-300' : 'text-emerald-400'} text-xs`}>
                          {rule.status === 'CRITICAL' 
                            ? (rule.isSameDasa ? '🛑 ஒரே தசா 3, 5, 7 விலக்கு!' : '🛑 இருவருக்கும் 3, 5, 7 தசாக்கள்!')
                            : rule.status === 'WARN' 
                            ? '⚠️ ஒரே தசா (சுப தசா)' 
                            : '✅ உத்தம தசா சமநிலை'}
                        </strong>
                      </div>
                    </div>
                  )}

                  {rule.ruleNumber === 4 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-[11px]">
                      <div>
                        <span className="text-slate-400 block">பெண்ணின் உயிர்ஸ்தானம் (8-ம் இடம்):</span>
                        <strong className="text-pink-300 text-xs">{rule.b8thHouseNameTa}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">ஆணின் பாதக ராசி:</span>
                        <strong className="text-amber-300 text-xs">{rule.gBadhakaNameTa}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">உயிர்ஸ்தான நிலை:</span>
                        <strong className={`${rule.hasUyirSthanaAffliction ? 'text-rose-400' : 'text-emerald-400'} text-xs`}>
                          {rule.hasUyirSthanaAffliction ? '⚠️ பாதக தாக்கம் உள்ளது' : '✅ முழு சுப பாதுகாப்பு'}
                        </strong>
                      </div>
                    </div>
                  )}

                  {rule.ruleNumber === 5 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-[11px]">
                      <div>
                        <span className="text-slate-400 block">பெண் லக்னம் வகை:</span>
                        <strong className="text-rose-300 text-xs">
                          {rule.bLagnaNameTa} {rule.isBrideUbhaya ? '(உபய லக்னம்)' : '(சர/ஸ்திர லக்னம்)'}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">ஆண் லக்னம் வகை:</span>
                        <strong className="text-amber-300 text-xs">
                          {rule.gLagnaNameTa} {rule.isGroomUbhaya ? '(உபய லக்னம்)' : '(சர/ஸ்திர லக்னம்)'}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">7-ம் இடம் பாதக வினை:</span>
                        <strong className={`${rule.hasUbhayaBadhakaConflict ? 'text-rose-400' : 'text-emerald-400'} text-xs`}>
                          {rule.hasUbhayaBadhakaConflict ? '⚠️ பாதக வினை உள்ளது' : '✅ பாதக வினை இல்லை'}
                        </strong>
                      </div>
                    </div>
                  )}

                  {rule.ruleNumber === 6 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-[11px]">
                      <div>
                        <span className="text-slate-400 block">ராசி இடைவெளி (பெண் ➔ ஆண்):</span>
                        <strong className={`text-xs ${rule.isRasi1to4 ? 'text-rose-400 font-bold' : 'text-emerald-300'}`}>
                          {rule.rasiCount}-வது ராசி {rule.isRasi1to4 ? '(1-4 தோஷம்)' : '(சுபம்)'}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">லக்ன இடைவெளி (பெண் ➔ ஆண்):</span>
                        <strong className={`text-xs ${rule.isLagna1to4 ? 'text-rose-400 font-bold' : 'text-emerald-300'}`}>
                          {rule.lagnaCount}-வது லக்னம் {rule.isLagna1to4 ? '(1-4 தோஷம்)' : '(சுபம்)'}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">1-4 தோஷ நிலை:</span>
                        <strong className={`text-xs ${rule.status === 'CRITICAL' ? 'text-rose-400 font-black' : rule.status === 'WARN' ? 'text-amber-300' : 'text-emerald-300'}`}>
                          {rule.status === 'CRITICAL' ? '🛑 இரண்டிலும் 1-4 தோஷம்' : rule.status === 'WARN' ? '⚠️ 1-4 தோஷம் உள்ளது' : '✅ 1-4 தோஷம் இல்லை'}
                        </strong>
                      </div>
                    </div>
                  )}

                  {/* Detailed Explanation */}
                  <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 text-slate-200 leading-relaxed text-xs">
                    <span className="text-slate-400 font-bold block mb-1">
                      {lang === 'ta' ? 'விளக்க உரை:' : 'Astrological Evaluation:'}
                    </span>
                    {lang === 'ta' ? rule.explanationTa : rule.explanationEn}
                  </div>

                  {/* Remedy / Pariharam Box */}
                  <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3 flex items-start gap-2.5 text-slate-300 text-xs">
                    <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-300 block text-[11px] uppercase tracking-wider">
                        {lang === 'ta' ? 'பரிகாரம் & சாஸ்திர வழிகாட்டல்:' : 'Remedy & Spiritual Guidance:'}
                      </strong>
                      <p className="mt-0.5 leading-relaxed text-slate-300">
                        {rule.remedyTa}
                      </p>
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}

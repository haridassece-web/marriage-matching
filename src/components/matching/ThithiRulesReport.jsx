import React, { useState } from 'react';
import { 
  Moon, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Sparkles, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck,
  Compass
} from 'lucide-react';
import { evaluateAllThithiAndMudakkuRules } from '../../rules/jathagam/thithiRules';

export default function ThithiRulesReport({ bride, groom, lang = 'ta' }) {
  const result = evaluateAllThithiAndMudakkuRules(bride, groom);
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
          <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/40 text-cyan-400 shadow-lg">
            <Moon className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-400">
                {lang === 'ta' ? 'சுவடி சாஸ்திர திதி விதிகள்' : 'Palm-Leaf Tithi Rules'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono">
                {totalRules} Classical Rules
              </span>
            </div>
            <h3 className="text-xl font-black text-amber-100 flex items-center gap-2">
              <span>{lang === 'ta' ? 'சுவடி சாஸ்திர 4 திதி & முடக்கு விதிகள்' : '4 Classical Tithi & Mudakku Manuscript Rules'}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'ta' 
                ? '4, 8, 14 திதி சரிக்கைக் கூடாது, ஏக ஜன்ம திதி, பெண் முடக்கு அதிபதி & துவாதசி-அமாவாசை/பௌர்ணமி சுவடி விதிகள்'
                : '4-8-14 Riktha, Eka Janma Tithi, Bride Mudakku Lord in Groom Rasi/Lagna & Thuvadasi-Amavasya/Pournami Rules'}
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
            <div className="text-slate-400 text-[10px] uppercase font-bold">{lang === 'ta' ? 'கவன எச்சரிக்கை' : 'Warnings'}</div>
            <div className="text-amber-300 font-extrabold text-sm">{warningCount}</div>
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
          <div>
            <div className="text-slate-400 text-[10px] uppercase font-bold">{lang === 'ta' ? 'விதி விலக்கு' : 'Critical'}</div>
            <div className="text-rose-300 font-extrabold text-sm">{criticalCount}</div>
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-yellow-400 shrink-0" />
          <div>
            <div className="text-slate-400 text-[10px] uppercase font-bold">{lang === 'ta' ? 'சுவடி சாஸ்திரம்' : 'Manuscript'}</div>
            <div className="text-yellow-300 font-extrabold text-sm">100% பாரம்பரியம்</div>
          </div>
        </div>
      </div>

      {/* All 4 Individual Rule Cards */}
      <div className="space-y-4 pt-2">
        {rulesList.map((rule, idx) => {
          const isExpanded = expandedRule === idx || rule.status !== 'PASS';
          const isCritical = rule.status === 'CRITICAL';
          const isWarn = rule.status === 'WARN';

          return (
            <div 
              key={idx}
              className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                isCritical
                  ? 'bg-gradient-to-r from-rose-950/30 via-slate-950 to-slate-950 border-rose-500/40 shadow-rose-950/20'
                  : isWarn
                  ? 'bg-gradient-to-r from-amber-950/30 via-slate-950 to-slate-950 border-amber-500/40 shadow-amber-950/20'
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
                      : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {isCritical ? <ShieldAlert className="w-5 h-5" /> :
                     isWarn ? <AlertTriangle className="w-5 h-5" /> :
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
                        : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    }`}>
                      {lang === 'ta' ? rule.statusTextTa : rule.statusTextEn}
                    </span>
                  </div>

                  {/* Manuscript Citation Box */}
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

                  {/* Technical Indicators */}
                  {rule.bTithi && rule.gTithi && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-[11px]">
                      <div>
                        <span className="text-slate-400 block">பெண் ஜன்ம திதி:</span>
                        <strong className="text-rose-300 text-xs font-bold">{rule.bTithi.fullNameTa} (#{rule.bTithi.number})</strong>
                        <div className="text-[10px] text-slate-400">{rule.bTithi.pakshaTa}</div>
                      </div>
                      <div>
                        <span className="text-slate-400 block">ஆண் ஜன்ம திதி:</span>
                        <strong className="text-amber-300 text-xs font-bold">{rule.gTithi.fullNameTa} (#{rule.gTithi.number})</strong>
                        <div className="text-[10px] text-slate-400">{rule.gTithi.pakshaTa}</div>
                      </div>
                    </div>
                  )}

                  {rule.bMudakku && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-[11px]">
                      <div>
                        <span className="text-slate-400 block">பெண் முடக்கு விவரம்:</span>
                        <strong className="text-rose-300 text-xs">அதிபதி: {rule.bMudakku.mudakkuLordTa}</strong> ({rule.bMudakku.mudakkuRasiNameTa})
                      </div>
                      <div>
                        <span className="text-slate-400 block">ஆண் ஜாதகத்தில் நிலை:</span>
                        <strong className={`${rule.hasConflict ? 'text-rose-400' : 'text-emerald-400'} text-xs`}>
                          {rule.hasConflict ? '🛑 ராசி அல்லது லக்கினத்தில் வரக்கூடாது' : '✅ ராசி/லக்கினத்தில் அமையவில்லை (சுபம்)'}
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

      {/* Astrological Notes Box */}
      <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-4 text-xs space-y-2 text-amber-200/90">
        <div className="font-bold text-amber-400 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          <span>{lang === 'ta' ? 'சுவடி சாஸ்திர குறிப்புகள் (Manuscript Rules):' : 'Manuscript Rules:'}</span>
        </div>
        <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px] leading-relaxed">
          <li><strong>4, 8, 14 திதி சரிக்கைக் கூடாது:</strong> 4 (சதுர்த்தி), 8 (அஷ்டமி), 14 (சதுர்தசி) ஆகிய உக்கிர ரிக்தா திதிகளில் பிறந்த ஆணுக்கோ பெண்ணுக்கோ பொருத்தம் சரிக்கைக் கூடாது (திருமணம் தவிர்க்கப்பட வேண்டும்).</li>
          <li><strong>ஏக ஜன்ம திதி விலக்கு:</strong> ஆண் மற்றும் பெண் இருவருக்கும் ஒரே ஜன்ம திதி இருக்கக்கூடாது (ஏக திதி தோஷம்). ஒரே திதி அமைந்தால் வம்ச விருத்தி, தம்பதியர் ஒற்றுமை குறையும் என்பதால் தவிர்க்கப்பட வேண்டும்.</li>
          <li><strong>பெண் முடக்கு அதிபதி ஆண் ராசி/லக்னம் விலக்கு:</strong> பெண்ணின் முடக்கு அதிபதி கிரகமானது ஆணின் சந்திர ராசியிலோ அல்லது லக்கினத்திலோ அமரக்கூடாது, மற்றும் ஆணின் ராசி நாதனாகவோ லக்ன நாதனாகவோ வரக்கூடாது. இது ஆணின் வாழ்வாதாரத்தை முடக்கும்.</li>
          <li><strong>பெண் துவாதசி - ஆண் அமாவாசை/பௌர்ணமி விலக்கு:</strong> துவாதசி (12-வது திதி) திதியில் பிறந்த பெண்ணிற்கு, அமாவாசை அல்லது பௌர்ணமி திதியில் பிறந்த ஆணைத் திருமணம் செய்யக்கூடாது.</li>
        </ul>
      </div>

    </div>
  );
}

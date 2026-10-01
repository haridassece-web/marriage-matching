import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, CheckCircle2, Info, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { calculate9ThirumanaDhosamsAnalysis } from '../../rules/dosha/marriageDoshaRules';

export default function ThirumanaDhosamReport({ bride, groom, lang }) {
  const [expandedId, setExpandedId] = useState(null);

  const analysis = calculate9ThirumanaDhosamsAnalysis(bride, groom);
  const { brideDhosams, groomDhosams, isBalanceMatched, imbalanceWarnings } = analysis;

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-slate-900/90 border border-amber-500/20 rounded-3xl p-6 shadow-xl space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-amber-200 flex items-center gap-2">
              <span>{lang === 'ta' ? '9 வித திருமண தோஷங்கள் தனிப்பகுப்பாய்வு' : '9 Distinct Marriage Doshas Analysis'}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono">
                9 Dhosam Engine
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'ta' ? 'பாரம்பரிய சுவடி ஜோதிட விதிகள் படி 9 திருமண தோஷங்கள் மற்றும் சமநிலை ஆய்வு' : 'Traditional palm-leaf rules for 9 Marriage Doshas & Dosha Samyam'}
            </p>
          </div>
        </div>

        {/* Dosha Balance Badge */}
        <div className={`px-4 py-2 rounded-2xl text-xs font-bold border flex items-center gap-2 ${
          isBalanceMatched
            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
            : 'bg-rose-500/15 border-rose-500/40 text-rose-300'
        }`}>
          {isBalanceMatched ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-rose-400" />}
          <span>
            {isBalanceMatched
              ? (lang === 'ta' ? 'தோஷ சமநிலை உத்தமம் (Balanced)' : 'Dosha Samyam Balanced')
              : (lang === 'ta' ? '⚠️ தோஷ சமநிலை இல்லை (Imbalanced)' : '⚠️ Dosha Imbalance Alert')}
          </span>
        </div>
      </div>

      {/* Traditional Tamil Rules Summary Box */}
      <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-4 text-xs space-y-2 text-amber-200/90">
        <div className="font-bold text-amber-400 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          <span>{lang === 'ta' ? 'பாரம்பரிய திருமண தோஷ சாஸ்திர விதிகள் (Traditional Rules):' : 'Traditional Astrological Principles:'}</span>
        </div>
        <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px] leading-relaxed">
          <li><strong>செவ்வாய் தோஷம்:</strong> பெண்ணிற்கு தோஷம் இருந்தால் ஆணிற்கும் கட்டாயம் தோஷம் இருக்க வேண்டும். (ஆணிற்கு இருந்தால் பெண்ணிற்கு இருக்க வேண்டும் என்று கட்டாயமில்லை).</li>
          <li><strong>சர்ப்ப தோஷம் (ராகு/கேது):</strong> பெண்ணிற்கு 7, 8-ல் ராகு/கேது இருந்தால் ஆணிற்கும் 7, 8-ல் ராகு/கேது அமைய வேண்டும்.</li>
          <li><strong>நிவர்த்தி விதிகள்:</strong> மேஷம், தனுசு, கடகம், விருச்சிகம், மீனம் ராசிகளில் செவ்வாய் அமர்வது மற்றும் ஆட்சி, உச்சம் பெறுவது தோஷ நிவர்த்தி தரும்.</li>
        </ul>
      </div>

      {/* Imbalance Alerts */}
      {imbalanceWarnings.length > 0 && (
        <div className="space-y-2">
          {imbalanceWarnings.map((w, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs font-semibold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{lang === 'ta' ? w.msgTa : w.msgEn}</span>
            </div>
          ))}
        </div>
      )}

      {/* 9 Dhosam Comparative List */}
      <div className="space-y-3">
        {brideDhosams.map((bDosha, index) => {
          const gDosha = groomDhosams[index];
          const isExpanded = expandedId === bDosha.id;

          const bPresent = bDosha.status === 'PRESENT';
          const gPresent = gDosha.status === 'PRESENT';
          const bCancelled = bDosha.status === 'CANCELLED';
          const gCancelled = gDosha.status === 'CANCELLED';

          return (
            <div
              key={bDosha.id}
              className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                (bPresent || gPresent)
                  ? 'bg-slate-900 border-amber-500/30'
                  : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              {/* Row Header */}
              <div
                onClick={() => toggleExpand(bDosha.id)}
                className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-800/30 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-slate-500 w-5">{index + 1}.</span>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {lang === 'ta' ? bDosha.nameTa : bDosha.nameEn}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {lang === 'ta' ? bDosha.matchingRuleTa : bDosha.matchingRuleEn}
                    </p>
                  </div>
                </div>

                {/* Status Indicators for Bride & Groom */}
                <div className="flex items-center gap-2 shrink-0 text-xs">
                  {/* Bride Badge */}
                  <div className={`px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1 ${
                    bPresent
                      ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                      : bCancelled
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}>
                    <span className="text-[10px] opacity-75 font-normal">பெண்:</span>
                    <span>{bPresent ? 'தோஷம் உண்டு' : bCancelled ? 'நிவர்த்தி' : 'இல்லை'}</span>
                  </div>

                  {/* Groom Badge */}
                  <div className={`px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1 ${
                    gPresent
                      ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                      : gCancelled
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}>
                    <span className="text-[10px] opacity-75 font-normal">ஆண்:</span>
                    <span>{gPresent ? 'தோஷம் உண்டு' : gCancelled ? 'நிவர்த்தி' : 'இல்லை'}</span>
                  </div>

                  <button className="text-slate-400 hover:text-white p-1 ml-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expandable Details */}
              {isExpanded && (
                <div className="px-5 py-4 bg-slate-950 border-t border-slate-800 space-y-3 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Bride Details */}
                    <div className="bg-slate-900 p-3 rounded-xl border border-rose-500/20 space-y-1">
                      <span className="text-rose-300 font-bold block text-[11px]">
                        பெண் ஜாதக பலன் ({bride.name || 'Bride'}):
                      </span>
                      <p className="text-slate-300">{lang === 'ta' ? bDosha.explanationTa : bDosha.explanationEn}</p>
                    </div>

                    {/* Groom Details */}
                    <div className="bg-slate-900 p-3 rounded-xl border border-amber-500/20 space-y-1">
                      <span className="text-amber-300 font-bold block text-[11px]">
                        ஆண் ஜாதக பலன் ({groom.name || 'Groom'}):
                      </span>
                      <p className="text-slate-300">{lang === 'ta' ? gDosha.explanationTa : gDosha.explanationEn}</p>
                    </div>

                  </div>

                  <div className="bg-amber-950/20 p-3 rounded-xl border border-amber-500/20 text-amber-300/90 text-[11px]">
                    <span className="font-bold block mb-0.5">சாஸ்திர சமநிலை விதி (Matching Principle):</span>
                    <p>{lang === 'ta' ? bDosha.matchingRuleTa : bDosha.matchingRuleEn}</p>
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

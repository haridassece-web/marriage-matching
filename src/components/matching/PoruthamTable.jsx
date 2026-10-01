import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertCircle, ChevronDown, ChevronUp, Info, ShieldAlert } from 'lucide-react';
import { PORUTHAM_DESCRIPTIONS_TA } from '../../explanations/tamil/explanationsTa';
import { PORUTHAM_DESCRIPTIONS_EN } from '../../explanations/english/explanationsEn';

export default function PoruthamTable({ results, lang }) {
  const [filter, setFilter] = useState('ALL'); // ALL, PASS, FAIL, CRITICAL
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredResults = results.filter(r => {
    if (filter === 'PASS') return r.status === 'PASS' || r.status === 'PARTIAL';
    if (filter === 'FAIL') return r.status === 'FAIL';
    if (filter === 'CRITICAL') return r.importance === 'CRITICAL';
    return true;
  });

  return (
    <div className="bg-slate-900/90 border border-amber-500/20 rounded-3xl p-6 shadow-xl space-y-6">
      
      {/* Header & Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-amber-200 flex items-center gap-2">
            <span>{lang === 'ta' ? '11 பொருத்தம் விவரிப்பு அட்டவணை' : '11 Porutham Detailed Breakdown'}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono">
              {results.filter(r => r.status === 'PASS').length} / {results.length} Pass
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'ta' ? 'ஒவ்வொரு பொருத்தத்தின் சாஸ்திர கணிதம் மற்றும் பலன்கள்' : 'Astrological rule applied and traditional explanations'}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1 rounded-lg font-medium transition ${filter === 'ALL' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            {lang === 'ta' ? 'அனைத்தும் (All)' : 'All (11)'}
          </button>
          <button
            onClick={() => setFilter('PASS')}
            className={`px-3 py-1 rounded-lg font-medium transition ${filter === 'PASS' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            {lang === 'ta' ? 'பொருந்தும்' : 'Pass'}
          </button>
          <button
            onClick={() => setFilter('FAIL')}
            className={`px-3 py-1 rounded-lg font-medium transition ${filter === 'FAIL' ? 'bg-rose-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            {lang === 'ta' ? 'பொருந்தாது' : 'Fail'}
          </button>
          <button
            onClick={() => setFilter('CRITICAL')}
            className={`px-3 py-1 rounded-lg font-medium transition ${filter === 'CRITICAL' ? 'bg-orange-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            {lang === 'ta' ? 'முக்கிய பொருத்தங்கள்' : 'Critical'}
          </button>
        </div>
      </div>

      {/* Table List */}
      <div className="space-y-3">
        {filteredResults.map((r, index) => {
          const isExpanded = expandedId === r.id;
          const taDesc = PORUTHAM_DESCRIPTIONS_TA[r.id] || {};
          const enDesc = PORUTHAM_DESCRIPTIONS_EN[r.id] || {};

          const isPass = r.status === 'PASS';
          const isPartial = r.status === 'PARTIAL';
          const isFail = r.status === 'FAIL';
          const isCritical = r.importance === 'CRITICAL';

          return (
            <div
              key={r.id}
              className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                isCritical && isFail
                  ? 'bg-rose-950/20 border-rose-500/50'
                  : isPass
                  ? 'bg-slate-950/60 border-slate-800 hover:border-amber-500/30'
                  : 'bg-slate-950/80 border-slate-800'
              }`}
            >
              {/* Row Header */}
              <div
                onClick={() => toggleExpand(r.id)}
                className="p-4 flex items-center justify-between gap-4 cursor-pointer select-none hover:bg-slate-800/30 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-slate-500 w-5">{index + 1}.</span>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">
                        {lang === 'ta' ? r.nameTa : r.nameEn}
                      </h4>
                      {isCritical && (
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 font-semibold flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3" />
                          {lang === 'ta' ? 'முக்கிய பொருத்தம்' : 'Critical'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {lang === 'ta' ? r.explanationTa : r.explanationEn}
                    </p>
                  </div>
                </div>

                {/* Right Status Pill & Toggle */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border shadow-sm ${
                    isPass
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                      : isPartial
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                      : 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                  }`}>
                    {isPass && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    {isPartial && <AlertCircle className="w-3.5 h-3.5 text-amber-400" />}
                    {isFail && <XCircle className="w-3.5 h-3.5 text-rose-400" />}
                    <span>
                      {isPass
                        ? (lang === 'ta' ? 'உத்தமம் (Pass)' : 'Pass')
                        : isPartial
                        ? (lang === 'ta' ? 'மத்தியமம்' : 'Partial')
                        : (lang === 'ta' ? 'பொருந்தாது' : 'Fail')}
                    </span>
                    <span className="text-[10px] opacity-75 font-mono ml-1">({r.score}/{r.maxScore})</span>
                  </div>

                  <button className="text-slate-400 hover:text-white p-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expandable Details */}
              {isExpanded && (
                <div className="px-5 py-4 bg-slate-950 border-t border-slate-800 space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-slate-400 block font-semibold text-[11px] mb-1">
                        {lang === 'ta' ? 'கணித விவரிப்பு (Applied Calculation)' : 'Applied Calculation:'}
                      </span>
                      <p className="text-amber-300 font-mono">{r.ruleApplied}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block font-semibold text-[11px] mb-1">
                        {lang === 'ta' ? 'சாஸ்திர நோக்கம் (Purpose)' : 'Astrological Purpose:'}
                      </span>
                      <p className="text-slate-300">{lang === 'ta' ? taDesc.purpose : enDesc.purpose}</p>
                    </div>
                  </div>

                  <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-3 text-amber-200/90">
                    <span className="font-bold block mb-1 flex items-center gap-1 text-amber-400">
                      <Info className="w-3.5 h-3.5" />
                      {lang === 'ta' ? 'பாரம்பரிய ஜோதிட விளக்கம்:' : 'Traditional Explanation:'}
                    </span>
                    <p>{lang === 'ta' ? taDesc.tradition : enDesc.tradition}</p>
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

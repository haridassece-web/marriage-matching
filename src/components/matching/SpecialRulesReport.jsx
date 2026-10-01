import React from 'react';
import { ShieldAlert, ShieldCheck, CheckCircle2, AlertTriangle, Info, BookOpen, Sparkles, Award } from 'lucide-react';
import { evaluateSpecialMarriageRules } from '../../rules/jathagam/specialRulesEngine';

export default function SpecialRulesReport({ bride, groom, lang }) {
  const result = evaluateSpecialMarriageRules(bride, groom);
  const { vainasikaAnalysis, maturityAnalysis, yoni8thHouse, marsStarMandatory } = result;

  return (
    <div className="bg-slate-900/90 border border-amber-500/20 rounded-3xl p-6 shadow-xl space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-amber-200 flex items-center gap-2">
              <span>{lang === 'ta' ? 'சிறப்பு திருமண விதிகள் & மெய்ச்சூரிட்டி பொருத்தம்' : 'Special Marriage Rules & Maturity Analysis'}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-mono">
                Special Rules
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'ta' ? '22-வது நட்சத்திர வைநாசிக தோஷம், 8-ம் இட யோனி ஆய்வு & மெய்ச்சூரிட்டி பொருத்தம்' : '22nd Star Vainasika Dosha, 8th House Yoni & Family Responsibility'}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className={`px-4 py-2 rounded-2xl text-xs font-bold border flex items-center gap-2 ${
          !vainasikaAnalysis.isVainasikaDosham
            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
            : 'bg-rose-500/15 border-rose-500/40 text-rose-300'
        }`}>
          {!vainasikaAnalysis.isVainasikaDosham
            ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            : <AlertTriangle className="w-4 h-4 text-rose-400" />}
          <span>
            {!vainasikaAnalysis.isVainasikaDosham
              ? (lang === 'ta' ? 'வைநாசிக தோஷம் இல்லை' : 'No Vainasika Dosha')
              : (lang === 'ta' ? '⚠️ வைநாசிக தோஷம் உண்டு' : '⚠️ Vainasika Dosha Present')}
          </span>
        </div>
      </div>

      {/* Section 1: 22nd Star Vainasika Dosha */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>1. {lang === 'ta' ? '22-வது நட்சத்திர வைநாசிக தோஷம் (Vainasika Dosha Check)' : '22nd Star Vainasika Dosha'}</span>
          </h4>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
            vainasikaAnalysis.isVainasikaDosham
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
              : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
          }`}>
            {lang === 'ta' ? vainasikaAnalysis.explanationTa : vainasikaAnalysis.explanationEn}
          </span>
        </div>
      </div>

      {/* Section 2: Family Maturity & Responsibility */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>2. {lang === 'ta' ? 'மெய்ச்சூரிட்டி பொருத்தம் (Family Responsibility & Maturity)' : 'Maturity & Family Responsibility'}</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-900 p-4 rounded-xl border border-rose-500/20 space-y-1">
            <span className="text-rose-300 font-bold block">
              {lang === 'ta' ? 'பெண் குடும்ப பொறுப்புணர்வு:' : 'Bride Family Maturity:'}
            </span>
            <p className="text-slate-200">{maturityAnalysis.brideMaturity.labelTa}</p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-amber-500/20 space-y-1">
            <span className="text-amber-300 font-bold block">
              {lang === 'ta' ? 'ஆண் குடும்ப பொறுப்புணர்வு:' : 'Groom Family Maturity:'}
            </span>
            <p className="text-slate-200">{maturityAnalysis.groomMaturity.labelTa}</p>
          </div>
        </div>
      </div>

      {/* Section 3: 8th House Planetary Yoni Analysis */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-yellow-400" />
          <span>3. {lang === 'ta' ? '8-ம் பாவக யோனி இணக்க ஆய்வு (8th House Yoni Analysis)' : '8th House Yoni Analysis'}</span>
        </h4>

        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
          <p>{lang === 'ta' ? yoni8thHouse.explanationTa : yoni8thHouse.explanationEn}</p>
        </div>
      </div>

      {/* Astrological Notes Box */}
      <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-4 text-xs space-y-2 text-amber-200/90">
        <div className="font-bold text-amber-400 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          <span>{lang === 'ta' ? 'சுவடி சாஸ்திர குறிப்புகள் (Manuscript Rules):' : 'Manuscript Rules:'}</span>
        </div>
        <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px] leading-relaxed">
          <li><strong>22-வது நட்சத்திரம்:</strong> பெண்ணின் நட்சத்திரத்திலிருந்து 22-வது நட்சத்திரம் ஆண் நட்சத்திரமாக வரக்கூடாது (வைநாசிக தோஷம்).</li>
          <li><strong>8-ம் பாவக யோனி:</strong> லக்னத்திற்கு 8-ம் இடம் தான் சரீர தாம்பத்திய யோனியை தீர்மானிக்கிறது.</li>
          <li><strong>லக்னாதிபதி நிலை:</strong> 1, 2, 3, 4-ல் லக்னாதிபதி அமைவது குடும்பப் பொறுப்பை 100% ஏற்கச் செய்யும்.</li>
        </ul>
      </div>

    </div>
  );
}

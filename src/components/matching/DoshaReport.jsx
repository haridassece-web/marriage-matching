import { ShieldAlert, ShieldCheck, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

export default function DoshaReport({ doshaAnalysis, bride, groom, lang }) {
  const { brideKuja, groomKuja, kujaMatchStatus, kujaExplanationTa, kujaExplanationEn } = doshaAnalysis;

  return (
    <div className="bg-slate-900/90 border border-amber-500/20 rounded-3xl p-6 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
        <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-amber-200">
            {lang === 'ta' ? 'தோஷ பகுப்பாய்வு & தோஷ சாம்யம்' : 'Dosha Analysis & Matching Balance'}
          </h3>
          <p className="text-xs text-slate-400">
            {lang === 'ta' ? 'செவ்வாய், ரஜ்ஜு, வேதா மற்றும் நாடி தோஷ ஆய்வுகள்' : 'Detailed evaluation of Sevvai/Manglik, Rajju, Vedha & Nadi Doshas'}
          </p>
        </div>
      </div>

      {/* Sevvai Dosha Matching Card */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <span>🔥 {lang === 'ta' ? 'செவ்வாய் தோஷ நிலை (Sevvai / Manglik Dosha)' : 'Sevvai / Manglik Dosha Status'}</span>
          </h4>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
            doshaAnalysis.isSafeForMarriage
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : 'bg-amber-500/20 border-amber-500/40 text-amber-300'
          }`}>
            {lang === 'ta' ? kujaExplanationTa : kujaExplanationEn}
          </span>
        </div>

        {/* Bride & Groom Sevvai Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Bride Sevvai */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-300">
                {lang === 'ta' ? 'பெண் செவ்வாய் நிலை' : 'Bride Mars Position'}
              </span>
              <span className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                brideKuja.hasDosha
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : brideKuja.isCancelled
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400'
              }`}>
                {brideKuja.hasDosha
                  ? (lang === 'ta' ? 'தோஷம் உண்டு' : 'Dosha Present')
                  : brideKuja.isCancelled
                  ? (lang === 'ta' ? 'தோஷ நிவர்த்தி' : 'Exempt / Cancelled')
                  : (lang === 'ta' ? 'தோஷம் இல்லை' : 'No Dosha')}
              </span>
            </div>
            <p className="text-slate-300">{lang === 'ta' ? brideKuja.explanationTa : brideKuja.explanationEn}</p>
          </div>

          {/* Groom Sevvai */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300">
                {lang === 'ta' ? 'ஆண் செவ்வாய் நிலை' : 'Groom Mars Position'}
              </span>
              <span className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                groomKuja.hasDosha
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : groomKuja.isCancelled
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400'
              }`}>
                {groomKuja.hasDosha
                  ? (lang === 'ta' ? 'தோஷம் உண்டு' : 'Dosha Present')
                  : groomKuja.isCancelled
                  ? (lang === 'ta' ? 'தோஷ நிவர்த்தி' : 'Exempt / Cancelled')
                  : (lang === 'ta' ? 'தோஷம் இல்லை' : 'No Dosha')}
              </span>
            </div>
            <p className="text-slate-300">{lang === 'ta' ? groomKuja.explanationTa : groomKuja.explanationEn}</p>
          </div>

        </div>
      </div>

    </div>
  );
}

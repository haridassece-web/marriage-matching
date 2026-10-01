import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, CheckCircle2, AlertTriangle, Info, BookOpen, Sparkles, Heart } from 'lucide-react';
import { evaluateKattaPorutham } from '../../rules/jathagam/kattaPoruthamRules';
import { evaluateMudakkuRules } from '../../rules/jathagam/mudakkuRules';

export default function KattaPoruthamReport({ bride, groom, lang }) {
  const result = evaluateKattaPorutham(bride, groom);
  const mudakkuResult = evaluateMudakkuRules(bride, groom);
  
  const { badhakaAnalysis, lagnaAlignment, marriageYoga } = result;
  const { brideMudakku, groomMudakku, isSameMudakkuLord, hasMudakkuConflict } = mudakkuResult;

  return (
    <div className="bg-slate-900/90 border border-amber-500/20 rounded-3xl p-6 shadow-xl space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-amber-200 flex items-center gap-2">
              <span>{lang === 'ta' ? 'கட்டப் பொருத்தம் & முடக்கு அதிபதி ஆய்வுகள்' : 'Grid & Mudakku Adhipathi Analysis'}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono">
                Mudakku & Katta
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'ta' ? 'முடக்கு ராசி, முடக்கு அதிபதி, பாதக லக்னம் & 6-8 ஷஷ்டாஷ்டக ஆய்வுகள்' : 'Mudakku Rasi, Mudakku Adhipathi, Badhaka signs & 6-8 Sashtashtaka Lagna rules'}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className={`px-4 py-2 rounded-2xl text-xs font-bold border flex items-center gap-2 ${
          !badhakaAnalysis.hasBadhakaMismatch && !lagnaAlignment.isLagnaSashtashtaka && !hasMudakkuConflict
            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
            : 'bg-amber-500/15 border-amber-500/40 text-amber-300'
        }`}>
          {!badhakaAnalysis.hasBadhakaMismatch && !lagnaAlignment.isLagnaSashtashtaka && !hasMudakkuConflict
            ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            : <AlertTriangle className="w-4 h-4 text-amber-400" />}
          <span>
            {!badhakaAnalysis.hasBadhakaMismatch && !lagnaAlignment.isLagnaSashtashtaka && !hasMudakkuConflict
              ? (lang === 'ta' ? 'கட்டப் பொருத்தம் உத்தமம்' : 'Grid Alignment Excellent')
              : (lang === 'ta' ? 'கட்டப் பொருத்தத்தில் கவனம் தேவை' : 'Grid Alignment Requires Attention')}
          </span>
        </div>
      </div>

      {/* NEW SECTION: Mudakku Rasi & Mudakku Adhipathi Analysis */}
      <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>1. {lang === 'ta' ? 'முடக்கு ராசி & முடக்கு அதிபதி ஆய்வு (Mudakku Adhipathi Rule)' : 'Mudakku Rasi & Mudakku Adhipathi Analysis'}</span>
          </h4>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
            hasMudakkuConflict
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
              : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
          }`}>
            {hasMudakkuConflict
              ? (lang === 'ta' ? '⚠️ முடக்கு அதிபதி முரண்' : '⚠️ Mudakku Conflict')
              : (lang === 'ta' ? '✅ முடக்கு அதிபதி சுபம்' : '✅ Safe Mudakku Alignment')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-900/80 p-3 rounded-xl border border-slate-800">
          <div className="space-y-1.5">
            <span className="text-rose-300 font-bold block">
              {lang === 'ta' ? 'பெண் முடக்கு விவரங்கள் (Bride Mudakku):' : 'Bride Mudakku Details:'}
            </span>
            <div className="text-slate-200 leading-relaxed space-y-0.5 text-[11px]">
              {brideMudakku.sunStarNameTa && (
                <div>சூரியன் நின்ற நட்சத்திரம்: <strong className="text-amber-300">{brideMudakku.sunStarNameTa}</strong></div>
              )}
              <div>மூலம் வரை எண்ணிக்கை: <strong className="text-cyan-300">{brideMudakku.countToMoolam}</strong> (பூராடத்திலிருந்து எண்ணிய நட்சத்திரம்)</div>
              <div>முடக்கு நட்சத்திரம்: <strong className="text-pink-400">{brideMudakku.mudakkuStarNameTa} ({brideMudakku.mudakkuStarNameEn})</strong></div>
              <div>முடக்கு ராசி: <strong className="text-amber-400">{brideMudakku.mudakkuRasiNameTa}</strong> ({brideMudakku.houseFromLagna}-ஆம் இடம்)</div>
              <div>முடக்கு அதிபதி: <strong className="text-rose-400">{brideMudakku.mudakkuLordTa}</strong></div>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-amber-300 font-bold block">
              {lang === 'ta' ? 'ஆண் முடக்கு விவரங்கள் (Groom Mudakku):' : 'Groom Mudakku Details:'}
            </span>
            <div className="text-slate-200 leading-relaxed space-y-0.5 text-[11px]">
              {groomMudakku.sunStarNameTa && (
                <div>சூரியன் நின்ற நட்சத்திரம்: <strong className="text-amber-300">{groomMudakku.sunStarNameTa}</strong></div>
              )}
              <div>மூலம் வரை எண்ணிக்கை: <strong className="text-cyan-300">{groomMudakku.countToMoolam}</strong> (பூராடத்திலிருந்து எண்ணிய நட்சத்திரம்)</div>
              <div>முடக்கு நட்சத்திரம்: <strong className="text-cyan-400">{groomMudakku.mudakkuStarNameTa} ({groomMudakku.mudakkuStarNameEn})</strong></div>
              <div>முடக்கு ராசி: <strong className="text-amber-400">{groomMudakku.mudakkuRasiNameTa}</strong> ({groomMudakku.houseFromLagna}-ஆம் இடம்)</div>
              <div>முடக்கு அதிபதி: <strong className="text-amber-400">{groomMudakku.mudakkuLordTa}</strong></div>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-amber-950/20 p-3 rounded-xl border border-amber-500/20">
          {lang === 'ta' ? mudakkuResult.explanationTa : mudakkuResult.explanationEn}
        </p>
      </div>

      {/* Grid Section 2: Badhaka Analysis */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-orange-400" />
            <span>2. {lang === 'ta' ? 'பாதக லக்னம் & பாதக ராசி ஆய்வு (Badhaka Sign Safety)' : 'Badhaka Sign Safety Analysis'}</span>
          </h4>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
            badhakaAnalysis.hasBadhakaMismatch
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
              : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
          }`}>
            {badhakaAnalysis.hasBadhakaMismatch
              ? (lang === 'ta' ? '⚠️ பாதக சேர்க்கை உண்டு' : '⚠️ Badhaka Mismatch')
              : (lang === 'ta' ? '✅ பாதக சேர்க்கை இல்லை' : '✅ Safe Badhaka Alignment')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-900/80 p-3 rounded-xl border border-slate-800">
          <div>
            <span className="text-rose-300 font-semibold block">
              {lang === 'ta' ? 'பெண் லக்னம் & பாதக ராசி:' : 'Bride Lagna & Badhaka Sign:'}
            </span>
            <p className="text-slate-300">
              {badhakaAnalysis.bLagnaName} லக்னம் ➔ பாதக ராசி: <strong className="text-amber-400">{badhakaAnalysis.bBadhakaName}</strong>
            </p>
          </div>

          <div>
            <span className="text-amber-300 font-semibold block">
              {lang === 'ta' ? 'ஆண் லக்னம் & பாதக ராசி:' : 'Groom Lagna & Badhaka Sign:'}
            </span>
            <p className="text-slate-300">
              {badhakaAnalysis.gLagnaName} லக்னம் ➔ பாதக ராசி: <strong className="text-amber-400">{badhakaAnalysis.gBadhakaName}</strong>
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-amber-950/20 p-3 rounded-xl border border-amber-500/20">
          {lang === 'ta' ? badhakaAnalysis.explanationTa : badhakaAnalysis.explanationEn}
        </p>
      </div>

      {/* Grid Section 3: Lagna Positioning & Sashtashtaka */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-yellow-400" />
          <span>3. {lang === 'ta' ? 'லக்ன நிலைகளும் ஷஷ்டாஷ்டக ஆய்வும் (Lagna Alignment)' : 'Lagna Alignment Analysis'}</span>
        </h4>

        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
          <div className="flex items-center justify-between">
            <span>{lang === 'ta' ? 'பெண் லக்னத்திலிருந்து ஆண் லக்ன எண்ணிக்கை:' : 'Groom Lagna count from Bride:'}</span>
            <span className="font-mono font-bold text-amber-400">{lagnaAlignment.lagnaCount}-வது லக்னம்</span>
          </div>
          <p>{lang === 'ta' ? lagnaAlignment.explanationTa : lagnaAlignment.explanationEn}</p>
        </div>
      </div>

      {/* Astrological Manuscript Excerpt Note */}
      <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-4 text-xs space-y-2 text-amber-200/90">
        <div className="font-bold text-amber-400 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          <span>{lang === 'ta' ? 'முடக்கு சாஸ்திர பொன்மொழிகள் (Mudakku Rules):' : 'Mudakku Manuscript Rules:'}</span>
        </div>
        <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px] leading-relaxed">
          <li><strong>முடக்கு அதிபதி விதி:</strong> "இரண்டு பேரில் - முடக்கதிபதியும் ஒன்றாக இருக்கக்கூடாது."</li>
          <li><strong>9/10 முடக்கு விதி:</strong> "பெண்ணிற்கு 9-ம் இடம் முடக்கும், ஆணிற்கு 10-ம் இடம் முடக்கும் இருக்கும் ஜாதகத்தை இணைக்கக் கூடாது."</li>
        </ul>
      </div>

    </div>
  );
}

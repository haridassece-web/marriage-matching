import React from 'react';
import { ShieldAlert, ShieldCheck, CheckCircle2, AlertTriangle, Info, BookOpen, Sparkles, Award } from 'lucide-react';
import { evaluateSpecialMarriageRules } from '../../rules/jathagam/specialRulesEngine';

export default function SpecialRulesReport({ bride, groom, lang }) {
  const result = evaluateSpecialMarriageRules(bride, groom);
  const { vainasikaAnalysis, maturityAnalysis, yoni8thHouse, marsStarMandatory, sunStand48Days, thirdLordStarRule } = result;

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
              {lang === 'ta' ? '22-வது வைநாசிக தோஷம், 3-ம் அதிபதி நட்சத்திர சாரம், 48 நாட்கள் சூரிய நிலை & 8-ம் இட யோனி' : '22nd Vainasika Star, 3rd Lord Star, 48 Days Sun Stand & 8th House Yoni'}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className={`px-4 py-2 rounded-2xl text-xs font-bold border flex items-center gap-2 ${
          !vainasikaAnalysis.isVainasikaDosham && !sunStand48Days?.isSunWithin48Days && thirdLordStarRule?.isOverallGood
            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
            : 'bg-rose-500/15 border-rose-500/40 text-rose-300'
        }`}>
          {!vainasikaAnalysis.isVainasikaDosham && !sunStand48Days?.isSunWithin48Days && thirdLordStarRule?.isOverallGood
            ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            : <AlertTriangle className="w-4 h-4 text-rose-400" />}
          <span>
            {!vainasikaAnalysis.isVainasikaDosham && !sunStand48Days?.isSunWithin48Days && thirdLordStarRule?.isOverallGood
              ? (lang === 'ta' ? 'சிறப்பு விதிகள் உத்தமம்' : 'Special Rules Auspicious')
              : (lang === 'ta' ? '⚠️ சுவடி விதி எச்சரிக்கை' : '⚠️ Manuscript Rule Alert')}
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

      {/* Section 2: 3rd Lord Star Saram Rule (ஆணின் 3-ம் அதிபதி நட்சத்திர சாரம் & பெண் நட்சத்திர இணக்க விதி) */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>2. {lang === 'ta' ? '3-ம் அதிபதி நட்சத்திர சாரம் & பெண் நட்சத்திர இணக்க விதி (3rd Lord Star Saram Rule)' : '3rd Lord Star Saram Rule'}</span>
          </h4>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
            thirdLordStarRule?.isOverallGood
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
          }`}>
            {thirdLordStarRule?.isOverallGood
              ? (lang === 'ta' ? '✅ நட்சத்திர சார பொருத்தம் உத்தமம்' : '✅ 3rd Lord Star Auspicious')
              : (lang === 'ta' ? '⚠️ ஒரே நட்சத்திர சார தோஷம்' : '⚠️ Shared Star Conflict')}
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
          {lang === 'ta' ? thirdLordStarRule?.explanationTa : thirdLordStarRule?.explanationEn}
        </p>
      </div>

      {/* Section 3: 48 Days Sun Stand Avoidance Rule (சூரிய நிலை 48 நாட்கள் விலக்கு விதி) */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>3. {lang === 'ta' ? 'சூரிய நிலை 48 நாட்கள் விலக்கு விதி (Sun Stand 48 Days Avoidance Rule)' : 'Sun Stand 48 Days Avoidance Rule'}</span>
          </h4>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
            sunStand48Days?.isSunWithin48Days
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
              : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
          }`}>
            {sunStand48Days?.isSunWithin48Days
              ? (lang === 'ta' ? `⚠️ 48 நாட்கள் சூரிய தோஷம் (${sunStand48Days.sunDiffDays} நாட்கள்)` : `⚠️ Sun Gap < 48 Days (${sunStand48Days.sunDiffDays} days)`)
              : (lang === 'ta' ? `✅ சூரிய நிலை உத்தமம் (${sunStand48Days?.sunDiffDays || 0} நாட்கள்)` : `✅ Sun Gap Auspicious (${sunStand48Days?.sunDiffDays || 0} days)`)}
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
          {lang === 'ta' ? sunStand48Days?.explanationTa : sunStand48Days?.explanationEn}
        </p>
      </div>

      {/* Section 4: Family Maturity & Responsibility */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>4. {lang === 'ta' ? 'மெய்ச்சூரிட்டி பொருத்தம் (Family Responsibility & Maturity)' : 'Maturity & Family Responsibility'}</span>
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

      {/* Section 5: 8th House Planetary Yoni Analysis */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Info className="w-4 h-4 text-yellow-400" />
            <span>5. {lang === 'ta' ? '8-ம் பாவக கிரக யோனி இணக்க ஆய்வு (8th House Planetary Yoni Analysis)' : '8th House Planetary Yoni Analysis'}</span>
          </h4>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
            yoni8thHouse?.is8thYoniCompatible
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
          }`}>
            {yoni8thHouse?.is8thYoniCompatible
              ? (lang === 'ta' ? '✅ கிரக யோனி உத்தமம்' : '✅ Planetary Yoni Auspicious')
              : (lang === 'ta' ? '⚠️ கிரக யோனி முரண்' : '⚠️ Yoni Incompatible')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-900/80 p-3 rounded-xl border border-slate-800">
          <div>
            <span className="text-rose-300 font-bold block">
              {lang === 'ta' ? 'பெண் 8-ம் பாவக அதிபதி & யோனி:' : 'Bride 8th House Lord:'}
            </span>
            <p className="text-slate-200">
              8-ம் ராசி: <strong>{yoni8thHouse.b8thRasiName}</strong> | அதிபதி: <strong className="text-amber-400">{yoni8thHouse.b8thLord}</strong>
            </p>
          </div>

          <div>
            <span className="text-amber-300 font-bold block">
              {lang === 'ta' ? 'ஆண் 8-ம் பாவக அதிபதி & யோனி:' : 'Groom 8th House Lord:'}
            </span>
            <p className="text-slate-200">
              8-ம் ராசி: <strong>{yoni8thHouse.g8thRasiName}</strong> | அதிபதி: <strong className="text-amber-400">{yoni8thHouse.g8thLord}</strong>
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
          {lang === 'ta' ? yoni8thHouse.explanationTa : yoni8thHouse.explanationEn}
        </p>
      </div>

      {/* Astrological Notes Box */}
      <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-4 text-xs space-y-2 text-amber-200/90">
        <div className="font-bold text-amber-400 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          <span>{lang === 'ta' ? 'சுவடி சாஸ்திர குறிப்புகள் (Manuscript Rules):' : 'Manuscript Rules:'}</span>
        </div>
        <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px] leading-relaxed">
          <li><strong>8-ம் பாவக கிரக யோனி விதிகள்:</strong>
            <ul className="list-circle list-inside ml-4 space-y-0.5 text-slate-400 text-[10.5px]">
              <li>☀️ <strong>சூரிய யோனி:</strong> புதன், சுக்கிரன் இணக்கம் உத்தமம்.</li>
              <li>🌙 <strong>சந்திர யோனி:</strong> வளர்பிறைக்கு குரு உத்தமம்; தேய்பிறைக்கு புதன், சுக்கிரன் உத்தமம்.</li>
              <li>🔥 <strong>செவ்வாய் யோனி:</strong> சந்திரன், குரு இணக்கம் உத்தமம்.</li>
              <li>🟢 <strong>புதன் யோனி:</strong> மிதுன புதனிற்கு சனி (மகரம், கும்பம்) உத்தமம்; கன்னி புதனிற்கு செவ்வாய், சந்திரன் உத்தமம்.</li>
              <li>💖 <strong>சுக்கிர யோனி:</strong> சந்திரன், சூரியன் இணக்கம் உத்தமம்.</li>
              <li>👑 <strong>குரு யோனி:</strong> சனி தவிர மற்ற அனைத்து கிரகங்களும் யோனி பொருத்தம் தரும்.</li>
            </ul>
          </li>
          <li><strong>3-ம் அதிபதி நட்சத்திர சாரம்:</strong> ஆணின் 3-ம் பாவக அதிபதி புதன், சனி, கேது நட்சத்திர சாரங்களில் இருக்கக் கூடாது. அவ்வாறு இருந்தால், பெண்ணின் நட்சத்திர சாரம் அதே புதன்/சனி/கேது அமைப்பில் இல்லாமல் வேறுபட்டால் தோஷம் நிவர்த்தியாகி உத்தம சுப யோகம் தரும்.</li>
          <li><strong>சூரிய நிலை 48 நாட்கள் விலக்கு:</strong> பெண் பிறந்த நாளில் சூரியன் நின்ற இடத்திலிருந்து 48 நாட்களுக்கு முன்னும் 48 நாட்களுக்கு பின்னும் ஆண் சூரியன் அமைந்திருந்தால் (1 1/2 solar months / ~48°), ஒரே காலகட்ட கிரக தோஷத் தாக்கம் ஏற்படும் என்பதால் தவிர்க்கப்பட வேண்டும்.</li>
          <li><strong>22-வது நட்சத்திரம்:</strong> பெண்ணின் நட்சத்திரத்திலிருந்து 22-வது நட்சத்திரம் ஆண் நட்சத்திரமாக வரக்கூடாது (வைநாசிக தோஷம்).</li>
        </ul>
      </div>

    </div>
  );
}

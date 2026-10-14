import React from 'react';
import { ShieldAlert, ShieldCheck, CheckCircle2, AlertTriangle, Info, BookOpen, Sparkles, Award, Moon, Compass } from 'lucide-react';
import { evaluateSpecialMarriageRules } from '../../rules/jathagam/specialRulesEngine';
import { evaluateAllThithiAndMudakkuRules } from '../../rules/jathagam/thithiRules';

export default function SpecialRulesReport({ bride, groom, lang }) {
  const result = evaluateSpecialMarriageRules(bride, groom);
  const { vainasikaAnalysis, maturityAnalysis, yoni8thHouse, marsStarMandatory, sunStand48Days, thirdLordStarRule } = result;
  const thithiResult = evaluateAllThithiAndMudakkuRules(bride, groom);

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

      {/* Section 6: சுவடி சாஸ்திர 4 திதி & முடக்கு விதிகள் (Classical 4 Tithi & Mudakku Rules) */}
      <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>6. {lang === 'ta' ? 'சுவடி சாஸ்திர 4 திதி & முடக்கு விதிகள்' : '4 Classical Tithi & Mudakku Manuscript Rules'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono font-bold">
                  சுவடி சாஸ்திரம்
                </span>
              </h4>
              <p className="text-[11px] text-slate-400">
                {lang === 'ta' ? '4-8-14 திதி விலக்கு, ஏக ஜன்ம திதி, பெண் முடக்கு அதிபதி & துவாதசி-அமாவாசை/பௌர்ணமி விதிகள்' : '4-8-14 Riktha, Eka Tithi, Bride Mudakku Lord & Thuvadasi-Amavasya/Pournami Rules'}
              </p>
            </div>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-bold border shrink-0 ${
            thithiResult.criticalCount > 0
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
              : thithiResult.warningCount > 0
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
              : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
          }`}>
            {thithiResult.criticalCount > 0
              ? (lang === 'ta' ? '🛑 சுவடி விதி விலக்கு' : '🛑 Critical Obstacle')
              : thithiResult.warningCount > 0
              ? (lang === 'ta' ? '⚠️ கவன எச்சரிக்கை' : '⚠️ Warning')
              : (lang === 'ta' ? '✅ சுவடி விதிகள் உத்தமம்' : '✅ Auspicious')}
          </span>
        </div>

        {/* 4 Detailed Cards for the 4 Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          
          {/* Rule 1 Card: 4, 8, 14 Tithi */}
          <div className={`p-3.5 rounded-xl border space-y-2 ${
            thithiResult.rule1_rikthaTithi4_8_14.status === 'CRITICAL'
              ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
              : 'bg-slate-900 border-slate-800 text-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300">1. 4, 8, 14 திதி சரிக்கைக் கூடாது</span>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
                thithiResult.rule1_rikthaTithi4_8_14.status === 'CRITICAL'
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              }`}>
                {thithiResult.rule1_rikthaTithi4_8_14.status === 'CRITICAL' ? '🛑 சரிக்கைக் கூடாது' : '✅ உத்தமம்'}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              பெண்: <strong className="text-amber-200">{thithiResult.rule1_rikthaTithi4_8_14.bTithi.fullNameTa}</strong> | ஆண்: <strong className="text-amber-200">{thithiResult.rule1_rikthaTithi4_8_14.gTithi.fullNameTa}</strong>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-300">
              {lang === 'ta' ? thithiResult.rule1_rikthaTithi4_8_14.explanationTa : thithiResult.rule1_rikthaTithi4_8_14.explanationEn}
            </p>
          </div>

          {/* Rule 2 Card: Same Janma Tithi */}
          <div className={`p-3.5 rounded-xl border space-y-2 ${
            thithiResult.rule2_sameJanmaTithi.status === 'CRITICAL'
              ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
              : thithiResult.rule2_sameJanmaTithi.status === 'WARN'
              ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
              : 'bg-slate-900 border-slate-800 text-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300">2. இருவருக்கும் ஒரே ஜன்ம திதி கூடாது</span>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
                thithiResult.rule2_sameJanmaTithi.status === 'CRITICAL'
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  : thithiResult.rule2_sameJanmaTithi.status === 'WARN'
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              }`}>
                {thithiResult.rule2_sameJanmaTithi.status === 'CRITICAL' ? '🛑 ஏக திதி தோஷம்' :
                 thithiResult.rule2_sameJanmaTithi.status === 'WARN' ? '⚠️ ஒரே திதி எண்' : '✅ உத்தமம்'}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              பெண்: <strong className="text-amber-200">{thithiResult.rule2_sameJanmaTithi.bTithi.fullNameTa}</strong> | ஆண்: <strong className="text-amber-200">{thithiResult.rule2_sameJanmaTithi.gTithi.fullNameTa}</strong>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-300">
              {lang === 'ta' ? thithiResult.rule2_sameJanmaTithi.explanationTa : thithiResult.rule2_sameJanmaTithi.explanationEn}
            </p>
          </div>

          {/* Rule 3 Card: Bride Mudakku Lord in Groom Rasi/Lagna */}
          <div className={`p-3.5 rounded-xl border space-y-2 ${
            thithiResult.rule3_girlMudakkuInBoyRasiLagna.status === 'CRITICAL'
              ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
              : 'bg-slate-900 border-slate-800 text-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300">3. பெண் முடக்கு அதிபதி ஆண் ராசி/லக்னம் கூடாது</span>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
                thithiResult.rule3_girlMudakkuInBoyRasiLagna.status === 'CRITICAL'
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              }`}>
                {thithiResult.rule3_girlMudakkuInBoyRasiLagna.status === 'CRITICAL' ? '🛑 முடக்கு தோஷம்' : '✅ உத்தமம்'}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              பெண் முடக்கு அதிபதி: <strong className="text-rose-300">{thithiResult.rule3_girlMudakkuInBoyRasiLagna.bMudakku?.mudakkuLordTa}</strong> ({thithiResult.rule3_girlMudakkuInBoyRasiLagna.bMudakku?.mudakkuRasiNameTa})
            </div>
            <p className="text-[11px] leading-relaxed text-slate-300">
              {lang === 'ta' ? thithiResult.rule3_girlMudakkuInBoyRasiLagna.explanationTa : thithiResult.rule3_girlMudakkuInBoyRasiLagna.explanationEn}
            </p>
          </div>

          {/* Rule 4 Card: Bride Thuvadasi vs Groom Amavasai/Pournami */}
          <div className={`p-3.5 rounded-xl border space-y-2 ${
            thithiResult.rule4_girlThuvadasiBoyAmavasaiPournami.status === 'CRITICAL'
              ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
              : 'bg-slate-900 border-slate-800 text-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300">4. பெண் துவாதசி - ஆண் அமாவாசை/பௌர்ணமி கூடாது</span>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
                thithiResult.rule4_girlThuvadasiBoyAmavasaiPournami.status === 'CRITICAL'
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              }`}>
                {thithiResult.rule4_girlThuvadasiBoyAmavasaiPournami.status === 'CRITICAL' ? '🛑 விலக்கு (தோஷம்)' : '✅ உத்தமம்'}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              பெண் திதி: <strong className="text-amber-200">{thithiResult.rule4_girlThuvadasiBoyAmavasaiPournami.bTithi.fullNameTa}</strong> | ஆண் திதி: <strong className="text-amber-200">{thithiResult.rule4_girlThuvadasiBoyAmavasaiPournami.gTithi.fullNameTa}</strong>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-300">
              {lang === 'ta' ? thithiResult.rule4_girlThuvadasiBoyAmavasaiPournami.explanationTa : thithiResult.rule4_girlThuvadasiBoyAmavasaiPournami.explanationEn}
            </p>
          </div>

        </div>
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
          <li>ஆணின் 3-ம் பாவக அதிபதி Ali karagam endru solla kudai நட்சத்திர புதன், சனி, கேது சாரங்களில் இருக்கக் கூடாது. அவ்வாறு இருந்தால் புதன், சனி, கேது karagal poi suzai சாரம் புதன்/சனி/கேது அமைப்பில் இல்லாமல் வேறுபட்டால் தோஷம் நிவர்த்தியாகி உத்தம சுப யோகம் தரும்.</li>
          <li><strong>சூரிய நிலை 48 நாட்கள் விலக்கு:</strong> பெண் பிறந்த நாளில் சூரியன் நின்ற இடத்திலிருந்து 48 நாட்களுக்கு முன்னும் 48 நாட்களுக்கு பின்னும் ஆண் சூரியன் அமைந்திருந்தால் (1 1/2 solar months / ~48°), ஒரே காலகட்ட கிரக தோஷத் தாக்கம் ஏற்படும் என்பதால் தவிர்க்கப்பட வேண்டும்.</li>
          <li><strong>22-வது நட்சத்திரம்:</strong> பெண்ணின் நட்சத்திரத்திலிருந்து 22-வது நட்சத்திரம் ஆண் நட்சத்திரமாக வரக்கூடாது (வைநாசிக தோஷம்).</li>
        </ul>
      </div>

    </div>
  );
}

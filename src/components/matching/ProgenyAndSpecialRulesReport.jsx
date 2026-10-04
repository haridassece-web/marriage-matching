import React from 'react';
import { ShieldAlert, ShieldCheck, CheckCircle2, AlertTriangle, Info, BookOpen, Sparkles, HeartHandshake, Baby } from 'lucide-react';
import { evaluateProgenyAndSpecialRules } from '../../rules/jathagam/progenyAndSpecialRulesEngine';

export default function ProgenyAndSpecialRulesReport({ bride, groom, lang }) {
  const result = evaluateProgenyAndSpecialRules(bride, groom);
  const { progenyHouses, genderYoga, vainasikaStar, marsStarRule, thirdLord5thHouseAnalysis } = result;

  return (
    <div className="bg-slate-900/90 border border-amber-500/20 rounded-3xl p-6 shadow-xl space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400">
            <Baby className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-amber-200 flex items-center gap-2">
              <span>{lang === 'ta' ? 'புத்திர பாக்கியம் & சிறப்பு சாஸ்திர விதிகள்' : 'Progeny & Special Astrological Rules'}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 font-mono">
                Progeny & Rules
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'ta' ? 'ஆணிற்கு 5-ம் இடம் & பெண்ணிற்கு 9-ம் இடம் புத்திர ஆய்வு, 3-ம் அதிபதி 5-ல் முடக்கு நிலை & 22-வது வைநாசிக தோஷம்' : 'Groom 5th & Bride 9th Progeny, 3rd Lord in 5th Mudakku & Vainasika Star'}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className={`px-4 py-2 rounded-2xl text-xs font-bold border flex items-center gap-2 ${
          !vainasikaStar.isVainasika22 && !thirdLord5thHouseAnalysis?.isGroom5thHouseAfflicted
            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
            : 'bg-rose-500/15 border-rose-500/40 text-rose-300'
        }`}>
          {!vainasikaStar.isVainasika22 && !thirdLord5thHouseAnalysis?.isGroom5thHouseAfflicted
            ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            : <AlertTriangle className="w-4 h-4 text-rose-400" />}
          <span>
            {!vainasikaStar.isVainasika22 && !thirdLord5thHouseAnalysis?.isGroom5thHouseAfflicted
              ? (lang === 'ta' ? 'புத்திர பாக்கிய பொருத்தம் உத்தமம்' : 'Progeny Alignment Auspicious')
              : (lang === 'ta' ? '⚠️ புத்திர தோஷ/வைநாசிக எச்சரிக்கை' : '⚠️ Progeny / Vainasika Alert')}
          </span>
        </div>
      </div>

      {/* Section 1: Progeny Houses Evaluation */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Baby className="w-4 h-4 text-pink-400" />
          <span>1. {lang === 'ta' ? 'புத்திர பாக்கிய வீடுகள் ஆய்வு (Progeny House Evaluation)' : 'Progeny House Evaluation'}</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-900 p-4 rounded-xl border border-amber-500/20 space-y-1">
            <span className="text-amber-300 font-bold block">
              {lang === 'ta' ? 'ஆணிற்கு 5-ம் இடம் (Groom 5th House):' : 'Groom 5th House:'}
            </span>
            <p className="text-slate-200">
              ராசி: <strong className="text-amber-400">{progenyHouses.groom5thRasiName}</strong> | அதிபதி: <strong>{progenyHouses.groom5thLord}</strong>
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-pink-500/20 space-y-1">
            <span className="text-pink-300 font-bold block">
              {lang === 'ta' ? 'பெண்ணிற்கு 9-ம் இடம் (Bride 9th House):' : 'Bride 9th House:'}
            </span>
            <p className="text-slate-200">
              ராசி: <strong className="text-pink-400">{progenyHouses.bride9thRasiName}</strong> | அதிபதி: <strong>{progenyHouses.bride9thLord}</strong>
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-amber-950/20 p-3 rounded-xl border border-amber-500/20">
          {lang === 'ta' ? progenyHouses.explanationTa : progenyHouses.explanationEn}
        </p>
      </div>

      {/* Section 2: Progeny Lineage Yoga */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>2. {lang === 'ta' ? 'வாரிசு யோகக் கணிப்பு (Progeny Lineage Yoga)' : 'Progeny Lineage Yoga'}</span>
        </h4>
        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300">
          <p>{lang === 'ta' ? genderYoga.progenyGenderYogaTa : genderYoga.explanationEn}</p>
        </div>
      </div>

      {/* Section 3: 3rd Lord in 5th House & Mudakku / Thithi Sunyam Obstacle Check */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <span>3. {lang === 'ta' ? '3-ம் அதிபதி 5-ல் & முடக்கு/திதி சூன்யத் தடை (3rd Lord in 5th House & Mudakku Analysis)' : '3rd Lord in 5th House & Mudakku Analysis'}</span>
          </h4>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
            thirdLord5thHouseAnalysis?.isGroom5thHouseAfflicted
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
              : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
          }`}>
            {thirdLord5thHouseAnalysis?.isGroom5thHouseAfflicted
              ? (lang === 'ta' ? '⚠️ புத்திர தோஷப் பரிகாரம் தேவை' : '⚠️ Progeny Pariharam Advised')
              : (lang === 'ta' ? '✅ புத்திர பாக்கியம் உத்தமம்' : '✅ No Progeny Obstacle')}
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
          {lang === 'ta' ? thirdLord5thHouseAnalysis?.explanationTa : thirdLord5thHouseAnalysis?.explanationEn}
        </p>
      </div>

      {/* Section 4: 22nd Star Vainasika Check */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>4. {lang === 'ta' ? '22-வது நட்சத்திர வைநாசிக தோஷம் (Vainasika Star Check)' : '22nd Star Vainasika Check'}</span>
          </h4>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
            vainasikaStar.isVainasika22
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
              : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
          }`}>
            {lang === 'ta' ? vainasikaStar.explanationTa : vainasikaStar.explanationEn}
          </span>
        </div>
      </div>

      {/* Astrological Manuscript Excerpts */}
      <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-4 text-xs space-y-2 text-amber-200/90">
        <div className="font-bold text-amber-400 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          <span>{lang === 'ta' ? 'சுவடி திருமண விதிகள் & பரிகாரங்கள் (Manuscript Rules & Remedies):' : 'Manuscript Rules & Remedies:'}</span>
        </div>
        <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px] leading-relaxed">
          <li><strong>புத்திர பாக்கியம்:</strong> "ஆணிற்கு 5-ம் இடம் குழந்தைக்கும், பெண்ணிற்கு 9-ம் இடம் குழந்தைக்கும் பார்க்கவும்."</li>
          <li><strong>3-ம் அதிபதி 5-ல் முடக்கு தோஷம்:</strong> ஆணின் 3-ம் பாவக அதிபதி 5-ல் அமர்ந்து அஞ்சாம் இடம் முடக்கு / திதி சூன்யம் / அவயோகி நிலை பெற்றால், புத்திர பாக்கியத்தில் தடையை தரும். திருக்கருகாவூர், திருநாகேஸ்வரம், ராமேஸ்வரம் ஸ்தலங்களில் பரிகாரம் செய்து திருமண முடிவு எடுக்கலாம்.</li>
          <li><strong>சூரியன் நட்சத்திர விலக்கு:</strong> "பெண் பிறந்த நாளில் இருந்து சூரியன் நின்ற நட்சத்திரம் 1 1/2 மாதம் முன்னும் 1 1/2 மாதம் பின்னும் தவிர்க்கவும்."</li>
          <li><strong>செவ்வாய் தோஷ நட்சத்திரங்கள்:</strong> மிருகசீரிஷம், சித்திரை, அவிட்டம், அஸ்வினி, மகம், மூலம், திருவாதிரை, சதயம், சுவாதி நட்சத்திரத்தில் பிறந்தவர்களுக்கு செவ்வாய் தோஷம் கட்டாயம் பார்க்கப்பட வேண்டும்.</li>
        </ul>
      </div>

    </div>
  );
}

import React from 'react';
import PersonForm from '../jathagam/PersonForm';
import { calculatePanchangamFromBirthDetails } from '../../engine/jathagam/panchangamCalculator';
import { Zap, Sparkles, Bookmark, FileText } from 'lucide-react';

export default function MatchingForm({ bride, setBride, groom, setGroom, lang, onCalculate, onSave, onPrint }) {

  // Preset scenarios to let astrologers/users quickly test different rule outcomes
  const applyPreset = (presetType) => {
    let bDob = '1998-05-15', bTob = '07:30';
    let gDob = '1995-08-20', gTob = '10:15';

    if (presetType === 'RAJJU_DOSHA') {
      bDob = '1999-03-12'; bTob = '14:20';
      gDob = '1996-11-05'; gTob = '18:45';
    } else if (presetType === 'SEVVAI_DOSHA') {
      bDob = '1997-09-28'; bTob = '06:10';
      gDob = '1994-01-14'; gTob = '21:00';
    }

    const bCalc = calculatePanchangamFromBirthDetails(bDob, bTob);
    const gCalc = calculatePanchangamFromBirthDetails(gDob, gTob);

    if (presetType === 'EXCELLENT') {
      setBride({
        name: lang === 'ta' ? 'கவிதா' : 'Kavitha',
        dob: bDob,
        tob: bTob,
        city: 'Chennai',
        state: 'Tamil Nadu',
        country: 'India',
        place: 'Chennai, Tamil Nadu, India',
        ...bCalc
      });
      setGroom({
        name: lang === 'ta' ? 'அருண்' : 'Arun',
        dob: gDob,
        tob: gTob,
        city: 'Madurai',
        state: 'Tamil Nadu',
        country: 'India',
        place: 'Madurai, Tamil Nadu, India',
        ...gCalc
      });
    } else if (presetType === 'RAJJU_DOSHA') {
      setBride({
        name: lang === 'ta' ? 'அனிதா' : 'Anitha',
        dob: bDob,
        tob: bTob,
        city: 'Coimbatore',
        state: 'Tamil Nadu',
        country: 'India',
        place: 'Coimbatore, Tamil Nadu, India',
        ...bCalc,
        nakshatraId: 1, // Ashwini (Pada Rajju)
        pada: 2,
        rasiId: 1,
        lagnaRasiId: 1,
        marsRasiId: 1
      });
      setGroom({
        name: lang === 'ta' ? 'விஜய்' : 'Vijay',
        dob: gDob,
        tob: gTob,
        city: 'Trichy',
        state: 'Tamil Nadu',
        country: 'India',
        place: 'Trichy, Tamil Nadu, India',
        ...gCalc,
        nakshatraId: 9, // Ashlesha (Pada Rajju)
        pada: 1,
        rasiId: 4,
        lagnaRasiId: 4,
        marsRasiId: 4
      });
    } else if (presetType === 'SEVVAI_DOSHA') {
      setBride({
        name: lang === 'ta' ? 'சாரதா' : 'Sharada',
        dob: bDob,
        tob: bTob,
        city: 'Singapore',
        state: 'Central',
        country: 'Singapore',
        place: 'Singapore, Central, Singapore',
        ...bCalc,
        nakshatraId: 7, // Punarvasu
        pada: 4,
        rasiId: 4, // Katakam
        lagnaRasiId: 1, // Mesham
        marsRasiId: 7 // Mars in 7th from Lagna = Sevvai Dosha!
      });
      setGroom({
        name: lang === 'ta' ? 'ரமேஷ்' : 'Ramesh',
        dob: gDob,
        tob: gTob,
        city: 'Kuala Lumpur',
        state: 'Federal Territory',
        country: 'Malaysia',
        place: 'Kuala Lumpur, Federal Territory, Malaysia',
        ...gCalc,
        nakshatraId: 13, // Hasta
        pada: 1,
        rasiId: 6, // Kanni
        lagnaRasiId: 6,
        marsRasiId: 11 // Mars in 6th (no dosha)
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Preset Action Bar */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-amber-300">
            {lang === 'ta' ? 'மாதிரி ஜாதக அமைப்புகள் (Presets):' : 'Sample Presets:'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => applyPreset('EXCELLENT')}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 transition flex items-center gap-1.5"
          >
            <span>🎉</span>
            <span>{lang === 'ta' ? 'உத்தம பொருத்தம் (9/11)' : 'Excellent Match'}</span>
          </button>
          <button
            type="button"
            onClick={() => applyPreset('RAJJU_DOSHA')}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/40 transition flex items-center gap-1.5"
          >
            <span>⚠️</span>
            <span>{lang === 'ta' ? 'ரஜ்ஜு தோஷம்' : 'Rajju Dosha'}</span>
          </button>
          <button
            type="button"
            onClick={() => applyPreset('SEVVAI_DOSHA')}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 border border-orange-500/40 transition flex items-center gap-1.5"
          >
            <span>🔥</span>
            <span>{lang === 'ta' ? 'செவ்வாய் தோஷம்' : 'Sevvai Dosha'}</span>
          </button>
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PersonForm
          title={lang === 'ta' ? 'பெண் ஜாதக விவரம்' : 'Bride Horoscope Details'}
          person={bride}
          onChange={setBride}
          colorTheme="rose"
          lang={lang}
        />

        <PersonForm
          title={lang === 'ta' ? 'ஆண் ஜாதக விவரம்' : 'Groom Horoscope Details'}
          person={groom}
          onChange={setGroom}
          colorTheme="amber"
          lang={lang}
        />
      </div>

      {/* Main Gold CTA Action Buttons (Exact Screenshot Reference Style) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onCalculate}
          className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-black text-sm rounded-xl shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 tracking-wide uppercase"
        >
          <Sparkles className="w-5 h-5 text-slate-950 fill-slate-950" />
          <span>{lang === 'ta' ? '⚡ திருக்கணக்கிய திருமண ஜாதகப் பொருத்தம் கணக்கிடுக' : '⚡ Calculate Compatibility'}</span>
        </button>

        {onSave && (
          <button
            type="button"
            onClick={onSave}
            className="px-5 py-3.5 bg-slate-900 border border-amber-500/40 text-amber-300 font-bold text-xs rounded-xl shadow-lg hover:bg-slate-800 transition flex items-center justify-center gap-2"
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            <span>{lang === 'ta' ? '💾 ஜாதகத்தைச் சேமி' : 'Save Profiles'}</span>
          </button>
        )}

        {onPrint && (
          <button
            type="button"
            onClick={onPrint}
            className="px-5 py-3.5 bg-indigo-950 border border-indigo-500/40 text-indigo-200 font-bold text-xs rounded-xl shadow-lg hover:bg-indigo-900 transition flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>{lang === 'ta' ? '📄 PDF ஜாதக அறிக்கை' : 'PDF Report'}</span>
          </button>
        )}
      </div>

    </div>
  );
}

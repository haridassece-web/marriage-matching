import React from 'react';
import RasiChart from '../jathagam/RasiChart';
import NavamsamChart from '../jathagam/NavamsamChart';
import { getNakshatraById } from '../../data/nakshatras';
import { getRasiById } from '../../data/rasis';
import { Printer } from 'lucide-react';

export default function MatchingReport({ matchingData, lang, onPrint }) {
  const { bride, groom, results, doshaAnalysis, summary } = matchingData;

  const brideNak = getNakshatraById(bride.nakshatraId);
  const groomNak = getNakshatraById(groom.nakshatraId);
  const brideRasi = getRasiById(bride.rasiId);
  const groomRasi = getRasiById(groom.rasiId);
  const brideLagna = getRasiById(bride.lagnaRasiId || bride.rasiId);
  const groomLagna = getRasiById(groom.lagnaRasiId || groom.rasiId);

  return (
    <div className="space-y-4">
      {/* Top Action Bar for Triggering Print */}
      {onPrint && (
        <div className="flex justify-end no-print">
          <button
            onClick={onPrint}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg hover:brightness-110 transition flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>{lang === 'ta' ? 'அச்சு எடுக்க / PDF சேமிக்க (Print / Save PDF)' : 'Print Report / Save PDF'}</span>
          </button>
        </div>
      )}

      {/* Printable Report Document */}
      <div id="printable-report" className="bg-white text-slate-900 p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto font-serif print:max-w-none print:shadow-none print:p-0">
        
        {/* Traditional Auspicious Header */}
        <div className="text-center border-b-2 border-amber-600 pb-4 mb-6">
          <div className="text-xs text-amber-800 font-bold mb-1 tracking-widest">
            ॥ ஶ்ரீ விநாயகர் துணை ॥ ஶ்ரீ குலதேவதா பிரசன்னம் ॥
          </div>
          <h1 className="text-2xl font-bold text-amber-900 uppercase">
            {lang === 'ta' ? 'திருமண ஜாதகப் பொருத்த ஆய்வு சான்றிதழ்' : 'Vedic Marriage Matching Horoscope Certificate'}
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            {lang === 'ta' ? 'பாரம்பரிய பஞ்சாங்கம் (ராசி, லக்னம், யோகம், கரணம், தசா புக்தி) & 11 பொருத்தம் சான்றிதழ்' : 'Certified Panchangam (Rasi, Lagna, Yogam, Karanam, Dhasa Bukthi) & Horoscopic Compatibility Document'}
          </p>
        </div>

        {/* Bride & Groom Birth Details & Panchangam Specification Table */}
        <div className="mb-6">
          <h2 className="text-sm font-bold text-amber-900 border-b border-amber-300 pb-1 mb-3 uppercase tracking-wider">
            1. தம்பதியர் பிறப்பு & பஞ்சாங்க விவரங்கள் (Birth & Panchangam Specifications)
          </h2>
          <table className="w-full text-xs border-collapse border border-slate-300">
            <thead>
              <tr className="bg-amber-100/60 text-amber-900">
                <th className="border border-slate-300 p-2 text-left w-1/3">விபரம் (Panchangam / Spec)</th>
                <th className="border border-slate-300 p-2 text-left w-1/3">பெண் (Bride): {bride.name || 'Bride'}</th>
                <th className="border border-slate-300 p-2 text-left w-1/3">ஆண் (Groom): {groom.name || 'Groom'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold">பிறந்த தேதி (DOB)</td>
                <td className="border border-slate-300 p-2 font-mono">{bride.dob || '1998-05-15'}</td>
                <td className="border border-slate-300 p-2 font-mono">{groom.dob || '1995-08-20'}</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 p-2 font-semibold">பிறந்த நேரம் (TOB) & இடம்</td>
                <td className="border border-slate-300 p-2 font-mono">{bride.tob || '07:30 AM'} ({bride.place || 'Chennai'})</td>
                <td className="border border-slate-300 p-2 font-mono">{groom.tob || '10:15 AM'} ({groom.place || 'Madurai'})</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold text-amber-900">ராசி (Moon Sign)</td>
                <td className="border border-slate-300 p-2 font-bold">{brideRasi.nameTa} ({brideRasi.nameEn})</td>
                <td className="border border-slate-300 p-2 font-bold">{groomRasi.nameTa} ({groomRasi.nameEn})</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 p-2 font-semibold text-amber-900">லக்னம் (Lagna Sign)</td>
                <td className="border border-slate-300 p-2 font-bold">{brideLagna.nameTa} ({brideLagna.nameEn})</td>
                <td className="border border-slate-300 p-2 font-bold">{groomLagna.nameTa} ({groomLagna.nameEn})</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold">நட்சத்திரம் (Nakshatra)</td>
                <td className="border border-slate-300 p-2 font-bold text-amber-900">{brideNak.nameTa} ({bride.pada}-ஆம் பாதம்)</td>
                <td className="border border-slate-300 p-2 font-bold text-amber-900">{groomNak.nameTa} ({groom.pada}-ஆம் பாதம்)</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-300 p-2 font-semibold">யோகம் (Yogam)</td>
                <td className="border border-slate-300 p-2">{bride.yogamNameTa || 'சுப யோகம்'}</td>
                <td className="border border-slate-300 p-2">{groom.yogamNameTa || 'சுப யோகம்'}</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold">கரணம் (Karanam)</td>
                <td className="border border-slate-300 p-2">{bride.karanamNameTa || 'பவம்'}</td>
                <td className="border border-slate-300 p-2">{groom.karanamNameTa || 'பாலவம்'}</td>
              </tr>
              <tr className="bg-amber-50/50">
                <td className="border border-slate-300 p-2 font-bold text-amber-900">தசா புக்தி இருப்பு (Dhasa Bukthi)</td>
                <td className="border border-slate-300 p-2 text-xs font-semibold text-amber-950">{bride.dhasaBalanceTa || 'கேது திசை இருப்பு'}</td>
                <td className="border border-slate-300 p-2 text-xs font-semibold text-amber-950">{groom.dhasaBalanceTa || 'சுக்ரன் திசை இருப்பு'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Rasi & Navamsam Charts Comparison */}
        <div className="mb-6 space-y-4">
          <h2 className="text-sm font-bold text-amber-900 border-b border-amber-300 pb-1 mb-3 uppercase tracking-wider">
            2. ராசி & நவாம்ச சக்கர ஒப்பீடு (D1 Rasi & D9 Navamsam Charts with Degrees)
          </h2>
          <div>
            <h3 className="text-xs font-bold text-slate-700 mb-2">D1 ராசி சக்கரம் (D1 Rasi Chart with Degrees):</h3>
            <div className="grid grid-cols-2 gap-4">
              <RasiChart
                title="பெண் ராசி சக்கரம்"
                personName={bride.name}
                rasiId={bride.rasiId}
                lagnaRasiId={bride.lagnaRasiId}
                marsRasiId={bride.marsRasiId}
                rasiPlanetsMap={bride.rasiPlanetsMap}
                lang={lang}
              />
              <RasiChart
                title="ஆண் ராசி சக்கரம்"
                personName={groom.name}
                rasiId={groom.rasiId}
                lagnaRasiId={groom.lagnaRasiId}
                marsRasiId={groom.marsRasiId}
                rasiPlanetsMap={groom.rasiPlanetsMap}
                lang={lang}
              />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-700 mb-2">D9 நவாம்ச சக்கரம் (D9 Navamsam Chart with Degrees):</h3>
            <div className="grid grid-cols-2 gap-4">
              <NavamsamChart
                title="பெண் நவாம்சம்"
                personName={bride.name}
                rasiId={bride.rasiId}
                lagnaRasiId={bride.lagnaRasiId}
                navamsamPlanetsMap={bride.navamsamPlanetsMap}
                lang={lang}
              />
              <NavamsamChart
                title="ஆண் நவாம்சம்"
                personName={groom.name}
                rasiId={groom.rasiId}
                lagnaRasiId={groom.lagnaRasiId}
                navamsamPlanetsMap={groom.navamsamPlanetsMap}
                lang={lang}
              />
            </div>
          </div>
        </div>

        {/* 11 Porutham Summary Table */}
        <div className="mb-6">
          <h2 className="text-sm font-bold text-amber-900 border-b border-amber-300 pb-1 mb-3 uppercase tracking-wider">
            3. 11 பொருத்தங்கள் ஆய்வு (11 Porutham Results)
          </h2>
          <table className="w-full text-xs border-collapse border border-slate-300">
            <thead>
              <tr className="bg-amber-100/60 text-amber-900">
                <th className="border border-slate-300 p-2 text-center w-8">#</th>
                <th className="border border-slate-300 p-2 text-left">பொருத்தம் (Porutham)</th>
                <th className="border border-slate-300 p-2 text-center">நிலை (Status)</th>
                <th className="border border-slate-300 p-2 text-center w-16">புள்ளி</th>
                <th className="border border-slate-300 p-2 text-left">குறிப்பு (Astrological Rule)</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, idx) => (
                <tr key={r.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="border border-slate-300 p-1.5 text-center font-bold">{idx + 1}</td>
                  <td className="border border-slate-300 p-1.5 font-semibold">{r.nameTa}</td>
                  <td className={`border border-slate-300 p-1.5 text-center font-bold ${
                    r.status === 'PASS' ? 'text-emerald-700' : r.status === 'PARTIAL' ? 'text-amber-700' : 'text-rose-700'
                  }`}>
                    {r.status === 'PASS' ? 'உத்தமம் (PASS)' : r.status === 'PARTIAL' ? 'மத்தியமம்' : 'பொருந்தாது (FAIL)'}
                  </td>
                  <td className="border border-slate-300 p-1.5 text-center font-mono">{r.score} / {r.maxScore}</td>
                  <td className="border border-slate-300 p-1.5 text-slate-700">{r.ruleApplied}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Final Astrologer Verdict & Stamp Box */}
        <div className="border-2 border-amber-700 rounded-xl p-4 bg-amber-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-900 block">முடிவு (Final Astrological Verdict):</span>
            <p className="text-base font-black text-amber-950 mt-0.5">
              {summary.gradeTa} ({summary.scoreFormatted} பொருத்தங்கள் பெறப்பட்டது)
            </p>
            <p className="text-xs text-slate-700 mt-1">
              {doshaAnalysis.kujaExplanationTa}
            </p>
          </div>

          <div className="text-center border-t sm:border-t-0 sm:border-l border-amber-300 pt-3 sm:pt-0 sm:pl-6 shrink-0 min-w-[180px]">
            <div className="w-24 h-12 border border-dashed border-slate-400 mx-auto flex items-center justify-center text-[10px] text-slate-400">
              ஜோதிடர் முத்திரை (Seal)
            </div>
            <span className="text-[11px] font-bold block mt-2 text-slate-800">ஜோதிடர் கையொப்பம்</span>
            <span className="text-[9px] text-slate-500">Astrologer Signature</span>
          </div>
        </div>

      </div>
    </div>
  );
}

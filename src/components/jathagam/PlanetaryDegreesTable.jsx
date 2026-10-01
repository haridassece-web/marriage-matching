import React, { useState } from 'react';
import { RASIS } from '../../data/rasis';
import { calculatePanchangamFromBirthDetails } from '../../engine/jathagam/panchangamCalculator';
import { Compass, Sparkles, User, Award, Star } from 'lucide-react';

export default function PlanetaryDegreesTable({ person, title, colorTheme = 'amber', lang = 'ta' }) {
  const isBride = colorTheme === 'rose';

  // Compute panchangam if not already attached
  let panchangam = person.allGrahas ? person : calculatePanchangamFromBirthDetails(person.dob || '1998-05-15', person.tob || '07:30');
  if (!panchangam || !panchangam.allGrahas) return null;

  const { allGrahas, charaKarakasMap } = panchangam;

  return (
    <div className="bg-slate-950/90 border border-amber-500/30 rounded-2xl p-4 shadow-xl space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl ${isBride ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}`}>
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-200">{title}</h4>
            <p className="text-[10px] text-slate-400">{person.name || 'Jathagam'} • கிரக பாகை, நட்சத்திர சாரம் & காரகங்கள்</p>
          </div>
        </div>

        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border ${isBride ? 'bg-rose-500/10 text-rose-300 border-rose-500/30' : 'bg-amber-500/10 text-amber-300 border-amber-500/30'}`}>
          {isBride ? 'பெண் ஜாதகம்' : 'ஆண் ஜாதகம்'}
        </span>
      </div>

      {/* Degrees & Karakas Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse border border-slate-800">
          <thead>
            <tr className="bg-slate-900/90 text-amber-300 text-[10.5px] border-b border-amber-500/30">
              <th className="p-2 border-r border-slate-800">கிரகம் (Graha)</th>
              <th className="p-2 border-r border-slate-800">ராசி & பாகை (Rasi & Degree)</th>
              <th className="p-2 border-r border-slate-800">நட்சத்திரம் (Nakshatra)</th>
              <th className="p-2 border-r border-slate-800">பாதம்</th>
              <th className="p-2 border-r border-slate-800">சாரம் (Star Lord)</th>
              <th className="p-2 border-r border-slate-800">காரகம் (Chara Karaka)</th>
              <th className="p-2">வீட்டு அதிபதி</th>
            </tr>
          </thead>
          <tbody>
            {allGrahas.map((g, idx) => {
              const rasi = RASIS.find(r => r.id === g.rasiId);
              const isLagna = g.code === 'LAG';
              const karaka = g.charaKaraka;

              return (
                <tr
                  key={idx}
                  className={`border-b border-slate-800/60 transition-colors ${
                    isLagna
                      ? 'bg-rose-500/10 font-bold'
                      : idx % 2 === 0
                      ? 'bg-slate-900/40'
                      : 'bg-slate-950'
                  } hover:bg-amber-500/10`}
                >
                  {/* Planet Name */}
                  <td className="p-2 border-r border-slate-800 font-bold flex items-center gap-1.5">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9.5px] ${
                        g.code === 'LAG' ? 'bg-rose-500/30 text-rose-300' :
                        g.code === 'MOON' ? 'bg-amber-400/30 text-amber-200' :
                        g.code === 'MARS' ? 'bg-orange-500/30 text-orange-200' :
                        g.code === 'SUN' ? 'bg-yellow-500/30 text-yellow-200' :
                        g.code === 'JUP' ? 'bg-amber-500/30 text-amber-200' :
                        g.code === 'VEN' ? 'bg-pink-500/30 text-pink-200' :
                        g.code === 'SAT' ? 'bg-blue-500/30 text-blue-200' :
                        g.code === 'RAHU' ? 'bg-purple-500/30 text-purple-200' :
                        g.code === 'KETU' ? 'bg-emerald-500/30 text-emerald-200' :
                        'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {lang === 'ta' ? g.nameTa : g.nameEn}
                    </span>
                  </td>

                  {/* Rasi & Degree */}
                  <td className="p-2 border-r border-slate-800">
                    <span className="font-semibold text-slate-200">{lang === 'ta' ? rasi?.nameTa : rasi?.nameEn}</span>
                    <span className="font-mono text-[10px] text-amber-300 font-extrabold block">
                      {g.formattedDeg}
                    </span>
                  </td>

                  {/* Nakshatra */}
                  <td className="p-2 border-r border-slate-800 font-semibold text-yellow-300">
                    {g.starNakshatra ? (lang === 'ta' ? g.starNakshatra.nameTa : g.starNakshatra.nameEn) : '-'}
                  </td>

                  {/* Pada */}
                  <td className="p-2 border-r border-slate-800 font-bold text-indigo-300">
                    {g.starPada ? `${g.starPada}-ஆம் பாதம்` : '-'}
                  </td>

                  {/* Star Lord (Saram) */}
                  <td className="p-2 border-r border-slate-800">
                    {g.starLordTa ? (
                      <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-sky-300 font-bold text-[10px]">
                        {lang === 'ta' ? g.starLordTa : g.starLordEn}
                      </span>
                    ) : '-'}
                  </td>

                  {/* Chara Karaka */}
                  <td className="p-2 border-r border-slate-800">
                    {isLagna ? (
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 text-[9.5px]">
                        உதய லக்கினம்
                      </span>
                    ) : karaka ? (
                      <span
                        className="px-2 py-0.5 rounded font-extrabold text-[9.5px] border"
                        style={{
                          backgroundColor: `${karaka.color}20`,
                          borderColor: `${karaka.color}50`,
                          color: karaka.color
                        }}
                        title={karaka.desc}
                      >
                        {karaka.code}: {lang === 'ta' ? karaka.nameTa : karaka.nameEn}
                      </span>
                    ) : '-'}
                  </td>

                  {/* Rasi Lord */}
                  <td className="p-2 text-slate-400 font-medium">
                    {rasi ? (lang === 'ta' ? rasi.lord : rasi.nameEn) : '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}

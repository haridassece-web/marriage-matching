import React from 'react';
import { RASIS } from '../../data/rasis';
import { calculatePanchangamFromBirthDetails } from '../../engine/jathagam/panchangamCalculator';

export default function RasiChart({ title, personName, rasiId, lagnaRasiId, marsRasiId, rasiPlanetsMap, dob, tob, lang = 'ta' }) {

  // Auto-calculate fallback map if rasiPlanetsMap is missing or empty
  let effectivePlanetsMap = rasiPlanetsMap;
  if (!effectivePlanetsMap || Object.keys(effectivePlanetsMap).length === 0 || Object.values(effectivePlanetsMap).every(arr => !arr || arr.length === 0)) {
    const computed = calculatePanchangamFromBirthDetails(dob || '1998-05-15', tob || '07:30');
    if (computed) {
      effectivePlanetsMap = computed.rasiPlanetsMap;
    }
  }

  const gridMap = [
    { rasiId: 12, row: 1, col: 1 },
    { rasiId: 1,  row: 1, col: 2 },
    { rasiId: 2,  row: 1, col: 3 },
    { rasiId: 3,  row: 1, col: 4 },

    { rasiId: 11, row: 2, col: 1 },
    { rasiId: 4,  row: 2, col: 4 },

    { rasiId: 10, row: 3, col: 1 },
    { rasiId: 5,  row: 3, col: 4 },

    { rasiId: 9,  row: 4, col: 1 },
    { rasiId: 8,  row: 4, col: 2 },
    { rasiId: 7,  row: 4, col: 3 },
    { rasiId: 6,  row: 4, col: 4 }
  ];

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 shadow-xl">
      <div className="text-center mb-3">
        <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">{title}</h4>
        {personName && <p className="text-xs text-slate-300 font-semibold">{personName}</p>}
      </div>

      <div className="grid grid-cols-4 grid-rows-4 gap-1 w-full aspect-square bg-slate-950 p-1 rounded-xl border border-amber-500/20">
        
        {/* Center Box */}
        <div className="col-start-2 col-span-2 row-start-2 row-span-2 bg-gradient-to-br from-slate-900 via-amber-950/40 to-slate-950 border border-amber-500/30 rounded-lg flex flex-col items-center justify-center p-2 text-center shadow-inner">
          <span className="text-xs font-bold text-amber-400">{title}</span>
          <span className="text-[10px] text-slate-400 mt-1">{personName || 'Jathagam'}</span>
          <div className="mt-2 text-[9px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
            D1 ராசி கிரகங்கள் & டிகிரிகள்
          </div>
        </div>

        {/* 12 Rasi Boxes with Planets and Degrees */}
        {gridMap.map(cell => {
          const rasi = RASIS.find(r => r.id === cell.rasiId);
          const planetsInBox = effectivePlanetsMap ? (effectivePlanetsMap[cell.rasiId] || []) : [];

          // Fallbacks if rasiPlanetsMap not supplied
          const isMoonHouse = rasiId === cell.rasiId;
          const isLagnaHouse = lagnaRasiId === cell.rasiId;
          const isMarsHouse = marsRasiId === cell.rasiId;

          return (
            <div
              key={cell.rasiId}
              style={{ gridRow: cell.row, gridColumn: cell.col }}
              className={`border p-1 rounded transition-colors flex flex-col justify-between min-h-[55px] sm:min-h-[70px] text-[10px] ${
                isMoonHouse || planetsInBox.some(p => p.code === 'MOON')
                  ? 'bg-amber-500/15 border-amber-400/60'
                  : 'bg-slate-900/60 border-slate-800 hover:border-amber-500/40'
              }`}
            >
              <div className="flex justify-between items-start text-[9px] text-slate-400">
                <span className="font-bold text-slate-500">{cell.rasiId}</span>
                <span className="font-semibold text-amber-200/80">{lang === 'ta' ? rasi.nameTa : rasi.nameEn}</span>
              </div>

              {/* Render All Planets with Degrees */}
              <div className="flex flex-col gap-0.5 my-0.5 overflow-y-auto max-h-[60px] scrollbar-thin">
                {planetsInBox.length > 0 ? (
                  planetsInBox.map((p, pIdx) => (
                    <span
                      key={pIdx}
                      className={`px-1 py-0.5 rounded font-bold text-[8.5px] leading-tight text-center flex items-center justify-between gap-0.5 shadow-sm ${
                        p.code === 'LAG' ? 'bg-rose-500/30 border border-rose-500/60 text-rose-200' :
                        p.code === 'MOON' ? 'bg-amber-400/30 border border-amber-400/60 text-amber-100' :
                        p.code === 'MARS' ? 'bg-orange-500/30 border border-orange-500/60 text-orange-200' :
                        p.code === 'SUN' ? 'bg-yellow-500/30 border border-yellow-500/60 text-yellow-100' :
                        p.code === 'JUP' ? 'bg-amber-500/30 border border-amber-500/60 text-amber-200' :
                        p.code === 'VEN' ? 'bg-pink-500/30 border border-pink-500/60 text-pink-200' :
                        p.code === 'SAT' ? 'bg-blue-500/30 border border-blue-500/60 text-blue-200' :
                        p.code === 'RAHU' ? 'bg-purple-500/30 border border-purple-500/60 text-purple-200' :
                        p.code === 'KETU' ? 'bg-emerald-500/30 border border-emerald-500/60 text-emerald-200' :
                        'bg-slate-800 text-slate-200'
                      }`}
                    >
                      <span>{lang === 'ta' ? p.nameTa : p.nameEn}</span>
                      <span className="font-mono text-[8px] text-amber-200 font-extrabold">{p.formattedDeg}</span>
                    </span>
                  ))
                ) : (
                  <>
                    {isLagnaHouse && (
                      <span className="px-1 py-0.2 rounded bg-rose-500/30 border border-rose-500/50 text-rose-300 font-bold text-[9px] text-center">
                        {lang === 'ta' ? 'லக்னம்' : 'Lagna'}
                      </span>
                    )}
                    {isMoonHouse && (
                      <span className="px-1 py-0.2 rounded bg-amber-400/30 border border-amber-400/50 text-amber-200 font-bold text-[9px] text-center">
                        {lang === 'ta' ? 'சந்திரன்' : 'Moon'}
                      </span>
                    )}
                    {isMarsHouse && (
                      <span className="px-1 py-0.2 rounded bg-orange-500/30 border border-orange-500/50 text-orange-200 font-semibold text-[9px] text-center">
                        {lang === 'ta' ? 'செவ்வாய்' : 'Mars'}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

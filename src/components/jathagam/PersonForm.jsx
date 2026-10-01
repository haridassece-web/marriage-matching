import React, { useEffect, useState } from 'react';
import { POPULAR_LOCATIONS, POPULAR_COUNTRIES } from '../../data/locations';
import { calculatePanchangamFromBirthDetails } from '../../engine/jathagam/panchangamCalculator';
import { User, Calendar, Clock, MapPin, Compass, Globe, Sparkles, CheckCircle2 } from 'lucide-react';

export default function PersonForm({ title, person, onChange, colorTheme = 'amber', lang = 'ta' }) {
  const isBride = colorTheme === 'rose';
  const [panchangam, setPanchangam] = useState(null);

  // Auto calculate Panchangam (Rasi, Lagna, Nakshatra, Yogam, Karanam, Dhasa Bukthi, & All 9 Grahas) from DOB & TOB
  useEffect(() => {
    if (person.dob) {
      const calc = calculatePanchangamFromBirthDetails(person.dob, person.tob || '07:30');
      if (calc) {
        setPanchangam(calc);
        // Automatically sync calculated astrological specs into person state
        onChange({
          ...person,
          nakshatraId: calc.nakshatraId,
          nakshatraNameTa: calc.nakshatraNameTa,
          pada: calc.pada,
          rasiId: calc.rasiId,
          rasiNameTa: calc.rasiNameTa,
          lagnaRasiId: calc.lagnaRasiId,
          lagnaNameTa: calc.lagnaNameTa,
          marsRasiId: calc.marsRasiId,
          rasiPlanetsMap: calc.rasiPlanetsMap,
          navamsamPlanetsMap: calc.navamsamPlanetsMap,
          allGrahas: calc.allGrahas,
          yogamNameTa: calc.yogam.nameTa,
          karanamNameTa: calc.karanam.nameTa,
          dhasaBalanceTa: calc.dhasaBalanceTa
        });
      }
    }
  }, [person.dob, person.tob]);

  const handleSelectQuickLocation = (loc) => {
    onChange({
      ...person,
      city: loc.city,
      state: loc.state,
      country: loc.country,
      place: `${loc.city}, ${loc.state}, ${loc.country}`
    });
  };

  return (
    <div className="bg-slate-950/90 border border-amber-500/40 rounded-2xl p-5 shadow-2xl relative backdrop-blur-md">
      
      {/* Top Header & Gender Pill */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-500/30">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-400">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-200">{title}</h3>
            <span className="text-[10px] text-slate-400 block font-mono">
              {isBride ? (lang === 'ta' ? 'பெண் விபரம்' : 'Bride Profile') : (lang === 'ta' ? 'ஆண் விபரம்' : 'Groom Profile')}
            </span>
          </div>
        </div>

        {/* Gender Badge Pills */}
        <div className="flex gap-1 bg-slate-900 p-0.5 rounded-lg border border-amber-500/30 text-[10px]">
          <span className={`px-2 py-0.5 rounded font-bold ${!isBride ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>
            ஆண்
          </span>
          <span className={`px-2 py-0.5 rounded font-bold ${isBride ? 'bg-rose-500 text-white' : 'text-slate-400'}`}>
            பெண்
          </span>
        </div>
      </div>

      <div className="space-y-4 text-xs">
        
        {/* Name Input */}
        <div>
          <label className="block text-amber-300 font-bold mb-1 text-[11px]">
            {lang === 'ta' ? 'பெயர் / Full Name' : 'Full Name'}
          </label>
          <input
            type="text"
            value={person.name}
            onChange={(e) => onChange({ ...person, name: e.target.value })}
            placeholder={isBride ? 'e.g. பிரியா / Priya' : 'e.g. கார்த்திக் / Karthik'}
            className="w-full bg-slate-900 border border-amber-500/30 focus:border-amber-400 rounded-xl px-3 py-2 text-slate-200 outline-none font-medium transition shadow-inner text-xs"
          />
        </div>

        {/* Birth Details: DOB & TOB Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-900/90 p-3 rounded-xl border border-amber-500/30 shadow-inner">
          <div>
            <label className="block text-amber-300 font-bold mb-1 text-[11px] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'ta' ? 'பிறந்த தேதி (DOB)' : 'Date of Birth'}</span>
            </label>
            <input
              type="date"
              value={person.dob || '1998-05-15'}
              onChange={(e) => onChange({ ...person, dob: e.target.value })}
              className="w-full bg-slate-950 border border-amber-500/30 focus:border-amber-400 rounded-lg px-2.5 py-1.5 text-slate-200 outline-none transition text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-amber-300 font-bold mb-1 text-[11px] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'ta' ? 'பிறந்த நேரம் (TOB)' : 'Time of Birth'}</span>
            </label>
            <input
              type="time"
              value={person.tob || '07:30'}
              onChange={(e) => onChange({ ...person, tob: e.target.value })}
              className="w-full bg-slate-950 border border-amber-500/30 focus:border-amber-400 rounded-lg px-2.5 py-1.5 text-slate-200 outline-none transition text-xs font-mono"
            />
          </div>
        </div>

        {/* Location Dropdown Selection Section */}
        <div className="bg-slate-900/90 p-3 rounded-xl border border-amber-500/30 space-y-2 shadow-inner">
          <div className="flex items-center justify-between">
            <label className="block text-amber-300 font-bold text-[11px] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'ta' ? 'பிறந்த இடம் (Location Selection)' : 'Place of Birth Dropdown'}</span>
            </label>
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <Globe className="w-3 h-3 text-amber-400" /> Worldwide
            </span>
          </div>

          {/* Location Dropdown Select */}
          <div>
            <select
              value={person.city || 'Chennai'}
              onChange={(e) => {
                const selectedCity = e.target.value;
                const foundLoc = POPULAR_LOCATIONS.find(l => l.city === selectedCity) || { city: selectedCity, state: 'Tamil Nadu', country: 'India' };
                handleSelectQuickLocation(foundLoc);
              }}
              className="w-full bg-slate-950 border border-amber-500/40 focus:border-amber-400 rounded-xl px-3 py-2 text-slate-200 font-semibold outline-none transition text-xs"
            >
              {POPULAR_LOCATIONS.map((loc, idx) => (
                <option key={idx} value={loc.city}>
                  📍 {loc.city}, {loc.state}, {loc.country}
                </option>
              ))}
            </select>
          </div>

          <p className="text-[10px] text-slate-400 font-mono pt-0.5">
            தேர்ந்தெடுக்கப்பட்ட இடம்: <strong className="text-amber-300">{person.place || 'Chennai, Tamil Nadu, India'}</strong>
          </p>
        </div>

        {/* Auto Computed Panchangam & Astrological Specs Banner */}
        {panchangam && (
          <div className="bg-gradient-to-r from-slate-900 via-amber-950/50 to-slate-900 border border-amber-500/40 rounded-xl p-3.5 space-y-2 text-[11px] shadow-lg">
            <div className="flex items-center justify-between text-amber-400 font-bold border-b border-amber-500/20 pb-1.5">
              <span className="flex items-center gap-1 text-xs">
                <Compass className="w-4 h-4 text-amber-400" />
                {lang === 'ta' ? 'தானியங்கி பஞ்சாங்கக் கணிப்பு (100% Auto Ephemeris):' : 'Auto Ephemeris Calculation:'}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Auto Computed
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-slate-200">
              <div><strong>ராசி (Moon Sign):</strong> <span className="text-amber-300 font-bold">{panchangam.rasiNameTa}</span></div>
              <div><strong>லக்னம் (Lagna):</strong> <span className="text-rose-300 font-bold">{panchangam.lagnaNameTa}</span></div>
              <div><strong>நட்சத்திரம்:</strong> <span className="text-amber-300 font-bold">{panchangam.nakshatraNameTa} ({panchangam.pada}-ஆம் பாதம்)</span></div>
              <div><strong>யோகம்:</strong> <span className="text-yellow-300">{panchangam.yogam.nameTa} ({panchangam.yogam.nature})</span></div>
              <div><strong>கரணம்:</strong> <span className="text-emerald-300">{panchangam.karanam.nameTa}</span></div>
              <div><strong>அனைத்து 9 கிரகங்கள்:</strong> <span className="text-cyan-300">கணக்கிடப்பட்டன</span></div>
            </div>

            <div className="text-amber-300 font-bold pt-1.5 border-t border-amber-500/20 text-xs">
              {panchangam.dhasaBalanceTa}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

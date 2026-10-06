import React, { useState, useMemo } from 'react';
import { 
  calculateCompleteDhasaTimeline, 
  formatDate, 
  formatDateTime, 
  formatDuration 
} from '../../engine/jathagam/dhasaBukthiEngine';
import { 
  Sparkles, 
  Clock, 
  Calendar, 
  ChevronRight, 
  ChevronDown, 
  User, 
  CheckCircle2, 
  History, 
  Zap, 
  ArrowRight, 
  Layers, 
  Filter, 
  ShieldAlert,
  Flame,
  Globe
} from 'lucide-react';

export default function DhasaBukthiReport({ bride, groom, lang = 'ta' }) {
  const [selectedProfile, setSelectedProfile] = useState('groom'); // 'groom', 'bride', 'compare'
  const [filterStatus, setFilterStatus] = useState('ALL'); // 'ALL', 'PAST', 'PRESENT', 'FUTURE'
  const [targetDateStr, setTargetDateStr] = useState(new Date().toISOString().split('T')[0]);
  
  // Track open accordion nodes for 4 levels
  const [expandedDasas, setExpandedDasas] = useState({});
  const [expandedBhuktis, setExpandedBhuktis] = useState({});
  const [expandedAntharams, setExpandedAntharams] = useState({});

  const targetDate = useMemo(() => new Date(targetDateStr), [targetDateStr]);

  // Calculate timeline for Groom
  const groomTimeline = useMemo(() => {
    return calculateCompleteDhasaTimeline(
      groom.dob || '1995-08-20',
      groom.tob || '10:15',
      groom.nakshatraId || 1,
      groom.starProgress || 0,
      targetDate
    );
  }, [groom, targetDate]);

  // Calculate timeline for Bride
  const brideTimeline = useMemo(() => {
    return calculateCompleteDhasaTimeline(
      bride.dob || '1998-05-15',
      bride.tob || '07:30',
      bride.nakshatraId || 1,
      bride.starProgress || 0,
      targetDate
    );
  }, [bride, targetDate]);

  const activePerson = selectedProfile === 'bride' ? bride : groom;
  const activeTimeline = selectedProfile === 'bride' ? brideTimeline : groomTimeline;

  // Toggle Accordion node handlers
  const toggleDasa = (dasaId) => {
    setExpandedDasas(prev => ({ ...prev, [dasaId]: !prev[dasaId] }));
  };

  const toggleBhukti = (bhuktiId) => {
    setExpandedBhuktis(prev => ({ ...prev, [bhuktiId]: !prev[bhuktiId] }));
  };

  const toggleAntharam = (antharamId) => {
    setExpandedAntharams(prev => ({ ...prev, [antharamId]: !prev[antharamId] }));
  };

  // Expand all current active nodes by default
  const expandCurrentActivePath = () => {
    const activeSummary = activeTimeline.activeSummary;
    if (activeSummary.dasa) {
      setExpandedDasas(prev => ({ ...prev, [activeSummary.dasa.id]: true }));
    }
    if (activeSummary.bhukti) {
      setExpandedBhuktis(prev => ({ ...prev, [activeSummary.bhukti.id]: true }));
    }
    if (activeSummary.antharam) {
      setExpandedAntharams(prev => ({ ...prev, [activeSummary.antharam.id]: true }));
    }
  };

  // Filter helper
  const filterPass = (status) => {
    if (filterStatus === 'ALL') return true;
    return status === filterStatus;
  };

  // Status Badge Component
  const renderStatusBadge = (status) => {
    if (status === 'PAST') {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700 inline-flex items-center gap-1">
          <History className="w-2.5 h-2.5" />
          {lang === 'ta' ? 'கடந்த காலம் (Past)' : 'Past'}
        </span>
      );
    }
    if (status === 'PRESENT') {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 animate-pulse inline-flex items-center gap-1">
          <Zap className="w-2.5 h-2.5 text-emerald-400" />
          {lang === 'ta' ? 'நடப்பு (Present)' : 'Current'}
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 inline-flex items-center gap-1">
        <Sparkles className="w-2.5 h-2.5 text-amber-400" />
        {lang === 'ta' ? 'எதிர்காலம் (Future)' : 'Future'}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Title & Banner Header */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-indigo-950/80 p-6 rounded-2xl border border-amber-500/30 shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles className="w-48 h-48 text-amber-400" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{lang === 'ta' ? 'விம்சோத்தரி தசா அமைப்பின் 4 நிலைகள்' : 'Vimshottari 4-Level Dasha Analysis'}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-400">
              {lang === 'ta' ? 'தசா - புத்தி - அந்தரம் - சூட்சுமம் கணிப்பு' : 'Dasa - Bhukti - Antharam - Sookshmam Report'}
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              {lang === 'ta' 
                ? 'ஆண் மற்றும் பெண் இருவரின் கடந்த காலம், நிகழ்காலம் மற்றும் எதிர்கால மகா தசை, புத்தி, அந்தரம் மற்றும் சூட்சுமம் ஆகியவற்றின் துல்லியமான 120 வருடக் கணிப்பு.'
                : 'Complete 120-year astronomical timeline of Past, Present, and Future Major Dasa, Bhukti, Antharam, and Sookshmam for both Bride and Groom.'}
            </p>
          </div>

          {/* Target Date Picker Controls */}
          <div className="bg-slate-950/80 p-3 rounded-xl border border-amber-500/30 space-y-2">
            <label className="text-[11px] font-bold text-amber-300 block flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'ta' ? 'கணிப்பு தேதி (Target Date):' : 'Calculate For Date:'}</span>
            </label>
            <input 
              type="date"
              value={targetDateStr}
              onChange={(e) => setTargetDateStr(e.target.value)}
              className="bg-slate-900 border border-amber-500/40 rounded-lg px-2.5 py-1 text-xs text-amber-200 outline-none focus:border-amber-400 font-mono w-full"
            />
            <div className="flex gap-1 text-[10px]">
              <button 
                onClick={() => setTargetDateStr(new Date().toISOString().split('T')[0])}
                className="px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 transition"
              >
                {lang === 'ta' ? 'இன்று' : 'Today'}
              </button>
              <button 
                onClick={expandCurrentActivePath}
                className="px-2 py-0.5 rounded bg-indigo-500/20 hover:bg-indigo-500/40 text-indigo-300 transition"
              >
                {lang === 'ta' ? 'நடப்பு விரி' : 'Expand Active'}
              </button>
            </div>
          </div>
        </div>

        {/* Profile Selector & Filter Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
          
          {/* Profile Selector Tabs */}
          <div className="flex gap-2 bg-slate-950 p-1 rounded-xl border border-amber-500/30">
            <button
              onClick={() => setSelectedProfile('groom')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                selectedProfile === 'groom'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>👨</span>
              <span>{groom.name || (lang === 'ta' ? 'ஆண்' : 'Groom')}</span>
            </button>
            <button
              onClick={() => setSelectedProfile('bride')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                selectedProfile === 'bride'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>👩</span>
              <span>{bride.name || (lang === 'ta' ? 'பெண்' : 'Bride')}</span>
            </button>
            <button
              onClick={() => setSelectedProfile('compare')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                selectedProfile === 'compare'
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-extrabold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>⚖️</span>
              <span>{lang === 'ta' ? 'இருவர் ஒப்பீடு (Comparison)' : 'Compare Both'}</span>
            </button>
          </div>

          {/* Past, Present, Future Filters (for single profile mode) */}
          {selectedProfile !== 'compare' && (
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-amber-500/20 text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400 ml-1" />
              {[
                { key: 'ALL', ta: 'அனைத்தும்', en: 'All' },
                { key: 'PAST', ta: 'கடந்தவை (Past)', en: 'Past' },
                { key: 'PRESENT', ta: 'நிகழ்காலம் (Present)', en: 'Present' },
                { key: 'FUTURE', ta: 'எதிர்காலம் (Future)', en: 'Future' }
              ].map(f => (
                <button
                  key={f.key}
                  onClick={() => setFilterStatus(f.key)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                    filterStatus === f.key
                      ? 'bg-slate-800 text-amber-300 border border-amber-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lang === 'ta' ? f.ta : f.en}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* COMPARISON VIEW */}
      {selectedProfile === 'compare' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Groom Live Cards */}
          <CurrentLiveSummaryCard 
            title={groom.name || (lang === 'ta' ? 'ஆண் (Groom)' : 'Groom')}
            timeline={groomTimeline}
            genderColor="amber"
            lang={lang}
          />
          {/* Bride Live Cards */}
          <CurrentLiveSummaryCard 
            title={bride.name || (lang === 'ta' ? 'பெண் (Bride)' : 'Bride')}
            timeline={brideTimeline}
            genderColor="rose"
            lang={lang}
          />
        </div>
      ) : (
        /* SINGLE PROFILE VIEW */
        <div className="space-y-6">
          
          {/* Active 4-Level Current Status Hero Cards */}
          <CurrentLiveSummaryCard 
            title={`${activePerson.name || (selectedProfile === 'bride' ? 'பெண்' : 'ஆண்')} - ${lang === 'ta' ? 'தற்போதைய 4 நிலைகள்' : 'Current Active 4 Levels'}`}
            timeline={activeTimeline}
            genderColor={selectedProfile === 'bride' ? 'rose' : 'amber'}
            lang={lang}
          />

          {/* Interactive 4-Level Tree Accordion Table */}
          <div className="bg-slate-950/90 border border-amber-500/30 rounded-2xl p-5 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-500/20">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-amber-200">
                  {lang === 'ta' ? 'முழுமையான 120 வருட தசா-புத்தி-அந்தரம்-சூட்சுமம் விபரம்' : 'Detailed 120-Year Dasa-Bhukti-Antharam-Sookshmam Tree'}
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {lang === 'ta' ? 'வரிசையை அழுத்தினால் துணை நிலைகள் விரியும்' : 'Click any row to expand sub-periods'}
              </span>
            </div>

            <div className="space-y-3">
              {activeTimeline.dasas.filter(d => filterPass(d.status)).map((dasa) => {
                const isDasaOpen = !!expandedDasas[dasa.id] || dasa.status === 'PRESENT';

                return (
                  <div 
                    key={dasa.id} 
                    className={`rounded-xl border transition overflow-hidden ${
                      dasa.status === 'PRESENT' 
                        ? 'bg-slate-900/90 border-emerald-500/60 shadow-lg shadow-emerald-950/50' 
                        : 'bg-slate-900/40 border-slate-800 hover:border-amber-500/40'
                    }`}
                  >
                    {/* LEVEL 1: DASA ROW */}
                    <div 
                      onClick={() => toggleDasa(dasa.id)}
                      className="p-3.5 flex items-center justify-between cursor-pointer select-none bg-slate-900/80 hover:bg-slate-800/80 transition"
                    >
                      <div className="flex items-center gap-3">
                        <button className="p-1 rounded bg-slate-800 text-slate-300">
                          {isDasaOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                        
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm text-slate-950 shadow-inner"
                          style={{ backgroundColor: dasa.color }}
                        >
                          {dasa.symbol}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-amber-100">
                              {dasa.lordTa} {lang === 'ta' ? 'மகா தசை' : 'Major Dasa'} ({dasa.lordEn})
                            </span>
                            {renderStatusBadge(dasa.status)}
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {dasa.formattedStart} - {dasa.formattedEnd} ({dasa.durationText})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                          {dasa.totalYears} {lang === 'ta' ? 'வருடங்கள்' : 'Years'}
                        </span>
                      </div>
                    </div>

                    {/* LEVEL 2: BHUKTI (PUTHI) LIST */}
                    {isDasaOpen && (
                      <div className="border-t border-slate-800/80 bg-slate-950/60 p-3 pl-6 space-y-2">
                        <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                          <span>{dasa.lordTa} தசையில் உள்ள 9 புத்திகள் (Puthi Sub-periods)</span>
                        </div>

                        {dasa.bhuktis.filter(b => filterPass(b.status)).map((bhukti) => {
                          const isBhuktiOpen = !!expandedBhuktis[bhukti.id] || bhukti.status === 'PRESENT';

                          return (
                            <div 
                              key={bhukti.id}
                              className={`rounded-lg border transition ${
                                bhukti.status === 'PRESENT'
                                  ? 'bg-slate-900/90 border-emerald-500/50 shadow-md'
                                  : 'bg-slate-900/30 border-slate-800/80 hover:border-amber-500/30'
                              }`}
                            >
                              {/* BHUKTI ROW */}
                              <div 
                                onClick={() => toggleBhukti(bhukti.id)}
                                className="p-2.5 flex items-center justify-between cursor-pointer select-none"
                              >
                                <div className="flex items-center gap-2.5">
                                  <button className="p-0.5 rounded text-slate-400">
                                    {isBhuktiOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                                  </button>
                                  
                                  <span 
                                    className="w-2.5 h-2.5 rounded-full" 
                                    style={{ backgroundColor: bhukti.color }}
                                  ></span>

                                  <div>
                                    <span className="font-bold text-xs text-slate-200">
                                      {bhukti.lordTa} {lang === 'ta' ? 'புத்தி' : 'Bhukti'}
                                    </span>
                                    <span className="text-[10px] text-slate-400 ml-2 font-mono">
                                      ({bhukti.formattedStart} - {bhukti.formattedEnd})
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  {renderStatusBadge(bhukti.status)}
                                  <span className="text-[10px] font-semibold text-slate-300 font-mono">
                                    {bhukti.durationText}
                                  </span>
                                </div>
                              </div>

                              {/* LEVEL 3: ANTHARAM (ANDRAM) LIST */}
                              {isBhuktiOpen && (
                                <div className="border-t border-slate-800/60 bg-slate-950/80 p-2.5 pl-6 space-y-1.5">
                                  <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1">
                                    {bhukti.lordTa} புக்தியில் உள்ள 9 அந்தரங்கள் (Antharam / Andram)
                                  </div>

                                  {bhukti.antharams.filter(a => filterPass(a.status)).map((antharam) => {
                                    const isAntharamOpen = !!expandedAntharams[antharam.id] || antharam.status === 'PRESENT';

                                    return (
                                      <div 
                                        key={antharam.id}
                                        className={`rounded border transition ${
                                          antharam.status === 'PRESENT'
                                            ? 'bg-slate-900 border-indigo-500/50'
                                            : 'bg-slate-900/20 border-slate-800/50'
                                        }`}
                                      >
                                        {/* ANTHARAM ROW */}
                                        <div 
                                          onClick={() => toggleAntharam(antharam.id)}
                                          className="p-2 flex items-center justify-between cursor-pointer select-none text-xs"
                                        >
                                          <div className="flex items-center gap-2">
                                            <button className="p-0.5 text-slate-400">
                                              {isAntharamOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                                            </button>
                                            <span 
                                              className="w-2 h-2 rounded-full" 
                                              style={{ backgroundColor: antharam.color }}
                                            ></span>
                                            <span className="font-semibold text-slate-200">
                                              {antharam.lordTa} {lang === 'ta' ? 'அந்தரம்' : 'Antharam'}
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-mono">
                                              ({antharam.formattedStart} - {antharam.formattedEnd})
                                            </span>
                                          </div>

                                          <div className="flex items-center gap-2">
                                            {renderStatusBadge(antharam.status)}
                                            <span className="text-[10px] text-slate-400 font-mono">
                                              {antharam.durationText}
                                            </span>
                                          </div>
                                        </div>

                                        {/* LEVEL 4: SOOKSHMAM (SUCIZAM) LIST */}
                                        {isAntharamOpen && (
                                          <div className="border-t border-slate-800/40 bg-slate-950 p-2 pl-6 space-y-1">
                                            <div className="text-[9px] font-bold text-rose-300 uppercase tracking-wider mb-1">
                                              {antharam.lordTa} அந்தரத்தில் உள்ள 9 சூட்சுமங்கள் (Sookshmam / Sucizam)
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
                                              {antharam.sookshmams.filter(s => filterPass(s.status)).map((sookshmam) => (
                                                <div 
                                                  key={sookshmam.id}
                                                  className={`p-1.5 rounded border text-[10px] flex items-center justify-between ${
                                                    sookshmam.status === 'PRESENT'
                                                      ? 'bg-rose-950/40 border-rose-500/50 text-rose-200 font-bold'
                                                      : 'bg-slate-900/60 border-slate-800 text-slate-300'
                                                  }`}
                                                >
                                                  <div className="flex items-center gap-1.5">
                                                    <span 
                                                      className="w-1.5 h-1.5 rounded-full" 
                                                      style={{ backgroundColor: sookshmam.color }}
                                                    ></span>
                                                    <span>{sookshmam.lordTa} சூட்சுமம்</span>
                                                  </div>
                                                  <span className="font-mono text-[9px] text-slate-400">
                                                    {sookshmam.formattedStart}
                                                  </span>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Reusable Current Live 4-Level Status Card Component
 */
function CurrentLiveSummaryCard({ title, timeline, genderColor = 'amber', lang = 'ta' }) {
  const { activeSummary } = timeline;
  const isRose = genderColor === 'rose';

  const levels = [
    {
      titleTa: '1. மகா தசை (Major Dasa)',
      titleEn: '1. Major Dasa',
      item: activeSummary.dasa,
      percent: activeSummary.dasaPercent,
      color: activeSummary.dasa?.color || '#f59e0b'
    },
    {
      titleTa: '2. புத்தி (Bhukti / Puthi)',
      titleEn: '2. Bhukti',
      item: activeSummary.bhukti,
      percent: activeSummary.bhuktiPercent,
      color: activeSummary.bhukti?.color || '#3b82f6'
    },
    {
      titleTa: '3. அந்தரம் (Antharam / Andram)',
      titleEn: '3. Antharam',
      item: activeSummary.antharam,
      percent: activeSummary.antharamPercent,
      color: activeSummary.antharam?.color || '#8b5cf6'
    },
    {
      titleTa: '4. சூட்சுமம் (Sookshmam / Sucizam)',
      titleEn: '4. Sookshmam',
      item: activeSummary.sookshmam,
      percent: activeSummary.sookshmamPercent,
      color: activeSummary.sookshmam?.color || '#ec4899'
    }
  ];

  return (
    <div className={`bg-slate-950/90 border rounded-2xl p-5 shadow-2xl backdrop-blur-md ${
      isRose ? 'border-rose-500/40' : 'border-amber-500/40'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg font-bold text-xs ${
            isRose ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
          }`}>
            <User className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-sm text-slate-100">{title}</h3>
        </div>
        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 animate-pulse flex items-center gap-1">
          <Zap className="w-3 h-3" /> LIVE {timeline.targetDateFormatted}
        </span>
      </div>

      {/* 4 Levels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {levels.map((lvl, idx) => (
          <div 
            key={idx} 
            className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 hover:border-slate-700 transition relative overflow-hidden"
          >
            {/* Top Info */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {lang === 'ta' ? lvl.titleTa : lvl.titleEn}
              </span>
              <span className="text-[10px] font-bold text-emerald-400 font-mono">
                {lvl.percent}% {lang === 'ta' ? 'முடிந்தது' : 'done'}
              </span>
            </div>

            {/* Lord & Symbol */}
            <div className="flex items-center gap-2 my-1">
              <div 
                className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-slate-950 shadow-inner"
                style={{ backgroundColor: lvl.color }}
              >
                {lvl.item?.symbol || '★'}
              </div>
              <div>
                <span className="font-extrabold text-xs text-amber-100 block">
                  {lvl.item?.lordTa} ({lvl.item?.lordEn})
                </span>
                <span className="text-[10px] text-slate-400 font-mono block">
                  {lvl.item?.formattedStart} - {lvl.item?.formattedEnd}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mt-2.5 border border-slate-800">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${lvl.percent}%`, backgroundColor: lvl.color }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

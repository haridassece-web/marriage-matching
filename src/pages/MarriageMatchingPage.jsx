import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import MatchingForm from '../components/matching/MatchingForm';
import MatchingSummary from '../components/matching/MatchingSummary';
import PoruthamTable from '../components/matching/PoruthamTable';
import DoshaReport from '../components/matching/DoshaReport';
import ThirumanaDhosamReport from '../components/matching/ThirumanaDhosamReport';
import KattaPoruthamReport from '../components/matching/KattaPoruthamReport';
import SpecialRulesReport from '../components/matching/SpecialRulesReport';
import ProgenyAndSpecialRulesReport from '../components/matching/ProgenyAndSpecialRulesReport';
import RasiChart from '../components/jathagam/RasiChart';
import NavamsamChart from '../components/jathagam/NavamsamChart';
import PlanetaryDegreesTable from '../components/jathagam/PlanetaryDegreesTable';
import MatchingReport from '../components/matching/MatchingReport';
import { calculateMarriageMatching } from '../engine/matching/marriageMatchingEngine';
import { calculatePanchangamFromBirthDetails } from '../engine/jathagam/panchangamCalculator';
import { Sparkles, Printer, FileText, CheckCircle, ShieldAlert, Grid, Award, Baby, Compass } from 'lucide-react';

export default function MarriageMatchingPage() {
  const [lang, setLang] = useState('ta'); // 'ta' or 'en'
  const [activeTab, setActiveTab] = useState('DASHBOARD'); // DASHBOARD, DHOSAM, KATTA, SPECIAL, PROGENY, CHARTS, REPORT

  const initialBridePanchangam = calculatePanchangamFromBirthDetails('1998-05-15', '07:30');
  const initialGroomPanchangam = calculatePanchangamFromBirthDetails('1995-08-20', '10:15');

  // Default initial horoscope state with DOB, TOB & Location
  const [bride, setBride] = useState({
    name: 'கவிதா (Bride)',
    dob: '1998-05-15',
    tob: '07:30',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    place: 'Chennai, Tamil Nadu, India',
    ...initialBridePanchangam
  });

  const [groom, setGroom] = useState({
    name: 'கார்த்திக் (Groom)',
    dob: '1995-08-20',
    tob: '10:15',
    city: 'Madurai',
    state: 'Tamil Nadu',
    country: 'India',
    place: 'Madurai, Tamil Nadu, India',
    ...initialGroomPanchangam
  });

  // Calculate matching result reactively using decoupled rule engine
  const matchingData = useMemo(() => {
    return calculateMarriageMatching(bride, groom);
  }, [bride, groom]);

  // Fire celebratory confetti when score is high (>8)
  useEffect(() => {
    if (matchingData.summary.totalScore >= 8 && matchingData.summary.grade === 'UTTAMAM') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  }, [matchingData.summary.totalScore, matchingData.summary.grade]);

  const handlePrint = () => {
    setActiveTab('REPORT');
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const handleCalculate = () => {
    setActiveTab('DASHBOARD');
  };

  const handleSave = () => {
    alert(lang === 'ta' ? 'ஜாதக விவரங்கள் வெற்றிகரமாக சேமிக்கப்பட்டன!' : 'Horoscope profiles saved successfully!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Header */}
      <Header lang={lang} setLang={setLang} onPrint={handlePrint} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 space-y-8">
        
        {/* Form Input Section */}
        <MatchingForm
          bride={bride}
          setBride={setBride}
          groom={groom}
          setGroom={setGroom}
          lang={lang}
          onCalculate={handleCalculate}
          onSave={handleSave}
          onPrint={handlePrint}
        />

        {/* View Switcher Tabs (Reference screenshot design) */}
        <div className="flex justify-center border-b border-slate-800 pb-1">
          <div className="flex flex-wrap justify-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-amber-500/30 text-xs shadow-xl">
            
            <button
              onClick={() => setActiveTab('DASHBOARD')}
              className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'DASHBOARD'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{lang === 'ta' ? '📌 பொது ரிப்போர்ட் (Dashboard)' : 'Dashboard Overview'}</span>
            </button>

            <button
              onClick={() => setActiveTab('CHARTS')}
              className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'CHARTS'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'ta' ? '🪐 ராசி & நவாம்சம் (D1/D9)' : 'D1 Rasi & D9 Navamsam'}</span>
            </button>

            <button
              onClick={() => setActiveTab('DHOSAM')}
              className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'DHOSAM'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-orange-400" />
              <span>{lang === 'ta' ? '🔥 9 திருமண தோஷங்கள்' : '9 Marriage Doshas'}</span>
            </button>

            <button
              onClick={() => setActiveTab('KATTA')}
              className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'KATTA'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4 text-yellow-400" />
              <span>{lang === 'ta' ? '📐 கட்டப் பொருத்தம் & முடக்கு' : 'Grid & Mudakku'}</span>
            </button>

            <button
              onClick={() => setActiveTab('SPECIAL')}
              className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'SPECIAL'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>{lang === 'ta' ? '👑 சிறப்பு விதிகள்' : 'Special Rules'}</span>
            </button>

            <button
              onClick={() => setActiveTab('PROGENY')}
              className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'PROGENY'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Baby className="w-4 h-4 text-pink-400" />
              <span>{lang === 'ta' ? '👶 புத்திர பாக்கியம்' : 'Progeny Rules'}</span>
            </button>

            <button
              onClick={() => setActiveTab('REPORT')}
              className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'REPORT'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>{lang === 'ta' ? '📄 PDF ஜாதக அறிக்கை' : 'PDF Horoscope Report'}</span>
            </button>

          </div>
        </div>

        {/* Tab 1: Dashboard View */}
        {activeTab === 'DASHBOARD' && (
          <div className="space-y-8 animate-fadeIn">
            <MatchingSummary matchingData={matchingData} lang={lang} />
            <PoruthamTable results={matchingData.results} lang={lang} />
            <DoshaReport doshaAnalysis={matchingData.doshaAnalysis} bride={bride} groom={groom} lang={lang} />
          </div>
        )}

        {/* Tab 2: D1 Rasi & D9 Navamsam Charts Comparative View */}
        {activeTab === 'CHARTS' && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <div className="text-center mb-4">
                <h3 className="text-lg font-extrabold text-amber-300">
                  {lang === 'ta' ? 'D1 ராசி சக்கரம் (முதன்மை ராசி கட்ட அமைப்பு)' : 'D1 Main Rasi Chart Alignment'}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RasiChart
                  title={lang === 'ta' ? 'பெண் ராசி சக்கரம் (D1)' : 'Bride Rasi Chart (D1)'}
                  personName={bride.name}
                  rasiId={bride.rasiId}
                  lagnaRasiId={bride.lagnaRasiId}
                  marsRasiId={bride.marsRasiId}
                  rasiPlanetsMap={bride.rasiPlanetsMap}
                  dob={bride.dob}
                  tob={bride.tob}
                  lang={lang}
                />
                <RasiChart
                  title={lang === 'ta' ? 'ஆண் ராசி சக்கரம் (D1)' : 'Groom Rasi Chart (D1)'}
                  personName={groom.name}
                  rasiId={groom.rasiId}
                  lagnaRasiId={groom.lagnaRasiId}
                  marsRasiId={groom.marsRasiId}
                  rasiPlanetsMap={groom.rasiPlanetsMap}
                  dob={groom.dob}
                  tob={groom.tob}
                  lang={lang}
                />
              </div>
            </div>

            <div>
              <div className="text-center mb-4">
                <h3 className="text-lg font-extrabold text-amber-300">
                  {lang === 'ta' ? 'D9 நவாம்ச சக்கரம் (திருமணம் & நவாம்சம்)' : 'D9 Navamsam Chart Alignment'}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NavamsamChart
                  title={lang === 'ta' ? 'பெண் நவாம்ச சக்கரம் (D9)' : 'Bride Navamsam Chart (D9)'}
                  personName={bride.name}
                  rasiId={bride.rasiId}
                  lagnaRasiId={bride.lagnaRasiId}
                  navamsamPlanetsMap={bride.navamsamPlanetsMap}
                  dob={bride.dob}
                  tob={bride.tob}
                  lang={lang}
                />
                <NavamsamChart
                  title={lang === 'ta' ? 'ஆண் நவாம்ச சக்கரம் (D9)' : 'Groom Navamsam Chart (D9)'}
                  personName={groom.name}
                  rasiId={groom.rasiId}
                  lagnaRasiId={groom.lagnaRasiId}
                  navamsamPlanetsMap={groom.navamsamPlanetsMap}
                  dob={groom.dob}
                  tob={groom.tob}
                  lang={lang}
                />
              </div>
            </div>

            {/* Planetary Degrees, Nakshatra, Saram & Chara Karakas Table */}
            <div className="space-y-6 pt-4">
              <div className="text-center mb-2">
                <h3 className="text-lg font-extrabold text-amber-300">
                  {lang === 'ta' ? '📊 கிரக பாகை, நட்சத்திர சாரம் & காரக அட்டவணை' : '📊 Planetary Degrees, Star Lords & Karakas Table'}
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PlanetaryDegreesTable
                  person={bride}
                  title={lang === 'ta' ? 'பெண் கிரக பாகை அட்டவணை' : 'Bride Planetary Degrees Table'}
                  colorTheme="rose"
                  lang={lang}
                />
                <PlanetaryDegreesTable
                  person={groom}
                  title={lang === 'ta' ? 'ஆண் கிரக பாகை அட்டவணை' : 'Groom Planetary Degrees Table'}
                  colorTheme="amber"
                  lang={lang}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: 9 Thirumana Dhosams View */}
        {activeTab === 'DHOSAM' && (
          <div className="animate-fadeIn">
            <ThirumanaDhosamReport bride={bride} groom={groom} lang={lang} />
          </div>
        )}

        {/* Tab 4: Katta Porutham & Lagna Analysis View */}
        {activeTab === 'KATTA' && (
          <div className="animate-fadeIn">
            <KattaPoruthamReport bride={bride} groom={groom} lang={lang} />
          </div>
        )}

        {/* Tab 5: Special Marriage Rules & Maturity View */}
        {activeTab === 'SPECIAL' && (
          <div className="animate-fadeIn">
            <SpecialRulesReport bride={bride} groom={groom} lang={lang} />
          </div>
        )}

        {/* Tab 6: Progeny & Special Rules View */}
        {activeTab === 'PROGENY' && (
          <div className="animate-fadeIn">
            <ProgenyAndSpecialRulesReport bride={bride} groom={groom} lang={lang} />
          </div>
        )}

        {/* Tab 7: Printable PDF Report View */}
        {activeTab === 'REPORT' && (
          <div className="space-y-4 animate-fadeIn">
            <MatchingReport matchingData={matchingData} lang={lang} onPrint={handlePrint} />
          </div>
        )}

      </main>

      <Footer lang={lang} />
    </div>
  );
}

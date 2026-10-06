// Complete Thirukanitha Astronomical Ephemeris & Panchangam Engine
// Calculates ALL 9 Grahas (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu) & Lagna with EXACT DEGREES (° ') for D1 Rasi & D9 Navamsam Charts

import { NAKSHATRAS } from '../../data/nakshatras.js';
import { RASIS } from '../../data/rasis.js';

// Pre-configured major cities with latitude & longitude coordinates
export const CITIES = {
  // All 38 Districts of Tamil Nadu
  "ariyalur": { name: "அரியலூர் (Ariyalur)", lat: 11.1401, lon: 79.0786 },
  "chengalpattu": { name: "செங்கல்பட்டு (Chengalpattu)", lat: 12.6841, lon: 79.9836 },
  "chennai": { name: "சென்னை (Chennai)", lat: 13.0827, lon: 80.2707 },
  "coimbatore": { name: "கோயம்புத்தூர் (Coimbatore)", lat: 11.0168, lon: 76.9558 },
  "cuddalore": { name: "கடலூர் (Cuddalore)", lat: 11.7480, lon: 79.7714 },
  "dharmapuri": { name: "தருமபுரி (Dharmapuri)", lat: 12.1211, lon: 78.1582 },
  "dindigul": { name: "திண்டுக்கல் (Dindigul)", lat: 10.3673, lon: 77.9803 },
  "erode": { name: "ஈரோடு (Erode)", lat: 11.3410, lon: 77.7172 },
  "kallakurichi": { name: "கள்ளக்குறிச்சி (Kallakurichi)", lat: 11.7384, lon: 78.9639 },
  "kanchipuram": { name: "காஞ்சிபுரம் (Kanchipuram)", lat: 12.8342, lon: 79.7036 },
  "kanyakumari": { name: "கன்னியாகுமரி (Kanyakumari)", lat: 8.0883, lon: 77.5385 },
  "nagercoil": { name: "நாகர்கோவில் (Nagercoil)", lat: 8.1833, lon: 77.4119 },
  "karur": { name: "கரூர் (Karur)", lat: 10.9601, lon: 78.0766 },
  "krishnagiri": { name: "கிருஷ்ணகிரி (Krishnagiri)", lat: 12.5186, lon: 78.2137 },
  "madurai": { name: "மதுரை (Madurai)", lat: 9.9252, lon: 78.1198 },
  "mayiladuthurai": { name: "மயிலாடுதுறை (Mayiladuthurai)", lat: 11.1018, lon: 79.6522 },
  "nagapattinam": { name: "நாகப்பட்டினம் (Nagapattinam)", lat: 10.7672, lon: 79.8449 },
  "namakkal": { name: "நாமக்கல் (Namakkal)", lat: 11.2189, lon: 78.1674 },
  "nilgiris": { name: "நீலகிரி / உதகமண்டலம் (Nilgiris / Ooty)", lat: 11.4102, lon: 76.6950 },
  "ooty": { name: "உதகமண்டலம் (Ooty)", lat: 11.4102, lon: 76.6950 },
  "perambalur": { name: "பெரம்பலூர் (Perambalur)", lat: 11.2342, lon: 78.8820 },
  "pudukkottai": { name: "புதுக்கோட்டை (Pudukkottai)", lat: 10.3797, lon: 78.8208 },
  "ramanathapuram": { name: "இராமநாதபுரம் (Ramanathapuram)", lat: 9.3639, lon: 78.8395 },
  "ranipet": { name: "ராணிப்பேட்டை (Ranipet)", lat: 12.9299, lon: 79.3323 },
  "salem": { name: "சேலம் (Salem)", lat: 11.6643, lon: 78.1460 },
  "sivaganga": { name: "சிவகங்கை (Sivaganga)", lat: 9.8433, lon: 78.4809 },
  "tenkasi": { name: "தென்காசி (Tenkasi)", lat: 8.9596, lon: 77.3149 },
  "thanjavur": { name: "தஞ்சாவூர் (Thanjavur)", lat: 10.7870, lon: 79.1378 },
  "theni": { name: "தேனி (Theni)", lat: 10.0104, lon: 77.4768 },
  "thoothukudi": { name: "தூத்துக்குடி (Thoothukudi)", lat: 8.7642, lon: 78.1348 },
  "tuticorin": { name: "தூத்துக்குடி (Tuticorin)", lat: 8.7642, lon: 78.1348 },
  "tiruchirappalli": { name: "திருச்சிராப்பள்ளி (Tiruchirappalli)", lat: 10.7905, lon: 78.7047 },
  "trichy": { name: "திருச்சி (Trichy)", lat: 10.7905, lon: 78.7047 },
  "tirunelveli": { name: "திருநெல்வேலி (Tirunelveli)", lat: 8.7139, lon: 77.7567 },
  "tirupathur": { name: "திருப்பத்தூர் (Tirupathur)", lat: 12.4947, lon: 78.5678 },
  "tiruppur": { name: "திருப்பூர் (Tiruppur)", lat: 11.1085, lon: 77.3411 },
  "tiruvallur": { name: "திருவள்ளூர் (Tiruvallur)", lat: 13.1432, lon: 79.9087 },
  "tiruvannamalai": { name: "திருவண்ணாமலை (Tiruvannamalai)", lat: 12.2253, lon: 79.0747 },
  "tiruvarur": { name: "திருவாரூர் (Tiruvarur)", lat: 10.7726, lon: 79.6365 },
  "vellore": { name: "வேலூர் (Vellore)", lat: 12.9165, lon: 79.1325 },
  "viluppuram": { name: "விழுப்புரம் (Viluppuram)", lat: 11.9401, lon: 79.4861 },
  "virudhunagar": { name: "விருதுநகர் (Virudhunagar)", lat: 9.5680, lon: 77.9624 },

  // Union Territories & Other States / Countries
  "pondicherry": { name: "புதுச்சேரி (Puducherry)", lat: 11.9416, lon: 79.8083 },
  "puducherry": { name: "புதுச்சேரி (Puducherry)", lat: 11.9416, lon: 79.8083 },
  "bengaluru": { name: "பெங்களூரு (Bengaluru)", lat: 12.9716, lon: 77.5946 },
  "hyderabad": { name: "ஹைதராபாத் (Hyderabad)", lat: 17.3850, lon: 78.4867 },
  "mumbai": { name: "மும்பை (Mumbai)", lat: 19.0760, lon: 72.8777 },
  "delhi": { name: "டெல்லி (New Delhi)", lat: 28.6139, lon: 77.2090 },
  "singapore": { name: "சிங்கப்பூர் (Singapore)", lat: 1.3521, lon: 103.8198 },
  "kualalumpur": { name: "மலேசியா (Kuala Lumpur)", lat: 3.1390, lon: 101.6869 },
  "colombo": { name: "இலங்கை (Colombo)", lat: 6.9271, lon: 79.8612 }
};

// 27 Nakshatras & Vimshottari Lords
export const NAKSHATRA_LIST = [
  { id: 1, name: "அஸ்வினி", english: "Ashwini", lord: "கேது" },
  { id: 2, name: "பரணி", english: "Bharani", lord: "சுக்கிரன்" },
  { id: 3, name: "கார்த்திகை", english: "Krittika", lord: "சூரியன்" },
  { id: 4, name: "ரோகிணி", english: "Rohini", lord: "சந்திரன்" },
  { id: 5, name: "மிருகசீரிஷம்", english: "Mrigashira", lord: "செவ்வாய்" },
  { id: 6, name: "திருவாதிரை", english: "Ardra", lord: "ராகு" },
  { id: 7, name: "புனர்பூசம்", english: "Punarvasu", lord: "குரு" },
  { id: 8, name: "பூசம்", english: "Pushya", lord: "சனி" },
  { id: 9, name: "ஆயில்யம்", english: "Ashlesha", lord: "புதன்" },
  { id: 10, name: "மகம்", english: "Magha", lord: "கேது" },
  { id: 11, name: "பூரம்", english: "Purva Phalguni", lord: "சுக்கிரன்" },
  { id: 12, name: "உத்திரம்", english: "Uttara Phalguni", lord: "சூரியன்" },
  { id: 13, name: "அஸ்தம்", english: "Hasta", lord: "சந்திரன்" },
  { id: 14, name: "சித்திரை", english: "Chitra", lord: "செவ்வாய்" },
  { id: 15, name: "சுவாதி", english: "Swati", lord: "ராகு" },
  { id: 16, name: "விசாகம்", english: "Vishakha", lord: "குரு" },
  { id: 17, name: "அனுஷம்", english: "Anuradha", lord: "சனி" },
  { id: 18, name: "கேட்டை", english: "Jyeshtha", lord: "புதன்" },
  { id: 19, name: "மூலம்", english: "Mula", lord: "கேது" },
  { id: 20, name: "பூராடம்", english: "Purva Ashadha", lord: "சுக்கிரன்" },
  { id: 21, name: "உத்திராடம்", english: "Uttara Ashadha", lord: "சூரியன்" },
  { id: 22, name: "திருவோணம்", english: "Shravana", lord: "சந்திரன்" },
  { id: 23, name: "அவிட்டம்", english: "Dhanishta", lord: "செவ்வாய்" },
  { id: 24, name: "சதயம்", english: "Shatabhisha", lord: "ராகு" },
  { id: 25, name: "பூரட்டாதி", english: "Purva Bhadrapada", lord: "குரு" },
  { id: 26, name: "உத்திரட்டாதி", english: "Uttara Bhadrapada", lord: "சனி" },
  { id: 27, name: "ரேவதி", english: "Revati", lord: "புதன்" }
];

// 27 Nitya Yogas
export const NITYA_YOGAS = [
  { id: 1, name: "விஷ்கம்பம்", english: "Vishkambha", nature: "அசுபம்" },
  { id: 2, name: "பிரீதி", english: "Priti", nature: "சுபம்" },
  { id: 3, name: "ஆயுஷ்மான்", english: "Ayushman", nature: "சுபம்" },
  { id: 4, name: "சௌபாக்யம்", english: "Saubhagya", nature: "சுபம்" },
  { id: 5, name: "சோபனம்", english: "Shobhana", nature: "சுபம்" },
  { id: 6, name: "அதிகண்டம்", english: "Atiganda", nature: "அசுபம்" },
  { id: 7, name: "சுகர்மம்", english: "Sukarma", nature: "சுபம்" },
  { id: 8, name: "திருதி", english: "Dhriti", nature: "சுபம்" },
  { id: 9, name: "சூலம்", english: "Shula", nature: "அசுபம்" },
  { id: 10, name: "கண்டம்", english: "Ganda", nature: "அசுபம்" },
  { id: 11, name: "விருத்தி", english: "Vriddhi", nature: "சுபம்" },
  { id: 12, name: "துருவம்", english: "Dhruva", nature: "சுபம்" },
  { id: 13, name: "வியாகாதம்", english: "Vyaghata", nature: "அசுபம்" },
  { id: 14, name: "ஹர்ஷணம்", english: "Harshana", nature: "சுபம்" },
  { id: 15, name: "வஜ்ரம்", english: "Vajra", nature: "அசுபம்" },
  { id: 16, name: "சித்தி", english: "Siddhi", nature: "சுபம்" },
  { id: 17, name: "வியதிபாதம்", english: "Vyatipata", nature: "அசுபம்" },
  { id: 18, name: "வரீயான்", english: "Variyan", nature: "சுபம்" },
  { id: 19, name: "பரிகம்", english: "Parigha", nature: "அசுபம்" },
  { id: 20, name: "சிவம்", english: "Shiva", nature: "சுபம்" },
  { id: 21, name: "சித்தம்", english: "Siddha", nature: "சுபம்" },
  { id: 22, name: "சாத்தியம்", english: "Sadhya", nature: "சுபம்" },
  { id: 23, name: "சுபம்", english: "Shubha", nature: "சுபம்" },
  { id: 24, name: "சுப்பிரம்", english: "Shukla", nature: "சுபம்" },
  { id: 25, name: "பிரம்மம்", english: "Brahma", nature: "சுபம்" },
  { id: 26, name: "ஐந்திரம்", english: "Indra", nature: "சுபம்" },
  { id: 27, name: "வைதிருதி", english: "Vaidhriti", nature: "அசுபம்" }
];

export const YOGAS = NITYA_YOGAS.map(y => ({
  id: y.id,
  nameTa: y.name,
  nameEn: y.english,
  nature: y.nature
}));

export const TITHI_NAMES = [
  "பிரதமை (Prathama)",
  "துவிதியை (Dvitiya)",
  "திருதியை (Tritiya)",
  "சதுர்த்தி (Chaturthi)",
  "பஞ்சமி (Panchami)",
  "சஷ்டி (Shashti)",
  "சப்தமி (Saptami)",
  "அஷ்டமி (Ashtami)",
  "நவமி (Navami)",
  "தசமி (Dashami)",
  "ஏகாதசி (Ekadashi)",
  "துவாதசி (Dvadashi)",
  "திரயோதசி (Trayodashi)",
  "சதுர்தசி (Chaturdashi)"
];

export const MOVABLE_KARANAS = [
  { name: "பவம் (Bava)", lord: "சூரியன்", animal: "சிங்கம்" },
  { name: "பாலவம் (Balava)", lord: "சந்திரன்", animal: "புலி" },
  { name: "கௌலவம் (Kaulava)", lord: "செவ்வாய்", animal: "பன்றி" },
  { name: "தைதுலை (Taitila)", lord: "புதன்", animal: "கழுதை" },
  { name: "கரசை (Garaja)", lord: "குரு", animal: "யானை" },
  { name: "வணிசை (Vanija)", lord: "சுக்கிரன்", animal: "பசு" },
  { name: "பத்திரை (Bhadra / Vishti)", lord: "சனி", animal: "நாய்" }
];

export const KARANAS = MOVABLE_KARANAS.map((k, i) => ({
  id: i + 1,
  nameTa: k.name.split(" ")[0],
  nameEn: k.name,
  type: 'சரம்'
}));

// Vimshottari Dasha Sequence
export const DASHA_ORDER = [
  { lord: "கேது", years: 7, color: "#d97706" },
  { lord: "சுக்கிரன்", years: 20, color: "#ec4899" },
  { lord: "சூரியன்", years: 6, color: "#ef4444" },
  { lord: "சந்திரன்", years: 10, color: "#94a3b8" },
  { lord: "செவ்வாய்", years: 7, color: "#dc2626" },
  { lord: "ராகு", years: 18, color: "#64748b" },
  { lord: "குரு", years: 16, color: "#f5c518" },
  { lord: "சனி", years: 19, color: "#818cf8" },
  { lord: "புதன்", years: 17, color: "#10b981" }
];

export const DHASA_LORDS = DASHA_ORDER.map(d => ({
  lordTa: d.lord,
  lordEn: d.lord,
  totalYears: d.years
}));

// Jaimini Chara Karaka Titles
export const CHARA_KARAKA_TITLES = [
  { code: "AK", name: "ஆத்மகாரகன்", desc: "தலைமை, ஆன்மா, ஆளுமை", color: "#ffd700" },
  { code: "AmK", name: "அமாத்தியகாரகன்", desc: "அறிவு, தொழில், செயல்", color: "#38bdf8" },
  { code: "BK", name: "பிராத்ருகாரகன்", desc: "சகோதரன், வழிகாட்டி", color: "#a855f7" },
  { code: "MK", name: "மாத்ருகாரகன்", desc: "தாய், கல்வி, சுகம்", color: "#ec4899" },
  { code: "PK", name: "புத்ரகாரகன்", desc: "பிள்ளைகள், ஞானம்", color: "#34d399" },
  { code: "GK", name: "ஞாதிகாரகன்", desc: "போராட்டம், பங்காளி, தடை", color: "#f97316" },
  { code: "DK", name: "தாரகாரகன்", desc: "களத்திரம், துணைவர்", color: "#f43f5e" }
];

export const STHIRA_KARAKAS = {
  "சூரியன்": { title: "பித்ருகாரகன்", details: "தந்தை, ஆத்மா, அரசு, நிர்வாகம்" },
  "சந்திரன்": { title: "மாத்ருகாரகன்", details: "தாய், மனம், நீர், மாற்றம்" },
  "செவ்வாய்": { title: "சகோதர / கணவன் காரகன்", details: "சகோதரன், கணவன், நிலம், வீரம்" },
  "புதன்": { title: "வித்யாகாரகன்", details: "கல்வி, புத்தி, மாமன், வர்த்தகம்" },
  "குரு": { title: "ஜீவகாரகன் / புத்திரகாரகன்", details: "ஜாதகர் (ஜீவன்), ஞானம், குழந்தைகள்" },
  "சுக்கிரன்": { title: "களத்திர / சுககாரகன்", details: "மனைவி, சொகுசு, வாகனம், செல்வம்" },
  "சனி": { title: "கர்ம / ஆயுள்காரகன்", details: "தொழில், வேலை, ஆயுள், உழைப்பு" },
  "ராகு": { title: "போக / பாட்டன் காரகன்", details: "தந்தைவழி பாட்டன், மாயை, வெளிநாடு" },
  "கேது": { title: "மோக்ஷ / ஞானகாரகன்", details: "தாய்வழி பாட்டன், ஞானம், முக்தி, ஆன்மீகம்" },
  "லக்கினம்": { title: "தேககாரகம்", details: "உடல், உயிர், சுய கௌரவம், ஆயுள்" }
};

// Trigonometric helpers & normalizers
const deg2rad = d => d * (Math.PI / 180);
const rad2deg = r => r * (180 / Math.PI);
const norm360 = d => ((d % 360) + 360) % 360;

// Solve Kepler's Equation M = E - e*sin(E) using Newton-Raphson
function solveKepler(M, e) {
  let E = M + e * Math.sin(deg2rad(M)) * (1.0 + e * Math.cos(deg2rad(M)));
  for (let iter = 0; iter < 15; iter++) {
    const dE = (E - e * rad2deg(Math.sin(deg2rad(E))) - M) / (1.0 - e * Math.cos(deg2rad(E)));
    E -= dE;
    if (Math.abs(dE) < 1e-7) break;
  }
  return E;
}

// Calculate Julian Day Number
function getJulianDay(year, month, day, hour = 0, minute = 0) {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  const dayFraction = (hour + minute / 60) / 24;
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + dayFraction + B - 1524.5;
}

// Compute instantaneous planetary longitudes at a specific Julian Day
function getPlanetsAtJD(jd, lat = 12.2253, lon = 79.0747) {
  const d = jd - 2451543.5;
  const T = (jd - 2451545.0) / 36525.0;

  // Lahiri Ayanamsa: 23° 51' 11" at J2000
  const ayanamsa = 23.85305556 - (2451545.0 - jd) * (50.290966 / (3600 * 365.25));

  // 1. Sun
  const w_sun = norm360(282.9404 + 4.70935e-5 * d);
  const e_sun = 0.016709 - 1.151e-9 * d;
  const M_sun = norm360(356.0470 + 0.9856002585 * d);
  const E_sun = solveKepler(M_sun, e_sun);
  const xv_sun = Math.cos(deg2rad(E_sun)) - e_sun;
  const yv_sun = Math.sqrt(1.0 - e_sun * e_sun) * Math.sin(deg2rad(E_sun));
  const v_sun = rad2deg(Math.atan2(yv_sun, xv_sun));
  const r_sun = Math.sqrt(xv_sun * xv_sun + yv_sun * yv_sun);
  const lonsun = norm360(v_sun + w_sun);
  const xs = r_sun * Math.cos(deg2rad(lonsun));
  const ys = r_sun * Math.sin(deg2rad(lonsun));

  // 2. Moon
  const N_moon = norm360(125.1228 - 0.0529538083 * d);
  const i_moon = 5.1454;
  const w_moon = norm360(318.0634 + 0.1643573223 * d);
  const a_moon = 60.2666;
  const e_moon = 0.054900;
  const M_moon = norm360(115.3654 + 13.0649929509 * d);
  const E_moon = solveKepler(M_moon, e_moon);
  const xv_moon = a_moon * (Math.cos(deg2rad(E_moon)) - e_moon);
  const yv_moon = a_moon * (Math.sqrt(1.0 - e_moon * e_moon) * Math.sin(deg2rad(E_moon)));
  const v_moon = rad2deg(Math.atan2(yv_moon, xv_moon));
  const r_moon = Math.sqrt(xv_moon * xv_moon + yv_moon * yv_moon);

  const xh_m = r_moon * (Math.cos(deg2rad(N_moon)) * Math.cos(deg2rad(v_moon + w_moon)) - Math.sin(deg2rad(N_moon)) * Math.sin(deg2rad(v_moon + w_moon)) * Math.cos(deg2rad(i_moon)));
  const yh_m = r_moon * (Math.sin(deg2rad(N_moon)) * Math.cos(deg2rad(v_moon + w_moon)) + Math.cos(deg2rad(N_moon)) * Math.sin(deg2rad(v_moon + w_moon)) * Math.cos(deg2rad(i_moon)));
  let moonLon = rad2deg(Math.atan2(yh_m, xh_m));

  // Lunar Perturbations
  const Ls = norm360(M_sun + w_sun);
  const Lm = norm360(M_moon + w_moon + N_moon);
  const D = norm360(Lm - Ls);
  const moonPert = -1.274 * Math.sin(deg2rad(M_moon - 2 * D))
                   + 0.658 * Math.sin(deg2rad(2 * D))
                   - 0.186 * Math.sin(deg2rad(M_sun))
                   - 0.059 * Math.sin(deg2rad(2 * M_moon - 2 * D))
                   - 0.057 * Math.sin(deg2rad(M_moon - 2 * D + M_sun))
                   + 0.053 * Math.sin(deg2rad(M_moon + 2 * D))
                   + 0.046 * Math.sin(deg2rad(2 * D - M_sun))
                   + 0.041 * Math.sin(deg2rad(M_moon - M_sun))
                   - 0.035 * Math.sin(deg2rad(D))
                   - 0.031 * Math.sin(deg2rad(M_moon + M_sun));
  moonLon = norm360(moonLon + moonPert);

  // 3. Orbital Elements for Mercury, Venus, Mars, Jupiter, Saturn
  const PLANET_ELEMENTS = {
    "புதன்": {
      N: d => norm360(48.3313 + 3.24587e-5 * d),
      i: d => 7.0047 + 5.00e-8 * d,
      w: d => norm360(29.1241 + 1.01444e-5 * d),
      a: d => 0.387098,
      e: d => 0.205635 + 5.59e-10 * d,
      M: d => norm360(168.6562 + 4.0923344368 * d)
    },
    "சுக்கிரன்": {
      N: d => norm360(76.6799 + 2.46590e-5 * d),
      i: d => 3.3946 + 2.75e-8 * d,
      w: d => norm360(54.8910 + 1.38374e-5 * d),
      a: d => 0.723330,
      e: d => 0.006773 - 1.302e-9 * d,
      M: d => norm360(48.0052 + 1.6021302244 * d)
    },
    "செவ்வாய்": {
      N: d => norm360(49.5574 + 2.11081e-5 * d),
      i: d => 1.8497 - 1.78e-8 * d,
      w: d => norm360(286.5016 + 2.92961e-5 * d),
      a: d => 1.523688,
      e: d => 0.093405 + 2.516e-9 * d,
      M: d => norm360(18.6021 + 0.5240207766 * d)
    },
    "குரு": {
      N: d => norm360(100.4542 + 2.76854e-5 * d),
      i: d => 1.3030 - 1.557e-7 * d,
      w: d => norm360(273.8777 + 1.64505e-5 * d),
      a: d => 5.20256,
      e: d => 0.048498 + 4.469e-9 * d,
      M: d => norm360(19.8950 + 0.0830853001 * d)
    },
    "சனி": {
      N: d => norm360(113.6634 + 2.38980e-5 * d),
      i: d => 2.4886 - 1.081e-7 * d,
      w: d => norm360(339.3939 + 2.97661e-5 * d),
      a: d => 9.55475,
      e: d => 0.055546 - 9.499e-9 * d,
      M: d => norm360(316.9670 + 0.0334442282 * d)
    }
  };

  const results = {};
  results["சூரியன்"] = norm360(lonsun - ayanamsa);
  results["சந்திரன்"] = norm360(moonLon - ayanamsa);

  // Rahu / Ketu (Mean North Node)
  const rahuLon = norm360(125.044522 - 1934.136261 * T);
  results["ராகு"] = norm360(rahuLon - ayanamsa);
  results["கேது"] = norm360(results["ராகு"] + 180);

  const Mj = PLANET_ELEMENTS["குரு"].M(d);
  const Ms = PLANET_ELEMENTS["சனி"].M(d);

  for (let p in PLANET_ELEMENTS) {
    const el = PLANET_ELEMENTS[p];
    const N = el.N(d);
    const i = el.i(d);
    const w = el.w(d);
    const a = el.a(d);
    const e = el.e(d);
    let M = el.M(d);
    if (p === "குரு") {
      M += -0.332 * Math.sin(deg2rad(2 * Mj - 5 * Ms - 67.6))
           - 0.056 * Math.sin(deg2rad(2 * Mj - 2 * Ms + 21))
           + 0.042 * Math.sin(deg2rad(3 * Mj - 5 * Ms + 21));
    } else if (p === "சனி") {
      M += 0.812 * Math.sin(deg2rad(2 * Mj - 5 * Ms - 67.6))
           - 0.229 * Math.cos(deg2rad(2 * Mj - 5 * Ms - 67.6))
           + 0.119 * Math.sin(deg2rad(Mj - 2 * Ms - 17.8));
    }

    const E = solveKepler(M, e);
    const xv = a * (Math.cos(deg2rad(E)) - e);
    const yv = a * (Math.sqrt(1.0 - e * e) * Math.sin(deg2rad(E)));
    const v = rad2deg(Math.atan2(yv, xv));
    const r = Math.sqrt(xv * xv + yv * yv);

    // Heliocentric coordinates
    const xh = r * (Math.cos(deg2rad(N)) * Math.cos(deg2rad(v + w)) - Math.sin(deg2rad(N)) * Math.sin(deg2rad(v + w)) * Math.cos(deg2rad(i)));
    const yh = r * (Math.sin(deg2rad(N)) * Math.cos(deg2rad(v + w)) + Math.cos(deg2rad(N)) * Math.sin(deg2rad(v + w)) * Math.cos(deg2rad(i)));

    // Geocentric coordinates
    const xg = xh + xs;
    const yg = yh + ys;
    const lonecl = rad2deg(Math.atan2(yg, xg));
    results[p] = norm360(lonecl - ayanamsa);
  }

  // Lagna (Ascendant) Calculation
  const oblecl = 23.4393 - 3.563e-7 * d;
  const GMST0 = norm360(280.46061837 + 360.98564736629 * (jd - 2451545.0));
  const LST = norm360(GMST0 + lon);
  const ramcRad = deg2rad(LST);
  const epsRad = deg2rad(oblecl);
  const latRad = deg2rad(lat);
  const yAsc = Math.cos(ramcRad);
  const xAsc = -Math.sin(ramcRad) * Math.cos(epsRad) - Math.tan(latRad) * Math.sin(epsRad);
  let ascTrop = norm360(rad2deg(Math.atan2(yAsc, xAsc)));
  results["லக்கினம்"] = norm360(ascTrop - ayanamsa);

  return {
    ayanamsa,
    results
  };
}

// Convert longitude degree 0..360 to Rasi ID 1..12 and formatted degree
function degToRasiAndDeg(totalDeg) {
  let norm = norm360(totalDeg);
  const rasiId = Math.floor(norm / 30) + 1;
  const degInRasi = norm % 30;
  const degrees = Math.floor(degInRasi);
  const minutes = Math.floor((degInRasi - degrees) * 60);
  const formattedDeg = `${degrees.toString().padStart(2, '0')}°${minutes.toString().padStart(2, '0')}'`;
  return { rasiId, degInRasi, formattedDeg };
}

// Navamsam D9 Calculation
function getNavamsamRasiId(rasiId, degInRasi) {
  const navDivisionIndex = Math.floor(degInRasi / (30 / 9)); // 0 to 8
  let startSign = 1;
  if ([1, 5, 9].includes(rasiId)) startSign = 1;       // Fiery -> Aries (1)
  else if ([2, 6, 10].includes(rasiId)) startSign = 10; // Earthy -> Capricorn (10)
  else if ([3, 7, 11].includes(rasiId)) startSign = 7;  // Airy -> Libra (7)
  else if ([4, 8, 12].includes(rasiId)) startSign = 4;  // Watery -> Cancer (4)

  let navRasiId = startSign + navDivisionIndex;
  if (navRasiId > 12) navRasiId -= 12;
  return navRasiId;
}

// Calculate 7 Chara Karakas (AK, AmK, BK, MK, PK, GK, DK)
export function calculateCharaKarakas(allGrahas) {
  const eligible = (allGrahas || []).filter(g => !['LAG', 'RAHU', 'KETU', 'லக்கினம்', 'ராகு', 'கேது'].includes(g.code || g.planet));
  const sorted = [...eligible].sort((a, b) => (b.degInRasi || b.degree || 0) - (a.degInRasi || a.degree || 0));

  const karakaMap = {};
  sorted.forEach((g, idx) => {
    if (idx < CHARA_KARAKA_TITLES.length) {
      const title = CHARA_KARAKA_TITLES[idx];
      const code = g.code || g.planet;
      karakaMap[code] = {
        code: title.code,
        nameTa: title.name,
        nameEn: title.name,
        desc: title.desc,
        color: title.color,
        planetCode: code,
        planetNameTa: g.nameTa || g.planet,
        degInRasi: g.degInRasi,
        formattedDeg: g.formattedDeg
      };
    }
  });

  return karakaMap;
}

// Main function used by PersonForm, MatchingForm, and Rasi/Navamsam Charts
export function calculatePanchangamFromBirthDetails(dob, tob, cityKeyOrName = 'tiruvannamalai', customLat = null, customLon = null) {
  if (!dob) return null;

  let lat = 12.2253; // Tiruvannamalai default
  let lon = 79.0747;

  if (customLat && customLon) {
    lat = parseFloat(customLat);
    lon = parseFloat(customLon);
  } else if (cityKeyOrName) {
    const key = cityKeyOrName.toLowerCase().replace(/[^a-z]/g, '');
    if (CITIES[key]) {
      lat = CITIES[key].lat;
      lon = CITIES[key].lon;
    }
  }

  const [year, month, day] = dob.split('-').map(Number);
  const [hour, minute] = (tob || '12:00').split(':').map(Number);

  // Convert IST (UTC+5:30) to UTC
  let utcHour = hour - 5.5 + minute / 60;
  let utcDay = day;
  let utcMonth = month;
  let utcYear = year;

  if (utcHour < 0) {
    utcHour += 24;
    utcDay -= 1;
    if (utcDay < 1) {
      utcMonth -= 1;
      if (utcMonth < 1) {
        utcMonth = 12;
        utcYear -= 1;
      }
      utcDay = 28;
    }
  }

  const jd = getJulianDay(utcYear, utcMonth, utcDay, Math.floor(utcHour), (utcHour % 1) * 60);
  const ephem = getPlanetsAtJD(jd, lat, lon);

  const planetCodeMap = {
    "சூரியன்": { code: "SUN", nameEn: "Sun" },
    "சந்திரன்": { code: "MOON", nameEn: "Moon" },
    "செவ்வாய்": { code: "MARS", nameEn: "Mars" },
    "புதன்": { code: "MERC", nameEn: "Mercury" },
    "குரு": { code: "JUP", nameEn: "Jupiter" },
    "சுக்கிரன்": { code: "VEN", nameEn: "Venus" },
    "சனி": { code: "SAT", nameEn: "Saturn" },
    "ராகு": { code: "RAHU", nameEn: "Rahu" },
    "கேது": { code: "KETU", nameEn: "Ketu" },
    "லக்கினம்": { code: "LAG", nameEn: "Lagna" }
  };

  const PLANET_ORDER = ["லக்கினம்", "சூரியன்", "சந்திரன்", "செவ்வாய்", "புதன்", "குரு", "சுக்கிரன்", "சனி", "ராகு", "கேது"];

  const allGrahas = PLANET_ORDER.map(nameTa => {
    const totalLon = ephem.results[nameTa];
    const info = degToRasiAndDeg(totalLon);
    const meta = planetCodeMap[nameTa];
    return {
      code: meta.code,
      nameTa: nameTa,
      nameEn: meta.nameEn,
      rasiId: info.rasiId,
      degInRasi: info.degInRasi,
      formattedDeg: info.formattedDeg,
      totalLon: totalLon
    };
  });

  const charaKarakasMap = calculateCharaKarakas(allGrahas);

  const rasiPlanetsMap = {};
  const navamsamPlanetsMap = {};
  for (let r = 1; r <= 12; r++) {
    rasiPlanetsMap[r] = [];
    navamsamPlanetsMap[r] = [];
  }

  const degPerStar = 360 / 27;

  allGrahas.forEach(g => {
    const starIdx = Math.floor(g.totalLon / degPerStar);
    const starObj = NAKSHATRA_LIST[starIdx % 27];
    const starProgressFrac = (g.totalLon % degPerStar) / degPerStar;
    const starPada = Math.floor(starProgressFrac * 4) + 1;
    const starLordInfo = DASHA_ORDER[starIdx % 9];

    g.starNakshatra = starObj;
    g.starPada = starPada;
    g.starLordTa = `${starLordInfo.lord} சாரம்`;
    g.starLordEn = `${starLordInfo.lord} Star`;
    g.charaKaraka = charaKarakasMap[g.code] || null;

    // D1 Placement
    rasiPlanetsMap[g.rasiId].push({
      ...g,
      labelTa: `${g.nameTa} ${g.formattedDeg}`,
      labelEn: `${g.nameEn} ${g.formattedDeg}`
    });

    // D9 Navamsam Placement
    const navRasiId = getNavamsamRasiId(g.rasiId, g.degInRasi);
    navamsamPlanetsMap[navRasiId].push({
      ...g,
      navRasiId,
      labelTa: `${g.nameTa} (D9) ${g.formattedDeg}`,
      labelEn: `${g.nameEn} (D9) ${g.formattedDeg}`
    });
  });

  const moonGraha = allGrahas.find(g => g.code === 'MOON');
  const sunGraha = allGrahas.find(g => g.code === 'SUN');
  const lagnaGraha = allGrahas.find(g => g.code === 'LAG');

  // Nakshatra & Pada
  const nakIndex = Math.floor(moonGraha.totalLon / degPerStar);
  const nakshatra = NAKSHATRA_LIST[nakIndex % 27];
  const starProgress = (moonGraha.totalLon % degPerStar) / degPerStar;
  const pada = Math.floor(starProgress * 4) + 1;

  // Yogam (Sun + Moon)
  const yogaDeg = norm360(sunGraha.totalLon + moonGraha.totalLon);
  const yogaIndex = Math.floor(yogaDeg / degPerStar);
  const yogam = NITYA_YOGAS[yogaIndex % 27];

  // Karanam (Moon - Sun)
  const diff = norm360(moonGraha.totalLon - sunGraha.totalLon);
  const karanaIndex = Math.floor(diff / 6);
  let karanam = null;
  if (karanaIndex === 0) {
    karanam = { nameTa: "கிம்துக்கினம்", nameEn: "Kimstughna", type: "ஸ்திரம்" };
  } else if (karanaIndex === 57) {
    karanam = { nameTa: "சகுனி", nameEn: "Shakuni", type: "ஸ்திரம்" };
  } else if (karanaIndex === 58) {
    karanam = { nameTa: "சதுஷ்பாதம்", nameEn: "Chatushpada", type: "ஸ்திரம்" };
  } else if (karanaIndex === 59) {
    karanam = { nameTa: "நாகவம்", nameEn: "Nagava", type: "ஸ்திரம்" };
  } else {
    const mIdx = (karanaIndex - 1) % 7;
    const k = MOVABLE_KARANAS[mIdx];
    karanam = { nameTa: k.name.split(" ")[0], nameEn: k.name, type: "சரம்" };
  }

  // Dasa Balance
  const dashaLordInfo = DASHA_ORDER[nakIndex % 9];
  const remainingFraction = 1 - starProgress;
  const remainingYearsTotal = dashaLordInfo.years * remainingFraction;
  const years = Math.floor(remainingYearsTotal);
  const monthsTotal = (remainingYearsTotal - years) * 12;
  const months = Math.floor(monthsTotal);
  const days = Math.floor((monthsTotal - months) * 30);

  const dhasaBalanceTa = `${dashaLordInfo.lord} மகா தசை இருப்பு: ${years} வருடங்கள், ${months} மாதங்கள், ${days} நாட்கள்`;
  const dhasaBalanceEn = `${dashaLordInfo.lord} Dhasa Balance: ${years} yrs, ${months} mos, ${days} days`;

  const rasiObj = RASIS.find(r => r.id === moonGraha.rasiId) || { nameTa: "துலாம்" };
  const lagnaObj = RASIS.find(r => r.id === lagnaGraha.rasiId) || { nameTa: "தனுசு" };

  return {
    dob,
    tob,
    ayanamsa: ephem.ayanamsa.toFixed(2),
    nakshatraId: nakshatra.id,
    nakshatraNameTa: nakshatra.name,
    nakshatraNameEn: nakshatra.english,
    starProgress,
    pada,
    rasiId: moonGraha.rasiId,
    rasiNameTa: rasiObj.nameTa,
    lagnaRasiId: lagnaGraha.rasiId,
    lagnaNameTa: lagnaObj.nameTa,
    sunRasiId: sunGraha.rasiId,
    marsRasiId: allGrahas.find(g => g.code === 'MARS').rasiId,
    mercuryRasiId: allGrahas.find(g => g.code === 'MERC').rasiId,
    jupiterRasiId: allGrahas.find(g => g.code === 'JUP').rasiId,
    venusRasiId: allGrahas.find(g => g.code === 'VEN').rasiId,
    saturnRasiId: allGrahas.find(g => g.code === 'SAT').rasiId,
    rahuRasiId: allGrahas.find(g => g.code === 'RAHU').rasiId,
    ketuRasiId: allGrahas.find(g => g.code === 'KETU').rasiId,
    allGrahas,
    charaKarakasMap,
    rasiPlanetsMap,
    navamsamPlanetsMap,
    yogam: {
      id: yogam.id,
      nameTa: yogam.name,
      nameEn: yogam.english,
      nature: yogam.nature
    },
    karanam: {
      nameTa: karanam.nameTa,
      nameEn: karanam.nameEn,
      type: karanam.type
    },
    dhasaLordObj: {
      lordTa: dashaLordInfo.lord,
      lordEn: dashaLordInfo.lord,
      totalYears: dashaLordInfo.years
    },
    dhasaBalanceTa,
    dhasaBalanceEn
  };
}


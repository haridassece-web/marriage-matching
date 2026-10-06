/**
 * Vimshottari Dasa - Bhukti - Antharam - Sookshmam Engine
 * High precision 4-level Vimshottari Dasha calculation for Tamil / Vedic Astrology
 */

export const DASHA_ORDER = [
  { id: 'KETU', lordTa: 'கேது', lordEn: 'Ketu', years: 7, color: '#d97706', symbol: '☋' },
  { id: 'VENUS', lordTa: 'சுக்கிரன்', lordEn: 'Venus (Sukra)', years: 20, color: '#ec4899', symbol: '♀' },
  { id: 'SUN', lordTa: 'சூரியன்', lordEn: 'Sun (Surya)', years: 6, color: '#ef4444', symbol: '☉' },
  { id: 'MOON', lordTa: 'சந்திரன்', lordEn: 'Moon (Chandra)', years: 10, color: '#94a3b8', symbol: '☽' },
  { id: 'MARS', lordTa: 'செவ்வாய்', lordEn: 'Mars (Chevvai)', years: 7, color: '#dc2626', symbol: '♂' },
  { id: 'RAHU', lordTa: 'ராகு', lordEn: 'Rahu', years: 18, color: '#64748b', symbol: '☊' },
  { id: 'JUPITER', lordTa: 'குரு', lordEn: 'Jupiter (Guru)', years: 16, color: '#f5c518', symbol: '♃' },
  { id: 'SATURN', lordTa: 'சனி', lordEn: 'Saturn (Sani)', years: 19, color: '#818cf8', symbol: '♄' },
  { id: 'MERCURY', lordTa: 'புதன்', lordEn: 'Mercury (Budhan)', years: 17, color: '#10b981', symbol: '☿' }
];

const MS_PER_DAY = 86400000;
const MS_PER_YEAR = 365.25 * MS_PER_DAY;

/**
 * Format a timestamp into localized Tamil/English date format (e.g. "15/05/1998")
 */
export function formatDate(ms, lang = 'ta') {
  if (!ms) return '-';
  const d = new Date(ms);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Format timestamp with time (e.g. "15/05/1998 14:30")
 */
export function formatDateTime(ms, lang = 'ta') {
  if (!ms) return '-';
  const d = new Date(ms);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const mins = String(d.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${mins}`;
}

/**
 * Convert milliseconds to friendly years, months, days string
 */
export function formatDuration(durationMs, lang = 'ta') {
  if (!durationMs || durationMs <= 0) return '0d';
  const totalDays = durationMs / MS_PER_DAY;
  const yrs = Math.floor(totalDays / 365.25);
  const remDaysAfterYrs = totalDays - (yrs * 365.25);
  const mos = Math.floor(remDaysAfterYrs / 30.4375);
  const days = Math.floor(remDaysAfterYrs - (mos * 30.4375));
  const hrs = Math.floor((remDaysAfterYrs - Math.floor(remDaysAfterYrs)) * 24);

  if (lang === 'ta') {
    const parts = [];
    if (yrs > 0) parts.push(`${yrs} வ`);
    if (mos > 0) parts.push(`${mos} மா`);
    if (days > 0) parts.push(`${days} நா`);
    if (yrs === 0 && mos === 0 && hrs > 0) parts.push(`${hrs} மணி`);
    return parts.join(' ') || '1 நா';
  } else {
    const parts = [];
    if (yrs > 0) parts.push(`${yrs}y`);
    if (mos > 0) parts.push(`${mos}m`);
    if (days > 0) parts.push(`${days}d`);
    if (yrs === 0 && mos === 0 && hrs > 0) parts.push(`${hrs}h`);
    return parts.join(' ') || '1d';
  }
}

/**
 * Helper to parse birth timestamp cleanly in UTC
 */
function getBirthTimeMs(dob, tob) {
  if (!dob) return Date.now();
  const [y, m, d] = dob.split('-').map(Number);
  const [h, min] = (tob || '07:30').split(':').map(Number);
  return Date.UTC(y, m - 1, d, h, min, 0);
}

/**
 * Helper to determine PAST, PRESENT, or FUTURE status
 */
function getPeriodStatus(startMs, endMs, targetMs) {
  if (targetMs >= endMs) return 'PAST';
  if (targetMs < startMs) return 'FUTURE';
  return 'PRESENT';
}

/**
 * Calculate 9 Sookshmam sub-periods under an Antharam
 */
export function calculateSookshmams(dashaLord, bhuktiLord, antharamLord, antharamStartMs, targetMs) {
  const sookshmams = [];
  let currentMs = antharamStartMs;
  const antharamLordIdx = DASHA_ORDER.findIndex(d => d.id === antharamLord.id);

  for (let m = 0; m < 9; m++) {
    const sLordIdx = (antharamLordIdx + m) % 9;
    const sLord = DASHA_ORDER[sLordIdx];

    // Duration formula: (Dasha_Y * Bhukti_Y * Antharam_Y * Sookshmam_Y) / (120 * 120 * 120) years
    const sYears = (dashaLord.years * bhuktiLord.years * antharamLord.years * sLord.years) / 1728000;
    const durationMs = sYears * MS_PER_YEAR;
    const startMs = currentMs;
    const endMs = startMs + durationMs;
    currentMs = endMs;

    const status = getPeriodStatus(startMs, endMs, targetMs);

    sookshmams.push({
      id: `${dashaLord.id}-${bhuktiLord.id}-${antharamLord.id}-${sLord.id}`,
      level: 4,
      levelNameTa: 'சூட்சுமம்',
      levelNameEn: 'Sookshmam',
      lordId: sLord.id,
      lordTa: sLord.lordTa,
      lordEn: sLord.lordEn,
      color: sLord.color,
      symbol: sLord.symbol,
      startMs,
      endMs,
      durationMs,
      formattedStart: formatDateTime(startMs),
      formattedEnd: formatDateTime(endMs),
      durationText: formatDuration(durationMs),
      status
    });
  }
  return sookshmams;
}

/**
 * Calculate 9 Antharam sub-periods under a Bhukti
 */
export function calculateAntharams(dashaLord, bhuktiLord, bhuktiStartMs, targetMs, includeSookshmams = true) {
  const antharams = [];
  let currentMs = bhuktiStartMs;
  const bhuktiLordIdx = DASHA_ORDER.findIndex(d => d.id === bhuktiLord.id);

  for (let k = 0; k < 9; k++) {
    const aLordIdx = (bhuktiLordIdx + k) % 9;
    const aLord = DASHA_ORDER[aLordIdx];

    // Duration formula: (Dasha_Y * Bhukti_Y * Antharam_Y) / (120 * 120) years
    const aYears = (dashaLord.years * bhuktiLord.years * aLord.years) / 14400;
    const durationMs = aYears * MS_PER_YEAR;
    const startMs = currentMs;
    const endMs = startMs + durationMs;
    currentMs = endMs;

    const status = getPeriodStatus(startMs, endMs, targetMs);
    const sookshmams = includeSookshmams ? calculateSookshmams(dashaLord, bhuktiLord, aLord, startMs, targetMs) : [];

    antharams.push({
      id: `${dashaLord.id}-${bhuktiLord.id}-${aLord.id}`,
      level: 3,
      levelNameTa: 'அந்தரம்',
      levelNameEn: 'Antharam',
      lordId: aLord.id,
      lordTa: aLord.lordTa,
      lordEn: aLord.lordEn,
      color: aLord.color,
      symbol: aLord.symbol,
      startMs,
      endMs,
      durationMs,
      formattedStart: formatDate(startMs),
      formattedEnd: formatDate(endMs),
      durationText: formatDuration(durationMs),
      status,
      sookshmams
    });
  }
  return antharams;
}

/**
 * Calculate 9 Bhukti sub-periods under a Dasa
 */
export function calculateBhuktis(dashaLord, dashaStartMs, targetMs, includeSubLevels = true) {
  const bhuktis = [];
  let currentMs = dashaStartMs;
  const dashaLordIdx = DASHA_ORDER.findIndex(d => d.id === dashaLord.id);

  for (let j = 0; j < 9; j++) {
    const bLordIdx = (dashaLordIdx + j) % 9;
    const bLord = DASHA_ORDER[bLordIdx];

    // Duration formula: (Dasha_Y * Bhukti_Y) / 120 years
    const bYears = (dashaLord.years * bLord.years) / 120;
    const durationMs = bYears * MS_PER_YEAR;
    const startMs = currentMs;
    const endMs = startMs + durationMs;
    currentMs = endMs;

    const status = getPeriodStatus(startMs, endMs, targetMs);
    const antharams = includeSubLevels ? calculateAntharams(dashaLord, bLord, startMs, targetMs, true) : [];

    bhuktis.push({
      id: `${dashaLord.id}-${bLord.id}`,
      level: 2,
      levelNameTa: 'புத்தி',
      levelNameEn: 'Bhukti',
      lordId: bLord.id,
      lordTa: bLord.lordTa,
      lordEn: bLord.lordEn,
      color: bLord.color,
      symbol: bLord.symbol,
      startMs,
      endMs,
      durationMs,
      formattedStart: formatDate(startMs),
      formattedEnd: formatDate(endMs),
      durationText: formatDuration(durationMs),
      status,
      antharams
    });
  }
  return bhuktis;
}

/**
 * Calculate complete 120-year Vimshottari Dasa timeline with Bhuktis, Antharams, & Sookshmams
 */
export function calculateCompleteDhasaTimeline(dob, tob, nakshatraId = 1, starProgress = 0, targetDate = new Date()) {
  const targetMs = targetDate instanceof Date ? targetDate.getTime() : new Date(targetDate).getTime();
  const birthMs = getBirthTimeMs(dob, tob);

  // Nakshatra Index (0 to 26) -> Dasa Lord Index (0 to 8)
  const nakIndex = ((nakshatraId - 1) % 27 + 27) % 27;
  const startDashaIdx = nakIndex % 9;
  const initialLord = DASHA_ORDER[startDashaIdx];

  // Elapsed birth Dasa based on star progress
  const safeProgress = Math.max(0, Math.min(1, starProgress || 0));
  const birthDashaElapsedYears = initialLord.years * safeProgress;
  const birthDashaStartMs = birthMs - (birthDashaElapsedYears * MS_PER_YEAR);

  const dasas = [];
  let currentMs = birthDashaStartMs;

  for (let i = 0; i < 9; i++) {
    const dLordIdx = (startDashaIdx + i) % 9;
    const dLord = DASHA_ORDER[dLordIdx];
    const durationMs = dLord.years * MS_PER_YEAR;
    const startMs = currentMs;
    const endMs = startMs + durationMs;
    currentMs = endMs;

    const status = getPeriodStatus(startMs, endMs, targetMs);
    const bhuktis = calculateBhuktis(dLord, startMs, targetMs, true);

    dasas.push({
      id: dLord.id,
      level: 1,
      levelNameTa: 'மகா தசை',
      levelNameEn: 'Major Dasa',
      lordId: dLord.id,
      lordTa: dLord.lordTa,
      lordEn: dLord.lordEn,
      color: dLord.color,
      symbol: dLord.symbol,
      totalYears: dLord.years,
      startMs,
      endMs,
      durationMs,
      formattedStart: formatDate(startMs),
      formattedEnd: formatDate(endMs),
      durationText: `${dLord.years} வருடங்கள்`,
      status,
      bhuktis
    });
  }

  // Find currently active Dasa, Bhukti, Antharam, & Sookshmam
  let activeDasa = dasas.find(d => d.status === 'PRESENT') || dasas[0];
  let activeBhukti = activeDasa?.bhuktis?.find(b => b.status === 'PRESENT') || activeDasa?.bhuktis?.[0];
  let activeAntharam = activeBhukti?.antharams?.find(a => a.status === 'PRESENT') || activeBhukti?.antharams?.[0];
  let activeSookshmam = activeAntharam?.sookshmams?.find(s => s.status === 'PRESENT') || activeAntharam?.sookshmams?.[0];

  // Calculate percentages completed
  const getPercent = (start, end) => {
    if (targetMs >= end) return 100;
    if (targetMs <= start) return 0;
    return Math.min(100, Math.max(0, Math.round(((targetMs - start) / (end - start)) * 100)));
  };

  return {
    dob,
    tob,
    targetDateMs: targetMs,
    targetDateFormatted: formatDate(targetMs),
    birthDateFormatted: formatDate(birthMs),
    dasas,
    activeSummary: {
      dasa: activeDasa,
      bhukti: activeBhukti,
      antharam: activeAntharam,
      sookshmam: activeSookshmam,
      dasaPercent: getPercent(activeDasa.startMs, activeDasa.endMs),
      bhuktiPercent: getPercent(activeBhukti.startMs, activeBhukti.endMs),
      antharamPercent: getPercent(activeAntharam.startMs, activeAntharam.endMs),
      sookshmamPercent: getPercent(activeSookshmam.startMs, activeSookshmam.sookshmamEndMs || activeSookshmam.endMs)
    }
  };
}

import { NADI_TABLE, NADI_TYPES } from '../../data/nadiTable';
import { getNakshatraById } from '../../data/nakshatras';

export function calculateNadi(bride, groom) {
  const bNakId = parseInt(bride.nakshatraId, 10);
  const gNakId = parseInt(groom.nakshatraId, 10);

  const bNak = getNakshatraById(bNakId);
  const gNak = getNakshatraById(gNakId);

  const bNadiKey = NADI_TABLE[bNakId] || 'AADI';
  const gNadiKey = NADI_TABLE[gNakId] || 'AADI';

  const bNadi = NADI_TYPES[bNadiKey];
  const gNadi = NADI_TYPES[gNadiKey];

  const isSameNadi = bNadiKey === gNadiKey;

  let status = isSameNadi ? 'FAIL' : 'PASS';
  let score = isSameNadi ? 0 : 1;
  let ruleApplied = isSameNadi ? `Same Nadi (${bNadi.nameEn}) - NADI DOSHAM` : 'Different Nadi (Uttamam)';

  let explanationTa = isSameNadi
    ? `⚠️ நாடி தோஷம்! பெண் (${bNak.nameTa}) மற்றும் ஆண் (${gNak.nameTa}) இருவரும் ஒரே (${bNadi.nameTa}) நாடியைக் கொண்டவர்கள். உடல்நலம் மற்றும் சந்ததி விருத்தியில் பாதிப்பு வரலாம்.`
    : `✅ நாடி பொருத்தம் உத்தமம். பெண் (${bNadi.nameTa}) மற்றும் ஆண் (${gNadi.nameTa}) வெவ்வேறு நாடிகள். தம்பதியருக்கு நல்ல ஆரோக்கியமும் புத்திர பாக்கியமும் அமையும்.`;

  let explanationEn = isSameNadi
    ? `⚠️ NADI DOSHAM ALERT! Both Bride (${bNak.nameEn}) and Groom (${gNak.nameEn}) share the same Nadi (${bNadi.nameEn}). Potential health/progeny issues.`
    : `✅ Excellent Nadi Porutham! Bride (${bNadi.nameEn}) and Groom (${gNadi.nameEn}) have complementary Nadis. Ensures physical harmony and offspring health.`;

  return {
    id: 'NADI',
    nameTa: 'நாடி பொருத்தம்',
    nameEn: 'Nadi Porutham',
    status,
    score,
    maxScore: 1,
    category: 'CRITICAL_DOSHA',
    importance: 'HIGH',
    calculation: { brideNadi: bNadi.nameTa, groomNadi: gNadi.nameTa, isSameNadi },
    ruleApplied,
    explanationTa,
    explanationEn,
    warning: isSameNadi ? 'ஒரே நாடி - சந்ததி பாக்கியத்தில் கவனம் தேவை' : null
  };
}

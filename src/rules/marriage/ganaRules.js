import { GANA_TABLE, GANA_LABELS } from '../../data/ganaTable';
import { getNakshatraById } from '../../data/nakshatras';

export function calculateGana(bride, groom) {
  const bNakId = parseInt(bride.nakshatraId, 10);
  const gNakId = parseInt(groom.nakshatraId, 10);

  const bGana = GANA_TABLE[bNakId] || 'DEVA';
  const gGana = GANA_TABLE[gNakId] || 'DEVA';

  const bLabel = GANA_LABELS[bGana];
  const gLabel = GANA_LABELS[gGana];

  let status = 'FAIL';
  let score = 0;
  let ruleApplied = '';
  let explanationTa = '';
  let explanationEn = '';

  if (bGana === gGana) {
    status = 'PASS';
    score = 1;
    ruleApplied = 'Same Gana Match';
    explanationTa = `பெண் (${bLabel.nameTa}) மற்றும் ஆண் (${gLabel.nameTa}) இருவரும் ஒரே கணத்தைச் சேர்ந்தவர்கள். இது உத்தமமான பொருத்தம்.`;
    explanationEn = `Bride (${bLabel.nameEn}) and Groom (${gLabel.nameEn}) belong to the same Gana. Excellent compatibility for temperament.`;
  } else if ((bGana === 'DEVA' && gGana === 'MANUSHYA') || (bGana === 'MANUSHYA' && gGana === 'DEVA')) {
    status = 'PASS';
    score = 1;
    ruleApplied = 'Deva - Manushya Compatible Combination';
    explanationTa = `பெண் (${bLabel.nameTa}) மற்றும் ஆண் (${gLabel.nameTa}) தேவ-மனித சேர்க்கை. இது மத்தியம பொருத்தம்.`;
    explanationEn = `Deva and Manushya combination between Bride and Groom. Good/Medium compatibility for harmony.`;
  } else if (bGana === 'DEVA' && gGana === 'RAKSHASA') {
    status = 'PARTIAL';
    score = 0.5;
    ruleApplied = 'Deva Bride & Rakshasa Groom (Acceptable with tolerance)';
    explanationTa = `பெண் தேவ கணம், ஆண் ராட்சச கணம். ஆண் ராட்சச கணமாக இருப்பதால் ஓரளவுக்கு ஏற்றுக்கொள்ளலாம்.`;
    explanationEn = `Bride is Deva Gana and Groom is Rakshasa Gana. Acceptable moderate match.`;
  } else {
    status = 'FAIL';
    score = 0;
    ruleApplied = 'Rakshasa Bride incompatibility';
    explanationTa = `பெண் (${bLabel.nameTa}), ஆண் (${gLabel.nameTa}). பெண் ராட்சச கணமாக இருக்கும் போது பொருத்தம் இல்லை (அதமம்).`;
    explanationEn = `Bride is ${bLabel.nameEn} while Groom is ${gLabel.nameEn}. This leads to temperamental mismatch (Incompatible).`;
  }

  return {
    id: 'GANA',
    nameTa: 'கண பொருத்தம்',
    nameEn: 'Gana Porutham',
    status,
    score,
    maxScore: 1,
    category: 'PORUTHAM',
    importance: 'HIGH',
    calculation: { brideGana: bLabel.nameTa, groomGana: gLabel.nameTa },
    ruleApplied,
    explanationTa,
    explanationEn
  };
}

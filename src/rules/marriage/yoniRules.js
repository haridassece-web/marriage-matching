import { YONI_TABLE, YONI_ENEMY_PAIRS } from '../../data/yoniTable';

export function calculateYoni(bride, groom) {
  const bNakId = parseInt(bride.nakshatraId, 10);
  const gNakId = parseInt(groom.nakshatraId, 10);

  const bYoni = YONI_TABLE[bNakId] || { animalEn: 'Horse', animalTa: 'குதிரை', gender: 'F' };
  const gYoni = YONI_TABLE[gNakId] || { animalEn: 'Horse', animalTa: 'குதிரை', gender: 'M' };

  const isSameAnimal = bYoni.animalEn === gYoni.animalEn;
  const isOppositeGender = bYoni.gender !== gYoni.gender;

  const isEnemy = YONI_ENEMY_PAIRS.some(([a, b]) => 
    (a === bYoni.animalEn && b === gYoni.animalEn) || (b === bYoni.animalEn && a === gYoni.animalEn)
  );

  let status = 'FAIL';
  let score = 0;
  let ruleApplied = '';
  let explanationTa = '';
  let explanationEn = '';

  if (isEnemy) {
    status = 'FAIL';
    score = 0;
    ruleApplied = 'Enemy Yoni Animal Pair';
    explanationTa = `பெண் (${bYoni.animalTa}) மற்றும் ஆண் (${gYoni.animalTa}) யோனி மிருகங்கள் பகையாகும் (பகை யோனி - அதமம்). உடலமைப்பு / தம்பதியர் இணக்கத்தில் சவால்கள் வரலாம்.`;
    explanationEn = `Bride (${bYoni.animalEn}) and Groom (${gYoni.animalEn}) are natural enemy animals. High physical/temperamental mismatch.`;
  } else if (isSameAnimal && isOppositeGender) {
    status = 'PASS';
    score = 1;
    ruleApplied = 'Perfect Yoni Match (Same animal, male-female)';
    explanationTa = `பெண் (${bYoni.animalTa} - பெண்) மற்றும் ஆண் (${gYoni.animalTa} - ஆண்). மிகச் சிறந்த உத்தம யோனி பொருத்தம்.`;
    explanationEn = `Bride (${bYoni.animalEn} Female) and Groom (${gYoni.animalEn} Male) are identical yoni species. Perfect physical harmony.`;
  } else if (isSameAnimal) {
    status = 'PASS';
    score = 1;
    ruleApplied = 'Same Yoni Animal';
    explanationTa = `பெண் மற்றும் ஆண் இருவரும் ஒரே (${bYoni.animalTa}) யோனியைச் சேர்ந்தவர்கள். நற்பலன் தரும்.`;
    explanationEn = `Both belong to ${bYoni.animalEn} Yoni. Excellent compatibility.`;
  } else {
    status = 'PASS';
    score = 0.5;
    ruleApplied = 'Neutral Yoni Combination';
    explanationTa = `பெண் (${bYoni.animalTa}) மற்றும் ஆண் (${gYoni.animalTa}) யோனிகள் பகை இல்லாத சமமானவை (மத்தியமம்).`;
    explanationEn = `Bride (${bYoni.animalEn}) and Groom (${gYoni.animalEn}) are friendly/neutral species. Moderate match.`;
  }

  return {
    id: 'YONI',
    nameTa: 'யோனி பொருத்தம்',
    nameEn: 'Yoni Porutham',
    status,
    score,
    maxScore: 1,
    category: 'PORUTHAM',
    importance: 'HIGH',
    calculation: { brideYoni: `${bYoni.animalTa} (${bYoni.gender})`, groomYoni: `${gYoni.animalTa} (${gYoni.gender})` },
    ruleApplied,
    explanationTa,
    explanationEn
  };
}

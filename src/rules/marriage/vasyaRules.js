import { checkVasyaMatch } from '../../data/vasyaTable';
import { getRasiById } from '../../data/rasis';

export function calculateVasya(bride, groom) {
  const bRasi = getRasiById(bride.rasiId);
  const gRasi = getRasiById(groom.rasiId);

  const vasyaResult = checkVasyaMatch(bride.rasiId, groom.rasiId);

  let status = 'FAIL';
  let score = vasyaResult.score;
  let ruleApplied = '';
  let explanationTa = '';
  let explanationEn = '';

  if (vasyaResult.status === 'MUTUAL') {
    status = 'PASS';
    score = 1;
    ruleApplied = 'Mutual Vasya Attraction';
    explanationTa = `${bRasi.nameTa} மற்றும் ${gRasi.nameTa} பரஸ்பர வசிய ராசிகளாகும். கணவன்-மனைவியரிடையே அன்யோன்யமும் அன்பும் எப்போதும் நிலைத்திருக்கும்.`;
    explanationEn = `${bRasi.nameEn} and ${gRasi.nameEn} share mutual Vasya. Deep affectionate bond between husband and wife.`;
  } else if (vasyaResult.status === 'SINGLE') {
    status = 'PASS';
    score = 0.5;
    ruleApplied = 'One-way Vasya';
    explanationTa = `${bRasi.nameTa} மற்றும் ${gRasi.nameTa} ஒருவழி வசிய பொருத்தம் கொண்டவை.`;
    explanationEn = `One-way Vasya relationship between ${bRasi.nameEn} and ${gRasi.nameEn}. Moderate attraction.`;
  } else {
    status = 'FAIL';
    score = 0;
    ruleApplied = 'No Vasya Match';
    explanationTa = `${bRasi.nameTa} மற்றும் ${gRasi.nameTa} வசிய ராசிகள் அல்ல. வசிய பொருத்தம் இல்லை.`;
    explanationEn = `No Vasya relationship between ${bRasi.nameEn} and ${gRasi.nameEn}.`;
  }

  return {
    id: 'VASYA',
    nameTa: 'வசிய பொருத்தம்',
    nameEn: 'Vasya Porutham',
    status,
    score,
    maxScore: 1,
    category: 'PORUTHAM',
    importance: 'MEDIUM',
    calculation: { brideRasi: bRasi.nameTa, groomRasi: gRasi.nameTa, matchType: vasyaResult.status },
    ruleApplied,
    explanationTa,
    explanationEn
  };
}

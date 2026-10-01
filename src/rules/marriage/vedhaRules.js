import { checkHasVedha } from '../../data/vedhaTable';
import { getNakshatraById } from '../../data/nakshatras';

export function calculateVedha(bride, groom) {
  const bNakId = parseInt(bride.nakshatraId, 10);
  const gNakId = parseInt(groom.nakshatraId, 10);

  const bNak = getNakshatraById(bNakId);
  const gNak = getNakshatraById(gNakId);

  const hasVedha = checkHasVedha(bNakId, gNakId);

  let status = hasVedha ? 'FAIL' : 'PASS';
  let score = hasVedha ? 0 : 1;
  let ruleApplied = hasVedha ? 'Mutual Vedha Affliction Found' : 'No Vedha Affliction';

  let explanationTa = hasVedha
    ? `⚠️ வேதா தோஷம்! பெண் நட்சத்திரம் (${bNak.nameTa}) மற்றும் ஆண் நட்சத்திரம் (${gNak.nameTa}) ஒன்றுக்கொன்று வேதை பரஸ்பர தோஷம் கொண்டவை. இச்சேர்க்கை துன்பத்தை தரும்.`
    : `✅ வேதா பொருத்தம் உத்தமம். பெண் (${bNak.nameTa}) மற்றும் ஆண் (${gNak.nameTa}) நட்சத்திரங்களுக்கு இடையே வேதை தோஷம் எதுவும் இல்லை.`;

  let explanationEn = hasVedha
    ? `⚠️ VEDHA DOSHAM ALERT! Bride star (${bNak.nameEn}) and Groom star (${gNak.nameEn}) are mutually counteracting Vedha pairs. Mismatch/Affliction predicted.`
    : `✅ No Vedha Affliction between Bride (${bNak.nameEn}) and Groom (${gNak.nameEn}). Harmonious star combination.`;

  return {
    id: 'VEDHA',
    nameTa: 'வேதா பொருத்தம்',
    nameEn: 'Vedha Porutham',
    status,
    score,
    maxScore: 1,
    category: 'CRITICAL_DOSHA',
    importance: 'CRITICAL',
    calculation: { brideStar: bNak.nameTa, groomStar: gNak.nameTa, hasVedha },
    ruleApplied,
    explanationTa,
    explanationEn,
    warning: hasVedha ? 'வேதா தோஷம் - பரஸ்பர தாக்கம் உண்டு' : null
  };
}

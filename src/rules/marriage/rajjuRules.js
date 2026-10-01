import { RAJJU_TABLE, RAJJU_TYPES } from '../../data/rajjuTable';
import { getNakshatraById } from '../../data/nakshatras';

export function calculateRajju(bride, groom) {
  const bNakId = parseInt(bride.nakshatraId, 10);
  const gNakId = parseInt(groom.nakshatraId, 10);

  const bNak = getNakshatraById(bNakId);
  const gNak = getNakshatraById(gNakId);

  const bRajjuKey = RAJJU_TABLE[bNakId] || 'PADA';
  const gRajjuKey = RAJJU_TABLE[gNakId] || 'PADA';

  const bRajju = RAJJU_TYPES[bRajjuKey];
  const gRajju = RAJJU_TYPES[gRajjuKey];

  const isSameRajju = bRajjuKey === gRajjuKey;

  let status = isSameRajju ? 'FAIL' : 'PASS';
  let score = isSameRajju ? 0 : 1;
  let ruleApplied = isSameRajju ? `Same Rajju (${bRajju.nameEn}) - RAJJU DOSHAM` : 'Different Rajju (No Dosham)';

  let explanationTa = isSameRajju
    ? `⚠️ ரஜ்ஜு தோஷம்! பெண் (${bNak.nameTa}) மற்றும் ஆண் (${gNak.nameTa}) இருவரும் ஒரே ரஜ்ஜு வகையில் (${bRajju.nameTa}) வருகிறார்கள். பாதிப்பு: ${bRajju.dangerTa}. திருமணத்தை தவிர்க்க வேண்டும்.`
    : `✅ பெண் (${bRajju.nameTa}) மற்றும் ஆண் (${gRajju.nameTa}) இருவருக்கும் வெவ்வேறு ரஜ்ஜு அமைவதால் ரஜ்ஜு பொருத்தம் சிறப்பாக உள்ளது. மாங்கல்ய பாக்கியம் நிலைக்கும்.`;

  let explanationEn = isSameRajju
    ? `⚠️ RAJJU DOSHAM ALERT! Both Bride (${bNak.nameEn}) and Groom (${gNak.nameEn}) share the same Rajju (${bRajju.nameEn}). Risk: ${bRajju.dangerEn}. Highly advised to avoid.`
    : `✅ Perfect Rajju Match! Bride (${bRajju.nameEn}) and Groom (${gRajju.nameEn}) have different Rajjus. Ensures longevity and marital protection.`;

  return {
    id: 'RAJJU',
    nameTa: 'ரஜ்ஜு பொருத்தம்',
    nameEn: 'Rajju Porutham',
    status,
    score,
    maxScore: 1,
    category: 'CRITICAL_DOSHA',
    importance: 'CRITICAL',
    calculation: { brideRajju: bRajju.nameTa, groomRajju: gRajju.nameTa, isSameRajju },
    ruleApplied,
    explanationTa,
    explanationEn,
    warning: isSameRajju ? bRajju.dangerTa : null
  };
}

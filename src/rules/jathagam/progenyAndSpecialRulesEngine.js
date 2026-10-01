// Progeny (புத்திர பாக்கியம்), Fertility & Special Astrological Rules Engine
// Based on authentic Tamil manuscripts

import { getNakshatraById } from '../../data/nakshatras';
import { getRasiById } from '../../data/rasis';

/**
 * Evaluates Progeny, Fertility & Special Astrological Rules
 */
export function evaluateProgenyAndSpecialRules(bride, groom) {
  const bNakId = parseInt(bride.nakshatraId, 10);
  const gNakId = parseInt(groom.nakshatraId, 10);
  const bLagna = bride.lagnaRasiId || bride.rasiId || 1;
  const gLagna = groom.lagnaRasiId || groom.rasiId || 1;

  const bNak = getNakshatraById(bNakId);
  const gNak = getNakshatraById(gNakId);

  // 1. Progeny House Evaluation (ஆணிற்கு 5-ம் இடம் & பெண்ணிற்கு 9-ம் இடம்)
  let g5thHouseRasi = gLagna + 4;
  if (g5thHouseRasi > 12) g5thHouseRasi -= 12;

  let b9thHouseRasi = bLagna + 8;
  if (b9thHouseRasi > 12) b9thHouseRasi -= 12;

  const g5thRasiInfo = getRasiById(g5thHouseRasi);
  const b9thRasiInfo = getRasiById(b9thHouseRasi);

  // 2. Offspring Gender Yoga (ஆண் வாரிசு / பெண் வாரிசு யோகம்)
  const gRahuRasi = groom.rahuRasiId || 3;
  const bKetuRasi = bride.ketuRasiId || 9;

  const isGroomRahuIn5th = gRahuRasi === g5thHouseRasi;
  const isBrideKetuIn5th = bKetuRasi === (bLagna + 4 > 12 ? bLagna - 8 : bLagna + 4);

  let progenyGenderYogaTa = 'ஆண் மற்றும் பெண் வாரிசு பாக்கியங்கள் சீராக அமைந்த யோகம்.';
  if (isGroomRahuIn5th || isBrideKetuIn5th) {
    progenyGenderYogaTa = 'பெண் வாரிசு பாக்கியம் முதன்மையாக அமையும் யோகம் (ஆண் ஜாதகத்தில் 5-ல் ராகு / பெண் ஜாதகத்தில் 5-ல் கேது).';
  }

  // 3. 22-வது நட்சத்திரம் & 88-வது பாதம் ஆய்வு (Vainasika & 88th Pada)
  let countFromBride = gNakId - bNakId + 1;
  if (countFromBride <= 0) countFromBride += 27;

  const isVainasika22 = countFromBride === 22;

  // 4. செவ்வாய் தோஷம் கட்டாய நட்சத்திரங்கள் (Mandatory Mars Star Check)
  const MARS_MANDATORY_STARS = [1, 5, 6, 10, 14, 15, 19, 23, 24]; // Ashwini, Mrigashira, Arudra, Magha, Chitra, Swati, Mula, Dhanishta, Shatabhisha
  const isBrideMarsStar = MARS_MANDATORY_STARS.includes(bNakId);
  const isGroomMarsStar = MARS_MANDATORY_STARS.includes(gNakId);

  return {
    progenyHouses: {
      groom5thRasiName: g5thRasiInfo.nameTa,
      groom5thLord: g5thRasiInfo.lordTa,
      bride9thRasiName: b9thRasiInfo.nameTa,
      bride9thLord: b9thRasiInfo.lordTa,
      explanationTa: `ஆணிற்கு 5-ம் இடம் (${g5thRasiInfo.nameTa} - அதிபதி: ${g5thRasiInfo.lordTa}) புத்திர பாக்கியத்தையும், பெண்ணிற்கு 9-ம் இடம் (${b9thRasiInfo.nameTa} - அதிபதி: ${b9thRasiInfo.lordTa}) புத்திர பாக்கியத்தையும் குறிக்கும்.`,
      explanationEn: `Groom 5th house (${g5thRasiInfo.nameEn}) and Bride 9th house (${b9thRasiInfo.nameEn}) determine progeny prosperity.`
    },
    genderYoga: {
      isGroomRahuIn5th,
      isBrideKetuIn5th,
      progenyGenderYogaTa,
      explanationTa: progenyGenderYogaTa,
      explanationEn: 'Progeny lineage evaluation based on 5th house Rahu/Ketu placement.'
    },
    vainasikaStar: {
      countFromBride,
      isVainasika22,
      explanationTa: isVainasika22
        ? `⚠️ வைநாசிக தோஷம் எச்சரிக்கை! பெண் நட்சத்திரத்திலிருந்து ஆண் நட்சத்திரம் 22-வது நட்சத்திரமாக (${gNak.nameTa}) வருகிறது. 88-வது பாதமாக வரக்கூடாது.`
        : `✅ 22-வது வைநாசிக தோஷம் இல்லை (நட்சத்திர எண்ணிக்கை ${countFromBride}).`,
      explanationEn: isVainasika22
        ? `⚠️ Vainasika 22nd Star Alert! Groom star is 22nd star from Bride.`
        : `✅ No 22nd Vainasika Star conflict.`
    },
    marsStarRule: {
      isBrideMarsStar,
      isGroomMarsStar,
      explanationTa: (isBrideMarsStar || isGroomMarsStar)
        ? 'மிருகசீரிஷம், சித்திரை, அவிட்டம், அஸ்வினி, மகம், மூலம், திருவாதிரை, சதயம், சுவாதி நட்சத்திரங்களில் பிறந்ததால் செவ்வாய் தோஷ ஆய்வு கட்டாயமாகும்.'
        : 'பொதுவான முறையில் செவ்வாய் தோஷம் ஆய்வு செய்யப்படுகிறது.',
      explanationEn: 'Mandatory Mars star evaluation requirement.'
    }
  };
}

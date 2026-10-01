// Special Traditional Tamil Marriage Rules Engine
// Based on authentic Tamil manuscripts (Vainasika, 8th House Yoni, Family Maturity)

import { getNakshatraById } from '../../data/nakshatras';
import { getRasiById } from '../../data/rasis';

/**
 * Evaluates Special Marriage Rules:
 * 1. 22-வது நட்சத்திரம் வைநாசிக தோஷம் (22nd Star Vainasika Dosha)
 * 2. 8-ம் பாவக லக்ன யோனி ஆய்வு (8th House Planetary Yoni)
 * 3. மெய்ச்சூரிட்டி பொருத்தம் (Family Responsibility & Maturity)
 * 4. செவ்வாய் தோஷம் பார்க்க வேண்டிய நட்சத்திரங்கள் (Mars Star Check)
 */
export function evaluateSpecialMarriageRules(bride, groom) {
  const bNakId = parseInt(bride.nakshatraId, 10);
  const gNakId = parseInt(groom.nakshatraId, 10);

  const bNak = getNakshatraById(bNakId);
  const gNak = getNakshatraById(gNakId);

  // 1. 22-வது நட்சத்திர வைநாசிக தோஷம் (Vainasika Dosha)
  let countFromBride = gNakId - bNakId + 1;
  if (countFromBride <= 0) countFromBride += 27;

  const isVainasikaDosham = countFromBride === 22;

  // 2. மெய்ச்சூரிட்டி பொருத்தம் (Family Responsibility & Maturity)
  const bLagna = bride.lagnaRasiId || bride.rasiId || 1;
  const gLagna = groom.lagnaRasiId || groom.rasiId || 1;

  // Lagna lord house position (approximate evaluation)
  const getMaturityLevel = (lagnaRasi) => {
    if ([1, 2, 3, 4].includes(lagnaRasi)) {
      return { score: 100, labelTa: '100% குடும்ப பொறுப்புணர்வு (High Maturity & Care)', labelEn: '100% Family Responsibility' };
    } else if ([5, 6, 7, 8].includes(lagnaRasi)) {
      return { score: 50, labelTa: '50% மிதமான குடும்ப கவனம் (Moderate Maturity)', labelEn: '50% Moderate Responsibility' };
    } else {
      return { score: 30, labelTa: 'வெளிவட்டார கவனம் / சுய விருப்பம் (External Focus)', labelEn: 'External Focus / Needs Guidance' };
    }
  };

  const brideMaturity = getMaturityLevel(bLagna);
  const groomMaturity = getMaturityLevel(gLagna);

  // 3. 8-ம் பாவக யோனி நிலை (8th House Planetary Yoni Type)
  // House 8 from Lagna
  let b8thHouseRasi = bLagna + 7;
  if (b8thHouseRasi > 12) b8thHouseRasi -= 12;

  let g8thHouseRasi = gLagna + 7;
  if (g8thHouseRasi > 12) g8thHouseRasi -= 12;

  const b8thRasiInfo = getRasiById(b8thHouseRasi);
  const g8thRasiInfo = getRasiById(g8thHouseRasi);

  // 4. செவ்வாய் தோஷம் பார்க்க வேண்டிய முக்கிய நட்சத்திரங்கள்
  // மிருகசீரிஷம்(5), சித்திரை(14), அவிட்டம்(23), அஸ்வினி(1), மகம்(10), மூலம்(19), திருவாதிரை(6), சதயம்(24), சுவாதி(15)
  const MARS_CHECK_STARS = [1, 5, 6, 10, 14, 15, 19, 23, 24];
  const isBrideMarsStarMandatory = MARS_CHECK_STARS.includes(bNakId);
  const isGroomMarsStarMandatory = MARS_CHECK_STARS.includes(gNakId);

  return {
    vainasikaAnalysis: {
      countFromBride,
      isVainasikaDosham,
      explanationTa: isVainasikaDosham
        ? `⚠️ வைநாசிக தோஷம்! பெண் நட்சத்திரத்திலிருந்து ஆண் நட்சத்திரம் 22-வது நட்சத்திரமாக வருகிறது (${gNak.nameTa}). இது உடல் ரீதியாகவும் மன ரீதியாகவும் பாதிப்பைத் தரும். தவிர்க்கவும்.`
        : `✅ வைநாசிக தோஷம் இல்லை. நட்சத்திர எண்ணிக்கை ${countFromBride} (22 அல்ல).`,
      explanationEn: isVainasikaDosham
        ? `⚠️ Vainasika Dosha Alert! Groom star is 22nd star from Bride (${gNak.nameEn}). Highly advised to avoid.`
        : `✅ No Vainasika Dosha. Star count is ${countFromBride}.`
    },
    maturityAnalysis: {
      brideMaturity,
      groomMaturity,
      explanationTa: `பெண்: ${brideMaturity.labelTa} | ஆண்: ${groomMaturity.labelTa}.`,
      explanationEn: `Bride: ${brideMaturity.labelEn} | Groom: ${groomMaturity.labelEn}.`
    },
    yoni8thHouse: {
      b8thRasiName: b8thRasiInfo.nameTa,
      g8thRasiName: g8thRasiInfo.nameTa,
      b8thLord: b8thRasiInfo.lordTa,
      g8thLord: g8thRasiInfo.lordTa,
      explanationTa: `8-ம் பாவக அதிபதிகள் - பெண்: ${b8thRasiInfo.lordTa} (${b8thRasiInfo.nameTa}), ஆண்: ${g8thRasiInfo.lordTa} (${g8thRasiInfo.nameTa}). 8-ம் இடம் தாம்பத்திய யோனி இணக்கத்தை தீர்மானிக்கும்.`,
      explanationEn: `8th House Lords - Bride: ${b8thRasiInfo.lordEn}, Groom: ${g8thRasiInfo.lordEn}. Determines 8th house intimacy alignment.`
    },
    marsStarMandatory: {
      isBrideMarsStarMandatory,
      isGroomMarsStarMandatory,
      explanationTa: (isBrideMarsStarMandatory || isGroomMarsStarMandatory)
        ? 'செவ்வாய் / ராகு / கேது நட்சத்திரங்களில் பிறந்ததால் செவ்வாய் தோஷ ஆய்வை மிகக் கவனமாக பார்க்க வேண்டும்.'
        : 'செவ்வாய் தோஷம் பொதுவான முறையில் ஆய்வுக்குட்படும்.',
      explanationEn: 'Mandatory Sevvai Dosha check based on star placement.'
    }
  };
}

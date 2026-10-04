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

  // Helper function for 8th House Planetary Yoni Compatibility Rule
  const checkPlanetaryYoniMatch = (l1Id, r1Id, l2Id, r2Id) => {
    if (l1Id === 1) return [4, 6].includes(l2Id); // Sun -> Budhan, Sukran
    if (l1Id === 2) return [4, 5, 6].includes(l2Id); // Moon -> Guru (Valarpirai) / Budhan, Sukran (Theipirai)
    if (l1Id === 3) return [2, 5].includes(l2Id); // Mars -> Chandran, Guru
    if (l1Id === 4) {
      if (r1Id === 3) return l2Id === 7; // Mithunam Budhan -> Sani (Makaram/Kumbam)
      if (r1Id === 6) return [2, 3].includes(l2Id); // Kanni Budhan -> Sevvai, Chandran
      return [2, 3, 7].includes(l2Id);
    }
    if (l1Id === 6) return [1, 2].includes(l2Id); // Sukran -> Chandran, Suryan
    if (l1Id === 5) return l2Id !== 7; // Guru -> All Grahas EXCEPT Sani
    if (l1Id === 7) return [4, 5, 6].includes(l2Id); // Sani -> Budhan, Sukran, Guru
    return true;
  };

  const isBToGYoniOk = checkPlanetaryYoniMatch(b8thRasiInfo.lordId, b8thHouseRasi, g8thRasiInfo.lordId, g8thHouseRasi);
  const isGToBYoniOk = checkPlanetaryYoniMatch(g8thRasiInfo.lordId, g8thHouseRasi, b8thRasiInfo.lordId, b8thHouseRasi);
  const is8thYoniCompatible = isBToGYoniOk || isGToBYoniOk;

  // 4. செவ்வாய் தோஷம் பார்க்க வேண்டிய முக்கிய நட்சத்திரங்கள்
  // மிருகசீரிஷம்(5), சித்திரை(14), அவிட்டம்(23), அஸ்வினி(1), மகம்(10), மூலம்(19), திருவாதிரை(6), சதயம்(24), சுவாதி(15)
  const MARS_CHECK_STARS = [1, 5, 6, 10, 14, 15, 19, 23, 24];
  const isBrideMarsStarMandatory = MARS_CHECK_STARS.includes(bNakId);
  const isGroomMarsStarMandatory = MARS_CHECK_STARS.includes(gNakId);

  // 5. சூரிய நிலை 48 நாட்கள் விதி (Girl DOB Sun Stand vs Boy DOB Sun Stand within 48 days)
  let brideSunLon = 0;
  let groomSunLon = 0;

  if (bride.allGrahas) {
    const bSun = bride.allGrahas.find(g => g.code === 'SUN');
    if (bSun) brideSunLon = bSun.totalLon;
  } else if (bride.sunRasiId) {
    brideSunLon = (bride.sunRasiId - 1) * 30 + 15;
  }

  if (groom.allGrahas) {
    const gSun = groom.allGrahas.find(g => g.code === 'SUN');
    if (gSun) groomSunLon = gSun.totalLon;
  } else if (groom.sunRasiId) {
    groomSunLon = (groom.sunRasiId - 1) * 30 + 15;
  }

  let diffDeg = Math.abs(groomSunLon - brideSunLon) % 360;
  if (diffDeg > 180) diffDeg = 360 - diffDeg;
  const sunDiffDays = Math.round(diffDeg / 0.9856);
  const isSunWithin48Days = sunDiffDays <= 48;

  // 6. ஆணின் 3-ம் அதிபதி நட்சத்திர சாரம் & பெண் நட்சத்திர இணக்க விதி (3rd Lord Star Rule)
  const BUDHAN_STARS = [9, 18, 27]; // ஆயில்யம், கேட்டை, ரேவதி
  const SANI_STARS = [8, 17, 26];   // பூசம், அனுஷம், உத்திரட்டாதி
  const KETU_STARS = [1, 10, 19];   // அஸ்வினி, மகம், மூலம்
  const RESTRICTED_STARS = [...BUDHAN_STARS, ...SANI_STARS, ...KETU_STARS];

  let g3rdHouseRasi = gLagna + 2;
  if (g3rdHouseRasi > 12) g3rdHouseRasi -= 12;

  const g3rdRasiInfo = getRasiById(g3rdHouseRasi);
  const g3rdLordName = g3rdRasiInfo.lordTa;
  const g3rdLordId = g3rdRasiInfo.lordId;

  let g3rdLordStarId = 1;
  let g3rdLordStarName = '';
  let g3rdLordStarLord = '';

  if (groom.allGrahas) {
    const lordCodeMap = { 1: 'SUN', 2: 'MOON', 3: 'MARS', 4: 'MERC', 5: 'JUP', 6: 'VEN', 7: 'SAT' };
    const g3rdLordGraha = groom.allGrahas.find(g => g.code === lordCodeMap[g3rdLordId]);
    if (g3rdLordGraha && g3rdLordGraha.starNakshatra) {
      g3rdLordStarId = g3rdLordGraha.starNakshatra.id;
      g3rdLordStarName = g3rdLordGraha.starNakshatra.name;
      g3rdLordStarLord = g3rdLordGraha.starNakshatra.lord;
    }
  }

  const isGroom3rdLordInRestrictedStar = RESTRICTED_STARS.includes(g3rdLordStarId);
  const isBrideInRestrictedStar = RESTRICTED_STARS.includes(bNakId);

  // If groom 3rd lord is in Budhan/Sani/Ketu star, but Bride is NOT in Budhan/Sani/Ketu star -> GOOD!
  const isNeutralizedAndGood = isGroom3rdLordInRestrictedStar && !isBrideInRestrictedStar;
  const isDirectGood = !isGroom3rdLordInRestrictedStar;
  const isOverallGood = isDirectGood || isNeutralizedAndGood;

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
      is8thYoniCompatible,
      explanationTa: is8thYoniCompatible
        ? `✅ 8-ம் பாவக கிரக யோனி பொருத்தம் உத்தமம்! பெண் 8-ம் அதிபதி (${b8thRasiInfo.lordTa}) மற்றும் ஆண் 8-ம் அதிபதி (${g8thRasiInfo.lordTa}) இடையே சுவடி சாஸ்திரப்படி சுபமான யோனி இணக்கம் உள்ளது.`
        : `⚠️ 8-ம் பாவக கிரக யோனி முரண்! பெண் 8-ம் அதிபதி (${b8thRasiInfo.lordTa}) மற்றும் ஆண் 8-ம் அதிபதி (${g8thRasiInfo.lordTa}) இடையே யோனி சுப இணக்கம் குறைவாக உள்ளது.`,
      explanationEn: is8thYoniCompatible
        ? `✅ 8th House Planetary Yoni Alignment Auspicious! Bride 8th Lord (${b8thRasiInfo.lordEn}) and Groom 8th Lord (${g8thRasiInfo.lordEn}) have compatible intimacy Yoni.`
        : `⚠️ 8th House Planetary Yoni Incompatibility between ${b8thRasiInfo.lordEn} and ${g8thRasiInfo.lordEn}.`
    },
    marsStarMandatory: {
      isBrideMarsStarMandatory,
      isGroomMarsStarMandatory,
      explanationTa: (isBrideMarsStarMandatory || isGroomMarsStarMandatory)
        ? 'செவ்வாய் / ராகு / கேது நட்சத்திரங்களில் பிறந்ததால் செவ்வாய் தோஷ ஆய்வை மிகக் கவனமாக பார்க்க வேண்டும்.'
        : 'பொதுவான முறையில் செவ்வாய் தோஷம் ஆய்வு செய்யப்படுகிறது.',
      explanationEn: 'Mandatory Sevvai Dosha check based on star placement.'
    },
    sunStand48Days: {
      sunDiffDays,
      diffDeg: Math.round(diffDeg * 10) / 10,
      isSunWithin48Days,
      explanationTa: isSunWithin48Days
        ? `⚠️ 48 நாட்கள் சூரிய நிலை எச்சரிக்கை! பெண் சூரிய நிலையிலிருந்து ஆண் சூரிய நிலை ${sunDiffDays} நாட்கள் (${Math.round(diffDeg * 10) / 10}°) இடைவெளியில் உள்ளது (48 நாட்களுக்குள்). சுவடி சாஸ்திரப்படி ஒரே காலகட்ட தோஷத் தாக்கம் ஏற்படும் என்பதால் தவிர்க்கப்படுவது உத்தமம்.`
        : `✅ 48 நாட்கள் சூரிய நிலை உத்தமம்! பெண் மற்றும் ஆண் சூரிய நிலைகளுக்கு இடையே ${sunDiffDays} நாட்கள் (${Math.round(diffDeg * 10) / 10}°) இடைவெளி உள்ளது (48 நாட்களுக்கு மேல்).`,
      explanationEn: isSunWithin48Days
        ? `⚠️ Sun Stand 48 Days Rule Alert! Groom's Sun is within ${sunDiffDays} days (${Math.round(diffDeg * 10) / 10}°) of Bride's Sun (<= 48 days). Traditional manuscripts advise avoiding this due to synchronized planetary stress.`
        : `✅ Sun Stand Gap Auspicious! Gap between Bride & Groom Sun is ${sunDiffDays} days (${Math.round(diffDeg * 10) / 10}°) (> 48 days).`
    },
    thirdLordStarRule: {
      g3rdLordName,
      g3rdLordStarName,
      g3rdLordStarLord,
      isGroom3rdLordInRestrictedStar,
      isBrideInRestrictedStar,
      isNeutralizedAndGood,
      isOverallGood,
      explanationTa: isDirectGood
        ? `✅ ஆணின் 3-ம் அதிபதி (${g3rdLordName}) புதன், சனி, கேது அல்லாத சுப சாரத்தில் உள்ளார் (உத்தம பொருத்தம்).`
        : isNeutralizedAndGood
        ? `✅ ஆணின் 3-ம் அதிபதி (${g3rdLordName}) புதன்/சனி/கேது சாரத்தில் அமைந்தாலும், பெண்ணின் நட்சத்திர சாரம் அதே சாரத்தில் இல்லாததால் தோஷம் நிவர்த்தியாகி உத்தம சுப பலன் தரும்.`
        : `⚠️ ஆணின் 3-ம் அதிபதியும் பெண்ணின் நட்சத்திரமும் ஒரே புதன்/சனி/கேது சார அமைப்பில் உள்ளதால் 3-ம் பாவக சுப பலன் குறைய வாய்ப்புள்ளது.`,
      explanationEn: isDirectGood
        ? `✅ Groom's 3rd Lord (${g3rdLordName}) is in non-Mercury/Saturn/Ketu star (Auspicious).`
        : isNeutralizedAndGood
        ? `✅ Groom's 3rd Lord is in Mercury/Saturn/Ketu star, but Bride is NOT in the same star group. Neutralized & Auspicious.`
        : `⚠️ Both Groom 3rd Lord and Bride share Mercury/Saturn/Ketu star alignment.`
    }
  };
}

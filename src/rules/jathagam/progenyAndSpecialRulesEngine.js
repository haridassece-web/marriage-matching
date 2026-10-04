// Progeny (புத்திர பாக்கியம்), Fertility & Special Astrological Rules Engine
// Based on authentic Tamil manuscripts

import { getNakshatraById } from '../../data/nakshatras';
import { getRasiById } from '../../data/rasis';
import { getMudakkuInfo } from './mudakkuRules';

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

  // 6. 3-ம் அதிபதி 5-ம் இடத்தில் அமர்ந்து 5-ம் இடம் முடக்கு / திதி சூன்யம் / அவயோகி நிலை ஆய்வு (3rd Lord in 5th House Progeny Obstacle Rule)
  const gMudakkuInfo = getMudakkuInfo(groom);
  const bMudakkuInfo = getMudakkuInfo(bride);

  // Groom's 3rd Lord in 5th House check
  let g3rdHouseRasi = gLagna + 2;
  if (g3rdHouseRasi > 12) g3rdHouseRasi -= 12;

  const g3rdRasiInfo = getRasiById(g3rdHouseRasi);
  const g3rdLordName = g3rdRasiInfo.lordTa;
  const g3rdLordId = g3rdRasiInfo.lordId;

  // Check if Groom's 3rd Lord is in 5th House
  let isGroom3rdLordIn5th = false;
  if (groom.allGrahas) {
    const lordCodeMap = { 1: 'SUN', 2: 'MOON', 3: 'MARS', 4: 'MERC', 5: 'JUP', 6: 'VEN', 7: 'SAT' };
    const g3rdLordGraha = groom.allGrahas.find(g => g.code === lordCodeMap[g3rdLordId]);
    if (g3rdLordGraha && g3rdLordGraha.rasiId === g5thHouseRasi) {
      isGroom3rdLordIn5th = true;
    }
  }

  const isGroom5thHouseMudakku = g5thHouseRasi === gMudakkuInfo.mudakkuRasiId;
  const isGroom5thHouseAfflicted = isGroom5thHouseMudakku || (isGroom3rdLordIn5th && isGroom5thHouseMudakku);

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
    },
    sunStand48Days: {
      sunDiffDays,
      diffDeg: Math.round(diffDeg * 10) / 10,
      isSunWithin48Days,
      explanationTa: isSunWithin48Days
        ? `⚠️ 48 நாட்கள் சூரிய நிலை எச்சரிக்கை! பெண் சூரிய நிலையிலிருந்து ஆண் சூரிய நிலை ${sunDiffDays} நாட்கள் (${Math.round(diffDeg * 10) / 10}°) இடைவெளியில் உள்ளது (48 நாட்களுக்குள்). சுவடி சாஸ்திரப்படி தவிர்க்கப்படுவது உத்தமம்.`
        : `✅ 48 நாட்கள் சூரிய நிலை உத்தமம்! பெண் மற்றும் ஆண் சூரிய நிலைகளுக்கு இடையே ${sunDiffDays} நாட்கள் (${Math.round(diffDeg * 10) / 10}°) இடைவெளி உள்ளது (48 நாட்களுக்கு மேல்).`,
      explanationEn: isSunWithin48Days
        ? `⚠️ Sun Stand 48 Days Rule Alert! Groom's Sun is within ${sunDiffDays} days (${Math.round(diffDeg * 10) / 10}°) of Bride's Sun (<= 48 days). Traditional manuscripts advise avoiding this due to synchronized planetary stress.`
        : `✅ Sun Stand Gap Auspicious! Gap between Bride & Groom Sun is ${sunDiffDays} days (${Math.round(diffDeg * 10) / 10}°) (> 48 days).`
    },
    thirdLord5thHouseAnalysis: {
      g3rdLordName,
      g5thRasiName: g5thRasiInfo.nameTa,
      isGroom3rdLordIn5th,
      isGroom5thHouseMudakku,
      isGroom5thHouseAfflicted,
      explanationTa: isGroom5thHouseAfflicted
        ? `⚠️ 3-ம் அதிபதி 5-ல் / 5-ம் இடம் முடக்கு தோஷம்! ஆணின் 3-ம் பாவக அதிபதி (${g3rdLordName}) 5-ல் அமர்ந்து அல்லது 5-ம் பாவக இடம் முடக்கு / திதி சூன்ய தோஷம் பெற்றுள்ளதால் குழந்தை பாக்கியத்தில் தாமதம் அல்லது தடை ஏற்படலாம். திருமண முடிவெடுக்கும் முன் திருக்கருகாவூர் கர்ப்பரக்ஷாம்பிகை / கோவில் புத்திர தோஷ பரிகாரங்கள் செய்து நிவர்த்திக்கவும்.`
        : `✅ ஆணின் 5-ம் இடத்தில் 3-ம் அதிபதி முடக்கு / திதி சூன்யத் தடை இன்றி சுபமாக உள்ளார். புத்திர பாக்கியத் தடைகள் இல்லை.`,
      explanationEn: isGroom5thHouseAfflicted
        ? `⚠️ 3rd Lord in 5th House & 5th House Mudakku Obstacle detected! Indicates potential progeny delay. Temple Pariharams (Thirukarugavur / Rameshwaram) recommended before finalizing marriage.`
        : `✅ 5th house and 3rd Lord alignment auspicious with no Mudakku or Tithi Sunya afflictions.`
    }
  };
}

// Tithi & Mudakku Classical Manuscript Rules Engine (சுவடி சாஸ்திர திதி & முடக்கு விதிகள்)
// 1. Rule 1: Boy or Girl 4, 8, 14 Tithi Avoidance (4, 8, 14 திதி சரிக்கைக் கூடாது)
// 2. Rule 2: Same Janma Tithi Avoidance (இருவருக்கும் ஒரே ஜன்ம திதி இருக்கக்கூடாது - ஏக திதி தோஷம்)
// 3. Rule 3: Bride Mudakku Lord in Groom Rasi/Lagna Avoidance (பெண் முடக்கு அதிபதி ஆண் ஜாதகம் ராசி & லக்கினத்தில் வரக்கூடாது)
// 4. Rule 4: Bride Thuvadasi vs Groom Amavasai/Pournami Avoidance (பெண் துவாதசி - ஆண் அமாவாசை/பௌர்ணமி விலக்கு விதி)

import { calculatePanchangamFromBirthDetails, calculateTithiFromDiff } from '../../engine/jathagam/panchangamCalculator';
import { getMudakkuInfo, checkGirlMudakkuInBoyRasiLagna } from './mudakkuRules';
import { getRasiById } from '../../data/rasis';

/**
 * Safely resolves Tithi for a person
 */
export function getPersonTithi(person) {
  if (person && person.tithi && typeof person.tithi.number === 'number') {
    return person.tithi;
  }

  // Calculate from allGrahas if available
  if (person && person.allGrahas && Array.isArray(person.allGrahas)) {
    const sunG = person.allGrahas.find(g => g.code === 'SUN');
    const moonG = person.allGrahas.find(g => g.code === 'MOON');
    if (sunG && moonG) {
      const diff = ((moonG.totalLon - sunG.totalLon) % 360 + 360) % 360;
      return calculateTithiFromDiff(diff);
    }
  }

  // Calculate from DOB & TOB
  if (person && person.dob) {
    const calc = calculatePanchangamFromBirthDetails(person.dob, person.tob || '07:30', person.city || 'Chennai');
    if (calc && calc.tithi) {
      return calc.tithi;
    }
  }

  // Fallback to Shukla Prathama
  return {
    index: 0,
    number: 1,
    isShukla: true,
    pakshaTa: 'வளர்பிறை (சுக்ல பக்ஷம்)',
    pakshaEn: 'Shukla Paksha (Waxing)',
    baseNameTa: 'பிரதமை',
    baseNameEn: 'Prathama',
    fullNameTa: 'வளர்பிறை பிரதமை',
    fullNameEn: 'Shukla Prathama',
    progressInTithi: 0.5,
    is4_8_14: false,
    isThuvadasi: false,
    isAmavasai: false,
    isPournami: false
  };
}

/**
 * RULE 1:
 * "Boy or Girl- 4,8,14 ththi sarikai kudathu"
 * (4, 8, 14 திதி சரிக்கைக் கூடாது - சதுர்த்தி, அஷ்டமி, சதுர்தசி விலக்கு)
 * Neither boy nor girl should be born in 4 (Chaturthi), 8 (Ashtami), or 14 (Chaturdashi) Tithi.
 */
export function evaluateRule1_RikthaTithi4_8_14(bride, groom) {
  const bTithi = getPersonTithi(bride);
  const gTithi = getPersonTithi(groom);

  const bIs4_8_14 = [4, 8, 14].includes(bTithi.number);
  const gIs4_8_14 = [4, 8, 14].includes(gTithi.number);

  let status = 'PASS';
  let statusTextTa = '✅ உத்தமம் (4, 8, 14 திதி இல்லை)';
  let statusTextEn = '✅ Auspicious (No 4, 8, 14 Tithi Conflict)';

  let explanationTa = '';
  let explanationEn = '';

  if (bIs4_8_14 && gIs4_8_14) {
    status = 'CRITICAL';
    statusTextTa = '🛑 சரிக்கைக் கூடாது (இருவருக்கும் 4, 8, 14 திதி)';
    statusTextEn = '🛑 NOT MATCH (Both Born in 4, 8, or 14 Tithi)';
    explanationTa = `🛑 சரிக்கைக் கூடாது (NOT MATCH)! பெண் பிறந்த திதி: ${bTithi.fullNameTa} (#${bTithi.number}); ஆண் பிறந்த திதி: ${gTithi.fullNameTa} (#${gTithi.number}). சுவடி சாஸ்திர விதிப்படி 4 (சதுர்த்தி), 8 (அஷ்டமி), 14 (சதுர்தசி) ஆகிய உக்கிர ரிக்தா திதிகளில் பிறந்த இருவரையும் இணைக்கக் கூடாது (சரிக்கைக் கூடாது). இது இல்லற வாழ்வில் தொடர் போராட்டங்களையும் மனக்கசப்புகளையும் உருவாக்கும்.`;
    explanationEn = `🛑 NOT MATCH! Both Bride (${bTithi.fullNameEn} #${bTithi.number}) and Groom (${gTithi.fullNameEn} #${gTithi.number}) are born in 4, 8, or 14 Tithis. Traditional Nadi manuscripts strictly forbid this matching.`;
  } else if (bIs4_8_14) {
    status = 'CRITICAL';
    statusTextTa = `🛑 சரிக்கைக் கூடாது (பெண்ணிற்கு ${bTithi.baseNameTa} திதி)`;
    statusTextEn = `🛑 NOT MATCH (Bride Born in ${bTithi.baseNameEn} Tithi #${bTithi.number})`;
    explanationTa = `🛑 சரிக்கைக் கூடாது! பெண் பிறந்த திதி: ${bTithi.fullNameTa} (#${bTithi.number}). சுவடி சாஸ்திரப்படி 4 (சதுர்த்தி), 8 (அஷ்டமி), 14 (சதுர்தசி) ஆகிய திதிகளில் பிறந்த பெண் ஜாதகத்தை திருமணம் சரிக்கைக் கூடாது.`;
    explanationEn = `🛑 NOT MATCH! Bride is born in ${bTithi.fullNameEn} (Tithi #${bTithi.number}). Classical palm-leaf manuscripts advise against matching when born in 4, 8, or 14 Tithis.`;
  } else if (gIs4_8_14) {
    status = 'CRITICAL';
    statusTextTa = `🛑 சரிக்கைக் கூடாது (ஆணிற்கு ${gTithi.baseNameTa} திதி)`;
    statusTextEn = `🛑 NOT MATCH (Groom Born in ${gTithi.baseNameEn} Tithi #${gTithi.number})`;
    explanationTa = `🛑 சரிக்கைக் கூடாது! ஆண் பிறந்த திதி: ${gTithi.fullNameTa} (#${gTithi.number}). சுவடி சாஸ்திரப்படி 4 (சதுர்த்தி), 8 (அஷ்டமி), 14 (சதுர்தசி) ஆகிய திதிகளில் பிறந்த ஆண் ஜாதகத்தை திருமணம் சரிக்கைக் கூடாது.`;
    explanationEn = `🛑 NOT MATCH! Groom is born in ${gTithi.fullNameEn} (Tithi #${gTithi.number}). Classical palm-leaf manuscripts advise against matching when born in 4, 8, or 14 Tithis.`;
  } else {
    explanationTa = `✅ உத்தமம்! பெண் பிறந்த திதி: ${bTithi.fullNameTa} (#${bTithi.number}), ஆண் பிறந்த திதி: ${gTithi.fullNameTa} (#${gTithi.number}). இருவரும் 4 (சதுர்த்தி), 8 (அஷ்டமி), 14 (சதுர்தசி) ஆகிய ரிக்தா திதிகளில் பிறக்கவில்லை. சுவடி சாஸ்திரப்படி சுபமான திதி சேர்க்கையாகும்.`;
    explanationEn = `✅ Auspicious Alignment! Neither Bride (${bTithi.fullNameEn}) nor Groom (${gTithi.fullNameEn}) is born in 4, 8, or 14 Tithis.`;
  }

  return {
    ruleNumber: 1,
    ruleCode: 'RIKTHA_TITHI_4_8_14',
    titleTa: '1. 4, 8, 14 திதி சரிக்கைக் கூடாது விதி (Riktha Tithi Avoidance)',
    titleEn: '1. Boy or Girl 4, 8, 14 Tithi Avoidance Rule',
    manuscriptQuoteTa: 'Boy or Girl- 4,8,14 ththi sarikai kudathu (சதுர்த்தி, அஷ்டமி, சதுர்தசி திதிகளில் பிறந்தால் சரிக்கைக் கூடாது)',
    bTithi,
    gTithi,
    bIs4_8_14,
    gIs4_8_14,
    status,
    statusTextTa,
    statusTextEn,
    explanationTa,
    explanationEn,
    remedyTa: (bIs4_8_14 || gIs4_8_14)
      ? 'சதுர்த்தி திதிக்கு விநாயகர் வழிபாடும், அஷ்டமி திதிக்கு பைரவர் வழிபாடும், சதுர்தசி திதிக்கு நரசிம்மர்/சிவன் வழிபாடும் செய்து பரிகாரம் செய்த பின்பே பரிசீலிக்க வேண்டும்.'
      : 'சிறப்பு பரிகாரம் தேவையில்லை.'
  };
}

/**
 * RULE 2:
 * "both boy and girl -genmai thithi eruka kudathu"
 * (இருவருக்கும் ஒரே ஜன்ம திதி இருக்கக்கூடாது - ஏக திதி தோஷம்)
 * Both boy and girl must not share the exact same Janma Tithi.
 */
export function evaluateRule2_SameJanmaTithi(bride, groom) {
  const bTithi = getPersonTithi(bride);
  const gTithi = getPersonTithi(groom);

  const isExactSameTithi = bTithi.index === gTithi.index;
  const isSameTithiNumber = bTithi.number === gTithi.number;

  let status = 'PASS';
  let statusTextTa = '✅ உத்தமம் (வெவ்வேறு ஜன்ம திதிகள்)';
  let statusTextEn = '✅ Auspicious (Different Janma Tithis)';

  let explanationTa = '';
  let explanationEn = '';

  if (isExactSameTithi) {
    status = 'CRITICAL';
    statusTextTa = '🛑 பொருந்தாது (இருவருக்கும் ஒரே ஜன்ம திதி - ஏக திதி தோஷம்)';
    statusTextEn = '🛑 NOT MATCH (Same Exact Janma Tithi Conflict)';
    explanationTa = `🛑 பொருந்தாது (ஏக திதி தோஷம்)! பெண் மற்றும் ஆண் இருவரும் ஒரே ${bTithi.fullNameTa} திதியில் பிறந்துள்ளனர். சுவடி சாஸ்திர விதிப்படி: "ஆண் பெண் இருவருக்கும் ஒரே ஜன்ம திதி இருக்கக்கூடாது." ஒரே திதியில் பிறந்தால் தம்பதியர் இடையே மன ஒற்றுமை குறைவு, ஈகோ மோதல்கள் மற்றும் வம்ச விருத்தி தாமதம் உண்டாகும் என்பதால் திருமணம் தவிர்க்கப்பட வேண்டும்.`;
    explanationEn = `🛑 NOT MATCH! Both Bride and Groom share the exact same Janma Tithi (${bTithi.fullNameEn}). Classical Vedic/Nadi manuscripts strictly prohibit Eka Tithi alliances.`;
  } else if (isSameTithiNumber) {
    status = 'WARN';
    statusTextTa = `⚠️ ஒரே திதி எண் எச்சரிக்கை (${bTithi.baseNameTa} - ${bTithi.isShukla ? 'வளர்பிறை' : 'தேய்பிறை'} & ${gTithi.isShukla ? 'வளர்பிறை' : 'தேய்பிறை'})`;
    statusTextEn = `⚠️ Same Tithi Number Warning (#${bTithi.number} ${bTithi.baseNameEn})`;
    explanationTa = `⚠️ ஒரே திதி எண் எச்சரிக்கை! பெண் பிறந்த திதி: ${bTithi.fullNameTa} (#${bTithi.number}), ஆண் பிறந்த திதி: ${gTithi.fullNameTa} (#${gTithi.number}). பக்ஷம் வெவ்வேறாக இருந்தாலும் (${bTithi.pakshaTa} & ${gTithi.pakshaTa}), திதி எண் ஒன்றாக அமைந்துள்ளதால் சாஸ்திரப்படி கவனத்துடன் பரிசீலிக்க வேண்டும்.`;
    explanationEn = `⚠️ Same Tithi Number Warning! Bride (${bTithi.fullNameEn}) and Groom (${gTithi.fullNameEn}) share the same Tithi number (#${bTithi.number}) across different pakshas.`;
  } else {
    explanationTa = `✅ உத்தமம்! பெண் ஜன்ம திதி: ${bTithi.fullNameTa} (#${bTithi.number}), ஆண் ஜன்ம திதி: ${gTithi.fullNameTa} (#${gTithi.number}). இருவருக்கும் வெவ்வேறு ஜன்ம திதிகள் அமைந்துள்ளதால் ஏக திதி தோஷம் முற்றிலும் இல்லை.`;
    explanationEn = `✅ Safe Alignment! Bride (${bTithi.fullNameEn}) and Groom (${gTithi.fullNameEn}) have distinct Janma Tithis. No Eka Tithi Dosha.`;
  }

  return {
    ruleNumber: 2,
    ruleCode: 'SAME_JANMA_TITHI',
    titleTa: '2. ஏக ஜன்ம திதி விலக்கு விதி (Same Janma Tithi Avoidance)',
    titleEn: '2. Both Boy & Girl Same Janma Tithi Avoidance Rule',
    manuscriptQuoteTa: 'both boy and girl -genmai thithi eruka kudathu (இருவருக்கும் ஒரே ஜன்ம திதி இருக்கக்கூடாது)',
    bTithi,
    gTithi,
    isExactSameTithi,
    isSameTithiNumber,
    status,
    statusTextTa,
    statusTextEn,
    explanationTa,
    explanationEn,
    remedyTa: isExactSameTithi
      ? 'ஒரே திதி தோஷ நிவர்த்திக்காக குலதெய்வ வழிபாடு மற்றும் திருச்செந்தூர் அல்லது திருக்கடையூர் ஸ்தலங்களில் ஆயுஷ்/திதி ஹோமம் செய்வது அவசியம்.'
      : 'சிறப்பு பரிகாரம் தேவையில்லை.'
  };
}

/**
 * RULE 3:
 * "for girl muddku athi pathi for boy jathakam rasi and lankanam vara kudathu"
 * (பெண் முடக்கு அதிபதி ஆண் ஜாதகத்தில் ராசி & லக்கினத்தில் வரக்கூடாது)
 * Bride's Mudakku Lord must not be placed in Groom's Janma Rasi or Lagna,
 * nor should Groom's Janma Rasi or Lagna Lord be the Bride's Mudakku Lord.
 */
export function evaluateRule3_GirlMudakkuInBoyRasiLagna(bride, groom) {
  const result = checkGirlMudakkuInBoyRasiLagna(bride, groom);

  let status = result.hasConflict ? 'CRITICAL' : 'PASS';
  let statusTextTa = result.hasConflict
    ? '🛑 பொருந்தாது (பெண் முடக்கு அதிபதி ஆண் ராசி/லக்கினத்தில் உள்ளார்)'
    : '✅ உத்தமம் (பெண் முடக்கு அதிபதி ஆண் ராசி/லக்கினத்தில் இல்லை)';
  let statusTextEn = result.hasConflict
    ? '🛑 NOT MATCH (Bride Mudakku Lord in Groom Rasi or Lagna)'
    : '✅ Auspicious (No Mudakku in Groom Rasi or Lagna)';

  return {
    ruleNumber: 3,
    ruleCode: 'GIRL_MUDAKKU_IN_BOY_RASI_LAGNA',
    titleTa: '3. பெண் முடக்கு அதிபதி ஆண் ராசி/லக்ன விலக்கு விதி',
    titleEn: '3. Girl Mudakku Lord in Boy Rasi & Lagna Avoidance Rule',
    manuscriptQuoteTa: 'for girl muddku athi pathi for boy jathakam rasi and lankanam vara kudathu (பெண் முடக்கு அதிபதி ஆண் ஜாதகத்தில் ராசி மற்றும் லக்கினத்தில் வரக்கூடாது)',
    ...result,
    status,
    statusTextTa,
    statusTextEn
  };
}

/**
 * RULE 4:
 * "for girl thudasi for boy ammavasi and pournaim eruku kudathu"
 * (பெண் துவாதசி என்றால் ஆணிற்கு அமாவாசை & பௌர்ணமி இருக்கக்கூடாது)
 * If Bride is born in Thuvadasi (12th Tithi), Groom must not be born in Amavasai (New Moon) or Pournami (Full Moon).
 */
export function evaluateRule4_GirlThuvadasiBoyAmavasaiPournami(bride, groom) {
  const bTithi = getPersonTithi(bride);
  const gTithi = getPersonTithi(groom);

  // Bride is Thuvadasi (12th Tithi in either Shukla or Krishna)
  const isBrideThuvadasi = bTithi.number === 12;

  // Groom is Amavasai (Krishna 15 / index 29) or Pournami (Shukla 15 / index 14)
  const isGroomAmavasai = gTithi.isAmavasai || (!gTithi.isShukla && gTithi.number === 15);
  const isGroomPournami = gTithi.isPournami || (gTithi.isShukla && gTithi.number === 15);
  const isGroomAmavasaiOrPournami = isGroomAmavasai || isGroomPournami;

  const hasConflict = isBrideThuvadasi && isGroomAmavasaiOrPournami;

  let status = 'PASS';
  let statusTextTa = '✅ உத்தமம் (துவாதசி - அமாவாசை/பௌர்ணமி தோஷம் இல்லை)';
  let statusTextEn = '✅ Auspicious (No Thuvadasi-Amavasya/Pournami Conflict)';

  let explanationTa = '';
  let explanationEn = '';

  if (hasConflict) {
    status = 'CRITICAL';
    const groomTithiName = isGroomAmavasai ? 'அமாவாசை' : 'பௌர்ணமி';
    statusTextTa = `🛑 பொருந்தாது (பெண் துவாதசி - ஆண் ${groomTithiName} திதி தோஷம்)`;
    statusTextEn = `🛑 NOT MATCH (Bride Thuvadasi vs Groom ${isGroomAmavasai ? 'Amavasya' : 'Pournami'} Conflict)`;
    explanationTa = `🛑 பொருந்தாது (துவாதசி - அமாவாசை/பௌர்ணமி தோஷம்)! பெண் துவாதசி திதியில் (${bTithi.fullNameTa}) பிறந்துள்ளார்; ஆண் ${groomTithiName} திதியில் (${gTithi.fullNameTa}) பிறந்துள்ளார். சுவடி சாஸ்திர விதிப்படி: "துவாதசி திதியில் பிறந்த பெண்ணிற்கு, அமாவாசை அல்லது பௌர்ணமி திதியில் பிறந்த ஆணைத் திருமணம் செய்யக்கூடாது." இது தம்பதியரின் களத்திர சுகம், ஆயுள் மற்றும் பொருளாதார ஸ்திரத்தன்மைக்கு பெரும் பாதிப்பை உண்டாக்கும் என்பதால் முற்றிலும் தவிர்க்கப்பட வேண்டும்!`;
    explanationEn = `🛑 NOT MATCH! Bride is born in Thuvadasi (${bTithi.fullNameEn}), and Groom is born in ${groomTithiName} (${gTithi.fullNameEn}). Classical palm-leaf manuscript rule strictly mandates: "If Bride is born in Thuvadasi, Groom must not be born in Amavasya or Pournami."`;
  } else if (isBrideThuvadasi) {
    explanationTa = `✅ உத்தமம்! பெண் துவாதசி திதியில் (${bTithi.fullNameTa}) பிறந்திருந்தாலும், ஆண் அமாவாசை அல்லது பௌர்ணமியில் பிறக்காமல் ${gTithi.fullNameTa} திதியில் பிறந்துள்ளார். சுவடி விதிப்படி தோஷம் இல்லை.`;
    explanationEn = `✅ Auspicious! Bride is born in Thuvadasi (${bTithi.fullNameEn}), but Groom is born in ${gTithi.fullNameEn} (not Amavasya or Pournami). Safe alignment.`;
  } else {
    explanationTa = `✅ உத்தமம்! பெண்ணிற்கு துவாதசி திதி அமையவில்லை (பெண் திதி: ${bTithi.fullNameTa}, ஆண் திதி: ${gTithi.fullNameTa}). சுவடி சாஸ்திர விதிப்படி சுபமான அமைப்பாகும்.`;
    explanationEn = `✅ Auspicious! Bride is not born in Thuvadasi (Bride: ${bTithi.fullNameEn}, Groom: ${gTithi.fullNameEn}). No conflict.`;
  }

  return {
    ruleNumber: 4,
    ruleCode: 'GIRL_THUVADASI_BOY_AMAVASAI_POURNAMI',
    titleTa: '4. பெண் துவாதசி - ஆண் அமாவாசை/பௌர்ணமி விலக்கு விதி',
    titleEn: '4. Bride Thuvadasi vs Groom Amavasai/Pournami Avoidance Rule',
    manuscriptQuoteTa: 'for girl thudasi for boy ammavasi and pournaim eruku kudathu (பெண்ணிற்கு துவாதசி திதி என்றால் ஆணிற்கு அமாவாசை/பௌர்ணமி இருக்கக்கூடாது)',
    bTithi,
    gTithi,
    isBrideThuvadasi,
    isGroomAmavasai,
    isGroomPournami,
    hasConflict,
    status,
    statusTextTa,
    statusTextEn,
    explanationTa,
    explanationEn,
    remedyTa: hasConflict
      ? 'துவாதசி மற்றும் அமாவாசை/பௌர்ணமி தோஷ நிவர்த்திக்காக திருநள்ளாறு அல்லது வைத்தீஸ்வரன் கோயில் சென்று நவகிரக சாந்தி மற்றும் ஏகாதசி/துவாதசி விரத வழிபாடு செய்யவும்.'
      : 'சிறப்பு பரிகாரம் தேவையில்லை.'
  };
}

/**
 * Master Evaluation Engine for all 4 Tithi & Mudakku Manuscript Rules
 */
export function evaluateAllThithiAndMudakkuRules(bride, groom) {
  const rule1 = evaluateRule1_RikthaTithi4_8_14(bride, groom);
  const rule2 = evaluateRule2_SameJanmaTithi(bride, groom);
  const rule3 = evaluateRule3_GirlMudakkuInBoyRasiLagna(bride, groom);
  const rule4 = evaluateRule4_GirlThuvadasiBoyAmavasaiPournami(bride, groom);

  const rulesList = [rule1, rule2, rule3, rule4];

  // Scoring
  let score = 100;
  if (rule1.status === 'CRITICAL') score -= 30;
  if (rule2.status === 'CRITICAL') score -= 30;
  else if (rule2.status === 'WARN') score -= 15;
  if (rule3.status === 'CRITICAL') score -= 30;
  if (rule4.status === 'CRITICAL') score -= 30;

  const scorePercent = Math.max(0, Math.min(100, score));

  const passedCount = rulesList.filter(r => r.status === 'PASS').length;
  const warningCount = rulesList.filter(r => r.status === 'WARN').length;
  const criticalCount = rulesList.filter(r => r.status === 'CRITICAL').length;

  const isAllAuspicious = criticalCount === 0 && warningCount === 0;
  const isRecommended = criticalCount === 0 && warningCount <= 1;

  let overallStatusTa = '✅ சுவடி திதி & முடக்கு விதிகள் உத்தமம் (பொருத்தம் சுபம்)';
  let overallStatusEn = '✅ Tithi & Mudakku Manuscript Rules Auspicious';
  let badgeColor = 'emerald';

  if (criticalCount > 0) {
    overallStatusTa = '🛑 சுவடி திதி & முடக்கு விதி விலக்கு எச்சரிக்கை (பொருந்தாது)';
    overallStatusEn = '🛑 Tithi & Mudakku Critical Manuscript Obstacle (NOT MATCH)';
    badgeColor = 'rose';
  } else if (warningCount > 0) {
    overallStatusTa = '⚠️ திதி விதியில் எச்சரிக்கை (பரிகாரம் அவசியம்)';
    overallStatusEn = '⚠️ Tithi Warning (Remedies Advised)';
    badgeColor = 'amber';
  }

  return {
    titleTa: 'சுவடி சாஸ்திர 4 திதி & முடக்கு விதிகள்',
    titleEn: '4 Tithi & Mudakku Classical Manuscript Rules',
    scorePercent,
    passedCount,
    warningCount,
    criticalCount,
    totalRules: 4,
    isAllAuspicious,
    isRecommended,
    overallStatusTa,
    overallStatusEn,
    badgeColor,
    rule1_rikthaTithi4_8_14: rule1,
    rule2_sameJanmaTithi: rule2,
    rule3_girlMudakkuInBoyRasiLagna: rule3,
    rule4_girlThuvadasiBoyAmavasaiPournami: rule4,
    rulesList
  };
}

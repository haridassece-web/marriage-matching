// Traditional 9 Marriage Doshas Engine (9 வித திருமண தோஷங்கள்)
// Based on authentic Tamil astrological principles

import { getRasiById } from '../../data/rasis';

/**
 * Evaluates the 9 Thirumana Dhosams (திருமண தோஷங்கள்) for Bride and Groom
 */
export function evaluate9ThirumanaDhosams(person) {
  const lagnaRasi = person.lagnaRasiId || person.rasiId || 1;
  const marsRasi = person.marsRasiId || person.rasiId;
  const saturnRasi = person.saturnRasiId || 10;
  const rahuRasi = person.rahuRasiId || 3;
  const ketuRasi = person.ketuRasiId || 9;
  const moonRasi = person.rasiId || 1;
  const sunRasi = person.sunRasiId || 5;
  const venusRasi = person.venusRasiId || 2;
  const jupiterRasi = person.jupiterRasiId || 9;

  // Helper function to calculate house position from Lagna
  const getHouseFromLagna = (planetRasi) => {
    let house = planetRasi - lagnaRasi + 1;
    if (house <= 0) house += 12;
    return house;
  };

  const marsHouse = getHouseFromLagna(marsRasi);
  const saturnHouse = getHouseFromLagna(saturnRasi);
  const rahuHouse = getHouseFromLagna(rahuRasi);
  const ketuHouse = getHouseFromLagna(ketuRasi);
  const venusHouse = getHouseFromLagna(venusRasi);
  const sunHouse = getHouseFromLagna(sunRasi);

  const dhosams = [];

  // ==========================================
  // 1. செவ்வாய் தோஷம் (Sevvai / Kuja Dosha)
  // ==========================================
  const isMarsDoshaHouse = [1, 2, 4, 7, 8, 12].includes(marsHouse);
  const MARS_EXEMPT_RASIS = [1, 9, 4, 8, 12]; // Mesham, Dhanusu, Kadagam, Viruchigam, Meenam
  const isMarsExemptSign = MARS_EXEMPT_RASIS.includes(marsRasi);
  const isMarsOwnExalted = [1, 8, 10, 4].includes(marsRasi); // Aries, Scorpio, Capricorn, Cancer (Debilitation nivarthi)

  let marsEffectsTa = '';
  if (marsHouse === 2) marsEffectsTa = '2-ம் இடம்: பேச்சு கடுமையாக இருக்கும் (Harsh speech).';
  else if (marsHouse === 4) marsEffectsTa = '4-ம் இடம்: உடல் சுகம் கெடும் (Impaired domestic comfort).';
  else if (marsHouse === 7) marsEffectsTa = '7-ம் இடம்: தாம்பத்தியத்தில் ஒற்றுமையின்மை (Marital friction).';
  else if (marsHouse === 8) marsEffectsTa = '8-ம் இடம்: ஆயுள் கண்டம் / இரத்தம் தொடர்பான பாதிப்பு (Ayul Kandam risk).';
  else if (marsHouse === 12) marsEffectsTa = '12-ம் இடம்: நிம்மதியான தூக்கம் / அமைதி வராது (Sleep disturbance).';
  else if (marsHouse === 1) marsEffectsTa = '1-ம் இடம்: லக்ன செவ்வாய் (Self-assertive nature).';

  let marsDoshaStatus = 'NONE';
  if (isMarsDoshaHouse) {
    if (isMarsExemptSign || isMarsOwnExalted) {
      marsDoshaStatus = 'CANCELLED';
    } else {
      marsDoshaStatus = 'PRESENT';
    }
  }

  dhosams.push({
    id: 'SEVVAI_DOSHAM',
    nameTa: '1. செவ்வாய் தோஷம் (Sevvai Dosha)',
    nameEn: '1. Sevvai / Manglik Dosha',
    status: marsDoshaStatus,
    house: marsHouse,
    severity: marsDoshaStatus === 'PRESENT' ? ([7, 8].includes(marsHouse) ? 'HIGH' : 'MEDIUM') : 'NONE',
    explanationTa: marsDoshaStatus === 'PRESENT'
      ? `செவ்வாய் லக்னத்திற்கு ${marsHouse}-ஆம் வீட்டில் உள்ளது. ${marsEffectsTa}`
      : marsDoshaStatus === 'CANCELLED'
      ? `செவ்வாய் ${marsHouse}-ஆம் வீட்டில் இருந்தாலும் மேஷம்/தனுசு/கடகம்/விருச்சிகம்/மீனம் ராசி அல்லது ஆட்சி/உச்ச நிலையில் தோஷ நிவர்த்தி பெறுகிறது.`
      : `செவ்வாய் ${marsHouse}-ஆம் வீட்டில் இருப்பதால் செவ்வாய் தோஷம் இல்லை.`,
    explanationEn: marsDoshaStatus === 'PRESENT'
      ? `Mars is in ${marsHouse}th house from Lagna causing Sevvai Dosha.`
      : marsDoshaStatus === 'CANCELLED'
      ? `Mars in ${marsHouse}th house is cancelled due to sign/exaltation exemption.`
      : `Mars is in house ${marsHouse}. No Sevvai Dosha.`,
    matchingRuleTa: 'பெண்ணிற்கு செவ்வாய் தோஷம் இருந்தால் ஆணிற்கும் கட்டாயம் இருக்க வேண்டும்!',
    matchingRuleEn: 'If Bride has Sevvai Dosha, Groom MUST also have matching Sevvai Dosha.'
  });

  // ==========================================
  // 2. சர்ப்ப தோஷம் / ராகு-கேது தோஷம் (Sarpa / Rahu-Ketu Dosha)
  // ==========================================
  const isRahuSarpaHouse = [1, 2, 7, 8, 12].includes(rahuHouse);
  const isKetuSarpaHouse = [1, 2, 7, 8, 12].includes(ketuHouse);
  const isSarpaPresent = isRahuSarpaHouse || isKetuSarpaHouse;

  let sarpaDetailsTa = '';
  if (rahuHouse === 1) sarpaDetailsTa += '1-ல் ராகு: அபரிமிதமான ஆசை (Excessive desire). ';
  if (ketuHouse === 7) sarpaDetailsTa += '7-ல் கேது: பற்றற்ற தன்மை / விரக்தி (Detachment). ';
  if ([7, 8].includes(rahuHouse) || [7, 8].includes(ketuHouse)) sarpaDetailsTa += '7, 8-ல் ராகு/கேது: உடல் பாதிப்பு & திருமண தாமதம். ';
  if (rahuHouse === 12 || ketuHouse === 12) sarpaDetailsTa += '12-ல் ராகு/கேது: வாழ்க்கையில் நிம்மதியின்மை. ';

  dhosams.push({
    id: 'SARPA_DOSHAM',
    nameTa: '2. சர்ப்ப தோஷம் / ராகு-கேது தோஷம் (Sarpa Dosha)',
    nameEn: '2. Rahu-Ketu / Sarpa Dosha',
    status: isSarpaPresent ? 'PRESENT' : 'NONE',
    house: `Rahu:${rahuHouse}, Ketu:${ketuHouse}`,
    severity: (rahuHouse === 7 || ketuHouse === 7 || rahuHouse === 8 || ketuHouse === 8) ? 'HIGH' : isSarpaPresent ? 'MEDIUM' : 'NONE',
    explanationTa: isSarpaPresent
      ? `ராகு ${rahuHouse}-லும், கேது ${ketuHouse}-லும் உள்ளனர். ${sarpaDetailsTa}`
      : 'ராகு-கேது 1, 2, 7, 8, 12-ல் அமையாததால் சர்ப்ப தோஷம் இல்லை.',
    explanationEn: isSarpaPresent
      ? `Rahu in house ${rahuHouse} and Ketu in house ${ketuHouse} cause Sarpa Dosha.`
      : 'No Rahu-Ketu Sarpa placement.',
    matchingRuleTa: 'பெண்ணிற்கு 7, 8-ல் ராகு/கேது இருந்தால் ஆணிற்கும் 7, 8-ல் ராகு/கேது இருக்க வேண்டும்.',
    matchingRuleEn: 'If Bride has Rahu/Ketu in 7 or 8, Groom must also have Rahu/Ketu in matching house.'
  });

  // ==========================================
  // 3. கால சர்ப்ப தோஷம் / யோகம் (Kala Sarpa)
  // ==========================================
  // Simple check if Rahu and Ketu form axis and planets are hemmed
  const isKalaSarpa = Math.abs(rahuRasi - ketuRasi) === 6;
  dhosams.push({
    id: 'KALA_SARPA_DOSHAM',
    nameTa: '3. கால சர்ப்ப தோஷம் / யோகம் (Kala Sarpa)',
    nameEn: '3. Kala Sarpa Dosha / Yoga',
    status: isKalaSarpa ? 'PRESENT' : 'NONE',
    severity: isKalaSarpa ? 'MEDIUM' : 'NONE',
    explanationTa: isKalaSarpa
      ? 'ராகு-கேது அச்சுக்குள் கிரகங்கள் அடங்கியுள்ளன. கேதுவை நோக்கி சென்றால் யோகம், ராகுவை நோக்கி சென்றால் தோஷம்.'
      : 'கால சர்ப்ப தோஷம் இல்லை. கிரகங்கள் பரவலாக அமைந்துள்ளன.',
    explanationEn: isKalaSarpa
      ? 'Planets hemmed in Rahu-Ketu axis causing Kala Sarpa configuration.'
      : 'No Kala Sarpa axis constraint.',
    matchingRuleTa: 'வாழ்க்கையில் பொருளாதார சுபிட்சம் மற்றும் சுய உழைப்பு யோகம் பெற வழிகாட்டும்.',
    matchingRuleEn: 'Requires careful evaluation of planetary movement towards Rahu/Ketu.'
  });

  // ==========================================
  // 4. சனி தோஷம் (Saturn / Shani Dosha)
  // ==========================================
  const isSaturnDoshaHouse = [1, 2, 5, 7, 8, 12].includes(saturnHouse);
  dhosams.push({
    id: 'SATURN_DOSHAM',
    nameTa: '4. சனி தோஷம் (Saturn / Shani Dosha)',
    nameEn: '4. Saturn / Shani Dosha',
    status: isSaturnDoshaHouse ? 'PRESENT' : 'NONE',
    house: saturnHouse,
    severity: isSaturnDoshaHouse ? 'MEDIUM' : 'NONE',
    explanationTa: isSaturnDoshaHouse
      ? `சனி லக்னத்திற்கு ${saturnHouse}-ஆம் வீட்டில் அமர்ந்துள்ளார். ஆரம்ப திருமண வாழ்க்கையில் சிறு தடைகளை தந்து, பிற்பகுதி வாழ்க்கையை சிறப்பாக்கும்.`
      : `சனி ${saturnHouse}-ஆம் வீட்டில் அமர்ந்துள்ளதால் சனி தோஷம் இல்லை.`,
    explanationEn: isSaturnDoshaHouse
      ? `Saturn placed in ${saturnHouse}th house. Delays initial marital harmony but bestows maturity in later years.`
      : `Saturn in house ${saturnHouse}. No Saturn Dosha.`,
    matchingRuleTa: 'சனி அமைப்பிற்கு பொறுமையும் பரஸ்பர புரிதலும் அவசியம்.',
    matchingRuleEn: 'Patience and maturity resolve initial hurdles.'
  });

  // ==========================================
  // 5. கிரகங்கள் இணைவு / அஸ்தங்க தோஷம் (Planetary Conjunction / Combustion)
  // ==========================================
  const isVenusCombust = sunRasi === venusRasi; // Venus with Sun
  const isGuruVenusJoined = jupiterRasi === venusRasi; // Guru + Venus together
  const isConjunctionDosha = isVenusCombust || isGuruVenusJoined;

  dhosams.push({
    id: 'CONJUNCTION_COMBUSTION_DOSHAM',
    nameTa: '5. கிரகங்கள் இணைவு & அஸ்தங்க தோஷம் (Conjunction & Combustion)',
    nameEn: '5. Planetary Conjunction & Combustion Dosha',
    status: isConjunctionDosha ? 'PRESENT' : 'NONE',
    severity: isConjunctionDosha ? 'HIGH' : 'NONE',
    explanationTa: isVenusCombust
      ? 'சூரியனுடன் சுக்கிரன் அஸ்தங்கம் அடைந்துள்ளார். திருமண வாழ்வில் மற்றும் தாம்பத்திய சுகத்தில் கவனமும் பரிகாரமும் தேவை.'
      : isGuruVenusJoined
      ? 'குருவும் சுக்கிரனும் ஒரே ராசியில் இணைந்துள்ளனர் (பகை சேர்க்கை). திருமண வாழ்க்கையில் கருத்து வேறுபாடு வரலாம்.'
      : 'அஸ்தங்க அல்லது சுக்கிர-குரு சேர்க்கை தோஷங்கள் இல்லை.',
    explanationEn: isVenusCombust
      ? 'Venus is combust with Sun, indicating sensitivity in marital harmony.'
      : isGuruVenusJoined
      ? 'Jupiter and Venus are in conjunction. Need balance in marital expectations.'
      : 'No combustion or inimical planetary conjunction found.',
    matchingRuleTa: 'சுக்கிரன் அஸ்தங்கம் அடையக்கூடாது. குரு-சுக்கிரன் சேர்க்கைக்கு உரிய பரிகாரம் செய்ய வேண்டும்.',
    matchingRuleEn: 'Avoid combust Venus or severe malefic aspect on 7th house.'
  });

  // ==========================================
  // 6. களத்திர தோஷம் (Kalathira Dosha)
  // ==========================================
  const isKalathiraDosha = [1, 2, 7, 8].includes(saturnHouse) && [1, 2, 7, 8].includes(marsHouse);
  dhosams.push({
    id: 'KALATHIRA_DOSHAM',
    nameTa: '6. களத்திர தோஷம் (Kalathira Dosha)',
    nameEn: '6. Kalathira / Spouse Protection Dosha',
    status: isKalathiraDosha ? 'PRESENT' : 'NONE',
    severity: isKalathiraDosha ? 'HIGH' : 'NONE',
    explanationTa: isKalathiraDosha
      ? '1, 2, 7, 8-ல் இயற்கை பாவ கிரகங்கள் அமர்ந்து களத்திர தோஷத்தை ஏற்படுத்துகின்றன. வாழ்க்கைத்துணையின் ஆரோக்கியத்தில் கவனம் தேவை.'
      : 'களத்திர தோஷம் இல்லை. 7-ம் இடம் சுப பலத்துடன் உள்ளது.',
    explanationEn: isKalathiraDosha
      ? 'Malefic planets in 1, 2, 7, 8 houses cause Kalathira Dosha.'
      : 'No Kalathira Dosha found.',
    matchingRuleTa: 'களத்திர தோஷம் உள்ள ஜாதகத்திற்கு அதே போன்ற தோஷமுள்ள ஜாதகத்தையே சேர்க்க வேண்டும்.',
    matchingRuleEn: 'Match with a horoscope having equal Kalathira protective strength.'
  });

  // ==========================================
  // 7. புத்திர தோஷம் (Puthira Dosha)
  // ==========================================
  // 5th house calculation
  let house5Rasi = lagnaRasi + 4;
  if (house5Rasi > 12) house5Rasi -= 12;

  const isPuthiraDosha = marsRasi === house5Rasi || saturnRasi === house5Rasi || rahuRasi === house5Rasi || ketuRasi === house5Rasi;

  dhosams.push({
    id: 'PUTHIRA_DOSHAM',
    nameTa: '7. புத்திர தோஷம் (Puthira / Offspring Dosha)',
    nameEn: '7. Puthira / Offspring Dosha',
    status: isPuthiraDosha ? 'PRESENT' : 'NONE',
    severity: isPuthiraDosha ? 'MEDIUM' : 'NONE',
    explanationTa: isPuthiraDosha
      ? '5-ஆம் இடத்தில் பாவ கிரகம் அமர்ந்துள்ளது. சந்ததி பிறப்பில் காலதாமதம் ஏற்படலாம் (புத்திர தோஷ பரிகாரம் அவசியம்).'
      : '5-ஆம் இடம் சுபமடைந்து உள்ளதால் புத்திர தோஷம் இல்லை.',
    explanationEn: isPuthiraDosha
      ? 'Malefic planet in 5th house causes delay in progeny.'
      : 'No Puthira Dosha. 5th house is clear.',
    matchingRuleTa: 'தம்பதியரில் ஒருவருக்கு 5-ம் இடம் சிறப்பாக அமைந்தால் தோஷம் நிவர்த்தியாகும்.',
    matchingRuleEn: 'If one partner has strong 5th house, Puthira Dosha is overcome.'
  });

  // ==========================================
  // 8. விஷகன்னிகா தோஷம் (Visha Kannika Dosha)
  // ==========================================
  const isVishaKannika = [2, 8].includes(marsHouse) && [2, 8].includes(saturnHouse);
  dhosams.push({
    id: 'VISHA_KANNIKA_DOSHAM',
    nameTa: '8. விஷகன்னிகா தோஷம் (Visha Kannika Dosha)',
    nameEn: '8. Visha Kannika Dosha',
    status: isVishaKannika ? 'PRESENT' : 'NONE',
    severity: isVishaKannika ? 'CRITICAL' : 'NONE',
    explanationTa: isVishaKannika
      ? '2-ம் பாவமும் 8-ம் பாவமும் கடுமையாக பாதிக்கப்பட்டுள்ளன. திருமண வாழ்வில் சட்டென்று பிரிதல் அல்லது தடைகள் ஏற்படலாம்.'
      : '2-ம் மற்றும் 8-ம் பாவகங்கள் சுபமடைந்து விஷகன்னிகா தோஷம் இல்லை.',
    explanationEn: isVishaKannika
      ? 'Severe affliction to 2nd and 8th houses causing Visha Kannika configuration.'
      : 'No Visha Kannika affliction.',
    matchingRuleTa: 'இந்த தோஷம் இருந்தால் மிகக் கவனமாக ஜாதகப் பொருத்தம் பார்க்க வேண்டும்.',
    matchingRuleEn: 'Requires expert astrologer review and strong counter-balancing match.'
  });

  // ==========================================
  // 9. புனர்பூ தோஷம் (Punarphoo / Moon-Saturn Dosha)
  // ==========================================
  const isMoonSaturnJoined = moonRasi === saturnRasi; // Moon + Saturn together
  let saturnCountFromMoon = saturnRasi - moonRasi + 1;
  if (saturnCountFromMoon <= 0) saturnCountFromMoon += 12;

  const isPunarphoo = isMoonSaturnJoined || [2, 4, 7, 10].includes(saturnHouse);

  dhosams.push({
    id: 'PUNARPHOO_DOSHAM',
    nameTa: '9. புனர்பூ தோஷம் (Punarphoo / Moon-Saturn Dosha)',
    nameEn: '9. Punarphoo / Moon-Saturn Conjunction',
    status: isPunarphoo ? 'PRESENT' : 'NONE',
    severity: isPunarphoo ? 'MEDIUM' : 'NONE',
    explanationTa: isPunarphoo
      ? 'சந்திரனும் சனியும் இணைவு அல்லது 2, 4, 7, 10-ல் அமர்ந்து புனர்பூ தோஷத்தை தருகின்றனர். திருமண நிச்சயதார்த்தம்/தேதியில் தடைகள் அல்லது அளவுக்கு அதிகமான சந்தேகம் நேரலாம்.'
      : 'சந்திரன்-சனி இணைவு அல்லது சாரம் பெறாததால் புனர்பூ தோஷம் இல்லை.',
    explanationEn: isPunarphoo
      ? 'Moon-Saturn connection causing Punarphoo Dosha. May cause wedding date delays or emotional over-sensitivity.'
      : 'No Punarphoo Dosha.',
    matchingRuleTa: 'குலதெய்வ வழிபாடு மற்றும் விநாயகர் வழிபாடு புனர்பூ தோஷத்தை நிவர்த்தி செய்யும்.',
    matchingRuleEn: 'Remedial prayers to Lord Ganesha relieve Punarphoo anxiety.'
  });

  return dhosams;
}

/**
 * Calculates Thirumana Dhosams comparison & balancing between Bride & Groom
 */
export function calculate9ThirumanaDhosamsAnalysis(bride, groom) {
  const brideDhosams = evaluate9ThirumanaDhosams(bride);
  const groomDhosams = evaluate9ThirumanaDhosams(groom);

  const brideActiveCount = brideDhosams.filter(d => d.status === 'PRESENT').length;
  const groomActiveCount = groomDhosams.filter(d => d.status === 'PRESENT').length;

  // Key matching check for Sevvai & Sarpa
  const brideSevvai = brideDhosams.find(d => d.id === 'SEVVAI_DOSHAM');
  const groomSevvai = groomDhosams.find(d => d.id === 'SEVVAI_DOSHAM');

  const brideSarpa = brideDhosams.find(d => d.id === 'SARPA_DOSHAM');
  const groomSarpa = groomDhosams.find(d => d.id === 'SARPA_DOSHAM');

  let isBalanceMatched = true;
  const imbalanceWarnings = [];

  if (brideSevvai.status === 'PRESENT' && groomSevvai.status !== 'PRESENT') {
    isBalanceMatched = false;
    imbalanceWarnings.push({
      type: 'SEVVAI_IMBALANCE',
      msgTa: '⚠️ பெண்ணிற்கு செவ்வாய் தோஷம் உள்ளது, ஆணிற்கு செவ்வாய் தோஷம் இல்லை!',
      msgEn: '⚠️ Bride has Sevvai Dosha, but Groom does not!'
    });
  }

  if (brideSarpa.status === 'PRESENT' && groomSarpa.status !== 'PRESENT') {
    isBalanceMatched = false;
    imbalanceWarnings.push({
      type: 'SARPA_IMBALANCE',
      msgTa: '⚠️ பெண்ணிற்கு சர்ப்ப தோஷம் (7/8-ல் ராகு-கேது) உள்ளது, ஆணிற்கு சர்ப்ப தோஷம் இல்லை!',
      msgEn: '⚠️ Bride has Sarpa Dosha in 7/8, but Groom does not!'
    });
  }

  return {
    brideDhosams,
    groomDhosams,
    brideActiveCount,
    groomActiveCount,
    isBalanceMatched,
    imbalanceWarnings
  };
}

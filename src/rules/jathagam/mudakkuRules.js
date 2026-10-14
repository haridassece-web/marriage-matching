// Mudakku Rasi & Mudakku Adhipathi Rules Engine (முடக்கு ராசி & முடக்கு அதிபதி விதிகள்)
// Authentic Nadi Manuscript Formula:
// 1. சூரியன் நின்ற நட்சத்திரத்தில் இருந்து மூலம் (Moolam - Star #19) நட்சத்திரம் வரை எண்ணிக்கை எண்ண வேண்டும்.
// 2. அந்த எண்ணிக்கையை பூராடம் (Pooradam - Star #20) நட்சத்திரத்தில் இருந்து எண்ணினால் வரும் நட்சத்திரமே "முடக்கு நட்சத்திரம்".
// 3. அந்த முடக்கு நட்சத்திரம் அமர்ந்த ராசியே "முடக்கு ராசி".
// 4. அம்முடக்கு ராசியின் அதிபதியே "முடக்கு அதிபதி".

import { getRasiById } from '../../data/rasis.js';
import { NAKSHATRAS, getNakshatraById } from '../../data/nakshatras.js';

/**
 * Determines Mudakku Rasi ID, Mudakku Nakshatra, and Mudakku Adhipathi for a person
 */
export function getMudakkuInfo(personOrLagna, inputMoonStarId = null, inputSunStarId = null, inputLagnaStarId = null) {
  let lagnaRasiId = 1;
  let rasiId = 1;
  let sunStarId = null;
  let moonStarId = null;
  let lagnaStarId = null;

  if (typeof personOrLagna === 'object' && personOrLagna !== null) {
    lagnaRasiId = personOrLagna.lagnaRasiId || 1;
    rasiId = personOrLagna.rasiId || personOrLagna.lagnaRasiId || 1;
    moonStarId = personOrLagna.nakshatraId;
    sunStarId = personOrLagna.sunStarId || null;

    if (personOrLagna.allGrahas) {
      const sunG = personOrLagna.allGrahas.find(g => g.code === 'SUN');
      const moonG = personOrLagna.allGrahas.find(g => g.code === 'MOON');
      const lagG = personOrLagna.allGrahas.find(g => g.code === 'LAG');
      if (sunG && sunG.starNakshatra) sunStarId = sunG.starNakshatra.id;
      if (moonG && moonG.starNakshatra) moonStarId = moonG.starNakshatra.id;
      if (lagG && lagG.starNakshatra) lagnaStarId = lagG.starNakshatra.id;
    }
  } else if (typeof personOrLagna === 'number') {
    lagnaRasiId = personOrLagna;
    rasiId = personOrLagna;
    moonStarId = inputMoonStarId;
    sunStarId = inputSunStarId;
    lagnaStarId = inputLagnaStarId;
  }

  // Use Sun star placement if available, fallback to Moon star
  const effectiveSunStarId = parseInt(sunStarId || moonStarId || 1, 10);
  const sunStarObj = getNakshatraById(effectiveSunStarId);

  // 1. Count from Sun star up to Moolam (#19) inclusive
  const MOOLA_STAR_ID = 19;
  let countToMoolam = MOOLA_STAR_ID - effectiveSunStarId + 1;
  if (countToMoolam <= 0) countToMoolam += 27;

  // 2. Count that many stars starting from Pooradam (#20) inclusive
  const POORADAM_STAR_ID = 20;
  let mudakkuStarId = POORADAM_STAR_ID + countToMoolam - 1;
  while (mudakkuStarId > 27) {
    mudakkuStarId -= 27;
  }

  // 3. Mudakku Nakshatra & Mudakku Rasi
  const mudakkuStarObj = getNakshatraById(mudakkuStarId);
  const mudakkuRasiId = mudakkuStarObj ? mudakkuStarObj.rasiId : 1;
  const mudakkuRasiInfo = getRasiById(mudakkuRasiId);

  // 4. House from Lagna (1..12)
  let houseFromLagna = mudakkuRasiId - lagnaRasiId + 1;
  if (houseFromLagna <= 0) houseFromLagna += 12;

  return {
    sunStarId: effectiveSunStarId,
    sunStarNameTa: sunStarObj ? sunStarObj.nameTa : '',
    sunStarNameEn: sunStarObj ? sunStarObj.nameEn : '',
    countToMoolam,
    mudakkuStarId,
    mudakkuStarNameTa: mudakkuStarObj ? mudakkuStarObj.nameTa : '',
    mudakkuStarNameEn: mudakkuStarObj ? mudakkuStarObj.nameEn : '',
    mudakkuRasiId,
    mudakkuRasiNameTa: mudakkuRasiInfo.nameTa,
    mudakkuRasiNameEn: mudakkuRasiInfo.nameEn,
    mudakkuLordId: mudakkuRasiInfo.lordId,
    mudakkuLordTa: mudakkuRasiInfo.lordTa,
    mudakkuLordEn: mudakkuRasiInfo.lordEn,
    houseFromLagna
  };
}

/**
 * Rule 3: Bride's Mudakku Adhipathi in Groom's Rasi or Lagna Rule
 * "for girl muddku athi pathi for boy jathakam rasi and lankanam vara kudathu"
 * - Bride's Mudakku Lord must not be placed in Groom's Janma Rasi or Lagna
 * - Groom's Janma Rasi lord or Lagna lord must not be Bride's Mudakku Lord
 */
export function checkGirlMudakkuInBoyRasiLagna(bride, groom) {
  const bMudakku = getMudakkuInfo(bride);
  const gRasiId = Number(groom.rasiId || 1);
  const gLagnaId = Number(groom.lagnaRasiId || groom.rasiId || 1);

  const gRasiInfo = getRasiById(gRasiId);
  const gLagnaInfo = getRasiById(gLagnaId);

  // Map lordId 1..7 to planet code
  const lordCodeMap = {
    1: 'SUN',
    2: 'MOON',
    3: 'MARS',
    4: 'MERC',
    5: 'JUP',
    6: 'VEN',
    7: 'SAT'
  };

  const targetCode = lordCodeMap[bMudakku.mudakkuLordId];

  // Find where this planet is situated in Groom's chart
  let planetInGroomRasiId = null;
  if (groom.allGrahas && Array.isArray(groom.allGrahas)) {
    const foundGraha = groom.allGrahas.find(g => g.code === targetCode);
    if (foundGraha) {
      planetInGroomRasiId = Number(foundGraha.rasiId);
    }
  } else {
    const codeKeyMap = {
      'SUN': groom.sunRasiId,
      'MOON': groom.rasiId,
      'MARS': groom.marsRasiId,
      'MERC': groom.mercuryRasiId,
      'JUP': groom.jupiterRasiId,
      'VEN': groom.venusRasiId,
      'SAT': groom.saturnRasiId
    };
    if (codeKeyMap[targetCode]) {
      planetInGroomRasiId = Number(codeKeyMap[targetCode]);
    }
  }

  // Check 1: Is Bride's Mudakku Lord planet placed in Groom's Janma Rasi (Moon Sign)?
  const isMudakkuLordInGroomRasi = (planetInGroomRasiId !== null && planetInGroomRasiId === gRasiId);

  // Check 2: Is Bride's Mudakku Lord planet placed in Groom's Janma Lagna (Ascendant)?
  const isMudakkuLordInGroomLagna = (planetInGroomRasiId !== null && planetInGroomRasiId === gLagnaId);

  // Check 3: Is Groom's Janma Rasi lord itself the Bride's Mudakku Lord?
  const isGroomRasiLordMudakku = (gRasiInfo.lordId === bMudakku.mudakkuLordId);

  // Check 4: Is Groom's Janma Lagna lord itself the Bride's Mudakku Lord?
  const isGroomLagnaLordMudakku = (gLagnaInfo.lordId === bMudakku.mudakkuLordId);

  const hasConflict = isMudakkuLordInGroomRasi || isMudakkuLordInGroomLagna || isGroomRasiLordMudakku || isGroomLagnaLordMudakku;

  let explanationTa = '';
  let explanationEn = '';
  const reasonTa = [];
  const reasonEn = [];

  if (isMudakkuLordInGroomRasi) {
    reasonTa.push(`பெண்ணின் முடக்கு அதிபதியான ${bMudakku.mudakkuLordTa}, ஆணின் சந்திர ராசியில் (${gRasiInfo.nameTa}) அமர்ந்துள்ளார்`);
    reasonEn.push(`Bride's Mudakku Lord (${bMudakku.mudakkuLordEn}) is placed in Groom's Janma Rasi (${gRasiInfo.nameEn})`);
  }
  if (isMudakkuLordInGroomLagna) {
    reasonTa.push(`பெண்ணின் முடக்கு அதிபதியான ${bMudakku.mudakkuLordTa}, ஆணின் லக்கினத்தில் (${gLagnaInfo.nameTa}) அமர்ந்துள்ளார்`);
    reasonEn.push(`Bride's Mudakku Lord (${bMudakku.mudakkuLordEn}) is placed in Groom's Janma Lagna (${gLagnaInfo.nameEn})`);
  }
  if (isGroomRasiLordMudakku) {
    reasonTa.push(`ஆணின் ராசி நாதனே (${gRasiInfo.lordTa}) பெண்ணின் முடக்கு அதிபதியாக வந்துள்ளார்`);
    reasonEn.push(`Groom's Rasi Lord (${gRasiInfo.lordEn}) is the Bride's Mudakku Lord`);
  }
  if (isGroomLagnaLordMudakku) {
    reasonTa.push(`ஆணின் லக்கின நாதனே (${gLagnaInfo.lordTa}) பெண்ணின் முடக்கு அதிபதியாக வந்துள்ளார்`);
    reasonEn.push(`Groom's Lagna Lord (${gLagnaInfo.lordEn}) is the Bride's Mudakku Lord`);
  }

  if (hasConflict) {
    explanationTa = `🛑 பெண் முடக்கு அதிபதி தோஷம் (சேர்க்கக் கூடாது)! சுவடி சாஸ்திர விதிப்படி: "பெண்ணின் முடக்கு அதிபதி ஆணின் ஜாதகத்தில் ராசி மற்றும் லக்கினத்தில் வரக்கூடாது." ${reasonTa.join('; ')}. இது ஆணின் வாழ்வாதாரம், ஆயுள்-ஆரோக்கியம் மற்றும் குடும்ப முன்னேற்றத்தை முடக்கும் என்பதால் திருமணம் தவிர்க்கப்பட வேண்டும்!`;
    explanationEn = `🛑 Bride's Mudakku Lord Conflict (Avoid Alliance)! Manuscript Rule: "Bride's Mudakku Lord must not appear in Groom's Horoscope Rasi or Lagna." ${reasonEn.join('; ')}. This paralyzes the groom's fortune and health.`;
  } else {
    explanationTa = `✅ பெண் முடக்கு அதிபதி சுபம்! பெண்ணின் முடக்கு அதிபதியான ${bMudakku.mudakkuLordTa} (${bMudakku.mudakkuRasiNameTa}), ஆணின் ராசியிலோ (${gRasiInfo.nameTa}) அல்லது லக்கினத்திலோ (${gLagnaInfo.nameTa}) அமையவில்லை. சுவடி விதிப்படி உத்தம அமைப்பாகும்.`;
    explanationEn = `✅ Auspicious Alignment! Bride's Mudakku Lord (${bMudakku.mudakkuLordEn}) does not occupy or rule Groom's Rasi (${gRasiInfo.nameEn}) or Lagna (${gLagnaInfo.nameEn}).`;
  }

  return {
    bMudakku,
    planetInGroomRasiId,
    isMudakkuLordInGroomRasi,
    isMudakkuLordInGroomLagna,
    isGroomRasiLordMudakku,
    isGroomLagnaLordMudakku,
    hasConflict,
    explanationTa,
    explanationEn,
    remedyTa: hasConflict
      ? 'வியாழக்கிழமைகளில் தட்சிணாமூர்த்தி வழிபாடு மற்றும் முடக்கு அதிபதி கிரகத்திற்குரிய ஸ்தலத்தில் பரிகார அர்ச்சனை செய்யவும்.'
      : 'சிறப்பு பரிகாரம் தேவையில்லை.'
  };
}

/**
 * Main Mudakku Rules Evaluation function for Bride & Groom
 */
export function evaluateMudakkuRules(bride, groom) {
  const bMudakku = getMudakkuInfo(bride);
  const gMudakku = getMudakkuInfo(groom);

  // Rule 1: Same Mudakku Adhipathi Conflict
  const isSameMudakkuLord = bMudakku.mudakkuLordId === gMudakku.mudakkuLordId;

  // Rule 2: 9th/10th House Mudakku (Bride 9th House, Groom 10th House)
  const isBride9thMudakku = bMudakku.houseFromLagna === 9;
  const isGroom10thMudakku = gMudakku.houseFromLagna === 10;
  const is9th10thMudakkuConflict = isBride9thMudakku || isGroom10thMudakku;

  // Rule 3: Bride's Mudakku Lord in Groom's Rasi or Lagna
  const girlMudakkuInBoyCheck = checkGirlMudakkuInBoyRasiLagna(bride, groom);

  const hasMudakkuConflict = isSameMudakkuLord || is9th10thMudakkuConflict || girlMudakkuInBoyCheck.hasConflict;

  let explanationTa = '';
  let explanationEn = '';

  if (girlMudakkuInBoyCheck.hasConflict) {
    explanationTa = girlMudakkuInBoyCheck.explanationTa;
    explanationEn = girlMudakkuInBoyCheck.explanationEn;
  } else if (isSameMudakkuLord) {
    explanationTa = `⚠️ முடக்கு அதிபதி தோஷம் (திருமணம் தவிர்க்கவும்)! பெண் (${bMudakku.mudakkuLordTa}) மற்றும் ஆண் (${gMudakku.mudakkuLordTa}) இருவருக்கும் ஒரே முடக்கு அதிபதி வருகிறது (எ.கா: ஆண் குரு, பெண் குரு). நாடிச் சுவடி சாஸ்திரப்படி இருவருக்கும் ஒரே முடக்கு அதிபதி அமைந்தால் திருமணம் தவிர்க்கப்பட வேண்டும்.`;
    explanationEn = `⚠️ Same Mudakku Lord Conflict (Avoid Marriage)! Both Bride and Groom share ${bMudakku.mudakkuLordEn} as Mudakku Adhipathi (e.g. Boy Guru & Girl Guru). Traditional Nadi manuscripts strictly advise avoiding marriage.`;
  } else if (is9th10thMudakkuConflict) {
    explanationTa = `⚠️ முடக்கு பாவ தோஷம்! பெண்ணிற்கு 9-ம் இடம் (${bMudakku.mudakkuRasiNameTa}) அல்லது ஆணிற்கு 10-ம் இடம் (${gMudakku.mudakkuRasiNameTa}) முடக்கு அமைப்பில் உள்ளது. சுவடி சாஸ்திரப்படி சேர்க்கக் கூடாது.`;
    explanationEn = `⚠️ 9th/10th House Mudakku obstacle detected. Traditional manuscripts advise avoiding marriage.`;
  } else {
    explanationTa = `✅ முடக்கு அதிபதி பொருத்தம் உத்தமம். பெண் முடக்கு அதிபதி: ${bMudakku.mudakkuLordTa} (${bMudakku.mudakkuRasiNameTa}), ஆண் முடக்கு அதிபதி: ${gMudakku.mudakkuLordTa} (${gMudakku.mudakkuRasiNameTa}). ஆண் ராசி/லக்கினத்தில் பெண் முடக்கு அதிபதி அமையவில்லை. சுபமான அமைப்பாகும்.`;
    explanationEn = `✅ Safe Mudakku Adhipathi alignment. Bride Mudakku Lord: ${bMudakku.mudakkuLordEn} (${bMudakku.mudakkuRasiNameEn}), Groom Mudakku Lord: ${gMudakku.mudakkuLordEn} (${gMudakku.mudakkuRasiNameEn}). No Mudakku placement in Groom Rasi/Lagna.`;
  }

  return {
    brideMudakku: bMudakku,
    groomMudakku: gMudakku,
    isSameMudakkuLord,
    is9th10thMudakkuConflict,
    girlMudakkuInBoyCheck,
    hasMudakkuConflict,
    explanationTa,
    explanationEn
  };
}

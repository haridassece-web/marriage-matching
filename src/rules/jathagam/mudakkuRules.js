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

  const hasMudakkuConflict = isSameMudakkuLord || is9th10thMudakkuConflict;

  let explanationTa = '';
  let explanationEn = '';

  if (isSameMudakkuLord) {
    explanationTa = `⚠️ முடக்கு அதிபதி தோஷம் (திருமணம் தவிர்க்கவும்)! பெண் (${bMudakku.mudakkuLordTa}) மற்றும் ஆண் (${gMudakku.mudakkuLordTa}) இருவருக்கும் ஒரே முடக்கு அதிபதி வருகிறது (எ.கா: ஆண் குரு, பெண் குரு). நாடிச் சுவடி சாஸ்திரப்படி இருவருக்கும் ஒரே முடக்கு அதிபதி அமைந்தால் திருமணம் தவிர்க்கப்பட வேண்டும்.`;
    explanationEn = `⚠️ Same Mudakku Lord Conflict (Avoid Marriage)! Both Bride and Groom share ${bMudakku.mudakkuLordEn} as Mudakku Adhipathi (e.g. Boy Guru & Girl Guru). Traditional Nadi manuscripts strictly advise avoiding marriage.`;
  } else if (is9th10thMudakkuConflict) {
    explanationTa = `⚠️ முடக்கு பாவ தோஷம்! பெண்ணிற்கு 9-ம் இடம் (${bMudakku.mudakkuRasiNameTa}) அல்லது ஆணிற்கு 10-ம் இடம் (${gMudakku.mudakkuRasiNameTa}) முடக்கு அமைப்பில் உள்ளது. சுவடி சாஸ்திரப்படி சேர்க்கக் கூடாது.`;
    explanationEn = `⚠️ 9th/10th House Mudakku obstacle detected. Traditional manuscripts advise avoiding marriage.`;
  } else {
    explanationTa = `✅ முடக்கு அதிபதி பொருத்தம் உத்தமம். பெண் முடக்கு அதிபதி: ${bMudakku.mudakkuLordTa} (${bMudakku.mudakkuRasiNameTa}), ஆண் முடக்கு அதிபதி: ${gMudakku.mudakkuLordTa} (${gMudakku.mudakkuRasiNameTa}). இருவருக்கும் வெவ்வேறு முடக்கு அதிபதிகள் வந்துள்ளதால் சுபமான அமைப்பாகும்.`;
    explanationEn = `✅ Safe Mudakku Adhipathi alignment. Bride Mudakku Lord: ${bMudakku.mudakkuLordEn} (${bMudakku.mudakkuRasiNameEn}), Groom Mudakku Lord: ${gMudakku.mudakkuLordEn} (${gMudakku.mudakkuRasiNameEn}). Different Mudakku Lords (Auspicious).`;
  }

  return {
    brideMudakku: bMudakku,
    groomMudakku: gMudakku,
    isSameMudakkuLord,
    is9th10thMudakkuConflict,
    hasMudakkuConflict,
    explanationTa,
    explanationEn
  };
}

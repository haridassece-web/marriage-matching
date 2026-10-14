// திருமண பொருத்தத்தின் சாராம்ச விதிகள் (Essence Rules of Marriage Matching Engine)
// Based on authentic handwritten Tamil astrological manuscript principles

import { getRasiById } from '../../data/rasis';
import { getNakshatraById } from '../../data/nakshatras';
import { calculateCompleteDhasaTimeline } from '../../engine/jathagam/dhasaBukthiEngine';

/**
 * Helper to check if a Rasi ID is an Odd Sign (ஒற்றை ராசி)
 * Odd signs (1, 3, 5, 7, 9, 11): Mesham, Mithunam, Simham, Thulam, Dhanusu, Kumbam
 * These represent masculine (Purusha), fiery/airy, assertive energies.
 */
export function isOddSign(rasiId) {
  return [1, 3, 5, 7, 9, 11].includes(Number(rasiId));
}

/**
 * Helper to check if a Rasi ID is an Ubhaya Sign (உபய ராசி / Dual Sign)
 * Ubhaya signs (3, 6, 9, 12): Mithunam, Kanni, Dhanusu, Meenam
 * For Ubhaya Lagnas, the 7th house IS the Badhaka Sthana!
 */
export function isUbhayaSign(rasiId) {
  return [3, 6, 9, 12].includes(Number(rasiId));
}

/**
 * Returns Badhaka Rasi ID for a given Lagna
 * - Chara (1, 4, 7, 10): 11th house is Badhaka
 * - Sthira (2, 5, 8, 11): 9th house is Badhaka
 * - Ubhaya / Dual (3, 6, 9, 12): 7th house is Badhaka
 */
export function getBadhakaRasiId(lagnaRasiId) {
  const lagna = Number(lagnaRasiId);
  const charaLagnas = [1, 4, 7, 10];
  const sthiraLagnas = [2, 5, 8, 11];

  if (charaLagnas.includes(lagna)) {
    let badhaka = lagna + 10;
    if (badhaka > 12) badhaka -= 12;
    return badhaka;
  } else if (sthiraLagnas.includes(lagna)) {
    let badhaka = lagna + 8;
    if (badhaka > 12) badhaka -= 12;
    return badhaka;
  } else {
    // Ubhaya signs (3, 6, 9, 12): 7th house is Badhaka
    let badhaka = lagna + 6;
    if (badhaka > 12) badhaka -= 12;
    return badhaka;
  }
}

/**
 * Helper to get nth house from a given Lagna
 */
export function getHouseRasiId(baseRasiId, houseNumber) {
  let rasi = (Number(baseRasiId) + (houseNumber - 1));
  while (rasi > 12) rasi -= 12;
  while (rasi < 1) rasi += 12;
  return rasi;
}

/**
 * Calculates currently running Dasa and Bhukti for a person
 */
export function getPersonCurrentDasaBhukti(person) {
  const dob = person.dob || '1998-05-15';
  const tob = person.tob || '07:30';
  const nakshatraId = person.nakshatraId || 1;
  const starProgress = person.starProgress ?? null;

  const timeline = calculateCompleteDhasaTimeline(dob, tob, nakshatraId, starProgress);
  const activeDasa = timeline?.activeSummary?.dasa;
  const activeBhukti = timeline?.activeSummary?.bhukti;

  // Find index of current dasa in sequence of 9 dasas (0-indexed -> 1st to 9th Dasa)
  const dasaIndex = timeline?.dasas?.findIndex(d => d.id === activeDasa?.id);
  const dasaNumberFromBirth = dasaIndex >= 0 ? dasaIndex + 1 : 1;

  return {
    dasaId: activeDasa?.id || 'UNKNOWN',
    dasaLordTa: activeDasa?.lordTa || 'அறியப்படவில்லை',
    dasaLordEn: activeDasa?.lordEn || 'Unknown',
    dasaNumberFromBirth, // 1 to 9 (1=Janma, 2=Sampat, 3=Vipat, 4=Kshema, 5=Pratyak, 6=Sadhana, 7=Naidhana/Vadha, etc.)
    bhuktiId: activeBhukti?.id || 'UNKNOWN',
    bhuktiLordTa: activeBhukti?.lordTa || '',
    bhuktiLordEn: activeBhukti?.lordEn || '',
    dasaFormattedStart: activeDasa?.formattedStart,
    dasaFormattedEnd: activeDasa?.formattedEnd,
    timeline
  };
}

/**
 * RULE 1:
 * "1) சம சப்தம லக்னம் ஆகாது. லக்னத்திற்கு உயிர் லக்னமாகிய பாவகமும் கெடுக்காமல் இருக்க வேண்டும்."
 * - Sama Saptama Lagna (1-7 axis between Bride Lagna and Groom Lagna) is prohibited / not auspicious.
 * - Lagna is the Uyir (Soul/Life Force). The Bride's Lagna functions as the family's "Uyir Lagna".
 * - The Bhava acting as Uyir Lagna must not be afflicted or spoiled.
 */
export function evaluateRule1_SamaSaptamaLagna(bride, groom) {
  const bLagna = Number(bride.lagnaRasiId || bride.rasiId || 1);
  const gLagna = Number(groom.lagnaRasiId || groom.rasiId || 1);

  const bLagnaInfo = getRasiById(bLagna);
  const gLagnaInfo = getRasiById(gLagna);

  // House count from Bride Lagna to Groom Lagna
  let lagnaCount = gLagna - bLagna + 1;
  if (lagnaCount <= 0) lagnaCount += 12;

  // 1-7 axis check: lagnaCount === 7 (Sama Saptama Lagna)
  const isSamaSaptama = lagnaCount === 7;

  // Uyir Lagna Bhava Affliction Check:
  // Bride's Lagna is the "Uyir Lagna".
  // Check if Groom's Badhaka Rasi falls on Bride's Lagna or Bride's 8th house (Uyir Sthana)
  const gBadhakaRasiId = getBadhakaRasiId(gLagna);
  const b8thHouse = getHouseRasiId(bLagna, 8);
  const isGroomBadhakaInUyirLagna = gBadhakaRasiId === bLagna;
  const isGroomBadhakaInUyirSthana = gBadhakaRasiId === b8thHouse;

  const isUyirBhavaAfflicted = isGroomBadhakaInUyirLagna || isGroomBadhakaInUyirSthana;

  let status = 'PASS';
  let statusTextTa = '✅ சுபம் (லக்ன இணக்கம் உத்தமம்)';
  let statusTextEn = '✅ Auspicious Lagna Compatibility';

  if (isSamaSaptama) {
    status = 'WARN';
    statusTextTa = '⚠️ சம சப்தம லக்னம் ஆகாது';
    statusTextEn = '⚠️ Sama Saptama (1-7) Lagna Warning';
  } else if (isUyirBhavaAfflicted) {
    status = 'WARN';
    statusTextTa = '⚠️ உயிர் லக்ன பாவக பாதிப்பு';
    statusTextEn = '⚠️ Uyir Lagna Bhava Affliction';
  }

  let explanationTa = '';
  let explanationEn = '';

  if (isSamaSaptama) {
    explanationTa = `⚠️ சம சப்தம லக்ன எச்சரிக்கை! பெண்ணின் லக்னம் (${bLagnaInfo.nameTa}) மற்றும் ஆணின் லக்னம் (${gLagnaInfo.nameTa}) ஒன்றுக்கொன்று 7-ம் பாவகமாக (சம சப்தமமாக) நேருக்கு நேர் உள்ளன. சுவடி விதிப்படி "சம சப்தம லக்னம் ஆகாது" - இருவருக்கும் தன்முனைப்பு (Ego), பரஸ்பர பிடிவாதம் மற்றும் மாங்கல்ய பாவகத்தில் அழுத்தங்கள் வர வாய்ப்புண்டு.`;
    explanationEn = `⚠️ Sama Saptama Lagna Warning! Bride Lagna (${bLagnaInfo.nameEn}) and Groom Lagna (${gLagnaInfo.nameEn}) are situated in exact 1-7 opposition. Manuscript states "Sama Saptama Lagna is not good" as direct head-on energy creates ego friction and strain.`;
  } else if (isUyirBhavaAfflicted) {
    explanationTa = `⚠️ உயிர் லக்ன எச்சரிக்கை! ஆணின் பாதக ராசி (${getRasiById(gBadhakaRasiId).nameTa}) பெண்ணின் உயிர் லக்னத்திலோ அல்லது 8-ம் பாவகமான உயிர்ஸ்தானத்திலோ விழுகிறது. பெண் லக்னமாகிய உயிர் பாவகத்தை கெடுக்காமல் பாதுகாப்பது அவசியம்.`;
    explanationEn = `⚠️ Uyir Lagna Affliction Alert! Groom's Badhaka sign (${getRasiById(gBadhakaRasiId).nameEn}) falls directly on Bride's Lagna or 8th house (Uyir Sthana). Manuscript dictates that the Bhava acting as Uyir Lagna must remain unafflicted.`;
  } else {
    explanationTa = `✅ லக்ன அமைப்பு சுபம்! தம்பதியரின் லக்னங்கள் சம சப்தம அமைப்பில் (1-7) அமையாமல் சுபமான அமைப்பில் உள்ளன (${lagnaCount}-ம் இடம்). உயிர் லக்னமாகிய பெண்ணின் லக்ன பாவகமும் கெடாமல் பாதுகாக்கப்பட்டுள்ளது.`;
    explanationEn = `✅ Auspicious Lagna Alignment! Bride and Groom Lagnas avoid the 1-7 Sama Saptama opposition (${lagnaCount}th house axis). Uyir Lagna Bhava remains well-protected without Badhaka affliction.`;
  }

  return {
    ruleNumber: 1,
    titleTa: '1. சம சப்தம லக்னம் ஆய்வு & உயிர் லக்ன பாவக சுத்தி',
    titleEn: '1. Sama Saptama Lagna & Uyir Lagna Bhava Protection',
    manuscriptQuoteTa: '1) சம சப்தம லக்னம் ஆகாது. லக்னத்திற்கு உயிர் லக்னமாகிய பாவகமும் கெடுக்காமல் இருக்க வேண்டும்.',
    isSamaSaptama,
    lagnaCount,
    bLagnaNameTa: bLagnaInfo.nameTa,
    gLagnaNameTa: gLagnaInfo.nameTa,
    bLagnaNameEn: bLagnaInfo.nameEn,
    gLagnaNameEn: gLagnaInfo.nameEn,
    isUyirBhavaAfflicted,
    status,
    statusTextTa,
    statusTextEn,
    explanationTa,
    explanationEn,
    remedyTa: isSamaSaptama || isUyirBhavaAfflicted
      ? 'திருமணத்திற்கு முன் குலதெய்வ வழிபாடு மற்றும் லக்னாதிபதிக்குரிய அர்ச்சனை செய்து சுப முகூர்த்தம் அமைத்து தாலி கட்டவும்.'
      : 'சிறப்பு பரிகாரம் தேவையில்லை.'
  };
}

/**
 * RULE 2:
 * "2) ஒற்றை ராசி, ஒற்றை லக்னம் கூடாது. பிரச்சினை இரண்டு பேருக்கும் ஒரே மாதிரி இருக்கும். இரண்டு பேருக்கும் - திசா புத்தி வேறு மாதிரி இருந்தால் எடுக்கலாம்."
 * - ஒரே ராசி மற்றும் ஒரே லக்னம் will be not match (பொருந்தாது).
 * - ஒரே ராசி மற்றும் ஒரே லக்னம் அமைந்தால், இருவருக்கும் ஒரே மாதிரியான பிரச்சனைகளும் எழும்.
 * - விலக்கு நிவர்த்தி: இருவருக்கும் தற்போது நடைபெறும் திசா புத்தி வேறு மாதிரி இருந்தால் இப்பொருத்தம் சுபமாக ஏற்றுக்கொள்ளப்படும்!
 */
export function evaluateRule2_OttraiRasiOttraiLagna(bride, groom) {
  const bLagna = Number(bride.lagnaRasiId || bride.rasiId || 1);
  const gLagna = Number(groom.lagnaRasiId || groom.rasiId || 1);
  const bRasi = Number(bride.rasiId || 1);
  const gRasi = Number(groom.rasiId || 1);

  const bLagnaInfo = getRasiById(bLagna);
  const gLagnaInfo = getRasiById(gLagna);
  const bRasiInfo = getRasiById(bRasi);
  const gRasiInfo = getRasiById(gRasi);

  const isSameRasi = bRasi === gRasi;
  const isSameLagna = bLagna === gLagna;
  const isSameRasiAndLagna = isSameRasi && isSameLagna;

  const isBrideOddRasi = isOddSign(bRasi);
  const isBrideOddLagna = isOddSign(bLagna);
  const isGroomOddRasi = isOddSign(gRasi);
  const isGroomOddLagna = isOddSign(gLagna);

  const isBrideBothOdd = isBrideOddRasi && isBrideOddLagna;
  const isGroomBothOdd = isGroomOddRasi && isGroomOddLagna;
  const isBothOddSigns = isBrideBothOdd && isGroomBothOdd;

  const hasSignConflict = isSameRasiAndLagna || isSameRasi || isSameLagna || isBothOddSigns;

  // Get current running Dasa and Bhukti for both
  const bDasaBhukti = getPersonCurrentDasaBhukti(bride);
  const gDasaBhukti = getPersonCurrentDasaBhukti(groom);

  const isSameDasa = bDasaBhukti.dasaId === gDasaBhukti.dasaId;
  const isSameBhukti = bDasaBhukti.bhuktiId === gDasaBhukti.bhuktiId;

  // Nivarthi condition: "இருவருக்கும் தற்போது நடைபெறும் திசா புத்தி வேறு மாதிரி இருந்தால் இப்பொருத்தம் சுபமாக ஏற்றுக்கொள்ளப்படும்!"
  const isDasaBhuktiDifferent = (!isSameDasa) || (!isSameBhukti);

  let status = 'PASS';
  let statusTextTa = '✅ சுபம் (ராசி / லக்ன சமநிலை)';
  let statusTextEn = '✅ Auspicious Signs Alignment';

  let explanationTa = '';
  let explanationEn = '';

  if (isSameRasiAndLagna) {
    if (isDasaBhuktiDifferent) {
      status = 'MITIGATED';
      statusTextTa = '✅ திசா புத்தி நிவர்த்தி - சுபமாக ஏற்றுக்கொள்ளப்படும்';
      statusTextEn = '✅ Dasa-Bhukti Nivarthi - Auspiciously Accepted';
      explanationTa = `✅ விலக்கு நிவர்த்தி: இருவருக்கும் ஒரே ராசி (${bRasiInfo.nameTa}) மற்றும் ஒரே லக்னம் (${bLagnaInfo.nameTa}) அமைந்திருந்தாலும், இருவருக்கும் தற்போது நடைபெறும் திசா புத்தி வேறு மாதிரி இருப்பதால் (பெண்ணிற்கு: ${bDasaBhukti.dasaLordTa} தசை / ${bDasaBhukti.bhuktiLordTa} புத்தி; ஆணிற்கு: ${gDasaBhukti.dasaLordTa} தசை / ${gDasaBhukti.bhuktiLordTa} புத்தி), சுவடி விதிப்படி இப்பொருத்தம் சுபமாக ஏற்றுக்கொள்ளப்படும்!`;
      explanationEn = `✅ Nivarthi Exception: Although both share identical Rasi (${bRasiInfo.nameEn}) and identical Lagna (${bLagnaInfo.nameEn}), since their currently running Dasa-Bhuktis are different (Bride: ${bDasaBhukti.dasaLordEn} Dasa / ${bDasaBhukti.bhuktiLordEn} Bhukti; Groom: ${gDasaBhukti.dasaLordEn} Dasa / ${gDasaBhukti.bhuktiLordEn} Bhukti), this match is auspiciously accepted!`;
    } else {
      status = 'CRITICAL';
      statusTextTa = '🛑 பொருந்தாது (NOT MATCH - ஒரே ராசி & ஒரே லக்னம்)';
      statusTextEn = '🛑 NOT MATCH - Same Rasi & Same Lagna';
      explanationTa = `🛑 பொருந்தாது (NOT MATCH)! இருவருக்கும் ஒரே ராசி (${bRasiInfo.nameTa}) மற்றும் ஒரே லக்னம் (${bLagnaInfo.nameTa}) அமைந்து, தற்போது நடைபெறும் திசா புத்தியும் ஒன்றாக உள்ளது (${bDasaBhukti.dasaLordTa} தசை / ${bDasaBhukti.bhuktiLordTa} புத்தி). சுவடி விதியின்படி "ஒரே ராசி மற்றும் ஒரே லக்னம் அமைந்தால், இருவருக்கும் ஒரே மாதிரியான பிரச்சனைகளும் எழும்" - இருவருக்கும் ஒரே நேரத்தில் கிரக அழுத்தங்கள் தீவிரமடையும் என்பதால் இப்பொருத்தம் பொருந்தாது (NOT MATCH)!`;
      explanationEn = `🛑 NOT MATCH! Both share the exact same Rasi (${bRasiInfo.nameEn}) and same Lagna (${bLagnaInfo.nameEn}) along with identical running Dasa-Bhukti (${bDasaBhukti.dasaLordEn} Dasa / ${bDasaBhukti.bhuktiLordEn} Bhukti). Per manuscript rules, identical problems manifest concurrently without complementary balance. This match will NOT MATCH.`;
    }
  } else if (isSameRasi || isSameLagna || isBothOddSigns) {
    const conflictNameTa = isSameRasi ? 'ஒரே ராசி' : isSameLagna ? 'ஒரே லக்னம்' : 'ஒற்றை ராசி மற்றும் ஒற்றை லக்னம்';
    const conflictNameEn = isSameRasi ? 'Same Rasi' : isSameLagna ? 'Same Lagna' : 'Odd Signs';

    if (isDasaBhuktiDifferent) {
      status = 'MITIGATED';
      statusTextTa = '✅ திசா புத்தி நிவர்த்தி - ஏற்றுக்கொள்ளப்படும்';
      statusTextEn = '✅ Dasa-Bhukti Nivarthi - Permitted';
      explanationTa = `✅ விலக்கு நிவர்த்தி: இருவருக்கும் ${conflictNameTa} அமைந்திருந்தாலும், தற்போது நடைபெறும் திசா புத்தி வேறு மாதிரி இருப்பதால் (பெண்ணிற்கு: ${bDasaBhukti.dasaLordTa} தசை; ஆணிற்கு: ${gDasaBhukti.dasaLordTa} தசை), சுவடி விதியின்படி இப்பொருத்தம் சுபமாக ஏற்றுக்கொள்ளப்படும்!`;
      explanationEn = `✅ Nivarthi Exception: Although both share ${conflictNameEn}, their running Dasa periods are different, so this match is accepted!`;
    } else {
      status = 'WARN';
      statusTextTa = `⚠️ ${conflictNameTa} & ஒரே திசா புத்தி எச்சரிக்கை`;
      statusTextEn = `⚠️ ${conflictNameEn} & Shared Dasa Warning`;
      explanationTa = `⚠️ எச்சரிக்கை! இருவருக்கும் ${conflictNameTa} அமைந்ததோடு, தற்போது நடைபெறும் திசா புத்தியும் ஒன்றாக உள்ளது (${bDasaBhukti.dasaLordTa} தசை). சுவடி விதியின்படி பிரச்சனைகள் எழும் போது இருவருக்கும் ஒரே மாதிரியான அழுத்தங்கள் வர வாய்ப்புண்டு.`;
      explanationEn = `⚠️ Warning! Both share ${conflictNameEn} and are running the identical Dasa period (${bDasaBhukti.dasaLordEn}). Both will face synchronized pressures during adverse periods.`;
    }
  } else {
    explanationTa = `✅ ராசி மற்றும் லக்ன சமநிலை உத்தமம்! ஆண் மற்றும் பெண் ஜாதகங்களில் ஒரே ராசி, ஒரே லக்ன பாதிப்புகள் இன்றி சுபமான சமநிலை அமைந்துள்ளது.`;
    explanationEn = `✅ Auspicious Sign Balance! Neither same Rasi nor same Lagna conflicts exist, offering harmonious complementarity.`;
  }

  return {
    ruleNumber: 2,
    titleTa: '2. ஒரே ராசி / ஒரே லக்ன ஆய்வு & தசா புக்தி நிவர்த்தி',
    titleEn: '2. Same Rasi / Same Lagna & Dasa Bhukti Mitigation Rule',
    manuscriptQuoteTa: '2) ஒற்றை ராசி, ஒற்றை லக்னம் கூடாது. பிரச்சினை இரண்டு பேருக்கும் ஒரே மாதிரி இருக்கும். இரண்டு பேருக்கும் - திசா புத்தி வேறு மாதிரி இருந்தால் எடுக்கலாம்.',
    isSameRasi,
    isSameLagna,
    isSameRasiAndLagna,
    isBothOddSigns,
    hasSignConflict,
    isDasaBhuktiDifferent,
    bRasiNameTa: bRasiInfo.nameTa,
    gRasiNameTa: gRasiInfo.nameTa,
    bLagnaNameTa: bLagnaInfo.nameTa,
    gLagnaNameTa: gLagnaInfo.nameTa,
    brideDasaLordTa: bDasaBhukti.dasaLordTa,
    groomDasaLordTa: gDasaBhukti.dasaLordTa,
    brideBhuktiLordTa: bDasaBhukti.bhuktiLordTa,
    groomBhuktiLordTa: gDasaBhukti.bhuktiLordTa,
    status,
    statusTextTa,
    statusTextEn,
    explanationTa,
    explanationEn,
    remedyTa: status === 'CRITICAL'
      ? 'ஒரே ராசி மற்றும் ஒரே லக்னம் அமைந்த ஜாதகங்களை இணைப்பதை தவிர்ப்பது உத்தமம் (NOT MATCH). மீறி செய்ய நேரிட்டால், தசாநாதர் பரிகாரங்கள் மற்றும் நவகிரக சாந்தி ஹோமங்கள் கட்டாயம் செய்யப்பட வேண்டும்.'
      : status === 'WARN'
      ? 'திங்கட்கிழமை சிவபெருமானுக்கு பால் அபிஷேகம் செய்து, தம்பதியர் பரஸ்பரம் நிதானத்துடன் செயல்பட சங்கல்பம் செய்யவும்.'
      : 'சிறப்பு பரிகாரம் தேவையில்லை.'
  };
}

/**
 * RULE 3:
 * "இரண்டு பேருக்கும் ஒரே திசை, 3, 5, 7 வது திசை வரக்கூடாது.
 * (உ.தா) பெண் கடகம், ஆண் விருச்சிகம் இது ஆகாது. ஆண் கடகம், பெண் விருச்சிகம் ஆகாது."
 * - Prohibits running the SAME Mahadasa concurrently (ஒரே திசை).
 * - Prohibits running 3rd (Vipat), 5th (Pratyak), or 7th (Naidhana/Vadha) Dasa concurrently.
 * - Classical Manuscript Example: Kadagam (Cancer) & Viruchigam (Scorpio) both share identical
 *   succession of star lords: Guru (Jupiter) -> Sani (Saturn) -> Budhan (Mercury).
 *   Marrying Kadagam with Viruchigam guarantees simultaneous identical/dangerous 3rd, 5th, 7th dasas!
 */
export function evaluateRule3_OreThisaiAnd357Thisai(bride, groom) {
  const bRasi = Number(bride.rasiId || 1);
  const gRasi = Number(groom.rasiId || 1);

  const bDasaBhukti = getPersonCurrentDasaBhukti(bride);
  const gDasaBhukti = getPersonCurrentDasaBhukti(groom);

  // 1. Same running Dasa check (ஒரே திசை)
  const isSameDasaActive = bDasaBhukti.dasaId === gDasaBhukti.dasaId;

  // 2. 3, 5, 7-வது திசை check (Vipat, Pratyak, Naidhana)
  const DASA_357_NUMBERS = [3, 5, 7];
  const isBrideIn357Dasa = DASA_357_NUMBERS.includes(bDasaBhukti.dasaNumberFromBirth);
  const isGroomIn357Dasa = DASA_357_NUMBERS.includes(gDasaBhukti.dasaNumberFromBirth);
  const isBothIn357Dasa = isBrideIn357Dasa && isGroomIn357Dasa;

  // 3. Manuscript classic example check: Kadagam (4) & Viruchigam (8)
  // Punarvasu 4/Pushya/Aslesha vs Vishakha 4/Anuradha/Jyeshtha -> Shared Guru, Sani, Budhan lords
  const isKadagamViruchigamPair =
    (bRasi === 4 && gRasi === 8) ||
    (bRasi === 8 && gRasi === 4);

  let status = 'PASS';
  let statusTextTa = '✅ சுபம் (திசா சமநிலை உத்தமம்)';
  let statusTextEn = '✅ Auspicious Dasa Alignment';

  if (isKadagamViruchigamPair) {
    status = 'CRITICAL';
    statusTextTa = '🛑 சுவடி எச்சரிக்கை: கடகம் - விருச்சிக சேர்க்கை ஆகாது';
    statusTextEn = '🛑 Manuscript Alert: Cancer - Scorpio Avoidance';
  } else if (isSameDasaActive && (isBrideIn357Dasa || isGroomIn357Dasa)) {
    status = 'CRITICAL';
    statusTextTa = '🛑 ஒரே திசை & 3/5/7-வது திசை ஆபத்து';
    statusTextEn = '🛑 Concurrent Same Dasa & 3/5/7 Danger';
  } else if (isBothIn357Dasa) {
    status = 'WARN';
    statusTextTa = '⚠️ இருவருக்கும் 3, 5, 7-வது விபத்து/பிரத்யக்/வதை திசை';
    statusTextEn = '⚠️ Both in 3rd/5th/7th Affliction Dasa';
  } else if (isSameDasaActive) {
    status = 'WARN';
    statusTextTa = '⚠️ இருவருக்கும் ஒரே திசை நடக்கிறது (ஏக திசை)';
    statusTextEn = '⚠️ Shared Same Dasa Period (Eka Dasa)';
  }

  let explanationTa = '';
  let explanationEn = '';

  if (isKadagamViruchigamPair) {
    explanationTa = `🛑 சுவடியின் நேரடி உதாரண எச்சரிக்கை: "(உ.தா) பெண் கடகம், ஆண் விருச்சிகம் இது ஆகாது. ஆண் கடகம், பெண் விருச்சிகம் ஆகாது." கடகம் மற்றும் விருச்சிகம் இரண்டு ராசிகளின் நட்சத்திர அதிபதிகளும் ஒரே வரிசையில் குரு, சனி, புதன் என வருவதால், தம்பதியர் இருவருக்கும் ஒரே நேரத்தில் ஒரே திசைகளும், 3, 5, 7-வது விபத்து/பிரத்யக்/வதை திசைகளும் ஒரே வயதில் வந்து பெரும் பாதிப்பை ஏற்படுத்தும்!`;
    explanationEn = `🛑 Manuscript Classic Example Warning: "(e.g.) Bride Cancer, Groom Scorpio is forbidden. Groom Cancer, Bride Scorpio is forbidden." Both Cancer and Scorpio share the identical sequence of star lords (Jupiter -> Saturn -> Mercury), causing identical synchronized 3rd, 5th, and 7th crisis dasas at the exact same life stages!`;
  } else if (isSameDasaActive && (isBrideIn357Dasa || isGroomIn357Dasa)) {
    explanationTa = `🛑 சுவடி திசா விதி எச்சரிக்கை! தம்பதியர் இருவருக்கும் ஒரே திசை (${bDasaBhukti.dasaLordTa} தசை) நடப்பதோடு, அது ஜாதகரின் 3-வது (விபத்து), 5-வது (பிரத்யக்) அல்லது 7-வது (வதை) திசையாக வருகிறது. ஒரே நேரத்தில் இருவருக்கும் மாரக/கண்ட அழுத்தங்கள் வரக்கூடும்.`;
    explanationEn = `🛑 Critical Dasa Alert! Both run the identical Dasa (${bDasaBhukti.dasaLordEn}), and it is currently the 3rd (Vipat), 5th (Pratyak), or 7th (Naidhana/Vadha) Dasa from birth, concentrating affliction simultaneously.`;
  } else if (isBothIn357Dasa) {
    explanationTa = `⚠️ 3, 5, 7-வது திசை எச்சரிக்கை! பெண் ஜாதகத்தில் ${bDasaBhukti.dasaNumberFromBirth}-வது திசையும் (${bDasaBhukti.dasaLordTa}), ஆண் ஜாதகத்தில் ${gDasaBhukti.dasaNumberFromBirth}-வது திசையும் (${gDasaBhukti.dasaLordTa}) நடக்கின்றன. இருவருக்கும் ஒரே நேரத்தில் சோதனை தரும் 3/5/7-வது திசைகள் அமைவதால் வாழ்க்கையில் சவால்கள் அதிகரிக்கலாம்.`;
    explanationEn = `⚠️ 3rd/5th/7th Dasa Alert! Bride is running her ${bDasaBhukti.dasaNumberFromBirth}th Dasa (${bDasaBhukti.dasaLordEn}) and Groom is running his ${gDasaBhukti.dasaNumberFromBirth}th Dasa (${gDasaBhukti.dasaLordEn}). Running concurrent transition dasas simultaneously requires protective pariharams.`;
  } else if (isSameDasaActive) {
    explanationTa = `⚠️ ஒரே திசை எச்சரிக்கை! இருவருக்கும் ஒரே மகாதசை (${bDasaBhukti.dasaLordTa} தசை) தற்போது நடைபெறுகிறது. சுவடி சாஸ்திரப்படி ஒரே திசை நடக்கும் போது குடும்பத்தில் ஏற்றத்தாழ்வுகள் சமநிலை பெறாமல் போகலாம். புத்தி நிலைகள் வேறுபட்டு இருப்பது ஆறுதல்.`;
    explanationEn = `⚠️ Shared Dasa Caution! Both are currently undergoing the identical Mahadasa (${bDasaBhukti.dasaLordEn}). Under palm-leaf rules, identical dasa periods may lack complementary stabilizing influences.`;
  } else {
    explanationTa = `✅ தசா அமைப்பு மிக உத்தமம்! இருவருக்கும் வேறுபட்ட சுப தசைகள் நடக்கின்றன (பெண்ணிற்கு: ${bDasaBhukti.dasaLordTa} - ${bDasaBhukti.dasaNumberFromBirth}-வது திசை; ஆணிற்கு: ${gDasaBhukti.dasaLordTa} - ${gDasaBhukti.dasaNumberFromBirth}-வது திசை). ஒரே திசை அல்லது ஆபத்தான 3, 5, 7-வது திசா சேர்க்கை இல்லை.`;
    explanationEn = `✅ Auspicious Dasa Progression! Bride is running ${bDasaBhukti.dasaLordEn} Dasa (#${bDasaBhukti.dasaNumberFromBirth}) and Groom is running ${gDasaBhukti.dasaLordEn} Dasa (#${gDasaBhukti.dasaNumberFromBirth}). No same-dasa or synchronized 3/5/7 afflictions detected.`;
  }

  const dasaNamesMap = {
    1: '1-வது ஜன்ம திசை (Janma)',
    2: '2-வது சம்பத்து திசை (Sampat)',
    3: '3-வது விபத்து திசை (Vipat)',
    4: '4-வது க்ஷேம திசை (Kshema)',
    5: '5-வது பிரத்யக் திசை (Pratyak)',
    6: '6-வது சாதக திசை (Sadhana)',
    7: '7-வது வதை / மாரக திசை (Naidhana)',
    8: '8-வது மித்ர திசை (Mitra)',
    9: '9-வது பரம மித்ர திசை (Parama Mitra)'
  };

  return {
    ruleNumber: 3,
    titleTa: '3. ஒரே திசை & 3, 5, 7-வது திசை விலக்கு விதி',
    titleEn: '3. Same Dasa & 3rd, 5th, 7th Dasa Avoidance Rule',
    manuscriptQuoteTa: 'இரண்டு பேருக்கும் ஒரே திசை, 3, 5, 7 வது திசை வரக்கூடாது. (உ.தா) பெண் கடகம், ஆண் விருச்சிகம் இது ஆகாது. ஆண் கடகம், பெண் விருச்சிகம் ஆகாது.',
    isSameDasaActive,
    isBrideIn357Dasa,
    isGroomIn357Dasa,
    isBothIn357Dasa,
    isKadagamViruchigamPair,
    brideDasaDescTa: `${bDasaBhukti.dasaLordTa} (${dasaNamesMap[bDasaBhukti.dasaNumberFromBirth] || ''})`,
    groomDasaDescTa: `${gDasaBhukti.dasaLordTa} (${dasaNamesMap[gDasaBhukti.dasaNumberFromBirth] || ''})`,
    brideDasaNumber: bDasaBhukti.dasaNumberFromBirth,
    groomDasaNumber: gDasaBhukti.dasaNumberFromBirth,
    status,
    statusTextTa,
    statusTextEn,
    explanationTa,
    explanationEn,
    remedyTa: status !== 'PASS'
      ? 'தசா நாதர்களுக்குரிய நவதிருப்பதிகள் / நவகிரக பரிகார ஸ்தலங்களுக்குச் சென்று சிறப்பு அர்ச்சனை மற்றும் நெய்தீபம் ஏற்றி வழிபடவும்.'
      : 'சிறப்பு பரிகாரம் தேவையில்லை.'
  };
}

/**
 * RULE 4:
 * "7-ம் அதிபதி, உயிர் லக்னத்திற்கு கொடுத்தாலும் பாதகாதிபதியாகவும் உயிர்ஸ்தானத்தை கெடுக்கக்கூடாது. பெண் லக்னம் - உயிர் லக்னமாக இருக்க வேண்டும்."
 * - In marriage matching, the Bride's Lagna is the "Uyir Lagna" (Life Vitality).
 * - Even if the 7th lord (Kalathradhipati) connects with or gives results to the Uyir Lagna,
 *   the 7th lord or spouse's Badhaka lord must NOT act as Badhakadhipati and destroy the Uyir Sthana (8th house / Lagna).
 */
export function evaluateRule4_SeventhLordBadhakaUyirSthana(bride, groom) {
  const bLagna = Number(bride.lagnaRasiId || bride.rasiId || 1);
  const gLagna = Number(groom.lagnaRasiId || groom.rasiId || 1);

  const b7thHouse = getHouseRasiId(bLagna, 7);
  const g7thHouse = getHouseRasiId(gLagna, 7);

  const b8thHouse = getHouseRasiId(bLagna, 8); // Bride's Uyir Sthana (ஆயுள் & மாங்கல்யம்)

  const b7thRasiInfo = getRasiById(b7thHouse);
  const g7thRasiInfo = getRasiById(g7thHouse);

  const bBadhakaRasiId = getBadhakaRasiId(bLagna);
  const gBadhakaRasiId = getBadhakaRasiId(gLagna);

  const bBadhakaInfo = getRasiById(bBadhakaRasiId);
  const gBadhakaInfo = getRasiById(gBadhakaRasiId);

  // Check if 7th house IS the Badhaka house (e.g. Ubhaya signs 3, 6, 9, 12)
  const isGroom7thLordBadhaka = g7thHouse === gBadhakaRasiId;
  const isBride7thLordBadhaka = b7thHouse === bBadhakaRasiId;

  // Check if Groom's Badhaka house lands directly on Bride's Lagna (Uyir Lagna) or 8th house (Uyir Sthana)
  const isGroomBadhakaAffectingUyirLagna = gBadhakaRasiId === bLagna;
  const isGroomBadhakaAffectingUyirSthana = gBadhakaRasiId === b8thHouse;

  // Check if Groom's 7th house lands on Bride's 8th house (Uyir Sthana destruction)
  const isGroom7thHouseOnBrideUyirSthana = g7thHouse === b8thHouse;

  const hasUyirSthanaAffliction =
    isGroomBadhakaAffectingUyirLagna ||
    isGroomBadhakaAffectingUyirSthana ||
    isGroom7thHouseOnBrideUyirSthana ||
    (isGroom7thLordBadhaka && isGroomBadhakaAffectingUyirLagna);

  let status = 'PASS';
  let statusTextTa = '✅ சுபம் (உயிர்ஸ்தானம் கெடவில்லை)';
  let statusTextEn = '✅ Auspicious Uyir Sthana Protection';

  let explanationTa = '';
  let explanationEn = '';

  if (hasUyirSthanaAffliction) {
    status = 'WARN';
    statusTextTa = '⚠️ 7-ம் அதிபதி / பாதகாதிபதி உயிர்ஸ்தான பாதிப்பு';
    statusTextEn = '⚠️ 7th Lord / Badhaka Affliction to Uyir Sthana';
    explanationTa = `⚠️ உயிர்ஸ்தான சுவடி விதி எச்சரிக்கை! சுவடி விதிப்படி "பெண் லக்னம் உயிர் லக்னமாக இருக்க வேண்டும். 7-ம் அதிபதி பாதகாதிபதியாகவும் உயிர்ஸ்தானத்தை கெடுக்கக்கூடாது." ஆணின் பாதக ராசி (${gBadhakaInfo.nameTa}) அல்லது 7-ம் பாவக அமைப்பு பெண்ணின் உயிர் லக்னத்தையோ அல்லது மாங்கல்ய உயிர்ஸ்தானத்தையோ (${getRasiById(b8thHouse).nameTa}) பாதிக்கிறது. களத்திர மற்றும் ஆயுள் பலத்தில் கவனம் தேவை.`;
    explanationEn = `⚠️ 7th Lord & Badhaka Uyir Sthana Alert! Manuscript states: "Bride Lagna must be treated as the Uyir Lagna. The 7th lord must not act as Badhaka and ruin the Uyir Sthana." Groom's Badhaka sign (${gBadhakaInfo.nameEn}) or 7th house aligns into the Bride's Uyir Lagna or 8th house (Uyir Sthana).`;
  } else {
    explanationTa = `✅ 7-ம் அதிபதி & உயிர்ஸ்தான சுத்தி உத்தமம்! சுவடி விதிப்படி பெண்ணின் லக்னம் உயிர் லக்னமாக முழு பாதுகாப்பில் உள்ளது. ஆணின் 7-ம் அதிபதியோ அல்லது பாதகாதிபதியோ (${gBadhakaInfo.nameTa}) பெண்ணின் உயிர் லக்னத்தையோ அல்லது 8-ம் பாவகமான உயிர்ஸ்தானத்தையோ கெடுக்காமல் சுபமாக அமைந்துள்ளன.`;
    explanationEn = `✅ Uyir Sthana Pure & Unafflicted! Bride's Lagna remains completely protected as the household Uyir Lagna. Neither the 7th lord nor the Badhaka lord afflicts the vital Uyir Sthana (8th house) of the bride.`;
  }

  return {
    ruleNumber: 4,
    titleTa: '4. 7-ம் அதிபதி & பாதகாதிபதி உயிர்ஸ்தான ஆய்வு (பெண் லக்னம் உயிர் லக்னம்)',
    titleEn: '4. 7th Lord & Badhaka Uyir Sthana Protection Rule',
    manuscriptQuoteTa: '7-ம் அதிபதி, உயிர் லக்னத்திற்கு கொடுத்தாலும் பாதகாதிபதியாகவும் உயிர்ஸ்தானத்தை கெடுக்கக்கூடாது. பெண் லக்னம் - உயிர் லக்னமாக இருக்க வேண்டும்.',
    isGroom7thLordBadhaka,
    isBride7thLordBadhaka,
    isGroomBadhakaAffectingUyirLagna,
    isGroomBadhakaAffectingUyirSthana,
    hasUyirSthanaAffliction,
    b8thHouseNameTa: getRasiById(b8thHouse).nameTa,
    bBadhakaNameTa: bBadhakaInfo.nameTa,
    gBadhakaNameTa: gBadhakaInfo.nameTa,
    status,
    statusTextTa,
    statusTextEn,
    explanationTa,
    explanationEn,
    remedyTa: hasUyirSthanaAffliction
      ? 'திருக்கடையூர் அமிர்தகடேஸ்வரர் அல்லது திருமீயச்சூர் லலிதாம்பிகை கோவிலில் ஆயுள் & மாங்கல்ய ஹோமம் செய்து வழிபடவும்.'
      : 'சிறப்பு பரிகாரம் தேவையில்லை.'
  };
}

/**
 * RULE 5:
 * "உபய லக்னத்தில் லக்னம் 7-ம் இடம் பாதக வினை கொடுக்கக்கூடாது. பெண் ஜாதகத்தில் உயிர்ஸ்தானத்தை கெடுக்கிறது போல இருக்கக் கூடாது."
 * - For Ubhaya Lagnas (Dual signs: Mithunam 3, Kanni 6, Dhanusu 9, Meenam 12), the 7th house IS the Badhaka house!
 * - Therefore, in Ubhaya Lagna, marriage (7th house) directly contains Badhaka karma.
 * - This Badhaka affliction should not inflict damage ("பாதக வினை கொடுக்கக்கூடாது") upon the Bride's Uyir Sthana (8th house / Lagna).
 */
export function evaluateRule5_UbhayaLagna7thBadhaka(bride, groom) {
  const bLagna = Number(bride.lagnaRasiId || bride.rasiId || 1);
  const gLagna = Number(groom.lagnaRasiId || groom.rasiId || 1);

  const isBrideUbhaya = isUbhayaSign(bLagna);
  const isGroomUbhaya = isUbhayaSign(gLagna);

  const b8thHouse = getHouseRasiId(bLagna, 8); // Bride's Uyir Sthana

  // For Groom Ubhaya Lagna: 7th house is Badhaka Sthana
  const g7thHouse = getHouseRasiId(gLagna, 7);
  const isGroom7thBadhakaOnBrideUyir = isGroomUbhaya && (g7thHouse === bLagna || g7thHouse === b8thHouse);

  // Both are Ubhaya Lagnas in mutual 1-7 opposition (e.g. Mithunam-Dhanusu, Kanni-Meenam)
  const isBothUbhayaOpposition = isBrideUbhaya && isGroomUbhaya && Math.abs(gLagna - bLagna) === 6;

  const hasUbhayaBadhakaConflict = isGroom7thBadhakaOnBrideUyir || isBothUbhayaOpposition;

  let status = 'PASS';
  let statusTextTa = '✅ சுபம் (உபய பாதக வினை இல்லை)';
  let statusTextEn = '✅ Auspicious Ubhaya Alignment';

  let explanationTa = '';
  let explanationEn = '';

  if (isBothUbhayaOpposition) {
    status = 'WARN';
    statusTextTa = '⚠️ இருவருக்கும் உபய லக்னம் 1-7 பாதக சேர்க்கை';
    statusTextEn = '⚠️ Mutual Ubhaya Lagna 1-7 Badhaka Conflict';
    explanationTa = `⚠️ இருவருக்கும் உபய லக்னம் - 7-ம் இடம் பாதக ஸ்தானம்! பெண்ணின் லக்னம் (${getRasiById(bLagna).nameTa}) மற்றும் ஆணின் லக்னம் (${getRasiById(gLagna).nameTa}) இரண்டுமே உபய லக்னங்களாக இருந்து நேருக்கு நேர் அமைந்துள்ளன. சுவடி விதிப்படி உபய லக்னங்களுக்கு 7-ம் இடமே பாதக ஸ்தானம் என்பதால், ஒருவருக்கொருவர் 7-ம் இடம் பாதக வினையாக மாறி உயிர்ஸ்தானத்திற்கு அழுத்தம் தரலாம்.`;
    explanationEn = `⚠️ Ubhaya Lagna 1-7 Badhaka Overlap! Both Bride (${getRasiById(bLagna).nameEn}) and Groom (${getRasiById(gLagna).nameEn}) possess Dual (Ubhaya) Lagnas situated opposite each other. In Ubhaya Lagnas, the 7th house itself is the Badhaka house, causing mutual Badhaka karma across the marital axis.`;
  } else if (isGroom7thBadhakaOnBrideUyir) {
    status = 'WARN';
    statusTextTa = '⚠️ உபய லக்ன 7-ம் இடம் பாதக வினை எச்சரிக்கை';
    statusTextEn = '⚠️ Ubhaya Lagna 7th Badhaka Karma Alert';
    explanationTa = `⚠️ உபய லக்ன பாதக வினை எச்சரிக்கை! ஆணின் உபய லக்னத்திற்கு 7-ம் இடம் பாதக ஸ்தானமாக வருகிறது (${getRasiById(g7thHouse).nameTa}). இந்த பாதக இடம் பெண்ணின் உயிர் லக்னம் அல்லது 8-ம் பாவகமான உயிர்ஸ்தானத்திற்கு அமைவதால் "பெண் ஜாதகத்தில் உயிர்ஸ்தானத்தை கெடுக்கிறது போல இருக்கக் கூடாது" என்ற சுவடி விதிப்படி நிவர்த்தி மற்றும் பரிகாரம் தேவைப்படுகிறது.`;
    explanationEn = `⚠️ Ubhaya Lagna Badhaka Karma Alert! Groom possesses an Ubhaya Lagna where the 7th house (${getRasiById(g7thHouse).nameEn}) acts as Badhaka Sthana. This sign aligns directly onto the Bride's Uyir Lagna or 8th house. Per the manuscript, this must not afflict the Bride's life vitality.`;
  } else if (isBrideUbhaya || isGroomUbhaya) {
    explanationTa = `ℹ️ உபய லக்னம் - பாதக வினை சுபமாக விலகியுள்ளது. ${isBrideUbhaya ? 'பெண்ணிற்கு' : 'ஆணிற்கு'} உபய லக்னம் அமைந்தாலும், 7-ம் இடத்து பாதக காரகம் உயிர்ஸ்தானத்தை கெடுக்காமல் பாதுகாப்பான அமைப்பில் விலகியுள்ளது.`;
    explanationEn = `ℹ️ Ubhaya Lagna Safe Alignment. Although ${isBrideUbhaya ? 'Bride' : 'Groom'} has an Ubhaya Lagna, the 7th house Badhaka agency does not afflict the partner's Uyir Sthana.`;
  } else {
    explanationTa = `✅ உபய பாதக வினை இல்லை! சர அல்லது ஸ்திர லக்ன அமைப்புகளில் இருப்பதால் 7-ம் இடம் பாதக ஸ்தானமாக அமையவில்லை. சுவடி விதியின்படி பெண்ணின் உயிர்ஸ்தானம் 100% சுபமாக பாதுகாக்கப்பட்டுள்ளது.`;
    explanationEn = `✅ No Ubhaya Badhaka Karma. Since neither belongs to conflicting Dual signs, the 7th house is not a Badhaka house. The Bride's Uyir Sthana remains 100% protected.`;
  }

  return {
    ruleNumber: 5,
    titleTa: '5. உபய லக்ன 7-ம் இடம் பாதக தோஷ ஆய்வு',
    titleEn: '5. Ubhaya Lagna 7th House Badhaka Karma Rule',
    manuscriptQuoteTa: 'உபய லக்னத்தில் லக்னம் 7-ம் இடம் பாதக வினை கொடுக்கக்கூடாது. பெண் ஜாதகத்தில் உயிர்ஸ்தானத்தை கெடுக்கிறது போல இருக்கக் கூடாது.',
    isBrideUbhaya,
    isGroomUbhaya,
    isBothUbhayaOpposition,
    hasUbhayaBadhakaConflict,
    bLagnaNameTa: getRasiById(bLagna).nameTa,
    gLagnaNameTa: getRasiById(gLagna).nameTa,
    status,
    statusTextTa,
    statusTextEn,
    explanationTa,
    explanationEn,
    remedyTa: hasUbhayaBadhakaConflict
      ? 'வியாழக்கிழமைகளில் தட்சிணாமூர்த்தி மற்றும் குரு பகவானுக்கு மஞ்சள் வஸ்திரம் சாற்றி முல்லை மலர்களால் அர்ச்சனை செய்து வழிபடவும்.'
      : 'சிறப்பு பரிகாரம் தேவையில்லை.'
  };
}

/**
 * RULE 6:
 * "பெண் ராசி & லக்னத்திற்கு 1-4 ஆக ஆண் ராசி & லக்னம் வரக்கூடாது"
 * (Girl 1-4 did not come Boy Rasi & Lagna Rule)
 * - Counting from Bride Rasi to Groom Rasi: 4th house is inauspicious (1-4 Rasi Dosha / நான்கில் வறுமை/சுகக்குறைவு).
 * - Counting from Bride Lagna to Groom Lagna: 4th house is inauspicious (1-4 Lagna Dosha / சுகஸ்தான பாதிப்பு).
 * - If both Rasi & Lagna are 1-4: Critical incompatibility (NOT MATCH).
 * - If either Rasi or Lagna is 1-4: Warning with remedies advised.
 */
export function evaluateRule6_RasiAndLagna1to4(bride, groom) {
  const bLagna = Number(bride.lagnaRasiId || bride.rasiId || 1);
  const gLagna = Number(groom.lagnaRasiId || groom.rasiId || 1);
  const bRasi = Number(bride.rasiId || 1);
  const gRasi = Number(groom.rasiId || 1);

  const bLagnaInfo = getRasiById(bLagna);
  const gLagnaInfo = getRasiById(gLagna);
  const bRasiInfo = getRasiById(bRasi);
  const gRasiInfo = getRasiById(gRasi);

  let rasiCount = gRasi - bRasi + 1;
  if (rasiCount <= 0) rasiCount += 12;

  let lagnaCount = gLagna - bLagna + 1;
  if (lagnaCount <= 0) lagnaCount += 12;

  const isRasi1to4 = rasiCount === 4;
  const isLagna1to4 = lagnaCount === 4;

  let status = 'PASS';
  let statusTextTa = '✅ சுபம் (1-4 தோஷம் இல்லை)';
  let statusTextEn = '✅ Auspicious (No 1-4 Conflict)';

  let explanationTa = '';
  let explanationEn = '';

  if (isRasi1to4 && isLagna1to4) {
    status = 'CRITICAL';
    statusTextTa = '🛑 பொருந்தாது (ராசி & லக்னம் இரண்டிலும் 1-4 தோஷம்)';
    statusTextEn = '🛑 NOT MATCH (Double 1-4 Rasi & Lagna Conflict)';
    explanationTa = `🛑 பொருந்தாது (NOT MATCH)! பெண் ராசியிலிருந்து ஆண் ராசி 4-வது ராசியாகவும் (${gRasiInfo.nameTa}), பெண் லக்னத்திலிருந்து ஆண் லக்னம் 4-வது லக்னமாகவும் (${gLagnaInfo.nameTa}) 1-4 அமைப்பில் அமைந்துள்ளன. சாஸ்திர விதிப்படி "பெண் ராசி & லக்னத்திற்கு 1-4 ஆக ஆண் ராசி & லக்னம் வரக்கூடாது" - இதனால் குடும்ப சுகம், ஆரோக்கியம் மற்றும் பொருளாதாரத்தில் பெரும் முரண்பாடுகள் உண்டாகும்.`;
    explanationEn = `🛑 NOT MATCH! Groom is 4th from Bride in both Rasi (${gRasiInfo.nameEn}) and Lagna (${gLagnaInfo.nameEn}). Traditional rule mandates that Groom's Rasi & Lagna must not be 4th from Bride's Rasi & Lagna (1-4 conflict), causing domestic discord and severe financial strain.`;
  } else if (isRasi1to4) {
    status = 'WARN';
    statusTextTa = '⚠️ பெண் ராசிக்கு 4-ல் ஆண் ராசி (1-4 ராசி தோஷம்)';
    statusTextEn = '⚠️ 1-4 Rasi Conflict (Groom 4th from Bride)';
    explanationTa = `⚠️ 1-4 ராசி எச்சரிக்கை! பெண் ராசியிலிருந்து (${bRasiInfo.nameTa}) ஆண் ராசி 4-வது ராசியாக (${gRasiInfo.nameTa}) அமைந்துள்ளது. சாஸ்திர விதிப்படி பெண் ராசிக்கு 4-ல் ஆண் ராசி வரக்கூடாது ("நான்கில் வறுமை/சுகக்குறைவு") - தம்பதியரிடையே பணப்புழக்கம் மற்றும் குடும்ப அமைதியில் கவனம் தேவை.`;
    explanationEn = `⚠️ 1-4 Rasi Warning! Groom Rasi is 4th from Bride Rasi (${gRasiInfo.nameEn} from ${bRasiInfo.nameEn}). Classical Tamil rule cautions against 4th Rasi positioning from the bride to protect against financial stress.`;
  } else if (isLagna1to4) {
    status = 'WARN';
    statusTextTa = '⚠️ பெண் லக்னத்திற்கு 4-ல் ஆண் லக்னம் (1-4 லக்ன தோஷம்)';
    statusTextEn = '⚠️ 1-4 Lagna Conflict (Groom 4th from Bride)';
    explanationTa = `⚠️ 1-4 லக்ன எச்சரிக்கை! பெண் லக்னத்திலிருந்து (${bLagnaInfo.nameTa}) ஆண் லக்னம் 4-வது லக்னமாக (${gLagnaInfo.nameTa}) அமைந்துள்ளது. சாஸ்திர விதிப்படி பெண் லக்னத்திற்கு 4-ல் ஆண் லக்னம் வரக்கூடாது - 4-ம் இடம் சுகஸ்தானம் என்பதால் இல்லற சுகம் மற்றும் மன அமைதியில் முரண்கள் வரலாம்.`;
    explanationEn = `⚠️ 1-4 Lagna Warning! Groom Lagna is 4th from Bride Lagna (${gLagnaInfo.nameEn} from ${bLagnaInfo.nameEn}). 4th house signifies domestic harmony (Sukha Sthana), so 1-4 alignment requires careful consideration.`;
  } else {
    explanationTa = `✅ ராசி & லக்ன 1-4 தோஷம் இல்லை! பெண் ராசிக்கு ஆண் ராசி ${rasiCount}-ம் இடமாகவும், பெண் லக்னத்திற்கு ஆண் லக்னம் ${lagnaCount}-ம் இடமாகவும் சுபமாக அமைந்துள்ளன. 1-4 சுகஸ்தான தோஷம் முற்றிலும் இல்லை.`;
    explanationEn = `✅ Safe Alignment! No 1-4 Rasi or Lagna placement (Rasi: ${rasiCount}th, Lagna: ${lagnaCount}th). Auspicious domestic compatibility.`;
  }

  return {
    ruleNumber: 6,
    titleTa: '6. பெண் ராசி & லக்னத்திற்கு 1-4 ஆக ஆண் ராசி & லக்னம் விலக்கு விதி',
    titleEn: '6. Girl 1-4 Boy Rasi & Lagna Avoidance Rule',
    manuscriptQuoteTa: 'பெண் ராசி & லக்னத்திற்கு 1-4 ஆக ஆண் ராசி & லக்னம் வரக்கூடாது (Girl 1-4 did not come Boy Rasi & Lagna)',
    isRasi1to4,
    isLagna1to4,
    rasiCount,
    lagnaCount,
    bRasiNameTa: bRasiInfo.nameTa,
    gRasiNameTa: gRasiInfo.nameTa,
    bLagnaNameTa: bLagnaInfo.nameTa,
    gLagnaNameTa: gLagnaInfo.nameTa,
    status,
    statusTextTa,
    statusTextEn,
    explanationTa,
    explanationEn,
    remedyTa: (isRasi1to4 || isLagna1to4)
      ? 'வெள்ளிக்கிழமைகளில் மகாலட்சுமி மற்றும் தாயாருக்கு நெய்தீபம் ஏற்றி, வீட்டில் சுக்ர வார பூஜை செய்து குடும்ப சுகத்தை நிலைநிறுத்தவும்.'
      : 'சிறப்பு பரிகாரம் தேவையில்லை.'
  };
}

/**
 * Main Evaluation Engine for all Manuscript Rules:
 * "திருமண பொருத்தத்தின் சாராம்ச விதிகள்" (Essence Rules of Marriage Matching)
 */
export function evaluateSaaraamsaVidhigal(bride, groom) {
  const rule1 = evaluateRule1_SamaSaptamaLagna(bride, groom);
  const rule2 = evaluateRule2_OttraiRasiOttraiLagna(bride, groom);
  const rule3 = evaluateRule3_OreThisaiAnd357Thisai(bride, groom);
  const rule4 = evaluateRule4_SeventhLordBadhakaUyirSthana(bride, groom);
  const rule5 = evaluateRule5_UbhayaLagna7thBadhaka(bride, groom);
  const rule6 = evaluateRule6_RasiAndLagna1to4(bride, groom);

  const rulesList = [rule1, rule2, rule3, rule4, rule5, rule6];

  // Scoring Calculation
  let points = 100;
  if (rule1.status === 'WARN') points -= 15;
  if (rule2.status === 'CRITICAL') points -= 30;
  else if (rule2.status === 'WARN') points -= 15;
  if (rule3.status === 'CRITICAL') points -= 30;
  else if (rule3.status === 'WARN') points -= 15;
  if (rule4.status === 'WARN') points -= 15;
  if (rule5.status === 'WARN') points -= 15;
  if (rule6.status === 'CRITICAL') points -= 30;
  else if (rule6.status === 'WARN') points -= 15;

  const scorePercent = Math.max(0, Math.min(100, points));

  const passedCount = rulesList.filter(r => r.status === 'PASS' || r.status === 'MITIGATED').length;
  const warningCount = rulesList.filter(r => r.status === 'WARN').length;
  const criticalCount = rulesList.filter(r => r.status === 'CRITICAL').length;

  const isAllAuspicious = criticalCount === 0 && warningCount === 0;
  const isRecommended = criticalCount === 0 && warningCount <= 1;

  let overallStatusTa = '✅ சாராம்ச விதிகள் உத்தமம் (பொருத்தம் நன்று)';
  let overallStatusEn = '✅ Essence Rules Highly Auspicious';
  let badgeColor = 'emerald';

  if (criticalCount > 0) {
    overallStatusTa = '🛑 சாராம்ச விதி விலக்கு எச்சரிக்கை (கவனம் தேவை)';
    overallStatusEn = '🛑 Essence Rule Critical Alert (Caution Advised)';
    badgeColor = 'rose';
  } else if (warningCount > 1) {
    overallStatusTa = '⚠️ சாராம்ச விதிகளில் கவனம் தேவை (பரிகாரம் அவசியம்)';
    overallStatusEn = '⚠️ Essence Rules Require Astrological Attention';
    badgeColor = 'amber';
  }

  return {
    titleTa: 'திருமண பொருத்தத்தின் 6 சாராம்ச விதிகள்',
    titleEn: '6 Essence Rules of Marriage Matching',
    scorePercent,
    passedCount,
    warningCount,
    criticalCount,
    totalRules: 6,
    isAllAuspicious,
    isRecommended,
    overallStatusTa,
    overallStatusEn,
    badgeColor,
    rule1_samaSaptama: rule1,
    rule2_ottraiRasiLagna: rule2,
    rule3_oreThisai357: rule3,
    rule4_seventhLordBadhaka: rule4,
    rule5_ubhayaLagnaBadhaka: rule5,
    rule6_rasiLagna1to4: rule6,
    rulesList
  };
}

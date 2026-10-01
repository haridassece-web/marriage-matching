// Advanced Katta Porutham & Lagna Astrological Rules Engine
// Based on authentic Tamil palm-leaf manuscript principles

import { getRasiById } from '../../data/rasis';

/**
 * Returns the Badhaka (afflicting) Rasi ID for a given Lagna
 * - Chara (Movable: 1, 4, 7, 10): 11th house is Badhaka
 * - Sthira (Fixed: 2, 5, 8, 11): 9th house is Badhaka
 * - Dwiswabhava (Dual: 3, 6, 9, 12): 7th house is Badhaka
 */
export function getBadhakaRasiId(lagnaRasiId) {
  const charaLagnas = [1, 4, 7, 10];
  const sthiraLagnas = [2, 5, 8, 11];
  
  if (charaLagnas.includes(lagnaRasiId)) {
    let badhaka = lagnaRasiId + 10;
    if (badhaka > 12) badhaka -= 12;
    return badhaka;
  } else if (sthiraLagnas.includes(lagnaRasiId)) {
    let badhaka = lagnaRasiId + 8;
    if (badhaka > 12) badhaka -= 12;
    return badhaka;
  } else {
    // Dual signs (3, 6, 9, 12): 7th house is Badhaka
    let badhaka = lagnaRasiId + 6;
    if (badhaka > 12) badhaka -= 12;
    return badhaka;
  }
}

/**
 * Main Katta Porutham & Lagna Analysis Function
 */
export function evaluateKattaPorutham(bride, groom) {
  const bLagna = bride.lagnaRasiId || bride.rasiId || 1;
  const gLagna = groom.lagnaRasiId || groom.rasiId || 1;
  const bRasi = bride.rasiId || 1;
  const gRasi = groom.rasiId || 1;

  // 1. Badhaka Alignment Analysis (பாதக லக்னம் & ராசி ஆய்வு)
  const bBadhakaRasiId = getBadhakaRasiId(bLagna);
  const gBadhakaRasiId = getBadhakaRasiId(gLagna);

  const isBrideLagnaGroomBadhaka = bLagna === gBadhakaRasiId;
  const isGroomLagnaBrideBadhaka = gLagna === bBadhakaRasiId;
  const isBrideRasiGroomBadhaka = bRasi === gBadhakaRasiId;
  const isGroomRasiBrideBadhaka = gRasi === bBadhakaRasiId;

  const hasBadhakaMismatch = isBrideLagnaGroomBadhaka || isGroomLagnaBrideBadhaka || isBrideRasiGroomBadhaka || isGroomRasiBrideBadhaka;

  // 2. Lagna Sashtashtaka (6-8 Positioning Check)
  let lagnaCount = gLagna - bLagna + 1;
  if (lagnaCount <= 0) lagnaCount += 12;

  const isLagnaSashtashtaka = lagnaCount === 6 || lagnaCount === 8;

  // 3. Eka Lagna / Eka Rasi Caution (ஒரே லக்னம் / ஒரே ராசி)
  const isSameLagna = bLagna === gLagna;
  const isSameRasi = bRasi === gRasi;

  // 4. Marriage Yoga & Type Evaluation (திருமண யோகம் & வகை)
  const bMars = bride.marsRasiId || bRasi;
  const gMars = groom.marsRasiId || gRasi;

  // Check 7th & 11th lord connection for 2nd marriage risk
  const isSecondMarriageRiskBride = [7, 11].includes(bMars) && [7, 11].includes(bride.pada);
  const isSecondMarriageRiskGroom = [7, 11].includes(gMars) && [7, 11].includes(groom.pada);

  // Love Marriage Yogas (5th & 7th & 11th connection)
  const isLoveMarriageYoga = [3, 5, 7, 9, 11].includes(bLagna) && [3, 5, 7, 9, 11].includes(gLagna);

  // Marriage Timing (Delayed vs Timely)
  const isDelayedMarriage = isLagnaSashtashtaka || [6, 8, 12].includes(lagnaCount);

  return {
    badhakaAnalysis: {
      bLagnaName: getRasiById(bLagna).nameTa,
      gLagnaName: getRasiById(gLagna).nameTa,
      bBadhakaName: getRasiById(bBadhakaRasiId).nameTa,
      gBadhakaName: getRasiById(gBadhakaRasiId).nameTa,
      hasBadhakaMismatch,
      isBrideLagnaGroomBadhaka,
      isGroomLagnaBrideBadhaka,
      explanationTa: hasBadhakaMismatch
        ? '⚠️ பாதக லக்னம்/ராசி பாதிப்பு! பெண்ணின் அல்லது ஆணின் லக்னம்/ராசி மற்றவரின் பாதக ராசியாக அமைகிறது. குடும்பத்தில் உடல்நலக்குறைவு அல்லது நிம்மதியின்மை நேரலாம்.'
        : '✅ பாதக சேர்க்கை இல்லை. லக்ன மற்றும் ராசி அமைப்புகள் சுபமாக பொருந்துகின்றன.',
      explanationEn: hasBadhakaMismatch
        ? '⚠️ Badhaka Sign Mismatch! One partner\'s Lagna/Rasi falls into the other\'s Badhaka (afflicting) house.'
        : '✅ Safe Badhaka Alignment. No afflicting sign overlap.'
    },
    lagnaAlignment: {
      lagnaCount,
      isLagnaSashtashtaka,
      isSameLagna,
      isSameRasi,
      explanationTa: isLagnaSashtashtaka
        ? '⚠️ லக்னம் 6-8 (ஷஷ்டாஷ்டக லக்னம்)! தம்பதியரிடையே கருத்து வேறுபாடு மற்றும் பொருளாதார கடன்/சிரமம் ஏற்படலாம்.'
        : isSameLagna
        ? 'ℹ️ ஒரே லக்னம்! இருவருக்கும் ஒரே மாதிரியான எண்ணங்கள் இருக்கும். திசா புக்திகள் வேறுபட்டால் மிகவும் நன்று.'
        : '✅ லக்ன பொருத்தம் சுபமான 1, 3, 5, 7, 9, 11 அமைப்பில் உள்ளது (உத்தமம்).',
      explanationEn: isLagnaSashtashtaka
        ? '⚠️ 6-8 Sashtashtaka Lagna placement. Potential for disagreement or financial strain.'
        : isSameLagna
        ? 'ℹ️ Identical Lagna. Synchronized mindset; complementary Dhasa periods recommended.'
        : '✅ Auspicious Lagna alignment (1, 3, 5, 7, 9, 11).'
    },
    marriageYoga: {
      isLoveMarriageYoga,
      isSecondMarriageRiskBride,
      isSecondMarriageRiskGroom,
      isDelayedMarriage,
      typeTa: isLoveMarriageYoga ? 'காதல் / விருப்பத் திருமணம் (Love / Self-Choice Marriage)' : 'பெற்றோர் நிச்சயித்த திருமணம் (Traditional Arranged Marriage)',
      typeEn: isLoveMarriageYoga ? 'Love / Self-Choice Marriage Yoga' : 'Traditional Arranged Marriage Yoga',
      explanationTa: isSecondMarriageRiskBride || isSecondMarriageRiskGroom
        ? '7-ம் மற்றும் 11-ம் இடத் தொடர்புகளால் ஒன்றுக்கும் மேற்பட்ட திருமண யோகம் அல்லது 2-வது திருமண வாய்ப்பு உள்ளது. களத்திர பரிகாரம் செய்ய வேண்டும்.'
        : 'களத்திர பாவம் 100% சுப பலனுடன் உள்ளது. ஏக பத்தினி / ஏக கணவன் யோகம் உள்ளது.',
      explanationEn: isSecondMarriageRiskBride || isSecondMarriageRiskGroom
        ? 'Multiple marriage indicators present in 7th/11th house connection. Astrological remedies advised.'
        : 'Single long-lasting marital bond.'
    }
  };
}

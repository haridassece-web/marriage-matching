// Kuja / Sevvai / Manglik Dosham Evaluator

export function evaluateKujaDosha(person) {
  // person object contains planets or lagna/mars position
  const lagnaRasi = person.lagnaRasiId || 1;
  const marsRasi = person.marsRasiId || person.rasiId; // fallback

  if (!marsRasi || !lagnaRasi) {
    return {
      hasDosha: false,
      severity: 'NONE',
      houseFromLagna: null,
      exemptions: [],
      explanationTa: 'செவ்வாய் தோஷ தரவுகள் இல்லை.',
      explanationEn: 'Mars position data unavailable.'
    };
  }

  // House position from Lagna
  let houseFromLagna = marsRasi - lagnaRasi + 1;
  if (houseFromLagna <= 0) houseFromLagna += 12;

  const SEVVAI_HOUSES = [1, 2, 4, 7, 8, 12];
  const isPotentialDosha = SEVVAI_HOUSES.includes(houseFromLagna);

  if (!isPotentialDosha) {
    return {
      hasDosha: false,
      severity: 'NONE',
      houseFromLagna,
      exemptions: [],
      explanationTa: `செவ்வாய் ${houseFromLagna}-ஆம் வீட்டில் உள்ளதால் செவ்வாய் தோஷம் இல்லை.`,
      explanationEn: `Mars is in house ${houseFromLagna} from Lagna. No Sevvai Dosha.`
    };
  }

  // Exemptions (Nivarthi)
  const exemptions = [];

  // Own house / Exaltation
  if (marsRasi === 1 || marsRasi === 8) exemptions.push('செவ்வாய் ஆட்சி (Aries/Scorpio)');
  if (marsRasi === 10) exemptions.push('செவ்வாய் உச்சம் (Capricorn)');
  if ([5, 9, 12, 4].includes(marsRasi)) exemptions.push('நட்பு ராசி சேர்க்கை (Leo/Sagittarius/Pisces/Cancer)');

  // Specific house exemptions
  if (houseFromLagna === 2 && (marsRasi === 3 || marsRasi === 6)) exemptions.push('2-ஆம் இடம் மிதுனம்/கன்னி நிவர்த்தி');
  if (houseFromLagna === 4 && (marsRasi === 1 || marsRasi === 8)) exemptions.push('4-ஆம் இடம் மேஷம்/விருச்சிகம் நிவர்த்தி');
  if (houseFromLagna === 7 && (marsRasi === 4 || marsRasi === 10)) exemptions.push('7-ஆம் இடம் கடகம்/மகரம் நிவர்த்தி');
  if (houseFromLagna === 8 && (marsRasi === 9 || marsRasi === 12)) exemptions.push('8-ஆம் இடம் தனுசு/மீனம் நிவர்த்தி');
  if (houseFromLagna === 12 && (marsRasi === 2 || marsRasi === 7)) exemptions.push('12-ஆம் இடம் ரிஷபம்/துலாம் நிவர்த்தி');

  const isExempt = exemptions.length > 0;

  if (isExempt) {
    return {
      hasDosha: false,
      isCancelled: true,
      severity: 'CANCELLED',
      houseFromLagna,
      exemptions,
      explanationTa: `செவ்வாய் ${houseFromLagna}-ஆம் வீட்டில் இருந்தாலும் (${exemptions.join(', ')}) தோஷ நிவர்த்தி பெறுகிறது.`,
      explanationEn: `Mars in house ${houseFromLagna} is exempt/cancelled due to: ${exemptions.join(', ')}.`
    };
  }

  // Active Dosham
  const severity = [7, 8].includes(houseFromLagna) ? 'HIGH' : 'MEDIUM';

  return {
    hasDosha: true,
    isCancelled: false,
    severity,
    houseFromLagna,
    exemptions: [],
    explanationTa: `செவ்வாய் லக்னத்திற்கு ${houseFromLagna}-ஆம் வீட்டில் உள்ளதால் ${severity === 'HIGH' ? 'கடும்' : 'மத்தியம'} செவ்வாய் தோஷம் உள்ளது.`,
    explanationEn: `Mars is placed in ${houseFromLagna}th house from Lagna causing ${severity} Sevvai / Manglik Dosha.`
  };
}

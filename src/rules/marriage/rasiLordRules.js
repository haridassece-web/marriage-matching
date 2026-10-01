import { getRasiById } from '../../data/rasis';
import { getPlanetaryFriendship } from '../../data/planets';

export function calculateRasiLord(bride, groom) {
  const bRasi = getRasiById(bride.rasiId);
  const gRasi = getRasiById(groom.rasiId);

  const friendship = getPlanetaryFriendship(bRasi.lordId, gRasi.lordId);

  let status = 'FAIL';
  let score = 0;
  let ruleApplied = '';
  let explanationTa = '';
  let explanationEn = '';

  if (friendship === 'SAME' || friendship === 'MUTUAL_FRIENDS') {
    status = 'PASS';
    score = 1;
    ruleApplied = 'Same or Mutual Friend Rasi Lords';
    explanationTa = `பெண் ராசி அதிபதி (${bRasi.lordTa}) மற்றும் ஆண் ராசி அதிபதி (${gRasi.lordTa}) இருவருக்கும் இடையே ஆழமான நட்பு நிலவுகிறது (உத்தமம்).`;
    explanationEn = `Bride Rasi Lord (${bRasi.lordEn}) and Groom Rasi Lord (${gRasi.lordEn}) are identical or mutual friends. Excellent harmony.`;
  } else if (friendship === 'FRIEND' || friendship === 'NEUTRAL') {
    status = 'PASS';
    score = 1;
    ruleApplied = 'Friendly or Neutral Rasi Lords';
    explanationTa = `பெண் ராசி அதிபதி (${bRasi.lordTa}) மற்றும் ஆண் ராசி அதிபதி (${gRasi.lordTa}) சமமான நட்பு உணர்வு கொண்டவர்கள் (மத்தியமம்).`;
    explanationEn = `Bride Rasi Lord (${bRasi.lordEn}) and Groom Rasi Lord (${gRasi.lordEn}) are friendly/neutral. Good match.`;
  } else {
    status = 'FAIL';
    score = 0;
    ruleApplied = 'Enemy Rasi Lords';
    explanationTa = `பெண் ராசி அதிபதி (${bRasi.lordTa}) மற்றும் ஆண் ராசி அதிபதி (${gRasi.lordTa}) இருவரும் பகை கிரகங்களாகும்.`;
    explanationEn = `Bride Rasi Lord (${bRasi.lordEn}) and Groom Rasi Lord (${gRasi.lordEn}) are conflicting planetary enemies. Incompatible.`;
  }

  return {
    id: 'RASI_LORD',
    nameTa: 'ராசி அதிபதி பொருத்தம்',
    nameEn: 'Rasi Lord Porutham',
    status,
    score,
    maxScore: 1,
    category: 'PORUTHAM',
    importance: 'HIGH',
    calculation: { brideLord: bRasi.lordTa, groomLord: gRasi.lordTa, relationship: friendship },
    ruleApplied,
    explanationTa,
    explanationEn
  };
}

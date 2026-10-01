import { getNakshatraById } from '../../data/nakshatras';

export function calculateDina(bride, groom) {
  const bNakId = parseInt(bride.nakshatraId, 10);
  const gNakId = parseInt(groom.nakshatraId, 10);

  const bNak = getNakshatraById(bNakId);
  const gNak = getNakshatraById(gNakId);

  // Count from Bride to Groom
  let count = gNakId - bNakId + 1;
  if (count <= 0) count += 27;

  const remainder = count % 9;
  
  // Good remainders: 2 (Sampat), 4 (Ksema), 6 (Sadhana), 8 (Mitra), 0 (Parama Mitra)
  const isGoodRemainder = [2, 4, 6, 8, 0].includes(remainder);

  // Special same nakshatra exception
  const SAME_NAKSHATRA_ALLOWED = [4, 6, 8, 10, 12, 13, 15, 17, 21, 24, 26]; // Rohini, Arudra, Pushya, Magha, Uttara, Hasta, Swati, Anuradha, Uttara Ashadha, Shatabhisha, Uttara Bhadrapada
  const isSameNak = bNakId === gNakId;
  const isSameNakAllowed = isSameNak && SAME_NAKSHATRA_ALLOWED.includes(bNakId);

  let status = 'FAIL';
  let score = 0;
  let ruleApplied = '';
  let explanationEn = '';
  let explanationTa = '';

  if (isGoodRemainder || isSameNakAllowed) {
    status = 'PASS';
    score = 1;
    ruleApplied = isSameNakAllowed ? 'Same Nakshatra Exemption Applied' : `Count remainder ${remainder} is auspicious`;
    explanationTa = `பெண் நட்சத்திரத்திலிருந்து ஆண் நட்சத்திரம் வரையிலான எண்ணிக்கை ${count}. 9-ஆல் வகுத்தால் மீதி ${remainder}. இது சுபமான பலனைத் தரும்.`;
    explanationEn = `The count from Bride star to Groom star is ${count}. Remainder when divided by 9 is ${remainder}, which is auspicious for long life and health.`;
  } else {
    status = 'FAIL';
    score = 0;
    ruleApplied = `Count remainder ${remainder} is inauspicious`;
    explanationTa = `பெண் நட்சத்திரத்திலிருந்து ஆண் நட்சத்திரம் வரையிலான எண்ணிக்கை ${count}. 9-ஆல் வகுத்தால் மீதி ${remainder} (அசுபம்).`;
    explanationEn = `The count from Bride star to Groom star is ${count}. Remainder when divided by 9 is ${remainder}, which is considered inauspicious.`;
  }

  return {
    id: 'DINA',
    nameTa: 'தின பொருத்தம்',
    nameEn: 'Dina Porutham',
    status,
    score,
    maxScore: 1,
    category: 'PORUTHAM',
    importance: 'MEDIUM',
    calculation: { brideStar: bNak.nameTa, groomStar: gNak.nameTa, count, remainder },
    ruleApplied,
    explanationTa,
    explanationEn
  };
}

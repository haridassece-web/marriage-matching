export function calculateMahendra(bride, groom) {
  const bNakId = parseInt(bride.nakshatraId, 10);
  const gNakId = parseInt(groom.nakshatraId, 10);

  let count = gNakId - bNakId + 1;
  if (count <= 0) count += 27;

  const MAHENDRA_COUNTS = [4, 7, 10, 13, 16, 19, 22, 25];
  const hasMahendra = MAHENDRA_COUNTS.includes(count);

  return {
    id: 'MAHENDRA',
    nameTa: 'மகேந்திர பொருத்தம்',
    nameEn: 'Mahendra Porutham',
    status: hasMahendra ? 'PASS' : 'FAIL',
    score: hasMahendra ? 1 : 0,
    maxScore: 1,
    category: 'PORUTHAM',
    importance: 'MEDIUM',
    calculation: { count },
    ruleApplied: hasMahendra ? `Count ${count} matches Mahendra set` : `Count ${count} not in Mahendra set`,
    explanationTa: hasMahendra 
      ? `பெண் நட்சத்திரத்திலிருந்து ஆண் நட்சத்திரம் ${count}-வது நட்சத்திரமாகும். இது மகேந்திர பொருத்தத்தை தருகிறது (புத்திர பாக்கியம் மற்றும் வம்ச விருத்தி).`
      : `பெண் நட்சத்திரத்திலிருந்து ஆண் நட்சத்திரம் ${count}-வது நட்சத்திரமாக வருகிறது. மகேந்திர பொருத்தம் அமையவில்லை.`,
    explanationEn: hasMahendra
      ? `The count from Bride to Groom star is ${count}, which grants Mahendra Porutham. Ensures wealth, longevity of offspring, and prosperity.`
      : `The count from Bride to Groom star is ${count}. Mahendra Porutham is not present.`
  };
}

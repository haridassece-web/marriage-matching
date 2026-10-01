export function calculateSthreeDeergha(bride, groom) {
  const bNakId = parseInt(bride.nakshatraId, 10);
  const gNakId = parseInt(groom.nakshatraId, 10);

  let count = gNakId - bNakId + 1;
  if (count <= 0) count += 27;

  let status = 'FAIL';
  let score = 0;
  let ruleApplied = '';
  let explanationTa = '';
  let explanationEn = '';

  if (count > 13) {
    status = 'PASS';
    score = 1;
    ruleApplied = `Count ${count} > 13 (Uttamam)`;
    explanationTa = `பெண் நட்சத்திரத்திலிருந்து ஆண் நட்சத்திரம் ${count} விண்மீன்கள் தள்ளி உள்ளது (> 13). இது உத்தமமான ஸ்திரீ தீர்க்க பொருத்தம் ஆகும்.`;
    explanationEn = `Count from Bride star to Groom star is ${count} (> 13). Excellent Sthree Deergha for long lasting prosperity and happiness.`;
  } else if (count > 7) {
    status = 'PARTIAL';
    score = 0.5;
    ruleApplied = `Count ${count} between 8 and 13 (Madhyamam)`;
    explanationTa = `பெண் நட்சத்திரத்திலிருந்து ஆண் நட்சத்திரம் ${count} விண்மீன்கள் தள்ளி உள்ளது (> 7). இது மத்தியம ஸ்திரீ தீர்க்க பொருத்தம்.`;
    explanationEn = `Count from Bride star to Groom star is ${count} (> 7). Moderate Sthree Deergha match.`;
  } else {
    status = 'FAIL';
    score = 0;
    ruleApplied = `Count ${count} <= 7 (Adhamam)`;
    explanationTa = `பெண் நட்சத்திரத்திலிருந்து ஆண் நட்சத்திரம் ${count} விண்மீன்கள் மட்டுமே தள்ளி உள்ளது (<= 7). ஸ்திரீ தீர்க்க பொருத்தம் இல்லை.`;
    explanationEn = `Count from Bride star to Groom star is ${count} (<= 7). Sthree Deergha is absent.`;
  }

  return {
    id: 'STHREE_DEERGHA',
    nameTa: 'ஸ்திரீ தீர்க்க பொருத்தம்',
    nameEn: 'Sthree Deergha Porutham',
    status,
    score,
    maxScore: 1,
    category: 'PORUTHAM',
    importance: 'MEDIUM',
    calculation: { count },
    ruleApplied,
    explanationTa,
    explanationEn
  };
}

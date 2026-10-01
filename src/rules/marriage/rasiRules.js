import { getRasiById } from '../../data/rasis';
import { getPlanetaryFriendship } from '../../data/planets';

export function calculateRasi(bride, groom) {
  const bRasiId = parseInt(bride.rasiId, 10);
  const gRasiId = parseInt(groom.rasiId, 10);

  const bRasi = getRasiById(bRasiId);
  const gRasi = getRasiById(gRasiId);

  let count = gRasiId - bRasiId + 1;
  if (count <= 0) count += 12;

  const friendship = getPlanetaryFriendship(bRasi.lordId, gRasi.lordId);
  const sameLordOrFriend = friendship === 'SAME' || friendship === 'MUTUAL_FRIENDS' || friendship === 'FRIEND';

  let status = 'FAIL';
  let score = 0;
  let ruleApplied = '';
  let explanationTa = '';
  let explanationEn = '';

  if (count === 1) {
    if (bRasiId === gRasiId) {
      status = 'PASS';
      score = 1;
      ruleApplied = 'Eka Rasi (Same Sign)';
      explanationTa = `இருவருக்கும் ஒரே ராசி (${bRasi.nameTa}). ஏக ராசி பொருத்தத்தால் மன ஒற்றுமையும் நல்வாழ்வும் அமையும்.`;
      explanationEn = `Both Bride and Groom belong to the same Rasi (${bRasi.nameEn}). Eka Rasi grants strong psychological harmony.`;
    }
  } else if (count === 7) {
    status = 'PASS';
    score = 1;
    ruleApplied = 'Samasaptama (7th house positioning)';
    explanationTa = `பெண் ராசியிலிருந்து ஆண் ராசி 7-வது ராசி (சமசப்தமம்). தம்பதியரிடம் ஈர்ப்பும் நலிவில்லா அன்பும் பெருகும்.`;
    explanationEn = `Groom Rasi is 7th from Bride Rasi (Samasaptama). Promotes deep mutual affection and complementary bonding.`;
  } else if (count === 3 || count === 11 || count === 4 || count === 10 || count === 5 || count === 9) {
    status = 'PASS';
    score = 1;
    ruleApplied = `Auspicious Rasi position (${count}th count)`;
    explanationTa = `பெண் ராசியிலிருந்து ஆண் ராசி ${count}-வது ராசியாக சுப நிலையில் அமைந்திருக்கிறது. உத்தம பொருத்தம்.`;
    explanationEn = `Groom sign is in ${count}th position from Bride sign. Auspicious alignment for harmony and prosperity.`;
  } else if (count === 6 || count === 8) {
    if (sameLordOrFriend) {
      status = 'PARTIAL';
      score = 0.5;
      ruleApplied = 'Sashtashtaka (6-8) with same/friendly lord exception';
      explanationTa = `பெண் ராசியிலிருந்து ஆண் ராசி ${count}-வது ராசி (ஷஷ்டாஷ்டகம்), ஆனால் ராசி அதிபதிகள் நட்பாக இருப்பதால் தோஷ நிவர்த்தி பெறுகிறது.`;
      explanationEn = `6-8 position (Sashtashtaka) overridden by friendly/identical Rasi lords. Moderate acceptability.`;
    } else {
      status = 'FAIL';
      score = 0;
      ruleApplied = 'Sashtashtaka (6-8) Incompatibility';
      explanationTa = `பெண் ராசியிலிருந்து ஆண் ராசி ${count}-வது ராசி (ஷஷ்டாஷ்டக தோஷம்). கருத்து வேறுபாடு மற்றும் மனக்கசப்பு நேரலாம்.`;
      explanationEn = `6-8 position (Sashtashtaka) without lord exception. Indicates risk of disagreement and friction.`;
    }
  } else if (count === 2 || count === 12) {
    if (count === 2 && sameLordOrFriend) {
      status = 'PARTIAL';
      score = 0.5;
      ruleApplied = 'Dwirdwadasa (2-12) exception';
      explanationTa = `பெண் ராசியிலிருந்து ஆண் ராசி 2-வது ராசி (த்விர்த்வாதசம் - சுப 2-12).`;
      explanationEn = `2-12 placement with lord exemption. Acceptable match.`;
    } else {
      status = 'FAIL';
      score = 0;
      ruleApplied = 'Dwirdwadasa (2-12) Incompatibility';
      explanationTa = `பெண் ராசியிலிருந்து ஆண் ராசி ${count}-வது ராசியாக (த்விர்த்வாதச தோஷம்) அமைவதால் விரயங்கள் நேரலாம்.`;
      explanationEn = `2-12 placement (Dwirdwadasa). Financial strain or distance predicted.`;
    }
  }

  return {
    id: 'RASI',
    nameTa: 'ராசி பொருத்தம்',
    nameEn: 'Rasi Porutham',
    status,
    score,
    maxScore: 1,
    category: 'PORUTHAM',
    importance: 'HIGH',
    calculation: { brideRasi: bRasi.nameTa, groomRasi: gRasi.nameTa, count },
    ruleApplied,
    explanationTa,
    explanationEn
  };
}

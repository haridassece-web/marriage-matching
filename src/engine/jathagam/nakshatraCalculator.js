import { NAKSHATRAS, getRasiByNakshatraAndPada } from '../../data/nakshatras';

export function calculateNakshatraFromDegree(moonDegree) {
  // 360 degrees divided by 27 nakshatras = 13.3333 degrees per nakshatra
  const degPerStar = 360 / 27;
  const starIndex = Math.floor(moonDegree / degPerStar);
  const nakshatra = NAKSHATRAS[starIndex % 27];

  const remainderDeg = moonDegree % degPerStar;
  const degPerPada = degPerStar / 4;
  const pada = Math.floor(remainderDeg / degPerPada) + 1;

  const rasiId = getRasiByNakshatraAndPada(nakshatra.id, pada);

  return {
    nakshatraId: nakshatra.id,
    nakshatraNameTa: nakshatra.nameTa,
    nakshatraNameEn: nakshatra.nameEn,
    pada,
    rasiId
  };
}

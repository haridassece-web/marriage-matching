// Rasi Vasya mapping (Rasi ID -> List of Vasya Rasi IDs)
export const VASYA_TABLE = {
  1: [5, 8],     // Mesham -> Simmam, Viruchigam
  2: [4, 7],     // Rishabam -> Karkatakam, Thulaam
  3: [6],        // Mithunam -> Kanni
  4: [8, 9],     // Karkatakam -> Viruchigam, Dhanusu
  5: [7],        // Simmam -> Thulaam
  6: [3, 12],    // Kanni -> Mithunam, Meenam
  7: [10],       // Thulaam -> Makaram
  8: [4],        // Viruchigam -> Karkatakam
  9: [12],       // Dhanusu -> Meenam
  10: [11],      // Makaram -> Kumbam
  11: [9],       // Kumbam -> Dhanusu
  12: [10]       // Meenam -> Makaram
};

export function checkVasyaMatch(brideRasiId, groomRasiId) {
  const bRasi = parseInt(brideRasiId, 10);
  const gRasi = parseInt(groomRasiId, 10);

  const bVasya = VASYA_TABLE[bRasi] || [];
  const gVasya = VASYA_TABLE[gRasi] || [];

  const bToG = bVasya.includes(gRasi);
  const gToB = gVasya.includes(bRasi);

  if (bToG && gToB) return { status: 'MUTUAL', score: 1 };
  if (bToG || gToB) return { status: 'SINGLE', score: 0.5 };
  return { status: 'NONE', score: 0 };
}

// Vedha Pairs (Mutually afflicted Nakshatras)
export const VEDHA_PAIRS = [
  [1, 18],  // Ashwini <-> Jyeshtha
  [2, 17],  // Bharani <-> Anuradha
  [3, 16],  // Krittika <-> Vishakha
  [4, 15],  // Rohini <-> Swati
  [6, 22],  // Arudra <-> Shravana
  [7, 21],  // Punarvasu <-> Uttara Ashadha
  [8, 20],  // Pushya <-> Purva Ashadha
  [9, 19],  // Ashlesha <-> Mula
  [10, 27], // Magha <-> Revati
  [11, 26], // Purva Phalguni <-> Uttara Bhadrapada
  [12, 25], // Uttara Phalguni <-> Purva Bhadrapada
  [13, 24], // Hasta <-> Shatabhisha
  // Triple mutual Vedha for Mars stars:
  [5, 14],  // Mrigashira <-> Chitra
  [14, 23], // Chitra <-> Dhanishta
  [5, 23]   // Mrigashira <-> Dhanishta
];

export function checkHasVedha(nakshatraId1, nakshatraId2) {
  const n1 = parseInt(nakshatraId1, 10);
  const n2 = parseInt(nakshatraId2, 10);
  if (n1 === n2) return false;

  return VEDHA_PAIRS.some(([a, b]) => (a === n1 && b === n2) || (a === n2 && b === n1));
}

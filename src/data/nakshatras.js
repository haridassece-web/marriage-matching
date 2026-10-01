export const NAKSHATRAS = [
  { id: 1, nameEn: 'Ashwini', nameTa: 'அஸ்வினி', rasiId: 1, lordEn: 'Ketu', lordTa: 'கேது', padas: [1, 2, 3, 4] },
  { id: 2, nameEn: 'Bharani', nameTa: 'பரணி', rasiId: 1, lordEn: 'Venus', lordTa: 'சுக்கிரன்', padas: [1, 2, 3, 4] },
  { id: 3, nameEn: 'Krittika', nameTa: 'கார்த்திகை', rasiId: 1, lordEn: 'Sun', lordTa: 'சூரியன்', padas: [1, 2, 3, 4] }, // Pada 1 in Mesham, 2,3,4 in Rishabam
  { id: 4, nameEn: 'Rohini', nameTa: 'ரோகிணி', rasiId: 2, lordEn: 'Moon', lordTa: 'சந்திரன்', padas: [1, 2, 3, 4] },
  { id: 5, nameEn: 'Mrigashira', nameTa: 'மிருகசீரிஷம்', rasiId: 2, lordEn: 'Mars', lordTa: 'செவ்வாய்', padas: [1, 2, 3, 4] }, // Pada 1,2 in Rishabam, 3,4 in Mithunam
  { id: 6, nameEn: 'Arudra', nameTa: 'திருவாதிரை', rasiId: 3, lordEn: 'Rahu', lordTa: 'ராகு', padas: [1, 2, 3, 4] },
  { id: 7, nameEn: 'Punarvasu', nameTa: 'புனர்பூசம்', rasiId: 3, lordEn: 'Jupiter', lordTa: 'குரு', padas: [1, 2, 3, 4] }, // Pada 1,2,3 in Mithunam, 4 in Katakam
  { id: 8, nameEn: 'Pushya', nameTa: 'பூசம்', rasiId: 4, lordEn: 'Saturn', lordTa: 'சனி', padas: [1, 2, 3, 4] },
  { id: 9, nameEn: 'Ashlesha', nameTa: 'ஆயில்யம்', rasiId: 4, lordEn: 'Mercury', lordTa: 'புதன்', padas: [1, 2, 3, 4] },
  { id: 10, nameEn: 'Magha', nameTa: 'மகம்', rasiId: 5, lordEn: 'Ketu', lordTa: 'கேது', padas: [1, 2, 3, 4] },
  { id: 11, nameEn: 'Purva Phalguni', nameTa: 'பூரம்', rasiId: 5, lordEn: 'Venus', lordTa: 'சுக்கிரன்', padas: [1, 2, 3, 4] },
  { id: 12, nameEn: 'Uttara Phalguni', nameTa: 'உத்திரம்', rasiId: 5, lordEn: 'Sun', lordTa: 'சூரியன்', padas: [1, 2, 3, 4] }, // Pada 1 in Simmam, 2,3,4 in Kanni
  { id: 13, nameEn: 'Hasta', nameTa: 'ஹஸ்தம்', rasiId: 6, lordEn: 'Moon', lordTa: 'சந்திரன்', padas: [1, 2, 3, 4] },
  { id: 14, nameEn: 'Chitra', nameTa: 'சித்திரை', rasiId: 6, lordEn: 'Mars', lordTa: 'செவ்வாய்', padas: [1, 2, 3, 4] }, // Pada 1,2 in Kanni, 3,4 in Thulaam
  { id: 15, nameEn: 'Swati', nameTa: 'சுவாதி', rasiId: 7, lordEn: 'Rahu', lordTa: 'ராகு', padas: [1, 2, 3, 4] },
  { id: 16, nameEn: 'Vishakha', nameTa: 'விசாகம்', rasiId: 7, lordEn: 'Jupiter', lordTa: 'குரு', padas: [1, 2, 3, 4] }, // Pada 1,2,3 in Thulaam, 4 in Viruchigam
  { id: 17, nameEn: 'Anuradha', nameTa: 'அனுஷம்', rasiId: 8, lordEn: 'Saturn', lordTa: 'சனி', padas: [1, 2, 3, 4] },
  { id: 18, nameEn: 'Jyeshtha', nameTa: 'கேட்டை', rasiId: 8, lordEn: 'Mercury', lordTa: 'புதன்', padas: [1, 2, 3, 4] },
  { id: 19, nameEn: 'Mula', nameTa: 'மூலம்', rasiId: 9, lordEn: 'Ketu', lordTa: 'கேது', padas: [1, 2, 3, 4] },
  { id: 20, nameEn: 'Purva Ashadha', nameTa: 'பூராடம்', rasiId: 9, lordEn: 'Venus', lordTa: 'சுக்கிரன்', padas: [1, 2, 3, 4] },
  { id: 21, nameEn: 'Uttara Ashadha', nameTa: 'உத்திராடம்', rasiId: 9, lordEn: 'Sun', lordTa: 'சூரியன்', padas: [1, 2, 3, 4] }, // Pada 1 in Dhanusu, 2,3,4 in Makaram
  { id: 22, nameEn: 'Shravana', nameTa: 'திருவோணம்', rasiId: 10, lordEn: 'Moon', lordTa: 'சந்திரன்', padas: [1, 2, 3, 4] },
  { id: 23, nameEn: 'Dhanishta', nameTa: 'அவிட்டம்', rasiId: 10, lordEn: 'Mars', lordTa: 'செவ்வாய்', padas: [1, 2, 3, 4] }, // Pada 1,2 in Makaram, 3,4 in Kumbam
  { id: 24, nameEn: 'Shatabhisha', nameTa: 'சதயம்', rasiId: 11, lordEn: 'Rahu', lordTa: 'ராகு', padas: [1, 2, 3, 4] },
  { id: 25, nameEn: 'Purva Bhadrapada', nameTa: 'பூரட்டாதி', rasiId: 11, lordEn: 'Jupiter', lordTa: 'குரு', padas: [1, 2, 3, 4] }, // Pada 1,2,3 in Kumbam, 4 in Meenam
  { id: 26, nameEn: 'Uttara Bhadrapada', nameTa: 'உத்திரட்டாதி', rasiId: 12, lordEn: 'Saturn', lordTa: 'சனி', padas: [1, 2, 3, 4] },
  { id: 27, nameEn: 'Revati', nameTa: 'ரேவதி', rasiId: 12, lordEn: 'Mercury', lordTa: 'புதன்', padas: [1, 2, 3, 4] }
];

export function getNakshatraById(id) {
  return NAKSHATRAS.find(n => n.id === parseInt(id, 10)) || NAKSHATRAS[0];
}

// Helper to determine accurate Rasi ID based on Nakshatra and Pada
export function getRasiByNakshatraAndPada(nakshatraId, pada) {
  const nId = parseInt(nakshatraId, 10);
  const p = parseInt(pada, 10);
  
  if (nId === 3) return p === 1 ? 1 : 2; // Krittika: 1 -> Mesham, 2..4 -> Rishabam
  if (nId === 5) return (p === 1 || p === 2) ? 2 : 3; // Mrigashira: 1,2 -> Rishabam, 3,4 -> Mithunam
  if (nId === 7) return p <= 3 ? 3 : 4; // Punarvasu: 1..3 -> Mithunam, 4 -> Kadagam
  if (nId === 12) return p === 1 ? 5 : 6; // Uttiram: 1 -> Simmam, 2..4 -> Kanni
  if (nId === 14) return (p === 1 || p === 2) ? 6 : 7; // Chithirai: 1,2 -> Kanni, 3,4 -> Thulaam
  if (nId === 16) return p <= 3 ? 7 : 8; // Visakam: 1..3 -> Thulaam, 4 -> Viruchigam
  if (nId === 21) return p === 1 ? 9 : 10; // Uthiradam: 1 -> Dhanusu, 2..4 -> Makaram
  if (nId === 23) return (p === 1 || p === 2) ? 10 : 11; // Avittam: 1,2 -> Makaram, 3,4 -> Kumbam
  if (nId === 25) return p <= 3 ? 11 : 12; // Poorattathi: 1..3 -> Kumbam, 4 -> Meenam

  // Regular mapping for nakshatras that fit entirely in 1 Rasi
  const nak = getNakshatraById(nId);
  return nak ? nak.rasiId : 1;
}

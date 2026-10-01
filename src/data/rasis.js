export const RASIS = [
  { id: 1, nameEn: 'Aries', nameTa: 'மேஷம்', lordEn: 'Mars', lordTa: 'செவ்வாய்', lordId: 'MARS', symbol: '♈', element: 'Fire' },
  { id: 2, nameEn: 'Taurus', nameTa: 'ரிஷபம்', lordEn: 'Venus', lordTa: 'சுக்கிரன்', lordId: 'VENUS', symbol: '♉', element: 'Earth' },
  { id: 3, nameEn: 'Gemini', nameTa: 'மிதுனம்', lordEn: 'Mercury', lordTa: 'புதன்', lordId: 'MERCURY', symbol: '♊', element: 'Air' },
  { id: 4, nameEn: 'Cancer', nameTa: 'கடகம்', lordEn: 'Moon', lordTa: 'சந்திரன்', lordId: 'MOON', symbol: '♋', element: 'Water' },
  { id: 5, nameEn: 'Leo', nameTa: 'சிம்மம்', lordEn: 'Sun', lordTa: 'சூரியன்', lordId: 'SUN', symbol: '♌', element: 'Fire' },
  { id: 6, nameEn: 'Virgo', nameTa: 'கன்னி', lordEn: 'Mercury', lordTa: 'புதன்', lordId: 'MERCURY', symbol: '♍', element: 'Earth' },
  { id: 7, nameEn: 'Libra', nameTa: 'துலாம்', lordEn: 'Venus', lordTa: 'சுக்கிரன்', lordId: 'VENUS', symbol: '♎', element: 'Air' },
  { id: 8, nameEn: 'Scorpio', nameTa: 'விருச்சிகம்', lordEn: 'Mars', lordTa: 'செவ்வாய்', lordId: 'MARS', symbol: '♏', element: 'Water' },
  { id: 9, nameEn: 'Sagittarius', nameTa: 'தனுசு', lordEn: 'Jupiter', lordTa: 'குரு', lordId: 'JUPITER', symbol: '♐', element: 'Fire' },
  { id: 10, nameEn: 'Capricorn', nameTa: 'மகரம்', lordEn: 'Saturn', lordTa: 'சனி', lordId: 'SATURN', symbol: '♑', element: 'Earth' },
  { id: 11, nameEn: 'Aquarius', nameTa: 'கும்பம்', lordEn: 'Saturn', lordTa: 'சனி', lordId: 'SATURN', symbol: '♒', element: 'Air' },
  { id: 12, nameEn: 'Pisces', nameTa: 'மீனம்', lordEn: 'Jupiter', lordTa: 'குரு', lordId: 'JUPITER', symbol: '♓', element: 'Water' }
];

export function getRasiById(id) {
  return RASIS.find(r => r.id === parseInt(id, 10)) || RASIS[0];
}

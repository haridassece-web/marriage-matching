export const PLANETS = {
  SUN: { nameEn: 'Sun', nameTa: 'சூரியன்', friends: ['MOON', 'MARS', 'JUPITER'], neutral: ['MERCURY'], enemies: ['VENUS', 'SATURN'] },
  MOON: { nameEn: 'Moon', nameTa: 'சந்திரன்', friends: ['SUN', 'MERCURY'], neutral: ['MARS', 'JUPITER', 'VENUS', 'SATURN'], enemies: [] },
  MARS: { nameEn: 'Mars', nameTa: 'செவ்வாய்', friends: ['SUN', 'MOON', 'JUPITER'], neutral: ['VENUS', 'SATURN'], enemies: ['MERCURY'] },
  MERCURY: { nameEn: 'Mercury', nameTa: 'புதன்', friends: ['SUN', 'VENUS'], neutral: ['MARS', 'JUPITER', 'SATURN'], enemies: ['MOON'] },
  JUPITER: { nameEn: 'Jupiter', nameTa: 'குரு', friends: ['SUN', 'MOON', 'MARS'], neutral: ['SATURN'], enemies: ['MERCURY', 'VENUS'] },
  VENUS: { nameEn: 'Venus', nameTa: 'சுக்கிரன்', friends: ['MERCURY', 'SATURN'], neutral: ['MARS', 'JUPITER'], enemies: ['SUN', 'MOON'] },
  SATURN: { nameEn: 'Saturn', nameTa: 'சனி', friends: ['MERCURY', 'VENUS'], neutral: ['JUPITER'], enemies: ['SUN', 'MOON', 'MARS'] },
  RAHU: { nameEn: 'Rahu', nameTa: 'ராகு', friends: ['VENUS', 'SATURN'], neutral: ['MERCURY', 'JUPITER'], enemies: ['SUN', 'MOON', 'MARS'] },
  KETU: { nameEn: 'Ketu', nameTa: 'கேது', friends: ['MARS', 'JUPITER'], neutral: ['MERCURY', 'VENUS', 'SATURN'], enemies: ['SUN', 'MOON'] }
};

export function getPlanetaryFriendship(lord1Id, lord2Id) {
  if (lord1Id === lord2Id) return 'SAME';
  
  const p1 = PLANETS[lord1Id];
  const p2 = PLANETS[lord2Id];
  if (!p1 || !p2) return 'NEUTRAL';

  const p1ToP2 = p1.friends.includes(lord2Id) ? 'FRIEND' : (p1.enemies.includes(lord2Id) ? 'ENEMY' : 'NEUTRAL');
  const p2ToP1 = p2.friends.includes(lord1Id) ? 'FRIEND' : (p2.enemies.includes(lord1Id) ? 'ENEMY' : 'NEUTRAL');

  if (p1ToP2 === 'FRIEND' && p2ToP1 === 'FRIEND') return 'MUTUAL_FRIENDS';
  if (p1ToP2 === 'ENEMY' && p2ToP1 === 'ENEMY') return 'MUTUAL_ENEMIES';
  if (p1ToP2 === 'FRIEND' || p2ToP1 === 'FRIEND') return 'FRIEND';
  if (p1ToP2 === 'ENEMY' || p2ToP1 === 'ENEMY') return 'ENEMY';
  return 'NEUTRAL';
}

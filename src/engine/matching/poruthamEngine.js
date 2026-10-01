import { calculateDina } from '../../rules/marriage/dinaRules';
import { calculateGana } from '../../rules/marriage/ganaRules';
import { calculateMahendra } from '../../rules/marriage/mahendraRules';
import { calculateSthreeDeergha } from '../../rules/marriage/sthreeDeerghaRules';
import { calculateYoni } from '../../rules/marriage/yoniRules';
import { calculateRasi } from '../../rules/marriage/rasiRules';
import { calculateRasiLord } from '../../rules/marriage/rasiLordRules';
import { calculateVasya } from '../../rules/marriage/vasyaRules';
import { calculateRajju } from '../../rules/marriage/rajjuRules';
import { calculateVedha } from '../../rules/marriage/vedhaRules';
import { calculateNadi } from '../../rules/marriage/nadiRules';

export function runPoruthamEngine(bride, groom) {
  const results = [
    calculateDina(bride, groom),
    calculateGana(bride, groom),
    calculateMahendra(bride, groom),
    calculateSthreeDeergha(bride, groom),
    calculateYoni(bride, groom),
    calculateRasi(bride, groom),
    calculateRasiLord(bride, groom),
    calculateVasya(bride, groom),
    calculateRajju(bride, groom),
    calculateVedha(bride, groom),
    calculateNadi(bride, groom)
  ];

  return results;
}

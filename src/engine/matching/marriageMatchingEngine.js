import { runPoruthamEngine } from './poruthamEngine';
import { calculateDoshaAnalysis } from '../../rules/dosha/doshaEngine';
import { calculate9ThirumanaDhosamsAnalysis } from '../../rules/dosha/marriageDoshaRules';
import { evaluateKattaPorutham } from '../../rules/jathagam/kattaPoruthamRules';
import { evaluateMudakkuRules } from '../../rules/jathagam/mudakkuRules';
import { evaluateSpecialMarriageRules } from '../../rules/jathagam/specialRulesEngine';
import { evaluateProgenyAndSpecialRules } from '../../rules/jathagam/progenyAndSpecialRulesEngine';

export function calculateMarriageMatching(bride, groom) {
  // 1. 11 Poruthams Engine
  const poruthamResults = runPoruthamEngine(bride, groom);
  const totalPoruthamScore = poruthamResults.reduce((acc, curr) => acc + curr.score, 0); // Out of 11

  // 2. Core Dosha & Sevvai Engine
  const doshaAnalysis = calculateDoshaAnalysis(bride, groom, poruthamResults);

  // 3. 9 Thirumana Dhosams Engine
  const dhosams9Analysis = calculate9ThirumanaDhosamsAnalysis(bride, groom);

  // 4. Katta Porutham & Mudakku Engine
  const kattaResult = evaluateKattaPorutham(bride, groom);
  const mudakkuResult = evaluateMudakkuRules(bride, groom);

  // 5. Special Rules & Maturity Engine
  const specialResult = evaluateSpecialMarriageRules(bride, groom);

  // 6. Progeny Engine
  const progenyResult = evaluateProgenyAndSpecialRules(bride, groom);

  // ==========================================
  // COMPREHENSIVE OVERALL % CALCULATION ENGINE
  // ==========================================

  // Module 1: 11 Poruthams (Weight: 35%)
  const poruthamPercent = (totalPoruthamScore / 11) * 100;

  // Module 2: 9 Marriage Doshas & Sevvai Balance (Weight: 20%)
  let doshaPoints = 100;
  if (!dhosams9Analysis.isBalanceMatched) doshaPoints -= 35;
  if (dhosams9Analysis.brideActiveCount !== dhosams9Analysis.groomActiveCount) doshaPoints -= 20;
  if (doshaAnalysis.hasRajjuDosha) doshaPoints -= 45;
  if (doshaAnalysis.hasVedhaDosha) doshaPoints -= 35;
  const doshaPercent = Math.max(0, doshaPoints);

  // Module 3: Katta Porutham & Mudakku Lord (Weight: 15%)
  let kattaPoints = 100;
  if (kattaResult.badhakaAnalysis.hasBadhakaMismatch) kattaPoints -= 40;
  if (kattaResult.lagnaAlignment.isLagnaSashtashtaka) kattaPoints -= 30;
  if (mudakkuResult.hasMudakkuConflict) kattaPoints -= 30;
  const kattaPercent = Math.max(0, kattaPoints);

  // Module 4: Special Rules & Family Maturity (Weight: 15%)
  let specialPoints = 100;
  if (specialResult.vainasikaAnalysis.isVainasikaDosham) specialPoints -= 50;
  const avgMaturityScore = (specialResult.maturityAnalysis.brideMaturity.score + specialResult.maturityAnalysis.groomMaturity.score) / 2;
  specialPoints = (specialPoints * 0.6) + (avgMaturityScore * 0.4);
  const specialPercent = Math.max(0, Math.min(100, specialPoints));

  // Module 5: Progeny & 5th/9th House (Weight: 15%)
  let progenyPoints = 100;
  if (progenyResult.vainasikaStar.isVainasika22) progenyPoints -= 40;
  const progenyPercent = Math.max(0, progenyPoints);

  // Weighted Overall Compatibility Percentage (%)
  const overallPercentage = Math.round(
    (poruthamPercent * 0.35) +
    (doshaPercent * 0.20) +
    (kattaPercent * 0.15) +
    (specialPercent * 0.15) +
    (progenyPercent * 0.15)
  );

  // Grade Classification
  const rajjuFailed = doshaAnalysis.hasRajjuDosha;
  const vedhaFailed = doshaAnalysis.hasVedhaDosha;

  let grade = 'UTTAMAM'; // UTTAMAM, MADHYAMAM, ADHAMAM
  let gradeTa = 'உத்தமம் - திருமணம் செய்யலாம் (Recommended)';
  let gradeEn = 'Uttamam - Highly Recommended';
  let badgeColor = 'emerald';

  if (rajjuFailed || vedhaFailed || overallPercentage < 50) {
    grade = 'ADHAMAM';
    gradeTa = 'அதமம் - பொருத்தம் இல்லை (Not Recommended)';
    gradeEn = 'Adhamam - Mismatch / Not Recommended';
    badgeColor = 'rose';
  } else if (overallPercentage < 70 || !dhosams9Analysis.isBalanceMatched) {
    grade = 'MADHYAMAM';
    gradeTa = 'மத்தியமம் - பரிகாரங்களுடன் செய்யலாம் (Moderate Match)';
    gradeEn = 'Madhyamam - Moderate Match (Remedies Advised)';
    badgeColor = 'amber';
  }

  // Mandatory Warnings
  const warnings = [];
  if (rajjuFailed) warnings.push({ type: 'RAJJU', msgTa: '⚠️ ரஜ்ஜு தோஷம்! மாங்கல்ய பாக்கியத்தில் கவனம் தேவை.', msgEn: '⚠️ Rajju Dosha Alert!' });
  if (vedhaFailed) warnings.push({ type: 'VEDHA', msgTa: '⚠️ வேதா தோஷம்! பரஸ்பர தாக்கம் உண்டு.', msgEn: '⚠️ Vedha Dosha Alert!' });
  if (!dhosams9Analysis.isBalanceMatched) {
    warnings.push({ type: 'DOSHA_IMBALANCE', msgTa: '⚠️ தோஷ சமநிலை இல்லை (செவ்வாய்/சர்ப்ப தோஷ சமநிலை பார்க்கவும்).', msgEn: '⚠️ Sevvai/Sarpa Dosha Imbalance!' });
  }
  if (mudakkuResult.hasMudakkuConflict) {
    warnings.push({ type: 'MUDAKKU', msgTa: mudakkuResult.explanationTa, msgEn: mudakkuResult.explanationEn });
  }

  return {
    bride,
    groom,
    results: poruthamResults,
    doshaAnalysis,
    dhosams9Analysis,
    kattaResult,
    mudakkuResult,
    specialResult,
    progenyResult,
    summary: {
      totalScore: totalPoruthamScore,
      maxPossibleScore: 11,
      scoreFormatted: `${totalPoruthamScore} / 11`,
      overallPercentage,
      moduleBreakdown: {
        poruthamPercent: Math.round(poruthamPercent),
        doshaPercent: Math.round(doshaPercent),
        kattaPercent: Math.round(kattaPercent),
        specialPercent: Math.round(specialPercent),
        progenyPercent: Math.round(progenyPercent)
      },
      grade,
      gradeTa,
      gradeEn,
      badgeColor,
      isRecommended: grade !== 'ADHAMAM'
    },
    warnings
  };
}

import { runPoruthamEngine } from './poruthamEngine';
import { calculateDoshaAnalysis } from '../../rules/dosha/doshaEngine';
import { calculate9ThirumanaDhosamsAnalysis } from '../../rules/dosha/marriageDoshaRules';
import { evaluateKattaPorutham } from '../../rules/jathagam/kattaPoruthamRules';
import { evaluateMudakkuRules } from '../../rules/jathagam/mudakkuRules';
import { evaluateSpecialMarriageRules } from '../../rules/jathagam/specialRulesEngine';
import { evaluateProgenyAndSpecialRules } from '../../rules/jathagam/progenyAndSpecialRulesEngine';
import { evaluateSaaraamsaVidhigal } from '../../rules/jathagam/saaraamsaVidhigalEngine';

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

  // 7. திருமண பொருத்தத்தின் 6 சாராம்ச விதிகள் (6 Essence Manuscript Rules Engine)
  const saaraamsaResult = evaluateSaaraamsaVidhigal(bride, groom);

  // ==========================================
  // COMPREHENSIVE OVERALL % CALCULATION ENGINE
  // ==========================================

  // Module 1: 11 Poruthams (Weight: 30%)
  const poruthamPercent = (totalPoruthamScore / 11) * 100;

  // Module 2: 9 Marriage Doshas & Sevvai Balance (Weight: 15%)
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

  // Module 4: Special Rules & Family Maturity (Weight: 10%)
  let specialPoints = 100;
  if (specialResult.vainasikaAnalysis.isVainasikaDosham) specialPoints -= 50;
  const avgMaturityScore = (specialResult.maturityAnalysis.brideMaturity.score + specialResult.maturityAnalysis.groomMaturity.score) / 2;
  specialPoints = (specialPoints * 0.6) + (avgMaturityScore * 0.4);
  const specialPercent = Math.max(0, Math.min(100, specialPoints));

  // Module 5: Progeny & 5th/9th House (Weight: 15%)
  let progenyPoints = 100;
  if (progenyResult.vainasikaStar.isVainasika22) progenyPoints -= 40;
  const progenyPercent = Math.max(0, progenyPoints);

  // Module 6: சாராம்ச விதிகள் (Weight: 15%)
  const saaraamsaPercent = saaraamsaResult.scorePercent;

  // Weighted Overall Compatibility Percentage (%)
  const overallPercentage = Math.round(
    (poruthamPercent * 0.30) +
    (doshaPercent * 0.15) +
    (kattaPercent * 0.15) +
    (specialPercent * 0.10) +
    (progenyPercent * 0.15) +
    (saaraamsaPercent * 0.15)
  );

  // Grade Classification
  const rajjuFailed = doshaAnalysis.hasRajjuDosha;
  const vedhaFailed = doshaAnalysis.hasVedhaDosha;

  let grade = 'UTTAMAM'; // UTTAMAM, MADHYAMAM, ADHAMAM
  let gradeTa = 'உத்தமம் - திருமணம் செய்யலாம் (Recommended)';
  let gradeEn = 'Uttamam - Highly Recommended';
  let badgeColor = 'emerald';

  if (rajjuFailed || vedhaFailed || overallPercentage < 50 || saaraamsaResult.criticalCount > 0) {
    grade = 'ADHAMAM';
    gradeTa = 'அதமம் - பொருத்தம் இல்லை (Not Recommended)';
    gradeEn = 'Adhamam - Mismatch / Not Recommended';
    badgeColor = 'rose';
  } else if (overallPercentage < 70 || !dhosams9Analysis.isBalanceMatched || saaraamsaResult.warningCount > 1) {
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
  if (saaraamsaResult.criticalCount > 0) {
    warnings.push({ type: 'SAARAAMSA_CRITICAL', msgTa: `🛑 ${saaraamsaResult.overallStatusTa}`, msgEn: `🛑 ${saaraamsaResult.overallStatusEn}` });
  } else if (saaraamsaResult.warningCount > 1) {
    warnings.push({ type: 'SAARAAMSA_WARN', msgTa: `⚠️ ${saaraamsaResult.overallStatusTa}`, msgEn: `⚠️ ${saaraamsaResult.overallStatusEn}` });
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
    saaraamsaResult,
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
        progenyPercent: Math.round(progenyPercent),
        saaraamsaPercent: Math.round(saaraamsaPercent)
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

import { evaluateKujaDosha } from './kujaRules';

export function calculateDoshaAnalysis(bride, groom, poruthamResults) {
  const brideKuja = evaluateKujaDosha(bride);
  const groomKuja = evaluateKujaDosha(groom);

  // Check Rajju & Nadi from poruthamResults
  const rajjuResult = poruthamResults.find(r => r.id === 'RAJJU');
  const vedhaResult = poruthamResults.find(r => r.id === 'VEDHA');
  const nadiResult = poruthamResults.find(r => r.id === 'NADI');

  const hasRajjuDosha = rajjuResult ? rajjuResult.status === 'FAIL' : false;
  const hasVedhaDosha = vedhaResult ? vedhaResult.status === 'FAIL' : false;
  const hasNadiDosha = nadiResult ? nadiResult.status === 'FAIL' : false;

  // Dosha Samyam (Matching Balance for Sevvai)
  let kujaMatchStatus = 'MATCHED';
  let kujaExplanationTa = '';
  let kujaExplanationEn = '';

  if (brideKuja.hasDosha && groomKuja.hasDosha) {
    kujaMatchStatus = 'BOTH_HAVE_DOSHA';
    kujaExplanationTa = 'இருவருக்குமே செவ்வாய் தோஷம் உள்ளது. சம தோஷம் அமைவதால் தோஷ சாம்யம் பொருத்தம் உத்தமம்!';
    kujaExplanationEn = 'Both Bride and Groom have Sevvai Dosha. Excellent Dosha Samyam (Balanced Dosha).';
  } else if (!brideKuja.hasDosha && !groomKuja.hasDosha) {
    kujaMatchStatus = 'NEITHER_HAS_DOSHA';
    kujaExplanationTa = 'இருவருக்குமே செவ்வாய் தோஷம் இல்லை. தோஷ சமநிலை நன்றாக உள்ளது.';
    kujaExplanationEn = 'Neither Bride nor Groom has Sevvai Dosha. Perfectly safe match.';
  } else if (brideKuja.hasDosha && !groomKuja.hasDosha) {
    kujaMatchStatus = 'BRIDE_ONLY';
    kujaExplanationTa = '⚠️ பெண்ணிற்கு செவ்வாய் தோஷம் உள்ளது, ஆணிற்கு இல்லை. தோஷ சமநிலை இல்லை (கவனம் தேவை/பரிகாரம் அவசியம்).';
    kujaExplanationEn = '⚠️ Bride has Sevvai Dosha while Groom does not. Incompatible Dosha balance.';
  } else if (!brideKuja.hasDosha && groomKuja.hasDosha) {
    kujaMatchStatus = 'GROOM_ONLY';
    kujaExplanationTa = '⚠️ ஆணிற்கு செவ்வாய் தோஷம் உள்ளது, பெண்ணிற்கு இல்லை. தோஷ சமநிலை இல்லை (கவனம் தேவை/பரிகாரம் அவசியம்).';
    kujaExplanationEn = '⚠️ Groom has Sevvai Dosha while Bride does not. Incompatible Dosha balance.';
  }

  const criticalDoshasCount = (hasRajjuDosha ? 1 : 0) + (hasVedhaDosha ? 1 : 0) + (hasNadiDosha ? 1 : 0);

  return {
    brideKuja,
    groomKuja,
    kujaMatchStatus,
    kujaExplanationTa,
    kujaExplanationEn,
    hasRajjuDosha,
    hasVedhaDosha,
    hasNadiDosha,
    criticalDoshasCount,
    isSafeForMarriage: !hasRajjuDosha && !hasVedhaDosha && (kujaMatchStatus === 'BOTH_HAVE_DOSHA' || kujaMatchStatus === 'NEITHER_HAS_DOSHA')
  };
}

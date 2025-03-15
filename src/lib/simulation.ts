import {
  SocietalFactor,
  SimulationState,
  DEFAULT_FACTORS,
} from '@/types/simulation';

export function calculateOutcomes(factors: SocietalFactor[]): SimulationState {
  const factorMap = new Map(
    factors.map((f: SocietalFactor) => [f.id, f.value])
  );
  const defaultFactorMap = new Map(
    DEFAULT_FACTORS.map((f: SocietalFactor) => [f.id, f.value])
  );

  // Helper functions
  const optimalRange = (
    value: number,
    min: number,
    max: number,
    context = 50
  ) => {
    return Math.max(
      0,
      Math.min(
        100,
        100 - Math.abs(value - (min + max) / 2) * 2 * (context / 100)
      )
    );
  };

  const diminishingReturns = (value: number, factor = 30) => {
    return Math.max(0, Math.min(100, 100 * (1 - Math.exp(-value / factor))));
  };

  const graduatedPenalty = (
    value: number,
    threshold: number,
    multiplier = 0.5
  ): number => {
    return value > threshold
      ? Math.min(20, (value - threshold) * multiplier)
      : 0;
  };

  // New normalization function that clamps values to 0-100
  const normalizeValue = (value: number) => {
    return Math.max(0, Math.min(100, value));
  };

  // New function to cap negative contributions
  const capNegativeContributions = (value: number) => {
    return Math.max(-50, value);
  };

  // New function to calculate total penalties for storm threshold
  const calculateTotalPenalties = (factorMap: Map<string, number>): number => {
    let total = 0;

    // Core penalties
    total += graduatedPenalty(factorMap.get('corruption') || 0, 50);
    total += graduatedPenalty(factorMap.get('economic-inequality') || 0, 50);
    total += graduatedPenalty(factorMap.get('closed-society') || 0, 50);

    // Crisis penalties
    total += graduatedPenalty(
      factorMap.get('natural-disaster-frequency') || 0,
      70
    );
    total += graduatedPenalty(factorMap.get('domestic-war-risk') || 0, 60);
    total += graduatedPenalty(factorMap.get('self-defense-freedom') || 0, 80);

    // Economic penalties
    total += graduatedPenalty(factorMap.get('currency-inflation') || 0, 70);
    total += graduatedPenalty(factorMap.get('energy-cost') || 0, 60);
    total += graduatedPenalty(factorMap.get('automation-level') || 0, 70);
    total += graduatedPenalty(factorMap.get('public-debt') || 0, 80);

    return total;
  };

  // New function to apply storm threshold
  const applyStormThreshold = (
    value: number,
    totalPenalties: number
  ): number => {
    // Allow full range of values from 0-100
    // No artificial floor - extreme failures can reach 0
    return value;
  };

  // Calculate corruption factor for government programs
  const corruptionFactor = Math.max(
    0.5,
    1 - (factorMap.get('corruption') || 0) / 100
  );

  // Calculate synergies with enhanced weights
  const healthEducationSynergy = Math.min(
    10,
    (((factorMap.get('healthcare') || 0) * (factorMap.get('education') || 0)) /
      100) *
      0.1
  );
  const infrastructureHealthSynergy = Math.min(
    10,
    (((factorMap.get('infrastructure') || 0) *
      (factorMap.get('healthcare') || 0)) /
      100) *
      0.1
  );
  const genderEducationSynergy = Math.min(
    10,
    (((factorMap.get('gender-equality') || 0) *
      (factorMap.get('education') || 0)) /
      100) *
      0.1
  );
  const religiousCohesionSynergy = Math.min(
    10,
    (((factorMap.get('religious-influence') || 0) *
      (factorMap.get('social-cohesion') || 0)) /
      100) *
      0.1
  );
  const techResearchSynergy = Math.min(
    10,
    (((factorMap.get('technological-adoption') || 0) *
      (factorMap.get('research-development') || 0)) /
      100) *
      0.1
  );
  const mediaCohesionSynergy = Math.min(
    10,
    (((factorMap.get('media-freedom') || 0) *
      (factorMap.get('social-cohesion') || 0)) /
      100) *
      0.1
  );

  // Add new synergies for political stability and labor rights
  const politicalStabilitySynergy = Math.min(
    10,
    (((factorMap.get('political-stability') || 0) *
      (factorMap.get('social-cohesion') || 0)) /
      100) *
      0.1
  );
  const laborRightsSynergy = Math.min(
    10,
    (((factorMap.get('labor-rights') || 0) *
      (factorMap.get('economic-inequality') || 0)) /
      100) *
      0.1
  );

  // Calculate political stability effects
  const politicalStabilityEffect = Math.min(
    15,
    (factorMap.get('political-stability') || 0) / 6.67
  );

  // Calculate labor rights effects
  const laborRightsEffect = Math.min(
    15,
    (factorMap.get('labor-rights') || 0) / 6.67
  );

  // Calculate education inequality penalty with capped impact
  const educationInequalityPenalty =
    (factorMap.get('economic-inequality') || 0) > 70
      ? Math.min(10, (factorMap.get('economic-inequality') || 0) / 10)
      : 0;

  // Calculate fantasy effects with tighter caps
  const grapheneProductionEffect = Math.min(
    15,
    (factorMap.get('graphene-production') || 0) / 6.67
  );
  const manaStormEffect = Math.min(
    15,
    (factorMap.get('mana-storm-intensity') || 0) / 6.67
  );
  const thanosSnapEffect = Math.min(
    15,
    ((factorMap.get('thanos-snap-probability') || 0) / 100) * 15
  );
  const godzillaEffect = Math.min(
    15,
    (factorMap.get('godzilla-rampage') || 0) / 6.67
  );
  const jokerChaosEffect = Math.min(
    15,
    (factorMap.get('joker-chaos-index') || 0) / 6.67
  );

  // Calculate economic effects with capped impact
  const inflationEffect = Math.min(
    15,
    (factorMap.get('currency-inflation') || 0) / 6.67
  );
  const energyCostEffect = Math.min(
    15,
    (factorMap.get('energy-cost') || 0) / 6.67
  );
  const automationEffect = Math.min(
    15,
    (factorMap.get('automation-level') || 0) / 6.67
  );
  const publicDebtEffect = Math.min(
    15,
    (factorMap.get('public-debt') || 0) / 6.67
  );

  // Calculate demographic effects with capped impact
  const oneChildPolicyEffect = Math.min(
    15,
    (factorMap.get('one-child-policy') || 0) / 6.67
  );
  const immigrationEffect = Math.min(
    15,
    (factorMap.get('immigration-rate') || 0) / 6.67
  );
  const childLaborEffect = Math.min(
    15,
    (factorMap.get('child-labor') || 0) / 6.67
  );
  const singleParentEffect = Math.min(
    15,
    (factorMap.get('single-parent-household') || 0) / 6.67
  );

  // Calculate total penalties for storm threshold
  const totalPenalties = calculateTotalPenalties(factorMap);

  // Calculate class prosperity with base resilience and storm threshold
  let lowerClassProsperity = applyStormThreshold(
    normalizeValue(
      50 + // Base resilience
        (factorMap.get('government-aid') || 0) * 0.3 * corruptionFactor +
        (factorMap.get('healthcare') || 0) * 0.15 +
        (factorMap.get('education') || 0) * 0.15 +
        (factorMap.get('infrastructure') || 0) * 0.15 +
        (factorMap.get('environmental-regulation') || 0) * 0.15 +
        capNegativeContributions(
          (factorMap.get('corruption') || 0) * -0.15 +
            (factorMap.get('closed-society') || 0) * -0.1 +
            (factorMap.get('media-freedom') || 0) * 0.1 +
            (factorMap.get('gender-equality') || 0) * 0.1 +
            (factorMap.get('religious-influence') || 0) * 0.1 +
            (factorMap.get('self-defense-freedom') || 0) * 0.05 +
            (factorMap.get('tax-rate') || 0) * 0.05 +
            (factorMap.get('economic-inequality') || 0) * -0.15 +
            (factorMap.get('policing-deficiency') || 0) * -0.15 +
            (factorMap.get('housing-cost') || 0) * -0.15 +
            (factorMap.get('unemployment-rate') || 0) * -0.3 +
            (factorMap.get('political-stability') || 0) * 0.1 +
            (factorMap.get('labor-rights') || 0) * 0.15
        ) +
        healthEducationSynergy * 0.5 +
        infrastructureHealthSynergy * 0.5 +
        genderEducationSynergy * 0.5 +
        politicalStabilitySynergy * 0.5 +
        laborRightsSynergy * 0.5 -
        educationInequalityPenalty -
        inflationEffect * 0.2 -
        energyCostEffect * 0.15 -
        automationEffect * 0.15 -
        publicDebtEffect * 0.15 -
        thanosSnapEffect * 0.2 -
        godzillaEffect * 0.15 -
        childLaborEffect * 0.2 -
        singleParentEffect * 0.15 -
        (factorMap.get('natural-disaster-frequency') || 0) * 0.15 -
        (factorMap.get('domestic-war-risk') || 0) * 0.15 -
        // Pandemic effects - higher impact on lower class (2x factor)
        (factorMap.get('public-health-crisis') || 0) * 0.3 +
        grapheneProductionEffect * 0.5
    ),
    totalPenalties
  );

  // Add compounding crisis multiplier for pandemic + unemployment
  const publicHealthCrisis = factorMap.get('public-health-crisis') || 0;
  const unemploymentRate = factorMap.get('unemployment-rate') || 0;
  const compoundingCrisisMultiplier =
    publicHealthCrisis > 50 && unemploymentRate > 50
      ? 1 + (publicHealthCrisis + unemploymentRate - 100) / 200
      : 1;

  // Apply compounding crisis multiplier to lower class
  lowerClassProsperity = Math.max(
    0,
    lowerClassProsperity / compoundingCrisisMultiplier
  );

  const middleClassStability = applyStormThreshold(
    normalizeValue(
      45 + // Base resilience
        capNegativeContributions(
          (factorMap.get('tax-rate') || 0) * -0.12 +
            (factorMap.get('economic-inequality') || 0) * -0.12 +
            (factorMap.get('research-development') || 0) * 0.15 +
            (factorMap.get('infrastructure') || 0) * 0.12 +
            (factorMap.get('education') || 0) * 0.12 +
            (factorMap.get('corruption') || 0) * -0.12 +
            (factorMap.get('closed-society') || 0) * -0.1 +
            (factorMap.get('environmental-regulation') || 0) * 0.1 +
            (factorMap.get('media-freedom') || 0) * 0.1 +
            (factorMap.get('gender-equality') || 0) * 0.1 +
            (factorMap.get('religious-influence') || 0) * 0.1 +
            (factorMap.get('self-defense-freedom') || 0) * 0.05 +
            (factorMap.get('policing-deficiency') || 0) * -0.1 +
            (factorMap.get('housing-cost') || 0) * -0.1 +
            (factorMap.get('unemployment-rate') || 0) * -0.15 +
            (factorMap.get('political-stability') || 0) * 0.15 +
            (factorMap.get('labor-rights') || 0) * 0.1
        ) +
        healthEducationSynergy * 0.5 +
        infrastructureHealthSynergy * 0.5 +
        religiousCohesionSynergy * 0.5 +
        mediaCohesionSynergy * 0.5 +
        politicalStabilitySynergy * 0.5 +
        laborRightsSynergy * 0.5 -
        inflationEffect * 0.15 -
        energyCostEffect * 0.15 -
        automationEffect * 0.1 -
        publicDebtEffect * 0.2 -
        thanosSnapEffect * 0.2 -
        godzillaEffect * 0.15 -
        oneChildPolicyEffect * 0.2 -
        immigrationEffect * 0.15 -
        (factorMap.get('natural-disaster-frequency') || 0) * 0.15 -
        (factorMap.get('domestic-war-risk') || 0) * 0.2 -
        // Pandemic effects - moderate impact on middle class (1.5x factor)
        (factorMap.get('public-health-crisis') || 0) * 0.2 +
        grapheneProductionEffect * 0.4
    ),
    totalPenalties
  );

  // Apply compounding crisis multiplier to middle class (at 0.8x the impact of lower class)
  const middleClassAdjusted = Math.max(
    0,
    middleClassStability / (1 + (compoundingCrisisMultiplier - 1) * 0.8)
  );

  const upperClassWealth = applyStormThreshold(
    normalizeValue(
      40 + // Base resilience
        (factorMap.get('economic-inequality') || 0) * 0.3 +
        (factorMap.get('corruption') || 0) * 0.15 +
        (factorMap.get('research-development') || 0) * 0.15 +
        (factorMap.get('infrastructure') || 0) * 0.1 +
        (factorMap.get('environmental-regulation') || 0) * -0.1 +
        (factorMap.get('domestic-manufacturing') || 0) * 0.15 +
        (factorMap.get('closed-society') || 0) * 0.1 +
        capNegativeContributions(
          (factorMap.get('environmental-regulation') || 0) * -0.1 +
            (factorMap.get('media-freedom') || 0) * -0.1 +
            (factorMap.get('gender-equality') || 0) * -0.05 +
            (factorMap.get('religious-influence') || 0) * 0.1 +
            (factorMap.get('self-defense-freedom') || 0) * 0.15 +
            (factorMap.get('tax-rate') || 0) * -0.15 +
            (factorMap.get('policing-deficiency') || 0) * -0.05 +
            (factorMap.get('housing-cost') || 0) * 0.1 +
            (factorMap.get('political-stability') || 0) * 0.05 +
            (factorMap.get('labor-rights') || 0) * -0.05 +
            (factorMap.get('unemployment-rate') || 0) >
            70
            ? ((factorMap.get('unemployment-rate') || 0) - 70) * -0.05
            : 0
        ) +
        techResearchSynergy * 0.5 +
        religiousCohesionSynergy * 0.5 +
        infrastructureHealthSynergy * 0.5 +
        politicalStabilitySynergy * 0.5 +
        laborRightsSynergy * 0.5 +
        inflationEffect * 0.15 +
        energyCostEffect * 0.1 +
        automationEffect * 0.15 +
        publicDebtEffect * 0.15 +
        thanosSnapEffect * 0.2 -
        godzillaEffect * 0.15 -
        childLaborEffect * 0.1 +
        (factorMap.get('natural-disaster-frequency') || 0) * 0.1 -
        (factorMap.get('domestic-war-risk') || 0) * 0.15 -
        // Pandemic effects - minimal impact on upper class (0.5x factor)
        (factorMap.get('public-health-crisis') || 0) * 0.1 +
        grapheneProductionEffect * 0.5
    ),
    totalPenalties
  );

  // Apply compounding crisis multiplier to upper class (at 0.4x the impact of lower class)
  const upperClassAdjusted = Math.max(
    0,
    upperClassWealth / (1 + (compoundingCrisisMultiplier - 1) * 0.4)
  );

  // Calculate inequality penalty with capped impact
  const inequalityPenalty = Math.min(
    15, // Reduced from 30
    graduatedPenalty(factorMap.get('economic-inequality') || 0, 50) * 0.3
  );

  // Calculate cohesion bonus with capped impact
  const cohesionBonus = Math.min(
    15, // Reduced from 30
    optimalRange(factorMap.get('social-cohesion') || 0, 30, 70) * 0.3
  );

  // Calculate demographic penalty with capped impact
  const demographicPenalty = Math.min(
    15, // Reduced from 30
    graduatedPenalty(oneChildPolicyEffect * 100, 50) * 0.3
  );

  // Calculate immigration bonus/penalty with capped impact
  const immigrationBonus = Math.min(
    15, // Reduced from 20
    optimalRange(immigrationEffect * 100, 30, 70) * 0.3
  );

  // Calculate economic crisis effects with capped impact
  const automationCrisis = Math.min(
    15, // Reduced from 40
    graduatedPenalty(automationEffect * 100, 70) * 0.3
  );
  const energyCrisis = Math.min(
    15, // Reduced from 50
    graduatedPenalty(energyCostEffect * 100, 60) * 0.3
  );

  // Calculate additional crisis effects with capped impact
  const naturalDisasterCrisis = Math.min(
    15, // Reduced from 40
    graduatedPenalty(factorMap.get('natural-disaster-frequency') || 0, 70) * 0.3
  );
  const warRiskCrisis = Math.min(
    15, // Reduced from 50
    graduatedPenalty(factorMap.get('domestic-war-risk') || 0, 60) * 0.3
  );
  const selfDefenseCrisis = Math.min(
    15, // Reduced from 30
    graduatedPenalty(factorMap.get('self-defense-freedom') || 0, 80) * 0.3
  );

  // Calculate final success rate with dynamic scaling and minimum bound
  const scalingFactor = Math.max(
    0.75, // Increased from 0.5
    1 -
      (inequalityPenalty +
        automationCrisis +
        energyCrisis +
        naturalDisasterCrisis +
        warRiskCrisis +
        selfDefenseCrisis) /
        200 // Changed from 100 to 200
  );

  const successRate = normalizeValue(
    (lowerClassProsperity * 0.4 +
      middleClassAdjusted * 0.35 +
      upperClassAdjusted * 0.25) *
      scalingFactor +
      cohesionBonus -
      demographicPenalty +
      immigrationBonus
  );

  // Calculate fantasy effects
  const fantasyEffects = calculateFantasyEffects(factors);

  // Convert factorMap to Record for compatibility with other functions
  const factorRecord: Record<string, number> = {};
  factorMap.forEach((value, key) => {
    factorRecord[key] = value;
  });

  // Use our enhanced determineCurrentState function
  const currentState = determineCurrentState(
    lowerClassProsperity / 100,
    middleClassAdjusted / 100,
    upperClassAdjusted / 100,
    factorRecord,
    fantasyEffects
  );

  // Generate events based on current factors and fantasy effects
  const events = generateEvents(factorRecord, fantasyEffects);

  return {
    factors,
    successRate: Math.round(successRate),
    lowerClassProsperity: Math.round(lowerClassProsperity),
    middleClassStability: Math.round(middleClassAdjusted),
    upperClassWealth: Math.round(upperClassAdjusted),
    currentState,
    events,
  };
}

// Fantasy factor effects
const calculateFantasyEffects = (factors: SocietalFactor[]) => {
  const factorMap = createFactorMap(factors);

  // Natural Disaster Effects
  const disasterImpact = factorMap['natural-disaster-frequency'] / 100;
  const infrastructureDamage = disasterImpact * 0.7;
  const healthcareStrain = disasterImpact * 0.5;
  const lowerClassImpact = disasterImpact * 0.8;

  // Domestic War Risk Effects
  const warRisk = factorMap['domestic-war-risk'] / 100;
  const defenseBoost = warRisk * 0.6;
  const cohesionDamage = warRisk * 0.8;
  const middleClassImpact = warRisk * 0.7;

  // Mana Storm Effects
  const manaIntensity = factorMap['mana-storm-intensity'] / 100;
  const randomFactor = Math.random();
  const manaEffect = (randomFactor - 0.5) * manaIntensity * 2;

  // Thanos Snap Effects
  const snapProbability = factorMap['thanos-snap-probability'] / 100;
  const snapOccurred = Math.random() < snapProbability;
  const snapEffect = snapOccurred ? 0.5 : 1;

  // Godzilla Rampage Effects
  const godzillaFrequency = factorMap['godzilla-rampage'] / 100;
  const infrastructureDamageFromGodzilla = godzillaFrequency * 0.6;
  const defenseBoostFromGodzilla = godzillaFrequency * 0.4;
  const successRatePenalty = godzillaFrequency * 0.3;

  return {
    infrastructureDamage:
      infrastructureDamage + infrastructureDamageFromGodzilla,
    healthcareStrain,
    lowerClassImpact,
    defenseBoost: defenseBoost + defenseBoostFromGodzilla,
    cohesionDamage,
    middleClassImpact,
    manaEffect,
    snapEffect,
    successRatePenalty,
  };
};

// Redistribution system
const redistributeResources = (
  lowerClassProsperity: number,
  middleClassStability: number,
  upperClassWealth: number
) => {
  let newLowerClass = lowerClassProsperity;
  let newMiddleClass = middleClassStability;
  let newUpperClass = upperClassWealth;
  let redistributionPenalty = 0;

  // Upper class redistribution
  if (newUpperClass < 0) {
    const deficit = Math.abs(newUpperClass);
    const middleClassContribution = Math.min(deficit * 0.7, newMiddleClass);
    const lowerClassContribution = Math.min(deficit * 0.3, newLowerClass);

    newUpperClass += middleClassContribution + lowerClassContribution;
    newMiddleClass -= middleClassContribution;
    newLowerClass -= lowerClassContribution;

    redistributionPenalty += deficit * 0.1;
  }

  // Middle class redistribution
  if (newMiddleClass < 0) {
    const deficit = Math.abs(newMiddleClass);
    const lowerClassContribution = Math.min(deficit, newLowerClass);

    newMiddleClass += lowerClassContribution;
    newLowerClass -= lowerClassContribution;

    redistributionPenalty += deficit * 0.15;
  }

  // Lower class redistribution
  if (newLowerClass < 0) {
    const deficit = Math.abs(newLowerClass);
    redistributionPenalty += deficit * 0.2;
    newLowerClass = 0;
  }

  return {
    lowerClassProsperity: Math.max(0, newLowerClass),
    middleClassStability: Math.max(0, newMiddleClass),
    upperClassWealth: Math.max(0, newUpperClass),
    redistributionPenalty,
  };
};

// Update the main simulation function
export const runSimulation = (factors: SocietalFactor[]): SimulationState => {
  const factorMap = createFactorMap(factors);
  const fantasyEffects = calculateFantasyEffects(factors);

  // Calculate base prosperity values with fantasy effects
  let lowerClassProsperity = calculateLowerClassProsperity(factorMap);
  let middleClassStability = calculateMiddleClassStability(factorMap);
  let upperClassWealth = calculateUpperClassWealth(factorMap);

  // Apply fantasy effects
  lowerClassProsperity *= fantasyEffects.snapEffect;
  middleClassStability *= fantasyEffects.snapEffect;
  upperClassWealth *= fantasyEffects.snapEffect;

  lowerClassProsperity -= fantasyEffects.lowerClassImpact;
  middleClassStability -= fantasyEffects.middleClassImpact;
  upperClassWealth += fantasyEffects.manaEffect * 20;

  // Apply pandemic effects differently to each class
  const publicHealthCrisis = factorMap['public-health-crisis'] || 0;
  const unemploymentRate = factorMap['unemployment-rate'] || 0;

  // Calculate compounding crisis multiplier
  const compoundingCrisisMultiplier =
    publicHealthCrisis > 50 && unemploymentRate > 50
      ? 1 + (publicHealthCrisis + unemploymentRate - 100) / 200
      : 1;

  // Apply direct pandemic impacts with class-specific weights
  lowerClassProsperity -= publicHealthCrisis * 0.3; // 2x impact on lower class
  middleClassStability -= publicHealthCrisis * 0.2; // 1.5x impact on middle class
  upperClassWealth -= publicHealthCrisis * 0.1; // 0.5x impact on upper class

  // Apply compounding effects with different sensitivity by class
  lowerClassProsperity = Math.max(
    0,
    lowerClassProsperity / compoundingCrisisMultiplier
  );
  middleClassStability = Math.max(
    0,
    middleClassStability / (1 + (compoundingCrisisMultiplier - 1) * 0.8)
  );
  upperClassWealth = Math.max(
    0,
    upperClassWealth / (1 + (compoundingCrisisMultiplier - 1) * 0.4)
  );

  // Apply redistribution
  const redistributed = redistributeResources(
    lowerClassProsperity,
    middleClassStability,
    upperClassWealth
  );

  // Calculate success rate with redistribution penalty
  const successRate = Math.max(
    0,
    Math.min(
      100,
      calculateSuccessRate(
        redistributed.lowerClassProsperity,
        redistributed.middleClassStability,
        redistributed.upperClassWealth,
        factorMap
      ) -
        redistributed.redistributionPenalty -
        fantasyEffects.successRatePenalty
    )
  );

  // Determine current state with fantasy states
  const currentState = determineCurrentState(
    redistributed.lowerClassProsperity / 100,
    redistributed.middleClassStability / 100,
    redistributed.upperClassWealth / 100,
    factorMap,
    fantasyEffects
  );

  return {
    factors,
    successRate: Math.round(successRate),
    lowerClassProsperity: Math.round(redistributed.lowerClassProsperity),
    middleClassStability: Math.round(redistributed.middleClassStability),
    upperClassWealth: Math.round(redistributed.upperClassWealth),
    currentState,
    events: generateEvents(factorMap, fantasyEffects),
  };
};

// Update state determination to include fantasy states
const determineCurrentState = (
  lowerClassProsperity: number,
  middleClassStability: number,
  upperClassWealth: number,
  factorMap: Record<string, number>,
  fantasyEffects: any
): string => {
  // Fantasy states - enhanced with more creative outcomes
  if (factorMap['mana-storm-intensity'] > 80) {
    return 'Arcane Energy Revolution';
  }
  if (factorMap['mana-storm-intensity'] > 60) {
    return 'Magical Renaissance';
  }
  if (factorMap['thanos-snap-probability'] > 80) {
    return 'Perfectly Balanced Society';
  }
  if (factorMap['thanos-snap-probability'] > 60) {
    return 'Post-Snap Resource Abundance';
  }
  if (factorMap['godzilla-rampage'] > 80) {
    return 'Kaiju-Dominated Landscape';
  }
  if (factorMap['godzilla-rampage'] > 60) {
    return 'Monster Defense Economy';
  }
  if (factorMap['joker-chaos-index'] > 80) {
    return 'Society-Wide Madness';
  }
  if (factorMap['joker-chaos-index'] > 60) {
    return 'Criminal Chaos Reigns';
  }
  if (factorMap['graphene-production'] > 80) {
    return 'Graphene-Powered Utopia';
  }
  if (factorMap['graphene-production'] > 60) {
    return 'Material Science Golden Age';
  }

  // Fantasy combinations
  if (
    factorMap['mana-storm-intensity'] > 60 &&
    factorMap['graphene-production'] > 60
  ) {
    return 'Techno-Magical Civilization';
  }
  if (
    factorMap['godzilla-rampage'] > 60 &&
    factorMap['joker-chaos-index'] > 60
  ) {
    return 'Monster vs Clown Society';
  }
  if (
    factorMap['graphene-production'] > 60 &&
    factorMap['thanos-snap-probability'] > 60
  ) {
    return 'Advanced Tech, Half Population';
  }

  // Previous fantasy checks
  if (fantasyEffects.infrastructureDamage > 0.7) {
    return 'Severe Environmental Crisis';
  }
  if (fantasyEffects.cohesionDamage > 0.7) {
    return 'Full-Scale Civil War';
  }
  if (fantasyEffects.manaEffect > 0.5) {
    return 'Magical Energy Chaos';
  }
  if (fantasyEffects.snapEffect < 0.5) {
    return 'Population Reduction Crisis';
  }
  if (fantasyEffects.successRatePenalty > 0.5) {
    return 'Monster-Induced Chaos';
  }

  // Base states
  if (lowerClassProsperity < 0.3) {
    return 'Lower Class Poverty Crisis';
  }
  if (middleClassStability < 0.3) {
    return 'Middle Class Economic Instability';
  }
  if (upperClassWealth < 0.3) {
    return 'Upper Class Wealth Decline';
  }
  if (factorMap['corruption'] > 70) {
    return 'Widespread Government Corruption';
  }
  if (factorMap['social-cohesion'] < 30) {
    return 'Severe Social Fragmentation';
  }
  if (factorMap['economic-inequality'] > 70) {
    return 'Extreme Economic Inequality';
  }

  return 'Moderately Stable Society';
};

// Update event generation to include fantasy events
const generateEvents = (
  factorMap: Record<string, number>,
  fantasyEffects: any
): string[] => {
  const events: string[] = [];

  // Basic events
  if (fantasyEffects.infrastructureDamage > 0.5) {
    events.push(
      'Natural disasters have caused widespread damage to infrastructure'
    );
  }
  if (fantasyEffects.cohesionDamage > 0.5) {
    events.push('Internal conflicts are threatening social stability');
  }

  // Regular society events based on factor extremes
  if ((factorMap['economic-inequality'] || 0) > 70) {
    events.push('Wealth inequality protests occurring in major cities');
  }

  if ((factorMap['corruption'] || 0) > 70) {
    events.push('Major corruption scandal exposed in government');
  }

  if ((factorMap['tax-rate'] || 0) > 80) {
    events.push('Mass tax protests erupting across the country');
  }

  if ((factorMap['domestic-manufacturing'] || 0) < 20) {
    events.push('Manufacturing sector collapse causing widespread layoffs');
  }

  if ((factorMap['healthcare'] || 0) < 30) {
    events.push(
      'Healthcare system overwhelmed, patients unable to receive care'
    );
  }

  if ((factorMap['education'] || 0) < 30) {
    events.push(
      'Education crisis: students lacking basic resources and teachers'
    );
  }

  if ((factorMap['infrastructure'] || 0) < 30) {
    events.push('Major bridge collapse highlights infrastructure decay');
  }

  if ((factorMap['policing-deficiency'] || 0) > 70) {
    events.push('Crime rates soaring in urban areas with inadequate policing');
  }

  if ((factorMap['housing-cost'] || 0) > 80) {
    events.push(
      'Housing market reaching crisis levels, homelessness rising rapidly'
    );
  }

  if ((factorMap['unemployment-rate'] || 0) > 70) {
    events.push(
      'Unemployment crisis causing social unrest and economic hardship'
    );
  }

  if ((factorMap['political-stability'] || 0) < 30) {
    events.push(
      'Government on verge of collapse amid protests and resignations'
    );
  }

  // Advanced fantasy events (keep existing code)
  if ((factorMap['mana-storm-intensity'] || 0) > 70) {
    events.push('Archmages have seized control of major government positions');
  } else if ((factorMap['mana-storm-intensity'] || 0) > 50) {
    events.push(
      'Magical energy storms have transformed 10% of the population into amateur wizards'
    );
  } else if ((factorMap['mana-storm-intensity'] || 0) > 30) {
    events.push(
      'Spontaneous magical occurrences are disrupting electronic communications'
    );
  }

  if ((factorMap['thanos-snap-probability'] || 0) > 70) {
    events.push(
      'Half the population has mysteriously vanished, but traffic is much better'
    );
  } else if ((factorMap['thanos-snap-probability'] || 0) > 50) {
    events.push('Strange reports of a purple alien collecting colorful stones');
  } else if ((factorMap['thanos-snap-probability'] || 0) > 30) {
    events.push(
      'Infinity Stones detected in the region, housing prices are plummeting'
    );
  }

  if ((factorMap['godzilla-rampage'] || 0) > 70) {
    events.push(
      'Giant monster attacks are now scheduled weekly events with tourism opportunities'
    );
  } else if ((factorMap['godzilla-rampage'] || 0) > 50) {
    events.push(
      'The military has established a Kaiju Defense Force with its own tax bracket'
    );
  } else if ((factorMap['godzilla-rampage'] || 0) > 30) {
    events.push(
      'Unusual seismic activity and radioactive lizard sightings reported offshore'
    );
  }

  if ((factorMap['joker-chaos-index'] || 0) > 70) {
    events.push(
      'Emergency broadcast: Stay inside, avoid wearing makeup, and do not attend any comedy shows'
    );
  } else if ((factorMap['joker-chaos-index'] || 0) > 50) {
    events.push(
      'Citizens advised to temporarily avoid banks, clown shows, and playing card factories'
    );
  } else if ((factorMap['joker-chaos-index'] || 0) > 30) {
    events.push(
      'Unusual increase in crime with "theatrical elements" reported across major cities'
    );
  }

  if ((factorMap['graphene-production'] || 0) > 70) {
    events.push(
      'Breakthrough graphene technology has revolutionized all industries, unemployment at record highs'
    );
  } else if ((factorMap['graphene-production'] || 0) > 50) {
    events.push(
      'Graphene products make up 50% of consumer electronics, causing massive industry shifts'
    );
  } else if ((factorMap['graphene-production'] || 0) > 30) {
    events.push(
      'Early graphene manufacturing has begun to disrupt traditional materials markets'
    );
  }

  // Combination events for extra humor
  if (
    (factorMap['godzilla-rampage'] || 0) > 40 &&
    (factorMap['graphene-production'] || 0) > 40
  ) {
    events.push(
      'New graphene-reinforced buildings withstanding kaiju attacks, insurance rates dropping'
    );
  }

  if (
    (factorMap['joker-chaos-index'] || 0) > 40 &&
    (factorMap['thanos-snap-probability'] || 0) > 40
  ) {
    events.push(
      'Clown sightings down 50% after mysterious disappearance event'
    );
  }

  if (
    (factorMap['mana-storm-intensity'] || 0) > 40 &&
    (factorMap['godzilla-rampage'] || 0) > 40
  ) {
    events.push(
      'Wizards attempting to tame giant monsters with mixed, mostly catastrophic results'
    );
  }

  return events;
};

// Helper function to create a map of factor values
const createFactorMap = (factors: SocietalFactor[]): Record<string, number> => {
  return factors.reduce((acc, factor) => {
    acc[factor.id] = factor.value;
    return acc;
  }, {} as Record<string, number>);
};

// Sigmoid adjustment function to slow movement at extremes
const sigmoidAdjust = (value: number): number => {
  // Sigmoid function that maps 0-100 to 0-100 with compression at ends
  const k = 0.08; // Steepness factor (lower = slower extremes)
  const shifted = value - 50; // Center at 0
  const sigmoid = 1 / (1 + Math.exp(-k * shifted * 4)); // S-curve between 0-1
  return sigmoid * 100; // Scale to 0-100
};

// Calculate prosperity for each class using multiplicative factors and sigmoid adjustment
const calculateLowerClassProsperity = (
  factorMap: Record<string, number>
): number => {
  let prosperity = 50; // Start at base resilience

  // Positive multiplicative factors - each point of factor adds a percentage to the base
  prosperity *= 1 + ((factorMap['government-aid'] || 0) / 100) * 0.6;
  prosperity *= 1 + ((factorMap['healthcare'] || 0) / 100) * 0.4;
  prosperity *= 1 + ((factorMap['education'] || 0) / 100) * 0.4;
  prosperity *= 1 + ((factorMap['infrastructure'] || 0) / 100) * 0.3;
  prosperity *= 1 + ((factorMap['environmental-regulation'] || 0) / 100) * 0.3;
  prosperity *= 1 + ((factorMap['labor-rights'] || 0) / 100) * 0.3;
  prosperity *= 1 + ((factorMap['political-stability'] || 0) / 100) * 0.2;
  prosperity *= 1 + ((factorMap['media-freedom'] || 0) / 100) * 0.2;
  prosperity *= 1 + ((factorMap['gender-equality'] || 0) / 100) * 0.2;

  // Negative multiplicative factors - each point of factor reduces by a percentage
  prosperity *= 1 - ((factorMap['corruption'] || 0) / 100) * 0.4;
  prosperity *= 1 - ((factorMap['economic-inequality'] || 0) / 100) * 0.6;
  prosperity *= 1 - ((factorMap['closed-society'] || 0) / 100) * 0.2;
  prosperity *= 1 - ((factorMap['policing-deficiency'] || 0) / 100) * 0.3;
  prosperity *= 1 - ((factorMap['housing-cost'] || 0) / 100) * 0.3;
  prosperity *= 1 - ((factorMap['unemployment-rate'] || 0) / 100) * 0.6;
  prosperity *= 1 - ((factorMap['domestic-war-risk'] || 0) / 100) * 0.3;
  prosperity *= 1 - ((factorMap['currency-inflation'] || 0) / 100) * 0.3;
  prosperity *= 1 - ((factorMap['public-health-crisis'] || 0) / 100) * 0.6; // Highest impact class

  // Apply compounding crisis multiplier for pandemic + unemployment
  const publicHealthCrisis = factorMap['public-health-crisis'] || 0;
  const unemploymentRate = factorMap['unemployment-rate'] || 0;
  if (publicHealthCrisis > 50 && unemploymentRate > 50) {
    // Compounding effect - hits lower class hardest
    const compoundingFactor =
      (publicHealthCrisis + unemploymentRate - 100) / 200;
    prosperity *= 1 - compoundingFactor * 0.6;
  }

  // Apply sigmoid to slow movement at extremes and clamp between 0-100
  return Math.max(0, Math.min(100, sigmoidAdjust(prosperity)));
};

const calculateMiddleClassStability = (
  factorMap: Record<string, number>
): number => {
  let stability = 50; // Start at base resilience

  // Positive multiplicative factors
  stability *= 1 + ((factorMap['domestic-manufacturing'] || 0) / 100) * 0.6;
  stability *= 1 + ((factorMap['research-development'] || 0) / 100) * 0.4;
  stability *= 1 + ((factorMap['infrastructure'] || 0) / 100) * 0.4;
  stability *= 1 + ((factorMap['education'] || 0) / 100) * 0.3;
  stability *= 1 + ((factorMap['healthcare'] || 0) / 100) * 0.3;
  stability *= 1 + ((factorMap['environmental-regulation'] || 0) / 100) * 0.2;
  stability *= 1 + ((factorMap['political-stability'] || 0) / 100) * 0.3;
  stability *= 1 + ((factorMap['labor-rights'] || 0) / 100) * 0.2;

  // Negative multiplicative factors
  stability *= 1 - ((factorMap['corruption'] || 0) / 100) * 0.3;
  stability *= 1 - ((factorMap['economic-inequality'] || 0) / 100) * 0.4;
  stability *= 1 - ((factorMap['tax-rate'] || 0) / 100) * 0.24;
  stability *= 1 - ((factorMap['closed-society'] || 0) / 100) * 0.2;
  stability *= 1 - ((factorMap['policing-deficiency'] || 0) / 100) * 0.2;
  stability *= 1 - ((factorMap['housing-cost'] || 0) / 100) * 0.2;
  stability *= 1 - ((factorMap['unemployment-rate'] || 0) / 100) * 0.3;
  stability *= 1 - ((factorMap['domestic-war-risk'] || 0) / 100) * 0.4;
  stability *= 1 - ((factorMap['public-health-crisis'] || 0) / 100) * 0.4; // Moderate impact class

  // Apply compounding crisis multiplier
  const publicHealthCrisis = factorMap['public-health-crisis'] || 0;
  const unemploymentRate = factorMap['unemployment-rate'] || 0;
  if (publicHealthCrisis > 50 && unemploymentRate > 50) {
    // Compounding effect - moderate impact on middle class
    const compoundingFactor =
      (publicHealthCrisis + unemploymentRate - 100) / 200;
    stability *= 1 - compoundingFactor * 0.4;
  }

  // Apply sigmoid to slow movement at extremes and clamp between 0-100
  return Math.max(0, Math.min(100, sigmoidAdjust(stability)));
};

const calculateUpperClassWealth = (
  factorMap: Record<string, number>
): number => {
  let wealth = 50; // Start at base resilience

  // Positive multiplicative factors
  wealth *= 1 + ((factorMap['economic-inequality'] || 0) / 100) * 0.6;
  wealth *= 1 + ((factorMap['domestic-manufacturing'] || 0) / 100) * 0.3;
  wealth *= 1 + ((factorMap['research-development'] || 0) / 100) * 0.4;
  wealth *= 1 + ((factorMap['technological-adoption'] || 0) / 100) * 0.4;
  wealth *= 1 + ((factorMap['infrastructure'] || 0) / 100) * 0.2;
  // Upper class benefits from corruption
  wealth *= 1 + ((factorMap['corruption'] || 0) / 100) * 0.3;
  // Some wealth from closed societies
  wealth *= 1 + ((factorMap['closed-society'] || 0) / 100) * 0.2;

  // Negative multiplicative factors
  wealth *= 1 - ((factorMap['tax-rate'] || 0) / 100) * 0.4;
  wealth *= 1 - ((factorMap['environmental-regulation'] || 0) / 100) * 0.2;
  wealth *= 1 - ((factorMap['labor-rights'] || 0) / 100) * 0.15;
  wealth *= 1 - ((factorMap['domestic-war-risk'] || 0) / 100) * 0.3;
  wealth *= 1 - ((factorMap['public-health-crisis'] || 0) / 100) * 0.2; // Lowest impact class

  // Apply compounding crisis multiplier
  const publicHealthCrisis = factorMap['public-health-crisis'] || 0;
  const unemploymentRate = factorMap['unemployment-rate'] || 0;
  if (publicHealthCrisis > 50 && unemploymentRate > 50) {
    // Compounding effect - least impact on upper class
    const compoundingFactor =
      (publicHealthCrisis + unemploymentRate - 100) / 200;
    wealth *= 1 - compoundingFactor * 0.2;
  }

  // Apply sigmoid to slow movement at extremes and clamp between 0-100
  return Math.max(0, Math.min(100, sigmoidAdjust(wealth)));
};

// Calculate overall success rate
const calculateSuccessRate = (
  lowerClassProsperity: number,
  middleClassStability: number,
  upperClassWealth: number,
  factorMap: Record<string, number>
): number => {
  // Calculate the disparity between classes
  const maxDisparity = Math.max(
    Math.abs(upperClassWealth - lowerClassProsperity),
    Math.abs(upperClassWealth - middleClassStability),
    Math.abs(middleClassStability - lowerClassProsperity)
  );

  // Calculate average prosperity of lower and middle classes
  const averageLowerMiddle = (lowerClassProsperity + middleClassStability) / 2;

  // Base success calculation heavily weighted towards lower and middle class wellbeing
  const baseSuccess =
    lowerClassProsperity * 0.45 + // 45% weight - survival and basic needs
    middleClassStability * 0.4 + // 40% weight - economic engine
    upperClassWealth * 0.15; // 15% weight - investment capacity

  // Extreme inequality penalty - severe penalty when upper class hoards wealth
  const extremeInequalityPenalty =
    upperClassWealth > 70 && averageLowerMiddle < 40
      ? Math.min(
          70, // Cap at 70 points
          (upperClassWealth - 70) * 2 + // Penalty for excess upper class wealth
            (40 - averageLowerMiddle) * 1.5 // Additional penalty for poor lower/middle class conditions
        )
      : 0;

  // Failed state penalty - triggers when lower or middle class is extremely low
  const failedStatePenalty =
    Math.min(lowerClassProsperity, middleClassStability) < 20
      ? Math.min(
          40, // Cap at 40 points
          (20 - Math.min(lowerClassProsperity, middleClassStability)) * 2
        )
      : 0;

  // Low class penalty - penalize any class below 30%
  const lowClassPenalty = (classValue: number) =>
    classValue < 30 ? (30 - classValue) * 2.5 : 0;

  const totalLowClassPenalty =
    lowClassPenalty(lowerClassProsperity) * 1.5 + // Higher multiplier for lower class
    lowClassPenalty(middleClassStability) +
    lowClassPenalty(upperClassWealth) * 0.5; // Lower multiplier for upper class

  // Calculate factor penalties with higher weights
  const factorPenalties =
    (factorMap['corruption'] > 50 ? (factorMap['corruption'] - 50) * 0.8 : 0) +
    (factorMap['unemployment-rate'] > 40
      ? (factorMap['unemployment-rate'] - 40) * 0.8
      : 0) +
    (factorMap['housing-cost'] > 60
      ? (factorMap['housing-cost'] - 60) * 0.6
      : 0) +
    (factorMap['domestic-war-risk'] > 30
      ? (factorMap['domestic-war-risk'] - 30) * 0.8
      : 0) +
    (factorMap['currency-inflation'] > 40
      ? (factorMap['currency-inflation'] - 40) * 0.7
      : 0) +
    (factorMap['policing-deficiency'] > 50
      ? (factorMap['policing-deficiency'] - 50) * 0.6
      : 0);

  // Pandemic penalty - direct influence on success rate
  const pandemicPenalty =
    (factorMap['public-health-crisis'] || 0) > 50
      ? (factorMap['public-health-crisis'] - 50) * 0.6
      : 0;

  // Inequality penalty - scales with economic inequality and class disparity
  const inequalityPenalty =
    (factorMap['economic-inequality'] > 50
      ? (factorMap['economic-inequality'] - 50) * 0.6
      : 0) + (maxDisparity > 40 ? (maxDisparity - 40) * 0.8 : 0);

  // Calculate raw uncapped total penalties to detect tipping points
  const rawTotalPenalties =
    extremeInequalityPenalty +
    failedStatePenalty +
    totalLowClassPenalty +
    factorPenalties +
    pandemicPenalty +
    inequalityPenalty;

  // Tipping Point Collapse Multiplier - simulates cascading crises in extreme scenarios
  // Only applies when raw penalties exceed the tipping threshold
  const tippingPointThreshold = 150;
  const collapseMultiplier =
    rawTotalPenalties > tippingPointThreshold
      ? Math.min(2, 1 + (rawTotalPenalties - tippingPointThreshold) / 50)
      : 1;

  // Total capped penalties (with collapse multiplier applied)
  const totalPenalties = Math.min(
    90 * collapseMultiplier, // Allows penalties to exceed 90 in extreme cases
    rawTotalPenalties
  );

  // Scaling factor - more aggressive scaling in collapse scenarios with NO FLOOR
  // This allows truly catastrophic scenarios to reach 0% success
  const scalingFactor = Math.max(
    0, // No minimum - can reach 0 in extreme cases
    1 - totalPenalties / 100
  );

  // Bonuses only apply if not in failed state and inequality isn't extreme
  const isFailedState =
    Math.min(lowerClassProsperity, middleClassStability) < 15; // Reduced threshold
  const hasExtremeInequality = factorMap['economic-inequality'] > 70;

  // Social cohesion bonus - only applies in healthy states
  const socialCohesionBonus =
    !isFailedState && !hasExtremeInequality
      ? Math.min(10, (factorMap['social-cohesion'] || 0) * 0.1)
      : 0;

  // Balance bonus - rewards classes within 25% of each other
  const balanceBonus =
    !isFailedState && maxDisparity < 25
      ? Math.min(15, (25 - maxDisparity) * 0.6)
      : 0;

  // For extremely low class prosperity, apply steep sigmoid penalty
  // to simulate the collapse of society
  let finalRate =
    baseSuccess * scalingFactor +
    (socialCohesionBonus + balanceBonus) -
    totalPenalties;

  // If both lower and middle class are extremely low, apply additional
  // sigmoid penalty to quickly approach 0
  if (lowerClassProsperity < 10 && middleClassStability < 10) {
    const collapseFactor =
      1 - Math.min(1, (lowerClassProsperity + middleClassStability) / 20);
    finalRate *= 1 - collapseFactor * 0.9; // Almost complete reduction for true collapse
  }

  // Calculate final success rate (can now go to 0% in extreme collapse scenarios)
  return Math.max(0, Math.min(100, finalRate));
};

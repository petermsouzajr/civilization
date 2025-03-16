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
    30, // Increased from 15
    (factorMap.get('graphene-production') || 0) / 3.33 // Doubled effect
  );
  const manaStormEffect = Math.min(
    30, // Increased from 15
    (factorMap.get('mana-storm-intensity') || 0) / 3.33 // Doubled effect
  );
  const thanosSnapEffect = Math.min(
    30, // Increased from 15
    ((factorMap.get('thanos-snap-probability') || 0) / 100) * 30 // Doubled effect
  );
  const godzillaEffect = Math.min(
    30, // Increased from 15
    (factorMap.get('godzilla-rampage') || 0) / 3.33 // Doubled effect
  );
  const jokerChaosEffect = Math.min(
    30, // Increased from 15
    (factorMap.get('joker-chaos-index') || 0) / 3.33 // Doubled effect
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
        thanosSnapEffect * 0.5 -
        godzillaEffect * 0.4 -
        jokerChaosEffect * 0.5 -
        childLaborEffect * 0.2 -
        singleParentEffect * 0.15 -
        (factorMap.get('natural-disaster-frequency') || 0) * 0.15 -
        (factorMap.get('domestic-war-risk') || 0) * 0.15 -
        // Pandemic effects - higher impact on lower class (2x factor)
        (factorMap.get('public-health-crisis') || 0) * 0.3 +
        grapheneProductionEffect * 0.6
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

  // Calculate middle class stability
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
        thanosSnapEffect * 0.5 - // Increased from 0.2
        godzillaEffect * 0.4 - // Increased from 0.15
        jokerChaosEffect * 0.4 - // Added direct Joker effect
        oneChildPolicyEffect * 0.2 -
        immigrationEffect * 0.15 -
        (factorMap.get('natural-disaster-frequency') || 0) * 0.15 -
        (factorMap.get('domestic-war-risk') || 0) * 0.2 -
        // Pandemic effects - moderate impact on middle class (1.5x factor)
        (factorMap.get('public-health-crisis') || 0) * 0.2 +
        grapheneProductionEffect * 0.6 // Increased from 0.4
    ),
    totalPenalties
  );

  // Apply compounding crisis multiplier to middle class (at 0.8x the impact of lower class)
  const middleClassAdjusted = Math.max(
    0,
    middleClassStability / (1 + (compoundingCrisisMultiplier - 1) * 0.8)
  );

  // Calculate upper class wealth
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
        thanosSnapEffect * 0.4 - // Increased from 0.2 and negative impact
        godzillaEffect * 0.3 - // Increased from 0.15
        jokerChaosEffect * 0.3 - // Added direct Joker effect
        childLaborEffect * 0.1 +
        (factorMap.get('natural-disaster-frequency') || 0) * 0.1 -
        (factorMap.get('domestic-war-risk') || 0) * 0.15 -
        // Pandemic effects - minimal impact on upper class (0.5x factor)
        (factorMap.get('public-health-crisis') || 0) * 0.1 +
        grapheneProductionEffect * 0.7 // Increased from 0.5
    ),
    totalPenalties
  );

  // Apply compounding crisis multiplier to upper class (at 0.4x the impact of lower class)
  let adjustedUpperClassWealth = Math.max(
    0,
    upperClassWealth / (1 + (compoundingCrisisMultiplier - 1) * 0.4)
  );

  // Modified values for direct fantasy impacts
  let adjustedLowerClassProsperity = lowerClassProsperity;
  let adjustedMiddleClassProsperity = middleClassAdjusted;

  // Create extra adjustment for fantasy effects for more dramatic class changes
  const manaIntensity = factorMap.get('mana-storm-intensity') || 0;
  if (manaIntensity > 60) {
    // Magic benefits upper class most
    adjustedUpperClassWealth += manaIntensity * 0.3;
    adjustedMiddleClassProsperity += manaIntensity * 0.15;
  }

  // Thanos snap reduces all classes dramatically at high levels
  const thanosSnapProb = factorMap.get('thanos-snap-probability') || 0;
  if (thanosSnapProb > 60) {
    const snapReduction = thanosSnapProb * 0.4;
    adjustedLowerClassProsperity = Math.max(
      0,
      adjustedLowerClassProsperity - snapReduction
    );
    adjustedMiddleClassProsperity = Math.max(
      0,
      adjustedMiddleClassProsperity - snapReduction
    );
    adjustedUpperClassWealth = Math.max(
      0,
      adjustedUpperClassWealth - snapReduction
    );
  }

  // Joker chaos impacts all classes but middle class most heavily
  const jokerChaos = factorMap.get('joker-chaos-index') || 0;
  if (jokerChaos > 50) {
    adjustedMiddleClassProsperity = Math.max(
      0,
      adjustedMiddleClassProsperity - jokerChaos * 0.3
    );
    adjustedLowerClassProsperity = Math.max(
      0,
      adjustedLowerClassProsperity - jokerChaos * 0.2
    );
    adjustedUpperClassWealth = Math.max(
      0,
      adjustedUpperClassWealth - jokerChaos * 0.1
    );
  }

  // Graphene production benefits all classes but upper class most significantly
  const graphene = factorMap.get('graphene-production') || 0;
  if (graphene > 40) {
    adjustedUpperClassWealth += graphene * 0.4;
    adjustedMiddleClassProsperity += graphene * 0.3;
    adjustedLowerClassProsperity += graphene * 0.15;
  }

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
    (adjustedLowerClassProsperity * 0.4 +
      adjustedMiddleClassProsperity * 0.35 +
      adjustedUpperClassWealth * 0.25) *
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
    adjustedLowerClassProsperity / 100,
    adjustedMiddleClassProsperity / 100,
    adjustedUpperClassWealth / 100,
    factorRecord,
    fantasyEffects
  );

  // Generate events based on current factors and fantasy effects
  const events = generateEvents(factorRecord, fantasyEffects);

  return {
    factors,
    successRate: Math.round(successRate),
    lowerClassProsperity: Math.round(adjustedLowerClassProsperity),
    middleClassStability: Math.round(adjustedMiddleClassProsperity),
    upperClassWealth: Math.round(adjustedUpperClassWealth),
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
  const manaEffect = (randomFactor - 0.5) * manaIntensity * 3; // Increased from 2

  // Thanos Snap Effects
  const snapProbability = factorMap['thanos-snap-probability'] / 100;
  const snapOccurred = Math.random() < snapProbability;
  const snapEffect = snapOccurred ? 0.3 : 1; // More dramatic effect (0.5 to 0.3)

  // Godzilla Rampage Effects
  const godzillaFrequency = factorMap['godzilla-rampage'] / 100;
  const infrastructureDamageFromGodzilla = godzillaFrequency * 0.9; // Increased from 0.6
  const defenseBoostFromGodzilla = godzillaFrequency * 0.6; // Increased from 0.4
  const successRatePenalty = godzillaFrequency * 0.5; // Increased from 0.3

  // Joker Chaos Effects (New)
  const jokerChaos = factorMap['joker-chaos-index'] / 100;
  const socialCohesionDamage = jokerChaos * 0.9;
  const economicDisruption = jokerChaos * 0.7;

  // Graphene Production Effects (New)
  const grapheneProduction = factorMap['graphene-production'] / 100;
  const economicBoost = grapheneProduction * 0.8;
  const techAdvancement = grapheneProduction * 0.9;

  return {
    infrastructureDamage:
      infrastructureDamage + infrastructureDamageFromGodzilla,
    healthcareStrain,
    lowerClassImpact,
    defenseBoost: defenseBoost + defenseBoostFromGodzilla,
    cohesionDamage: cohesionDamage + socialCohesionDamage,
    middleClassImpact,
    manaEffect,
    snapEffect,
    successRatePenalty,
    economicDisruption, // New
    economicBoost, // New
    techAdvancement, // New
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

  lowerClassProsperity -= fantasyEffects.lowerClassImpact * 40; // Multiplied by 40 instead of using raw value
  middleClassStability -= fantasyEffects.middleClassImpact * 40; // Multiplied by 40 instead of using raw value
  upperClassWealth += fantasyEffects.manaEffect * 35; // Increased from 20

  // Apply Joker and Graphene effects (new)
  lowerClassProsperity -= fantasyEffects.economicDisruption * 30;
  middleClassStability -= fantasyEffects.economicDisruption * 25;

  // Graphene benefits upper and middle classes more
  middleClassStability += fantasyEffects.economicBoost * 25;
  upperClassWealth += fantasyEffects.techAdvancement * 35;

  // Apply godzilla rampage effects more dramatically
  lowerClassProsperity -= (factorMap['godzilla-rampage'] || 0) * 0.4;
  middleClassStability -= (factorMap['godzilla-rampage'] || 0) * 0.3;
  upperClassWealth -= (factorMap['godzilla-rampage'] || 0) * 0.2;

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
    return 'Arcane Flux Reality';
  }
  if (factorMap['mana-storm-intensity'] > 60) {
    return 'Magical Energy Grid';
  }
  if (factorMap['mana-storm-intensity'] > 40) {
    return 'Emerging Spell Economy';
  }

  if (factorMap['thanos-snap-probability'] > 80) {
    return 'Decimated Paradise';
  }
  if (factorMap['thanos-snap-probability'] > 60) {
    return 'Infinity Gauntlet Regime';
  }
  if (factorMap['thanos-snap-probability'] > 40) {
    return 'Half-Empty Cities';
  }

  if (factorMap['godzilla-rampage'] > 80) {
    return 'Kaiju Apocalypse';
  }
  if (factorMap['godzilla-rampage'] > 60) {
    return 'Giant Monster Battleground';
  }
  if (factorMap['godzilla-rampage'] > 40) {
    return 'Coastal Cities Evacuated';
  }

  if (factorMap['joker-chaos-index'] > 80) {
    return 'Total Anarchic Madness';
  }
  if (factorMap['joker-chaos-index'] > 60) {
    return 'Clown Prince Terror State';
  }
  if (factorMap['joker-chaos-index'] > 40) {
    return 'Criminal Carnival Rising';
  }

  if (factorMap['graphene-production'] > 80) {
    return 'Carbon Nanotech Utopia';
  }
  if (factorMap['graphene-production'] > 60) {
    return 'Graphene Industrial Revolution';
  }
  if (factorMap['graphene-production'] > 40) {
    return 'Material Science Breakthrough';
  }

  // Fantasy combinations
  if (
    factorMap['mana-storm-intensity'] > 50 &&
    factorMap['graphene-production'] > 50
  ) {
    return 'Arcane-Enhanced Graphene Age';
  }
  if (
    factorMap['godzilla-rampage'] > 50 &&
    factorMap['joker-chaos-index'] > 50
  ) {
    return 'Kaiju vs Clown Wasteland';
  }
  if (
    factorMap['graphene-production'] > 50 &&
    factorMap['thanos-snap-probability'] > 50
  ) {
    return 'Post-Vanish Tech Singularity';
  }
  if (
    factorMap['mana-storm-intensity'] > 50 &&
    factorMap['thanos-snap-probability'] > 50
  ) {
    return 'Perfectly Balanced Magic';
  }
  if (
    factorMap['godzilla-rampage'] > 50 &&
    factorMap['graphene-production'] > 50
  ) {
    return 'Kaiju-Proof Graphene Cities';
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

  // Advanced fantasy events
  if ((factorMap['mana-storm-intensity'] || 0) > 70) {
    events.push(
      'Magical energy has warped reality - gravity now works sideways on Tuesdays'
    );
    events.push(
      'Council of Archmages has seized control of all major corporations'
    );
  } else if ((factorMap['mana-storm-intensity'] || 0) > 50) {
    events.push(
      'Mana storms have transformed animals into familiars, pet adoption rates skyrocket'
    );
    events.push(
      'Spontaneous spell casting has replaced conventional energy production'
    );
  } else if ((factorMap['mana-storm-intensity'] || 0) > 30) {
    events.push(
      'Strange magical disturbances reported in electronics and power grids'
    );
  }

  if ((factorMap['thanos-snap-probability'] || 0) > 70) {
    events.push(
      'Exactly 50% of population has vanished without explanation - housing market crashes'
    );
    events.push(
      'Resource consumption halved overnight, climate scientists baffled by sudden carbon drop'
    );
  } else if ((factorMap['thanos-snap-probability'] || 0) > 50) {
    events.push(
      'Infinity Gauntlet sightings confirmed by multiple governments'
    );
    events.push(
      'Purple alien dictator declares population reduction "inevitable"'
    );
  } else if ((factorMap['thanos-snap-probability'] || 0) > 30) {
    events.push('Strange reports of people turning to dust then reappearing');
  }

  if ((factorMap['godzilla-rampage'] || 0) > 70) {
    events.push(
      'Major coastal cities abandoned as kaiju territory, inland property values triple'
    );
    events.push(
      'Giant monster tourism industry now 15% of GDP, monster-watching safaris fully booked'
    );
  } else if ((factorMap['godzilla-rampage'] || 0) > 50) {
    events.push(
      'Massive bipedal lizard sightings now routine, evacuation drills mandatory'
    );
    events.push(
      'Government establishes Kaiju Defense Force with largest budget allocation in history'
    );
  } else if ((factorMap['godzilla-rampage'] || 0) > 30) {
    events.push(
      'Unusual radiation signatures detected offshore, Navy reports "reptilian megafauna"'
    );
  }

  if ((factorMap['joker-chaos-index'] || 0) > 70) {
    events.push(
      'Society in complete breakdown as laughing gas attacks hit all major institutions'
    );
    events.push(
      'Currency replaced by playing cards, economy in shambles as Jack outranks Queen'
    );
  } else if ((factorMap['joker-chaos-index'] || 0) > 50) {
    events.push(
      'Clown-themed crimes up 8000%, makeup supplies restricted by federal mandate'
    );
    events.push(
      'Civilian panic growing as public officials keep disappearing after "funny encounters"'
    );
  } else if ((factorMap['joker-chaos-index'] || 0) > 30) {
    events.push(
      'Strange increase in crime statistics involving unusual weapons and practical jokes'
    );
  }

  if ((factorMap['graphene-production'] || 0) > 70) {
    events.push(
      'Carbon-based computing renders silicon obsolete, entire tech industry restructured'
    );
    events.push(
      'Graphene construction transforms architecture - mile-high buildings now commonplace'
    );
  } else if ((factorMap['graphene-production'] || 0) > 50) {
    events.push(
      'Graphene-enhanced products dominate markets, traditional materials industries collapse'
    );
    events.push(
      'Superconducting graphene grid eliminates energy losses, power costs plummet'
    );
  } else if ((factorMap['graphene-production'] || 0) > 30) {
    events.push(
      'Promising graphene applications emerging in electronics and construction sectors'
    );
  }

  // Combination events for extra drama and humor
  if (
    (factorMap['godzilla-rampage'] || 0) > 40 &&
    (factorMap['graphene-production'] || 0) > 40
  ) {
    events.push(
      'Graphene-reinforced buildings survive kaiju attacks, investors rush to monster-proof real estate'
    );
    events.push(
      'Carbon nanotube nets deployed in attempts to capture and study giant monsters'
    );
  }

  if (
    (factorMap['joker-chaos-index'] || 0) > 40 &&
    (factorMap['thanos-snap-probability'] || 0) > 40
  ) {
    events.push(
      'Clown population inexplicably halved, remaining jesters twice as dangerous'
    );
    events.push(
      'Disappeared population returns with strange makeup and purple skin tones'
    );
  }

  if (
    (factorMap['mana-storm-intensity'] || 0) > 40 &&
    (factorMap['godzilla-rampage'] || 0) > 40
  ) {
    events.push(
      'Wizards attempt to control giant monsters using arcane bindings with catastrophic results'
    );
    events.push(
      'Kaiju exposed to mana storms develop elemental breath attacks, property damage increases'
    );
  }

  if (
    (factorMap['mana-storm-intensity'] || 0) > 40 &&
    (factorMap['graphene-production'] || 0) > 40
  ) {
    events.push(
      'Graphene infused with magical properties creates self-repairing infrastructure'
    );
    events.push(
      'Arcane-enhanced carbon nanotubes enabling levitating buildings and transportation'
    );
  }

  if (
    (factorMap['joker-chaos-index'] || 0) > 40 &&
    (factorMap['mana-storm-intensity'] || 0) > 40
  ) {
    events.push(
      'Magical pranksters causing reality distortions, Tuesday now comes after Friday'
    );
    events.push(
      'Laughing spells affect government officials during international summit'
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

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
    multiplier = 1
  ) => {
    return value > threshold
      ? Math.min(30, (value - threshold) * multiplier)
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
  const educationInequalityPenalty =
    (factorMap.get('economic-inequality') || 0) > 70
      ? Math.min(10, (factorMap.get('economic-inequality') || 0) / 10)
      : 0;

  // Calculate fantasy effects with capped impact
  const manaStormEffect = Math.min(
    20,
    (factorMap.get('mana-storm-intensity') || 0) / 5
  );
  const thanosSnapEffect = Math.min(
    30,
    ((factorMap.get('thanos-snap-probability') || 0) / 100) * 30
  );
  const godzillaEffect = Math.min(
    20,
    (factorMap.get('godzilla-rampage') || 0) / 5
  );

  // Calculate economic effects with capped impact
  const inflationEffect = Math.min(
    30,
    (factorMap.get('currency-inflation') || 0) / 3.33
  );
  const energyCostEffect = Math.min(
    25,
    (factorMap.get('energy-cost') || 0) / 4
  );
  const automationEffect = Math.min(
    20,
    (factorMap.get('automation-level') || 0) / 5
  );
  const publicDebtEffect = Math.min(
    25,
    (factorMap.get('public-debt') || 0) / 4
  );

  // Calculate demographic effects with capped impact
  const oneChildPolicyEffect = Math.min(
    30,
    (factorMap.get('one-child-policy') || 0) / 3.33
  );
  const immigrationEffect = Math.min(
    20,
    (factorMap.get('immigration-rate') || 0) / 5
  );
  const childLaborEffect = Math.min(
    30,
    (factorMap.get('child-labor') || 0) / 3.33
  );
  const singleParentEffect = Math.min(
    25,
    (factorMap.get('single-parent-household') || 0) / 4
  );

  // Calculate class prosperity with capped negative contributions
  const lowerClassProsperity = normalizeValue(
    (factorMap.get('government-aid') || 0) * 0.4 * corruptionFactor +
      (factorMap.get('healthcare') || 0) * 0.2 +
      (factorMap.get('education') || 0) * 0.2 +
      (factorMap.get('infrastructure') || 0) * 0.15 +
      (factorMap.get('domestic-manufacturing') || 0) * 0.15 +
      capNegativeContributions(
        (factorMap.get('corruption') || 0) * -0.2 +
          (factorMap.get('closed-society') || 0) * -0.2 +
          (factorMap.get('environmental-protection') || 0) * 0.2 +
          (factorMap.get('media-freedom') || 0) * 0.15 +
          (factorMap.get('gender-equality') || 0) * 0.15 +
          (factorMap.get('religious-influence') || 0) * 0.15 +
          (factorMap.get('self-defense-freedom') || 0) * 0.05 +
          (factorMap.get('tax-rate') || 0) * 0.1 +
          (factorMap.get('economic-inequality') || 0) * -0.2
      ) +
      healthEducationSynergy +
      infrastructureHealthSynergy +
      genderEducationSynergy -
      educationInequalityPenalty -
      inflationEffect * 0.3 -
      energyCostEffect * 0.25 -
      automationEffect * 0.2 -
      publicDebtEffect * 0.25 -
      thanosSnapEffect * 0.3 -
      godzillaEffect * 0.2 -
      childLaborEffect * 0.3 -
      singleParentEffect * 0.25 -
      (factorMap.get('natural-disaster-frequency') || 0) * 0.2 -
      (factorMap.get('domestic-war-risk') || 0) * 0.25
  );

  const middleClassStability = normalizeValue(
    capNegativeContributions(
      (factorMap.get('tax-rate') || 0) * -0.15 +
        (factorMap.get('economic-inequality') || 0) * -0.15 +
        (factorMap.get('research-development') || 0) * 0.2 +
        (factorMap.get('infrastructure') || 0) * 0.15 +
        (factorMap.get('education') || 0) * 0.15 +
        (factorMap.get('corruption') || 0) * -0.2 +
        (factorMap.get('closed-society') || 0) * -0.15 +
        (factorMap.get('environmental-protection') || 0) * 0.15 +
        (factorMap.get('media-freedom') || 0) * 0.15 +
        (factorMap.get('gender-equality') || 0) * 0.15 +
        (factorMap.get('religious-influence') || 0) * 0.15 +
        (factorMap.get('self-defense-freedom') || 0) * 0.1
    ) +
      healthEducationSynergy +
      infrastructureHealthSynergy +
      religiousCohesionSynergy +
      mediaCohesionSynergy -
      inflationEffect * 0.25 -
      energyCostEffect * 0.2 -
      automationEffect * 0.15 +
      publicDebtEffect * 0.3 -
      thanosSnapEffect * 0.3 -
      godzillaEffect * 0.2 -
      oneChildPolicyEffect * 0.3 -
      immigrationEffect * 0.2 -
      (factorMap.get('natural-disaster-frequency') || 0) * 0.25 -
      (factorMap.get('domestic-war-risk') || 0) * 0.3
  );

  const upperClassWealth = normalizeValue(
    (factorMap.get('economic-inequality') || 0) * 0.5 +
      (factorMap.get('corruption') || 0) * 0.25 +
      (factorMap.get('research-development') || 0) * 0.25 +
      (factorMap.get('infrastructure') || 0) * 0.2 +
      (factorMap.get('domestic-manufacturing') || 0) * 0.25 +
      (factorMap.get('closed-society') || 0) * 0.2 +
      capNegativeContributions(
        (factorMap.get('environmental-protection') || 0) * -0.1 +
          (factorMap.get('media-freedom') || 0) * -0.1 +
          (factorMap.get('gender-equality') || 0) * -0.05 +
          (factorMap.get('religious-influence') || 0) * 0.15 +
          (factorMap.get('self-defense-freedom') || 0) * 0.25 +
          (factorMap.get('tax-rate') || 0) * -0.2
      ) +
      techResearchSynergy +
      religiousCohesionSynergy +
      infrastructureHealthSynergy +
      inflationEffect * 0.25 +
      energyCostEffect * 0.15 +
      automationEffect * 0.25 +
      publicDebtEffect * 0.2 +
      thanosSnapEffect * 0.3 -
      godzillaEffect * 0.2 +
      childLaborEffect * 0.15 +
      (factorMap.get('natural-disaster-frequency') || 0) * 0.15 -
      (factorMap.get('domestic-war-risk') || 0) * 0.2
  );

  // Calculate inequality penalty with capped impact
  const inequalityPenalty = Math.min(
    30,
    graduatedPenalty(factorMap.get('economic-inequality') || 0, 50) * 0.5
  );

  // Calculate cohesion bonus with capped impact
  const cohesionBonus = Math.min(
    30,
    optimalRange(factorMap.get('social-cohesion') || 0, 30, 70) * 0.3
  );

  // Calculate demographic penalty with capped impact
  const demographicPenalty = Math.min(
    30,
    graduatedPenalty(oneChildPolicyEffect * 100, 50) * 0.3
  );

  // Calculate immigration bonus/penalty with capped impact
  const immigrationBonus = Math.min(
    20,
    optimalRange(immigrationEffect * 100, 30, 70) * 0.2
  );

  // Calculate economic crisis effects with capped impact
  const automationCrisis = Math.min(
    40,
    graduatedPenalty(automationEffect * 100, 70) * 0.4
  );
  const energyCrisis = Math.min(
    50,
    graduatedPenalty(energyCostEffect * 100, 60) * 0.5
  );

  // Calculate additional crisis effects with capped impact
  const naturalDisasterCrisis = Math.min(
    40,
    graduatedPenalty(factorMap.get('natural-disaster-frequency') || 0, 70) * 0.4
  );
  const warRiskCrisis = Math.min(
    50,
    graduatedPenalty(factorMap.get('domestic-war-risk') || 0, 60) * 0.5
  );
  const selfDefenseCrisis = Math.min(
    30,
    graduatedPenalty(factorMap.get('self-defense-freedom') || 0, 80) * 0.3
  );

  // Calculate final success rate with dynamic scaling and minimum bound
  const scalingFactor = Math.max(
    0.5,
    1 -
      (inequalityPenalty +
        automationCrisis +
        energyCrisis +
        naturalDisasterCrisis +
        warRiskCrisis +
        selfDefenseCrisis) /
        100
  );

  const successRate = normalizeValue(
    (lowerClassProsperity * 0.4 +
      middleClassStability * 0.35 +
      upperClassWealth * 0.25) *
      scalingFactor +
      cohesionBonus -
      demographicPenalty +
      immigrationBonus
  );

  // Determine current state based on success rate and specific conditions
  let currentState = 'Moderately Stable Society';
  if (successRate < 20) {
    currentState = 'Complete Societal Collapse';
  } else if (successRate < 40) {
    currentState = 'Severe Economic Crisis';
  } else if (successRate < 60) {
    currentState = 'Social and Economic Instability';
  } else if (successRate < 80) {
    currentState = 'Moderately Stable Society';
  } else {
    currentState = 'Highly Prosperous Society';
  }

  // Special state conditions with enhanced thresholds
  if ((factorMap.get('joker-chaos-index') || 0) > 80) {
    currentState = 'Complete Societal Anarchy';
  }
  if (oneChildPolicyEffect > 0.8) {
    currentState = 'Severe Demographic Imbalance';
  }
  if (singleParentEffect > 0.8) {
    currentState = 'Family Structure Breakdown';
  }
  if ((factorMap.get('closed-society') || 0) > 80) {
    currentState = 'Total Societal Isolation';
  }
  if ((factorMap.get('closed-society') || 0) > 60) {
    currentState = 'Restricted Social Freedom';
  }
  if (childLaborEffect > 0.7) {
    currentState = 'Widespread Child Labor Crisis';
  }
  if (immigrationEffect > 0.8) {
    currentState = 'Mass Immigration Surge';
  }

  // Add special state conditions for new factors
  if (inflationEffect > 0.7) {
    currentState = 'Severe Hyperinflation Crisis';
  }
  if (energyCostEffect > 0.8) {
    currentState = 'Critical Energy Shortage';
  }
  if (automationEffect > 0.8) {
    currentState = 'Automation-Induced Unemployment';
  }
  if (publicDebtEffect > 0.9) {
    currentState = 'National Debt Collapse';
  }

  return {
    factors,
    successRate: Math.round(successRate),
    lowerClassProsperity: Math.round(lowerClassProsperity),
    middleClassStability: Math.round(middleClassStability),
    upperClassWealth: Math.round(upperClassWealth),
    currentState,
    events: [],
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
    redistributed.lowerClassProsperity,
    redistributed.middleClassStability,
    redistributed.upperClassWealth,
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
  // Fantasy states
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

  if (fantasyEffects.infrastructureDamage > 0.5) {
    events.push(
      'Natural disasters have caused widespread damage to infrastructure'
    );
  }
  if (fantasyEffects.cohesionDamage > 0.5) {
    events.push('Internal conflicts are threatening social stability');
  }
  if (fantasyEffects.manaEffect > 0.3) {
    events.push('Mana storms are causing unpredictable effects across society');
  }
  if (fantasyEffects.snapEffect < 0.5) {
    events.push('A mysterious event has reduced the population');
  }
  if (fantasyEffects.successRatePenalty > 0.3) {
    events.push('Giant creatures are causing widespread destruction');
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

// Calculate prosperity for each class
const calculateLowerClassProsperity = (
  factorMap: Record<string, number>
): number => {
  const baseProsperity =
    (factorMap['government-aid'] * 0.3 +
      factorMap['healthcare'] * 0.2 +
      factorMap['education'] * 0.2 +
      factorMap['infrastructure'] * 0.15 +
      factorMap['media-freedom'] * 0.15) /
    100;

  const penalties =
    (factorMap['corruption'] * 0.4 + factorMap['economic-inequality'] * 0.6) /
    100;

  return Math.max(0, baseProsperity - penalties);
};

const calculateMiddleClassStability = (
  factorMap: Record<string, number>
): number => {
  const baseStability =
    (factorMap['domestic-manufacturing'] * 0.3 +
      factorMap['research-development'] * 0.2 +
      factorMap['infrastructure'] * 0.2 +
      factorMap['education'] * 0.15 +
      factorMap['healthcare'] * 0.15) /
    100;

  const penalties =
    (factorMap['corruption'] * 0.3 + factorMap['economic-inequality'] * 0.4) /
    100;

  return Math.max(0, baseStability - penalties);
};

const calculateUpperClassWealth = (
  factorMap: Record<string, number>
): number => {
  const baseWealth =
    (factorMap['domestic-manufacturing'] * 0.3 +
      factorMap['research-development'] * 0.2 +
      factorMap['technological-adoption'] * 0.2 +
      factorMap['infrastructure'] * 0.15 +
      factorMap['media-freedom'] * 0.15) /
    100;

  const penalties =
    (factorMap['corruption'] * 0.2 + factorMap['tax-rate'] * 0.4) / 100;

  return Math.max(0, baseWealth - penalties);
};

// Calculate overall success rate
const calculateSuccessRate = (
  lowerClassProsperity: number,
  middleClassStability: number,
  upperClassWealth: number,
  factorMap: Record<string, number>
): number => {
  const classBalance =
    lowerClassProsperity * 0.4 +
    middleClassStability * 0.4 +
    upperClassWealth * 0.2;

  const socialCohesionBonus = factorMap['social-cohesion'] / 100;
  const inequalityPenalty = factorMap['economic-inequality'] / 100;

  return Math.max(
    0,
    Math.min(
      100,
      classBalance * 100 + socialCohesionBonus * 20 - inequalityPenalty * 30
    )
  );
};

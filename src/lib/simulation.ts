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
    return 100 - Math.abs(value - (min + max) / 2) * 2 * (context / 100);
  };

  const diminishingReturns = (value: number, factor = 30) => {
    return 100 * (1 - Math.exp(-value / factor));
  };

  const graduatedPenalty = (
    value: number,
    threshold: number,
    multiplier = 1
  ) => {
    return value > threshold
      ? Math.min(20, (value - threshold) * multiplier)
      : 0;
  };

  const normalizeValue = (value: number) => {
    return Math.max(0, Math.min(150, value)) / 1.5;
  };

  // Calculate synergies
  const healthEducationSynergy =
    (((factorMap.get('healthcare') || 0) * (factorMap.get('education') || 0)) /
      100) *
    0.05;
  const infrastructureHealthSynergy =
    (((factorMap.get('infrastructure') || 0) *
      (factorMap.get('healthcare') || 0)) /
      100) *
    0.05;
  const genderEducationSynergy =
    (((factorMap.get('gender-equality') || 0) *
      (factorMap.get('education') || 0)) /
      100) *
    0.05;
  const religiousCohesionSynergy =
    (((factorMap.get('religious-influence') || 0) *
      (factorMap.get('social-cohesion') || 0)) /
      100) *
    0.05;
  const techResearchSynergy =
    (((factorMap.get('technological-adoption') || 0) *
      (factorMap.get('research-development') || 0)) /
      100) *
    0.05;

  // Calculate fantasy effects
  const manaStormEffect = (factorMap.get('mana-storm-intensity') || 0) / 100;
  const thanosSnapEffect =
    (factorMap.get('thanos-snap-probability') || 0) / 100;
  const godzillaEffect = (factorMap.get('godzilla-rampage') || 0) / 100;

  // Calculate governance effectiveness with revised weights
  const governanceEffectiveness = normalizeValue(
    (factorMap.get('media-freedom') || 0) * 0.3 +
      (factorMap.get('infrastructure') || 0) * 0.25 +
      (factorMap.get('education') || 0) * 0.25 +
      (factorMap.get('social-cohesion') || 0) * 0.2 -
      (factorMap.get('corruption') || 0) * 0.15 +
      (factorMap.get('closed-society') || 0) * 0.3 -
      godzillaEffect * 20 -
      thanosSnapEffect * 30
  );

  // Calculate class prosperity with enhanced weights and synergies
  const lowerClassProsperity = normalizeValue(
    (factorMap.get('domestic-manufacturing') || 0) * 0.3 +
      (factorMap.get('government-aid') || 0) *
        0.25 *
        (1 - (factorMap.get('corruption') || 0) / 100) +
      diminishingReturns(factorMap.get('healthcare') || 0, 40) * 0.2 +
      diminishingReturns(factorMap.get('education') || 0, 50) * 0.2 +
      (factorMap.get('infrastructure') || 0) * 0.2 +
      (factorMap.get('environmental-protection') || 0) * 0.15 +
      healthEducationSynergy +
      infrastructureHealthSynergy -
      optimalRange(
        factorMap.get('tax-rate') || 0,
        30,
        50,
        governanceEffectiveness
      ) *
        0.15 -
      graduatedPenalty(factorMap.get('government-aid') || 0, 80, 0.8) -
      graduatedPenalty(100 - (factorMap.get('media-freedom') || 0), 70, 0.4) -
      graduatedPenalty(factorMap.get('domestic-manufacturing') || 0, 70, 0.3) *
        graduatedPenalty(
          100 - (factorMap.get('environmental-protection') || 0),
          70,
          0.3
        ) -
      graduatedPenalty(factorMap.get('corruption') || 0, 50, 0.6) -
      graduatedPenalty(factorMap.get('economic-inequality') || 0, 50, 0.6) +
      graduatedPenalty(factorMap.get('social-cohesion') || 0, 50, 0.15) -
      (factorMap.get('closed-society') || 0) * 0.1 -
      (factorMap.get('single-parent-household') || 0) * 0.1 -
      manaStormEffect * 5 -
      thanosSnapEffect * 30 -
      godzillaEffect * 20
  );

  const middleClassStability = normalizeValue(
    diminishingReturns(factorMap.get('education') || 0, 50) * 0.2 +
      diminishingReturns(factorMap.get('healthcare') || 0, 40) * 0.2 +
      (factorMap.get('infrastructure') || 0) * 0.2 +
      diminishingReturns(factorMap.get('research-development') || 0, 60) *
        0.15 +
      optimalRange(
        factorMap.get('media-freedom') || 0,
        40,
        80,
        governanceEffectiveness
      ) *
        0.15 +
      (factorMap.get('domestic-manufacturing') || 0) * 0.15 +
      optimalRange(
        factorMap.get('tax-rate') || 0,
        30,
        50,
        governanceEffectiveness
      ) *
        0.15 +
      genderEducationSynergy +
      religiousCohesionSynergy -
      graduatedPenalty(
        Math.abs((factorMap.get('government-aid') || 0) - 50),
        30,
        0.4
      ) -
      graduatedPenalty(factorMap.get('self-defense') || 0, 80, 0.3) *
        graduatedPenalty(100 - governanceEffectiveness, 60, 0.3) -
      graduatedPenalty(
        100 - (factorMap.get('environmental-protection') || 0),
        80,
        0.2
      ) -
      graduatedPenalty(factorMap.get('corruption') || 0, 50, 0.5) -
      graduatedPenalty(factorMap.get('economic-inequality') || 0, 50, 0.5) +
      graduatedPenalty(factorMap.get('social-cohesion') || 0, 50, 0.15) +
      (factorMap.get('closed-society') || 0) * 0.05 -
      (factorMap.get('single-parent-household') || 0) * 0.05 +
      manaStormEffect * 10 -
      thanosSnapEffect * 30 -
      godzillaEffect * 10
  );

  const upperClassWealth = normalizeValue(
    (100 - (factorMap.get('domestic-manufacturing') || 0)) * 0.25 +
      diminishingReturns(factorMap.get('research-development') || 0, 60) * 0.2 +
      (factorMap.get('infrastructure') || 0) * 0.15 +
      optimalRange(
        factorMap.get('media-freedom') || 0,
        40,
        80,
        governanceEffectiveness
      ) *
        0.1 +
      (factorMap.get('self-defense') || 0) * 0.1 +
      optimalRange(
        factorMap.get('tax-rate') || 0,
        30,
        50,
        governanceEffectiveness
      ) *
        0.15 +
      techResearchSynergy -
      (factorMap.get('government-aid') || 0) *
        0.15 *
        (1 - (factorMap.get('corruption') || 0) / 100) -
      (factorMap.get('environmental-protection') || 0) * 0.15 -
      graduatedPenalty(factorMap.get('education') || 0, 80, 0.3) -
      graduatedPenalty(factorMap.get('domestic-manufacturing') || 0, 70, 0.3) *
        graduatedPenalty(factorMap.get('research-development') || 0, 60, 0.3) +
      graduatedPenalty(factorMap.get('corruption') || 0, 50, 0.25) +
      graduatedPenalty(factorMap.get('economic-inequality') || 0, 50, 0.35) -
      graduatedPenalty(factorMap.get('social-cohesion') || 0, 50, 0.2) +
      (factorMap.get('closed-society') || 0) * 0.1 +
      manaStormEffect * 15 -
      thanosSnapEffect * 30 -
      godzillaEffect * 5
  );

  // Calculate final success rate with revised scaling
  const successRate = normalizeValue(
    (lowerClassProsperity * 0.4 +
      middleClassStability * 0.35 +
      upperClassWealth * 0.25) *
      0.85
  );

  // Determine current state based on success rate and specific conditions
  let currentState = 'Stable Society';
  if (successRate < 20) {
    currentState = 'Failed State';
  } else if (successRate < 40) {
    currentState = 'Crisis State';
  } else if (successRate < 60) {
    currentState = 'Unstable Society';
  } else if (successRate < 80) {
    currentState = 'Stable Society';
  } else {
    currentState = 'Prosperous Society';
  }

  // Special state conditions
  if ((factorMap.get('joker-chaos-index') || 0) > 80) {
    currentState = 'Gotham Anarchy';
  }
  if ((factorMap.get('one-child-policy') || 0) > 80) {
    currentState = 'Demographic Crisis';
  }
  if ((factorMap.get('single-parent-household') || 0) > 80) {
    currentState = 'Family Structure Crisis';
  }
  if ((factorMap.get('closed-society') || 0) > 80) {
    currentState = 'Isolated Society';
  }
  if ((factorMap.get('closed-society') || 0) > 60) {
    currentState = 'Restricted Society';
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
    return 'Environmental Crisis';
  }
  if (fantasyEffects.cohesionDamage > 0.7) {
    return 'Civil War';
  }
  if (fantasyEffects.manaEffect > 0.5) {
    return 'Planeswalker Chaos';
  }
  if (fantasyEffects.snapEffect < 0.5) {
    return 'Infinity Crisis';
  }
  if (fantasyEffects.successRatePenalty > 0.5) {
    return 'Kaiju Chaos';
  }

  // Base states
  if (lowerClassProsperity < 0.3) {
    return 'Lower Class Crisis';
  }
  if (middleClassStability < 0.3) {
    return 'Middle Class Instability';
  }
  if (upperClassWealth < 0.3) {
    return 'Upper Class Decline';
  }
  if (factorMap['corruption'] > 70) {
    return 'Corrupt State';
  }
  if (factorMap['social-cohesion'] < 30) {
    return 'Social Fragmentation';
  }
  if (factorMap['economic-inequality'] > 70) {
    return 'Economic Oligarchy';
  }

  return 'Stable Society';
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

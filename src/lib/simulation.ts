import { SocietalFactor, SimulationState } from '@/types/simulation';

export function calculateOutcomes(factors: SocietalFactor[]): SimulationState {
  // Create a map of all factors with default values
  const defaultFactorMap: Record<string, number> = {
    'domestic-manufacturing': 50,
    'government-aid': 50,
    healthcare: 50,
    education: 50,
    infrastructure: 50,
    'environmental-protection': 50,
    'tax-rate': 40,
    'media-freedom': 60,
    'self-defense': 50,
    'research-development': 50,
    corruption: 30,
    'social-cohesion': 50,
    'economic-inequality': 50,
    'gender-equality': 50,
    'child-labor': 50,
    'religious-influence': 50,
    'technological-adoption': 50,
    'immigration-rate': 50,
    'natural-disaster-frequency': 30,
    'domestic-war-risk': 20,
    'mana-storm-intensity': 10,
    'thanos-snap-probability': 5,
    'godzilla-rampage': 5,
  };

  // Create factor map with defaults for missing values
  const factorMap = factors.reduce(
    (acc, factor) => {
      acc[factor.id] = factor.value || defaultFactorMap[factor.id] || 50;
      return acc;
    },
    { ...defaultFactorMap }
  );

  // Ensure all required factors exist with valid values
  Object.keys(defaultFactorMap).forEach((key) => {
    if (factorMap[key] === undefined || isNaN(factorMap[key])) {
      factorMap[key] = defaultFactorMap[key];
    }
  });

  // Helper function for optimal range calculations with context
  const optimalRange = (
    value: number,
    min: number,
    max: number,
    context: number = 50
  ) => {
    const mid = (min + max) / 2;
    const contextFactor = context / 100;
    return 100 - Math.abs(value - mid) * 2 * contextFactor;
  };

  // Helper function for diminishing returns - more aggressive curve
  const diminishingReturns = (value: number, factor: number = 30) => {
    return 100 * (1 - Math.exp(-value / factor));
  };

  // Helper function for graduated penalty - reduced multiplier
  const graduatedPenalty = (
    value: number,
    threshold: number,
    multiplier: number = 1
  ) => {
    return value > threshold ? (value - threshold) * multiplier : 0;
  };

  // Helper function to normalize a value between 0 and 100
  const normalizeValue = (value: number): number => {
    return Math.max(0, Math.min(100, value));
  };

  // Calculate synergies between factors
  const healthEducationSynergy =
    (factorMap['healthcare'] * factorMap['education']) / 100;
  const infrastructureHealthSynergy =
    (factorMap['infrastructure'] * factorMap['healthcare']) / 100;
  const educationInfrastructureSynergy =
    (factorMap['education'] * factorMap['infrastructure']) / 100;
  const researchInfrastructureSynergy =
    (factorMap['research-development'] * factorMap['infrastructure']) / 100;
  const mediaSelfDefenseRisk =
    ((100 - factorMap['media-freedom']) * factorMap['self-defense']) / 100;

  // New synergies for new factors
  const genderEducationSynergy =
    (factorMap['gender-equality'] * factorMap['education']) / 100;
  const religionCohesionSynergy =
    (factorMap['religious-influence'] * factorMap['social-cohesion']) / 100;
  const techResearchSynergy =
    (factorMap['technological-adoption'] * factorMap['research-development']) /
    100;
  const immigrationCohesionPenalty =
    factorMap['immigration-rate'] > 50 && factorMap['social-cohesion'] < 40
      ? 15
      : 0;

  // Fantasy factor synergies
  const disasterInfrastructurePenalty =
    (factorMap['natural-disaster-frequency'] *
      (100 - factorMap['infrastructure'])) /
    100;
  const warStabilityPenalty =
    (factorMap['domestic-war-risk'] * (100 - factorMap['social-cohesion'])) /
    100;
  const manaTechBoost =
    (factorMap['mana-storm-intensity'] * factorMap['technological-adoption']) /
    100;
  const thanosPopulationPenalty = factorMap['thanos-snap-probability'] * 50;
  const godzillaInfrastructurePenalty =
    (factorMap['godzilla-rampage'] * (100 - factorMap['infrastructure'])) / 100;

  // Calculate governance effectiveness with corruption and social cohesion
  const governanceEffectiveness =
    (factorMap['media-freedom'] * 0.4 +
      factorMap['infrastructure'] * 0.3 +
      factorMap['education'] * 0.3 -
      factorMap['corruption'] * 0.2 +
      factorMap['social-cohesion'] * 0.2 -
      disasterInfrastructurePenalty * 0.2 -
      warStabilityPenalty * 0.3 -
      godzillaInfrastructurePenalty * 0.2) /
    100;

  // Calculate corruption factor
  const corruptionFactor = 1 - governanceEffectiveness * 0.5;

  // Calculate effective tax revenue (adjusted by corruption)
  const effectiveTaxRevenue =
    factorMap['tax-rate'] * (1 - factorMap['corruption'] / 100);

  // Boost public services based on tax revenue
  const taxFundedHealthcare =
    factorMap['healthcare'] +
    (effectiveTaxRevenue > 50 ? (effectiveTaxRevenue - 50) * 0.3 : 0);
  const taxFundedEducation =
    factorMap['education'] +
    (effectiveTaxRevenue > 50 ? (effectiveTaxRevenue - 50) * 0.3 : 0);
  const taxFundedInfrastructure =
    factorMap['infrastructure'] +
    (effectiveTaxRevenue > 50 ? (effectiveTaxRevenue - 50) * 0.3 : 0);

  // Calculate class prosperity metrics with adjusted weights and normalization
  const lowerClassProsperity = normalizeValue(
    factorMap['domestic-manufacturing'] * 0.2 +
      factorMap['government-aid'] * 0.15 * corruptionFactor +
      diminishingReturns(taxFundedHealthcare, 40) * 0.15 +
      diminishingReturns(taxFundedEducation, 50) * 0.15 +
      taxFundedInfrastructure * 0.15 +
      factorMap['environmental-protection'] * 0.15 -
      optimalRange(factorMap['tax-rate'], 30, 50, governanceEffectiveness) *
        0.15 -
      graduatedPenalty(factorMap['government-aid'], 80, 0.8) -
      graduatedPenalty(100 - factorMap['media-freedom'], 70, 0.4) -
      graduatedPenalty(factorMap['domestic-manufacturing'], 70, 0.3) *
        graduatedPenalty(100 - factorMap['environmental-protection'], 70, 0.3) -
      (factorMap['corruption'] > 50
        ? (factorMap['corruption'] - 50) * 0.6
        : 0) -
      (factorMap['economic-inequality'] > 50
        ? (factorMap['economic-inequality'] - 50) * 0.6
        : 0) +
      (factorMap['social-cohesion'] > 50
        ? (factorMap['social-cohesion'] - 50) * 0.15
        : 0) +
      healthEducationSynergy * 0.05 +
      infrastructureHealthSynergy * 0.05 -
      Math.min(25, disasterInfrastructurePenalty * 0.15) -
      Math.min(25, warStabilityPenalty * 0.2) -
      Math.min(25, thanosPopulationPenalty * 0.25) -
      Math.min(25, godzillaInfrastructurePenalty * 0.15)
  );

  const middleClassStability = normalizeValue(
    diminishingReturns(taxFundedEducation, 50) * 0.15 +
      diminishingReturns(taxFundedHealthcare, 40) * 0.15 +
      taxFundedInfrastructure * 0.15 +
      diminishingReturns(factorMap['research-development'], 60) * 0.15 +
      optimalRange(
        factorMap['media-freedom'],
        40,
        80,
        governanceEffectiveness
      ) *
        0.15 +
      factorMap['domestic-manufacturing'] * 0.15 +
      optimalRange(factorMap['tax-rate'], 30, 50, governanceEffectiveness) *
        0.15 -
      graduatedPenalty(Math.abs(factorMap['government-aid'] - 50), 30, 0.4) -
      graduatedPenalty(factorMap['self-defense'], 80, 0.3) *
        graduatedPenalty(100 - governanceEffectiveness, 60, 0.3) -
      graduatedPenalty(100 - factorMap['environmental-protection'], 80, 0.2) -
      (factorMap['corruption'] > 50
        ? (factorMap['corruption'] - 50) * 0.5
        : 0) -
      (factorMap['economic-inequality'] > 50
        ? (factorMap['economic-inequality'] - 50) * 0.5
        : 0) +
      (factorMap['social-cohesion'] > 50
        ? (factorMap['social-cohesion'] - 50) * 0.15
        : 0) +
      educationInfrastructureSynergy * 0.05 -
      Math.min(25, disasterInfrastructurePenalty * 0.1) -
      Math.min(25, warStabilityPenalty * 0.15) -
      Math.min(25, thanosPopulationPenalty * 0.25) -
      Math.min(25, godzillaInfrastructurePenalty * 0.1)
  );

  const upperClassWealth = normalizeValue(
    (100 - factorMap['domestic-manufacturing']) * 0.15 +
      diminishingReturns(factorMap['research-development'], 60) * 0.15 +
      taxFundedInfrastructure * 0.15 +
      optimalRange(
        factorMap['media-freedom'],
        40,
        80,
        governanceEffectiveness
      ) *
        0.1 +
      factorMap['self-defense'] * 0.1 +
      optimalRange(factorMap['tax-rate'], 30, 50, governanceEffectiveness) *
        0.15 -
      factorMap['government-aid'] * 0.15 * corruptionFactor -
      factorMap['environmental-protection'] * 0.15 -
      graduatedPenalty(factorMap['education'], 80, 0.3) -
      graduatedPenalty(factorMap['domestic-manufacturing'], 70, 0.3) *
        graduatedPenalty(factorMap['research-development'], 60, 0.3) +
      (factorMap['corruption'] > 50
        ? (factorMap['corruption'] - 50) * 0.25
        : 0) +
      (factorMap['economic-inequality'] > 50
        ? (factorMap['economic-inequality'] - 50) * 0.35
        : 0) -
      (factorMap['social-cohesion'] > 50
        ? (factorMap['social-cohesion'] - 50) * 0.2
        : 0) -
      researchInfrastructureSynergy * 0.05 +
      Math.min(15, manaTechBoost * 0.15) -
      Math.min(25, disasterInfrastructurePenalty * 0.05) -
      Math.min(25, warStabilityPenalty * 0.1) -
      Math.min(25, thanosPopulationPenalty * 0.25) -
      Math.min(25, godzillaInfrastructurePenalty * 0.05)
  );

  // Calculate overall success rate with adjusted scaling and normalization
  const inequality =
    Math.max(lowerClassProsperity, middleClassStability, upperClassWealth) -
    Math.min(lowerClassProsperity, middleClassStability, upperClassWealth);
  const inequalityPenalty = graduatedPenalty(inequality, 50, 0.3);
  const cohesionBonus =
    factorMap['social-cohesion'] > 50
      ? (factorMap['social-cohesion'] - 50) * 0.15
      : 0;

  const successRate = normalizeValue(
    (lowerClassProsperity * 0.4 +
      middleClassStability * 0.35 +
      upperClassWealth * 0.25 -
      inequalityPenalty +
      cohesionBonus) *
      0.8 -
      5
  );

  // Determine the current state with more granular conditions
  let currentState = 'Transitional State';
  const events: string[] = [];

  // Class dominance states with more nuanced thresholds
  if (
    lowerClassProsperity > 70 &&
    middleClassStability < 50 &&
    upperClassWealth < 50 &&
    governanceEffectiveness > 0.5
  ) {
    currentState = 'Strong Lower Class Dominance';
  } else if (
    lowerClassProsperity > 60 &&
    middleClassStability < 60 &&
    upperClassWealth < 60 &&
    governanceEffectiveness > 0.4
  ) {
    currentState = 'Moderate Lower Class Dominance';
  } else if (
    lowerClassProsperity > 55 &&
    middleClassStability < 65 &&
    upperClassWealth < 65 &&
    governanceEffectiveness > 0.3
  ) {
    currentState = 'Slight Lower Class Dominance';
  } else if (
    middleClassStability > 70 &&
    lowerClassProsperity < 50 &&
    upperClassWealth < 50 &&
    governanceEffectiveness > 0.5
  ) {
    currentState = 'Strong Middle Class Dominance';
  } else if (
    middleClassStability > 60 &&
    lowerClassProsperity < 60 &&
    upperClassWealth < 60 &&
    governanceEffectiveness > 0.4
  ) {
    currentState = 'Moderate Middle Class Dominance';
  } else if (
    middleClassStability > 55 &&
    lowerClassProsperity < 65 &&
    upperClassWealth < 65 &&
    governanceEffectiveness > 0.3
  ) {
    currentState = 'Slight Middle Class Dominance';
  } else if (
    upperClassWealth > 70 &&
    lowerClassProsperity < 50 &&
    middleClassStability < 50 &&
    governanceEffectiveness > 0.5
  ) {
    currentState = 'Strong Upper Class Dominance';
  } else if (
    upperClassWealth > 60 &&
    lowerClassProsperity < 60 &&
    middleClassStability < 60 &&
    governanceEffectiveness > 0.4
  ) {
    currentState = 'Moderate Upper Class Dominance';
  } else if (
    upperClassWealth > 55 &&
    lowerClassProsperity < 65 &&
    middleClassStability < 65 &&
    governanceEffectiveness > 0.3
  ) {
    currentState = 'Slight Upper Class Dominance';
  }
  // Balance states with governance consideration
  else if (
    Math.abs(lowerClassProsperity - middleClassStability) < 5 &&
    Math.abs(middleClassStability - upperClassWealth) < 5 &&
    Math.abs(lowerClassProsperity - upperClassWealth) < 5 &&
    governanceEffectiveness > 0.6
  ) {
    currentState = 'Perfect Balance';
  } else if (
    Math.abs(lowerClassProsperity - middleClassStability) < 10 &&
    Math.abs(middleClassStability - upperClassWealth) < 10 &&
    Math.abs(lowerClassProsperity - upperClassWealth) < 10 &&
    governanceEffectiveness > 0.5
  ) {
    currentState = 'Near Balance';
  } else if (
    Math.abs(lowerClassProsperity - middleClassStability) < 15 &&
    Math.abs(middleClassStability - upperClassWealth) < 15 &&
    Math.abs(lowerClassProsperity - upperClassWealth) < 15 &&
    governanceEffectiveness > 0.4
  ) {
    currentState = 'Slight Imbalance';
  }
  // Economic states with more specificity
  else if (
    factorMap['domestic-manufacturing'] < 30 &&
    factorMap['government-aid'] < 30 &&
    factorMap['tax-rate'] > 60
  ) {
    currentState = 'Economic Stagnation';
  } else if (
    factorMap['domestic-manufacturing'] > 80 &&
    factorMap['research-development'] > 70 &&
    factorMap['infrastructure'] > 60
  ) {
    currentState = 'Industrial Powerhouse';
  } else if (
    factorMap['research-development'] > 70 &&
    factorMap['infrastructure'] < 40 &&
    factorMap['education'] < 50
  ) {
    currentState = 'Economic Bubble';
  } else if (
    factorMap['domestic-manufacturing'] < 40 &&
    factorMap['government-aid'] > 70 &&
    factorMap['tax-rate'] > 50
  ) {
    currentState = 'Welfare State';
  }
  // Social and political states
  else if (factorMap['healthcare'] < 30 && factorMap['infrastructure'] < 40) {
    currentState = 'Public Health Emergency';
  } else if (factorMap['media-freedom'] < 20 && governanceEffectiveness < 0.2) {
    currentState = 'Authoritarian Regime';
  } else if (factorMap['self-defense'] > 80 && governanceEffectiveness < 0.4) {
    currentState = 'Military Tension';
  } else if (
    factorMap['education'] < 30 &&
    factorMap['research-development'] < 20
  ) {
    currentState = 'Educational Crisis';
  } else if (
    factorMap['infrastructure'] < 30 &&
    factorMap['domestic-manufacturing'] > 60
  ) {
    currentState = 'Infrastructure Decay';
  } else if (factorMap['tax-rate'] > 70 && governanceEffectiveness < 0.5) {
    currentState = 'Tax Revolt';
  } else if (factorMap['tax-rate'] < 20 && governanceEffectiveness < 0.5) {
    currentState = 'Underfunded Services';
  } else if (mediaSelfDefenseRisk > 50) {
    currentState = 'Social Unrest';
  }
  // Advanced societal states
  else if (
    factorMap['research-development'] > 80 &&
    factorMap['education'] > 70 &&
    governanceEffectiveness > 0.6
  ) {
    currentState = 'Technological Boom';
  } else if (
    factorMap['media-freedom'] > 80 &&
    factorMap['education'] > 70 &&
    factorMap['research-development'] > 60
  ) {
    currentState = 'Cultural Renaissance';
  } else if (factorMap['corruption'] > 80 && governanceEffectiveness < 0.3) {
    currentState = 'Corrupt Regime';
  } else if (
    factorMap['social-cohesion'] < 30 &&
    factorMap['economic-inequality'] > 70
  ) {
    currentState = 'Class Conflict';
  } else if (
    factorMap['social-cohesion'] > 80 &&
    factorMap['economic-inequality'] < 30
  ) {
    currentState = 'Harmonious Society';
  }
  // Environmental and sustainability states
  else if (
    factorMap['environmental-protection'] < 20 &&
    factorMap['domestic-manufacturing'] > 70
  ) {
    currentState = 'Environmental Crisis';
  } else if (
    factorMap['environmental-protection'] > 80 &&
    factorMap['domestic-manufacturing'] > 60
  ) {
    currentState = 'Sustainable Development';
  }
  // Governance and institutional states
  else if (
    governanceEffectiveness > 0.8 &&
    factorMap['corruption'] < 20 &&
    factorMap['media-freedom'] > 70
  ) {
    currentState = 'Strong Democratic Institutions';
  } else if (
    governanceEffectiveness < 0.3 &&
    factorMap['corruption'] > 70 &&
    factorMap['media-freedom'] < 30
  ) {
    currentState = 'Failed State';
  }
  // Economic development states
  else if (
    factorMap['domestic-manufacturing'] > 60 &&
    factorMap['education'] > 50 &&
    factorMap['infrastructure'] > 50
  ) {
    currentState = 'Developing Economy';
  } else if (
    factorMap['domestic-manufacturing'] < 40 &&
    factorMap['education'] < 40 &&
    factorMap['infrastructure'] < 40
  ) {
    currentState = 'Underdeveloped Economy';
  }
  // Social welfare states
  else if (
    factorMap['government-aid'] > 70 &&
    factorMap['healthcare'] > 60 &&
    factorMap['education'] > 60
  ) {
    currentState = 'Social Welfare State';
  } else if (
    factorMap['government-aid'] < 30 &&
    factorMap['healthcare'] < 40 &&
    factorMap['education'] < 40
  ) {
    currentState = 'Minimal Welfare State';
  }

  // New state conditions for new factors
  else if (
    factorMap['gender-equality'] < 20 &&
    factorMap['economic-inequality'] > 70
  ) {
    currentState = 'Gender-Based Unrest';
  } else if (factorMap['child-labor'] > 70 && factorMap['education'] < 30) {
    currentState = 'Child Labor Crisis';
  } else if (
    factorMap['religious-influence'] > 80 &&
    factorMap['media-freedom'] < 30
  ) {
    currentState = 'Theocratic Regime';
  } else if (
    factorMap['technological-adoption'] > 80 &&
    factorMap['research-development'] > 70
  ) {
    currentState = 'Technological Boom';
  } else if (
    factorMap['immigration-rate'] > 70 &&
    factorMap['social-cohesion'] < 30
  ) {
    currentState = 'Immigration Crisis';
  }

  return {
    factors,
    successRate: Math.round(successRate),
    lowerClassProsperity: Math.round(lowerClassProsperity),
    middleClassStability: Math.round(middleClassStability),
    upperClassWealth: Math.round(upperClassWealth),
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
    lowerClassProsperity: Math.max(
      0,
      Math.min(100, Math.round(redistributed.lowerClassProsperity))
    ),
    middleClassStability: Math.max(
      0,
      Math.min(100, Math.round(redistributed.middleClassStability))
    ),
    upperClassWealth: Math.max(
      0,
      Math.min(100, Math.round(redistributed.upperClassWealth))
    ),
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

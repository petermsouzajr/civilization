export interface SocietalFactor {
  id: string;
  name: string;
  value: number;
  description: string;
}

export interface SimulationState {
  factors: SocietalFactor[];
  successRate: number;
  lowerClassProsperity: number;
  middleClassStability: number;
  upperClassWealth: number;
  currentState: string;
  events: string[];
}

export const DEFAULT_FACTORS: SocietalFactor[] = [
  // Core Economic Factors
  {
    id: 'domestic-manufacturing',
    name: 'Domestic Manufacturing',
    value: 50,
    description: 'Affects job creation and economic independence',
  },
  {
    id: 'tax-rate',
    name: 'Tax Rate',
    value: 40,
    description: 'Government revenue and wealth distribution',
  },
  {
    id: 'economic-inequality',
    name: 'Economic Inequality',
    value: 50,
    description: 'Wealth distribution and class divides',
  },
  {
    id: 'research-development',
    name: 'Research & Development',
    value: 50,
    description: 'Scientific advancement and innovation',
  },

  // Social Welfare Factors
  {
    id: 'government-aid',
    name: 'Government Aid',
    value: 50,
    description: 'Social welfare and support programs',
  },
  {
    id: 'healthcare',
    name: 'Healthcare Access',
    value: 50,
    description: 'Public health and medical services',
  },
  {
    id: 'education',
    name: 'Education Funding',
    value: 50,
    description: 'Access to quality education and skill development',
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure Investment',
    value: 50,
    description: 'Public works and transportation systems',
  },
  {
    id: 'environmental-protection',
    name: 'Environmental Protection',
    value: 50,
    description: 'Environmental regulations and sustainability',
  },
  {
    id: 'environmental-regulation',
    name: 'Environmental Regulation',
    value: 50,
    description:
      'Government oversight and enforcement of environmental standards',
  },

  // Social and Political Factors
  {
    id: 'media-freedom',
    name: 'Media Freedom',
    value: 60,
    description: 'Press freedom and information access',
  },
  {
    id: 'corruption',
    name: 'Political Corruption',
    value: 30,
    description: 'Government corruption and inefficiency',
  },
  {
    id: 'social-cohesion',
    name: 'Social Cohesion',
    value: 50,
    description: 'Cultural unity and social trust',
  },
  {
    id: 'gender-equality',
    name: 'Gender Equality',
    value: 50,
    description: 'Level of equal opportunities and rights for all genders',
  },
  {
    id: 'religious-influence',
    name: 'Religious Influence',
    value: 50,
    description: 'Role of religion in shaping laws and social norms',
  },

  // Modern Societal Factors
  {
    id: 'closed-society',
    name: 'Closed Society',
    value: 50,
    description:
      'Restricted travel, controlled information, and government-regulated borders.',
  },
  {
    id: 'one-child-policy',
    name: 'One Child Policy',
    description: 'Controls population growth and demographic balance.',
    value: 50,
  },
  {
    id: 'single-parent-household',
    name: 'Single Parent Household',
    description: 'Affects social stability and economic pressure on families.',
    value: 50,
  },
  {
    id: 'immigration-rate',
    name: 'Immigration Rate',
    value: 50,
    description: 'Rate of immigration into society',
  },
  {
    id: 'child-labor',
    name: 'Child Labor',
    value: 50,
    description: 'Prevalence of child labor in the workforce',
  },
  {
    id: 'self-defense',
    name: 'Self-Defense Freedom',
    value: 50,
    description: 'Personal security and civil liberties',
  },

  // Risk and Crisis Factors
  {
    id: 'natural-disaster-frequency',
    name: 'Natural Disaster Frequency',
    value: 30,
    description: 'Frequency and severity of natural disasters',
  },
  {
    id: 'domestic-war-risk',
    name: 'Domestic War Risk',
    value: 20,
    description: 'Risk of internal conflict and civil war',
  },
  {
    id: 'joker-chaos-index',
    name: 'Joker Chaos Index',
    description:
      'Randomly flips media freedom and corruption values (chaos reigns)',
    value: 0,
  },

  // Fantasy Factors
  {
    id: 'mana-storm-intensity',
    name: 'Mana Storm Intensity',
    value: 0,
    description: 'Intensity of magical energy disturbances',
  },
  {
    id: 'thanos-snap-probability',
    name: 'Thanos Snap Probability',
    value: 0,
    description: 'Probability of half the population disappearing',
  },
  {
    id: 'godzilla-rampage',
    name: 'Godzilla Rampage',
    value: 0,
    description: 'Likelihood of giant monster attacks',
  },
];

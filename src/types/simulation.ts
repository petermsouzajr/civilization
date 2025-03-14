export interface SocietalFactor {
  id: string;
  name: string;
  value: number;
  description: string;
  category?: string;
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
    value: 0,
    description: 'Strength of domestic manufacturing sector',
  },
  {
    id: 'tax-rate',
    name: 'Tax Rate',
    value: 0,
    description: 'Overall tax burden on society.',
  },
  {
    id: 'economic-inequality',
    name: 'Economic Inequality',
    value: 0,
    description: 'Gap between rich and poor.',
  },
  {
    id: 'research-development',
    name: 'Research & Development',
    value: 0,
    description:
      'Investment in scientific research and technological development.',
  },
  {
    id: 'currency-inflation',
    name: 'Currency Inflation',
    value: 0,
    description: 'Level of currency inflation',
  },
  {
    id: 'energy-cost',
    name: 'Energy Cost',
    value: 0,
    description: 'Cost of energy resources',
  },
  {
    id: 'automation-level',
    name: 'Automation Level',
    value: 0,
    description: 'Level of workplace automation',
  },
  {
    id: 'public-debt',
    name: 'Public Debt',
    value: 0,
    description: 'Level of public debt',
  },

  // Social Welfare Factors
  {
    id: 'government-aid',
    name: 'Government Aid',
    value: 0,
    description: 'Level of government assistance programs',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    value: 0,
    description: 'Quality and accessibility of healthcare',
  },
  {
    id: 'education',
    name: 'Education',
    value: 0,
    description: 'Quality and accessibility of education',
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    value: 0,
    description: 'Quality of public infrastructure',
  },
  {
    id: 'environmental-protection',
    name: 'Environmental Protection',
    value: 0,
    description: 'Level of environmental regulations',
  },
  {
    id: 'environmental-regulation',
    name: 'Environmental Regulation',
    value: 0,
    description:
      'Government oversight and enforcement of environmental standards',
  },

  // Social and Political Factors
  {
    id: 'media-freedom',
    name: 'Media Freedom',
    value: 0,
    description: 'Level of press and media freedom',
  },
  {
    id: 'corruption',
    name: 'Corruption',
    value: 0,
    description: 'Level of government corruption',
  },
  {
    id: 'social-cohesion',
    name: 'Social Cohesion',
    value: 0,
    description: 'Cultural unity and social trust',
  },
  {
    id: 'gender-equality',
    name: 'Gender Equality',
    value: 0,
    description: 'Level of gender equality in society',
  },
  {
    id: 'religious-influence',
    name: 'Religious Influence',
    value: 0,
    description: 'Influence of religion on society',
  },

  // Modern Societal Factors
  {
    id: 'closed-society',
    name: 'Closed Society',
    value: 0,
    description: 'Level of social restrictions',
  },
  {
    id: 'one-child-policy',
    name: 'One Child Policy',
    value: 0,
    description: 'Strictness of population control',
  },
  {
    id: 'single-parent-household',
    name: 'Single Parent Household',
    value: 0,
    description: 'Rate of single parent households',
  },
  {
    id: 'immigration-rate',
    name: 'Immigration Rate',
    value: 0,
    description: 'Rate of immigration',
  },
  {
    id: 'child-labor',
    name: 'Child Labor',
    value: 0,
    description: 'Prevalence of child labor',
  },
  {
    id: 'self-defense-freedom',
    name: 'Self Defense Freedom',
    value: 0,
    description: 'Level of personal defense rights',
  },

  // Risk and Crisis Factors
  {
    id: 'natural-disaster-frequency',
    name: 'Natural Disaster Frequency',
    value: 0,
    description: 'Frequency of natural disasters',
  },
  {
    id: 'domestic-war-risk',
    name: 'Domestic War Risk',
    value: 0,
    description: 'Risk of internal conflict',
  },
  {
    id: 'joker-chaos-index',
    name: 'Joker Chaos Index',
    value: 0,
    description: 'Level of societal chaos',
  },

  // Fantasy Factors
  {
    id: 'mana-storm-intensity',
    name: 'Mana Storm Intensity',
    value: 0,
    description: 'Intensity of magical energy storms',
  },
  {
    id: 'thanos-snap-probability',
    name: 'Thanos Snap Probability',
    value: 0,
    description: 'Probability of population reduction',
  },
  {
    id: 'godzilla-rampage',
    name: 'Godzilla Rampage',
    value: 0,
    description: 'Frequency of giant monster attacks',
  },
  {
    id: 'policing-deficiency',
    name: 'Policing Deficiency',
    value: 30,
    description:
      'Lack of law enforcement increases crime and reduces public safety.',
    category: 'Social Welfare',
  },
  {
    id: 'housing-cost',
    name: 'Housing Cost',
    value: 40,
    description:
      'Rising housing costs strain affordability and economic stability.',
    category: 'Economic',
  },
];

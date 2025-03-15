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
    category: 'Economic',
  },
  {
    id: 'tax-rate',
    name: 'Tax Rate',
    value: 0,
    description: 'Overall tax burden on society.',
    category: 'Economic',
  },
  {
    id: 'economic-inequality',
    name: 'Economic Inequality',
    value: 0,
    description: 'Gap between rich and poor.',
    category: 'Economic',
  },
  {
    id: 'currency-inflation',
    name: 'Currency Inflation',
    value: 0,
    description: 'Level of currency inflation',
    category: 'Economic',
  },
  {
    id: 'energy-cost',
    name: 'Energy Cost',
    value: 0,
    description: 'Cost of energy resources',
    category: 'Economic',
  },
  {
    id: 'public-debt',
    name: 'Public Debt',
    value: 0,
    description: 'Level of public debt',
    category: 'Economic',
  },
  {
    id: 'housing-cost',
    name: 'Housing Cost',
    value: 40,
    description:
      'Rising housing costs strain affordability and economic stability.',
    category: 'Economic',
  },
  {
    id: 'unemployment-rate',
    name: 'Unemployment Rate',
    value: 10,
    description: 'Percentage of workforce without jobs',
    category: 'Economic',
  },

  // Social Welfare Factors
  {
    id: 'government-aid',
    name: 'Government Aid',
    value: 0,
    description: 'Level of government assistance programs',
    category: 'Social Welfare',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    value: 0,
    description: 'Quality and accessibility of healthcare',
    category: 'Social Welfare',
  },
  {
    id: 'education',
    name: 'Education',
    value: 0,
    description: 'Quality and accessibility of education',
    category: 'Social Welfare',
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    value: 0,
    description: 'Quality of public infrastructure',
    category: 'Social Welfare',
  },
  {
    id: 'policing-deficiency',
    name: 'Policing Deficiency',
    value: 30,
    description:
      'Lack of law enforcement increases crime and reduces public safety.',
    category: 'Social Welfare',
  },

  // Social and Political Factors
  {
    id: 'media-freedom',
    name: 'Media Freedom',
    value: 0,
    description: 'Level of press and media freedom',
    category: 'Social',
  },
  {
    id: 'corruption',
    name: 'Corruption',
    value: 0,
    description: 'Level of government corruption',
    category: 'Social',
  },
  {
    id: 'social-cohesion',
    name: 'Social Cohesion',
    value: 0,
    description: 'Cultural unity and social trust',
    category: 'Social',
  },
  {
    id: 'gender-equality',
    name: 'Gender Equality',
    value: 0,
    description: 'Level of gender equality in society',
    category: 'Social',
  },
  {
    id: 'religious-influence',
    name: 'Religious Influence',
    value: 0,
    description: 'Influence of religion on society',
    category: 'Social',
  },

  // Environmental and Risk Factors
  {
    id: 'environmental-protection',
    name: 'Environmental Protection',
    value: 0,
    description: 'Level of environmental regulations',
    category: 'Environmental',
  },
  {
    id: 'environmental-regulation',
    name: 'Environmental Regulation',
    value: 0,
    description:
      'Government oversight and enforcement of environmental standards',
    category: 'Environmental',
  },
  {
    id: 'natural-disaster-frequency',
    name: 'Natural Disaster Frequency',
    value: 0,
    description: 'Frequency of natural disasters',
    category: 'Risk',
  },
  {
    id: 'domestic-war-risk',
    name: 'Domestic War Risk',
    value: 0,
    description: 'Risk of internal conflict',
    category: 'Risk',
  },

  // Modern Societal Factors
  {
    id: 'closed-society',
    name: 'Closed Society',
    value: 0,
    description: 'Level of social restrictions',
    category: 'Modern',
  },
  {
    id: 'one-child-policy',
    name: 'One Child Policy',
    value: 0,
    description: 'Strictness of population control',
    category: 'Modern',
  },
  {
    id: 'single-parent-household',
    name: 'Single Parent Household',
    value: 0,
    description: 'Rate of single parent households',
    category: 'Modern',
  },
  {
    id: 'immigration-rate',
    name: 'Immigration Rate',
    value: 0,
    description: 'Rate of immigration',
    category: 'Modern',
  },
  {
    id: 'child-labor',
    name: 'Child Labor',
    value: 0,
    description: 'Prevalence of child labor',
    category: 'Modern',
  },
  {
    id: 'self-defense-freedom',
    name: 'Self Defense Freedom',
    value: 0,
    description: 'Level of personal defense rights',
    category: 'Modern',
  },

  // Fantasy Factors (at the bottom)
  {
    id: 'mana-storm-intensity',
    name: 'Mana Storm Intensity',
    value: 0,
    description: 'Intensity of magical energy storms',
    category: 'Fantasy',
  },
  {
    id: 'thanos-snap-probability',
    name: 'Thanos Snap Probability',
    value: 0,
    description: 'Probability of population reduction',
    category: 'Fantasy',
  },
  {
    id: 'godzilla-rampage',
    name: 'Godzilla Rampage',
    value: 0,
    description: 'Frequency of giant monster attacks',
    category: 'Fantasy',
  },
  {
    id: 'joker-chaos-index',
    name: 'Joker Chaos Index',
    value: 0,
    description: 'Level of societal chaos',
    category: 'Fantasy',
  },
];

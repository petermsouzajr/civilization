import { SocietalFactor } from '@/types/simulation';

export const mockFactors: SocietalFactor[] = [
  {
    id: 'corruption',
    name: 'Corruption',
    description: 'Level of corruption',
    value: 50,
  },
  {
    id: 'economic-inequality',
    name: 'Economic Inequality',
    description: 'Wealth gap',
    value: 50,
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Education quality',
    value: 50,
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Healthcare access',
    value: 50,
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    description: 'Infrastructure quality',
    value: 50,
  },
  {
    id: 'social-cohesion',
    name: 'Social Cohesion',
    description: 'Social unity',
    value: 50,
  },
  {
    id: 'public-health-crisis',
    name: 'Public Health Crisis',
    description: 'Health emergency',
    value: 0,
  },
  {
    id: 'unemployment-rate',
    name: 'Unemployment Rate',
    description: 'Jobless rate',
    value: 50,
  },
  {
    id: 'currency-inflation',
    name: 'Currency Inflation',
    description: 'Money devaluation',
    value: 50,
  },
  {
    id: 'domestic-war-risk',
    name: 'Domestic War Risk',
    description: 'Civil conflict risk',
    value: 0,
  },
  {
    id: 'child-labor',
    name: 'Child Labor',
    description: 'Child exploitation',
    value: 0,
  },
  {
    id: 'immigration-rate',
    name: 'Immigration Rate',
    description: 'Immigration level',
    value: 50,
  },
  {
    id: 'thanos-snap-probability',
    name: 'Thanos Snap',
    description: 'Population reduction',
    value: 0,
  },
  {
    id: 'joker-chaos-index',
    name: 'Joker Chaos',
    description: 'Social disorder',
    value: 0,
  },
  {
    id: 'godzilla-rampage',
    name: 'Godzilla Rampage',
    description: 'Monster attacks',
    value: 0,
  },
  {
    id: 'mana-storm-intensity',
    name: 'Mana Storms',
    description: 'Magical disruption',
    value: 0,
  },
  {
    id: 'graphene-production',
    name: 'Graphene Production',
    description: 'Advanced materials',
    value: 0,
  },
];

export const createTestFactors = (
  overrides: Record<string, number> = {}
): SocietalFactor[] => {
  return mockFactors.map((factor) => ({
    ...factor,
    value:
      overrides[factor.id] !== undefined ? overrides[factor.id] : factor.value,
  }));
};

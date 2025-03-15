import {
  calculateOutcomes,
  calculateFantasyEffects,
  determineCurrentState,
  generateEvents,
} from '../simulation';
import { SocietalFactor } from '@/types/simulation';
import { createTestFactors } from './setup';

describe('Simulation Calculations', () => {
  describe('Basic Calculations', () => {
    test('should return values within valid ranges', () => {
      const result = calculateOutcomes(createTestFactors());

      expect(result.successRate).toBeGreaterThanOrEqual(0);
      expect(result.successRate).toBeLessThanOrEqual(100);
      expect(result.lowerClassProsperity).toBeGreaterThanOrEqual(0);
      expect(result.lowerClassProsperity).toBeLessThanOrEqual(100);
      expect(result.middleClassStability).toBeGreaterThanOrEqual(0);
      expect(result.middleClassStability).toBeLessThanOrEqual(100);
      expect(result.upperClassWealth).toBeGreaterThanOrEqual(0);
      expect(result.upperClassWealth).toBeLessThanOrEqual(100);
    });

    test('extreme corruption should significantly reduce success rate', () => {
      const normalResult = calculateOutcomes(createTestFactors());
      const highCorruptionResult = calculateOutcomes(
        createTestFactors({ corruption: 100 })
      );

      expect(highCorruptionResult.successRate).toBeLessThan(
        normalResult.successRate
      );
      expect(highCorruptionResult.successRate).toBeLessThan(
        normalResult.successRate * 0.7
      );
    });

    test('perfect conditions should yield high success rates', () => {
      const perfectFactors = createTestFactors({
        corruption: 0,
        'economic-inequality': 20,
        education: 100,
        healthcare: 100,
        infrastructure: 100,
        'social-cohesion': 100,
      });

      const result = calculateOutcomes(perfectFactors);
      expect(result.successRate).toBeGreaterThan(80);
    });
  });

  describe('Fantasy Effects', () => {
    test('thanos snap should dramatically reduce all metrics', () => {
      const normalResult = calculateOutcomes(createTestFactors());
      const thanosResult = calculateOutcomes(
        createTestFactors({
          'thanos-snap-probability': 100,
        })
      );

      expect(thanosResult.lowerClassProsperity).toBeLessThan(
        normalResult.lowerClassProsperity * 0.6
      );
      expect(thanosResult.middleClassStability).toBeLessThan(
        normalResult.middleClassStability * 0.6
      );
      expect(thanosResult.upperClassWealth).toBeLessThan(
        normalResult.upperClassWealth * 0.6
      );
    });

    test('joker chaos should create significant instability', () => {
      const result = calculateOutcomes(
        createTestFactors({
          'joker-chaos-index': 100,
        })
      );

      expect(result.successRate).toBeLessThan(50);
      expect(result.currentState).toMatch(/chaos|crisis|collapse/i);
    });

    test('multiple fantasy effects should compound', () => {
      const result = calculateOutcomes(
        createTestFactors({
          'joker-chaos-index': 100,
          'godzilla-rampage': 100,
          'mana-storm-intensity': 100,
        })
      );

      expect(result.successRate).toBeLessThan(30);
      expect(result.events.length).toBeGreaterThan(3);
    });
  });

  describe('Crisis Combinations', () => {
    test('multiple crises should compound negatively', () => {
      const singleCrisisResult = calculateOutcomes(
        createTestFactors({
          'public-health-crisis': 100,
        })
      );

      const multipleCrisisResult = calculateOutcomes(
        createTestFactors({
          'public-health-crisis': 100,
          'unemployment-rate': 100,
          'domestic-war-risk': 100,
        })
      );

      expect(multipleCrisisResult.successRate).toBeLessThan(
        singleCrisisResult.successRate * 0.5
      );
    });

    test('crisis impact should vary by social class', () => {
      const result = calculateOutcomes(
        createTestFactors({
          'public-health-crisis': 100,
          'unemployment-rate': 100,
        })
      );

      // Lower class should be hit hardest
      expect(result.lowerClassProsperity).toBeLessThan(
        result.middleClassStability
      );
      expect(result.middleClassStability).toBeLessThan(result.upperClassWealth);
    });
  });

  describe('Economic Factors', () => {
    test('high inflation should affect lower class more than upper class', () => {
      const result = calculateOutcomes(
        createTestFactors({
          'currency-inflation': 100,
        })
      );

      const lowerClassImpact = result.lowerClassProsperity;
      const upperClassImpact = result.upperClassWealth;

      expect(lowerClassImpact).toBeLessThan(upperClassImpact);
    });

    test('automation should benefit upper class while harming lower class', () => {
      const result = calculateOutcomes(
        createTestFactors({
          'automation-level': 100,
        })
      );

      expect(result.upperClassWealth).toBeGreaterThan(60);
      expect(result.lowerClassProsperity).toBeLessThan(40);
    });
  });

  describe('Social Policies', () => {
    test('child labor should harm society overall', () => {
      const result = calculateOutcomes(
        createTestFactors({
          'child-labor': 100,
        })
      );

      expect(result.successRate).toBeLessThan(50);
      expect(result.lowerClassProsperity).toBeLessThan(40);
      expect(result.events).toEqual(
        expect.arrayContaining([
          expect.stringMatching(/child|labor|exploitation/i),
        ])
      );
    });

    test('immigration should provide economic benefits', () => {
      const result = calculateOutcomes(
        createTestFactors({
          'immigration-rate': 70,
        })
      );

      expect(result.successRate).toBeGreaterThan(50);
      expect(result.events).toEqual(
        expect.arrayContaining([
          expect.stringMatching(/immigration|workforce|growth/i),
        ])
      );
    });
  });

  describe('Event Generation', () => {
    test('should generate appropriate events for crises', () => {
      const result = calculateOutcomes(
        createTestFactors({
          'public-health-crisis': 90,
          'unemployment-rate': 80,
        })
      );

      expect(result.events.length).toBeGreaterThan(0);
      expect(result.events).toEqual(
        expect.arrayContaining([
          expect.stringMatching(/health|crisis|unemployment/i),
        ])
      );
    });

    test('should generate multiple events for compound crises', () => {
      const result = calculateOutcomes(
        createTestFactors({
          'public-health-crisis': 90,
          'unemployment-rate': 80,
          'currency-inflation': 70,
          'domestic-war-risk': 60,
        })
      );

      expect(result.events.length).toBeGreaterThan(3);
    });
  });
});

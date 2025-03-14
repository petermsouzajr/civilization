'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { DEFAULT_FACTORS, SocietalFactor } from '@/types/simulation';
import { calculateOutcomes } from '@/lib/simulation';
import { PRESETS } from '@/types/presets';
import { cn } from '@/lib/utils';

const PRESET_COLORS = {
  'Balanced Society':
    'bg-blue-100 hover:bg-blue-200 text-gray-900 border-blue-300',
  'Lower Class Focus':
    'bg-green-100 hover:bg-green-200 text-gray-900 border-green-300',
  'Middle Class Focus':
    'bg-purple-100 hover:bg-purple-200 text-gray-900 border-purple-300',
  'Upper Class Focus':
    'bg-yellow-100 hover:bg-yellow-200 text-gray-900 border-yellow-300',
  'Militant Society':
    'bg-red-100 hover:bg-red-200 text-gray-900 border-red-300',
  'Socialist State':
    'bg-orange-100 hover:bg-orange-200 text-gray-900 border-orange-300',
  'Great Depression':
    'bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300',
  'Collapse of Venezuela':
    'bg-red-200 hover:bg-red-300 text-gray-900 border-red-400',
  'French Revolution':
    'bg-indigo-100 hover:bg-indigo-200 text-gray-900 border-indigo-300',
  'Industrial Revolution':
    'bg-amber-100 hover:bg-amber-200 text-gray-900 border-amber-300',
  'Fall of Soviet Union':
    'bg-teal-100 hover:bg-teal-200 text-gray-900 border-teal-300',
  'Post-WWII Boom':
    'bg-emerald-100 hover:bg-emerald-200 text-gray-900 border-emerald-300',
};

const getStatusColor = (state: string) => {
  // Define a mapping of states to their colors
  const stateColors: { [key: string]: string } = {
    // Lower Class States - Green spectrum
    'Strong Lower Class Dominance': 'bg-green-200 border-green-400',
    'Moderate Lower Class Dominance': 'bg-green-100 border-green-300',
    'Slight Lower Class Dominance': 'bg-green-50 border-green-200',

    // Middle Class States - Purple spectrum
    'Strong Middle Class Dominance': 'bg-purple-200 border-purple-400',
    'Moderate Middle Class Dominance': 'bg-purple-100 border-purple-300',
    'Slight Middle Class Dominance': 'bg-purple-50 border-purple-200',

    // Upper Class States - Yellow spectrum
    'Strong Upper Class Dominance': 'bg-yellow-200 border-yellow-400',
    'Moderate Upper Class Dominance': 'bg-yellow-100 border-yellow-300',
    'Slight Upper Class Dominance': 'bg-yellow-50 border-yellow-200',

    // Balance States - Blue spectrum
    'Perfect Balance': 'bg-blue-200 border-blue-400',
    'Near Balance': 'bg-blue-100 border-blue-300',
    'Slight Imbalance': 'bg-blue-50 border-blue-200',

    // Crisis States - Red spectrum
    'Public Health Emergency': 'bg-red-200 border-red-400',
    'Military Tension': 'bg-red-100 border-red-300',
    'Social Unrest': 'bg-red-50 border-red-200',
    'Class Conflict': 'bg-red-300 border-red-500',

    // Economic States - Orange spectrum
    'Economic Stagnation': 'bg-orange-200 border-orange-400',
    'Tax Revolt': 'bg-orange-300 border-orange-500',
    'Underfunded Services': 'bg-orange-100 border-orange-300',
    'Economic Bubble': 'bg-orange-300 border-orange-500',

    // Educational States - Purple spectrum
    'Educational Crisis': 'bg-purple-200 border-purple-400',

    // Infrastructure States - Gray spectrum
    'Infrastructure Decay': 'bg-gray-200 border-gray-400',

    // Authoritarian States - Dark spectrum
    'Authoritarian Regime': 'bg-gray-800 border-gray-900',
    'Corrupt Regime': 'bg-gray-700 border-gray-800',

    // Positive States - Emerald spectrum
    'Technological Boom': 'bg-emerald-200 border-emerald-400',
    'Cultural Renaissance': 'bg-emerald-300 border-emerald-500',
    'Harmonious Society': 'bg-emerald-400 border-emerald-600',
    'Stable Society': 'bg-emerald-100 border-emerald-300',
  };

  return stateColors[state] || stateColors['Stable Society'];
};

const generateRandomVariation = (
  baseValue: number,
  variation: number = 10
): number => {
  const min = Math.max(0, baseValue - variation);
  const max = Math.min(100, baseValue + variation);
  return Math.round(min + Math.random() * (max - min));
};

export default function Home() {
  const [factors, setFactors] = useState<SocietalFactor[]>(DEFAULT_FACTORS);
  const [simulationState, setSimulationState] = useState(() =>
    calculateOutcomes(factors)
  );

  const handleFactorChange = (id: string, value: number) => {
    const newFactors = factors.map((factor) =>
      factor.id === id ? { ...factor, value } : factor
    );
    setFactors(newFactors);
    setSimulationState(calculateOutcomes(newFactors));
  };

  const applyPreset = (preset: SocietalFactor[]) => {
    // Create a map of preset factors for easy lookup
    const presetMap = new Map(preset.map((f) => [f.id, f]));

    // Create new factors array with all default factors
    const newFactors = DEFAULT_FACTORS.map((defaultFactor) => {
      // If the factor exists in the preset, use its value
      if (presetMap.has(defaultFactor.id)) {
        const presetFactor = presetMap.get(defaultFactor.id)!;
        return {
          ...defaultFactor,
          value: generateRandomVariation(presetFactor.value),
        };
      }
      // If not in preset, keep the default value
      return defaultFactor;
    });

    setFactors(newFactors);
    setSimulationState(calculateOutcomes(newFactors));
  };

  return (
    <main className="h-screen w-screen flex flex-col bg-gray-800 dark:bg-gray-950 overflow-hidden">
      <h1 className="text-4xl font-bold text-center p-4 text-gray-100 dark:text-gray-50 shrink-0">
        Civilization Simulation
      </h1>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 overflow-hidden">
        {/* Left Panel: Controls */}
        <Card className="bg-gray-100/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-300 dark:border-gray-700 shadow-lg flex flex-col h-full overflow-hidden">
          <CardHeader className="shrink-0">
            <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">
              Societal Factors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 overflow-y-auto flex-1 min-h-0">
            <div className="space-y-6">
              {factors.map((factor) => (
                <div key={factor.id} className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-base font-medium text-gray-900 dark:text-gray-100">
                      {factor.name}
                    </label>
                    <span className="text-base text-gray-700 dark:text-gray-300">
                      {factor.value}%
                    </span>
                  </div>
                  <Slider
                    value={[factor.value]}
                    onValueChange={([value]) =>
                      handleFactorChange(factor.id, value)
                    }
                    max={100}
                    step={1}
                    className="[&_[role=slider]]:bg-gray-900 dark:[&_[role=slider]]:bg-gray-300"
                  />
                  <p className="text-base text-gray-700 dark:text-gray-300">
                    {factor.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Panel: Results */}
        <Card className="bg-gray-100/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-300 dark:border-gray-700 shadow-lg flex flex-col h-full overflow-hidden">
          <CardHeader className="shrink-0">
            <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">
              Simulation Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 overflow-y-auto flex-1">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Overall Success Rate
                  </span>
                  <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {simulationState.successRate}%
                  </span>
                </div>
                <Progress
                  value={simulationState.successRate}
                  className="h-2 bg-gray-200 dark:bg-gray-700"
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-lg text-gray-900 dark:text-gray-100">
                      Lower Class Prosperity
                    </span>
                    <span className="text-lg text-gray-900 dark:text-gray-100">
                      {simulationState.lowerClassProsperity}%
                    </span>
                  </div>
                  <Progress
                    value={simulationState.lowerClassProsperity}
                    className="h-2 bg-gray-200 dark:bg-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-lg text-gray-900 dark:text-gray-100">
                      Middle Class Stability
                    </span>
                    <span className="text-lg text-gray-900 dark:text-gray-100">
                      {simulationState.middleClassStability}%
                    </span>
                  </div>
                  <Progress
                    value={simulationState.middleClassStability}
                    className="h-2 bg-gray-200 dark:bg-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-lg text-gray-900 dark:text-gray-100">
                      Upper Class Wealth
                    </span>
                    <span className="text-lg text-gray-900 dark:text-gray-100">
                      {simulationState.upperClassWealth}%
                    </span>
                  </div>
                  <Progress
                    value={simulationState.upperClassWealth}
                    className="h-2 bg-gray-200 dark:bg-gray-700"
                  />
                </div>
              </div>

              <div
                className={cn(
                  'p-4 rounded-lg transition-all duration-400 ease-in-out',
                  getStatusColor(simulationState.currentState)
                )}
              >
                <p className="text-center text-lg font-medium text-gray-900">
                  {simulationState.currentState}
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white text-base"
                  onClick={() => {
                    setFactors(DEFAULT_FACTORS);
                    setSimulationState(calculateOutcomes(DEFAULT_FACTORS));
                  }}
                >
                  Reset Simulation
                </Button>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
                      Basic Scenarios
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {PRESETS.slice(0, 6).map((preset) => (
                        <Button
                          key={preset.name}
                          variant="outline"
                          className={cn(
                            'w-full text-base transition-colors',
                            PRESET_COLORS[
                              preset.name as keyof typeof PRESET_COLORS
                            ]
                          )}
                          onClick={() => applyPreset(preset.factors)}
                        >
                          {preset.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
                      Historical Scenarios
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {PRESETS.slice(6).map((preset) => (
                        <Button
                          key={preset.name}
                          variant="outline"
                          className={cn(
                            'w-full text-base transition-colors group relative',
                            PRESET_COLORS[
                              preset.name as keyof typeof PRESET_COLORS
                            ]
                          )}
                          onClick={() => applyPreset(preset.factors)}
                        >
                          {preset.name}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 w-[300px]">
                            <div className="break-words whitespace-normal">
                              {preset.historicalOutcome}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

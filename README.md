# Civilization Simulator

A sophisticated simulation tool that models societal health and stability through the lens of class dynamics, economic factors, and social conditions. This project provides an interactive way to explore how various factors influence a society's overall success and stability.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
  - [Class Dynamics](#class-dynamics)
  - [Success Rate Calculation](#success-rate-calculation)
  - [State Assessment](#state-assessment)
  - [Fantasy Elements](#fantasy-elements)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Commands](#development-commands)
- [Technical Details](#technical-details)
  - [How It Works](#how-it-works)
  - [Technology Stack](#technology-stack)
- [Applications & Use Cases](#applications--use-cases)
- [Project Status](#project-status)
  - [Limitations](#limitations)
  - [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [The Author](#the-author)

## Overview

The simulator calculates a society's success rate based on the complex interplay between three main classes (lower, middle, and upper) and numerous societal factors. It employs a nuanced algorithm that considers:

- Class prosperity and distribution
- Economic indicators
- Social cohesion
- Government effectiveness
- Environmental factors
- Infrastructure quality
- And more...

## Features

### Class Dynamics

- Lower Class Prosperity (45% weight) - Represents basic needs and survival
- Middle Class Stability (40% weight) - Represents economic engine
- Upper Class Wealth (15% weight) - Represents investment capacity

### Success Rate Calculation

The simulation uses a sophisticated algorithm that considers:

1. **Base Success**: Weighted combination of class prosperities
2. **Penalty Factors**:

   - Extreme inequality penalties
   - Failed state conditions
   - Low class penalties
   - Factor-specific penalties (corruption, unemployment, etc.)
   - Economic inequality impact

3. **Bonus Factors**:
   - Social cohesion
   - Class balance
   - Positive synergies between factors

### State Assessment

The simulator determines various societal states including:

- Moderately Stable Society
- Lower Class Poverty Crisis
- Middle Class Economic Instability
- Upper Class Wealth Decline
- Widespread Government Corruption
- Severe Social Fragmentation
- Extreme Economic Inequality

### Fantasy Elements

For added entertainment value, the simulator includes optional fantasy scenarios:

- Mana Storms
- Thanos Snap Events
- Godzilla Rampages
- Joker Chaos
- Graphene Technology Revolution

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/civilization-simulator.git
cd civilization-simulator
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run linting
- `npm run test` - Run tests (when implemented)

## Technical Details

### How It Works

The simulation processes various input factors through multiple stages:

1. **Base Calculations**:

   - Computes prosperity for each class
   - Applies factor effects and synergies
   - Calculates penalties and bonuses

2. **Adjustments**:

   - Applies scaling factors
   - Implements minimum thresholds
   - Caps maximum penalties

3. **Final Output**:
   - Success rate (0-100%)
   - Class prosperity levels
   - Current state assessment
   - Notable events

### Technology Stack

The simulation uses:

- TypeScript for type safety
- Modern JavaScript features
- Complex mathematical models
- Event generation system
- State determination logic

## Applications & Use Cases

The simulator can model various real-world scenarios:

- Economic inequality impacts
- Failed state conditions
- Social mobility effects
- Policy change outcomes
- Crisis response effectiveness

## Project Status

### Limitations

The simulator acknowledges certain limitations:

- Simplified model of complex real-world dynamics
- Focus on specific aspects of society
- Abstraction of many detailed factors
- Idealized interactions between factors

### Future Enhancements

Planned improvements include:

- More sophisticated economic models
- Additional societal factors
- Enhanced historical scenarios
- Improved visualization tools
- Time-based progression

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for:

- Bug fixes
- New features
- Documentation improvements
- Additional scenarios
- Algorithm refinements

## The Author

- Find me at [PeterMSouzaJr.com](https://www.petermsouzajr.com/)

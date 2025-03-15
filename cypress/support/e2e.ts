// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import '@testing-library/cypress/add-commands';

// Custom command to set slider value
Cypress.Commands.add('setSlider', (testId: string, value: number) => {
  cy.get(`[data-testid="${testId}"]`)
    .should('exist')
    .trigger('mousedown', { position: value })
    .trigger('mouseup');
});

// Custom command to check class percentage
Cypress.Commands.add(
  'checkClassPercentage',
  (className: string, expectedRange: [number, number]) => {
    cy.get(`[data-testid="${className}-percentage"]`)
      .invoke('text')
      .then((text) => {
        const percentage = parseFloat(text);
        expect(percentage).to.be.within(expectedRange[0], expectedRange[1]);
      });
  }
);

declare global {
  namespace Cypress {
    interface Chainable {
      setSlider(testId: string, value: number): Chainable<Element>;
      checkClassPercentage(
        className: string,
        expectedRange: [number, number]
      ): Chainable<Element>;
    }
  }
}

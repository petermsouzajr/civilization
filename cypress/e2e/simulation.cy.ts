describe('Civilization Simulation', () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit('http://localhost:3000');
  });

  it('should load the simulation interface', () => {
    // Check if the main components are present
    cy.get('[data-testid="simulation-container"]').should('exist');
    cy.get('[data-testid="class-percentages"]').should('exist');
    cy.get('[data-testid="success-rate"]').should('exist');
  });

  it('should respond to slider interactions', () => {
    // Test corruption slider
    cy.get('[data-testid="corruption-slider"]')
      .should('exist')
      .trigger('mousedown', { position: 'right' })
      .trigger('mouseup');

    // Check if the class percentages update
    cy.get('[data-testid="lower-class-percentage"]').should(
      'not.have.text',
      '33.33'
    );
  });

  it('should update success rate based on factors', () => {
    // Set multiple sliders to extreme values
    cy.get('[data-testid="corruption-slider"]')
      .trigger('mousedown', { position: 'right' })
      .trigger('mouseup');

    cy.get('[data-testid="domestic-war-risk-slider"]')
      .trigger('mousedown', { position: 'right' })
      .trigger('mouseup');

    // Success rate should decrease
    cy.get('[data-testid="success-rate"]').should('not.have.text', '100');
  });

  it('should handle fantasy elements', () => {
    // Test Thanos snap probability
    cy.get('[data-testid="thanos-snap-slider"]')
      .should('exist')
      .trigger('mousedown', { position: 'right' })
      .trigger('mouseup');

    // Check for dramatic population changes
    cy.get('[data-testid="population-indicator"]')
      .should('exist')
      .should('not.have.text', '100');
  });
});

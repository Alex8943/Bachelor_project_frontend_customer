describe('Signup Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('Signup').click();
  });

  it('should display the signup form', () => {
    cy.get('form').should('be.visible');
    cy.get('input[name="name"]').should('be.visible');
    cy.get('input[name="lastname"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('Should redirect to /profile after successful signup', () => {

    cy.intercept('POST', 'http://localhost:4001/profile', {
      statusCode: 200,
      body: {
        message: 'User created successfully',
      },
    });

  });

});

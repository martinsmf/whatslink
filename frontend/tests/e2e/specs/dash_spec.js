// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/dashboard')
    cy.contains('h1', 'Seu gerenciador digital de contatos')
  })
})

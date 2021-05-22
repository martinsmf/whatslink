// https://docs.cypress.io/api/introduction/api.html

///<reference types="Cypress"/>

describe('My First Test', () => {

  describe('Quando acesso o dashboard', () => {

    before(() => {
      cy.visit('/dashboard')
      cy.contains('h4', 'Seu gerenciador digital de contatos')
    })


    it('entao devo ver a lista de contatos', () => {
      cy.get('.card').should('have.length', 3) //não é uma forma boa de validar pois a lista pode aumentar e quebrar o teste

      var t = cy.get('.card', { timeout: 5000 })
      expect(t).to.length > 0

      cy.get('.card', { timeout: 5000 }).then((elements) => {
        expect(elements.length > 0).to.be.true
      })
    })
  })
})

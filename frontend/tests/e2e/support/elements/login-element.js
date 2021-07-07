/// <reference types="Cypress" />

class LoginElements {
    get inputEmail() {
        return cy.get('input[name=email]')
    }

    get inputPassword() {
        return cy.get('input[name=password]')
    }

    get buttonSigIn() {
        return cy.get('#signIn')
    }
}

export default new LoginElements();
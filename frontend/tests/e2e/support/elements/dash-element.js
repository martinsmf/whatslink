/// <reference types="Cypress" />
class DashElement {

    singleCardDash(target) {
        return cy.contains('.card', target)
    }

    get cardsDash() {
        return cy.get('.card')
    }

    get inputSearch() {
        return cy.get('.level-right input')
    }

    get inputFullName() {
        return cy.get('.input-name input')
    }

    get inputNumber() {
        return cy.get('.input-number input')
    }

    get inputDescription() {
        return cy.get('.text-description textarea')
    }

    get buttonSearch() {
        return cy.get('[data-qa-selector=search]')
    }

    get buttonAddContact() {
        return cy.get('[data-qa-selector="add_contact"]')
    }

    get buttonSaveContact() {
        return cy.get('[data-qa-selector="save-contact"]')
    }

    get buttonRemove() {
        return cy.get('.btn-remove')
    }

    singleButtonRemove(text) {
        return this.singleCardDash(text).find('.btn-remove')
    }

    get smallNameAlert() {
        return cy.get('.input-name small')
    }

    get samllNumberAlert() {
        return cy.get('.input-number small')
    }

    get smallDescriptionAlert() {
        return cy.get('.text-description small')
    }
}

export default new DashElement();
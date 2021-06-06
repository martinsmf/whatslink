class DashElement {

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
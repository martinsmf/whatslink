class DashElement {

    get inputFullName() {
        return cy.get('.input-name input')
    }

    get inputNumber() {
        return cy.get('.input-number input')
    }

    get inputDescription() {
        return cy.get('.text-description textarea')
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
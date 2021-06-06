/// <reference types="Cypress"/>

import DashPage from '../support/pages/dash-page'
import DashElement from '../support/elements/dash-element'

describe('Busca', () => {
    const contact = {
        name: 'John Mayer',
        number: '11 9999-999',
        description: 'Aulas de Guitarra'
    }

    describe(`Quando busco pelo contato ${contact.name}`, () => {
        before(() => {
            cy.dash()
            DashPage.search(contact.number)
        })

        it('Devo ver somente esse contato no dashboard', () => {
            DashElement.cardsDash.should('have.length', 1)
            DashElement.cardsDash.contains(contact.name)
            DashElement.cardsDash.contains(contact.description)
        })
    })
})
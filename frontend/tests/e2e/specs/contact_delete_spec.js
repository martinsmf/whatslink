/// <reference types="Cypress" />

import DashElement from '../support/elements/dash-element'
import DashPage from '../support/pages/dash-page'

describe('Remover contato', () => {
    const contact = {
        name: 'Clack Kent',
        number: '12 9999-0000',
        description: 'superman'
    }

    context(`Dado que ${contact.name} é um contato indesejado`, () => {
        before(() => {
            cy.api_createContact(contact)
        })

        it('Quando apago esse contato', () => {
            cy.dash()
            DashPage.remove(contact.number)
        })

        it('Não deve exibir no dashboard', () => {
            DashElement.singleCardDash(contact.number).should('not.exist')
        })
    })
})
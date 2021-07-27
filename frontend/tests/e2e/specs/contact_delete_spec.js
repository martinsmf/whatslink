/// <reference types="Cypress" />

import DashElement from '../support/elements/dash-element'
import DashPage from '../support/pages/dash-page'
import LoginPage from '../support/pages/login-page'

describe('Remover contato', () => {
    const contact = {
        name: 'Clack Kent',
        number: '12 9999-0000',
        description: 'superman'
    }

    const user = { name: 'Lex Lutor', email: 'lutor@lexcorp.com', password: 'pwd123' }

    context(`Dado que ${contact.name} é um contato indesejado`, () => {
        before(() => {
            cy.api_createUser(user)
            LoginPage.signIn(user)
            DashElement.dash.should('be.visible')
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
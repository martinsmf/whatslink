/// <reference types="Cypress" />

import LoginPage from '../support/pages/login-page'
import DashElements from '../support/elements/dash-element'

describe('Login', () => {
    const user = {
        name: 'Teste Login',
        email: 'logar@gmail.com',
        password: 'pwd123'
    }

    before(() => {
        cy.api_createUser(user)
    })

    context('Quando submeto minha credencias validas', () => {
        before(() => {
            cy.visit('/')
            LoginPage.signIn(user)
        })

        it('deve exibir o dashboard', () => {
            DashElements.dash.should('be.visible')
        })

        it('o dashboard deve conter o titulo Seu gerenciador digital de contatos', () => {
            DashElements.titleDash.should('have.text', ' Seu gerenciador digital de contatos ')
        })

        it('Devo ir para o dashboard', () => {
            cy.url({ timeout: 5000 })
                .should('be.equals', `${Cypress.config('baseUrl')}dashboard`)
        })
    })
})
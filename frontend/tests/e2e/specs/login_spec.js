/// <reference types="Cypress" />

import LoginPage from '../support/pages/login-page'
import DashElements from '../support/elements/dash-element'
import LoginElement from '../support/elements/login-element'

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

    const invalidUser = [
        {
            title: 'uma senha incorreta',
            user: {
                email: 'logar@gmail.com',
                password: '123'
            },
            message: 'Email e/ou senha incorreto'
        },
        {
            title: 'um email invalido',
            user: {
                email: 'logar@outlook.com',
                password: 'pwd123'
            },
            message: 'Email e/ou senha incorreto'
        },
        {
            title: 'o email em branco',
            user: {
                email: '',
                password: 'pwd123'
            },
            message: 'Oops. Por favor informe seu email'
        },
        {
            title: 'a senha em brando',
            user: {
                email: 'logar@outlook.com',
                password: ''
            },
            message: 'Oops. Por favor informe sua senha'
        }
    ]

    invalidUser.forEach(value => {
        context(`Quando submeto ${value.title}`, () => {
            before(() => {
                cy.visit('/')
                LoginPage.signIn(value.user)
            })

            it('deve exibir a mensagem', () => {
                LoginElement.alertMessage.should('contain.text', value.message)
            })
        })
    })
})
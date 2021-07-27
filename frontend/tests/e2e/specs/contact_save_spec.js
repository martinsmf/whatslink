/// <reference types="Cypress" />

import DashPage from '../support/pages/dash-page'
import DashElement from '../support/elements/dash-element'
import LoginPage from '../support/pages/login-page'

describe('Cadastro de contatos', () => {
    const user = { name: 'Bruce Wayne', email: 'bruce.wayne@wayneenterprises', password: 'pwd123' }

    before(() => {
        cy.api_createUser(user)
        LoginPage.signIn(user)
        DashElement.dash.should('be.visible')
    })

    describe('Novo contato', () => {

        describe('Quando submeto o cadastro completo', () => {
            let contact = {
                name: 'Matheus',
                number: '31 999885522',
                description: 'Novo contato'
            }
            before(() => {
                DashPage.create(contact)
            })
            it('Deve cadastrar esse contato', () => {
                DashElement.cardsDash.should('contain', contact.name)
            })
        })

        describe('Quando submeto o cadastro sem o nome', () => {
            let contact = {
                number: '31 999885523',
                description: 'Novo contato'
            }
            before(() => {
                DashPage.create(contact)
            })
            it('Deve cadastrar esse contato', () => {
                DashElement.smallNameAlert.should('have.text', 'Nome é obrigatório.')
            })
        })

        describe('Quando submeto o cadastro sem o número', () => {
            let contact = {
                name: 'Matheus',
                description: 'Novo contato'
            }
            before(() => {
                DashPage.create(contact)
            })
            it('Deve cadastrar esse contato', () => {
                DashElement.smallNumberAlert.should('have.text', 'WhatsApp é obrigatório.')
            })
        })

        describe('Quando submeto o cadastro sem o assunto', () => {
            let contact = {
                name: 'Matheus',
                number: '31 999885522'
            }
            before(() => {
                DashPage.create(contact)
            })
            it('Deve cadastrar esse contato', () => {
                DashElement.smallDescriptionAlert.should('have.text', 'Assunto é obrigatório.')
            })
        })
    })
})
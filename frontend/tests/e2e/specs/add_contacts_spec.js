/// <reference types="Cypress" />

import DashPage from '../support/pages/dash-page'
import DashElement from '../support/elements/dash-element'

describe('Cadastro de contatos', () => {
    describe('Novo  contato', () => {

        describe('Quando submeto o cadastro completo', () => {
            let contact = {
                name: 'Matheus',
                number: '31 9999-999',
                description: 'Solicitar orçamento para consultoria em QA'
            }

            before(() => {
                cy.dash()
                DashPage.create(contact)
            })

            it('deve cadastrar esse contato', () => {
                cy.get('.contact-list').contains(contact.name)
            })

        })

        describe('Quando submeto o cadastro sem o nome', () => {
            let contact = {
                name: '',
                number: '31 9999-999',
                description: 'Solicitar orçamento para consultoria em QA'
            }

            before(() => {
                cy.dash()
                DashPage.create(contact)
            })

            it('deve mostrar uma notificação', () => {
                DashElement.smallNameAlert.contains('Nome é obrigatório')
            })

        })

        describe('Quando submeto o cadastro sem o whatsapp', () => {
            let contact = {
                name: 'Matheus',
                number: '',
                description: 'Solicitar orçamento para consultoria em QA'
            }

            before(() => {
                cy.dash()
                DashPage.create(contact)
            })

            it('deve mostrar uma notificação', () => {
                DashElement.samllNumberAlert.contains('WhatsApp é obrigatório')
            })

        })

        describe('Quando submeto o cadastro sem a descrição', () => {
            let contact = {
                name: 'Matheus',
                number: '31 9999-999',
                description: ''
            }

            before(() => {
                cy.dash()
                DashPage.create(contact)
            })

            it('deve mostrar uma notificação', () => {
                DashElement.smallDescriptionAlert.contains('Assunto é obrigatório')
            })

        })

    })
})
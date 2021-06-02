/// <reference types="Cypress" />
describe('Cadastro de contatos', () => {
    describe('Novo  contato', () => {
        let contact = {
            name: 'Matheus',
            nmber: '31 9999-999',
            description: 'Solicitar orçamento para consultoria em QA'
        }

        describe('Quando submeto o cadastro completo', () => {
            before(() => {
                cy.visit('/dashboard')
                cy.get('[data-qa-selector="add_contact"]').click()

                cy.get('.input-name input').type(contact.name)
                cy.get('.input-number input').type(contact.nmber)
                cy.get('.text-description textarea').type(contact.description)

                cy.get('[data-qa-selector="save-contact"]').click()
            })

            it('deve cadastrar esse contato', () => {
                cy.get('.contact-list').contains(contact.name)
            })

        })

        describe('Quando submeto o cadastro sem o nome', () => {
            before(() => {
                cy.visit('/dashboard')
                cy.get('[data-qa-selector="add_contact"]').click()

                cy.get('.input-number input').type(contact.nmber)
                cy.get('.text-description textarea').type(contact.description)

                cy.get('[data-qa-selector="save-contact"]').click()
            })

            it('deve mostrar uma notificação', () => {
                cy.get('.input-name small').contains('Nome é obrigatório')
            })

        })

        describe('Quando submeto o cadastro sem o whatsapp', () => {
            before(() => {
                cy.visit('/dashboard')
                cy.get('[data-qa-selector="add_contact"]').click()

                cy.get('.input-name input').type(contact.name)
                cy.get('.text-description textarea').type(contact.description)
                cy.get('[data-qa-selector="save-contact"]').click()
            })

            it('deve mostrar uma notificação', () => {
                cy.get('.input-number small').contains('WhatsApp é obrigatório')
            })

        })

        describe('Quando submeto o cadastro sem a descrição', () => {
            before(() => {
                cy.visit('/dashboard')
                cy.get('[data-qa-selector="add_contact"]').click()

                cy.get('.input-name input').type(contact.name)
                cy.get('.input-number input').type(contact.nmber)


                cy.get('[data-qa-selector="save-contact"]').click()
            })

            it('deve mostrar uma notificação', () => {
                cy.get('.text-description small').contains('Assunto é obrigatório')
            })

        })

    })
})
/// <reference types="Cypress"/>

import DashPage from '../support/pages/dash-page'
import DashElement from '../support/elements/dash-element'

describe('Busca', () => {
    const contact = {
        name: 'John Mayer',
        number: '11 9999-999',
        description: 'Aulas de Guitarra'
    }

    context(`Dado que eu tenho o seguite contato ${contact.name}`, () => {
        before(() => {

            cy.api_createContact(contact).then(response => {
                cy.log(JSON.stringify(response.body))
            })
        })

        it('Quando eu faço a busca desse contato', () => {
            cy.dash()
            DashPage.search(contact.number)
            cy.get('#loader', { timeout: 5000 }).should('not.exist')
        })

        it('Devo ver somente esse contato no dashboard', () => {
            DashElement.cardsDash.should('have.length', 1)
            DashElement.cardsDash.contains(contact.name)
            DashElement.cardsDash.contains(contact.description)
        })
    })

    context('Quando busco por um contato não cadastrado', () => {
        before(() => {
            cy.dash()
            DashPage.search(18654993577)
        })

        it('Deve retornar mesagem de alerta', () => {
            var msg = ' Contato não encontrado :( '
            cy.get('.message-body').should('have.text', msg)
        })
    })
})
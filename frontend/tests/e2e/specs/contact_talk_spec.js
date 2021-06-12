/// <reference types="Cypress" />

import DashElement from '../support/elements/dash-element'

describe('conversar', () => {
    const contact = {
        name: 'Teste talk',
        number: '31996558744',
        description: 'Orçamento para instalção de Drywall'
    }

    context(`Dado que desejo conversar com ${contact.name}`, () => {
        before(() => {
            cy.api_createContact(contact).then(response => {
                cy.log(JSON.stringify(response.body))
            })
        })

        it('Quando acesso o dashboard', () => {
            cy.dash()
        })

        it('Devo ver a propriedade href com o link do whatsapp web', () => {
            const externalLink = `https://api.whatsapp.com/send?phone=55${contact.number}`
            DashElement.buttonTalkContact(contact.number).should('have.attr', 'href', externalLink)
        })
    })
})
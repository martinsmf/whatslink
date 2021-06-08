/// <reference types="Cypress" />

const url = Cypress.config('baseUrlAPI')

Cypress.Commands.add('api_createContact', ({ name, number, description }) => {
    cy.request({
        method: 'POST',
        url: `${url}/contacts`,
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            name: name,
            number: number,
            description: description
        },
        failOnStatusCode: false
    })
})
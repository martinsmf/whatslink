/// <reference types="Cypress" />

const url = Cypress.config('baseUrlAPI')

Cypress.Commands.add('api_createUser', user => {
    cy.request({
        method: 'POST',
        url: `${url}/user`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: user,
        failOnStatusCode: false
    }).then(response => {
        cy.log(JSON.stringify(response.body))
    })
})

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
    }).then(response => {
        cy.log(JSON.stringify(response.body))
    })
})
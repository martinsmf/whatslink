describe('Cadastro de contatos', () => {
    describe('Dado que eu tenho um novo contato', () => {
        let contact = {
            name: 'Matheus',
            nmber: '31 9999-999',
            description: 'Solicitar orçamento para consultoria em QA'
        }

        it('Quando adciono esse contato', () => {
            cy.visit('/dashboard')
            cy.get('[data-qa-selector="add_contact"]').click()

            cy.get('.input-name input').type(contact.name)
            cy.get('.input-number input').type(contact.nmber)
            cy.get('.text-description textarea').type(contact.description)

            cy.get('[data-qa-selector="save-contact"]').click()
        })

        it('então devo ver esse contato no bashboard', () => {
            cy.get('.contact-list').contains(contact.name)
        })
    })
})
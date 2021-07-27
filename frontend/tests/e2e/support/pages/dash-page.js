/// <reference types="Cypress" />
import DashElement from '../elements/dash-element'
class DashPage {

    create(contact) {
        DashElement.buttonAddContact.click()
        if (contact.name) DashElement.inputFullName.clear().type(contact.name)
        if (contact.number) DashElement.inputNumber.clear().type(contact.number)
        if (contact.description) DashElement.inputDescription.clear().type(contact.description)
        DashElement.buttonSaveContact.click()
    }

    search(number) {
        DashElement.inputSearch.type(number)
        DashElement.buttonSearch.click()
    }

    remove(text) {
        DashElement.buttonRemoveContact(text).click()
    }

}

export default new DashPage();
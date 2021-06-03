/// <reference types="Cypress" />
import DashElement from '../elements/dash-element'
class DashPage {

    create(contact) {
        DashElement.buttonAddContact.click()
        if (contact.name) DashElement.inputFullName.type(contact.name)
        if (contact.number) DashElement.inputNumber.type(contact.number)
        if (contact.description) DashElement.inputDescription.type(contact.description)
        DashElement.buttonSaveContact.click()
    }

}

export default new DashPage();
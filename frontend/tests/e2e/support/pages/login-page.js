/// <reference types="Cypress" />

import LoginElement from "../elements/login-element";

class LoginPage {
    signIn({ email, password }) {
        cy.visit('/')
        if (email) LoginElement.inputEmail.type(email)
        if (password) LoginElement.inputPassword.type(password)
        LoginElement.buttonSigIn.click()
    }
}

export default new LoginPage()
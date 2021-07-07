/// <reference types="Cypress" />

import LoginElement from "../elements/login-element";

class LoginPage {
    signIn({ email, password }) {
        LoginElement.inputEmail.type(email)
        LoginElement.inputPassword.type(password)
        LoginElement.buttonSigIn.click()
    }
}

export default new LoginPage()
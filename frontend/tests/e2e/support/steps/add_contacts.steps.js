/*global Given, When, Then*/

/// <reference types="Cypress"/>

Given(/^que tenho um novo contato:$/, dataTable => {
    cy.visit('/dashboard')
});

When(/^adiciono esse contato$/, () => {
    return true;
});

Then(/^devo ver esse contato no Deshboard$/, () => {
    return true;
});

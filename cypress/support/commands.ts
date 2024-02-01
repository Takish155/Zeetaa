/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    getByInputName(name: string): Chainable<JQuery<HTMLElement>>;
    login(username: string, password: string): Chainable<JQuery<HTMLElement>>;
    navigateToSettingsPersonalInfo(): Chainable<JQuery<HTMLElement>>;
    changeUsername(
      username: string,
      password: string
    ): Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add("getByData", (dataTestAtribute) => {
  return cy.get(`[data-test=${dataTestAtribute}]`);
});
Cypress.Commands.add("getByInputName", (name) => {
  return cy.get(`input[name=${name}]`);
});

Cypress.Commands.add("login", (username, password) => {
  cy.getByInputName("username").click().type(username);
  cy.getByInputName("password").click().type(password);
  cy.getByData("submit").click();
});

Cypress.Commands.add("navigateToSettingsPersonalInfo", () => {
  cy.getByData("nav-settings").click();
  cy.location("pathname").should("eq", "/en/settings");
  cy.getByData("nav-details").click();
  cy.location("pathname").should("eq", "/en/settings/personal_details");
});

Cypress.Commands.add("changeUsername", (username, password) => {
  cy.getByData("change-username-button").click();
  cy.getByInputName("newUsername").as("usernameInput").should("exist");
  cy.getByInputName("password").as("passwordInput").should("exist");
  cy.get("@usernameInput").type(username).blur();
  cy.get("@passwordInput").type(password).blur();
  cy.getByData("change-username-submit-button").click();
  cy.getByData("detail-username").contains(username);
});
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

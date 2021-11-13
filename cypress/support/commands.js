// ***********************************************
// This example commands.js shows you how to
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
import sidebar from "../models/sidebar"
import navigation from "../models/navigations"
import organization from "../models/organization"
import boards from "../models/boards"
import authModule from "../models/authModule"
import data from "../fixtures/data.json"

Cypress.Commands.add('logout', () => {
  cy.intercept("POST", "**/api/v2/logout").as("logout");
  sidebar.myAccount.should('be.visible').click();
  sidebar.myAccountProfile.should('be.visible').click();
  navigation.loggoutButton.should('be.visible').click();
  cy.wait("@logout").then((intercept) => {
    expect(intercept.response.statusCode).to.eql(201)
  })
}),

Cypress.Commands.add('createTask', () => {
  cy.intercept("POST", "**/api/v2/tasks").as("tasks");
  boards.addNewTaskToSprint.click({ force: true })
  boards.taskTitleTextArea.type(data.board.taskName)
  boards.saveNewTaskButton.click()
  cy.wait("@tasks").then((intercept) => {
    expect(intercept.response.statusCode).to.eql(201)
  })
}),

Cypress.Commands.add('organizationModal', () => {
  cy.intercept("POST", "**/api/v2/organizations").as("organizations");
  organization.organizationNameInputField.type(data.organization.newName)
  organization.nextButton.click()
  organization.nextButton.click()
  cy.wait("@organizations").then((intercept) => {
    expect(intercept.response.statusCode).to.eql(200)
  })
}),

Cypress.Commands.add('boardModal', () => {
  cy.intercept("POST", "**/api/v2/boards").as("boards");
  organization.organizationNameInputField.type(data.organization.newBoard)
  organization.nextButton.click()
  boards.boardTypeCheckBoxScrum.click()
  organization.nextButton.click()
  organization.nextButton.click()
  organization.nextButton.click()
  cy.wait("@boards").then((intercept) => {
    expect(intercept.response.statusCode).to.eql(201)
  })
}),

Cypress.Commands.add('deleteOrganization', () => {
  cy.intercept("POST", "**/api/v2/organizations/**").as("organizations");
  sidebar.selectOrganization.click()
  organization.organizationInfoOkButton.click()
  organization.infoButton.click()
  organization.deleteButton.click()
  authModule.passwordInput.type(data.user.password)
  organization.confirmActionInModal.click()
  cy.wait("@organizations").then((intercept) => {
    expect(intercept.response.statusCode).to.eql(201)
  })
})
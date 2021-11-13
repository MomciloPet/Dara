/// <reference types="Cypress" />
import data from "../fixtures/data.json"
import errorMessages from "../fixtures/errorMessages.json"
import authModule from "../models/authModule"
import organization from "../models/organization"
// import faker from "faker"

describe('Login', () => {
  beforeEach(() => {
    cy.visit("/login", { timeout: 30000 }),
    authModule.emailInput.should('be.visible'),
    authModule.inputFieldLabel.eq(0).should('have.text', 'Email Address'),
    authModule.passwordInput.should('be.visible'),
    authModule.inputFieldLabel.eq(1).should('have.text', 'Password'),
    authModule.submitButton.should('be.visible'),
    authModule.submitButton.should('contain', 'Log In')
  })

  after(() => {
    cy.logout()
    cy.url().should('eq', `${Cypress.config('baseUrl')}/login`)
  })

  it('login with wrong email', () => {
    authModule.login({ email: data.userWrong.wrongEmail }),
    authModule.mainErrorMessage.should('be.visible'),
    authModule.mainErrorMessage.should('have.text', errorMessages.combinationIncorrect)
  })

  it('login with wrong password', () => {
    authModule.login({ password: data.userWrong.wrongPassword }),
    authModule.mainErrorMessage.should('be.visible'),
    authModule.mainErrorMessage.should('have.text', errorMessages.combinationIncorrect)
  })

  it('login without password', () => {
    authModule.login({ password: "" }),
    authModule.errorMessages.eq(1).should('be.visible'),
    authModule.errorMessages.eq(1).should('have.text', errorMessages.passwordRequired)
  })

  it('login without email', () => {
    authModule.login({ email: "" }),
    authModule.errorMessages.eq(0).should('be.visible'),
    authModule.errorMessages.eq(0).should('have.text', errorMessages.emailInvalid)
  })

  it('login with inValid email', () => {
    authModule.login({ email: data.userInValid.inValidEmail }),
    authModule.errorMessages.should('be.visible'),
    authModule.errorMessages.eq(0).should('have.text', errorMessages.emailInvalid)
  })

  it('login with inValid password', () => {
    authModule.login({ password: data.userInValid.inValidPassword }),
    authModule.errorMessages.should('be.visible'),
    authModule.errorMessages.eq(1).should('have.text', errorMessages.passwordInvalid)
  })

  it('valid login', () => {
    authModule.login({}),
    cy.url().should('eq', `${Cypress.config('baseUrl')}/my-organizations`)
    organization.newOrganizationItem.should('be.visible'),
    organization.newOrganizationItem
      .find(".vs-c-my-organization__title")
      .should('have.text', 'Add new Organization')
    cy.get("div[class='vs-c-my-organization-no-organization-popup-content']").should('be.visible')
  })

})
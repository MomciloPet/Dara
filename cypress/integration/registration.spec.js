/// <reference types="Cypress" />
import authModule from "../models/authModule"
import data from "../fixtures/data.json"
import errorMessages from "../fixtures/errorMessages.json"
import organization from "../models/organization"

describe('registration', () => {
  beforeEach(() => {
    cy.visit("/sign-up", { timeout: 30000 })
    authModule.emailInput.should('be.visible'),
    authModule.inputFieldLabel.eq(0).should('have.text', 'Your Email'),
    authModule.passwordInput.should('be.visible'),
    authModule.inputFieldLabel.eq(1).should('have.text', 'Password'),
    authModule.noUsersInputField.should('be.visible'),
    authModule.inputFieldLabel.eq(2).should('have.text', 'Number of users'),
    authModule.submitButton.should('be.visible'),
    authModule.submitButton.should('contain', 'Start your free trial')
  })

  after(() => {
    authModule.logout(),
    cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/login')
  })

  it('sign up with inValid email', () => {
    cy.log(data.userWrong.inValidEmail)
    authModule.register({ email: data.userInValid.inValidEmail }),
    authModule.errorMessages.should('be.visible'),
    authModule.errorMessages.should('have.text', errorMessages.emailInvalid)
    // termsAndPrivacyPolicyCheckBox is pre-selected when we land on register page
  })

  it('sign up with inValid password', () => {
    authModule.register({ password: data.userInValid.inValidPassword }),
    authModule.errorMessages.eq(1).should('be.visible'),
    authModule.errorMessages.eq(1).should('have.text', errorMessages.passwordInvalid)
  })

  it('sign up with inValid number of users', () => {
    authModule.register({ numberOfUsers: data.userInValid.inValidNumberOfUsers }),
    authModule.errorMessages.eq(2).should('be.visible'),
    authModule.errorMessages.eq(2).should('have.text', errorMessages.usersNumberIncorrect)
  })

  it('sign up without email', () => {
    authModule.register({ email: "" }),
    authModule.errorMessages.should('be.visible'),
    authModule.errorMessages.should('have.text', errorMessages.emailInvalid)
  })

  it('sign up without password', () => {
    authModule.register({ password: "" }),
    authModule.errorMessages.eq(1).should('be.visible'),
    authModule.errorMessages.eq(1).should('have.text', errorMessages.passwordRequired)
  })

  it('sign up with without number of users', () => {
    authModule.register({ numberOfUsers: "" }),
    authModule.errorMessages.eq(2).should('be.visible'),
    authModule.errorMessages.eq(2).should('have.text', errorMessages.usersNumberRequired)
  })

  it('sign up with wrong number of users', () => {
    authModule.register({ numberOfUsers: data.userWrong.wrongNumberOfUsers }),
    authModule.errorMessages.eq(2).should('be.visible'),
    authModule.errorMessages.eq(2).should('have.text', errorMessages.usersNumberRange)
  })

  it('sign up without checking Terms And Privacy Policy checkbox', () => {
    authModule.register({ checkBox: true })
    authModule.errorMessages.eq(3).should('be.visible'),
    authModule.errorMessages.eq(3).should('have.text', errorMessages.privacyPolicyRequired)
  })

  it('sign up with existing email', () => {
    authModule.register({ email: data.user.email })
    cy.wait(1500)

    // umesto wait dodaj time out na ovu poruku
    authModule.emailExistsError.should('be.visible'),
    authModule.emailExistsError.should('have.text', errorMessages.userAlreadyExists)
  })

  it('valid sign-up', () => {
    authModule.register({}),
    cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/my-organizations'),
    organization.newOrganizationItem.should('be.visible')
  })

})
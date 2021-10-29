/// <reference types="Cypress" />
const authforms = require('../fixtures/authforms.json')
import data from "../fixtures/data.json"
import navigation from "../fixtures/navigation.json"
import sidebar from "../fixtures/sidebar.json"
import errorMessages from "../fixtures/errorMessages.json"

describe('registration', () => {
  beforeEach(() => {
    cy.visit("/sign-up", { timeout: 30000 })
    cy.get(authforms.signUpForm.yourEmailInputField).should('be.visible'),
    cy.get(authforms.signUpForm.inputFieldLabel).eq(0).should('have.text', 'Your Email'),
    cy.get(authforms.signUpForm.yourPasswordInputField).should('be.visible'),
    cy.get(authforms.signUpForm.inputFieldLabel).eq(1).should('have.text', 'Password'),
    cy.get(authforms.signUpForm.noUsersInputField).should('be.visible'),
    cy.get(authforms.signUpForm.inputFieldLabel).eq(2).should('have.text', 'Number of users'),
    cy.get(authforms.signUpForm.submitButton).should('be.visible'),
    cy.get(authforms.signUpForm.submitButton).should('contain', 'Start your free trial')
  })
  
  after(() => {
    cy.get(sidebar.myAccount).click().wait(1000),
    // cy.get(authforms.signUpForm.addAcountDetailsCancelButton).click(),
    cy.get(sidebar.myAccountProfile).click(),
    cy.get(navigation.loggoutButton).click(),
    cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/login')
  })

  it('sign up with inValid email', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).type(data.userInValid.inValidEmail),
    cy.get(authforms.signUpForm.yourPasswordInputField).type(data.user.password),
    cy.get(authforms.signUpForm.noUsersInputField).type(data.user.numberOfUsers),
    cy.get(authforms.signUpForm.submitButton).click()
    cy.get(authforms.signUpForm.errorMessages).should('be.visible'),
    cy.get(authforms.signUpForm.errorMessages).should('have.text', errorMessages.emailInvalid)
    // termsAndPrivacyPolicyCheckBox is pre-selected when we land on register page
  })

  it('sign up with inValid password', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).type(data.user.email),
    cy.get(authforms.signUpForm.yourPasswordInputField).type(data.userInValid.inValidPassword),
    cy.get(authforms.signUpForm.noUsersInputField).type(data.user.numberOfUsers),
    cy.get(authforms.signUpForm.submitButton).click()
    cy.get(authforms.signUpForm.errorMessages).eq(1).should('be.visible'),
    cy.get(authforms.signUpForm.errorMessages).eq(1).should('have.text', errorMessages.passwordInvalid)
  })

  it('sign up with inValid number of users', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).type(data.user.email),
    cy.get(authforms.signUpForm.yourPasswordInputField).type(data.user.password),
    cy.get(authforms.signUpForm.noUsersInputField).type(data.userInValid.inValidNumberOfUsers),
    cy.get(authforms.signUpForm.submitButton).click()
    cy.get(authforms.signUpForm.errorMessages).eq(2).should('be.visible'),
    cy.get(authforms.signUpForm.errorMessages).eq(2).should('have.text', errorMessages.usersNumberIncorrect)
  })

  it('sign up without email', () => {
    cy.get(authforms.signUpForm.yourPasswordInputField).type(data.user.password),
    cy.get(authforms.signUpForm.noUsersInputField).type(data.user.numberOfUsers),
    cy.get(authforms.signUpForm.submitButton).click()
    cy.get(authforms.signUpForm.errorMessages).should('be.visible'),
    cy.get(authforms.signUpForm.errorMessages).should('have.text', errorMessages.emailInvalid)
  })

  it('sign up without password', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).type(data.user.email),
    cy.get(authforms.signUpForm.noUsersInputField).type(data.user.numberOfUsers),
    cy.get(authforms.signUpForm.submitButton).click()
    cy.get(authforms.signUpForm.errorMessages).eq(1).should('be.visible'),
    cy.get(authforms.signUpForm.errorMessages).eq(1).should('have.text', errorMessages.passwordRequired)
  })

  it('sign up with without number of users', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).type(data.user.email),
    cy.get(authforms.signUpForm.yourPasswordInputField).type(data.user.password),
    cy.get(authforms.signUpForm.submitButton).click()
    cy.get(authforms.signUpForm.errorMessages).eq(2).should('be.visible'),
    cy.get(authforms.signUpForm.errorMessages).eq(2).should('have.text', errorMessages.usersNumberRequired)
  })

  it('sign up with wrong number of users', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).type(data.user.email),
    cy.get(authforms.signUpForm.yourPasswordInputField).type(data.user.password),
    cy.get(authforms.signUpForm.noUsersInputField).type(data.userWrong.wrongNumberOfUsers),
    cy.get(authforms.signUpForm.submitButton).click()
    cy.get(authforms.signUpForm.errorMessages).eq(2).should('be.visible'),
    cy.get(authforms.signUpForm.errorMessages).eq(2).should('have.text', errorMessages.usersNumberRange)
  })

  it('sign up without checking Terms And Privacy Policy checkbox', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).type(data.user.email),
    cy.get(authforms.signUpForm.yourPasswordInputField).type(data.user.password),
    cy.get(authforms.signUpForm.noUsersInputField).type(data.user.numberOfUsers),
    cy.get(authforms.signUpForm.termsAndPrivacyPolicyCheckBox).click()
    cy.get(authforms.signUpForm.submitButton).click()
    cy.get(authforms.signUpForm.errorMessages).eq(3).should('be.visible'),
    cy.get(authforms.signUpForm.errorMessages).eq(3).should('have.text', errorMessages.privacyPolicyRequired)
  })

  it('sign up with existing email', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).type(data.user.email),
    cy.get(authforms.signUpForm.yourPasswordInputField).type(data.user.password),
    cy.get(authforms.signUpForm.noUsersInputField).type(data.user.numberOfUsers),
    cy.get(authforms.signUpForm.submitButton).click(),
    cy.wait(1500)
    cy.get(authforms.signUpForm.emailExistsError).should('be.visible'),
    cy.get(authforms.signUpForm.emailExistsError).should('have.text', errorMessages.userAlreadyExists)
  })

  it('valid sign-up', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).type(data.user.randomEmail),
    cy.get(authforms.signUpForm.yourPasswordInputField).type(data.user.password),
    cy.get(authforms.signUpForm.noUsersInputField).type(data.user.numberOfUsers)
    cy.get(authforms.signUpForm.submitButton).click()
    cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/my-organizations') 
  })

})
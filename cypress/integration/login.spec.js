/// <reference types="Cypress" />
const authforms = require('../fixtures/authforms.json')
import data from "../fixtures/data.json"
import navigation from "../fixtures/navigation.json"
import sidebar from "../fixtures/sidebar.json"
import myOrganization from "../fixtures/myOrganization.json"
import errorMessages from "../fixtures/errorMessages.json"

describe('Login', () => {
  beforeEach(() => {
    cy.visit("/login", { timeout: 30000 })
    cy.get(authforms.signUpForm.yourEmailInputField).should('be.visible'),
    cy.get(authforms.signUpForm.inputFieldLabel).eq(0).should('have.text', 'Email Address'),
    cy.get(authforms.signUpForm.yourPasswordInputField).should('be.visible'),
    cy.get(authforms.signUpForm.inputFieldLabel).eq(1).should('have.text', 'Password'),
    cy.get(authforms.signUpForm.submitButton).should('be.visible'),
    cy.get(authforms.signUpForm.submitButton).should('contain', 'Log In')
  })
  
  after(() => {
    cy.get(sidebar.myAccount).click(),
    cy.get(sidebar.myAccountProfile).click(),
    cy.get(navigation.loggoutButton).click(),
    cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/login')
  })
  
  it('login with wrong email', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).type(data.userWrong.wrongEmail),
    cy.get(authforms.signUpForm.yourPasswordInputField).type(data.user.password),
    cy.get(authforms.signUpForm.submitButton).click()
    cy.get(authforms.signUpForm.mainErrorMessage).should('be.visible'),
    cy.get(authforms.signUpForm.mainErrorMessage).should('have.text', errorMessages.combinationIncorrect)
  })

  it('login with wrong password', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).type(data.user.email),
    cy.get(authforms.signUpForm.yourPasswordInputField).type(data.userWrong.wrongPassword),
    cy.get(authforms.signUpForm.submitButton).click()
    cy.get(authforms.signUpForm.mainErrorMessage).should('be.visible'),
    cy.get(authforms.signUpForm.mainErrorMessage).should('have.text', errorMessages.combinationIncorrect)
  })

  it('login without password', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).clear().type(data.user.email),
    cy.get(authforms.signUpForm.submitButton).click()
    cy.get(authforms.signUpForm.errorMessages).eq(1).should('be.visible'),
    cy.get(authforms.signUpForm.errorMessages).eq(1).should('have.text', errorMessages.passwordInvalid)
  })

  it('login without email', () => {
    cy.get(authforms.signUpForm.yourPasswordInputField).type(data.user.password),
    cy.get(authforms.signUpForm.submitButton).click()
    cy.get(authforms.signUpForm.errorMessages).eq(0).should('be.visible'),
    cy.get(authforms.signUpForm.errorMessages).eq(0).should('have.text', errorMessages.emailInvalid)
  })

  it('login with inValid email', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).type(data.userInValid.inValidEmail),
    cy.get(authforms.signUpForm.yourPasswordInputField).type(data.user.password),
    cy.get(authforms.signUpForm.submitButton).click()
    cy.get(authforms.signUpForm.errorMessages).should('be.visible'),
    cy.get(authforms.signUpForm.errorMessages).eq(0).should('have.text', errorMessages.emailInvalid)
  })

  it('login with inValid password', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).type(data.user.email),
    cy.get(authforms.signUpForm.yourPasswordInputField).type(data.userInValid.inValidPassword),
    cy.get(authforms.signUpForm.submitButton).click()
    cy.get(authforms.signUpForm.errorMessages).should('be.visible'),
    cy.get(authforms.signUpForm.errorMessages).eq(1).should('have.text', errorMessages.passwordInvalid)
  })

  it.only('valid login', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).type(data.user.email),
    cy.get(authforms.signUpForm.yourPasswordInputField).type(data.user.password),
    cy.get(authforms.signUpForm.submitButton).click()
    cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/my-organizations') 
    cy.get(myOrganization.myOrganizationsBoard.newOrganizationItem).should('be.visible')
    cy.get(myOrganization.myOrganizationsBoard.newOrganizationItem)
      .find(".vs-c-my-organization__title")
      .should('have.text', 'Add new Organization')
    cy.get("div[class='vs-c-my-organization-no-organization-popup-content']").should('be.visible')
  })

})
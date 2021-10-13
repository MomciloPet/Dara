/// <reference types="Cypress" />
const authforms = require('../fixtures/authforms.json')
import data from "../fixtures/data.json"
import navigation from "../fixtures/navigation.json"
import sidebar from "../fixtures/sidebar.json"

describe('registration', () => {

  it('visit vivify scrum', () => {
    cy.visit("/sign-up", { timeout: 30000 })
  });

  it('sign up with inValid email', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).clear().type(data.userInValid.inValidEmail),
    cy.get(authforms.signUpForm.yourPasswordInputField).clear().type(data.user.password),
    cy.get(authforms.signUpForm.noUsersInputField).clear().type(data.user.numberOfUsers),
    cy.get(authforms.signUpForm.submitButton).click()
    // termsAndPrivacyPolicyCheckBox is pre-selected when we land on register page
  })

  it('sign up with inValid password', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).clear().type(data.user.email),
    cy.get(authforms.signUpForm.yourPasswordInputField).clear().type(data.userInValid.inValidPassword),
    cy.get(authforms.signUpForm.noUsersInputField).clear().type(data.user.numberOfUsers),
    cy.get(authforms.signUpForm.submitButton).click()
  })

  it('sign up with inValid number of users', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).clear().type(data.user.email),
    cy.get(authforms.signUpForm.yourPasswordInputField).clear().type(data.user.password),
    cy.get(authforms.signUpForm.noUsersInputField).clear().type(data.userInValid.inValidNumberOfUsers),
    cy.get(authforms.signUpForm.submitButton).click()
  })

  it('sign up without email', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).clear(),
    cy.get(authforms.signUpForm.yourPasswordInputField).clear().type(data.user.password),
    cy.get(authforms.signUpForm.noUsersInputField).clear().type(data.user.numberOfUsers),
    cy.get(authforms.signUpForm.submitButton).click()
  })

  it('sign up without password', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).clear().type(data.user.email),
    cy.get(authforms.signUpForm.yourPasswordInputField).clear(),
    cy.get(authforms.signUpForm.noUsersInputField).clear().type(data.user.numberOfUsers),
    cy.get(authforms.signUpForm.submitButton).click()
  })

  it('sign up with without number of users', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).clear().type(data.user.email),
    cy.get(authforms.signUpForm.yourPasswordInputField).clear().type(data.user.password),
    cy.get(authforms.signUpForm.noUsersInputField).clear(),
    cy.get(authforms.signUpForm.submitButton).click()
  })

  it('sign up with wrong number of users', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).clear().type(data.user.email),
    cy.get(authforms.signUpForm.yourPasswordInputField).clear().type(data.user.password),
    cy.get(authforms.signUpForm.noUsersInputField).clear().type(data.userWrong.wrongNumberOfUsers),
    cy.get(authforms.signUpForm.submitButton).click()
  })

  it('sign up without checking Terms And Privacy Policy checkbox', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).clear().type(data.user.email),
    cy.get(authforms.signUpForm.yourPasswordInputField).clear().type(data.user.password),
    cy.get(authforms.signUpForm.noUsersInputField).clear().type(data.user.numberOfUsers),
    cy.get(authforms.signUpForm.termsAndPrivacyPolicyCheckBox).click()
    cy.get(authforms.signUpForm.submitButton).click()
  })

  it('valid sign-up', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).clear().type(data.user.randomEmail),
    cy.get(authforms.signUpForm.yourPasswordInputField).clear().type(data.user.password),
    cy.get(authforms.signUpForm.noUsersInputField).clear().type(data.user.numberOfUsers),
    cy.get(authforms.signUpForm.termsAndPrivacyPolicyCheckBox).click(),
    cy.get(authforms.signUpForm.submitButton).click().wait(2000)
  })

  it('loggout', () => {
    cy.get(sidebar.myAccount).click().wait(2000),
    cy.get(authforms.signUpForm.addAcountDetailsCancelButton).click(),
    cy.get(sidebar.myAccountProfile).click(),
    cy.get(authforms.signUpForm.addAcountDetailsCancelButton).eq(1).click(),
    cy.get(navigation.loggoutButton).click()
  });

  it('sign up with existing email', () => {
    cy.get(authforms.loginForm.switchToSignupButton).click(),
    cy.get(authforms.signUpForm.freeSignUpButton).eq(3).click({ force: true }).wait(5000),
    cy.get(authforms.signUpForm.yourEmailInputField).clear().type(data.user.randomEmail),
    cy.get(authforms.signUpForm.yourPasswordInputField).clear().type(data.user.password),
    cy.get(authforms.signUpForm.noUsersInputField).clear().type(data.user.numberOfUsers),
    cy.get(authforms.signUpForm.submitButton).click()
  })
})
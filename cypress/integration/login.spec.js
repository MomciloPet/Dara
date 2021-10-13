/// <reference types="Cypress" />
const authforms = require('../fixtures/authforms.json')
import data from "../fixtures/data.json"
import navigation from "../fixtures/navigation.json"
import sidebar from "../fixtures/sidebar.json"

describe('Login', () => {
  
  it('visit vivify scrum', () => {
    cy.visit("/login", { timeout: 30000 })
  });

  it('login with wrong email', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).type(data.userWrong.wrongEmail),
    cy.get(authforms.signUpForm.yourPasswordInputField).type(data.user.password),
    cy.get(authforms.signUpForm.submitButton).click()
  });

  it('login with wrong password', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).clear().type(data.user.email),
    cy.get(authforms.signUpForm.yourPasswordInputField).clear().type(data.userWrong.wrongPassword),
    cy.get(authforms.signUpForm.submitButton).click()
  });

  it('login without password', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).clear().type(data.user.email),
    cy.get(authforms.signUpForm.yourPasswordInputField).clear()
    cy.get(authforms.signUpForm.submitButton).click()
  });

  it('login without email', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).clear()
    cy.get(authforms.signUpForm.yourPasswordInputField).clear().type(data.user.password),
    cy.get(authforms.signUpForm.submitButton).click()
  });

  it('login with inValid email', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).clear().type(data.userInValid.inValidEmail),
    cy.get(authforms.signUpForm.yourPasswordInputField).clear().type(data.user.password),
    cy.get(authforms.signUpForm.submitButton).click()
  });

  it('login with inValid password', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).clear().type(data.user.email),
    cy.get(authforms.signUpForm.yourPasswordInputField).clear().type(data.userInValid.inValidPassword),
    cy.get(authforms.signUpForm.submitButton).click()
  });

  it('valid login', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).clear().type(data.user.email),
    cy.get(authforms.signUpForm.yourPasswordInputField).clear().type(data.user.password),
    cy.get(authforms.signUpForm.submitButton).click()
  });

  it('loggout', () => {
    cy.wait(2000)
    cy.get(sidebar.myAccount).click(),
    cy.get(sidebar.myAccountProfile).click(),
    cy.get(navigation.loggoutButton).click()
  });
})
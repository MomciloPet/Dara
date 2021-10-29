/// <reference types="Cypress" />
const authforms = require('../fixtures/authforms.json')
import data from "../fixtures/data.json"
import navigation from "../fixtures/navigation.json"
import sidebar from "../fixtures/sidebar.json"
import myOrganization from "../fixtures/myOrganization.json"
import boards from "../fixtures/Boards.json"

describe('organizationCRUD', () => {
  before(() => {
    cy.visit("/login", { timeout: 30000 })
    cy.get(authforms.signUpForm.yourEmailInputField).clear().type(data.user.email),
    cy.get(authforms.signUpForm.yourPasswordInputField).clear().type(data.user.password),
    cy.get(authforms.signUpForm.submitButton).click()
    cy.wait(3000)
  })

  after(() => {
    cy.get(sidebar.myAccount).click(),
    cy.get(sidebar.myAccountProfile).click(),
    cy.get(navigation.loggoutButton).click()
    cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/login')
  })
  
  it('create organization from sidebar', () => {
    cy.get(navigation.homelogoButton).click()
    cy.get(sidebar.hoverAddOrganization).click()
    cy.get(sidebar.selectOrganizationFromTooltip).eq(0).click({ force: true })
    cy.get(myOrganization.createOrganization.organizationNameInputField).type(data.organization.newName)
    cy.get(myOrganization.createOrganization.nextButton).click()
    cy.get(myOrganization.createOrganization.nextButton).click()
    cy.get(myOrganization.myOrganizationsBoard.organizationInfoOkButton).click()
    cy.get("div[class='vs-l-project__title-info vs-u-cursor--pointer']")
      .find("span").eq(1)
      .should('have.text', data.organization.newName)
  })

  it('cancel create organization', () => {
    cy.get(navigation.homelogoButton).click()
    cy.get(myOrganization.createOrganization.openModal).click()
    cy.get(myOrganization.createOrganization.backButton).click()
  })

  it('create organization from my organizations page', () => {
    cy.get(myOrganization.createOrganization.openModal).click()
    cy.get(myOrganization.createOrganization.organizationNameInputField).type(data.organization.newName)
    cy.get(myOrganization.createOrganization.nextButton).click()
    cy.get(myOrganization.createOrganization.nextButton).click()
    cy.get(myOrganization.myOrganizationsBoard.organizationInfoOkButton).click()
  })

  it('change organization name', () => {
    cy.get(navigation.homelogoButton).click()
    cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/my-organizations')
    cy.get(myOrganization.myOrganizationsBoard.organizationItem).should('be.visible')
    cy.get(myOrganization.myOrganizationsBoard.organizationItem)
      .find(".vs-c-my-organization__title").eq(1)
      .should('have.text', data.organization.newName)
    cy.get(myOrganization.myOrganizationsBoard.editOrganizationName).eq(0).click()
    cy.get(myOrganization.myOrganizationsBoard.editOrganizationNameInputField).clear().type(data.organization.editName)
    cy.get(myOrganization.myOrganizationsBoard.confirmEditOrganizationName).click()
    cy.get(myOrganization.myOrganizationsBoard.organizationItem)
      .find(".vs-c-my-organization__title").eq(0)
      .should('have.text', data.organization.editName)
  })

  it('add new project from organization card', () => {
    cy.get(myOrganization.myOrganizationsBoard.addNewProjectFromOrganizationCard).eq(0).click()
    cy.get(boards.createBoard.organizationDropDown).click()
    cy.get(boards.createBoard.selectNewFromDropDown).eq(0).click()
    cy.get(boards.createBoard.boardTitleInputField).type(data.organization.newProject)
    cy.get(myOrganization.createOrganization.nextButton).click()
    cy.get(myOrganization.createOrganization.nextButton).click()
  })

  it('add new board from organization card', () => {
    cy.get(myOrganization.myOrganizationsBoard.addNewBoardFromOrganizationCard).eq(0).click()
    cy.get(boards.createBoard.organizationDropDown).click()
    cy.get(boards.createBoard.selectNewFromDropDown).eq(0).click()
    cy.get(boards.createBoard.boardTitleInputField).type(data.organization.newProject)
    cy.get(myOrganization.createOrganization.nextButton).click()
    cy.get(boards.createBoard.boardTypeCheckBoxScrum).click()
    cy.get(myOrganization.createOrganization.nextButton).click()
    cy.get(myOrganization.createOrganization.nextButton).click()
    cy.get(myOrganization.createOrganization.nextButton).click()
    // cy.get(myOrganization.createOrganization.nextButton).click()
    cy.wait(3000)
  })

  it('archive organization from organization card', () => {
    cy.get(navigation.homelogoButton).click()
    cy.get(myOrganization.myOrganizationsBoard.archiveOrganizationButton).eq(0).click({ force: true })
    cy.get(myOrganization.myOrganizationsBoard.confirmActionInModal).click()
  })

  it('reopen organization from organization card', () => {
    cy.get(myOrganization.myOrganizationsBoard.reopenOrganization).eq(0).click({ force: true })
    cy.get(myOrganization.myOrganizationsBoard.confirmActionInModal).click()
    cy.get(myOrganization.myOrganizationsBoard.organizationItem).should('have.length', 2)
  })

  it('delete organization from organization card', () => {
    cy.get(myOrganization.myOrganizationsBoard.archiveOrganizationButton).eq(0).click({ force: true })
    cy.get(myOrganization.myOrganizationsBoard.confirmActionInModal).click()
    cy.get(myOrganization.myOrganizationsBoard.deleteOrganization).eq(0).click({ force: true })
    cy.get(authforms.signUpForm.yourPasswordInputField).type(data.user.password)
    cy.get(myOrganization.myOrganizationsBoard.confirmActionInModal).click()
    cy.get(myOrganization.myOrganizationsBoard.organizationItem).should('have.length', 1)
    cy.get(myOrganization.myOrganizationsBoard.organizationItem).eq(1).should('not.exist')

  })

  it('open my organization and delete it', () => {
    cy.get(sidebar.selectOrganization).click()
    cy.get(myOrganization.myOrganizationsBoard.organizationInfoOkButton).click()
    cy.get(myOrganization.myOrganizationSideMenu.infoButton).click()
    cy.get(myOrganization.myOrganizationSideMenu.deleteButton).click()
    cy.get(authforms.signUpForm.yourPasswordInputField).type(data.user.password)
    cy.get(myOrganization.myOrganizationsBoard.confirmActionInModal).click()
    cy.get(myOrganization.myOrganizationsBoard.organizationItem).should('not.exist')
    cy.get(myOrganization.myOrganizationsBoard.newOrganizationItem).should('be.visible')
  })

})
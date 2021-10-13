/// <reference types="Cypress" />
const authforms = require('../fixtures/authforms.json')
import data from "../fixtures/data.json"
import navigation from "../fixtures/navigation.json"
import sidebar from "../fixtures/sidebar.json"
import myOrganization from "../fixtures/myOrganization.json"
import boards from "../fixtures/Boards.json"

describe('organizationCRUD', () => {
  
  it('visit vivify scrum', () => {
    cy.visit("/login", { timeout: 30000 })
  });

  it('valid login and home page', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).clear().type(data.user.email),
    cy.get(authforms.signUpForm.yourPasswordInputField).clear().type(data.user.password),
    cy.get(authforms.signUpForm.submitButton).click()
    cy.wait(3000)
  });

  it('create organization from sidebar', () => {
    cy.get(navigation.homelogoButton).click()
    cy.get(sidebar.hoverAddOrganization).click()
    cy.get(sidebar.selectOrganizationFromTooltip).eq(0).click({ force: true })
    cy.get(myOrganization.createOrganization.organizationNameInputField).type(data.organization.newName)
    cy.get(myOrganization.createOrganization.nextButton).click()
    cy.get(myOrganization.createOrganization.nextButton).click()
    cy.get(myOrganization.myOrganizationsBoard.organizationInfoOkButton).click()
  });

  it('cancel create organization', () => {
    cy.get(navigation.homelogoButton).click()
    cy.get(myOrganization.createOrganization.openModal).click()
    cy.get(myOrganization.createOrganization.backButton).click()
  });

  it('create organization from my organizations page', () => {
    cy.get(myOrganization.createOrganization.openModal).click()
    cy.get(myOrganization.createOrganization.organizationNameInputField).type(data.organization.newName)
    cy.get(myOrganization.createOrganization.nextButton).click()
    cy.get(myOrganization.createOrganization.nextButton).click()
    cy.get(myOrganization.myOrganizationsBoard.organizationInfoOkButton).click()
  });

  it('change organization name', () => {
    cy.get(navigation.homelogoButton).click()
    cy.get(myOrganization.myOrganizationsBoard.editOrganizationName).eq(0).click()
    cy.get(myOrganization.myOrganizationsBoard.editOrganizationNameInputField).clear().type(data.organization.editName)
    cy.get(myOrganization.myOrganizationsBoard.confirmEditOrganizationName).click()
  });

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
  })

  it('delete organization from organization card', () => {
    cy.get(myOrganization.myOrganizationsBoard.archiveOrganizationButton).eq(0).click({ force: true })
    cy.get(myOrganization.myOrganizationsBoard.confirmActionInModal).click()
    cy.get(myOrganization.myOrganizationsBoard.deleteOrganization).eq(0).click({ force: true })
    cy.get(authforms.signUpForm.yourPasswordInputField).type(data.user.password)
    cy.get(myOrganization.myOrganizationsBoard.confirmActionInModal).click()
  })

  it('open my organization and delete it', () => {
    cy.get(sidebar.selectOrganization).click()
    cy.get(myOrganization.myOrganizationsBoard.organizationInfoOkButton).click()
    cy.get(myOrganization.myOrganizationSideMenu.infoButton).click()
    cy.get(myOrganization.myOrganizationSideMenu.deleteButton).click()
    cy.get(authforms.signUpForm.yourPasswordInputField).type(data.user.password)
    cy.get(myOrganization.myOrganizationsBoard.confirmActionInModal).click()
  })

  it('loggout', () => {
    cy.get(sidebar.myAccount).click(),
    cy.get(sidebar.myAccountProfile).click(),
    cy.get(navigation.loggoutButton).click()
  });
})
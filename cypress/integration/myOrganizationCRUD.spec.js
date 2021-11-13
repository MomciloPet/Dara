/// <reference types="Cypress" />
import data from "../fixtures/data.json"
import authModule from "../models/authModule"
import boards from "../models/boards"
import organization from "../models/organization"
import sidebar from "../models/sidebar"
import navigation from "../models/navigations"

describe('organizationCRUD', () => {
  before(() => {
    cy.visit("/login", { timeout: 30000 }),
    authModule.login({}),
    cy.url().should('eq', `${Cypress.config('baseUrl')}/my-organizations`)
    organization.newOrganizationItem.should('be.visible')
  })

  after(() => {
    cy.logout()
    cy.url().should('eq', `${Cypress.config('baseUrl')}/login`)
  })

  it('create organization from sidebar', () => {
    navigation.homelogoButton.click()
    sidebar.hoverAddOrganization.click()
    sidebar.selectOrganizationFromTooltip.eq(0).click({ force: true })
    cy.organizationModal()
    organization.organizationInfoOkButton.click()
    cy.get("div[class='vs-l-project__title-info vs-u-cursor--pointer']")
      .find("span").eq(1)
      .should('have.text', data.organization.newName)
    // organization.organizationInfoOkButton.click()
    cy.get("div[class='vs-l-project__title-info vs-u-cursor--pointer']")
      .find("span").eq(1)
      .should('have.text', data.organization.newName)
  })

  it('cancel create organization', () => {
    navigation.homelogoButton.click()
    organization.openModal.click()
    organization.backButton.click()
  })

  it('create organization from my organizations page', () => {
    organization.openModal.click()
    cy.organizationModal()
    organization.organizationInfoOkButton.click()
  })

  it('change organization name', () => {
    navigation.homelogoButton.click()
    cy.url().should('eq', `${Cypress.config('baseUrl')}/my-organizations`)
    organization.organizationItem.should('be.visible')
    organization.organizationItem
      .find(".vs-c-my-organization__title").eq(1)
      .should('have.text', data.organization.newName)
    organization.editOrganizationName.eq(0).click()
    organization.editOrganizationNameInputField.clear().type(data.organization.editName)
    organization.confirmEditOrganizationName.click()
    organization.organizationItem
      .find(".vs-c-my-organization__title").eq(0)
      .should('have.text', data.organization.editName)
  })

  it('add new project from organization card', () => {
    organization.addNewProjectFromOrganizationCard.eq(0).click()
    boards.organizationDropDown.click()
    boards.selectNewFromDropDown.eq(0).click()
    boards.boardTitleInputField.type(data.organization.newProject)
    organization.nextButton.click()
    organization.nextButton.click()
  })

  it('add new board from organization card', () => {
    organization.addNewBoardFromOrganizationCard.eq(0).click()
    boards.organizationDropDown.click()
    boards.selectNewFromDropDown.eq(0).click()
    boards.boardTitleInputField.type(data.organization.newProject)
    organization.nextButton.click()
    boards.boardTypeCheckBoxScrum.click()
    organization.nextButton.click()
    organization.nextButton.click()
    organization.nextButton.click()
    // cy.get(myOrganization.createOrganization.nextButton).click()
    cy.wait(3000)
  })

  it('archive organization from organization card', () => {
    navigation.homelogoButton.click()
    organization.archiveOrganizationButton.eq(0).click({ force: true })
    organization.confirmActionInModal.click()
  })

  it('reopen organization from organization card', () => {
    organization.reopenOrganization.eq(0).click({ force: true })
    organization.confirmActionInModal.click()
    organization.organizationItem.should('have.length', 2)
  })

  it('delete organization from organization card', () => {
    organization.archiveOrganizationButton.eq(0).click({ force: true })
    organization.confirmActionInModal.click()
    organization.deleteOrganizationM.eq(0).click({ force: true })
    authModule.passwordInput.type(data.user.password)
    organization.confirmActionInModal.click()
    organization.organizationItem.should('have.length', 1)
    organization.organizationItem.eq(1).should('not.exist')
  })

  it('open my organization and delete it', () => {
    cy.deleteOrganization()
    organization.organizationItem.should('not.exist')
    organization.newOrganizationItem.should('be.visible')
  })

})
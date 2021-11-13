/// <reference types="Cypress" />
import data from "../fixtures/data.json"
import authModule from "../models/authModule"
import boards from "../models/boards"
import organization from "../models/organization"
import sidebar from "../models/sidebar"
import navigation from "../models/navigations"

describe('BoardCRUD', () => {
  before(() => {
    cy.visit("/login", { timeout: 30000 }),
    authModule.login({}),
    cy.url().should('eq', `${Cypress.config('baseUrl')}/my-organizations`),
    organization.newOrganizationItem.should('be.visible')
  })

  after(() => {
    cy.deleteOrganization()
    cy.logout()
    cy.url().should('eq', `${Cypress.config('baseUrl')}/login`)
  })

  it('create board from sidebar without organization', () => {
    navigation.homelogoButton.click()
    sidebar.hoverAddOrganization.click()
    sidebar.selectBoardFromTooltip.click({ force: true })
  })

  it('create organization from my organizations page', () => {
    organization.openModal.click()
    cy.organizationModal()
    organization.organizationInfoOkButton.click()
  })

  it('create board from sidebar', () => {
    navigation.homelogoButton.click()
    sidebar.hoverAddOrganization.click()
    sidebar.selectBoardFromTooltip.click({ force: true })
    cy.boardModal()
  })

  it('cancel create board', () => {
    sidebar.selectOrganization.click()
    organization.organizationInfoOkButton.click()
    boards.openBoardModal.click()
    organization.backButton.click()
  })

  it('create board from boards page', () => {
    boards.openBoardModal.click()
    cy.boardModal()
  })

  it('add board to favorites', () => {
    sidebar.addBoardToFavorites.eq(0).click({ force: true })
  })

  it('add team member', () => {
    sidebar.selectOrganization.click()
    // cy.get(myOrganization.myOrganizationsBoard.organizationInfoOkButton).click()
    boards.addTeamMember.eq(0).click({ force: true })
    boards.addTeamMemberInputField.type(data.userInValid.inValidPassword).clear()
    boards.addTeamMemberInputField.click()
    boards.selectFromAutocompleteDropDown.click()
    organization.confirmActionInModal.click()
    organization.organizationInfoOkButton.click()
  })

  it('check members from card', () => {
    sidebar.selectOrganization.click()
    boards.membersButton.eq(0).click()
  })

  it('archive board from board card', () => {
    sidebar.selectOrganization.click()
    boards.arhiveBoard.eq(0).click({ force: true })
    organization.confirmActionInModal.click()
  })

  it('reopen board from board card', () => {
    boards.reopenBoard.eq(0).click({ force: true })
    organization.confirmActionInModal.click()
  })

  it('delete board from organization card', () => {
    boards.arhiveBoard.eq(0).click({ force: true })
    organization.confirmActionInModal.click()
    boards.deleteBoard.eq(0).click({ force: true })
    organization.confirmActionInModal.click()
    organization.organizationInfoOkButton.click()
  })

  it('open board and delete it', () => {
    boards.openBoard.eq(0).click()
    cy.wait(3000)
    organization.infoBoardButton.click()
    organization.deleteButton.click()
    organization.confirmActionInModal.click()
  })

})
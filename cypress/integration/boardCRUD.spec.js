/// <reference types="Cypress" />
const authforms = require('../fixtures/authforms.json')
import data from "../fixtures/data.json"
import navigation from "../fixtures/navigation.json"
import sidebar from "../fixtures/sidebar.json"
import myOrganization from "../fixtures/myOrganization.json"
import boards from "../fixtures/Boards.json"

describe('BoardCRUD', () => {
  
  it('visit vivify scrum', () => {
    cy.visit("/login", { timeout: 30000 })
  });

  it('valid login', () => {
    cy.get(authforms.signUpForm.yourEmailInputField).clear().type(data.user.email),
    cy.get(authforms.signUpForm.yourPasswordInputField).clear().type(data.user.password),
    cy.get(authforms.signUpForm.submitButton).click()
  });

  it('create board from sidebar without organization', () => {
    cy.get(navigation.homelogoButton).click()
    cy.get(sidebar.hoverAddOrganization).click()
    cy.get(sidebar.selectBoardFromTooltip).click({ force: true })
  });

  it('create organization from my organizations page', () => {
    cy.get(myOrganization.createOrganization.openModal).click()
    cy.get(myOrganization.createOrganization.organizationNameInputField).type(data.organization.newName)
    cy.get(myOrganization.createOrganization.nextButton).click()
    cy.get(myOrganization.createOrganization.nextButton).click()
    cy.get(myOrganization.myOrganizationsBoard.organizationInfoOkButton).click()
  });

  it('create board from sidebar', () => {
    cy.get(navigation.homelogoButton).click()
    cy.get(sidebar.hoverAddOrganization).click()
    cy.get(sidebar.selectBoardFromTooltip).click({ force: true })
    cy.get(myOrganization.createOrganization.organizationNameInputField).type(data.organization.newBoard)
    cy.get(myOrganization.createOrganization.nextButton).click()
    cy.get(boards.createBoard.boardTypeCheckBoxScrum).click()
    cy.get(myOrganization.createOrganization.nextButton).click()
    cy.get(myOrganization.createOrganization.nextButton).click()
    cy.get(myOrganization.createOrganization.nextButton).click()
    cy.wait(1500)
  });

  it('cancel create board', () => {
    cy.get(sidebar.selectOrganization).click()
    cy.get(myOrganization.myOrganizationsBoard.organizationInfoOkButton).click()
    cy.get(boards.createBoard.openBoardModal).click()
    cy.get(myOrganization.createOrganization.backButton).click()
  });

  it('create board from boards page', () => {
    cy.get(boards.createBoard.openBoardModal).click()
    cy.get(myOrganization.createOrganization.organizationNameInputField).type(data.organization.newBoard)
    cy.get(myOrganization.createOrganization.nextButton).click()
    cy.get(boards.createBoard.boardTypeCheckBoxScrum).click()
    cy.get(myOrganization.createOrganization.nextButton).click()
    cy.get(myOrganization.createOrganization.nextButton).click()
    cy.get(myOrganization.createOrganization.nextButton).click()
  });

  it('add board to favorites', () => {
    cy.get(sidebar.addBoardToFavorites).eq(0).click({ force: true })
  });

  it('add team member', () => {
    cy.get(sidebar.selectOrganization).click()
    // cy.get(myOrganization.myOrganizationsBoard.organizationInfoOkButton).click()
    cy.get(boards.boardCard.addTeamMember).eq(0).click({ force: true })
    cy.get(boards.boardCard.addTeamMemberInputField).type(data.userInValid.inValidPassword).clear()
    cy.get(boards.boardCard.addTeamMemberInputField).click()
    cy.get(boards.boardCard.selectFromAutocompleteDropDown).click()
    cy.get(myOrganization.myOrganizationsBoard.confirmActionInModal).click()

  })

  it('check members from card', () => {
    cy.get(sidebar.selectOrganization).click()
    cy.get(myOrganization.myOrganizationsBoard.organizationInfoOkButton).click()
    cy.get(boards.boardCard.membersButton).eq(0).click()
  })

  it('archive board from board card', () => {
    cy.get(sidebar.selectOrganization).click()
    cy.get(boards.boardCard.arhiveBoard).eq(0).click({ force: true })
    cy.get(myOrganization.myOrganizationsBoard.confirmActionInModal).click()
  })

  it('reopen board from board card', () => {
    cy.get(boards.boardCard.reopenBoard).eq(0).click({ force: true })
    cy.get(myOrganization.myOrganizationsBoard.confirmActionInModal).click()
  })

  it('delete board from organization card', () => {
    cy.get(boards.boardCard.arhiveBoard).eq(0).click({ force: true })
    cy.get(myOrganization.myOrganizationsBoard.confirmActionInModal).click()
    cy.get(boards.boardCard.deleteBoard).eq(0).click({ force: true })
    cy.get(myOrganization.myOrganizationsBoard.confirmActionInModal).click()
    cy.get(myOrganization.myOrganizationsBoard.organizationInfoOkButton).click()
  })

  it('open board and delete it', () => {
    cy.get(boards.boardCard.openBoard).eq(0).click()
    cy.wait(3000)
    cy.get(boards.boardSideMenu.infoButton).click()
    cy.get(myOrganization.myOrganizationSideMenu.deleteButton).click()
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

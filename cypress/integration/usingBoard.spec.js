/// <reference types="Cypress" />
const authforms = require('../fixtures/authforms.json')
import data from "../fixtures/data.json"
import navigation from "../fixtures/navigation.json"
import sidebar from "../fixtures/sidebar.json"
import myOrganization from "../fixtures/myOrganization.json"
import boards from "../fixtures/Boards.json"

describe('usingBoard', () => {
  before(() => {
    cy.visit("/login", { timeout: 30000 })
    cy.get(authforms.signUpForm.yourEmailInputField).clear().type(data.user.email),
    cy.get(authforms.signUpForm.yourPasswordInputField).clear().type(data.user.password),
    cy.get(authforms.signUpForm.submitButton).click()
    cy.wait(3000)
  })

  after(() => {
    cy.get(sidebar.selectOrganization).click()
    cy.get(myOrganization.myOrganizationsBoard.organizationInfoOkButton).click()
    cy.get(myOrganization.myOrganizationSideMenu.infoButton).click()
    cy.get(myOrganization.myOrganizationSideMenu.deleteButton).click()
    cy.get(authforms.signUpForm.yourPasswordInputField).type(data.user.password)
    cy.get(myOrganization.myOrganizationsBoard.confirmActionInModal).click()
    cy.get(sidebar.myAccount).click(),
    cy.get(sidebar.myAccountProfile).click(),
    cy.get(navigation.loggoutButton).click()
  })

  it('create organization from my organizations page', () => {
    cy.get(myOrganization.createOrganization.openModal).click(),
    cy.get(myOrganization.createOrganization.organizationNameInputField).type(data.organization.newName),
    cy.get(myOrganization.createOrganization.nextButton).click(),
    cy.get(myOrganization.createOrganization.nextButton).click(),
    cy.get(myOrganization.myOrganizationsBoard.organizationInfoOkButton).click()
  })

  it('create board from boards page', () => {
    cy.get(boards.createBoard.openBoardModal).click(),
    cy.get(myOrganization.createOrganization.organizationNameInputField).type(data.organization.newBoard),
    cy.get(myOrganization.createOrganization.nextButton).click(),
    cy.get(boards.createBoard.boardTypeCheckBoxScrum).click(),
    cy.get(myOrganization.createOrganization.nextButton).click(),
    cy.get(myOrganization.createOrganization.nextButton).click(),
    cy.get(myOrganization.createOrganization.nextButton).click()
  })

  it('create new column on the board', () => {
    cy.get(boards.boardProductBacklog.addNewColumnButton).click().type(data.board.columnSpintName).type('{enter}')
  })

  it('create new task in new column', () => {
    cy.get(boards.boardProductBacklog.addNewTaskToSprint).click({ force: true }),
    cy.get(boards.boardProductBacklog.taskTitleTextArea).type(data.board.taskName),
    cy.get(boards.boardProductBacklog.saveNewTaskButton).click(),
    cy.get(boards.boardProductBacklog.cancelNewTaskButton).click()
  })
  
  it('move task from column to column', () => {
    cy.get(boards.boardProductBacklog.getHiddenElements).trigger('mouseover'),
    cy.get(boards.boardProductBacklog.moveTaskButton).click({ force: true }),
    cy.get(boards.boardProductBacklog.selectSprintFromDropDown).click(),
    cy.get(boards.boardProductBacklog.choseSprintFromDropDown).eq(1).click()
  })

  it('edit task', () => {
    cy.get(boards.boardProductBacklog.editTitleButton).eq(1).click({force: true}),
    cy.get(boards.boardProductBacklog.taskTitleTextArea).type(data.board.editTaskName),
    cy.get(boards.boardProductBacklog.updateTitleButton).eq(0).click()
  })

  it('delete task', () => {
    cy.get(boards.boardProductBacklog.taskDropDown).click({force: true}),
    cy.get(boards.boardProductBacklog.deleteFromDropDownButton).click(),
    cy.get(boards.boardProductBacklog.modalDeleteYesButton).click()
  })

  it('delete column', () => {
    cy.get(boards.boardProductBacklog.columnDropDownButton).eq(1).click(),
    cy.get(boards.boardProductBacklog.deleteColumnFromDropDownButton).click(),
    cy.get(boards.boardProductBacklog.modalDeleteYesButton).click()
  })

  it('start a sprint', () => {
    cy.get(boards.boardProductBacklog.columnDropDownButton).eq(1).click(),
    cy.get(boards.boardProductBacklog.startSprint).click(),
    cy.get(boards.boardProductBacklog.sprintGoalTextArea).type(data.board.sprintGoal),
    cy.get(boards.boardProductBacklog.modalDeleteYesButton).click()
  })

})
/// <reference types="Cypress" />
import data from "../fixtures/data.json"
import authModule from "../models/authModule"
import boards from "../models/boards"
import organization from "../models/organization"

describe('usingBoard', () => {
  before(() => {
    cy.visit("/login", { timeout: 30000 }),
    authModule.login({}),
    cy.url().should('eq', `${Cypress.config('baseUrl')}/my-organizations`)
    organization.newOrganizationItem.should('be.visible')
  })

  after(() => {
    cy.deleteOrganization()
    cy.logout()
    cy.url().should('eq', `${Cypress.config('baseUrl')}/login`)
  })

  it('create organization from my organizations page', () => {
    organization.openModal.click()
    cy.organizationModal()
    organization.organizationInfoOkButton.click()
  })

  it('create board from boards page', () => {
    boards.openBoardModal.click()
    cy.boardModal()
  })

  it('create new column on the board', () => {
    boards.addNewColumnButton.click().type(data.board.columnSpintName).type('{enter}')
  })

  it('create new task in new column', () => {
    cy.createTask()
    boards.cancelNewTaskButton.click()
  })

  it('move task from column to column', () => {
    boards.getHiddenElements.trigger('mouseover'),
    boards.moveTaskButton.click({ force: true }),
    boards.selectSprintFromDropDown.click(),
    boards.choseSprintFromDropDown.eq(1).click()
  })

  it('edit task', () => {
    boards.editTitleButton.eq(1).click({force: true}),
    boards.taskTitleTextArea.type(data.board.editTaskName),
    boards.updateTitleButton.eq(0).click()
  })

  it('delete task', () => {
    boards.taskDropDown.click({force: true}),
    boards.deleteFromDropDownButton.click(),
    boards.modalDeleteYesButton.click()
  })

  it('delete column', () => {
    boards.columnDropDownButton.eq(1).click(),
    boards.deleteColumnFromDropDownButton.click(),
    boards.modalDeleteYesButton.click()
  })

  it('start a sprint', () => {
    boards.columnDropDownButton.eq(1).click(),
    boards.startSprint.click(),
    boards.sprintGoalTextArea.type(data.board.sprintGoal),
    boards.modalDeleteYesButton.click()
  })

})
/// <reference types="Cypress" />
import data from "../fixtures/data.json"
import authModule from "../models/authModule"
import boards from "../models/boards"
import organization from "../models/organization"
import sidebar from "../models/sidebar"
import navigation from "../models/navigations"

describe('usingBoard', () => {
  before(() => {
    cy.visit("/login", { timeout: 30000 }),
    authModule.login({}),
    cy.wait(3000),
    cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/my-organizations'),
    organization.newOrganizationItem.should('be.visible')
  })

  after(() => {
    sidebar.selectOrganization.click()
    organization.organizationInfoOkButton.click()
    organization.infoButton.click()
    organization.deleteButton.click()
    authModule.passwordInput.type(data.user.password)
    organization.confirmActionInModal.click()
    cy.intercept("POST", "**/api/v2/logout").as("logout");
    sidebar.myAccount.should('be.visible').click();
    sidebar.myAccountProfile.should('be.visible').click();
    navigation.loggoutButton.should('be.visible').click();
    cy.wait("@logout").then((intercept) => {
      expect(intercept.response.statusCode).to.eql(201)
    });
  })

  it('create organization from my organizations page', () => {
    organization.openModal.click()
    organization.organizationModal()
    organization.organizationInfoOkButton.click()
  })

  it('create board from boards page', () => {
    boards.openBoardModal.click()
    organization.organizationNameInputField.type(data.organization.newBoard)
    organization.nextButton.click()
    boards.boardTypeCheckBoxScrum.click()
    organization.nextButton.click()
    organization.nextButton.click()
    organization.nextButton.click()
  })

  it('create new column on the board', () => {
    boards.addNewColumnButton.click().type(data.board.columnSpintName).type('{enter}')
  })

  it('create new task in new column', () => {
    boards.addNewTaskToSprint.click({ force: true }),
    boards.taskTitleTextArea.type(data.board.taskName),
    boards.saveNewTaskButton.click(),
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
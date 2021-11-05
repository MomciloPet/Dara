module.exports = {
  get openBoardModal() {
    return cy.get("div[class='vs-c-organization-boards__item--add-new']");
  },
  get closeBoardModal() {
    return cy.get("button[name='close-new-board-modal-btn']");
  },
  get organizationDropDown() {
    return cy.get("input[class='el-input__inner']");
  },
  get selectFromDropDown() {
    return cy.get(".el-select-dropdown__item");
  },
  get selectNewFromDropDown() {
    return cy.get("li[class='el-select-dropdown__item vs-c-select-dropdown__item vs-c-new-board-dropdown']");
  },
  get boardTitleInputField() {
    return cy.get("input[name='name']");
  },
  get boardTypeCheckBoxScrum() {
    return cy.get("span[name='type_scrum']");
  },
  get boardTypeCheckBoxKanban() {
    return cy.get("span[name='type_kanban']");
  },
  get openBoard() {
    return cy.get("div[class='vs-c-boards-item__active-sprints']");
  },
  get addTeamMember() {
    return cy.get("span[class='el-tooltip']");
  },
  get membersButton() {
    return cy.get("div[class='vs-c-boards-item__content-section-title']");
  },
  get addTeamMemberInputField() {
    return cy.get("input[class='multiselect__input']");
  },
  get selectFromAutocompleteDropDown() {
    return cy.get(".multiselect__option.multiselect__option--highlight");
  },
  get arhiveBoard() {
    return cy.get(".vs-c-organization__body .vs-c-organization-boards__item:nth-of-type(1) .vs-c-boards-item__actions div");
  },
  get reopenBoard() {
    return cy.get(".vs-c-boards-item__actions.vs-u-display--flex > div:nth-of-type(2)");
  },
  get deleteBoard() {
    return cy.get(".vs-c-organization-boards__item.vs-c-organization-boards__item--archived > .vs-c-boards-item__header > .vs-c-boards-item__actions.vs-u-display--flex > div:nth-of-type(1)");
  },
  get addNewColumnButton() {
    return cy.get(".not-sortable.vs-add-column-btn-gap.vs-c-col.vs-is-empty > .vs-add-new-task.vs-c-btn.vs-c-btn--round.vs-c-btn--sm.vs-c-btn--themify-primary");
  },
  get addNewTaskToSprint() {
    return cy.get("div:nth-of-type(3) > .vs-c-task-list.vs-is-empty > .vs-add-new-task.vs-c-btn.vs-c-btn--round.vs-c-btn--sm.vs-c-btn--themify-primary");
  },
  get cancelNewTaskButton() {
    return cy.get("button[name='new_item_cancel']");
  },
  get taskTitleTextArea() {
    return cy.get("div[class='el-textarea item-textarea']");
  },
  get saveNewTaskButton() {
    return cy.get("button[name='new_item_save']");
  },
  get updateTitleButton() {
    return cy.get("button[name='update_item_title']");
  },
  get getHiddenElements() {
    return cy.get("div[class='vs-c-not-visible-controls vs-u-gap--right-sm']");
  },
  get editTitleButton() {
    return cy.get("a[title='Edit Item title']");
  },
  get moveTaskButton() {
    return cy.get("div:nth-of-type(2) > div[title='Move']");
  },
  get selectSprintFromDropDown() {
    return cy.get("div[name='sprint-info-dropdown']");
  },
  get choseSprintFromDropDown() {
    return cy.get("span[class='vs-c-task-modal-type-dropdown__item-name']");
  },
  get menagePerformers() {
    return cy.get("div[class='vs-c-new-assignee-icon vs-u-img--round']");
  },
  get taskDropDown() {
    return cy.get(".vs-c-task-card__not-selectable [title='More']");
  },
  get deleteFromDropDownButton() {
    return cy.get("a:nth-of-type(2) > span");
  },
  get columnDropDownButton() {
    return cy.get("button[class='vs-c-btn vs-c-btn--link vs-c-btn--sm']");
  },
  get deleteColumnFromDropDownButton() {
    return cy.get("li:nth-of-type(1) > .vs-c-dropdown-item-column-limit");
  },
  get modalDeleteYesButton() {
    return cy.get("button[name='save-btn']");
  },
  get startSprint() {
    return cy.get("li:nth-of-type(3) > .vs-c-dropdown-item-column-limit");
  },
  get sprintGoalTextArea() {
    return cy.get("textarea[name='sprint_goal']");
  }

}
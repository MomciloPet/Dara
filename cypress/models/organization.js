module.exports = {
  get openModal() {
    return cy.get("div[class='vs-c-my-organization vs-c-my-organization--add-new not-sortable']");
  },
  get closeModal() {
    return cy.get("button[name='close-new-board-modal-btn']");
  },
  get backButton() {
    return cy.get("button[name='prev_btn']");
  },
  get organizationNameInputField() {
    return cy.get("input[name='name']");
  },
  get nextButton() {
    return cy.get("button[name='next_btn']");
  },
  get upladOrganizationLogo() {
    return cy.get("div[class='el-upload el-upload--text']");
  },
  get organizationItem() {
    return cy.get("div[class='vs-c-my-organization organization-list-item']");
  },
  get newOrganizationItem() {
    return cy.get("div[class='vs-c-my-organization vs-c-my-organization--add-new not-sortable']");
  },
  get organizationInfoOkButton() {
    return cy.get("button[class='vs-c-btn vs-c-btn--primary vs-c-btn--lg vs-u-font-sm vs-c-modal--features-confirm-button']");
  },
  get editOrganizationName() {
    return cy.get("span[title='Edit Organization']");
  },
  get editOrganizationNameInputField() {
    return cy.get("input[name='change-organization-name']");
  },
  get confirmEditOrganizationName() {
    return cy.get("button[name='change-organization-name']");
  },
  get addNewProjectFromOrganizationCard() {
    return cy.get("li[title='Add new Project']");
  },
  get addNewBoardFromOrganizationCard() {
    return cy.get("li[title='Add new Board']");
  },
  get organizationCardHeader() {
    return cy.get("div[class=vs-c-my-organization__header]");
  },
  get archiveOrganizationButton() {
    return cy.get(".vs-c-my-organizations-item-wrapper > div:nth-of-type(1) span[title='Archive Organization']");
  },
  get confirmActionInModal() {
    return cy.get("button[name='save-btn']");
  },
  get reopenOrganization() {
    return cy.get("span[title='Reopen Organization']");
  },
  get deleteOrganizationM() {
    return cy.get("span[title='Delete Organization']");
  },
  get infoButton() {
    return cy.get("li:nth-of-type(8) > span > div > .vs-c-site-logo");
  },
  get infoBoardButton() {
    return cy.get("li:nth-of-type(10) > span > div > .vs-c-site-logo");
  },
  get deleteButton() {
    return cy.get("button[class='vs-c-btn vs-c-btn--warning vs-c-btn--spaced']");
  }
}
module.exports = {
  get homelogoButton() {
    return cy.get("div[class='vs-c-site-logo vs-u-cursor--pointer']");
  },
  get organizationLogoButton() {
    return cy.get("div[class='vs-l-organization__title vs-u-cursor--default']");
  },
  get addToFavorites() {
    return cy.get("div[class='vs-u-cursor--pointer vs-u-gap--right vs-u-display--flex']");
  },
  get searchInputField() {
    return cy.get("input[type='text']");
  },
  get showFinishedSprintsButton() {
    return cy.get("button[name='show_finished_sprints']");
  },
  get showTableView() {
    return cy.get("button[name='show_finished_sprints']+button");
  },
  get moreOptionsDropDown() {
    return cy.get("div[class='el-dropdown']");
  },
  get showFilters() {
    return cy.get("div[class='vs-c-dropdown-wrapper vs-c-filter']");
  },
  get howItWorks() {
    return cy.get(".vs-l-project__options > .el-tooltip.vs-c-btn.vs-c-btn--link");
  },
  get loggoutButton() {
    return cy.get("button[class='vs-c-btn vs-c-btn--link vs-c-btn--danger']");
  }
}
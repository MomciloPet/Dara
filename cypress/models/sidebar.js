module.exports = {
  get collapseButton() {
    return cy.get("div[class='vs-c-list__btn']");
  },
  get hoverAddOrganization() {
    return cy.get("div[class='vs-c-list__btn el-tooltip vs-c-list-btn--new-workspace']");
  },
  get showHideOrganizationButton() {
    return cy.get("button[class='vs-c-btn vs-c-btn--link vs-c-btn--sm vs-c-list__caret collapsed']");
  },
  get selectOrganization() {
    return cy.get(".vs-c-list__oragnisation-item .vs-c-img--avatar");
  },
  get hoverAddBoard() {
    return cy.get("div[class='vs-c-list__btn vs-c-list-btn--add-new el-tooltip']");
  },
  get selectOrganizationFromTooltip() {
    return cy.get("li:nth-of-type(1) > a > span");
  },
  get selectBoardFromTooltip() {
    return cy.get("li:nth-of-type(2) > a > span");
  },
  get selectBoard() {
    return cy.get("a[class='vs-c-list__btn']");
  },
  get showHideBoardButton() {
    return cy.get("button[slot='toggle-button']");
  },
  get goToMyAssignmentsButton() {
    return cy.get("span[class='el-dropdown-link']");
  },
  get myAccount() {
    return cy.get("img[class='vs-u-img--round vs-c-user-avatar']");
  },
  get myAccountProfile() {
    return cy.get("li:nth-of-type(4) > span > div > .vs-c-site-logo");
  },
  get addBoardToFavorites() {
    return cy.get(".vs-c-list.vs-c-list--boards > .vs-c-list__item.vs-c-list__item-board .vs-c-list__btn > div:nth-of-type(1)");
  }
}
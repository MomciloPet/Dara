import data from "../fixtures/data.json"
import {randomString} from "../support/helperFunctions"

const randomEmail = `${data.user.firstPart}${randomString()}${data.user.secondPart}`;

module.exports = {
  get emailInput() {
    return cy.get("input[type='email']");
  },
  get passwordInput() {
    return cy.get("input[type='password']");
  },
  get submitButton() {
    return cy.get("button[type='submit']");
  },
  get noUsersInputField() {
    return cy.get("input[name='number_of_users']");
  },
  get termsAndPrivacyPolicyCheckBox() {
    return cy.get("span[class='vs-c-checkbox-check']");
  },
  get inputFieldLabel() {
    return cy.get("label[class='el-form-item__label vs-u-text--uppercase']");
  },
  get switchToLoginButton() {
    return cy.get("a[class='vs-c-btn vs-c-btn--link']");
  },
  get goToFacebookButton() {
    return cy.get("button[class='vs-c-btn vs-c-btn--social-auth vs-c-btn--fb']");
  },
  get goToTwiterButton() {
    return cy.get("button[class='vs-c-btn vs-c-btn--social-auth vs-c-btn--tw']");
  },
  get goToRegzenButton() {
    return cy.get("button[class='vs-c-btn vs-c-btn--social-auth vs-c-btn--regzen']");
  },
  get freeSignUpButton() {
    return cy.get("a[class='vsp-c-btn vsp-c-btn--secondary vsp-c-btn--nowrap vsp-c-pricing-btn--small']");
  },
  get addAcountDetailsCancelButton() {
    return cy.get(".vs-c-btn--danger");
  },
  get errorMessages() {
    return cy.get("span[class='el-form-item__error el-form-item-error--top']");
  },
  get mainErrorMessage() {
    return cy.get("span[class='el-form-item__error']");
  },
  get emailExistsError() {
    return cy.get("div[class='el-message']");
  },
  get forgotPassButton() {
    return cy.get("a[class='vs-c-auth-modal__body-text vs-c-auth-modal__body-text--small']");
  },
  get backToHomeButton() {
    return cy.get("a[class='vs-u-font-bold vs-u-text--uppercase vs-c-auth-modal__body-text']");
  },
  get switchToSignupButton() {
    return cy.get("a[class='vs-u-font-bold vs-c-auth-modal__bottom-text-main vs-u-text--uppercase']");
  },

  login({ email = data.user.email, password = data.user.password }) {
    if (email == "") {
      this.passwordInput.should("be.visible").type(password);
      this.submitButton.click();
    } else if (password == "") {
      this.emailInput.should("be.visible").type(email);
      this.submitButton.click();
    } else {
      cy.intercept("POST", "**/api/v2/login").as("login");
      this.emailInput.should("be.visible").type(email);
      this.passwordInput.should("be.visible").type(password);
      this.submitButton.click();
      if (email == data.user.email && password == data.user.password) {
        cy.wait("@login").then((intercept) => {
          expect(intercept.response.statusCode).to.eql(200);
        });
      }
    }
  },

  register({ email = randomEmail, password = data.user.password, numberOfUsers = data.user.numberOfUsers, checkBox = false}) {
    if (email == "") {
      this.passwordInput.should("be.visible").type(password);
      this.noUsersInputField.should("be.visible").type(numberOfUsers);
      this.submitButton.click();
    } else if (password == "") {
      this.emailInput.should("be.visible").type(email);
      this.noUsersInputField.should("be.visible").type(numberOfUsers);
      this.submitButton.click();
    } else if (numberOfUsers == "") {
      this.emailInput.should("be.visible").type(email);
      this.passwordInput.should("be.visible").type(password);
      this.submitButton.click();
    } else {
      cy.log(email, password)
      cy.intercept("POST", "**/api/v2/register").as("register");
      this.emailInput.should("be.visible").type(email);
      this.passwordInput.should("be.visible").type(password);
      this.noUsersInputField.should("be.visible").type(numberOfUsers);
      if (checkBox) {
        this.termsAndPrivacyPolicyCheckBox.click()
      }
      this.submitButton.click();
      if ( email == randomEmail && password == data.user.password && numberOfUsers == data.user.numberOfUsers && checkBox == false) {
        cy.wait("@register").then((intercept) => {
          expect(intercept.response.statusCode).to.eql(200);
        });
      }
    }
  },
}
import { Page, Locator } from "@playwright/test";
import { BasePage } from "../basePage";
import { TestConfig } from "../../testData/config/env.config";

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logo: Locator;
  readonly forgotPassword: Locator;
  readonly recoverPasswordText: Locator;
  readonly usernameForResetPasswordInput: Locator;
  readonly alertMessage: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  readonly url: string;

  constructor(page: Page) {
    super(page);

    this.url = TestConfig.baseUrl;

    this.usernameInput = page.locator("#loginUsername");
    this.passwordInput = page.locator("#loginPassword");
    this.loginButton = page.locator("#login-button");
    this.logo = page.locator("//img[@class='anddone-logo']");
    this.forgotPassword = page.locator(
      "//a[normalize-space()='Forgot Password?']",
    );
    this.recoverPasswordText = page.locator(
      "//h5[normalize-space()='Recover Password']",
    );
    this.usernameForResetPasswordInput = page.locator(
      "//input[@id='userEmail']",
    );
    this.alertMessage = page.locator(
      "//div[normalize-space()='User Name is invalid']",
    );
    this.submitButton = page.locator(".button.button-green");
    this.successMessage = page.locator("#toast-container > div.toast-success");
  }

  async navigate() {
    await this.navigateTo(this.url);
  }

  async login(username: string, password: string) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
    await this.page.waitForTimeout(10000);
    //await this.page.waitForLoadState("networkidle");
  }

  async loginAsAlly(allyKey: "ally1" | "ally2" | "ally3") {
    const ally = TestConfig.allies[allyKey];

    if (!ally?.username || !ally?.password) {
      throw new Error(
        `❌ Missing credentials for ${allyKey} in ${TestConfig.env}`,
      );
    }

    await this.navigate();
    await this.login(ally.username, ally.password);
  }

  async navigateToForgotPassword() {
    await this.navigate();
    await this.click(this.forgotPassword);
  }
}

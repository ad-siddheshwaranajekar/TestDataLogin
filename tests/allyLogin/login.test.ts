import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login/loginPage";
import { TestConfig } from "../../testData/config/env.config";

test.describe("Login Module", () => {
  test("Login with valid credentials 1 @smoke @regression", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.loginAsAlly("ally1"); // Use dynamic ally credentials

    const usersHeader = page.locator("//h3[normalize-space()='Users']");
    await expect(usersHeader).toBeVisible({ timeout: 15000 });
    await expect(usersHeader).toHaveText("Users");
  });

  test("Login with valid credentials 2 @smoke @regression", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.loginAsAlly("ally2"); // Use dynamic ally credentials

    const usersHeader = page.locator("//h3[normalize-space()='Users']");
    await expect(usersHeader).toBeVisible({ timeout: 15000 });
    await expect(usersHeader).toHaveText("Users");
  });

  test("Login with invalid credentials @regression", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login("invalidUser", "wrongPass");

    const errorAlert = page.locator(
      "//div[@role='alert' and @aria-label='We could not log you in. Please check your credentials and try again.']",
    );

    await expect(errorAlert).toBeVisible({ timeout: 15000 });
    await expect(errorAlert).toHaveText(
      "We could not log you in. Please check your credentials and try again.",
    );
  });

  test("Verify that logo is present on login page @smoke", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await expect(loginPage.logo).toBeVisible({ timeout: 15000 });
  });

  test("Verify that clicking on forgot password navigates to recover password popup @smoke", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToForgotPassword();
    await expect(loginPage.recoverPasswordText).toBeVisible({ timeout: 15000 });
  });

  test.skip("Verify that user is able to reset password successfully", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToForgotPassword();
    await loginPage.usernameForResetPasswordInput.fill(
      TestConfig.allies.ally1.username!,
    );
    await loginPage.submitButton.click();
    await expect(loginPage.successMessage).toBeVisible({ timeout: 15000 });
  });

  test.skip("Verify that entering invalid username gives alert message on forgot password page @regression", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToForgotPassword();
    await loginPage.usernameForResetPasswordInput.fill("invalidUser");
    await loginPage.submitButton.click();
    await page.waitForTimeout(2000);
    await expect(loginPage.alertMessage).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(1000);
    await expect(loginPage.alertMessage).toHaveText("User Name is invalid");
  });
});

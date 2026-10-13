import { test, expect } from "@playwright/test";
import { testData } from "../src/data/baseData";
import { flow } from "../src/config/urls";
import { Steps } from "../src/pages/steps";
import { Locators as l } from "../src/pages/locators";
import { Message } from "../src/data/enums";

const step = new Steps();

test.beforeEach(async ({ page }) => {
  await step.open(page, "LOGIN");
});

test.afterEach(async ({ page }) => {
  await test.info().attach("Last page URL", {
    body: page.url(),
    contentType: "text/plain",
  });
  const screenshot = await page.screenshot({ timeout: 60000, fullPage: true });
  await test.info().attach("full-page", {
    body: screenshot,
    contentType: "image/png",
  });
});

test("valid user can log in", { tag: "@smoke" }, async ({ page }) => {
  await step.login(page, testData.standardUser);
  await expect(page, "Lands on the Inventory page").toHaveURL(flow.INVENTORY.url);
  await expect(page.locator(l.inventoryPage.title), "Page title is Products").toHaveText("Products");
});

test("locked out user sees an error", { tag: "@login" }, async ({ page }) => {
  await step.login(page, testData.lockedOutUser);
  await expect(page.locator(l.loginPage.error), "Locked out error is shown").toHaveText(Message.LockedOut);
});

test("wrong password shows an error", { tag: "@login" }, async ({ page }) => {
  await step.login(page, testData.wrongPasswordUser);
  await expect(page.locator(l.loginPage.error), "Wrong credentials error is shown").toHaveText(
    Message.WrongCredentials
  );
});

test("user can log out", { tag: "@login" }, async ({ page }) => {
  await step.login(page, testData.standardUser);
  await step.logout(page);
  await expect(page.locator(l.loginPage.loginButton), "Back on the login page").toBeVisible();
});

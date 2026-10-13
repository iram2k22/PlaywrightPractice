import { test, expect } from "@playwright/test";
import { testData } from "../src/data/baseData";
import { Steps } from "../src/pages/steps";
import { Locators as l } from "../src/pages/locators";
import { Message, Product } from "../src/data/enums";

const step = new Steps();

test.beforeEach(async ({ page }) => {
  await step.open(page, "LOGIN");
  await step.login(page, testData.standardUser);
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

/*
test("Making sure I can order.", async ({ page }) => {
  await step.addToCart(page, Product.Backpack);
  await step.addToCart(page, Product.BikeLight);
  await step.openCart(page);
  await expect(
    page.locator(l.cartPage.cartItem),
    "Checking for 2 items in cart.",
  ).toHaveCount(2);
});
*/

test(
  "user can complete an order",
  { tag: ["@smoke", "@checkout"] },
  async ({ page }) => {
    await step.addToCart(page, Product.Backpack);
    await step.openCart(page);
    await expect(
      page.locator(l.cartPage.cartItem),
      "Cart has 1 item",
    ).toHaveCount(1);
    await step.startCheckout(page);
    await step.fillCheckoutInfo(page, testData.shopper);
    await step.finishOrder(page);
    await expect(
      page.locator(l.checkoutPage.completeHeader),
      "Order confirmation is shown",
    ).toHaveText(Message.OrderComplete);
  },
);

test("cart shows every added item", { tag: "@checkout" }, async ({ page }) => {
  await step.addToCart(page, Product.Backpack);
  await step.addToCart(page, Product.BoltTShirt);
  const actualCount = await step.openCart(page);

  const expectedCount = 2;
  const numberWords = ["Zero", "One", "Two", "Three", "Four", "Five", "Six"];

  try {
    if (actualCount !== expectedCount) {
      throw new Error(
        `We are expecting ${numberWords[expectedCount]} Items but ${numberWords[actualCount]} in cart`,
      );
    }
    await test.step(`Cart has ${numberWords[expectedCount]} Items`, async () => {});
  } catch (error) {
    await test.step(`Cart doesn't have ${numberWords[expectedCount]} Items`, async () => {
      throw error;
    });
  }
});

test("This is my test", async ({ page }) => {
  await step.addToCart(page, Product.Backpack);
  await step.addToCart(page, Product.BoltTShirt);
  await step.openCart(page);
  await expect(
    page.locator(l.cartPage.cartItem),
    "Cart Has Two Items",
  ).toHaveCount(2);
});

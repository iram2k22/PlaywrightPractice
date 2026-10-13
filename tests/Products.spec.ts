import { test, expect } from "@playwright/test";
import { testData } from "../src/data/baseData";
import { Steps } from "../src/pages/steps";
import { Locators as l } from "../src/pages/locators";
import { Product, SortOption } from "../src/data/enums";

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

test("sort by price low to high", { tag: "@products" }, async ({ page }) => {
  await step.sortBy(page, SortOption.PriceLowHigh);
  const prices = await step.readPrices(page);
  const sortedLowToHigh = [...prices].sort((a, b) => a - b);
  expect(prices, "Prices are in ascending order").toEqual(sortedLowToHigh);
});

test("sort by price high to low", { tag: "@products" }, async ({ page }) => {
  await step.sortBy(page, SortOption.PriceHighLow);
  const prices = await step.readPrices(page);
  const sortedHighToLow = [...prices].sort((a, b) => b - a);
  expect(prices, "Prices are in descending order").toEqual(sortedHighToLow);
});

test(
  "adding two items updates the cart badge",
  { tag: "@products" },
  async ({ page }) => {
    await step.addToCart(page, Product.Backpack);
    await step.addToCart(page, Product.BikeLight);
    await expect(
      page.locator(l.inventoryPage.cartBadge),
      "Cart badge shows 2",
    ).toHaveText("2");
  },
);

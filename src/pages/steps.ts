import { Page, test } from "@playwright/test";
import { Locators as l } from "./locators";
import { CheckoutInfo, FlowKey, User } from "../data/types";
import { Product, SortOption, sortLabel } from "../data/enums";
import { getUrl } from "../config/urls";
import { flow } from "../config/urls";

// Stateless actions. No constructor: every method receives the page
// (the browser tab) and the data (what to type) from the test.
// Each action is wrapped in test.step so the HTML report reads like a
// script ("Entered username as standard_user") instead of raw selectors.
// box: true makes a failure point at the line in the spec, not in here.
export class Steps {
  async open(page: Page, flowKey: FlowKey) {
    const url = getUrl(flowKey);
    await test.step(
      `Opened ${flow[flowKey].name} (${url})`,
      async () => {
        await page.goto(url);
      },
      { box: true },
    );
  }
  async completeMyOrder(page: Page) {
    await test.step("Complete my order.", async () => {
      await page.getByAltText(l.checkoutPage.finishButton).click();
    });
  }

  async login(page: Page, user: User) {
    await test.step(
      `Logged in as ${user.username}`,
      async () => {
        await test.step(`Entered username as ${user.username}`, async () => {
          await page.locator(l.loginPage.username).fill(user.username);
        });
        // Never print the real password in the report
        await test.step(`Entered password as ${"*".repeat(user.password.length)}`, async () => {
          await page.locator(l.loginPage.password).fill(user.password);
        });
        await test.step("Clicked Login button", async () => {
          await page.locator(l.loginPage.loginButton).click();
        });
      },
      { box: true },
    );
  }

  async logout(page: Page) {
    await test.step(
      "Logged out",
      async () => {
        await test.step("Opened side menu", async () => {
          await page.locator(l.inventoryPage.menuButton).click();
        });
        await test.step("Clicked Logout link", async () => {
          await page.locator(l.inventoryPage.logoutLink).click();
        });
      },
      { box: true },
    );
  }

  async sortBy(page: Page, option: SortOption) {
    await test.step(
      `Sorted products by ${sortLabel[option]}`,
      async () => {
        await page.locator(l.inventoryPage.sortDropdown).selectOption(option);
      },
      { box: true },
    );
  }

  // Reads every price on the page as a number, e.g. "$29.99" -> 29.99
  async readPrices(page: Page): Promise<number[]> {
    return test.step(
      "Read all product prices",
      async () => {
        const texts = await page
          .locator(l.inventoryPage.itemPrice)
          .allTextContents();
        const prices = texts.map((t) => parseFloat(t.replace("$", "")));
        await test.info().attach("Prices on page", {
          body: prices.join(", "),
          contentType: "text/plain",
        });
        return prices;
      },
      { box: true },
    );
  }

  async addToCart(page: Page, product: Product) {
    await test.step(
      `Added ${product} to cart`,
      async () => {
        await page.locator(l.addToCart(product)).click();
      },
      { box: true },
    );
  }

  // Returns how many items are in the cart, so tests can check it
  // without adding extra lines to the report.
  async openCart(page: Page) {
    return await test.step(
      "Opened cart",
      async () => {
        await page.locator(l.inventoryPage.cartLink).click();
        await page.locator(l.cartPage.checkoutButton).waitFor();
        return await page.locator(l.cartPage.cartItem).count();
      },
      { box: true },
    );
  }

  async startCheckout(page: Page) {
    await test.step(
      "Clicked Checkout button",
      async () => {
        await page.locator(l.cartPage.checkoutButton).click();
      },
      { box: true },
    );
  }

  async fillCheckoutInfo(page: Page, info: CheckoutInfo) {
    await test.step(
      "Filled checkout information",
      async () => {
        await test.step(`Entered first name as ${info.firstName}`, async () => {
          await page.locator(l.checkoutPage.firstName).fill(info.firstName);
        });
        await test.step(`Entered last name as ${info.lastName}`, async () => {
          await page.locator(l.checkoutPage.lastName).fill(info.lastName);
        });
        await test.step(`Entered postal code as ${info.postalCode}`, async () => {
          await page.locator(l.checkoutPage.postalCode).fill(info.postalCode);
        });
        await test.step("Clicked Continue button", async () => {
          await page.locator(l.checkoutPage.continueButton).click();
        });
      },
      { box: true },
    );
  }

  async completeOrder(page: Page) {
    await test.step("Complete this order", async () => {
      await page.locator(l.checkoutPage.finishButton).click();
    });
  }

  async finishOrder(page: Page) {
    await test.step("Completed this step", async () => {
      await page.locator(l.checkoutPage.finishButton).click();
    });
  }
}

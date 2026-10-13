import { Product } from "../data/enums";

// All selectors live here, grouped by page.
// When the UI changes, this is the file to fix.
export class Locators {
  static loginPage = {
    username: "#user-name",
    password: "#password",
    loginButton: "#login-button",
    error: '[data-test="error"]',
  };

  static inventoryPage = {
    title: ".title",
    itemPrice: ".inventory_item_price",
    sortDropdown: '[data-test="product-sort-container"]',
    cartBadge: ".shopping_cart_badge",
    cartLink: ".shopping_cart_link",
    menuButton: "#react-burger-menu-btn",
    logoutLink: "#logout_sidebar_link",
  };

  static cartPage = {
    cartItem: ".cart_item",
    checkoutButton: "#checkout",
  };

  static checkoutPage = {
    firstName: "#first-name",
    lastName: "#last-name",
    postalCode: "#postal-code",
    continueButton: "#continue",
    finishButton: "#finish",
    completeHeader: ".complete-header",
  };

  // Selector that depends on the product
  static addToCart = (product: Product) => `#add-to-cart-${product}`;
}

import { TestData } from "./types";

// Public demo credentials published on the SauceDemo login page.
export const testData: TestData = {
  standardUser: { username: "standard_user", password: "secret_sauce" },
  lockedOutUser: { username: "locked_out_user", password: "secret_sauce" },
  wrongPasswordUser: { username: "standard_user", password: "not_the_password" },
  shopper: { firstName: "Alex", lastName: "Tester", postalCode: "A1A 1A1" },
};

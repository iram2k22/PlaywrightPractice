// Allowed flows. Anything not listed here fails at compile time.
export type FlowKey = "LOGIN" | "INVENTORY";

export type User = {
  username: string;
  password: string;
};

export type CheckoutInfo = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export type TestData = {
  standardUser: User;
  lockedOutUser: User;
  wrongPasswordUser: User;
  shopper: CheckoutInfo;
};

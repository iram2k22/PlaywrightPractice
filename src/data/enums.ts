// Fixed values: dropdown options, product ids, and expected messages.
// If the app's wording changes, fix it here once.

export enum SortOption {
  NameAZ = "az",
  NameZA = "za",
  PriceLowHigh = "lohi",
  PriceHighLow = "hilo",
}

// Readable names for the report ("lohi" means nothing to a reader).
// Record<SortOption, ...> forces a label for every option.
export const sortLabel: Record<SortOption, string> = {
  [SortOption.NameAZ]: "Name (A to Z)",
  [SortOption.NameZA]: "Name (Z to A)",
  [SortOption.PriceLowHigh]: "Price (low to high)",
  [SortOption.PriceHighLow]: "Price (high to low)",
};

export enum Product {
  Backpack = "sauce-labs-backpack",
  BikeLight = "sauce-labs-bike-light",
  BoltTShirt = "sauce-labs-bolt-t-shirt",
}

export enum Message {
  LockedOut = "Epic sadface: Sorry, this user has been locked out.",
  WrongCredentials = "Epic sadface: Username and password do not match any user in this service",
  OrderComplete = "Thank you for your order!",
}

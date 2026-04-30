import { Locator } from "@playwright/test";

/**
 * Represents the domain data of a product.
 * Clean model — no UI dependencies.
 */
export type Product = {
  name: string;
  price: number;
};

/**
 * Extends Product with a reference to its UI element.
 * Used internally by page objects to perform actions (add to cart, etc.).
 * Should NOT be serialized, logged as JSON, or passed across page boundaries.
 */
export type ProductWithLocator = Product & {
  item: Locator;
};
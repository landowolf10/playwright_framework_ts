import { expect, Locator, Page } from "@playwright/test";
import { TIMEOUTS } from "../../config/constants";

/**
 * Resolves a string selector or Locator into a Locator.
 * Supports both string selectors and Playwright Locator instances.
 */
function resolveLocator(page: Page, locator: string | Locator): Locator {
  return typeof locator === "string" ? page.locator(locator) : locator;
}

/**
 * Assert that an element is visible on the page.
 */
export async function assertVisible(
  page: Page,
  locator: string | Locator,
  message: string,
  timeout: number = TIMEOUTS.short
): Promise<void> {
  const element = resolveLocator(page, locator);
  await expect(element, message).toBeVisible({ timeout });
}

/**
 * Assert element is hidden.
 */
export async function assertHidden(
  page: Page,
  locator: string | Locator,
  message: string,
  timeout: number = TIMEOUTS.short
): Promise<void> {
  const element = resolveLocator(page, locator);
  await expect(element, message).toBeHidden({ timeout });
}

/**
 * Assert that two strings are equal.
 */
export function assertTextEquals(
  actual: string,
  expected: string,
  message: string
): void {
  expect(actual, message).toEqual(expected);
}

/**
 * Assert that an element contains the expected text.
 */
export async function assertHasText(
  locator: Locator,
  expected: string | RegExp,
  message: string
): Promise<void> {
  await expect(locator, message).toContainText(expected);
}

/**
 * Assert that a number is greater than a minimum value.
 */
export function assertGreaterThan(
  value: number,
  min: number,
  message: string
): void {
  expect(value, message).toBeGreaterThan(min);
}

/**
 * Assert that a value is truthy.
 */
export function assertTruthy(value: unknown, message: string): void {
  expect(value, message).toBeTruthy();
}

/**
 * Assert that a number equals an expected value.
 * Uses Playwright's expect for proper error context (screenshot, trace).
 */
export function assertNumberEquals(
  actual: number,
  expected: number,
  message: string
): void {
  expect(actual, message).toBe(expected);
}
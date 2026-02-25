import { expect, Locator } from "@playwright/test";
import { TIMEOUTS } from "../config/constants";

export async function assertVisible(element: Locator, name: string, timeout: number = TIMEOUTS.short) {
  await expect(element, `${name} should be visible`).toBeVisible({ timeout });
}

export async function assertEqualsTextString(
  actual: string,
  expected: string,
  name: string
): Promise<void> {
  expect(actual, `${name} should equal text: ${expected}`).toEqual(expected);
}

export async function assertHasText(element: Locator, expected: string, name: string): Promise<void> {
  await expect(element, `${name} should contain text: ${expected}`).toHaveText(expected);
}
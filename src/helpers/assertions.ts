import { expect, Locator } from "@playwright/test";

export async function assertVisible(element: Locator, name: string) {
  await expect(element, `${name} should be visible`).toBeVisible();
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
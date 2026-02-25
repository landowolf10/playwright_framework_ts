import { expect, Locator, Page } from "@playwright/test";
import { TIMEOUTS } from "../config/constants";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForVisible(locator: Locator, timeout: number = TIMEOUTS.short) {
    await locator.waitFor({ state: "visible", timeout });
  }

  async waitForHidden(locator: Locator, timeout: number = TIMEOUTS.short) {
    await locator.waitFor({ state: "hidden", timeout });
  }

  async waitForEnabled(locator: Locator, timeout: number = TIMEOUTS.short) {
    await expect(locator).toBeEnabled({ timeout });
  }

  async getAllElements(locator: Locator, timeout: number = TIMEOUTS.short): Promise<Locator[]> {
    await locator.first().waitFor({ state: "visible", timeout });
    return await locator.all();
  }

  async writeText(locator: Locator, text: string, timeout: number = TIMEOUTS.short) {
    await this.waitForVisible(locator, timeout);
    await locator.fill(text);
  }

  async clickElement(locator: Locator, timeout: number = TIMEOUTS.short) {
    await this.waitForVisible(locator, timeout);
    await locator.click();
  }

  async getElementText(locator: Locator, timeout: number = 5000): Promise<string> {
    await this.waitForVisible(locator, timeout);
    return await locator.textContent() ?? "";
  }

  async selectDropdownOption(locator: Locator, option: string, timeout: number = 5000) {
    await this.waitForVisible(locator, timeout);
    await locator.selectOption(option);
  }

  async scrollToElement(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  async waitForPageLoad(state: "load" | "domcontentloaded" | "networkidle" = "load") {
    await this.page.waitForLoadState(state);
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ 
      path: `reports/screenshots/${name}.png` 
    });
  }
}
import { Locator, Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async writeText(locator: Locator, text: string) {
    await locator.fill(text);
  }

  async clickElement(locator: Locator) {
    await locator.click();
  }

  async getElementText(locator: Locator): Promise<string | null> {
    return await locator.textContent();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `reports/screenshots/${name}.png` });
  }
}
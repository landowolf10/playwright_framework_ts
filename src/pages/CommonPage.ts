import { BasePage } from "../helpers/BasePage";
import { ENV } from "../config/env.config";
import { Page } from "@playwright/test";
import { LoginLocators } from "../locators/login_locators";

export class CommonPage extends BasePage {
  private readonly loginLocators: LoginLocators;

  constructor(page: Page) {
    super(page);
    this.loginLocators = new LoginLocators(page);
  }

  async navigateToSauceLab() {
    await this.page.goto(ENV.baseURL);
  }

  async login(userName: string, password: string) {
    await this.writeText(this.loginLocators.userTextbox, userName);
    await this.writeText(this.loginLocators.passwordTextbox, password);
    await this.clickElement(this.loginLocators.loginButton);
  }
}
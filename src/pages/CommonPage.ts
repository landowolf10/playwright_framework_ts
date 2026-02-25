import { BasePage } from "../helpers/BasePage";
import { ENV } from "../config/env.config";
import { Page } from "@playwright/test";
import { LoginLocators } from "../locators/login_locators";
import { DashboardLocators } from "../locators/dashboard_locators";
import { assertVisible } from "../helpers/assertions";

export class CommonPage extends BasePage {
  private readonly loginLocators: LoginLocators;
  private readonly dashboardLocators: DashboardLocators;

  constructor(page: Page) {
    super(page);
    this.loginLocators = new LoginLocators(page);
    this.dashboardLocators = new DashboardLocators(page);
  }

  async navigateToSauceLab() {
    await this.page.goto(ENV.baseURL);
  }

  async login(userName: string, password: string) {
    await this.writeText(this.loginLocators.userTextbox, userName);
    await this.writeText(this.loginLocators.passwordTextbox, password);
    await this.clickElement(this.loginLocators.loginButton);
  }

  async assertLoginSuccess() {
    await assertVisible(this.dashboardLocators.cartIcon, "Cart Icon");
    await assertVisible(this.dashboardLocators.sortDropDown, "Dropdown");
  }

  async goToCart() {
    await this.clickElement(this.dashboardLocators.cartIcon)
  }
}
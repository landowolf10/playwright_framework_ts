import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { CartPage } from "../pages/CartPage";
import { logger } from "../helpers/logger";
import { allure } from "allure-playwright";
import { users } from "../config/test-data";

type Pages = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  cartPage: CartPage;
};

type ExtraFixtures = {
  navigateToSauceLab: void;
  loginAsStandardUser: void;
};

export const test = base.extend<Pages & ExtraFixtures>({
  page: async ({ page }, use, testInfo) => {
    logger.info(`Running test: ${testInfo.title}`);
    await allure.label("device", testInfo.project.name);
    await allure.label("browser", testInfo.project.name);
    await use(page);
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  loginAsStandardUser: async ({ loginPage }, use) => {
    await loginPage.navigateToSauceLab();
    await loginPage.login(users.standard);
    await use();
  },
  navigateToSauceLab: async ({ loginPage }, use) => {
    await loginPage.navigateToSauceLab();
    await use();
  }
});

export const expect = test.expect;

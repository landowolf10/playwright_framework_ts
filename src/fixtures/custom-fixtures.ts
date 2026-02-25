import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { CommonPage } from "../pages/CommonPage";
import { DashboardPage } from "../pages/DashboardPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { users } from "../config/test-data";

type Pages = {
  loginPage: LoginPage;
  commonPage: CommonPage;
  dashboardPage: DashboardPage;
  checkoutPage: CheckoutPage;
};

type ExtraFixtures = {
  navigateToSauceLab: void;
  validLogin: void;
};

export const test = base.extend<Pages & ExtraFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  commonPage: async ({ page }, use) => {
    await use(new CommonPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  navigateToSauceLab: async ({ commonPage }, use) => {
    await commonPage.navigateToSauceLab();
    await use();
  },
  validLogin: async ({ commonPage }, use) => {
    await commonPage.navigateToSauceLab();
    await commonPage.login(users.standard.username, users.standard.password);
    await use();
  },
});

export const expect = test.expect;

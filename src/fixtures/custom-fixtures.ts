import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { CommonPage } from "../pages/CommonPage";
import { DashboardPage } from "../pages/DashboardPage";
import { CheckoutPage } from "../pages/CheckoutPage";

type Pages = {
  loginPage: LoginPage;
  commonPage: CommonPage;
  dashboardPage: DashboardPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<Pages>({
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
});

export const expect = test.expect;

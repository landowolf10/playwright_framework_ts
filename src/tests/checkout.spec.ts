import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { assert } from 'console';
import { DashboardPage } from '../pages/DashboardPage';
import { CheckoutPage } from '../pages/CheckoutPage';

let loginPage: LoginPage;
let dashboardPage: DashboardPage;
let checkoutPage: CheckoutPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
  checkoutPage = new CheckoutPage(page);
  await loginPage.navigateToSauceLab();
  await loginPage.writeUsername('standard_user');
  await loginPage.writePassword('secret_sauce');
  await loginPage.clickLoginButton();
})

test.describe('Complete checkout', () => {
  test('Proceed with checkout', async ({ }) => {
    await test.step('Sort products from most expensive to cheapest', async () => {
      await dashboardPage.sortWithDropDown();
    })

    await test.step('add two products to the cart less than $20', async () => {
      await dashboardPage.addProduct();
      await dashboardPage.addProduct();
    })
    
    await test.step('add two products to the cart less than $20', async () => {
      await dashboardPage.addProduct();
      await dashboardPage.addProduct();
      await checkoutPage.proceedWithCheckout('Orlando', 'Avila', '40880');
      expect(await checkoutPage.getCurrentSubTotal()).toEqual(await dashboardPage.getSubTotalSum());
    })
  })
});

test.afterEach(async ({ page }) => {
  page.close();
});
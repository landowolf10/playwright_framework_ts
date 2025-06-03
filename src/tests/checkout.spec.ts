import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { assert } from 'console';
import { DashboardPage } from '../pages/DashboardPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CommonPage } from '../pages/Common';

let loginPage: LoginPage;
let dashboardPage: DashboardPage;
let checkoutPage: CheckoutPage;
let commonPage: CommonPage;

test.beforeEach(async ({ page }) => {
  commonPage = new CommonPage(page);
  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
  checkoutPage = new CheckoutPage(page);
  await commonPage.navigateToSauceLab();
  await loginPage.writeUsername('standard_user');
  await loginPage.writePassword('secret_sauce');
  await loginPage.clickLoginButton();
})

//Prueba

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
      expect(await checkoutPage.getCurrentSubTotal()).toEqual('Item total: $49.96');
    })
  })
});

test.afterEach(async ({ page }) => {
  page.close();
});
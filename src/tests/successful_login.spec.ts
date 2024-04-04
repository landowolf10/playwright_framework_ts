import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { assert } from 'console';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.navigateToSauceLab();
})


test.describe('Valid login', () => {
  test('Write valid credentials', async ({ page }) => {
    await test.step('Write user name', async () => {
      await loginPage.writeUsername('standard_user');
    })

    await test.step('Write password', async () => {
      await loginPage.writePassword('secret_sauce');
    })

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    })

    await test.step('Verify successful login', async () => {
      const cartIcon = (await loginPage.getValidLoginElements()).get('cart_icon');
      const sortDropDown = (await loginPage.getValidLoginElements()).get('drop_down');

      expect(await cartIcon?.isVisible()).toBeTruthy();
      expect(await sortDropDown?.isVisible()).toBeTruthy();
    })
  })
});

test.afterEach(async ({ page }) => {
  page.close();
});
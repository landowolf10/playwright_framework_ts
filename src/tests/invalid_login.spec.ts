import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CommonPage } from '../pages/Common';

let loginPage: LoginPage;
let commonPage: CommonPage;

test.beforeEach(async ({ page }) => {
  commonPage = new CommonPage(page);
  loginPage = new LoginPage(page);
  await commonPage.navigateToSauceLab();
})


test.describe('Invalid login', () => {
  test('Write invalid username', async ({ }) => {
    await test.step('Write user name', async () => {
      await loginPage.writeUsername('standard_use');
    })

    await test.step('Write password', async () => {
      await loginPage.writePassword('secret_sauce');
    })

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    })

    await test.step('Verify invalid login', async () => {
      const loginButton = (await loginPage.getInvalidLoginElements()).get('login_button');
      const errorMessage = (await loginPage.getInvalidLoginElements()).get('error_message');

      expect(await loginButton?.isVisible()).toBeTruthy();
      expect(await errorMessage?.isVisible()).toBeTruthy();
      expect(await loginPage.getErrorMessageText()).toEqual('Epic sadface: Username and password do not match any user in this service');
    })
  })

  test('Write invalid password', async ({ }) => {
    await test.step('Write user name', async () => {
      await loginPage.writeUsername('standard_user');
    })

    await test.step('Write password', async () => {
      await loginPage.writePassword('1234');
    })

    await test.step('Click login button', async () => {
      await loginPage.clickLoginButton();
    })

    await test.step('Verify invalid login', async () => {
      const loginButton = (await loginPage.getInvalidLoginElements()).get('login_button');
      const errorMessage = (await loginPage.getInvalidLoginElements()).get('error_message');

      expect(await loginButton?.isVisible()).toBeTruthy();
      expect(await errorMessage?.isVisible()).toBeTruthy();
      expect(await loginPage.getErrorMessageText()).toEqual('Epic sadface: Username and password do not match any user in this service');
    })
  })
});

test.afterEach(async ({ page }) => {
  page.close();
});
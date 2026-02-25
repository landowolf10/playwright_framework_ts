import { test } from "../../fixtures/custom-fixtures";

test.describe('Invalid login', () => {
  test('Write invalid username', async ({ navigateToSauceLab, loginPage }) => {
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

      await loginPage.assertLoginFailed();
      
    })
  })

  test('Write invalid password', async ({ navigateToSauceLab, loginPage }) => {
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
      await loginPage.assertLoginFailed();
    })
  })
});
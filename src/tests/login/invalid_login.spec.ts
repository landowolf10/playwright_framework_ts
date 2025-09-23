import { test } from "../../fixtures/custom-fixtures";
import { assertVisible, assertEqualsTextString } from "../../helpers/assertions";

test.describe('Invalid login', () => {
  test.beforeEach(async ({ commonPage }) => {
    await test.step("Navigate to login page", async () => {
      await commonPage.navigateToSauceLab();
    });
  });

  test('Write invalid username', async ({ loginPage }) => {
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
      const { loginButton, errorMessage } = loginPage.getInvalidLoginElements();
      const errorMessageText = await loginPage.getErrorMessageText();
      
      await assertVisible(loginButton, "Login button");
      await assertVisible(errorMessage, "Error message");

      await assertEqualsTextString(
        errorMessageText,
        "Epic sadface: Username and password do not match any user in this service",
        "Error Message"
      );
    })
  })

  test('Write invalid password', async ({ loginPage }) => {
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
      const { loginButton, errorMessage } = loginPage.getInvalidLoginElements();
      const errorMessageText = await loginPage.getErrorMessageText();
      
      await assertVisible(loginButton, "Login button");
      await assertVisible(errorMessage, "Error message");
      await assertEqualsTextString(
        errorMessageText,
        "Epic sadface: Username and password do not match any user in this service",
        "Error Message"
      );
    })
  })
});
import { test } from "../../fixtures/custom-fixtures";
import { users } from "../../config/test-data";
import { assertVisible } from "../../helpers/assertions";

test.describe("Valid login", () => {
  test.beforeEach(async ({ commonPage }) => {
    await test.step("Navigate to login page", async () => {
      await commonPage.navigateToSauceLab();
    });
  });

  test("User can login with valid credentials", async ({ loginPage }) => {
    await test.step("Enter valid credentials", async () => {
      await loginPage.writeUsername(users.standard.username);
      await loginPage.writePassword(users.standard.password);
    });

    await test.step("Click login button", async () => {
      await loginPage.clickLoginButton();
    });

    await test.step("Verify successful login", async () => {
      const { cartIcon, sortDropDown } = loginPage.getValidLoginElements();
      await assertVisible(cartIcon, "Cart Icon");
      await assertVisible(sortDropDown, "Sort Dropdown");
    });
  });
});
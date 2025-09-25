import { test } from "../../fixtures/custom-fixtures";
import { users } from "../../config/test-data";
import { assertVisible } from "../../helpers/assertions";
import { metrics } from "../../helpers/observability/metrics";

test.describe("Valid login", () => {
  test.beforeEach(async ({ commonPage }) => {
    await test.step("Navigate to login page", async () => {
      await commonPage.navigateToSauceLab();
    });
  });

  test("User can login with valid credentials", async ({ loginPage }) => {
    await test.step("Enter valid credentials", async () => {
      const start = Date.now();

      try {
        await loginPage.writeUsername(users.standard.username);
        await loginPage.writePassword(users.standard.password);

        const testDuration = (Date.now() - start) / 1000;
        metrics.testDuration.labels("checkout", "passed").observe(testDuration)
        metrics.testCounter.labels("checkout", "passed").inc();
      } catch (err) {
        const duration = (Date.now() - start) / 1000;
        metrics.testDuration.labels("checkout", "failed").observe(duration);
        metrics.testCounter.labels("checkout", "failed").inc();
        throw err;
      }
      
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
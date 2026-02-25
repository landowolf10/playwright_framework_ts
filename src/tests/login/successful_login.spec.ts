import { test } from "../../fixtures/custom-fixtures";
import { users } from "../../config/test-data";
import { metrics } from "../../helpers/observability/metrics";

test.describe("Valid login", () => {
  test("User can login with valid credentials", async ({ navigateToSauceLab, commonPage, loginPage }) => {
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
      commonPage.assertLoginSuccess();
    });
  });
});
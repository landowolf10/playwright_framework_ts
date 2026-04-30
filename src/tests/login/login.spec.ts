import { test } from "../../fixtures/custom-fixtures";
import { users } from "../../config/test-data";
import { logger } from "../../helpers/logger";
import { metrics } from "../../helpers/observability/metrics";
import { assertLoginResult } from "../../helpers/assertions/login-assertions";

const testCases = [
  { name: "standard", expected: "success" },
  { name: "locked", expected: "failed" },
  { name: "problem", expected: "failed" },
] as const;

test.describe("Login functionality", () => {
  for (const { name, expected } of testCases) {

    test(`User login with ${name} user`, async ({
      navigateToSauceLab: _navigateToSauceLab,
      loginPage,
      dashboardPage
    }) => {

      const user = users[name];
      const start = Date.now();

      try {
        await test.step(`Login with ${name}`, async () => {
          logger.info(`Logging in as: ${user.username}`);
          await loginPage.login(user);
        });

        const duration = (Date.now() - start) / 1000;
        metrics.testDuration.labels("login", "passed").observe(duration);
        metrics.testCounter.labels("login", "passed").inc();

      } catch (err) {
        const duration = (Date.now() - start) / 1000;
        metrics.testDuration.labels("login", "failed").observe(duration);
        metrics.testCounter.labels("login", "failed").inc();
        throw err;
      }

      await test.step("Validate login result", async () => {
        await assertLoginResult(loginPage, dashboardPage, expected);
      });
    });
  }
});
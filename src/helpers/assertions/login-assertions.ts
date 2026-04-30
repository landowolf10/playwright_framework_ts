import { ASSERTION_NAMES, ERROR_MESSAGES } from "../../config/constants";
import { DashboardPage } from "../../pages/DashboardPage";
import { LoginPage } from "../../pages/LoginPage";
import { assertVisible, assertTextEquals } from "./general-assertions";

/**
 * Tipo de resultado esperado en login.
 */
export type LoginResult = "success" | "failed";

type AssertionFn = (
  loginPage: LoginPage,
  dashboardPage: DashboardPage
) => Promise<void>;

/**
 * Strategy map: cada resultado tiene su función de aserción.
 */
const loginAssertions: Record<LoginResult, AssertionFn> = {
  success: assertLoginSuccess,
  failed: assertLoginFailed,
};

/**
 * Entry point — despacha la aserción correcta según el resultado esperado.
 */
export async function assertLoginResult(
  loginPage: LoginPage,
  dashboardPage: DashboardPage,
  result: LoginResult
): Promise<void> {
  const assertion = loginAssertions[result];

  if (!assertion) {
    throw new Error(`Invalid login result type: "${result}". Expected "success" or "failed".`);
  }

  await assertion(loginPage, dashboardPage);
}

/**
 * Valida que el login fue exitoso verificando el ícono del carrito.
 */
async function assertLoginSuccess(
  _loginPage: LoginPage,
  dashboardPage: DashboardPage
): Promise<void> {
  await assertVisible(
    dashboardPage.page,
    dashboardPage.getCartIcon(),
    "Cart icon should be visible after successful login"
  );
}

/**
 * Valida que el login falló verificando el mensaje de error.
 */
async function assertLoginFailed(
  loginPage: LoginPage,
  _dashboardPage: DashboardPage
): Promise<void> {
  await assertVisible(
    loginPage.page,
    loginPage.getErrorMessage(),
    ASSERTION_NAMES.assertVisible
  );

  const errorText = await loginPage.getErrorMessageText();

  assertTextEquals(
    errorText,
    ERROR_MESSAGES.lockedLogin,
    ASSERTION_NAMES.assertTextMatch
  );
}
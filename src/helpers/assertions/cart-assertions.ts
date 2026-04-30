import { CartPage } from "../../pages/CartPage";
import { assertVisible, assertTruthy, assertNumberEquals } from "./general-assertions";

/**
 * Valida que el carrito tenga items.
 */
export async function assertCartHasItems(cartPage: CartPage): Promise<void> {
  const items = await cartPage.getCartItems();

  assertTruthy(
    items.length > 0,
    "Cart should have at least one item"
  );
}

/**
 * Valida botones visibles en el carrito.
 */
export async function assertCartButtonsVisible(cartPage: CartPage): Promise<void> {
  await assertVisible(
    cartPage.page,
    cartPage.getRemoveButton(),
    "Remove button should be visible"
  );

  await assertVisible(
    cartPage.page,
    cartPage.getCheckoutButton(),
    "Checkout button should be visible"
  );

  await assertVisible(
    cartPage.page,
    cartPage.getContinueShoppingButton(),
    "Continue shopping button should be visible"
  );
}

/**
 * Valida que el carrito esté vacío.
 * Usa expect de Playwright para preservar contexto (screenshot, trace, diff).
 */
export async function assertCartIsEmpty(cartPage: CartPage): Promise<void> {
  const count = await cartPage.getCartItemsCount();

  assertNumberEquals(
    count,
    0,
    "Cart should be empty after removing the product"
  );
}
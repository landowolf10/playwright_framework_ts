import { test } from "../../fixtures/custom-fixtures";
import { assertCartHasItems, assertCartIsEmpty } from "../../helpers/assertions/cart-assertions";

test.describe('Cart management', () => {

  test('Add product to cart', async ({ loginAsStandardUser: _loginAsStandardUser, dashboardPage, cartPage }) => {

    let product;

    await test.step('Add product to cart', async () => {
      product = await dashboardPage.getRandomProduct();
      await dashboardPage.addProductToCart(product);
    });

    await test.step('Validate cart has 1 item', async () => {
      await dashboardPage.goToCart();
      await assertCartHasItems(cartPage);
    });

  });

  test('Remove product from cart', async ({ loginAsStandardUser: _loginAsStandardUser, dashboardPage, cartPage }) => {

    await test.step('Add product first', async () => {
      const product = await dashboardPage.getRandomProduct();
      await dashboardPage.addProductToCart(product);
    });

    await test.step('Remove product', async () => {
      await dashboardPage.goToCart();
      await cartPage.removeFirstItem();
    });

    await test.step('Validate cart is empty', async () => {
      await assertCartIsEmpty(cartPage);
    });

  });
});
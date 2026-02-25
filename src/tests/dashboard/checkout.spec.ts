import { test } from "../../fixtures/custom-fixtures";
import { assertEqualsTextString } from "../../helpers/assertions";

test.describe('Complete checkout', () => {
  test('Proceed with checkout', async ({ validLogin, commonPage, dashboardPage, checkoutPage }) => {
    await test.step('Sort products from most expensive to cheapest', async () => {
      await dashboardPage.sortWithDropDown('Price (high to low)');
    })

    await test.step('add two products to the cart less than $20', async () => {
      await dashboardPage.addProduct();
      await dashboardPage.addProduct();
    })
    
    await test.step('Go to shopping cart and proceed with checkout', async () => {
      await commonPage.goToCart();
      await checkoutPage.proceedWithCheckout('Orlando', 'Avila', '40880');
      const currentSubTotal = await checkoutPage.getCurrentSubTotal();
      const expectedSubTotal = await dashboardPage.getSubTotalSum();
      console.log('Expected subtotal: ', expectedSubTotal);
      await assertEqualsTextString(
        currentSubTotal,
        expectedSubTotal,
        "Subtotal"
       );
    })

    await test.step('Finish checkout', async () => {
      await checkoutPage.finishCheckout();
      await checkoutPage.validateCheckout();
      await checkoutPage.clickBackHomeButton();
      await commonPage.assertLoginSuccess();
    })
  })
});
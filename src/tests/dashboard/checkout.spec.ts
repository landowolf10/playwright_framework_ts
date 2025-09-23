import { test } from "../../fixtures/custom-fixtures";
import { users } from "../../config/test-data";
import { assertEqualsTextString, assertHasText, assertVisible } from "../../helpers/assertions";

test.describe('Complete checkout', () => {
  test.beforeEach(async ({ commonPage }) => {
    await test.step("Navigate to login page", async () => {
      await commonPage.navigateToSauceLab();
    });

    await test.step("Enter valid credentials", async () => {
      await commonPage.login(users.standard.username, users.standard.password);
    });
  });

  test('Proceed with checkout', async ({ dashboardPage, checkoutPage, loginPage }) => {
    await test.step('Sort products from most expensive to cheapest', async () => {
      await dashboardPage.sortWithDropDown();
    })

    await test.step('add two products to the cart less than $20', async () => {
      await dashboardPage.addProduct();
      await dashboardPage.addProduct();
    })
    
    await test.step('Go to shopping cart and proceed with checkout', async () => {
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
      const { orderTitle, orderMessage } = checkoutPage.getCheckOutTexts();
      await assertHasText(
        orderTitle,
        'Thank you for your order!',
        "Title"
       );
       await assertHasText(
        orderMessage,
        'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
        "Message"
       );
       await checkoutPage.clickBackHomeButton();
       const { cartIcon, sortDropDown } = loginPage.getValidLoginElements();
      await assertVisible(cartIcon, "Cart Icon");
      await assertVisible(sortDropDown, "Sort Dropdown");
    })
  })
});
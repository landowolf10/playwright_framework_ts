import { Page } from "@playwright/test";
import { CheckoutLocators } from "../locators/checkout_locators";
import { BasePage } from "../helpers/BasePage";
import { assertHasText } from "../helpers/assertions";

export class CheckoutPage extends BasePage {
    private readonly checkoutLocators: CheckoutLocators;

    constructor(page: Page) {
        super(page);
        this.checkoutLocators = new CheckoutLocators(page);
    }

    async getCurrentSubTotal(): Promise<string> {
        const currentSubtotal = await this.getElementText(this.checkoutLocators.subtotal);

        if (currentSubtotal !== null) {
            return currentSubtotal;
        } else {
            throw new Error("Subtotal value is null.");
        }
    }

    async proceedWithCheckout(firstName: string, lastName: string, zipCode: string) {
        await this.clickElement(this.checkoutLocators.checkoutButton);
        await this.writeText(this.checkoutLocators.txtFirstName, firstName);
        await this.writeText(this.checkoutLocators.txtLastName, lastName);
        await this.writeText(this.checkoutLocators.txtZipCode, zipCode);
        await this.clickElement(this.checkoutLocators.continueButton);
    }

    async finishCheckout() {
        await this.clickElement(this.checkoutLocators.finishButton);
    }

    async clickBackHomeButton() {
        await this.clickElement(this.checkoutLocators.backToHomeButton);
    }

    async validateCheckout() {
        await assertHasText(this.checkoutLocators.orderTitle, 'Thank you for your order!', "Title");
        await assertHasText(this.checkoutLocators.orderMessage, 'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
        "Message");
    }
}
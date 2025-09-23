import { Page } from "@playwright/test";
import { DashboardLocators } from "../locators/dashboard_locators";
import { CheckoutLocators } from "../locators/checkout_locators";
import { BasePage } from "../helpers/BasePage";

export class CheckoutPage extends BasePage{
    private readonly checkoutLocators: CheckoutLocators;
    private readonly dashboardLocators: DashboardLocators;

    constructor(page: Page) {
        super(page);
        this.checkoutLocators = new CheckoutLocators(page);
        this.dashboardLocators = new DashboardLocators(page);
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
        await this.clickElement(this.dashboardLocators.cartIcon);
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

    getCheckOutTexts() {
        return {
            orderTitle: this.checkoutLocators.orderTitle,
            orderMessage: this.checkoutLocators.orderMessage,
        };
    }
}
import { Locator, Page } from "@playwright/test";

export class CheckoutLocators {
    readonly checkoutButton: Locator;
    readonly txtFirstName: Locator;
    readonly txtLastName: Locator;
    readonly txtZipCode: Locator;
    readonly continueButton: Locator;
    readonly subtotal: Locator;
    readonly finishButton: Locator;
    readonly orderTitle: Locator;
    readonly orderMessage: Locator;
    readonly backToHomeButton: Locator;


    constructor(page: Page) {
        this.checkoutButton = page.getByTestId('checkout');
        this.txtFirstName = page.getByTestId('first-name');
        this.txtLastName = page.getByTestId('last-name');
        this.txtZipCode = page.getByTestId('postal-code');
        this.continueButton = page.getByTestId('continue');
        this.subtotal = page.locator('[class="summary_subtotal_label"]');
        this.finishButton = page.getByTestId('finish');
        this.orderTitle = page.locator('[class="complete-header"]');
        this.orderMessage = page.locator('[class="complete-text"]');
        this.backToHomeButton = page.getByTestId('back-to-products');
    }
}
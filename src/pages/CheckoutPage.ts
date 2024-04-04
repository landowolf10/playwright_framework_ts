import { ElementHandle, Locator, Page, expect } from "@playwright/test";
import { DashboardLocators } from "../locators/dashboard_locators";
import { CheckoutLocators } from "../locators/checkout_locators";
import { DashboardPage } from "./DashboardPage";

export class CheckoutPage {
    private readonly checkoutLocators: CheckoutLocators;
    private readonly dashboardLocators: DashboardLocators;
    private dashboardPage: DashboardPage;
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.checkoutLocators = new CheckoutLocators(page);
        this.dashboardLocators = new DashboardLocators(page);
        this.dashboardPage = new DashboardPage(page);
    }

    async getCurrentSubTotal(): Promise<string> {
        const currentSubtotal = await this.checkoutLocators.subtotal.textContent();

        if (currentSubtotal !== null) {
            return currentSubtotal;
        } else {
            throw new Error("Subtotal value is null.");
        }
    }

    /*async getExpectedSubTotal(): Promise<string> {
        return await this.dashboardPage.getSubTotalSum();
    }*/

    async proceedWithCheckout(firstName: string, lastName: string, zipCode: string) {
        this.dashboardLocators.cartIcon.click();
        this.checkoutLocators.checkoutButton.click();
        await this.checkoutLocators.txtFirstName.fill(firstName);
        await this.checkoutLocators.txtLastName.fill(lastName);
        await this.checkoutLocators.txtZipCode.fill(zipCode);
        this.checkoutLocators.continueButton.click();
    }
}
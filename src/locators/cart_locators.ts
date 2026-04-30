import { Locator, Page } from "@playwright/test";

export class CartLocators {
    readonly cartItems: Locator;
    readonly quantity: Locator;
    readonly itemDescription: Locator;
    readonly removeButton: Locator;
    readonly checkoutButton: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.cartItems = page.locator('.cart_item');
        this.quantity = page.getByTestId('item-quantity');
        this.itemDescription = page.getByTestId('inventory-item-desc');
        this.removeButton = page.getByRole('button', { name: 'Remove' });
        this.checkoutButton = page.getByTestId('checkout');
        this.continueButton = page.getByTestId('continue');
    }
}
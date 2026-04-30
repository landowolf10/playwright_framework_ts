import { Locator, Page } from "@playwright/test";
import { CartLocators } from "../locators/cart_locators";
import { BasePage } from "../helpers/BasePage.js";
import { logger } from "../helpers/logger.js";

/**
 * Page Object representing the Cart page.
 */
export class CartPage extends BasePage {
    private readonly locators: CartLocators;

    constructor(page: Page) {
        super(page);
        this.locators = new CartLocators(page);
    }

    /**
     * Retrieves all cart items
     */
    async getCartItems(): Promise<Locator[]> {
        return await this.getAllElements(this.locators.cartItems);
    }

    /**
     * Retrieves cart items count
     */
    async getCartItemsCount(): Promise<number> {
        return await this.locators.cartItems.count();
    }

    /**
     * Removes first item from cart
     */
    async removeFirstItem(): Promise<void> {
        const items = await this.getCartItems();

        if (items.length === 0) {
            throw new Error("No items in cart to remove");
        }

        const firstItem = items[0];

        if (!firstItem) {
            throw new Error("First item not found");
        }

        const removeButton = firstItem.locator(
            this.locators.removeButton
        );

        await this.clickElement(removeButton);
        await firstItem.waitFor({ state: "detached" });

        logger.info("Product removed from cart");
    }

    /**
     * Checks if cart is empty
     */
    async isCartEmpty(): Promise<boolean> {
        logger.info("Verifying that cart is empty");

        const count = await this.getCartItemsCount();
        return count === 0;
    }

    /**
     * 🔹 Controlled exposure (for assertions)
     */
    getRemoveButton(): Locator {
        return this.locators.removeButton;
    }

    getCheckoutButton(): Locator {
        return this.locators.checkoutButton;
    }

    getContinueShoppingButton(): Locator {
        return this.locators.continueButton;
    }
}
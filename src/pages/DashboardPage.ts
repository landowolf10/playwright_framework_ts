import { Locator, Page } from "@playwright/test";
import { BasePage } from "../helpers/BasePage.js";
import { logger } from "../helpers/logger.js";
import { Product, ProductWithLocator } from "../models/Product.js";
import { dashboardLocators } from "../locators/dashboard_locators.js";

/**
 * Page Object representing the SauceLab Dashboard page.
 *
 * Internally uses ProductWithLocator to support UI actions (add to cart, etc.).
 * Publicly exposes Product (clean domain model) wherever UI context isn't needed.
 */
export class DashboardPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    /**
     * Private helper
     */
    private async getProductData(item: Locator): Promise<ProductWithLocator> {
        const name = await this.getElementText(
            item.locator(".inventory_item_name")
        );

        const priceText = await this.getElementText(
            item.locator(".inventory_item_price")
        );

        return {
            name: name.trim(),
            price: this.parsePrice(priceText),
            item
        };
    }

    private parsePrice(priceText: string): number {
        return parseFloat(priceText.replace("$", "").trim());
    }

    /**
   * Retrieves all products from the dashboard.
   * Returns clean Product models (no Locator).
   */
    async getAllProducts(): Promise<Product[]> {
        logger.info("Retrieving all products from the dashboard");

        const items = await this.getAllElements(this.page.locator(dashboardLocators.allProducts));
        logger.info(`Found ${items.length} products on the page`);

        const products: Product[] = [];

        for (const item of items) {
            const { name, price } = await this.getProductData(item);
            products.push({ name, price });
        }

        return products;
    }

    
    /**
   * Returns a random product with its Locator for UI actions.
   * Use this when you need to interact with the product element.
   */
    async getRandomProduct(): Promise<ProductWithLocator> {
        const items = await this.getAllElements(this.page.locator(dashboardLocators.allProducts));
    
        if (items.length === 0) {
            throw new Error("No products found on the dashboard");
        }
    
        const randomIndex = Math.floor(Math.random() * items.length);
        const item = items[randomIndex];
    
        if (!item) {
            throw new Error(`Product at index ${randomIndex} not found`);
        }
    
        return await this.getProductData(item);
    }

    /**
     * Action: add product to cart
     */
    async addProductToCart(product: ProductWithLocator): Promise<void> {
        logger.info(`Adding product to cart: "${product.name}"`);

        const button = product.item.locator(this.page.locator(dashboardLocators.addToCartButton));
        await this.clickElement(button);
    }

    /**
     * Navigation
     */
    async goToCart(): Promise<void> {
        logger.info("Navigating to cart page");
        await this.clickElement(this.page.locator(dashboardLocators.cartIcon));
        logger.info("Cart page opened successfully");
    }

    /**
     * For assertions
     */
    getCartIcon(): Locator {
        return this.page.locator(dashboardLocators.cartIcon);
    }

    async isCartIconVisible(): Promise<boolean> {
        return await this.page.locator(dashboardLocators.cartIcon).isVisible();
    }

    getAddToCartButtonFromItem(item: Locator): Locator {
        return item.locator(this.page.locator(dashboardLocators.addToCartButton));
    }
}
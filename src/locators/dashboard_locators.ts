import { Locator, Page } from "@playwright/test";

export class DashboardLocators {
    readonly allProducts: Locator;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly addToCartButton: Locator;
    readonly sortDropDown: Locator;
    readonly cartIcon: Locator;


    constructor(page: Page) {
        this.allProducts = page.locator(".inventory_item");
        this.productName = page.locator(".inventory_item_name");
        this.productPrice = page.locator('[class="inventory_item_price"]');
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.sortDropDown = page.locator('[data-test="product-sort-container"]');
        this.cartIcon = page.locator('[class="shopping_cart_link"]')
    }
}
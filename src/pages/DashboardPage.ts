import { Locator, Page } from "@playwright/test";
import { DashboardLocators } from "../locators/dashboard_locators";

export class DashboardPage {
    private readonly dashboardLocators: DashboardLocators;
    readonly page: Page;
    selectedItemPrices: number[] = [];

    constructor(page: Page) {
        this.page = page;
        this.dashboardLocators = new DashboardLocators(page);
    }

    async sortWithDropDown() {
        await this.dashboardLocators.sortDropDown.selectOption('Price (high to low)');
    }

    async addProduct() {
        const addToCartButtons: Locator[] = await this.dashboardLocators.addToCartButton.all();
        const prices: number[] = await this.getPrices();

        for (let i = 0; i < prices.length; i++) {
            if (prices[i] < 20) {
                await addToCartButtons[i].click();
                prices.splice(i, 1);
                this.selectedItemPrices.splice(i, 1);
                addToCartButtons.splice(i, 1);
    
                this.selectedItemPrices.push(prices[i]);
                
                break;
            }
        }

        console.log('Selected item prices: ', this.selectedItemPrices);
    }

    async getExpectedSubTotal(): Promise<string> {
        return await this.getSubTotalSum();
    }

    async getPrices(): Promise<number[]> {
        const elements = await this.dashboardLocators.productPrice.all();
        const prices: number[] = [];
    
        for (let i = 0; i < elements.length; i++) {
            const priceText: string | null = await elements[i].textContent();
            if (priceText !== null) {
                const priceValue = parseFloat(priceText.substring(1));
                prices.push(priceValue);
            } else {
                console.warn('Price text is null for element:', elements[i]);
            }
        }
    
        return prices;
    }

    async getSubTotalSum(): Promise<string> {
        let sum: number = 0;

        console.log('All prices: ', this.selectedItemPrices);

        for (const selectedItemPrice of this.selectedItemPrices)
            sum += selectedItemPrice;

        console.log('Sum: ', sum);
        
        return "Item total: $" + sum;
    }
}
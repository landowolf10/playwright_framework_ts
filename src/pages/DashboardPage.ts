import { Locator, Page } from "@playwright/test";
import { DashboardLocators } from "../locators/dashboard_locators";
import { BasePage } from "../helpers/BasePage";

export class DashboardPage extends BasePage {
    private readonly dashboardLocators: DashboardLocators;
    private selectedItemPrices: number[] = [];

    constructor(page: Page) {
        super(page);
        this.dashboardLocators = new DashboardLocators(page);
    }

    async sortWithDropDown(): Promise<void> {
        await this.dashboardLocators.sortDropDown.selectOption('Price (high to low)');
    }

    async addProduct(): Promise<void> {
        const addToCartButtons: Locator[] = await this.dashboardLocators.addToCartButton.all();
        const prices: number[] = await this.getAllPrices();

        for (let i = 0; i < prices.length; i++) {
            const currentPrice = prices[i];
            const addToCartButton = addToCartButtons[i];

            if (currentPrice !== undefined && addToCartButton !== undefined && currentPrice < 20) {
                await this.clickElement(addToCartButton);
                prices.splice(i, 1);
                this.selectedItemPrices.splice(i, 1);
                addToCartButtons.splice(i, 1);
    
                this.selectedItemPrices.push(currentPrice);
                
                break;
            }
        }

        console.log('Selected item prices: ', this.selectedItemPrices);
    }

    async getExpectedSubTotal(): Promise<string> {
        return await this.getSubTotalSum();
    }

    async getAllPrices(): Promise<number[]> {
        const elements = await this.dashboardLocators.productPrice.all();
        const prices: number[] = [];
    
        for (const element of elements) {
            const priceText = await this.getElementText(element);
            if (priceText) {
                const priceValue = parseFloat(priceText.replace("$", "").trim());
                if (!isNaN(priceValue)) {
                    prices.push(priceValue);
                } else {
                    console.warn('Could not parse price text:', priceText);
                }
            } else {
                console.warn('Price text is null for element:', element);
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
import { Page } from "@playwright/test";
import { LoginLocators } from "../locators/login_locators";

export class CommonPage {
    private readonly loginLocators: LoginLocators;
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.loginLocators = new LoginLocators(page);
    }

    async navigateToSauceLab() {
        await this.page.goto('/');
    }

}
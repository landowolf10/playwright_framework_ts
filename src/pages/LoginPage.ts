import { Locator, Page } from "@playwright/test";
import { BasePage } from "../helpers/BasePage.js";
import { ENV } from "../config/env.config.js";
import { logger } from "../helpers/logger.js";
import { User } from "../models/User.js";
import { loginLocators } from "../locators/login_locators.js";

/**
 * Page Object representing the SauceLab Login page.
 */
export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigates to SauceLab app
     */
    async navigateToSauceLab(): Promise<void> {
        try {
            await this.page.goto(ENV.baseURL);

            const title = await this.page.title();

            if (!title.toLowerCase().includes("swag")) {
                throw new Error(`Unexpected page title: ${title}`);
            }

            logger.info(`Navigated to ${ENV.baseURL}`);
        } catch (error: any) {
            throw new Error(
                `Navigation failed. URL: ${ENV.baseURL}. Error: ${error.message}`
            );
        }
    }

    /**
     * High-level login action
     */
    async login(user: User): Promise<void> {
        logger.info(`Logging in with user: ${user.username}`);

        await this.writeText(this.page.getByTestId(loginLocators.userTextbox), user.username);
        await this.writeText(this.page.getByTestId(loginLocators.passwordTextbox), user.password);
        await this.clickElement(this.page.getByTestId(loginLocators.loginButton));
    }

    getErrorMessage(): Locator {
        return this.page.locator(loginLocators.errorMessage);
    }

    /**
     * Queries (NO assertions)
     */
    async getErrorMessageText(): Promise<string> {
        logger.info("Retrieving login error message text");

        const text = await this.getElementText(this.page.locator(loginLocators.errorMessage));
        return text ?? "";
    }
}
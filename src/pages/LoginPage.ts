import { Locator, Page } from "@playwright/test";
import { LoginLocators } from "../locators/login_locators.js";
import { BasePage } from "../helpers/BasePage.js";
import { ENV } from "../config/env.config.js";
import { logger } from "../helpers/logger.js";
import { User } from "../models/User.js";

/**
 * Page Object representing the SauceLab Login page.
 */
export class LoginPage extends BasePage {
    private readonly locators: LoginLocators;

    constructor(page: Page) {
        super(page);
        this.locators = new LoginLocators(page);
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

        await this.writeText(this.locators.userTextbox, user.username);
        await this.writeText(this.locators.passwordTextbox, user.password);
        await this.clickElement(this.locators.loginButton);
    }

    getErrorMessage(): Locator {
        return this.locators.errorMessage;
    }

    /**
     * Queries (NO assertions)
     */
    async getErrorMessageText(): Promise<string> {
        logger.info("Retrieving login error message text");

        const text = await this.getElementText(this.locators.errorMessage);
        return text ?? "";
    }
}
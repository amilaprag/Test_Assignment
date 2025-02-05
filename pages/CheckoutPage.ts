import { Page } from '@playwright/test'

export class CheckoutPage {

    private page: Page;
    private fistNameInput = 'input[placeholder="First Name"]';
    private lastNameInput = 'input[placeholder="Last Name"]';
    private zipcodeInput = 'input[placeholder="Zip/Postal Code"]';
    private continueButton = "input[type='submit']";
    private checkoutInfo = ".checkout_info";

    constructor(page: Page) {
        this.page = page;
    }

    async waitForPageLoad() {
        await this.page.waitForSelector(this.checkoutInfo);
    }

    async enterFistNameInput(fistname: string) {
        await this.page.fill(this.fistNameInput, fistname);
    }

    async enterLastNameInput(lastname: string) {
        await this.page.fill(this.lastNameInput, lastname);
    }

    async enterZipcodeInput(zipcode: string) {
        await this.page.fill(this.zipcodeInput, zipcode);
    }

    async continue() {
        await this.page.locator(this.continueButton).click();
    }

}
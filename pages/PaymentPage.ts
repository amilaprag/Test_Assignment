import { Page } from '@playwright/test'

export class PayementPage {

    private page: Page;
    private paymentInfo = 'div[data-test="payment-info-label"]';
    private summaryTotal =".summary_total_label";
    private finish = "#finish";
    private summaryInfo = ".summary_info";
    private shoppingCartBadge = ".shopping_cart_badge"

    constructor(page: Page) {
        this.page = page;
    }

    async waitForPageLoad() {
        await this.page.waitForSelector(this.summaryInfo);
    }

    async verifyPaymentInfo(){
        return this.page.locator(this.paymentInfo);
    }

    async getTotalPrice() {
        return await this.page.locator(this.summaryTotal).textContent();
    }

    async clickFinish() {
        return await this.page.locator(this.finish).click();
    }

    async GetCartItems() {
        return this.page.locator(this.shoppingCartBadge);
    }

}
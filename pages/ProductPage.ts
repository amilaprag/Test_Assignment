import { Page, expect } from '@playwright/test'

export class ProductPage {

    private page: Page;
    private sortDropdown = '.product_sort_container';
    private inventoryItemName = '.inventory_item_name';
    private inventoryItemPrice = '.inventory_item_price';
    private addToCartButton = '.inventory_item';
    private cartLink = '.shopping_cart_link';
    private inventoryList = '.inventory_list';
    private highToLowPrice = "hilo";

    constructor(page: Page) {
        this.page = page;
    }

    async waitForPageLoad() {
        await this.page.waitForSelector(this.inventoryList);
    }

    async sortBypriceByHigh() {
        await this.page.selectOption(this.sortDropdown, this.highToLowPrice);
        await this.page.waitForSelector(this.inventoryItemName)
    }

    async getProducts() {
        const productNames = await this.page.locator(this.inventoryItemName).allTextContents();
        const productPrices = await this.page.locator(this.inventoryItemPrice).allTextContents();
        const products = productNames.map((name, index) => ({
            name,
            price: parseFloat(productPrices[index].replace('$', '')),
            addToCartButton: `${this.addToCartButton}:has-text("${name}") button`
        }));
        return products.sort((a, b) => a.price - b.price);
    }

    async addToCart(addToCartButton: string) {
        await this.page.click(addToCartButton);
    }

    async viewCart() {
        await this.page.click(this.cartLink);
    }


}
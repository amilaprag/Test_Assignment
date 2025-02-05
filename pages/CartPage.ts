
import { Page } from '@playwright/test'

export class CartPage {

    private page: Page;
    private shoppingCartBadge = '.shopping_cart_badge';
    private cartList = '.cart_list';
    private cartItemName = ".inventory_item_name";
    private cartItemPrice = ".inventory_item_price";
    private checkout = "#checkout";
    private cartItem =".cart_item";

    constructor(page: Page) {
        this.page = page;
    }

    async waitForPageLoad() {
        await this.page.waitForSelector(this.cartList);
    }

    async getCartItemCount() {
        return await this.page.locator(this.shoppingCartBadge).textContent();
    }

    async removeProductFromCart(productName: string) {
        const removeButton = this.page.locator(`${this.cartItem}:has-text("${productName}") button`);
        await removeButton.click();
    }

    async getCartItems() {
        const productNames = await this.page.locator(this.cartItemName).allTextContents();
        const productPrices = await this.page.locator(this.cartItemPrice).allTextContents();
        return productNames.map((name, index) => ({
            name,
            price: parseFloat(productPrices[index].replace('$', '')),
        }));
    }

    async checkoutItems() {
        await this.page.locator(this.checkout).click();
    }


}
import { chromium, Page, test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PayementPage } from '../pages/PaymentPage';
import testData from '../config/testdata.json'

test("Testcase-0001 verify product items checkout and ordered sucessfuly", async () => {

    const browser = await chromium.launch({ headless: false });
    const page: Page = await browser.newPage();
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const paymentPage = new PayementPage(page);

    //Login page tests
    await page.goto('/');
    await loginPage.enterUsernameInput(testData.Testcase_0001.username)
    await loginPage.enterPasswordInput(testData.Testcase_0001.password)
    await loginPage.clickLogin();

    //Product page tests
    await productPage.waitForPageLoad();
    await expect(page).toHaveURL(testData.Testcase_0001.urls.inventory);
    await productPage.sortBypriceByLow();
    
    const products = await productPage.getProducts();
    const cheapestProducts = products.slice(0, 3);
    for (const product of cheapestProducts) {
        console.log(`Adding to cart: ${product.name} - ${product.price}`);
        await productPage.addToCart(product.addToCartButton);
    }
    await productPage.viewCart();

     //Cart page tests
    await cartPage.waitForPageLoad();
    await expect(page).toHaveURL(testData.Testcase_0001.urls.cart);
    const cartItems = await cartPage.getCartItems();
    await cartPage.removeProductFromCart(cartItems[0].name);
    await cartPage.checkoutItems();

    //Checkout page tests
    await checkoutPage.waitForPageLoad();
    await expect(page).toHaveURL(testData.Testcase_0001.urls.checkOutStepOne);
    await checkoutPage.enterFistNameInput(testData.Testcase_0001.checkoutDetails.firstName);
    await checkoutPage.enterLastNameInput(testData.Testcase_0001.checkoutDetails.lastName);
    await checkoutPage.enterZipcodeInput(testData.Testcase_0001.checkoutDetails.postalCode);
    await checkoutPage.continue();

    //Payement page tests
    await paymentPage.waitForPageLoad();
    await expect(page).toHaveURL(testData.Testcase_0001.urls.checkOutStepTwo);
   
    const cartItemCount = await paymentPage.GetCartItems();
    await expect(cartItemCount).toHaveText(testData.Testcase_0001.cartItemCount);
    const totalPrice = await paymentPage.getTotalPrice();
    await expect(totalPrice).toContain(testData.Testcase_0001.dollorMark);
    const totalPriceValue = parseFloat(totalPrice?.replace('Total: $', '') || '0');
    expect(totalPriceValue).toBeGreaterThan(0);

    const paymentInfo = await paymentPage.verifyPaymentInfo();
    await expect(paymentInfo).toBeVisible();    
    await paymentPage.clickFinish();

    await browser.close();
})
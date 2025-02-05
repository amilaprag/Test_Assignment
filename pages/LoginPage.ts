import { Page } from '@playwright/test'

export class LoginPage {

    private page: Page;
    private userNameInput = 'input[name="user-name"]';
    private passwordInput = 'input[name="password"]';
    private loginButton = 'input[type="submit"]';

    constructor(page: Page) {
        this.page = page;
    }

    async enterUsernameInput(userName: string) {
        await this.page.fill(this.userNameInput, userName);
    }

    async enterPasswordInput(password: string) {
        await this.page.fill(this.passwordInput, password);
    }

    async clickLogin() {
        await this.page.click(this.loginButton);
    }

}
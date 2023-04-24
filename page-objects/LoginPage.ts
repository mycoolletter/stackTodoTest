import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private readonly emailInput: string;
  private readonly passwordInput: string;
  private readonly signInButton: string;

  constructor(page: Page) {
    super(page);
    this.emailInput = "#login";
    this.passwordInput = "#password";
    this.signInButton = "#submit";
  }

  async fillEmail(email: string) {
    await this.page.fill(this.emailInput, email);
  }

  async fillPassword(password: string) {
    await this.page.fill(this.passwordInput, password);
  }

  async clickSignInButton() {
    await this.page.click(this.signInButton);
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSignInButton();
  }
}

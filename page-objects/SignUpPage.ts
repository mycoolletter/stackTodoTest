import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignUpPage extends BasePage{
  private readonly nameSelector: string;
  private readonly emailSelector: string;
  private readonly passwordSelector: string;
  private readonly agreeCheckboxSelector: string;
  private readonly signUpButtonSelector: string;

  constructor(page: Page) {
    super(page)
    this.nameSelector = '#name';
    this.emailSelector = '#email';
    this.passwordSelector = '#password';
    this.agreeCheckboxSelector = '#agree';
    this.signUpButtonSelector = '#submit';
  }

  async fillName(name: string) {
    await this.page.fill(this.nameSelector, name);
  }

  async fillEmail(email: string) {
    await this.page.fill(this.emailSelector, email);
  }

  async fillPassword(password: string) {
    await this.page.fill(this.passwordSelector, password);
  }

  async checkAgreeCheckbox() {
    await this.page.check(this.agreeCheckboxSelector);
  }

  async clickSignUpButton() {
    await this.page.click(this.signUpButtonSelector);
  }

  async signUp(name: string, email: string, password: string) {
    await this.fillName(name);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.checkAgreeCheckbox();
    await this.clickSignUpButton();
  }
}


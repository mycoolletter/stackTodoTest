import { Page, expect } from '@playwright/test';
//It May be stored in a separate file. 
export enum SidebarOption {
    SignUp = '/signup',
    Login = '/login',
    Calendar = '/calendar',
    Integration = '/integration',
    FAQ = '/faq',
  }

export class BasePage {
  protected readonly page: Page;
  private readonly baseUrl:string
  private readonly alertSelector: string
  private readonly warningSelector: string

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = 'http://stackadapt-interview.us-east-1.elasticbeanstalk.com'
    this.alertSelector = '.alert-success'  
    this.warningSelector = '.alert-danger'  
  }

 
  async navigateTo() {
     // Base URL + additional path approach may be used. For simplicity I use full URL
    await this.page.goto(this.baseUrl);

    // Wait for the page to load completely
    await this.page.waitForLoadState('networkidle');

  }

  async clickSidebarOption(option: SidebarOption) {
    // I emulate a user experience that is why go with clicking instead of direct link navigation
    const selector = `a[href="${option}"]`;
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }
  async assertPageBasedOnUrlEnding(expectedSuffix?: SidebarOption | string) {
    const suffix = typeof expectedSuffix === 'string' ? expectedSuffix : expectedSuffix;
    if (suffix) {
      const url = await this.page.url();
      expect(url.endsWith(suffix)).toBe(true);
    }
  }
  async  assertTopSuccessMessage(successMessage: string) {
    await this.page.waitForSelector(this.alertSelector);
    const alert = await this.page.locator(this.alertSelector);
    const message = await alert.textContent();
    expect(message).toContain(successMessage);
  }
  async  assertTopWarningMessage(warningMessage: string) {
    await this.page.waitForSelector(this.warningSelector);
    const alert = await this.page.locator(this.warningSelector);
    const message = await alert.textContent();
    expect(message).toContain(warningMessage);
  }
  
}

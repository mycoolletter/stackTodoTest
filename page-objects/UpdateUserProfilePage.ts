import { Page} from '@playwright/test';
import { UserDashboardSidebar } from '../page-objects/components/UserDashboardSidebar';


export class UpdateUserProfilePage extends UserDashboardSidebar{
  private readonly nameInput: string
  private readonly emailInput: string
  private readonly submitButton: string

  constructor(page: Page) {
    super(page);
    this.nameInput = '#name';
    this.emailInput = '#email';
    this.submitButton = '#submit';
  }

  async enterNewName(name: string) {
    await this.page.fill(this.nameInput, name);
  }

  async enterNewEmail(email: string) {
    await this.page.fill(this.emailInput, email);
  }

  async clickSubmitButton() {
    await this.page.click(this.submitButton);
  }

  async updateProfile(name: string, email: string) {
    await this.enterNewName(name);
    await this.enterNewEmail(email);
    await this.clickSubmitButton();
  }

}

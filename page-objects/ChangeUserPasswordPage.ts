import { Page} from '@playwright/test';
import { UserDashboardSidebar } from '../page-objects/components/UserDashboardSidebar';

export class ChangeUserPasswordPage extends UserDashboardSidebar{
    
    private readonly currentPasswordInput = '#password';
    private readonly newPasswordInput = '#new_password';
    private readonly confirmPasswordInput = '#password_again';
    private readonly submitButton = '#submit';
  
    constructor(page: Page) {
      super(page)
    }
  
    async enterCurrentPassword(currentPassword: string) {
      await this.page.fill(this.currentPasswordInput, currentPassword);
    }
  
    async enterNewPassword(newPassword: string) {
      await this.page.fill(this.newPasswordInput, newPassword);
    }
  
    async enterConfirmPassword(confirmPassword: string) {
      await this.page.fill(this.confirmPasswordInput, confirmPassword);
    }
  
    async clickSubmitButton() {
      await this.page.click(this.submitButton);
    }
  
    async changePassword(currentPassword: string, newPassword: string) {
      await this.enterCurrentPassword(currentPassword);
      await this.enterNewPassword(newPassword);
      await this.enterConfirmPassword(newPassword);
      await this.clickSubmitButton();
    }
  }
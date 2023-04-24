import { Page, expect } from '@playwright/test';
//It might be stored in a separate file.
export enum TaskOption {
  AddTask = 'Add Task',
  MyTasks = 'My Tasks',
}

export enum UserProfileOption {
  UpdateProfile = 'Update Profile',
  ChangePassword = 'Change Password',
  Logout = 'Logout',
}

export class UserDashboardSidebar {
  protected readonly page: Page;
  private readonly taskMenuSelector: string;
  private readonly dropdownSelector: string;
  private readonly userProfileMenuSelector: string ;


  constructor(page: Page) {
    this.page = page;
    this.taskMenuSelector = '//*[@id="navbarDropdownPages" and text()="Tasks"]';
    this.dropdownSelector = '.dropdown-menu.show';
    this.userProfileMenuSelector = '(//*[@id="navbarDropdownPages"])[last()]';
  }

  async clickTaskOption(option: TaskOption) {
    await this.page.click(this.taskMenuSelector);
    await this.page.waitForSelector(this.dropdownSelector);
    await this.page.click(`text=${option}`);
  }

  async clickUserProfileOption(option: UserProfileOption) {
    await this.page.click(this.userProfileMenuSelector);
    await this.page.waitForSelector(this.dropdownSelector);
    await this.page.click(`text=${option}`);
  }
  async assertUserName(expectedName: string) {
    const nameElement = await this.page.locator(this.userProfileMenuSelector);
    const name = await nameElement.textContent()
  
    expect(name).toContain(expectedName)
  }
}
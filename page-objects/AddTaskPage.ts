import { Page } from '@playwright/test';
import { UserDashboardSidebar } from '../page-objects/components/UserDashboardSidebar';

export class AddTaskPage extends UserDashboardSidebar{
  private readonly taskLocator = '#task';
  private readonly submitButtonLocator = '#submit';

  constructor(page: Page) {
    super(page);
  }

 async addTask(task: string){
    await this.page.fill(this.taskLocator, task);
    await this.page.click(this.submitButtonLocator);
  }
}

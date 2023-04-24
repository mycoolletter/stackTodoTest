import { UserDashboardSidebar } from "../page-objects/components/UserDashboardSidebar";
import { expect } from "@playwright/test";

export enum TaskActionButtons {
  View = "View",
  Edit = "Edit",
  Delete = "Delete",
}

export class MyTasksPage extends UserDashboardSidebar {
    private readonly taskNameSelector:string
    private readonly textAreaSelector:string
    private readonly saveTaskBtnSelector:string
  constructor(page: any) {
    super(page);
    this.taskNameSelector = '.card-text';
    this.textAreaSelector = '#task';
    this.saveTaskBtnSelector = '#submit';
  }

  async clickTaskButtonByItName(
    taskName: string,
    actionButton: TaskActionButtons
  ) {
    const button = await this.page.locator(
      `//td[contains(text(),'${taskName}')]//..//a[text()="${actionButton}"]`
    );
    // click the button
    await button.click();
  }
  async editTask( newTask: string) {
    const taskTextarea = await this.page.locator(this.textAreaSelector);
    await taskTextarea.fill(newTask);
  
    // Find the submit button and click it
    const submitButton = await this.page.locator(this.saveTaskBtnSelector);
    await submitButton.click();
  }

  async checkTableForTask(taskName: string, isNegative?: boolean) {
    const tableRowSelector = `//div//..//td[contains(text(),'${taskName}')]`;
    if(!isNegative){
        const table = await this.page.waitForSelector(tableRowSelector);
        expect(await table.textContent()).toContain(taskName);
    }else{  
        const table = await this.page.waitForSelector(tableRowSelector,{timeout:2000, state: 'detached' });
        expect(table).toBeNull();
    }
    
  }

  async assertViewTask(taskName:string){
    const url = this.page.url();
    const taskText = await this.page.locator(this.taskNameSelector).textContent();
    expect(url).toContain("/tasks/view_task")
    expect(taskText).toEqual(taskName)
  }
}

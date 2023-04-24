import { test, chromium, Browser, Page} from "@playwright/test";
import { SidebarOption } from "../page-objects/BasePage";
import { SignUpPage } from "../page-objects/SignUpPage";
import { LoginPage } from "../page-objects/LoginPage";
import { MyTasksPage, TaskActionButtons } from "../page-objects/MyTasksPage";
import { faker } from "@faker-js/faker";
import {
  TaskOption,
  UserProfileOption,
} from "../page-objects/components/UserDashboardSidebar";
import { AddTaskPage } from "../page-objects/AddTaskPage";
import { UpdateUserProfilePage } from "../page-objects/UpdateUserProfilePage";
import { ChangeUserPasswordPage } from "../page-objects/ChangeUserPasswordPage";
import { getInitialCookieAndCsrfToken } from "../api/getInitialCookieAndCsrfToken";
import { getLoginUserCookie } from "../api/getLoginUserCookie";
import { addMultipleTasks } from "../api/addMultiTasks";
import { openPage } from "../api/openPage";

test.describe("Example Test Suite", () => {
  let browser: Browser;
  let page: Page;
  let loginPage: LoginPage;
  let myTasksPage: MyTasksPage;
  let addPage: AddTaskPage;
  let updateUserProfilePage: UpdateUserProfilePage;
  let changeUserPasswordPage: ChangeUserPasswordPage;
  const randomEmail = faker.internet.email();
  const randomName = faker.name.fullName();
  const randomPassword = faker.internet.password(7);
  const randomTask = faker.random.words(3);
  const randomTask2 = faker.random.words(2);
  const myTasksPageURLEnding = "/tasks/my_tasks"
  const invalidLoginMessage = "Sorry, invalid login"
    
  // It is recommended to store the User's name and password in a separate file or even on the cloud. For simplicity, it is stored here
  const savedEmail = "UserName@email.ts";
  const savedPassword = "UserName2023";
  // const savedUserName = "CRUD UserName";


  test.beforeEach(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    myTasksPage = new MyTasksPage(page);
  });

  test.afterEach(async () => {
    await browser.close();
  });

  test("Test Case 1:Sign up with random credentials", async () => {
    let signUpPage = new SignUpPage(page);

    // go to Sign up page and assert that it is
    await signUpPage.navigateTo();
    await signUpPage.clickSidebarOption(SidebarOption.SignUp);
    await signUpPage.assertPageBasedOnUrlEnding(SidebarOption.SignUp);

    //Fill in all required data, sign up, and assert that the user account created.
    await signUpPage.signUp(randomName,randomEmail,randomPassword)
    await signUpPage.assertPageBasedOnUrlEnding(myTasksPageURLEnding);
  });

  test("Test Case 2:Log in with a previously created account and then log out", async () => {
    loginPage = new LoginPage(page);
    const loggedOutSuccessMessage = "Logged out";

    await loginPage.navigateTo();
    await loginPage.clickSidebarOption(SidebarOption.Login);
    await loginPage.login(randomEmail, randomPassword);
    await loginPage.assertPageBasedOnUrlEnding(myTasksPageURLEnding);
    await myTasksPage.assertUserName(randomName);

    await myTasksPage.clickUserProfileOption(UserProfileOption.Logout);
    await loginPage.assertTopSuccessMessage(loggedOutSuccessMessage);
  });

  test("Test Case 3:Add, view, edit, and delete a task", async () => {
    loginPage = new LoginPage(page);
    addPage = new AddTaskPage(page);

    //Logging process is repetitive and recommend to stored in a separate method. For time saving, I skip it
    await loginPage.navigateTo();
    await loginPage.clickSidebarOption(SidebarOption.Login);
    await loginPage.login(savedEmail, savedPassword);
    await loginPage.assertPageBasedOnUrlEnding(myTasksPageURLEnding);

    await myTasksPage.clickTaskOption(TaskOption.AddTask);
    await addPage.addTask(randomTask);
    await myTasksPage.checkTableForTask(randomTask);
    await myTasksPage.clickTaskButtonByItName(
      randomTask,
      TaskActionButtons.View
    );
    await myTasksPage.assertViewTask(randomTask);
    await page.goBack();
    await myTasksPage.clickTaskButtonByItName(
      randomTask,
      TaskActionButtons.Edit
    );
    await myTasksPage.editTask(randomTask2);
    await myTasksPage.checkTableForTask(randomTask2);
    await myTasksPage.clickTaskButtonByItName(
      randomTask2,
      TaskActionButtons.Delete
    );
    await myTasksPage.checkTableForTask(randomTask2, true);
  });

  test("Test Case 4:Update profile, fail to log in with old credentials, and then log in successfully with new credentials", async () => {
    loginPage = new LoginPage(page);
    const profileChangedMessage = "Profile Successfully Changed!"
    
    updateUserProfilePage = new UpdateUserProfilePage(page);
    // It is recommended to store the User's name and password in a separate file or even on the cloud.
    const newEmail = "UserNewName@newEmail.js";
    const newName = "Updated UserName";
    const profileURLEnding = "/settings/profile";
    
    await loginPage.navigateTo();
    await loginPage.clickSidebarOption(SidebarOption.Login);
    await loginPage.login(randomEmail, randomPassword);
    await loginPage.assertPageBasedOnUrlEnding(myTasksPageURLEnding);
    await updateUserProfilePage.clickUserProfileOption(
      UserProfileOption.UpdateProfile
    );
    await loginPage.assertPageBasedOnUrlEnding(profileURLEnding);
    await updateUserProfilePage.updateProfile(newName, newEmail);
    await loginPage.assertTopSuccessMessage(profileChangedMessage);
    await updateUserProfilePage.assertUserName(newName);
    await updateUserProfilePage.clickUserProfileOption(
      UserProfileOption.Logout
    );
    await loginPage.clickSidebarOption(SidebarOption.Login);
    await loginPage.login(randomEmail, randomPassword);
    await loginPage.assertTopWarningMessage(invalidLoginMessage);
    await loginPage.login(newEmail, randomPassword);
    await loginPage.assertPageBasedOnUrlEnding(myTasksPageURLEnding);
    await updateUserProfilePage.assertUserName(newName);
    await updateUserProfilePage.clickUserProfileOption(
      UserProfileOption.UpdateProfile
    );
    await updateUserProfilePage.updateProfile(randomName,randomEmail);
    await loginPage.assertTopSuccessMessage(profileChangedMessage);
  });

  test("Test Case 5:Change password, fail to log in with old password, and then log in successfully with new password", async () => {
    changeUserPasswordPage = new ChangeUserPasswordPage(page);
    loginPage = new LoginPage(page);
    const newPassword = "NewUserName2023";
    const passwordChangeURLEnding = "/settings/password"
    const passwordUpdatedMessage = "Password updated."

    await loginPage.navigateTo();
    await loginPage.clickSidebarOption(SidebarOption.Login);
    await loginPage.login(randomEmail, randomPassword);
    await loginPage.assertPageBasedOnUrlEnding(myTasksPageURLEnding);
    await changeUserPasswordPage.clickUserProfileOption(
      UserProfileOption.ChangePassword
    );
    await loginPage.assertPageBasedOnUrlEnding(passwordChangeURLEnding);
    await changeUserPasswordPage.changePassword(randomPassword, newPassword);
   
    await loginPage.assertTopSuccessMessage(passwordUpdatedMessage);
    await changeUserPasswordPage.clickUserProfileOption(
      UserProfileOption.Logout
    );
    await loginPage.clickSidebarOption(SidebarOption.Login);
    await loginPage.login(randomEmail, randomPassword);
    await loginPage.assertTopWarningMessage(invalidLoginMessage);
    await loginPage.login(randomEmail, newPassword);
    await loginPage.assertPageBasedOnUrlEnding(myTasksPageURLEnding);
    await changeUserPasswordPage.assertUserName(randomName);
  });

  test("Test Case 6:Deleting two tasks belonging to an user results in only one task being left displayed on the task table.", async ({request}) => {
    const userAPIEmail = 'APIName@gmail.com';
    const userAPIPassword = 'APIName@gmail.co';
    
    const [initialCookie, csrfToken] = await getInitialCookieAndCsrfToken(request);
    const userBasedCookie = await getLoginUserCookie(request,userAPIEmail,userAPIPassword,initialCookie,csrfToken);
    const tasksName = await addMultipleTasks(request,2,userBasedCookie,csrfToken);
    await openPage(page,userBasedCookie,myTasksPageURLEnding);

    await loginPage.assertPageBasedOnUrlEnding(myTasksPageURLEnding);

    for(let i = 0; i < tasksName.length; i++) {
      await myTasksPage.checkTableForTask(tasksName[i]);  
      await myTasksPage.clickTaskButtonByItName(
        tasksName[i],
        TaskActionButtons.Delete
      );
      await myTasksPage.checkTableForTask(tasksName[i], true);
    }
  })
});

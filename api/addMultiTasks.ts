import { faker } from "@faker-js/faker";
export async function addMultipleTasks(
  request,
  numOfTask,
  userBasedCookie,
  csrfToken
) {
  const taskNames: string[] = [];
  const header = {
    "Content-Type": "application/x-www-form-urlencoded",
    Cookie: userBasedCookie,
    Connection: "keep-alive",
  };
  for (let i = 0; i < numOfTask; i++) {
    let randomTask = faker.random.words(2);
    try {
      const response = await request.post(
        "http://stackadapt-interview.us-east-1.elasticbeanstalk.com/tasks/add_task",
        {
          headers: header,
          form: {
            csrf_token: csrfToken,
            task: randomTask,
            submit: "Save Task",
          },
          ignoreHTTPSErrors: true,
          failOnStatusCode: false,
          timeout: 2000,
        }
      );
      taskNames.push(randomTask);
      console.log(`Task "${randomTask}" return status: ${response.status()}`);
    } catch (error) {}
  }
  return taskNames;
}

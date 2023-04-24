export async function openPage(page, userBasedCookie, path) {
  const baseURL = "http://stackadapt-interview.us-east-1.elasticbeanstalk.com";
  await page
    .context()
    .addCookies([
      {
        name: "session",
        value: userBasedCookie.replace("session=", ""),
        path: "/",
        domain: "stackadapt-interview.us-east-1.elasticbeanstalk.com",
      },
    ]);
  await page.goto(baseURL + path);
  await page.waitForLoadState("networkidle");
}

export async function getInitialCookieAndCsrfToken(request) {
  const responseGet = await request.get(
    "http://stackadapt-interview.us-east-1.elasticbeanstalk.com/login",
    {
      headers: {
        Connection: "keep-alive",
      },
    }
  );

  const cookies = await responseGet
    .headers()
    ["set-cookie"].replace("; HttpOnly; Path=/", "");

  const stringHtml = await responseGet.text();
  const regex = /<input[^>]*id="csrf_token"[^>]*value="([^"]*)"/;
  const match = stringHtml.match(regex);
  const csrfToken = match && match[1];
  return [cookies, csrfToken];
}

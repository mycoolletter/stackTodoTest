export async function getLoginUserCookie(
  request,
  email,
  password,
  initialCookie,
  csrfToken
) {
  const form = {
    next: "",
    csrf_token: csrfToken,
    login: email,
    password: password,
    submit: "Sign+in",
  };
  const header = {
    "Content-Type": "application/x-www-form-urlencoded",
    Cookie: initialCookie,
    Connection: "keep-alive",
  };

  const responseLogin = await request.post(
    "http://stackadapt-interview.us-east-1.elasticbeanstalk.com/login",
    {
      headers: header,
      form: form,
      maxRedirects: 0,
    }
  );
  const cookie2 = responseLogin
    .headers()
    ["set-cookie"].replace("; HttpOnly; Path=/", "");
  console.log(`Request  status: ${responseLogin.status()}`);
  return cookie2;
}

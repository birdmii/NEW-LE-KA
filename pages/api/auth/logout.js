import { parseCookies, setCookie } from "nookies";

export default async function handler(req, res) {
  const { token } = parseCookies({ req });
  if (token) {
    setCookie({ res }, "token", token, {
      httpOnly: true,
      secure: true,
      maxAge: -1,
      path: "/",
    });
  }
  return res.status(200).end();
}

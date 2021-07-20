import { setCookie } from "nookies";

export default async function handler(req, res) {
  const { identifier, password } = await req.body;

  if(req.headers.referer !== `${process.env.URL}login`) {
    res.status(400).send('Invalid Request!');
  }

  try {
    if (!identifier || !password) {
      throw new Error("Username and password must be provided.");
    }

    fetch(`${process.env.API_URL}auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Invalid username and password.");
        }
        return res.json();
      })
      .then((data) => {
        const token = data.jwt;

        setCookie({ res }, "token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 30,
          path: "/",
        });

        res.status(200).send(token);
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};

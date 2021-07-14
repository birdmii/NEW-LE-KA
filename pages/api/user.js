import { serialize } from "cookie";
export default async function handler(req, res) {
  const { identifier, password } = await req.body;
  try {
    if (!identifier || !password) {
      throw new Error("Username and password must be provided.");
    }

    const response = await fetch("https://newleka.herokuapp.com/auth/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    })
      .then((res) => {
        console.log(res);
        if (res.status !== 200) {
          throw new Error("Invalid username and password.");
        }
        return res.json();
      })
      .then((data) => {
        const token = data.jwt;
        res.setHeader(
          "Set-Cookie",
          serialize("token", token, { httpOnly: true })
        );
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

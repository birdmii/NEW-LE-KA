export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send({ message: "Only POST requests allowed" });

    return;
  } else {
    fetch("https://newleka.herokuapp.com/auth/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    })
      .then((res) => res.json())
      .then((data) =>
        !data.user ? res.status(400).send(data) : res.status(200).send(data)
      );
  }
}

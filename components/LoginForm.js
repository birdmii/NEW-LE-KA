import { useState } from "react";
import adminStyle from "../styles/Admin.module.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const admin = {
      identifier: username,
      password,
    };

    fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admin),
    })
      .then((res) => res.json())
      .then((data) => {
        if(!data.user) {
          // TODO: Show Invalid Username or password

          return;
        } 
        // TODO: Show admin page
      });
  };
  return (
    <div
      className={`w-100 flex-vertical-center flex-col ${adminStyle["Admin__panel"]}`}
    >
      <img
        src="/logo.png"
        alt="NEW・LE・KA Logo"
        width={127}
        height={32}
        className={`mt-80 mb-24`}
      />
      <div className={`subtitle ${adminStyle["panel__msg"]}`}>
        Sign in to NEW・LE・KA
      </div>
      <div className={``}>
        <form
          className={`flex flex-col mt-80 border-rad-16 ${adminStyle["panel__loginForm"]}`}
        >
          <label
            htmlFor="username"
            className={`body-text2 ${adminStyle["panel__loginForm--label"]}`}
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className={`border-rad-8 shadow-2 ${adminStyle["panel__loginForm--input"]}`}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <label
            htmlFor="password"
            className={`body-text2 mt-24 ${adminStyle["panel__loginForm--label"]}`}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`border-rad-8 shadow-2 ${adminStyle["panel__loginForm--input"]}`}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <input
            type="submit"
            value="Sign in"
            className={`mt-24 border-rad-8 ${adminStyle["panel__loginForm--btn"]}`}
            onClick={handleSubmit}
          ></input>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

import LoginForm from "../components/LoginForm";
import { useState } from "react";
import Router from "next/router";

const signin = async (username, password) => {
  const user = {
    identifier: username,
    password,
  };

  const res = await fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  
  if(res.status !== 200) {
    throw new Error(await res.text());
  }

  Router.push("/admin");
};

const login = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    error: "",
  });

  const handleUsername = (e) => {
    setUserData(Object.assign({}, userData, { username: e.target.value }));
  };

  const handlePassword = (e) => {
    setUserData(Object.assign({}, userData, { password: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserData({ ...userData, error: "" });

    const username = userData.username;
    const password = userData.password;

    try {
      await signin(username, password);
    } catch (error) {
      setUserData({ ...userData, error: error.message });
    }
  };

  return (
    <div>
      <LoginForm
        handleUsername={handleUsername}
        handlePassword={handlePassword}
        handleSubmit={handleSubmit}
        error={userData.error}
      />
    </div>
  );
};

export default login;

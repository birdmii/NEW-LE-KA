import LoginForm from "../components/LoginForm";
import { useState } from "react";
import Router from "next/router";
import { getUser } from "./api/user";
import { parseCookies, destroyCookie } from "nookies";

const signin = async (username, password) => {
  const user = {
    identifier: username,
    password,
  };

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (res.status !== 200) {
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

function redirectUser(ctx, location) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
}

export const getServerSideProps = async (context) => {
  const { token } = parseCookies(context);

  if (token) {
    const admin = await getUser(context, token);
    if (admin) {
      redirectUser(context, "/admin");
    }
    destroyCookie(context, "token");
  }

  return {
    props: {},
  };
};

export default login;

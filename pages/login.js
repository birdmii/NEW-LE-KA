import LoginForm from "../components/LoginForm";
import { useState } from "react";
import { useRouter } from "next/router";

const admin = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

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
        if (!data.user) {
          // TODO: Show Invalid Username or password
          console.log(data);

          return;
        } else {
          // TODO: Show admin page
          router.push("/admin");
        }
      });
  };

  return (
    <div>
      <LoginForm
        handleUsername={handleUsername}
        handlePassword={handlePassword}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default admin;

import adminStyle from "../styles/Admin.module.css";

const LoginForm = () => {

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
          ></input>
          <input
            type="submit"
            value="Sign in"
            className={`mt-24 border-rad-8 ${adminStyle["panel__loginForm--btn"]}`}
          ></input>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

import { login } from "@/services/api/api";
import { getSessionStorage, setItem } from "@services/sessionStorage/session";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginContainer = () => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onChangeLoginForm = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: any
  ) => {
    const { name, value } = event.target;
    if (name === "userid") {
      setUserid(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const payload = {
      userid,
      password,
    };

    setItem("auth", payload);

    navigate("/Dashboard", { replace: true });
    // login(payload);
  };
  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login">
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                onChange={(e) => onChangeLoginForm(e, "userid")}
                type="text"
                name="userid"
                className="login__input"
                placeholder="User name / Email"
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                onChange={(e) => onChangeLoginForm(e, "password")}
                type="password"
                name="password"
                className="login__input"
                placeholder="Password"
              />
            </div>
            <button onClick={onLogin} className="button login__submit">
              <span className="button__text">Log In Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;

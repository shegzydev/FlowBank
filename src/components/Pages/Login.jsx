import React from "react";
import Emblem from "/emblem.png";
import "./Login.css";
import { ArrowRight } from "lucide-react";

const Login = ({ setAuth }) => {
  function login() {
    setAuth(true);
    localStorage.setItem("auth", true);
  }
  return (
    <div className="login-container">
      <p className="welcome">Welcome!</p>
      <img className="emblem" src={Emblem} />
      <form action={login} className="login-form">
        <input type="email" placeholder="Enter email" required />
        <input type="password" placeholder="Enter password" required />
        <button>
          Proceed <ArrowRight />
        </button>
      </form>
    </div>
  );
};

export default Login;

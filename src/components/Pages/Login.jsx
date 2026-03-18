import React, { useContext } from "react";
import Emblem from "/emblem.png";
import "./Login.css";
import { ArrowRight } from "lucide-react";
import LoadingContext from "../../context/LoadingContext";

const Login = ({ setAuth }) => {
  const { beginLoad, endLoad } = useContext(LoadingContext);

  function login() {
    beginLoad("Login in...");
    setTimeout(() => {
      setAuth(true);
      localStorage.setItem("auth", true);
      endLoad(true);
    }, 3000);
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

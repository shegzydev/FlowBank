import React, { useContext, useRef } from "react";
import Emblem from "/emblem.png";
import "./Login.css";
import { ArrowRight } from "lucide-react";
import LoadingContext from "../../context/LoadingContext";
import UserContext from "../../context/UserContext";

const Login = ({ setAuth }) => {
  const { beginLoad, endLoad } = useContext(LoadingContext);
  const { updateUser } = useContext(UserContext);

  const firstName = useRef("Segun");
  const lastName = useRef("Olu-Abe");

  function login() {
    beginLoad("Login in...");

    const name = `${firstName.current.value} ${lastName.current.value}`;
    const email = `${firstName.current.value}${lastName.current.value}@email.com`;

    setTimeout(() => {
      setAuth(true);
      localStorage.setItem("auth", true);
      updateUser({
        name,
        email,
      });
      endLoad(true);
    }, 3000);
  }
  return (
    <div className="login-container">
      <p className="welcome">Welcome!</p>
      <img className="emblem" src={Emblem} />
      <form action={login} className="login-form">
        <input
          ref={firstName}
          type="firstname"
          placeholder="Enter first name"
          required
        />
        <input
          ref={lastName}
          type="lastname"
          placeholder="Enter last name"
          required
        />
        <input type="password" placeholder="Enter password" required />
        <button>
          Proceed <ArrowRight />
        </button>
      </form>
    </div>
  );
};

export default Login;

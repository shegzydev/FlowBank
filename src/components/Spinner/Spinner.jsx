import React, { useContext } from "react";
import "./Spinner.css";
import LoadingContext from "../../context/LoadingContext";

const Spinner = () => {
  const { loading, message } = useContext(LoadingContext);

  return (
    <div className={`spinner ${loading == 0 && "hidden"}`}>
      <div className="parent">
        {loading == 1 ? (
          <div className="circle"></div>
        ) : (
          <div className="done">
            {message.toLowerCase() == "success" ? "✅" : "❌"}
          </div>
        )}
        <p className="spinner-msg">{message}</p>
      </div>
    </div>
  );
};

export default Spinner;

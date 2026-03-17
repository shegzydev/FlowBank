import React, { useContext } from "react";
import "./Spinner.css";
import LoadingContext from "../../context/LoadingContext";

const Spinner = () => {
  const { loading } = useContext(LoadingContext);

  return (
    <div className={`spinner ${!loading && "hidden"}`}>
      <div className="parent">
        <div className="circle"></div>
        <p>Loading</p>
      </div>
    </div>
  );
};

export default Spinner;

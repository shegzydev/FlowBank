import { createContext, useState } from "react";

const LoadingContext = createContext();

export function LoadingProvider(props) {
  const [loading, toggleLoading] = useState(0);
  const [message, setMessage] = useState("Loading...");

  function beginLoad(msg) {
    setMessage(msg);
    toggleLoading(1);
  }

  function endLoad(success) {
    setMessage(success ? "Success" : "Failed");
    toggleLoading(2);

    setTimeout(() => {
      toggleLoading(0);
    }, 1000);
  }

  return (
    <LoadingContext.Provider value={{ loading, message, beginLoad, endLoad }}>
      {props.children}
    </LoadingContext.Provider>
  );
}

export default LoadingContext;

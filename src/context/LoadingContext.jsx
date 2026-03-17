import { createContext, useState } from "react";

const LoadingContext = createContext();

export function LoadingProvider(props) {
  const [loading, toggleLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, toggleLoading }}>
      {props.children}
    </LoadingContext.Provider>
  );
}

export default LoadingContext;

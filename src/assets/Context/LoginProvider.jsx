import { useState } from "react";
import { LoginContext } from "./LoginContext";

export const LoginProvider = ({ children }) => {
  const [abrir, setAbrir] = useState();

  return (
    <LoginContext.Provider value={{ abrir, setAbrir }}>
      {children}
    </LoginContext.Provider>
  );
};

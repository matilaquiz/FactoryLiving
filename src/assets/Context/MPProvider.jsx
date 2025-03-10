import { useState } from "react";
import { MPContext } from "./MPContext";

export const MPProvider = ({ children }) => {
  const [idMaterial, setIdMaterial] = useState({ id: "", estado: false });

  return (
    <MPContext.Provider value={{ idMaterial, setIdMaterial }}>
      {children}
    </MPContext.Provider>
  );
};

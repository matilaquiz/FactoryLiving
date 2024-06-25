import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Principal } from "../Principal/Principal";
import { RegistroCliente } from "../FormularioCliente/RegistroCliente";
import { VentasGUI } from "../VentasSillones/VentasGUI";

export const Rutas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal />}></Route>
        <Route
          path="/FormularioCliente/RegistroCliente"
          element={<RegistroCliente />}
        ></Route>
        <Route path="/VentasSillones/VentasGUI" element={<VentasGUI />}></Route>
        <Route path="" element></Route>
      </Routes>
    </BrowserRouter>
  );
};

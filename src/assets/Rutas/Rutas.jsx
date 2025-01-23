import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Principal } from "../Principal/Principal";
import { RegistroCliente } from "../FormularioCliente/RegistroCliente";
import { Stock } from "../indexStock/Stock";
import { PrincipalVentas } from "../VentasSillones/PrincipalVentas";
import { RegistroProveedor } from "../Proveedores/RegistroProveedor";
import { FormularioProductos } from "../Productos/FormularioProductos";
import { GraficoTarta } from "../Grafico/GraficoTarta";
import { IndexCompras } from "../Compras/IndexCompras";
import { PrincipalLogin } from "../ComponentesAnclados/PrincipalLogin";
import { LoginProvider } from "../Context/LoginProvider";

export const Rutas = () => {
  return (
    <LoginProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrincipalLogin />}></Route>

          <Route path="/Principal" element={<Principal />}></Route>
          <Route
            path="/FormularioCliente/RegistroCliente"
            element={<RegistroCliente />}
          ></Route>
          <Route
            path="/VentasSillones/PrincipalVentas"
            element={<PrincipalVentas />}
          ></Route>
          <Route
            path="/Proveedores/RegistroProveedor"
            element={<RegistroProveedor />}
          ></Route>
          <Route path="/indexStock/Stock" element={<Stock />}></Route>
          <Route
            path="/Productos/FormularioProductos"
            element={<FormularioProductos />}
          ></Route>
          <Route
            path="/Compras/IndexCompras"
            element={<IndexCompras />}
          ></Route>
          <Route
            path="/Grafico/GraficoTarta"
            element={<GraficoTarta />}
          ></Route>
          <Route
            path="/ComponentesAnclados/PrincipalLogin"
            element={<PrincipalLogin />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </LoginProvider>
  );
};

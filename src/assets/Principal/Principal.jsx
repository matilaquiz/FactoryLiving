import CartasEntrada from "./CartasEntrada";
import "../Estilos/Principal.css";
import { useEffect, useState } from "react";
import { LoginContext } from "../Context/LoginContext";
import { Box } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

export const Principal = () => {
  const [usuario, setUsuario] = useState({});
  const { temporal } = sessionStorage;
  const navigate = useNavigate();

  useEffect(() => {
    const datosTemporales = JSON.parse(sessionStorage.getItem("temporal"));
    if (datosTemporales) {
      setUsuario(datosTemporales);
    }
  }, [temporal]);

  const handleLogout = () => {
    sessionStorage.removeItem("temporal");
    navigate("/");
  };

  return (
    <>
      {usuario && (
        <div>
          <Box onClick={handleLogout} style={{ cursor: "pointer" }}>
            <ExitToAppIcon></ExitToAppIcon>
          </Box>
          <div className="principalcarta">
            <div className="cartas-unidas">
              <CartasEntrada
                titulo="Administrar Cliente"
                url="/FormularioCliente/RegistroCliente"
                image="/src/images/cliente.png"
                alt="Imagen de cliente"
              />
              <CartasEntrada
                titulo="Administrar Compra"
                url="/Compras/indexCompras"
                image="/src/images/pedido.png"
                alt="Imagen de administracion"
              />
              <CartasEntrada
                titulo="Administrar materiales"
                url="/indexStock/Stock"
                image="/src/images/stock1.png"
                alt="Imagen de stock"
              />
            </div>

            <div className="cartas-unidas">
              <CartasEntrada
                titulo="Administrar Ventas"
                url="/VentasSillones/PrincipalVentas"
                image="/src/images/ventas.png"
                alt="Imagen de venta"
              />
              <CartasEntrada
                titulo="Administrar Proveedor"
                url="/Proveedores/RegistroProveedor"
                image="/src/images/proveedor (1).png"
                alt="Imagen de proveedor"
              />
              <CartasEntrada
                titulo="Administrar Producto"
                url="/Productos/FormularioProductos"
                image="/src/images/sofa.png"
                alt="Imagen de rr.hh"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

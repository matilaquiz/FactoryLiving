import CartasEntrada from "./CartasEntrada";
import "../Estilos/Principal.css";
import { useEffect, useState } from "react";
import { LoginContext } from "../Context/LoginContext";
import { Box } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

export const Principal = () => {
  const [usuario, setUsuario] = useState();
  const { temporal } = sessionStorage;
  const navigate = useNavigate();

  const datosTemporales = JSON.parse(sessionStorage.getItem("temporal"));
  useEffect(() => {
    if (datosTemporales) {
      setUsuario(datosTemporales);
    } else {
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("temporal");
    navigate("/");
  };

  console.log(datosTemporales.tipo);
  return (
    <>
      <div>
        <div className="usuario">
          <Box
            onClick={handleLogout}
            sx={{
              width: "70px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              fontSize: "25px",
              color: "gray",
              marginLeft: "15px",
              "&:hover": {
                color: "white", // Cambiar color al hacer hover
              },
            }}
          >
            <ExitToAppIcon
              sx={{
                fontSize: "60px",
                borderRadius: "10px",
                marginLeft: "10px",
              }}
            />
            <span>Logout</span>
          </Box>
          <h1>{datosTemporales?.tipo?.toUpperCase() || "Cargando..."}</h1> {/* ACA OCURRIO EL ERROR */}
        </div>

        {/* Contenido principal */}
        <div className="principalcarta">
          {/* Si el usuario es admin, muestra todo */}
          {datosTemporales.tipo === "administracion" && (
            <>
              <div className="cartas-unidas">
                <CartasEntrada
                  titulo="Administrar Cliente"
                  url="/FormularioCliente/RegistroCliente"
                  image="/src/images/cliente.png"
                  alt="Imagen de cliente"
                />
                <CartasEntrada
                  titulo="Administrar Ventas"
                  url="/VentasSillones/PrincipalVentas"
                  image="/src/images/ventas.png"
                  alt="Imagen de venta"
                />
                <CartasEntrada
                  titulo="Administrar Producto"
                  url="/Productos/FormularioProductos"
                  image="/src/images/sofa.png"
                  alt="Imagen de producto"
                />
              </div>

              <div className="cartas-unidas">
                <CartasEntrada
                  titulo="Administrar Proveedor"
                  url="/Proveedores/RegistroProveedor"
                  image="/src/images/proveedor (1).png"
                  alt="Imagen de proveedor"
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
            </>
          )}

          {/* Si el usuario es ventas, muestra opciones limitadas */}
          {datosTemporales.tipo === "ventas" && (
            <div className="cartas-unidas">
              <CartasEntrada
                titulo="Administrar Cliente"
                url="/FormularioCliente/RegistroCliente"
                image="/src/images/cliente.png"
                alt="Imagen de cliente"
              />
              <CartasEntrada
                titulo="Administrar Ventas"
                url="/VentasSillones/PrincipalVentas"
                image="/src/images/ventas.png"
                alt="Imagen de venta"
              />
              <CartasEntrada
                titulo="Administrar Producto"
                url="/Productos/FormularioProductos"
                image="/src/images/sofa.png"
                alt="Imagen de producto"
              />
            </div>
          )}

          {/* Si el usuario es compras, muestra otras opciones */}
          {datosTemporales.tipo === "compras" && (
            <div className="cartas-unidas">
              <CartasEntrada
                titulo="Administrar Proveedor"
                url="/Proveedores/RegistroProveedor"
                image="/src/images/proveedor (1).png"
                alt="Imagen de proveedor"
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
          )}
        </div>
      </div>
    </>
  );
};

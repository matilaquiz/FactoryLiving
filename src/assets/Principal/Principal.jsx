import CartasEntrada from "./CartasEntrada";
import "../Estilos/Principal.css";

export const Principal = () => {
  return (
    <> 
    <div className="principalcarta">
      <div className='cartas-unidas'>
        <CartasEntrada 
          titulo='Administrar Cliente' 
          url='/FormularioCliente/RegistroCliente' 
          image="/src/images/cliente.png" 
          alt="Imagen de cliente" 
        />
        <CartasEntrada
          titulo="Administración "
          image="/src/images/admin.png"
          alt="Imagen de administracion"
        />
        <CartasEntrada 
          titulo='Administrar stock' 
          url='/indexStock/Stock'
          image="/src/images/stock1.png" 
          alt="Imagen de stock" 
        />
      </div>

      <div className="cartas-unidas">
        <CartasEntrada
          titulo=" Ventas"
          url="/VentasSillones/VentasGUI"
          image="/src/images/ventas.png"
          alt="Imagen de venta"
        />
        <CartasEntrada
          titulo="Administrar Proveedor"
          url='/Proveedores/RegistroProveedor' 
          image="/src/images/proveedor.png"
          alt="Imagen de proveedor"
        />
        <CartasEntrada
          titulo="RR.HH"
          image="/src/images/rrhh.png"
          alt="Imagen de rr.hh"
        />
      </div>
      </div>
    </>
  );
};

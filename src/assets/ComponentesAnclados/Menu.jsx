import "../Estilos/Menu.css";

export const Menu = () => {
  return (
    <nav className="navegador">
      <div className="nav-logo">
        <img src="/src/Images/logonuevo.png" />
      </div>
      <div className="Menu">
        <ul className="ul-Menu">
          <li>
            <a href="/Principal">
              <img src="/src/Images/casa-icono-silueta.png" />
              Inicio
            </a>
          </li>
          <li>
            <a href="/FormularioCliente/RegistroCliente">
              <img src="/src/Images/nueva-cuenta.png" />
              Cliente
            </a>
          </li>
          <li>
            <a href="/Proveedores/RegistroProveedor">
              <img src="/src/Images/proveedor.png" />
              Proveedor
            </a>
          </li>
          <li>
            <a href="/Grafico/GraficoTarta">
              <img src="/src/Images/sobre-nosotros.png" />
              Estadistica
            </a>
          </li>
          <li>
            <a href="/indexStock/Stock">
              <img src="/src/Images/paquete-o-empaquetar.png" />
              Stock
            </a>
          </li>
          <li>
            <a href="/VentasSillones/PrincipalVentas">
              <img src="/src/Images/ventas2.png" />
              Venta
            </a>
          </li>
          <li>
            <a href="/Compras/IndexCompras">
              <img src="/src/Images/entrega-de-pedidos.png" />
              Compra
            </a>
          </li>
          <li>
            <a href="/Productos/FormularioProductos">
              <img src="/src/Images/sofa (1).png" />
              Productos
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

import "../Estilos/Menu.css"

export const Menu = () => {
  return (
      <nav className="navegador" >
        <div className="nav-logo">
          <img src="/src/Images/logonuevo.png"/>
        </div>
        <div className="Menu">
          <ul className="ul-Menu">
            <li><a href="/"><img src="/src/Images/casa-icono-silueta.png"/>Inicio</a></li>
            <li><a href="/FormularioCliente/RegistroCliente"><img src="/src/Images/nueva-cuenta.png"/>Cliente</a></li>
            <li><a href="#"><img src="/src/Images/sobre-nosotros.png"/>Nosotros</a></li>
            <li><a href="/indexStock/Stock"><img src="/src/Images/paquete-o-empaquetar.png"/>Stock</a></li>
            <li><a href="/VentasSillones/VentasGUI"><img src="/src/Images/ventas2.png"/>Venta</a></li>
            <li><a href="#"><img src="/src/Images/promociones.png"/>Promos</a></li>
            <li><a href="#"><img src="/src/Images/recursos-humanos.png"/>R.R.H.H</a></li>
          </ul>
        </div>    
      </nav>
  )
}

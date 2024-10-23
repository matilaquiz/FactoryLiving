
import { BrowserRouter , Route , Routes} from 'react-router-dom'
import { Principal } from '../Principal/Principal'
import { RegistroCliente } from '../FormularioCliente/RegistroCliente'
import { Stock } from '../indexStock/Stock'
import { VentasGUI } from '../VentasSillones/VentasGUI'
import { RegistroProveedor } from '../Proveedores/RegistroProveedor'
import { FormularioProductos } from '../Productos/FormularioProductos'
import { GraficoTarta } from '../Grafico/GraficoTarta'



export const Rutas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Principal />}></Route>
                <Route path="/FormularioCliente/RegistroCliente" element={<RegistroCliente/>}></Route>
                <Route path="/VentasSillones/VentasGUI" element={<VentasGUI />}></Route>
                <Route path="/Proveedores/RegistroProveedor" element={<RegistroProveedor/>}></Route>
                <Route path="/indexStock/Stock" element={<Stock/>}></Route>
                <Route path="/Productos/FormularioProductos" element={<FormularioProductos />}></Route>
                <Route path="/Grafico/GraficoTarta" element={<GraficoTarta />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

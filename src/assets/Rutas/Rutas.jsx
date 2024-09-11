
import { BrowserRouter , Route , Routes} from 'react-router-dom'
import { Principal } from '../Principal/Principal'
import { RegistroCliente } from '../FormularioCliente/RegistroCliente'
import { Stock } from '../indexStock/Stock'
import { VentasGUI } from '../VentasSillones/VentasGUI'
import { RegistroProveedor } from '../Proveedores/RegistroProveedor'


export const Rutas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Principal />}></Route>
                <Route path="/FormularioCliente/RegistroCliente" element={<RegistroCliente/>}></Route>
                <Route path="/VentasSillones/VentasGUI" element={<VentasGUI />}></Route>
                <Route path="/Proveedores/RegistroProveedor" element={<RegistroProveedor/>}></Route>
                <Route path="/indexStock/Stock" element={<Stock/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

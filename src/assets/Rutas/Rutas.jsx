import React from 'react'
import { BrowserRouter , Route , Routes} from 'react-router-dom'
import { Principal } from '../Principal/Principal'
import { RegistroCliente } from '../FormularioCliente/RegistroCliente'
import { Stock } from '../indexStock/Stock'

export const Rutas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Principal />}></Route>
                <Route path="/FormularioCliente/RegistroCliente" element={<RegistroCliente/>}></Route>
                <Route path="" element></Route>
                <Route path="" element></Route>
                <Route path="/indexStock/Stock" element={<Stock/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

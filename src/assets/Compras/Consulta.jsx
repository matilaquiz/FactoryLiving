import React, { useEffect, useState } from 'react'
import axios from 'axios'

export function Consulta() {
    const [lista, setLista] = useState([])
    const [materiales, setMateriales] = useState([])
    const [cantidades, setCantidades] = useState([])
    const [lista2, setLista2] = useState([])

    useEffect(() => {
        const traerGraficos = async () => {
            try {
                const resp = await axios.get("http://localhost:3000/buscarDate")
                setLista(resp.data)
                const mat = lista.map(mp => mp.Nombre)
                const cant = lista.map(mp => mp.CantPorMP)
                setMateriales(mat)
                setCantidades(cant)
            } catch (e) {
                console.warn(e)
            }
        }
        traerGraficos()
    }, [])

    
    useEffect(() => {
        const traerGraficos2 = async () => {
            try {
                const resp = await axios.get("http://localhost:3000/GraficoCantidad")
                setLista2(resp.data)

            } catch (e) {
                console.warn(e)
            }
        }
        traerGraficos2()
    }, [])
    console.log(lista2)



    return (
        <div>

        </div>
    )
}

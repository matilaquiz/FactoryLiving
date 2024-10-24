import { Bar } from "react-chartjs-2";
import { useState, useEffect } from 'react'
import axios from 'axios'

import {
    Chart as chartjs,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js'

chartjs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,

);
const GraficoBarras = () => {
   
    const [materiales, setMateriales] = useState([])
    const [cantidades, setCantidades] = useState([])
    const [mes, setMes] = useState([])
    

    const cambiarMes=(e)=>{
        setMes(e.target.value)
    }

   
    useEffect(() => {
        const traerGraficos = async () => {
            try {
                const resp = await axios.get("http://localhost:3000/buscarDate")
               
                const mat = resp.data.map(mp => mp.Nombre)
                const cant = resp.data.map(mp => mp.CantPorMP)
                setMateriales(mat)
                setCantidades(cant)
            } catch (e) {
                console.warn(e)
            }
        }
        traerGraficos()
    
    
    }, [])
    

    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };



    let misoptions = {
        responsive: true,
        animation: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                min: 0,
                max: 4000
            },
            x: {
                ticks: { color: 'rgba(0, 220, 195)' }
            }
        }

    };

    const colores = cantidades.map(() => getRandomColor())

    let midata = {
        labels: materiales,
        datasets: [
            {
                label: 'cantidades',
                data: cantidades,
                backgroundColor:colores
            },
       
        ]
    };




    return (
        
            <Bar data={midata} options={misoptions} />
          
      
    )

}
export { GraficoBarras };
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Pie } from "react-chartjs-2"
import {GaficoVentasContext} from "../Context/GraficoVentasContext"
import {
    Chart as chartjs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    scales,
} from 'chart.js';
import { Height } from '@mui/icons-material';

chartjs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    scales
);

const GraficoTartaVentas = () => {
    
    const {mes,setMes} = useContext(GaficoVentasContext)
    const [producto,setProducto] = useState([])
    const [prodVendidos,setProdVendidos] = useState([])

   
   
 
   useEffect(() => {
        const traerGraficos2 = async () => {
            try {
                const resp = await axios.get(`http://localhost:3000/graficoTortaVentas/${mes}`)

                const prod = resp.data.map(p => p.nombre_producto)
                const vendidos = resp.data.map(p =>(p.cantidad_vendida*100/p.cantidad_total_mes))
                console.log(resp.data)
                setProducto(prod)
                setProdVendidos(vendidos)

            } catch (e) {
                console.warn(e)
            }
        }
        if (mes) {
            traerGraficos2()
        }
    }, [mes])

    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const colores=producto.map((p)=>getRandomColor())



    let midata = {
        labels: producto,
        datasets: [
            {
                label: 'precios',
                data: prodVendidos,
                tension: 0.5,
               
                borderColor: 'rgba(71, 113, 191 )',
                backgroundColor: colores,
                pointRadius: 5,
                pointBorderColor: 'rgba(255, 99, 132)',
                pointBackgroundColor: 'rgba(255, 99, 132)',
            },
        ],
    }

    let misoptions = {
      
       maintainAspectRatio:false,
       plugins: {
        tooltip: {
            enabled: true,
            callbacks: {
                label: function (tooltipItem) {
                    return tooltipItem.label + ": " + tooltipItem.raw + " %";  // Solo agrega el símbolo '%' al valor
                }
            }
        },
    },
   
    };

    return (
        <>
            <Pie data={midata} options={misoptions} height={400} />
           
            
         
        </>
    )
}
export {GraficoTartaVentas};

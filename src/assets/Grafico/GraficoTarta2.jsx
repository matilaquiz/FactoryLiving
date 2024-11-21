import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import {Bar} from "react-chartjs-2"
import { GaficoMaterialesContext } from '../Context/GaficoMaterialesContext';

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

const GraficoTarta2 = () => {
    
    const [materiales, setMateriales] = useState([]);
    const [aumentoPorcentaje, setAumentoPorcentaje] = useState([]);

 
   useEffect(() => {
        const traerGraficos2 = async () => {
            try {
                const resp = await axios.get(`http://localhost:3000/graficoTortaMP/10`)
                console.log(resp.data)
                procesarDatos(resp.data)

            } catch (e) {
                console.warn(e)
            }
        }
        //if (material) {
          //  
        //}
        traerGraficos2()
    }, [])
    
      function procesarDatos(data) {
      
        const preciosPorMaterial = {};
    
        data.forEach((item) => {
          const { material, año, precio_promedio_mensual } = item;
          if (!preciosPorMaterial[material]) preciosPorMaterial[material] = {};
          preciosPorMaterial[material][año] = precio_promedio_mensual;
        });
    
        // Arrays de resultados
        const nombresMateriales = [];
        const porcentajesAumento = [];
    
        // Calculamos el aumento para cada material
           Object.keys(preciosPorMaterial).forEach((material) => {
          const precios = preciosPorMaterial[material];
          const precioAñoPasado = precios[new Date().getFullYear() - 1];
          const precioAñoActual = precios[new Date().getFullYear()];
    
          if (precioAñoPasado && precioAñoActual) {
            const aumento = ((precioAñoActual - precioAñoPasado) / precioAñoPasado) * 100;
            nombresMateriales.push(material);
            porcentajesAumento.push(aumento);
          }
        });
    
        // Guardamos los resultados en el estado
        setMateriales(nombresMateriales);
        setAumentoPorcentaje(porcentajesAumento);
      }

      const name=["Clavo","Goma Espuma","Estructura de Madera","Tela Pana","Tela Rustica","Pata de Metal","Pata de Madera"]
      const nombres=[...materiales]
      const mat=nombres.map(nombre=>name[nombre-1])

      const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const colores=mat.map((mat)=>getRandomColor())

      console.log(materiales)

    let midata = {
        labels: mat,
        datasets: [
            {
                label: 'precios',
                data: aumentoPorcentaje,
                tension: 0.5,
                fill: true,
                borderColor: colores,
                backgroundColor:colores,
                pointRaius: 5,
                pointBorderColor: 'rgba(255, 99, 132)',
                pointBackgroundColor: 'rgba(255, 99, 132)',
            },
        ],
    }


    let misoptions = {
        scales: {
            x: {
                type: 'category',
            },
            y: {
                type: 'linear',
                beginAtZero: true, 
                ticks: {
                    
                    callback: function (value) {
                        return value + '%';
                    },
            },
        },
    },
    plugins: {
        tooltip: {
            callbacks: {
                // Formatea el valor del tooltip con el símbolo de %
                label: function (context) {
                    return context.dataset.label + ': ' + context.parsed.y + '%';
                },
            },
        },
    }
    };
    

    return (
        <>
            <Bar data={midata} options={misoptions} />
         
        </>
    )
}
export { GraficoTarta2 };

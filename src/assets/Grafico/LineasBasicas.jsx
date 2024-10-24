// import { Label } from "@mui/icons-material";
import {useState,useEffect} from 'react'
import axios from 'axios'
import { Line } from "react-chartjs-2";

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

const LineasBasicas=()=>{
const [mes,setMes]=useState("")
const [materiales, setMateriales] = useState([])
const [cantidades, setCantidades] = useState([])



const cambiarMes=(e)=>{
    setMes(e.target.value)
}


useEffect(() => {
    const traerGraficos2 = async () => {
        try {
            const resp = await axios.get("http://localhost:3000/GraficoCantidad",{params: { mes: mes }} )
        
            const mat = resp.data.map(mp => mp.material)
            const cant = resp.data.map(mp => mp.cantidad)
            console.log(mat)
            setMateriales(mat)
            setCantidades(cant)

        } catch (e) {
            console.warn(e)
        }
    }
    if(mes){
    traerGraficos2()
    }
}, [mes])





let midata = {
    labels: materiales,
    datasets: [
        {
            label: 'cantidades',
            data: cantidades,
            tension: 0.5,
            fill: true,
            borderColor: 'rgba(255, 99, 32)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
        },
    },
};

    return (
    <>
    <Line data={midata} options={misoptions}/>
    <select style={{height:"30px", width:"80px"}} onChange={cambiarMes} value={mes}>
                <option value=""> mes</option>
                <option value={1}>Enero</option>
                <option value={2}>Febrero</option>
                <option value={3}>Marzo</option>
                <option value={4}>Abril</option>
                <option value={5}>Mayo</option>
                <option value={6}>Junio</option>
                <option value={7}>Julio</option>
                <option value={8}>Agosto</option>
                <option value={9}>Septiembre</option>
                <option value={10}>Octubre</option>
                <option value={11}>Noviembre</option>
                <option value={12}>Diciembre</option>
               
            </select>
    </>
    )
}
export {LineasBasicas};

// import { Label } from "@mui/icons-material";
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

let beneficios = [0, 56, -20, 36, 80, 40, 30, -30, 25, 30, 12, 60];
let meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

let midata = {
    labels: meses,
    datasets: [
        {
            label: 'Compras',
            data: beneficios,
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
const LineasBasicas = () => {
    return <Line data={midata} options={misoptions}/>
}
export {LineasBasicas};

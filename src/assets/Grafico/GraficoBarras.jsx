import { Bar } from "react-chartjs-2";


import{
    Chart as chartjs,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
}from 'chart.js'

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

let beneficios = [0, 56, -20, 36, 80, 40, 30, -30, 25, 30, 12, 60];
let meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

let misoptions ={
    responsive: true,
    animation: true,
    plugins: {
        legend:{
            display: false
        }
    },
    scales: {
        y: {
            min: -25,
            max: 100
        },
        x: {
            ticks: {color: 'rgba(0, 220, 195)'}
        }
    }

};

let midata = {
    labels: meses,
    datasets: [
        {
            label: 'compras',
            data: beneficios,
            backgroundColor: 'rgba(0, 220, 195, 0.5)'
        }
    ]
};

const GraficoBarras = () => {
    return <Bar data={midata} options={misoptions}/>
}
export {GraficoBarras};
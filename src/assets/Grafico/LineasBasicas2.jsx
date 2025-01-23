import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { GaficoMaterialesContext } from "../Context/GaficoMaterialesContext";

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
} from "chart.js";
import { Height } from "@mui/icons-material";

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

const LineasBasicas2 = () => {
  const { material, anio } = useContext(GaficoMaterialesContext);
  const [mes, setMes] = useState([]);
  const [precio, setPrecio] = useState([]);

  useEffect(() => {
    const traerGraficos2 = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:3000/graficoAumentoXMP/${material}/${anio}`
        );

        const mes = resp.data.map((mp) => mp.mes);
        const nombresMeses = [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ];
        const meses = mes.map((m) => nombresMeses[m - 1]);
        const precio = resp.data.map((mp) =>
          parseFloat(mp.precio_promedio_mensual)
        );
        console.log(resp.data);
        setMes(meses);
        setPrecio(precio);
      } catch (e) {
        console.warn(e);
      }
    };
    if (material) {
      traerGraficos2();
    }
  }, [material, anio]);

  let midata = {
    labels: mes,
    datasets: [
      {
        label: "precios",
        data: precio,
        tension: 0.5,
        fill: true,
        borderColor: "rgba(71, 113, 191 )",
        backgroundColor: "rgba(71, 113, 191 , 0.5)",
        pointRaius: 5,
        pointBorderColor: "rgba(255, 99, 132)",
        pointBackgroundColor: "rgba(255, 99, 132)",
      },
    ],
  };

  let misoptions = {
    scales: {
      x: {
        type: "category",
      },
      y: {
        type: "linear",
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Line data={midata} options={misoptions} />
    </>
  );
};
export { LineasBasicas2 };

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { GaficoVentasContext } from "../Context/GraficoVentasContext";

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
import SelectorVentas from "./SelectorVentas";

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

const GraficoLinealVentas = () => {
  const [anio, setAnio] = useState();
  const [meses, setMeses] = useState([]);
  const [precio, setPrecio] = useState([]);

  useEffect(() => {
    const traerGraficos2 = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:3000/graficoLinealVentas/${anio}`
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
        const precio = resp.data.map((mp) => mp.precio_promedio_mensual);
        const meses = mes.map((m) => nombresMeses[m - 1]);

        setMeses(meses);
        setPrecio(precio);
      } catch (e) {
        console.warn(e);
      }
    };
    if (anio) {
      traerGraficos2();
    }
  }, [anio]);

  let midata = {
    labels: meses,
    datasets: [
      {
        label: "facturacion",
        data: precio,
        tension: 0.5,
        fill: true,
        borderColor: "rgba(87, 170, 55)",
        backgroundColor: "rgba(87, 170, 55, 0.5)",
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
      },
    },
  };

  return (
    <>
      <Line data={midata} options={misoptions} />
      <div style={{ marginLeft: "250px" }}>
        <SelectorVentas anio={setAnio}></SelectorVentas>
      </div>
    </>
  );
};
export { GraficoLinealVentas };

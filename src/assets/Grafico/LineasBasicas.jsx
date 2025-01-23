// import { Label } from "@mui/icons-material";
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

const LineasBasicas = () => {
  const { mesCompras, anioCompras } = useContext(GaficoVentasContext);
  const [materiales, setMateriales] = useState([]);
  const [cantidades, setCantidades] = useState([]);

  useEffect(() => {
    const traerGraficos2 = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:3000/GraficoCantidad/${mesCompras}/${anioCompras}`
        );

        const mat = resp.data.map((mp) => mp.material);
        const cant = resp.data.map((mp) => mp.cantidad);
        console.log(mat);
        setMateriales(mat);
        setCantidades(cant);
      } catch (e) {
        console.warn(e);
      }
    };
    if ((mesCompras, anioCompras)) {
      traerGraficos2();
    }
  }, [mesCompras, anioCompras]);

  let midata = {
    labels: materiales,
    datasets: [
      {
        label: "cantidades",
        data: cantidades,
        tension: 0.5,
        fill: true,
        borderColor: "rgba(255, 99, 32)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
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
    </>
  );
};
export { LineasBasicas };

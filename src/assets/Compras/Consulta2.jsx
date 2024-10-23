import { useState, useEffect } from "react";
import axios from "axios";
import { Chart, Bar } from "react-chartjs-2";
import 'chart.js/auto'; // Es necesario para Chart.js 3

export function Consulta2() {
    const [chartData, setChartData] = useState({});
    
    useEffect(() => {
        const traerGraficos = async () => {
            try {
                const resp = await axios.get("http://localhost:3000/buscarDate");
                const data =[
                    { mes: "Enero", material: "Material A", cantidad: 30 },
                    { mes: "Enero", material: "Material B", cantidad: 20 },
                    { mes: "Febrero", material: "Material A", cantidad: 50 },
                    { mes: "Febrero", material: "Material B", cantidad: 10 },
                
                  ]

                // Extraer los meses y materiales únicos
                const meses = [...new Set(data.map(item => item.mes))];
                const materiales = [...new Set(data.map(item => item.material))];

                // Crear un array para cada material con sus cantidades por mes
                const datasets = materiales.map(material => {
                    return {
                        label: material,  // Nombre del material
                        data: meses.map(mes => {
                            // Buscar la cantidad del material en el mes correspondiente
                            const item = data.find(d => d.mes === mes && d.material === material);
                            return item ? item.cantidad : 0; // Si no hay datos, retorna 0
                        }),
                        backgroundColor: getRandomColor(),  // Función para colores aleatorios
                        borderColor: getRandomColor(),
                        borderWidth: 1
                    };
                });

                // Actualizar el estado con los datos del gráfico
                setChartData({
                    labels: meses,  // Etiquetas de los meses
                    datasets: datasets // Conjuntos de datos (un dataset por material)
                });
            } catch (e) {
                console.warn(e);
            }
        };

        traerGraficos();
    }, []);

    // Función para generar colores aleatorios
    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div>
            <h1>Gráfico de Materiales por Mes</h1>
            <div>
                {/* Renderiza el gráfico solo si chartData tiene datos */}
                {chartData && chartData.labels ? (
                    <Bar 
                        data={chartData} 
                        options={{
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }}
                    />
                ) : (
                    <p>Cargando...</p>
                )}
            </div>
        </div>
    );
};



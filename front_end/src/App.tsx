import React, { useEffect, useState } from 'react';
import { Chart, CategoryScale, LinearScale, PointElement, LineController, LineElement, ArcElement,Legend, Tooltip } from 'chart.js';

import { Line } from 'react-chartjs-2';
import './index.css'
import Navbar from './components/NavBar';
import GraficoLinha from 'components/GraficoLinha';
import { BASE_URL } from 'utils/requests';


Chart.register(CategoryScale, LinearScale, PointElement, LineController, LineElement, Legend, Tooltip);

interface SensorData {
  temperature: number;
  humidity: number;
}

const fetchData = async (): Promise<SensorData> => {
  // Simulação de requisição assíncrona para obter dados do sistema IoT
  return new Promise((resolve) => {
    setTimeout(() => {
      const data: SensorData = {
        temperature: Math.random() * 100,
        humidity: Math.random() * 100,
      };
      resolve(data);
    }, 2000); // Simula um atraso de 2 segundos na resposta
  });
};

const App: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  //const [chartData, setChartData] = useState<number[]>([]);

  const [chartData, setChartData] = useState<{ temperature: number[]; humidity: number[] }>({
    temperature: [],
    humidity: [],
  });
  

  useEffect(() => {
  

    const fetchDataAndChart = async () => {
      const data = await fetchData();
      setSensorData(data);
      setChartData((prevChartData) => ({
        temperature: [...prevChartData.temperature, data.temperature],
        humidity: [...prevChartData.humidity, data.humidity],
      }));
    };
    

    const interval = setInterval(fetchDataAndChart, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (

    <div className="App">

      <h1>Monitoramento IoT</h1>
      {sensorData ? (
        <div>
          <p>Temperatura: {sensorData.temperature.toFixed(2)} °C</p>
          <p>Umidade: {sensorData.humidity.toFixed(2)} %</p>
        </div>
      ) : (
        <p>Carregando dados...</p>
      )}

      <div className="chart-container">
        {/* <Line
          data={{
            labels: Array.from({ length: chartData.temperature.length }, (_, i) => i.toString()),
            datasets: [
              {
                label: 'Temperatura (últimas horas)',
                data: chartData.temperature,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
              },
              {
                label: 'Umidade (últimas horas)',
                data: chartData.humidity,
                fill: false,
                borderColor: 'rgb(192, 75, 192)',
              },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        /> */}
        <GraficoLinha apiUrl= {BASE_URL + '/dadosgrafico'}/>
      </div>
    </div>
  );
};

export default App;

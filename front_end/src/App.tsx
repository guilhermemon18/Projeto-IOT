import React, { useEffect, useState } from 'react';
import './index.css'
import GraficoLinha from 'components/GraficoLinha';
import { BASE_URL } from 'utils/requests';
import axios from 'axios';
import Navbar from 'components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Graficos from 'pages/Graficos';
import CadastroSala from 'pages/CadastroSala';


interface SensorData {
  temperature: number;
  humidity: number;
}

const fetchData = async (): Promise<SensorData> => {
  try {
    const response = await axios.get(BASE_URL + '/dados');
    return response.data;
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    throw error;
  }
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
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
        <Route path="/" element={<Graficos />} />
        <Route path="/cadastrarsala" element={<CadastroSala />} />
      </Routes>
        {/* {sensorData ? (
          <div>
            <p>Temperatura: {sensorData.temperature.toFixed(2)} °C</p>
            <p>Umidade: {sensorData.humidity.toFixed(2)} %</p>
          </div>
        ) : (
          <p>Carregando dados...</p>
        )}

        <div className="chart-container">
          <GraficoLinha />
        </div> */}

      </div>
    </BrowserRouter>
  );
};

export default App;
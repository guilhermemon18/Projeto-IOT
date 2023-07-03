import axios from 'axios';
import GraficoLinha from 'components/GraficoLinha';
import GraficoTemperatura from 'components/GraficoTemperatura';
import GraficoUmidade from 'components/GraficoUmidade';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from 'utils/requests';
import './styles.css'


interface SensorData {
  temperature: number;
  humidity: number;
}

const fetchData = async (): Promise<SensorData> => {
  try {
    const response = await axios.get(BASE_URL + '/dados');
    console.log("entrou fazer requisição dos dados dos gráficos de home!");
    return response.data;
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    throw error;
  }
};


function Graficos() {

  const [sensorData, setSensorData] = useState<SensorData | null>(null);


  useEffect(() => {


    const fetchDataAndChart = async () => {
      const data = await fetchData();
      setSensorData(data);
    };


    const interval = setInterval(fetchDataAndChart, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);



  return (
    <div className="container">


      {sensorData ? (
        <div className="row">
          <div className="col-md-6 text-center chart-carder">
            <h1>Temperatura Atual:</h1>
            {/* Conteúdo do gráfico */}
            <GraficoTemperatura temperatura={sensorData.temperature} />
            {/* <GraficoSensor /> */}

          </div>

          <div className="col-md-6 text-center chart-carder">
            {/* Conteúdo do gráfico */}
            <h1>Umidade Atual:</h1>
            <GraficoUmidade umidade={sensorData.humidity} />
            {/* <GraficoSensor /> */}
          </div>

          <div className="col-md-6 chart-carder">
          <h1>Últimas 24 horas:</h1>
          {/* Conteúdo do gráfico */}
          <GraficoLinha />
        </div>

        </div>
      ) : (
        <p className='text-center'>Carregando dados...</p>
      )}

      <div className="row justify-content-center align-items-center">

       
      </div>
    </div>
  );
}

export default Graficos;

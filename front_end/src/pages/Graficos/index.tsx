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



type Props = {
  salaName: string;
}


function Graficos({ salaName }: Props) {

  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [salaValida, setSalaValida] = useState(false);

  useEffect(() => {
    setSensorData(null);
    setSalaValida(true);
    const fetchDataAndChart = async () => {
      try {
        const data = await fetchData();
        setSensorData(data);
        setSalaValida(true);
      } catch (error) {
        setSalaValida(false);
      }

    };


    const interval = setInterval(fetchDataAndChart, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [salaName]);


  const fetchData = async (): Promise<SensorData> => {
    try {
      // const response = await axios.get(BASE_URL + '/dados');
      const response = await axios.get(`${BASE_URL}/dados?sala=${salaName}`);
      console.log("entrou fazer requisição dos dados dos gráficos de home!");
      setSalaValida(true);
      return response.data;
    } catch (error) {
      console.error('Error fetching sensor data:', error);
      setSalaValida(false); 
      
      throw error;
    }
  };

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
       {!salaValida ? <p className='text-center'>É necessário que haja um sensor configurado para a respectiva sala!</p> : null}

      <div className="row justify-content-center align-items-center">


      </div>
    </div>
  );
}

export default Graficos;

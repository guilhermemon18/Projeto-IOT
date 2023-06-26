import { useEffect, useState } from 'react';
import { BASE_URL } from 'utils/requests';
import axios from 'axios';
import GaugeComponent from 'react-gauge-component';


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

function GraficoSensor() {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);


  useEffect(() => {


    const fetchDataAndChart = async () => {
      const data = await fetchData();
      setSensorData(data);
    };


    const interval = setInterval(fetchDataAndChart, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      {sensorData ? (
        <div>
          <p>Temperatura: {sensorData.temperature.toFixed(2)} °C</p>
          <p>Umidade: {sensorData.humidity.toFixed(2)} %</p>
        </div>
      ) : (
        <p>Carregando dados...</p>
      )}


    

    </div>
  );
};


export default GraficoSensor;
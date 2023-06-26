import React, { useEffect, useState } from 'react';
import { ChartData } from 'chart.js';
import axios from 'axios';
import { BASE_URL } from 'utils/requests';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineController, LineElement, ArcElement,Legend, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineController, LineElement, Legend, Tooltip);



const LineChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });

  const fetchData = async () => {
    try {
      const apiUrl: string = BASE_URL + '/dadosgrafico'; 
      const response = await axios.get(apiUrl);
      const { temperatura, umidade } = response.data;

      // Crie um novo objeto de dados para o gráfico
      const newChartData: ChartData = {
        labels: temperatura.map((data: number, index: number) => `Leitura ${index + 1}`),
        datasets: [
          {
            label: 'Temperatura',
            data: temperatura,
            borderColor: 'red',
            fill: false,
          },
          {
            label: 'Umidade',
            data: umidade,
            borderColor: 'blue',
            fill: false,
          },
        ],
      };

      setChartData(newChartData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Busque os dados imediatamente ao montar o componente
    fetchData();

    // Execute a função fetchData a cada 1 minuto (60.000 milissegundos)
    const interval = setInterval(fetchData, 6000);

    // Limpe o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, []);

  return <Chart type={'line'} data={chartData} />;
};

export default LineChart;

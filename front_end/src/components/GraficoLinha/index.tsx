import React, { useEffect, useState } from 'react';
import  { ChartData, ChartOptions } from 'chart.js';
import axios from 'axios';
import { BASE_URL } from 'utils/requests';
import { Chart } from "react-chartjs-2";

interface LineChartProps {
  apiUrl: string;
}

const LineChart: React.FC<LineChartProps> = ({ apiUrl= BASE_URL+'/dadosgrafico' }) => {
  const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const { temperatura, umidade } = response.data;
        console.log(response.data)
        console.log(temperatura);
        console.log(umidade);

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

    fetchData();
  }, []);

  // useEffect(() => {
  //   // Renderize o gráfico quando os dados forem atualizados
  //   const ctx = document.getElementById('lineChart') as HTMLCanvasElement;

  //   new Chart(ctx, {
  //     type: 'line',
  //     data: chartData,
  //     options: {} // Adicione as opções do gráfico aqui, se necessário
  //   });
  // }, [chartData]);

  return <Chart type={'line'} data={chartData} />
  // return <canvas id="lineChart" />;
};

export default LineChart;

import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import './styles.css'

export function getData(umidade: number) {
  return [
    ["Label", "Value"],
    ["Umidade", umidade],
  ];
}

export const options = {
//   width: 100, height: 120,
  yellowColor: '#0000FF',
  redFrom: 0,
  redTo: 50,
  yellowFrom: 60,
  yellowTo: 100,
  greenFrom: 50,
  greenTo: 60,
  minorTicks: 10,
  min: 0,
  max: 100
};

interface GraficoUmidadeProps {
  umidade: number;
}

const GraficoUmidade: React.FC<GraficoUmidadeProps> = ({ umidade }) => {
  const [data, setData] = useState(getData(umidade));

  useEffect(() => {
    setData(getData(umidade));
  }, [umidade]);

  return (
    <Chart
      chartType="Gauge"
    //   width="100%"
    //   height="400px"
      data={data}
      options={options}
      className="tabela"
    />
  );
};

export default GraficoUmidade;

import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export function getData(temperatura: number) {
  return [
    ["Label", "Value"],
    ["Temperatura", temperatura],
  ];
}

export const options = {
  // width: 100, height: 120,
  yellowColor: '#0000FF',
  redFrom: 26,
  redTo: 60,
  yellowFrom: -10,
  yellowTo: 20,
  greenFrom: 20,
  greenTo: 26,
  minorTicks: 10,
  min: -10,
  max: 60
};

interface GraficoTemperaturaProps {
  temperatura: number;
}

const GraficoTemperatura: React.FC<GraficoTemperaturaProps> = ({ temperatura }) => {
  const [data, setData] = useState(getData(temperatura));

  useEffect(() => {
    setData(getData(temperatura));
  }, [temperatura]);

  return (
    <Chart
      chartType="Gauge"
      // width="100%"
      // height="400px"
      data={data}
      options={options}
    />
  );
};

export default GraficoTemperatura;

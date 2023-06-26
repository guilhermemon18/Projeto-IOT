import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

function getRandomNumber() {
  return Math.random() * 100;
}

export function getData() {
  return [
    ["Label", "Value"],
    ["Temperatura", getRandomNumber()],
  ];
}

export const options = {
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

export default function GraficoTemperatura() {
  const [data, setData] = useState(getData);

  useEffect(() => {
    const id = setInterval(() => {
      setData(getData());
    }, 3000);

    return () => {
      clearInterval(id);
    };
  });

  return (
    <Chart
      chartType="Gauge"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}

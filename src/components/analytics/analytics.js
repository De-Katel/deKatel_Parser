import React from "react";
import { useSelector } from "react-redux";

import 'chart.js/auto';

import './analytics.css'

import CategoriesChart from "../charts/chart";

import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";

const LocalityChart = () => {

  Chart.defaults.plugins.legend.display = true;

  const searchData = useSelector(state => state.datas.searchData);


  let result = {};
  let newArr = searchData.map(item => {
    const { Locality } = item;
    return Locality
  })

  for (let i = 0; i < newArr.length; ++i) {
    let a = newArr[i];
    if (result[a] != undefined)
      ++result[a];
    else
      result[a] = 1;
  }


  const doughnutLabel = [];
  const doughnutData = [];
  for (let key in result) {
    doughnutLabel.push(key);
    doughnutData.push(result[key])
  }

  const colorArr = [
    'rgba(0, 0, 255, 0.5)',
    'rgba(0, 0, 255, 0.55)',
    'rgba(0, 0, 255, 0.6)',
    'rgba(0, 0, 255, 0.65)',
    'rgba(0, 0, 255, 0.7)',
    'rgba(0, 0, 255, 0.75)',
    'rgba(0, 0, 255, 0.8)',
    'rgba(0, 0, 255, 0.85)',
    'rgba(0, 0, 255, 0.9)',
    'rgba(0, 0, 255, 1)'
  ]

  const doughnutChartData = {
    labels: doughnutLabel.length > 10 ? doughnutLabel.slice(0, 10) : doughnutLabel,
    indexAxis: "y",
    datasets: [
      {
        data: doughnutData.length > 10 ? doughnutData.slice(0, 10) : doughnutData,
        indexAxis: "y",
        label: 'Компаний в результатах поиска',
        borderColor: "#ffffff",
        backgroundColor: colorArr.slice(0, doughnutLabel.length),
        fill: true
      }
    ]
  };
  const doughnutChart = (
    <Doughnut
      width={1}
      height={1}
      options={{
        title: {
          display: false
        },
        legend: {
          display: true,
          position: 'left'
        }
      }}
      data={doughnutChartData}
    />
  );
  return doughnutChart;
};


const Analytics = () => {
  return (
    < div className="analytics">
      <div className="chartWrap">
        <CategoriesChart />
      </div>
      <div className="chartWrap">
        <LocalityChart />
      </div>
    </div>)
}

export default Analytics
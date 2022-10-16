import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";

import 'chart.js/auto';

import './analytics.css'

import CategoriesChart from "../charts/chart";

export const colorArr = [
  'rgba(20,83,116, 1)',
  'rgba(20,83,116, 0.9)',
  'rgba(20,83,116, 0.8)',
  'rgba(20,83,116, 0.7)',
  'rgba(20,83,116, 0.6)',
  'rgba(20,83,116, 0.5)',
  'rgba(20,83,116, 0.4)',
  'rgba(20,83,116, 0.3)',
  'rgba(20,83,116, 0.2)',
  'rgba(20,83,116, 0.1)'
]

const LocalityChart = () => {

   Chart.defaults.plugins.legend.position= 'top';

  const searchData = useSelector(state => state.datas.searchData);


  let result = {};
  let newArr = searchData.map(item => {
    const { Locality } = item;
    return Locality
  })
  
  for (let i = 0; i < newArr.length; ++i) {
    let a = newArr[i];
    if (result[a] !== undefined)
      ++result[a];
    else
      result[a] = 1;
  }
  console.log(result)

  const doughnutLabel = [];
  const doughnutData = [];
  
  for (let key in result) {
    doughnutLabel.push(key);
    doughnutData.push(result[key])
  }

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
      width={100}
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

// const LocalityChart = () => {

//   const searchData = useSelector(state => state.datas.searchData);
//   let result = {};

//   let newArr = searchData.map(item => {
//     const { Locality } = item;
//     return Locality
//   })

//   for (let i = 0; i < newArr.length; ++i) {
//     let a = newArr[i];
//     if (result[a] != undefined)
//       ++result[a];
//     else
//       result[a] = 1;
//   }


//   const doughnutLabel = [];
//   const doughnutData = [];
//   for (let key in result) {
//     doughnutLabel.push(key);
//     doughnutData.push(result[key])
//   }

//   const doughnutChartData = {
//     labels: doughnutLabel.length > 10 ? doughnutLabel.slice(0, 10) : doughnutLabel,
//     indexAxis: "y",
//     datasets: [
//       {
//         data: doughnutData.length > 10 ? doughnutData.slice(0, 10) : doughnutData,
//         indexAxis: "y",
//         label: 'Компаний в результатах поиска',
//         borderColor: "#ffffff",
//         backgroundColor: colorArr.slice(0, doughnutLabel.length),
//         fill: true
//       }
//     ]
//   };
//   const doughnutChart = (
//     <Plot

//       data={[
//         {
//           texttemplate: 'label',
//           labels: doughnutLabel.length > 10 ? doughnutLabel.slice(0, 10) : doughnutLabel,
//           values: doughnutData.length > 10 ? doughnutData.slice(0, 10) : doughnutData,
//           marker: {
//             color: 'rgba(20,83,116, 0.9)'
//           },
//           type: 'pie',
//           text: doughnutLabel.length > 10 ? doughnutLabel.slice(0, 10) : doughnutLabel
//         }
//       ]}
//       layout={{
//         margin: {
//           b: 30,
//           l: 0,
//           r: 0,
//           t: 30,
//         },
//         indexAxis: "y",
//         width: 550,
//         height: 500,
//         showTitle: false,
//         showlegend: false,
//         xaxis: {
//           dtick: 1
//         },
//         yaxis: {
//           categoryorder: 'total ascending',
//           visible: false
//         },
//         bargap: 0.05
//       }}

//       config={{
//         displayModeBar: false,

//       }}
//     />
//   );
//   return doughnutChart;
// };


const Analytics = () => {

  const navigate = useNavigate();

  const searchData = useSelector(state => state.datas.searchData);

  useEffect(() => {
    if (!searchData.length) { navigate('/favorites') }
  })

  return (
    < div className="analytics">
      <div className="chartWrap">
        <CategoriesChart />
      </div>
      <div className="chartWrap locality">
        <LocalityChart />
      </div>
    </div>
  )
}

export default Analytics
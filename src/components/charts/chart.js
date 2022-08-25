import React from "react";

import { useSelector } from "react-redux";

import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

import { colorArr } from "../analytics/analytics";

const CategoriesChart = () => {

    // Chart.defaults.plugins.legend.display = false;
    Chart.defaults.plugins.legend.position = 'right';

    const searchData = useSelector(state => state.datas.searchData);

    let newArr = [];
    let result = {};
    searchData.map(item => {
        const { Categories } = item;
        return Categories.forEach(element => {
            newArr = newArr.concat(element)
        });
    })

    for (let i = 0; i < newArr.length; ++i) {
        let a = newArr[i];
        if (result[a] != undefined)
            ++result[a];
        else
            result[a] = 1;
    }


    const barLabel = [];
    const barData = [];
    for (let key in result) {
        barLabel.push(key);
        barData.push(result[key])
    }

    const barChartData = {
        labels: barLabel.length > 10 ? barLabel.slice(0, 10) : barLabel,
        indexAxis: "y",
        datasets: [
            {
                data: barData.length > 10 ? barData.slice(0, 10) : barData,
                indexAxis: "y",
                label: 'Компаний в результатах поиска',
                borderColor: "#3333ff",
                backgroundColor: colorArr,
                fill: true
            }
        ]
    };

    const barChart = (
        <Bar
            width={1}
            height={1}
            options={{
                title: {
                    display: false
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            }}
            data={barChartData}
        />
    );
    return barChart;
};

export default CategoriesChart
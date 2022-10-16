import React from "react";

import { useSelector } from "react-redux";
import Plot from 'react-plotly.js';

import { colorArr } from "../analytics/analytics";

const CategoriesChart = () => {

    const searchData = useSelector(state => state.datas.searchData);

    let newArrBar = [];
    let resultBar = {};
    searchData.map(item => {
        const { Categories } = item;
        return Categories.forEach(element => {
            newArrBar = newArrBar.concat(element)
        });
    })

    for (let i = 0; i < newArrBar.length; ++i) {
        let a = newArrBar[i];
        if (resultBar[a] != undefined)
            ++resultBar[a];
        else
            resultBar[a] = 1;
    }


    const barLabel = [];
    const barData = [];
    for (let key in resultBar) {
        barLabel.push(key);
        barData.push(resultBar[key])
    }

    const barChart = (
        <Plot

            data={[
                {
                    y: barLabel.length > 10 ? barLabel.slice(0, 10) : barLabel,
                    x: barData.length > 10 ? barData.slice(0, 10) : barData,
                    marker: {
                        color: 'rgba(20,83,116, 0.9)'
                    },
                    type: 'bar',
                    orientation: 'h',
                    text: barLabel.length > 10 ? barLabel.slice(0, 10) : barLabel,

                }
            ]}
            layout={{
                margin: {
                    b: 30,
                    l: 0,
                    r: 0,
                    t: 30,
                },
                indexAxis: "y",
                width:550,
                height: 450,
                showTitle: false,
                showlegend: false,
                xaxis: {
                    dtick: 1
                },
                yaxis: {
                    categoryorder: 'total ascending',
                    visible: false
                },
                bargap: 0.05
            }}

            config={{
                displayModeBar: false,

            }}
        />
    );
    return barChart;
};

export default CategoriesChart
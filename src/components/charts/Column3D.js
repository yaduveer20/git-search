
import React from "react";
// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.gammel";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);


const Column3D = ({chartData: data})=>{
    // console.log('inside', chartData)

    const chartConfigs = {
        type: "column3d", // The chart type
        width: "100%", // Width of the chart
        height: "400", // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
          // Chart Configuration
          chart: {
            caption: "Most Starred Repos",
            yAxisName: 'Stars',
            xAxisName: 'Repos',
            decimals: 0,
            theme: "gammel",
            showLegend: 0,
            paletteColors: '#65CCB8,#4056A1,#14A46C,#FCCD04,#3FEEE6,#5CDB95,#2E9CCA',
          },
          // Chart Data
          data
        }
      };

    return <ReactFC {...chartConfigs} />
}


export default Column3D;
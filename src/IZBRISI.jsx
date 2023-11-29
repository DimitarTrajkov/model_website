import CanvasJSReact from "@canvasjs/react-charts";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ChartContainer = ({ metric, models }) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
console.log(models[1])
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Create an array to store the fetched data for each model
        const modelDataArray = [];

        // Iterate over the models array and fetch data for each model
        for (const model of models) {
          const response = await axios.get(
            `/dataset${id}/${model.description}_lite.json`
          );
          modelDataArray.push(response.data);
        }

        // Set the state with the array of fetched data for all models
        setData(modelDataArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [models, metric]);

  if (!data) {
    return <div>Loading...</div>;
  }
  //console.log(data.outer_loop.map((item) => item.train[metric.description]));

  const train_data = data.outer_loop.map(
    (item) => item.train[metric.description]
  );
  const test_data = data.outer_loop.map(
    (item) => item.test[metric.description]
  );

  const transformedData = (data) => {
    return data.map((value, index) => ({
      y: value,
      label: index + 1,
    }));
  };

  const options = {
    animationEnabled: true,
    title: {
      text: "graph",
    },
    axisY: {
      title: metric.name,
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "line",
        name: "total train data",
        showInLegend: true,
        dataPoints: transformedData(train_data),
      },
      {
        type: "line",
        name: "total test data",
        showInLegend: true,
        dataPoints: transformedData(test_data),
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default ChartContainer;


const transformedData = (data) => {
  return data.map((value, index) => ({
    y: value,
    label: index + 1,
  }));
};

const dataSets = [];
for (let i = 0; i < models.length; i++) {
  const dataSet = {
    type: "line",
    name: models[i].name,
    showInLegend: true,
    dataPoints: transformedData(
      data[i].outer_loop.map((item) => item.train[metric.description])
    ),
  };
  dataSets.push(dataSet);
}



/// od kaj graph
<ChartContainer
metric={metricOptions.find((option) => option.description === metric)}
models={modelOptions.find((option) => option.description === model)}
/>
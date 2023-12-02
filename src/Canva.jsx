import CanvasJSReact from "@canvasjs/react-charts";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ChartContainer = ({ num, metrics, models, oneMetric }) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  if (!models) {
    models = {
      id: 1,
      name: "Ada boost regression",
      description: "ada_reg",
    };
  }
  if (!metrics) {
    metrics = {
      id: 1,
      name: "Mean Absolute Error",
      description: "Mean_Absolute_Error",
    };
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const modelData = await Promise.all(
          models.map(async (model) => {
            const response = await axios.get(
              `/model_website/dataset${num}/${model.description}_lite.json`
            );
            return response.data;
          })
        );
        setData(modelData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [models, metrics, oneMetric, num]);
  console.log(metrics);

  const transformedData = (data) => {
    return data.map((value, index) => ({
      y: value,
      label: index + 1,
    }));
  };
  const dataSets = [];
  if (oneMetric) {
    for (let i = 0; i < models.length; i++) {
      if (data[i] !== undefined) {
        const dataSet = {
          type: "line",
          name: "train data, model: " + models[i].name,
          showInLegend: true,
          dataPoints: transformedData(
            data[i].outer_loop.map((item) => item.train[metrics[0].description])
          ),
        };
        dataSets.push(dataSet);
      }
    }
    for (let i = 0; i < models.length; i++) {
      if (data[i] !== undefined) {
        const dataSet = {
          type: "line",
          name: "test data, model: " + models[i].name,
          showInLegend: true,
          dataPoints: transformedData(
            data[i].outer_loop.map((item) => item.test[metrics[0].description])
          ),
        };
        dataSets.push(dataSet);
      }
    }
  } else {
    for (let i = 0; i < metrics.length; i++) {
      if (data[0] !== undefined) {
        const dataSet = {
          type: "line",
          name: "test data, metric: " + metrics[i].name,
          showInLegend: true,
          dataPoints: transformedData(
            data[0].outer_loop.map((item) => item.test[metrics[i].description])
          ),
        };
        dataSets.push(dataSet);
      }
    }

    for (let i = 0; i < metrics.length; i++) {
      if (data[0] !== undefined) {
        const dataSet = {
          type: "line",
          name: "train data, metric: " + metrics[i].name,
          showInLegend: true,
          dataPoints: transformedData(
            data[0].outer_loop.map((item) => item.train[metrics[i].description])
          ),
        };
        dataSets.push(dataSet);
      }
    }
  }
  if (!data) {
    return <div>Loading...</div>;
  }
  const color = "#fffddd";
  const graphTitle = oneMetric ? metrics[0].name : models[0].name;
  const options = {
    theme: "dark2",
    backgroundColor: "#000000",
    animationEnabled: true,
    title: {
      text: graphTitle,
      fontColor: color,
    },
    toolTip: {
      shared: true,
    },
    legend: {
      verticalAlign: "center",
      horizontalAlign: "right",
      fontColor: color,
    },
    data: dataSets,
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default ChartContainer;

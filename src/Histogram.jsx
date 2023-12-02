import React, { useState, useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { useParams } from "react-router-dom";
import axios from "axios";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const HistogramContainer = ({ num }) => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch model options
        const responce = await axios.get(
          `/model_website/dataset${num}/histograms/histogram.json`
        );
        setData(responce.data);
      } catch (error) {
        setData(null);
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [num]);
  if (!data) {
    return <div id="No data">No available data for this dataset</div>;
  }
  return (
    <div id="HistogramContainerTwo">
      {Object.keys(data).map((feature, index) => {
        const featureData = data[feature];
        const options = {
          theme: "dark2", // Set the theme to dark1
          backgroundColor: "#000000", // Set the background color to black
          colorSet: "white", // Set font color to white
          title: {
            text: featureData.label,
            fontColor: "white", // Set title font color to white
          },
          axisX: {
            title: "Bins",
            labelFontColor: "white", // Set X-axis label font color to white
            titleFontColor: "white", // Set X-axis title font color to white
          },
          axisY: {
            title: "Frequency",
            labelFontColor: "white", // Set Y-axis label font color to white
            titleFontColor: "white", // Set Y-axis title font color to white
          },
          data: [
            {
              type: "column",
              dataPoints: featureData.values.map((value, index) => ({
                x: (index + 1) * featureData.bins,
                y: value,
              })),
            },
          ],
        };

        return <CanvasJSChart key={index} options={options} />;
      })}
    </div>
  );
};

export default HistogramContainer;

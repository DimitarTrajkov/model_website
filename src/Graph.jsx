import React, { useEffect, useState, useRef  } from "react";
import Chart from "chart.js/auto";
import { useParams } from "react-router-dom";
//import "./Graph.css";

const Graph = () => {
  const { id } = useParams(); // Extracting the id from the route parameter
  const chartRef = useRef(null);

  const [data, setData] = useState([
    { id: 1, labels: [1, 2, 3, 4, 5, 6], data: [11, 20, 13, 14, 55, 76] },
    { id: 2, labels: [1, 2, 3, 4, 5, 6], data: [12, 20, 13, 14, 55, 76] },
    { id: 3, labels: [1, 2, 3, 4, 5, 6], data: [13, 20, 13, 14, 55, 76] },
    { id: 4, labels: [1, 2, 3, 4, 5, 6], data: [14, 20, 13, 14, 55, 76] },
    { id: 5, labels: [1, 2, 3, 4, 5, 6], data: [15, 20, 13, 14, 55, 76] },
  ]);
  useEffect(() => {
    if (data[parseInt(id) - 1]) {
      const ctx = document.getElementById("myChart").getContext("2d");
      // Destroy the previous chart instance if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      // Create a new Chart instance
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: data[parseInt(id) - 1].labels,
          datasets: [
            {
              label: "Data",
              data: data[parseInt(id) - 1].data,
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: "linear",
              position: "bottom",
            },
          },
        },
      });
    }
    // Clean up the chart when the component is unmounted
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, id]);

  return (
    <div>
      <canvas
        id="myChart"
        width="400"
        height="400"
        style={{ backgroundColor: "white" }}
      ></canvas>
    </div>
  );
};

export default Graph;

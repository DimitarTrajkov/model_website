import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ChartContainer from "./Canva";
import Switch from "@mui/material/Switch";

const GraphComponent = ({ num }) => {
  const [oneMetric, setOneMetric] = useState(true);
  const [metricOptions, setMetricOptions] = useState(null);
  const [modelOptions, setModelOptions] = useState([]);
  const [metricOptionsArray, setMetricOptionsArray] = useState([
    "Mean_Absolute_Error",
  ]);
  const [modelOptionsArray, setModelOptionsArray] = useState(["ada_reg"]);
  // useeffect to get all the models that are available
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch model options
        const modelResponse = await axios.get(
          `/model_website/dataset${num}/model_options.json`
        );
        setModelOptions(modelResponse.data);

        // Fetch metric options
        const metricResponse = await axios.get(
          `/model_website/dataset${num}/metric_options.json`
        );
        setMetricOptions(metricResponse.data);
      } catch (error) {
        setModelOptions(null);
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [num]);
  const handleSelectMetricChange = (event) => {
    const selectedValue = event.target.value;
    if (oneMetric) {
      setMetricOptionsArray(selectedValue);
    }
    if (!oneMetric) {
      setMetricOptionsArray((prevMetricOptionsArray) => {
        if (prevMetricOptionsArray.includes(selectedValue)) {
          // If the value is already in the array and there is more than one element,
          // remove it; otherwise, do nothing (prevent removal of the last element)
          if (prevMetricOptionsArray.length > 1) {
            return prevMetricOptionsArray.filter(
              (option) => option !== selectedValue
            );
          } else {
            return prevMetricOptionsArray;
          }
        } else {
          // If the value is not in the array, add it
          return [...prevMetricOptionsArray, selectedValue];
        }
      });
    }
  };

  const handleToggle = () => {
    if (oneMetric) setModelOptionsArray(["ada_reg"]);
    else setMetricOptionsArray(["Mean_Absolute_Error"]);
    setOneMetric(!oneMetric);
  };

  const handleMultipleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (!oneMetric) {
      setModelOptionsArray(selectedValue);
    }
    if (oneMetric) {
      setModelOptionsArray((prevmodelOptionsArray) => {
        if (prevmodelOptionsArray.includes(selectedValue)) {
          // If the value is already in the array and there is more than one element,
          // remove it; otherwise, do nothing (prevent removal of the last element)
          if (prevmodelOptionsArray.length > 1) {
            return prevmodelOptionsArray.filter(
              (option) => option !== selectedValue
            );
          } else {
            return prevmodelOptionsArray;
          }
        } else {
          // If the value is not in the array, add it
          return [...prevmodelOptionsArray, selectedValue];
        }
      });
    }
  };

  if (!metricOptions || !modelOptions) {
    return <div id="Nodata">No available data for this dataset</div>;
  }
  const models_or_metrics_in_use = oneMetric
    ? modelOptions
        .filter((option) => modelOptionsArray.includes(option.description))
        .map((option) => option.name)
        .join(", ")
    : metricOptions
        .filter((option) => metricOptionsArray.includes(option.description))
        .map((option) => option.name)
        .join(", ");
  return (
    <div id="GraphContainer1">
      <div>
        <div id="modeDiv">
          <h3>Select a mode:</h3>
          <Switch checked={oneMetric} onChange={handleToggle} />
          <p>{!oneMetric ? "comparing metrics" : "comparing models"}</p>
        </div>
      </div>
      <label htmlFor="selectOptionForModels">Select a model:</label>
      <select id="selectOptionForModels" onChange={handleMultipleSelectChange}>
        {/*<option value="">Select an option</option>*/}
        {modelOptions.map((item) => (
          <option
            key={item.id}
            value={item.description}
            style={{
              backgroundColor: modelOptionsArray.includes(item.description)
                ? "#444444"
                : "#222222",
            }}
          >
            {item.name}
          </option>
        ))}
      </select>

      <label htmlFor="selectOptionForMetric">Select a scoring metric:</label>
      <select id="selectOptionForMetric" onChange={handleSelectMetricChange}>
        {metricOptions.map((item) => (
          <option
            key={item.id}
            value={item.description}
            style={{
              backgroundColor: metricOptionsArray.includes(item.description)
                ? "#444444"
                : "#222222",
            }}
          >
            {item.name}
          </option>
        ))}
      </select>
      <p>
        Selected {oneMetric ? "models" : "metrics"}: {models_or_metrics_in_use}
      </p>

      <div id="Chart">
        <ChartContainer
          num={num}
          metrics={metricOptions.filter((option) =>
            metricOptionsArray.includes(option.description)
          )}
          models={modelOptions.filter((option) =>
            modelOptionsArray.includes(option.description)
          )}
          oneMetric={oneMetric}
        />
      </div>
    </div>
  );
};

export default GraphComponent;

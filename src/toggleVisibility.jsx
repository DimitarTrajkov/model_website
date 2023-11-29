import React, { useState } from "react";
import SideNavigation from "./SideNavigation";
import InfoComponent from "./InfoComponent";
import { useParams } from "react-router-dom";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "./Final.css";
import GraphComponent from "./Graph2";
import HistogramContainer from "./Histogram";

const ToggleVisibilityComponent = () => {
  const { id } = useParams(); // Extracting the id from the route parameter
  const [isVisible1, setIsVisible1] = useState(true);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);

  const toggleVisibility1 = () => {
    setIsVisible1(!isVisible1);
  };

  const toggleVisibility2 = () => {
    setIsVisible2(!isVisible2);
  };
  const toggleVisibility3 = () => {
    setIsVisible3(!isVisible3);
  };
  return (
    <div id="ToggleVisibility">
      <SideNavigation />
      <div id="LeftSide">
        <h1 id="Title">Dataset {id}</h1>
        {isVisible1 ? (
          <div id="InfoComponent">
            <InfoComponent />
            <button onClick={toggleVisibility1}>
              <ArrowUpwardIcon />
            </button>
          </div>
        ) : (
          <div className="onlyArrow">
            <h3 className="titleToggle">Basic info about dataset</h3>
            <button onClick={toggleVisibility1}>
              <ArrowDownwardIcon />
            </button>
          </div>
        )}
        {isVisible2 ? (
          <div id="GraphContainer">
            <GraphComponent />
            <button onClick={toggleVisibility2}>
              <ArrowUpwardIcon />
            </button>
          </div>
        ) : (
          <div className="onlyArrow">
            <h3 className="titleToggle">
              Chart about models trained on the dataset
            </h3>
            <button onClick={toggleVisibility2}>
              <ArrowDownwardIcon />
            </button>
          </div>
        )}
        {isVisible3 ? (
          <div id="HistogramContainer">
            <HistogramContainer />
            <div id="histButton">
            <button onClick={toggleVisibility3}>
              <ArrowUpwardIcon />
            </button>
            </div>
          </div>
        ) : (
          <div className="onlyArrow">
            <h3 className="titleToggle">
              Histograms for the numeric features of the dataset
            </h3>
            <button onClick={toggleVisibility3}>
              <ArrowDownwardIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToggleVisibilityComponent;

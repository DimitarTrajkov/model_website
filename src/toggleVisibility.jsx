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
  const [isVisible1, setIsVisible1] = useState(true);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const [idd, setIdd] = useState(2);
  const [nameOfDataset, setNameOfDataset] = useState(
    "Local Health Characteristics"
  );

  const toggleVisibility1 = () => {
    setIsVisible1(!isVisible1);
  };

  const toggleVisibility2 = () => {
    setIsVisible2(!isVisible2);
  };
  const toggleVisibility3 = () => {
    setIsVisible3(!isVisible3);
  };
  const naprajid = (num, name) => {
    setIdd(num);
    setNameOfDataset(name);
  };
  return (
    <div id="ToggleVisibility">
      <SideNavigation naprajid={naprajid} />
      <div id="LeftSide">
        <h1 id="Title">{nameOfDataset}</h1>
        {isVisible1 ? (
          <div id="InfoComponent">
            <InfoComponent num={idd} />
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
            <GraphComponent num={idd} />
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
            <HistogramContainer num={idd} />
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

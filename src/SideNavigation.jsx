import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SideNavigation = ({ naprajid }) => {
  // Fetch data based on id from your data source
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/model_website/data.json")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [id]);
  if (!data) {
    return <div>pomos side nav</div>;
  }
  return (
    <div id="SideBar">
      <h3 id="choose_dataset">CHOOSE A DATASET</h3>
      {data.map((item) => (
        <button
          className="navBarButton"
          key={item.id}
          onClick={() => naprajid(item.id, item.name)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default SideNavigation;

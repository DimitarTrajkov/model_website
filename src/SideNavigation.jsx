import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const SideNavigation = () => {
  // Fetch data based on id from your data source
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [id]);
  if (!data) {
    return <div>pomos side nav</div>;
  }
  return (
    <div id="SideBar">
      <h3>Choose a dataset</h3>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <Link to={`/dataset/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNavigation;

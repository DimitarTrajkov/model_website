import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const InfoComponent = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  // useeffect to get all the models that are available
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch model options
        const response = await axios.get(`/dataset${id}/model_info.json`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [id]);
  if (!data) {
    return <div>No available data</div>;
  }
  return (
    <div id="InfoContainer1">
      <h3>Name:</h3>
      <a href={data.link}>{data.name}</a>
      <h3>Description:</h3>
      <p>{data.description}</p>
      <h3>Type:</h3>
      <p id="specificP">{data.dataset_type}</p>
      <h3>Creator:</h3>
      <a href={data.creator[0].url}>{data.creator[0].name}</a>
      <h3>Publisher:</h3>
      <a href={data.publisher[0].url}>{data.publisher[0].name}</a>
      <h3>Licence:</h3>
      <p>{data.license}</p>
    </div>
  );
};

export default InfoComponent;

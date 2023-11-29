// PRVITE DVA SE U GRAPH I SE ZA MODEL I METRIC
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`/dataset${id}/model_options.json`);
      setModelOptions(response.data);
    } catch (error) {
      console.error("Error fetching options for model", error);
    }
  };
  fetchData();
}, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`/dataset${id}/metric_options.json`);
      setMetricOptions(response.data);
    } catch (error) {
      console.error("Error fetching options for model", error);
    }
  };
  fetchData();
}, []);

//  TAJ SE NAVAGA U CANVA I E ZA DATA

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/dataset${id}/${models.description}_lite.json`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
}, [models, metric]);




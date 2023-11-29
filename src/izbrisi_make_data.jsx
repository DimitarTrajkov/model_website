const dataSets = [];
for (let i = 0; i < model.length; i++) {
  const dataSet = {
    type: "line",
    name: model[i],
    showInLegend: true,
    dataPoints: transformedData(data[i].outer_loop.map((item) => item.train[metric.description])),
  };
  dataSets.push(dataSet);
}



useEffect(() => {
    const fetchData = async () => {
      try {
        const modelData = await Promise.all(
          models.map(async (model) => {
            const response = await axios.get(`/dataset${id}/${model.description}_lite.json`);
            return response.data;
          })
        );
        setData(modelData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [models, id]);
  



  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!models || models.length === 0) {
          console.error("No models found.");
          return;
        }
        
        const modelData = await Promise.all(
          models.map(async (model) => {
            const response = await axios.get(`/dataset${id}/${model.description}_lite.json`);
            return response.data;
          })
        );
        setData(modelData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [models, id]);






  useEffect(() => {
    const fetchData = async () => {
      try {
        // Create an array to store the fetched data for each model
        const modelDataArray = [];

        // Iterate over the models array and fetch data for each model
        for (const model of models) {
          const response = await axios.get(
            `/dataset${id}/${model.description}_lite.json`
          );
          modelDataArray.push(response.data);
        }

        // Set the state with the array of fetched data for all models
        setData(modelDataArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [models, metric, id]);
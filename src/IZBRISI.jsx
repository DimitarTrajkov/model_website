import React, { useState } from 'react';

const YourComponent = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const modelOptions = [
    // Your model options data
  ];

  const handleMultipleSelectChange = (event) => {
    const selectedValue = event.target.value;

    // Check if the selected value is already in the array
    if (selectedOptions.includes(selectedValue)) {
      // If yes, remove it
      setSelectedOptions(selectedOptions.filter((option) => option !== selectedValue));
    } else {
      // If no, add it to the array
      setSelectedOptions([...selectedOptions, selectedValue]);
    }
  };

  return (
    <select id="selectOptionForModels" onChange={handleMultipleSelectChange}>
      {modelOptions.map((item) => (
        <option
          key={item.id}
          value={item.description}
          style={{ backgroundColor: selectedOptions.includes(item.description) ? 'yellow' : 'white' }}
        >
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default YourComponent;

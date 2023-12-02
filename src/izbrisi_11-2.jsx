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



<select id="selectOptionForModels" onChange={handleMultipleSelectChange}>
{/*<option value="">Select an option</option>*/}
{modelOptions.map((item) => (
  <option key={item.id} value={item.description}>
    {item.name}
  </option>
))}
</select>

import React from "react";
import { useStore } from "./../store/store";

const CalculatorForm = () => {
  const { searchTerm, searchResults, setSearchTerm, selectItem } = useStore();

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const handleSelect = (item) => {
    selectItem(item);
  };

  const filteredResults = searchResults.filter((item) =>
    item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Введите name"
        value={searchTerm}
        onChange={handleSearch}
      />
      {searchTerm && filteredResults.length > 0 && (
        <ul>
          {filteredResults.map((item) => (
            <li key={item.id} onClick={() => handleSelect(item)}>
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CalculatorForm;

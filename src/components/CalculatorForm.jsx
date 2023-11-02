import React from "react";
import { useStore } from "./store";

const CalculatorForm = () => {
  const {
    searchTerm,
    searchResults,
    setSearchTerm,
    selectedItems,
    selectItem,
    clearItem,
  } = useStore();

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const handleSelect = (item) => {
    selectItem(item);
  };

  const handleClear = (item) => {
    clearItem(item);
  };

  const filteredResults = searchResults.filter((item) => {
    const itemName = item.name.toLowerCase();
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return itemName.startsWith(lowerCaseSearchTerm);
  });

  return (
    <div>
      <div className="input-container">
        {selectedItems.map((item) => (
          <div key={item.id} className="selected-item">
            {item.name}
            <span className="clear-button" onClick={() => handleClear(item)}>
              X
            </span>
          </div>
        ))}
        <input
          type="text"
          placeholder="Введите name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
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

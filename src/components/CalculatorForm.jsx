import React, { useEffect, useState } from "react";
import { useStore } from "./../store/store";
import { calculateExpression } from "./../setting/exps";
import "./styles.css";

const CalculatorForm = () => {
  const {
    searchTerm,
    searchResults,
    setSearchTerm,
    selectedItems,
    selectItem,
    clearItem,
  } = useStore();

  const [result, setResult] = useState(0);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const handleSelect = (item) => {
    selectItem(item);
    setSearchTerm("");
  };

  const handleClear = (item) => {
    clearItem(item);
  };

  const filteredResults = searchResults.filter((item) => {
    const itemName = item.name.toLowerCase();
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return itemName.startsWith(lowerCaseSearchTerm);
  });

  const handlekeyDown = (event) => {
    if (event.key === "Enter") {
      if (filteredResults.length > 0) {
        selectItem(filteredResults[0]);
      } else {
        const searchTerm = event.target.value;
        selectItem({
          name: searchTerm,
          id: `${searchTerm}${Date.now()}`,
          value: searchTerm,
        });
      }
      setSearchTerm("");
    }
  };
  useEffect(() => {
    calculateResult();
  }, [selectedItems]);

  const calculateResult = () => {
    const values = selectedItems.map((item) => item.value);

    if (values.length === 0) {
      setResult(0);
      return;
    }

    const result = calculateExpression(values.join());

    setResult(result);
  };

  return (
    <div className="wrap">
      <div className="container">
        <div className="result">
          <p>{result ? result : "0"}</p>
        </div>
        <div className="input-container">
          <div className="items">
            {selectedItems.map((item) => (
              <div key={item.id} className="selected-item">
                {item.name}

                <span
                  className="clear-button"
                  onClick={() => handleClear(item)}
                >
                  X
                </span>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            onKeyDown={handlekeyDown}
          />
        </div>
      </div>
      {searchTerm && filteredResults.length > 0 && (
        <ul>
          {filteredResults.map((item) => (
            <li key={item.id} onClick={() => handleSelect(item)}>
              <p className="li-item">{item.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CalculatorForm;

import React from "react";

import { useStore } from "./components/store";
import CalculatorForm from "./components/CalculatorForm";

function App() {
  const { fetchData } = useStore();
  fetchData(); // Запустите получение данных при загрузке приложения

  return (
    <div className="App">
      <CalculatorForm />
    </div>
  );
}

export default App;

import React from "react";

import { useStore } from "./store/store";
import CalculatorForm from "./components/CalculatorForm";

function App() {
  const { fetchData } = useStore();
  fetchData();

  return (
    <div className="App">
      <CalculatorForm />
    </div>
  );
}

export default App;

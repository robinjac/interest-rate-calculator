import { type ChangeEventHandler, useState, createContext } from "react";

type RateInput = { amount: number; rate: number };

type State = {
  income: {
    fields: RateInput[];
    average?: number;
  };
  expense: {
    fields: RateInput[];
    average?: number;
  };
};

const state = createContext<State>({
  income: { fields: [] },
  expense: { fields: [] },
});

function NumberInput() {
  const [number, setNumber] = useState<number | undefined>();

  // Function to handle input change
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = Number(event.target.value);

    // Validate if the input is a number
    if (!isNaN(value)) {
      setNumber(value);
    }
  };

  return (
    <input
      type="text"
      value={number}
      onChange={handleChange}
    />
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Rate Gap Calculator</h1>
      <div>
        <div className="flex space-x-4"><h2>Rate expense</h2><button >add +</button></div>
        <NumberInput />

        <h2>Rate income</h2>
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import { Header, ListItem } from "./Components";
import { type State, init, calculateAverage } from "./utils";

const initalState = {
  income: { fields: [] },
  expense: { fields: [] },
};

const storageKey = "rate-gap-state";

const getStoredState = () => {
  const state = localStorage.getItem(storageKey);

  if (!state) return initalState;

  return JSON.parse(state);
};

function App() {
  const app = useState<State>(getStoredState());

  const [state] = app;

  const [add, remove, update] = init(app);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  return (
    <div className="max-w-2xl p-4 space-y-10">
      <h1 className="text-2xl">Rate Gap Calculator</h1>
      <div>
        <Header
          text={`Average Rate ${calculateAverage(state.expense.fields) ?? 0}`}
          action={{ label: "Add +", onClick: () => add("expense") }}
        />
        <div className="pt-10">
          {state.expense.fields.map(({ id, rateInput }) => (
            <ListItem
              value={rateInput}
              key={id}
              onRemove={() => remove("expense", id)}
              onChange={(input, value) => update("expense", id, input, value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

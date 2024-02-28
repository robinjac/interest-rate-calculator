import { useState, useEffect } from "react";
import { Header, ListItem } from "./Components";
import { type State, init, calculateAverage, calculateSum } from "./utils";

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

  const rate = calculateAverage(state.expense.fields);
  const credit = calculateSum(state.expense.fields);
  const cost = Math.round((credit * rate * 0.01) / 12);
  const amortization =
    (2099480 * 0.02 + 480834.42 * 0.05 + 313983.07 * 0.05) / 12;

  return (
    <div className="max-w-2xl p-4 space-y-10">
      <h1 className="text-2xl">Rate Gap Calculator</h1>
      <div>
        <Header
          text={`Loans`}
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
      <Header text="Summary" />
      <div>
        <div>Interest: {rate}%</div>
        <div>Credit: {Math.round(credit)}kr</div>
        <div>Cost per month: {cost}kr</div>
        <div>Amortization: {Math.round(amortization)}kr</div>
        <div>Total: {Math.round(amortization + cost)}kr</div>
      </div>
    </div>
  );
}

export default App;

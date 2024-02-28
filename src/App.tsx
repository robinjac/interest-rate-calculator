import { useState, useEffect } from "react";
import { Header, ListItem } from "./Components";
import {
  type State,
  init,
  calculateAverage,
  calculateCreditSum,
  calculateAmortization,
} from "./utils";

const initalState: State = {
  fields: [],
};

const storageKey = "rate-gap-state";

const getStoredState = () => {
  const state = localStorage.getItem(storageKey);

  if (!state) return initalState;

  return JSON.parse(state) as State;
};

function App() {
  const app = useState<State>(getStoredState());

  const [state] = app;

  const [add, remove, update] = init(app);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  const rate = calculateAverage(state.fields);
  const credit = calculateCreditSum(state.fields);
  const cost = (credit * rate * 0.01) / 12;
  const amortization = calculateAmortization(state.fields);

  return (
    <div className="max-w-2xl p-4 space-y-10">
      <h1 className="text-2xl">Rate Gap Calculator</h1>
      <div>
        <Header text="Credits" action={{ label: "Add +", onClick: add }} />
        <div className="pt-10">
          {state.fields.map(({ id, credit }) => (
            <ListItem
              value={credit}
              key={id}
              onRemove={() => remove(id)}
              onChange={(creditKey, value) => update(id, creditKey, value)}
            />
          ))}
        </div>
      </div>
      {state.fields.length > 0 && (
        <>
          <Header text="Summary" />
          <div>
            <div>Interest: {rate}%</div>
            <div>Total credit: {Math.round(credit)}kr</div>
            <div>Cost per month: {Math.round(cost)}kr</div>
            <div>Amortization per month: {Math.round(amortization)}kr</div>
            <div>Monthly installment: {Math.round(amortization + cost)}kr</div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

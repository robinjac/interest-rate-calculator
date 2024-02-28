import { useState, useEffect } from "react";
import { Header, SubHeader, ListItem } from "./Components";
import {
  type State,
  init,
  calculateAverage,
  calculateCreditSum,
  calculateAmortization,
} from "./utils";

const storageKey = "rate-gap-state";

const getStoredState = () => {
  const state = localStorage.getItem(storageKey);

  if (!state) return {};

  return JSON.parse(state) as State;
};

function App() {
  const app = useState<State>(getStoredState());

  const [state] = app;

  const [add, remove, update] = init(app);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  const entries = Object.entries(state);

  return (
    <div className="max-w-2xl p-4 space-y-10">
      <h1 className="text-2xl">Rate Gap Calculator</h1>
      <div className="space-y-10">
        <Header text="Credits" action={{ label: "Add", onClick: () => {} }} />

        <div className="relative p-1 pt-2 border border-slate-300 rounded rounded-tl-none">
          <button className="absolute bg-red-500 text-white text-xs -left-[1px] -top-[calc(1.5rem+1px)] px-3 h-6 rounded rounded-b-none inline-flex items-center justify-center">
            Remove
          </button>
          <SubHeader text="Group 1" action={{ label: "+", onClick: add }} />
          <div className="py-2">
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
      </div>
      {entries.length > 0 && (
        <>
          <Header text="Summary" />
          {entries.map(([name, fields]) => {
            const rate = calculateAverage(fields);
            const credit = calculateCreditSum(fields);
            const cost = (credit * rate * 0.01) / 12;
            const amortization = calculateAmortization(fields);

            return (
              <div>
                <div className="text-md">{name}</div>
                <div>Interest: {rate}%</div>
                <div>Total credit: {Math.round(credit)} kr</div>
                <div>Cost per month: {Math.round(cost)} kr</div>
                <div>Amortization per month: {Math.round(amortization)} kr</div>
                <div>
                  Total installment: {Math.round(amortization + cost)} kr
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default App;

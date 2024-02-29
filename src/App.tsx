import { useState, useEffect, useMemo } from "react";
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

  const entries = useMemo(() => Object.entries(state), [state]);

  const [addCredit, addGroup, removeCredit, removeGroup, update] = useMemo(
    () => init(app),
    [state]
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  return (
    <div className="max-w-2xl p-4 space-y-10">
      <h1 className="text-2xl">Rate Gap Calculator</h1>
      <div className="space-y-10">
        <Header text="Credits" action={{ label: "Add Credit", onClick: addGroup }} />
        {entries.map(([groupName, fields]) => (
          <div
            key={groupName}
            className="relative p-1 pt-2 border border-slate-300 rounded rounded-tl-none"
          >
            <button
              onClick={() => removeGroup(groupName)}
              className="absolute bg-red-500 text-white text-xs -left-[1px] -top-[calc(1.5rem+1px)] px-3 h-6 rounded rounded-b-none inline-flex items-center justify-center"
            >
              Remove
            </button>
            <SubHeader
              text={groupName}
              action={{ label: "+", onClick: () => addCredit(groupName) }}
            />
            <div className="py-2">
              {fields.map(({ id, credit }) => (
                <ListItem
                  value={credit}
                  key={id}
                  onRemove={() => removeCredit(groupName, id)}
                  onChange={(creditKey, value) =>
                    update(groupName, id, creditKey, value)
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {entries.length > 0 && (
        <div className="grid gap-6 grid-flow-col auto-cols-max">
          <div>
            <div className="text-lg pb-2 pl-1">Comparison</div>
            <div className="pr-4 border-r border-slate-300">Interest</div>
            <div className="pr-4 border-r border-slate-300">Total credit</div>
            <div className="pr-4 border-r border-slate-300">Cost per month</div>
            <div className="pr-4 border-r border-slate-300">Amortization</div>
            <div className="pr-4 border-r border-slate-300">Installment</div>
          </div>

          {entries.map(([groupName, fields]) => {
            const credit = calculateCreditSum(fields);
            const rate = calculateAverage(credit, fields);
            const cost = (credit * rate * 0.01) / 12;
            const amortization = calculateAmortization(fields);

            return (
              <div className="text-right" key={groupName}>
                <div className="text-lg pb-2 italic">{groupName}</div>
                <div>{rate} %</div>
                <div>{Math.round(credit)} kr</div>
                <div>{Math.round(cost)} kr</div>
                <div>{Math.round(amortization)} kr</div>
                <div>{Math.round(amortization + cost)} kr</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;

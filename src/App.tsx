import { useState, useMemo } from "react";
import { Header, ListItem, type RateInput, type Input } from "./Components";

type UUID = `${string}-${string}-${string}-${string}-${string}`;

type FieldItem = { rateInput: RateInput; id: UUID };
type State = {
  income: {
    fields: FieldItem[];
    average?: number;
  };
  expense: {
    fields: FieldItem[];
    average?: number;
  };
};
type Category = keyof State;

const calculateAverage = (input: FieldItem[]) => {
  const sum = input
    .map(({ rateInput }) => rateInput.amount)
    .reduce((sum_, val) => sum_ + val);

  const weightedSum = input
    .map(({ rateInput }) =>
      rateInput.amount > 0 ? (rateInput.rate * rateInput.amount) / sum : 0
    )
    .reduce((avgRate, rate) => avgRate + rate, 0);

  // Round to one decimal place
  return Number(weightedSum.toFixed(1));
};

const initPatchFields =
  (state: State) =>
  (to: Category, updater: (fields: FieldItem[]) => FieldItem[]) => ({
    ...state,
    [to]: {
      ...state[to],
      fields: updater(state[to].fields),
    },
  });

function App() {
  const [state, setState] = useState<State>({
    income: { fields: [] },
    expense: { fields: [] },
  });

  const patchFields = useMemo(() => initPatchFields(state), [state]);

  const add = (to: Category) => {
    const item: FieldItem = {
      rateInput: { amount: 0, rate: 0 },
      id: crypto.randomUUID(),
    };

    setState(patchFields(to, (fields) => [...fields, item]));
  };

  const remove = (from: Category, id: UUID) =>
    setState(
      patchFields(from, (fields) => fields.filter((item) => item.id !== id))
    );

  const update = (to: Category, id: UUID, input: Input, value: number) =>
    setState(
      patchFields(to, (fields) =>
        fields.map((item) =>
          item.id === id ? ((item.rateInput[input] = value), item) : item
        )
      )
    );

  return (
    <div className="max-w-2xl p-4 space-y-10">
      <h1 className="text-2xl">Rate Gap Calculator</h1>
      <div>
        <Header
          text={`Average Rate ${calculateAverage(state.expense.fields) ?? 0}`}
          action={{ label: "Add +", onClick: () => add("expense") }}
        />
        <div className="pt-10">
          {state.expense.fields.map(({ id }) => (
            <ListItem
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

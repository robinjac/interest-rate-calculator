import { type ChangeEventHandler, useState } from "react";

type UUID = `${string}-${string}-${string}-${string}-${string}`;
type RateInput = { amount: number; rate: number };
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
type Input = keyof RateInput;

function NumberInput({
  onChange,
  unit,
}: {
  onChange: (value: number) => void;
  unit: string;
}) {
  const [input, setInput] = useState<string>("");

  // Function to handle input change
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    const number = parseFloat(value);

    // Validate if the input is a number
    if (!isNaN(number)) {
      setInput(value);
      onChange(number);
    } else {
      setInput("");
    }
  };

  return (
    <div className="inline-flex border-solid border border-slate-600 rounded">
      <input
        className="flex border-none rounded outline-none pl-1"
        type="text"
        value={input}
        onChange={handleChange}
      />
      <span className="px-2 bg-slate-600 text-white">{unit}</span>
    </div>
  );
}

const Header = ({
  text,
  action,
}: {
  text: string;
  action: { label: string; onClick: () => void };
}) => (
  <div className="flex border-b py-2 px-1 border-slate-600 justify-between">
    <h2 className="text-xl">{text}</h2>
    <button
      onClick={action.onClick}
      className="bg-slate-600 text-white px-2 py-1 text-sm border rounded"
    >
      {action.label}
    </button>
  </div>
);

const ListItem = ({
  onRemove,
  onChange,
}: {
  onRemove: () => void;
  onChange: (input: Input, value: number) => void;
}) => (
  <div className="flex pb-5 px-1 justify-between">
    <div className="space-x-2">
      <NumberInput onChange={(value) => onChange("amount", value)} unit="kr" />
      <NumberInput onChange={(value) => onChange("rate", value)} unit="%" />
    </div>
    <button
      onClick={onRemove}
      className="order-last bg-red-400 text-white px-3 text-lg rounded"
    >
      {"-"}
    </button>
  </div>
);

function App() {
  const [state, setState] = useState<State>({
    income: { fields: [] },
    expense: { fields: [] },
  });

  const patchFields = (
    to: Category,
    updater: (fields: FieldItem[]) => FieldItem[]
  ) => ({
    ...state,
    [to]: {
      ...state[to],
      fields: updater(state[to].fields),
    },
  });

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
          text="Rate expense"
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

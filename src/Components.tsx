import { type ChangeEventHandler, useState } from "react";

export type RateInput = { amount: number; rate: number };
export type Input = keyof RateInput;

export const NumberInput = ({
  value,
  onChange,
  unit,
}: {
  value: number;
  onChange: (value: number) => void;
  unit: string;
}) => {
  const [input, setInput] = useState<string>(String(value));

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
};

export const Header = ({
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

export const ListItem = ({
  value,
  onRemove,
  onChange,
}: {
  value: RateInput;
  onRemove: () => void;
  onChange: (input: Input, value: number) => void;
}) => (
  <div className="flex pb-5 px-1 justify-between">
    <div className="space-x-2">
      <NumberInput
        value={value.amount}
        onChange={(value) => onChange("amount", value)}
        unit="kr"
      />
      <NumberInput
        value={value.rate}
        onChange={(value) => onChange("rate", value)}
        unit="%"
      />
    </div>
    <button
      onClick={onRemove}
      className="order-last bg-red-400 text-white px-3 text-lg rounded"
    >
      {"-"}
    </button>
  </div>
);

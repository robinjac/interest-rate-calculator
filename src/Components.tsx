import { type ChangeEventHandler, useState } from "react";

export type Credit = { amount: number; rate: number; amortization: number };

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
    <div className="inline-flex w-fit border-solid border border-slate-600 rounded">
      <input
        className="w-full border-none rounded outline-none pl-1"
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
  action?: { label: string; onClick: () => void };
}) => (
  <div className="flex border-b py-2 px-1 border-slate-600 justify-between items-center">
    <h2 className="text-xl">{text}</h2>
    {action && (
      <button
        onClick={action.onClick}
        className="bg-slate-600 text-white px-2 py-1 text-sm border rounded"
      >
        {action.label}
      </button>
    )}
  </div>
);

export const SubHeader = ({
    text,
    action,
  }: {
    text: string;
    action?: { label: string; onClick: () => void };
  }) => (
    <div className="flex px-1 justify-between items-center">
      <h3 className="text-lg italic">{text}</h3>
      {action && (
        <button
          onClick={action.onClick}
          className="hover:bg-slate-500 text-slate-600 hover:text-white h-5 w-5 p-1 text-xl rounded inline-flex items-center justify-center"
        >
          {action.label}
        </button>
      )}
    </div>
  );
  

export const ListItem = ({
  value,
  onRemove,
  onChange,
}: {
  value: Credit;
  onRemove: () => void;
  onChange: (creditKey: keyof Credit, value: number) => void;
}) => (
  <div className="flex pb-5 px-1 justify-between items-center">
    <div className="grid grid-cols-3 gap-2 pr-6">
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
      <NumberInput
        value={value.amortization}
        onChange={(value) => onChange("amortization", value)}
        unit="%"
      />
    </div>
    <button
      onClick={onRemove}
      className="order-last bg-red-400 text-white w-6 h-5 text-lg rounded inline-flex items-center justify-center leading-none"
    >
      {"-"}
    </button>
  </div>
);

import type { Credit } from "./Components";
import type { Dispatch, SetStateAction } from "react";

type UUID = `${string}-${string}-${string}-${string}-${string}`;
type FieldItem = { credit: Credit; id: UUID };

export type State = {
  fields: FieldItem[];
  average?: number;
};

type Add = () => void;
type Remove = (id: UUID) => void;
type Update = (id: UUID, creditKey: keyof Credit, value: number) => void;

const sum = (a: number, b: number) => a + b;

export const calculateCreditSum = (input: FieldItem[]) =>
  input.map(({ credit }) => credit.amount).reduce(sum, 0);

export const calculateAverage = (input: FieldItem[]) => {
  const creditSum = calculateCreditSum(input);

  const weightedSum = input
    .map(({ credit }) =>
      credit.amount > 0 ? (credit.rate * credit.amount) / creditSum : 0
    )
    .reduce(sum, 0);

  // Round to one decimal place
  return Number(weightedSum.toFixed(1));
};

export const calculateAmortization = (input: FieldItem[]) => {
  return (
    input
      .map(({ credit }) => credit.amortization * 0.01 * credit.amount)
      .reduce(sum, 0) / 12
  );
};

export const init = ([state, setState]: [
  State,
  Dispatch<SetStateAction<State>>
]): [Add, Remove, Update] => {
  const patchFields = (updater: (fields: FieldItem[]) => FieldItem[]) => ({
    ...state,
    fields: updater(state.fields),
  });

  const add = () => {
    const item: FieldItem = {
      credit: { amount: 0, rate: 0, amortization: 0 },
      id: crypto.randomUUID(),
    };

    setState(patchFields((fields) => [...fields, item]));
  };

  const remove = (id: UUID) =>
    setState(patchFields((fields) => fields.filter((item) => item.id !== id)));

  const update = (id: UUID, creditKey: keyof Credit, value: number) =>
    setState(
      patchFields((fields) =>
        fields.map((item) =>
          item.id === id ? ((item.credit[creditKey] = value), item) : item
        )
      )
    );

  return [add, remove, update];
};

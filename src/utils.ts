import type { Credit } from "./Components";
import type { Dispatch, SetStateAction } from "react";

type UUID = `${string}-${string}-${string}-${string}-${string}`;
type FieldItem = { credit: Credit; id: UUID };

export type State = {
  [group: string]: FieldItem[];
};

type AddCredit = (group: string) => void;
type AddGroup = () => void;
type RemoveCredit = (group: string, id: UUID) => void;
type RemoveGroup = (group: string) => void;
type Update = (
  group: string,
  id: UUID,
  creditKey: keyof Credit,
  value: number
) => void;

const sum = (a: number, b: number) => a + b;

const createFieldItem = (): FieldItem => ({
  credit: { amount: 0, rate: 0, amortization: 0 },
  id: crypto.randomUUID(),
});

export const calculateCreditSum = (input: FieldItem[]) =>
  input.map(({ credit }) => credit.amount).reduce(sum, 0);

export const calculateAverage = (creditSum: number, input: FieldItem[]) => {
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
]): [AddCredit, AddGroup, RemoveCredit, RemoveGroup, Update] => {
  const patch = (
    group: string,
    updater: (fields: FieldItem[]) => FieldItem[]
  ) => ({
    ...state,
    [group]: updater(state[group]),
  });

  const addCredit = (group: string) => {
    setState(patch(group, (fields) => [...fields, createFieldItem()]));
  };

  const addGroup = () => {
    const numbers = Object.keys(state).map((name) =>
      Number(name.split(" ")[1])
    );

    setState({
      ...state,
      [`Credit ${numbers.length > 0 ? Math.max(...numbers) + 1 : 1}`]: [
        createFieldItem(),
      ],
    });
  };

  const removeCredit = (group: string, id: UUID) =>
    setState(patch(group, (fields) => fields.filter((item) => item.id !== id)));

  const removeGroup = (name: string) => {
    delete state[name];
    setState({ ...state });
  };

  const update = (
    group: string,
    id: UUID,
    creditKey: keyof Credit,
    value: number
  ) =>
    setState(
      patch(group, (fields) =>
        fields.map((item) =>
          item.id === id ? ((item.credit[creditKey] = value), item) : item
        )
      )
    );

  return [addCredit, addGroup, removeCredit, removeGroup, update];
};

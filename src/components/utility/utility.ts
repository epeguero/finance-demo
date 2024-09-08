import { Transaction } from "../../types/types";

export const intersperse = <T>(list: T[], elem: T) =>
  list.flatMap((e) => [elem, e]).slice(1);

type CategorizedTransactions = { [key: string]: Transaction[] };
export const transactionsByCategory = (
  transactions: Transaction[],
): CategorizedTransactions =>
  transactions.reduce<CategorizedTransactions>(
    (acc, t) => ({
      ...acc,
      [t.category]: [...(acc[t.category] ?? []), t],
    }),
    {},
  );

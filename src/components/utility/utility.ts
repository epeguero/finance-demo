import React from "react";
import { Budget, BudgetMeta, Transaction } from "../../types/types";

export function createBudget(b: BudgetMeta, remaining: number): Budget {
  return {
    ...b,
    remaining,
  };
}

type CategorizedTransactions = { [key: string]: Transaction[] };
export const transactionsByCategory = (
  transactions: Transaction[]
): CategorizedTransactions =>
  transactions.reduce<CategorizedTransactions>(
    (acc, t) => ({
      ...acc,
      [t.category]: [...(acc[t.category] ?? []), t],
    }),
    {}
  );

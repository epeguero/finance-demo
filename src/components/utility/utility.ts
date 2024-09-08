import React from "react";
import {
  Budget,
  BudgetMeta,
  CategorizedTransactions,
  Transaction,
} from "../../types/types";

export function createBudget(b: BudgetMeta, remaining: number): Budget {
  return {
    ...b,
    remaining,
  };
}

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

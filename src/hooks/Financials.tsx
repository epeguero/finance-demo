import React, { createContext, PropsWithChildren, useContext } from "react";
import {
  createBudget,
  transactionsByCategory,
} from "../components/utility/utility";
import { transactions } from "../test/data";
import {
  Pot,
  Budget,
  Transaction,
  BillsSummary,
  BudgetMeta,
  CategorizedTransactions,
  BudgetCategory,
} from "../types/types";

const pots: Pot[] = [
  { name: "Savings", theme: "darkgreen", size: 159 },
  { name: "Concert Ticket", theme: "dimgrey", size: 110 },
  { name: "Gift", theme: "paleturquoise", size: 40 },
  { name: "New Laptop", theme: "moccasin", size: 10 },
];

const budgetMetas: BudgetMeta[] = [
  { category: BudgetCategory.Entertainment, maximum: 4000, theme: "darkgreen" },
  { category: BudgetCategory.Bills, maximum: 5000, theme: "paleturquoise" },
  { category: BudgetCategory.DiningOut, maximum: 1000, theme: "moccasin" },
  { category: BudgetCategory.PersonalCare, maximum: 300, theme: "dimgrey" },
];

const billsSummary: BillsSummary = {
  Paid: 190,
  "Total Upcoming": 194.98,
  "Due Soon": 59.98,
};

type Financials = {
  pots: Pot[];
  budgets: Budget[];
  transactions: Transaction[];
  billsSummary: BillsSummary;
  categorizedTransactions: CategorizedTransactions;
};

const FinancialsContext = createContext<undefined | Financials>(undefined);

export const FinancialsProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const categorizedTransactions = transactionsByCategory(transactions);
  const budgetMaxes = budgetMetas.reduce<Record<string, number>>(
    (acc, b) => ({ ...acc, [b.category]: b.maximum }),
    {}
  );
  const remainingBudgets = budgetMetas.reduce<Record<string, number>>(
    (acc, b) => ({
      ...acc,
      [b.category]:
        (acc[b.category] ?? 0) +
        categorizedTransactions[b.category].reduce<number>(
          (acc, t) => acc - t.amount,
          0
        ),
    }),
    budgetMaxes
  );

  const budgets = budgetMetas.map((b) =>
    createBudget(b, remainingBudgets[b.category])
  );

  const financials = {
    pots,
    budgets,
    transactions,
    categorizedTransactions,
    billsSummary,
  };

  return (
    <FinancialsContext.Provider value={financials}>
      {children}
    </FinancialsContext.Provider>
  );
};

export const useFinancialsContext = () => {
  const context = useContext(FinancialsContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};

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
} from "../types/types";

const pots: Pot[] = [
  { name: "Savings", theme: "darkgreen", size: 159 },
  { name: "Concert Ticket", theme: "dimgrey", size: 110 },
  { name: "Gift", theme: "paleturquoise", size: 40 },
  { name: "New Laptop", theme: "moccasin", size: 10 },
];

const budgetMetas: BudgetMeta[] = [
  { category: "Entertainment", maximum: 4000, theme: "darkgreen" },
  { category: "Bills", maximum: 5000, theme: "paleturquoise" },
  { category: "Dining Out", maximum: 1000, theme: "moccasin" },
  { category: "Personal Care", maximum: 300, theme: "dimgrey" },
];

const billsSummary: BillsSummary = {
  Paid: 190,
  "Total Upcoming": 194.98,
  "Due Soon": 59.98,
};

export const useFinancials: () => {
  pots: Pot[];
  budgets: Budget[];
  transactions: Transaction[];
  billsSummary: BillsSummary;
  categorizedTransactions: CategorizedTransactions;
} = () => {
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

  return {
    pots,
    budgets,
    transactions,
    categorizedTransactions,
    billsSummary,
  };
};

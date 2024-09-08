import {
  createBudget,
  transactionsByCategory,
} from "../components/utility/utility";
import {
  Pot,
  Budget,
  Transaction,
  BillsSummary,
  BudgetMeta,
} from "../types/types";

const pots: Pot[] = [
  { name: "Savings", color: "darkgreen", size: 159 },
  { name: "Concert Ticket", color: "dimgrey", size: 110 },
  { name: "Gift", color: "paleturquoise", size: 40 },
  { name: "New Laptop", color: "moccasin", size: 10 },
];

const budgetMetas: BudgetMeta[] = [
  { category: "Entertainment", max: 50, color: "darkgreen" },
  { category: "Bills", max: 750, color: "paleturquoise" },
  { category: "Dining Out", max: 75, color: "moccasin" },
  { category: "Personal Care", max: 100, color: "dimgrey" },
];

const transactions: Transaction[] = [
  {
    party: "Emma Richardson",
    category: "General",
    transactionDate: new Date(),
    amount: 75.5,
  },
  {
    party: "Savory Bites Bistro",
    category: "Dining Out",
    transactionDate: new Date(),
    amount: -55.5,
  },
  {
    party: "Daniel Carter",
    category: "General",
    transactionDate: new Date(),
    amount: -42.3,
  },
  {
    party: "Sun Park",
    category: "General",
    transactionDate: new Date(),
    amount: 120,
  },
  {
    party: "Ethan Clark",
    category: "Dining Out",
    transactionDate: new Date(),
    amount: -32.5,
  },
  {
    party: "Urban Services Hub",
    category: "Dining Out",
    transactionDate: new Date(),
    amount: -65.0,
  },
  {
    party: "James Thompson",
    category: "Entertainment",
    transactionDate: new Date(),
    amount: -5,
  },
  {
    party: "Pixel Playground",
    category: "Entertainment",
    transactionDate: new Date(),
    amount: -10,
  },
  {
    party: "Rina Sato",
    category: "Entertainment",
    transactionDate: new Date(),
    amount: -10,
  },
  {
    party: "Spark Electric Solutions",
    category: "Bills",
    transactionDate: new Date(),
    amount: -100,
  },
  {
    party: "Rina Sato",
    category: "Bills",
    transactionDate: new Date(),
    amount: -50,
  },
  {
    party: "Aqua Flow Utilities",
    category: "Bills",
    transactionDate: new Date(),
    amount: -100,
  },
  {
    party: "William Harris",
    category: "Personal Care",
    transactionDate: new Date(),
    amount: -10,
  },
  {
    party: "Serenity Spa & Wellness",
    category: "Personal Care",
    transactionDate: new Date(),
    amount: -30,
  },
  {
    party: "Serenity Spa & Wellness",
    category: "Personal Care",
    transactionDate: new Date(),
    amount: -30,
  },
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
} = () => {
  const categorizedTransactions = transactionsByCategory(transactions);
  const budgetMaxes = budgetMetas.reduce<Record<string, number>>(
    (acc, b) => ({ ...acc, [b.category]: b.max }),
    {}
  );
  const remainingBudgets = budgetMetas.reduce<Record<string, number>>(
    (acc, b) => ({
      ...acc,
      [b.category]:
        acc[b.category] ??
        0 +
          categorizedTransactions[b.category].reduce<number>(
            (acc, t) => acc + t.amount,
            0
          ),
    }),
    budgetMaxes
  );
  const budgets = budgetMetas.map((b) =>
    createBudget(b, remainingBudgets[b.category])
  );
  console.log(budgets);
  return {
    pots,
    budgets,
    transactions,
    billsSummary,
  };
};

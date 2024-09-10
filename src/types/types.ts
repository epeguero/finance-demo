export const enum Page {
  Overview = "Overview",
  Transactions = "Transactions",
  Budgets = "Budgets",
  Pots = "Pots",
  RecurringBills = "RecurringBills",
}

export type Pot = {
  name: string;
  size: number;
  theme: string;
};

export type Transaction = {
  avatar: string;
  name: string;
  category: string;
  date: Date;
  amount: number;
};

export type CategorizedTransactions = { [key: string]: Transaction[] };

export enum BudgetCategory {
  Entertainment = "Entertainment",
  Bills = "Bills",
  Groceries = "Groceries",
  DiningOut = "Dining Out",
  Transportation = "Transportation",
  PersonalCare = "Personal Care",
  Education = "Education",
  Lifestyle = "Lifestyle",
  Shopping = "Shopping",
  General = "General",
}

export type Budget = {
  category: BudgetCategory;
  maximum: number;
  remaining: number;
  theme: string;
};

export type BudgetMeta = Omit<Budget, "remaining">;

export type BillsSummary = {
  Paid: number;
  "Total Upcoming": number;
  "Due Soon": number;
};

export enum Theme {
  Green = "green",
  Yellow = "yellow",
  Cyan = "cyan",
  Navy = "navy",
  Red = "red",
  Purple = "purple",
  Turquoise = "turquoise",
  Brown = "brown",
  Magenta = "magenta",
  Blue = "blue",
  Pink = "pink",
  Gold = "gold",
  Orange = "orange",
}

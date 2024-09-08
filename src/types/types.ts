export type Page =
  | "overview"
  | "transactions"
  | "budgets"
  | "pots"
  | "recurring-bills";

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

export type Budget = {
  category: string;
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

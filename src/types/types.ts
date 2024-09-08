export type Page =
  | "overview"
  | "transactions"
  | "budgets"
  | "pots"
  | "recurring-bills";

export type Pot = {
  name: string;
  size: number;
  color: string;
};

export type Transaction = {
  party: string;
  category: string;
  transactionDate: Date;
  amount: number;
};

export type Budget = {
  category: string;
  max: number;
  remaining: number;
  color: string;
};

export type BudgetMeta = Omit<Budget, "remaining">;

export type BillsSummary = {
  Paid: number;
  "Total Upcoming": number;
  "Due Soon": number;
};

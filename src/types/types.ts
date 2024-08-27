export type Page = 'overview' | 'transactions' | 'budgets' | 'pots' | 'recurring-bills';

export type Pot = {
  name: string,
  size: number,
  color: string
}

export type Transaction = {
  party: string,
  category: string,
  transactionDate: Date,
  amount: number;
}

export type Budget = {
  category: string,
  remaining: number,
  max: number,
  color: string
}

export type BillsSummary = {
  paid: number;
  totalUpcoming: number;
  dueSoon: number;
}
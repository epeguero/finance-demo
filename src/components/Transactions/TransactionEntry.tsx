import { format } from "date-fns";
import { Transaction } from "../../types/types";
import { formatCurrency } from "../utility/Utility";

import "./TransactionEntry.css";

export const TransactionEntry = ({
  transaction,
}: {
  transaction: Transaction;
}) => (
  <div className="transaction">
    <img
      className="avatar"
      src={require(`../../assets/images/avatars/${transaction.avatar}`)}
      alt={transaction.name}
    />
    <span>{transaction.name}</span>
    <span className={transaction.amount < 0 ? "positive-amount" : ""}>
      {transaction.amount < 0 ? "+" : "-"}
      {formatCurrency(transaction.amount, true)}
    </span>
    <span>{format(transaction.date, "d MMM y")}</span>
  </div>
);

import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { Budget, Transaction } from "../../types/types";
import {
  AmountWithLabel,
  Card,
  Circle,
  ColorBar,
  Divider,
  formatCurrency,
  Intersperse,
  PieChart,
} from "../utility/Utility";
import "./Budget.css";
import { useFinancials } from "../../hooks/useFinancials";
import { TransactionEntry } from "../Transactions/TransactionEntry";

export const Budgets = (): JSX.Element => {
  const { budgets, categorizedTransactions } = useFinancials();
  return (
    <div className="budgets-page">
      <span>Budgets</span>
      <SpendingSummaryCard budgets={budgets} />
      {budgets.map((b, ix) => (
        <BudgetCard
          key={`budget-${ix}`}
          budget={b}
          transactions={categorizedTransactions[b.category] ?? []}
        />
      ))}
    </div>
  );
};

const BudgetCard = ({
  budget,
  transactions,
}: {
  budget: Budget;
  transactions: Transaction[];
}) => (
  <Card className="budget-card">
    <span style={{ display: "flex", gap: "15px", alignItems: "center" }}>
      <Circle color={budget.theme} />
      {budget.category}
    </span>
    <span style={{ color: "grey", fontSize: "0.7rem" }}>
      {`Maximum of ${formatCurrency(budget.maximum, true)}`}
    </span>
    <div className={"percentage-bar"}>
      <div
        style={{
          width: `${Math.min((budget.remaining / budget.maximum) * 100, 100)}%`,
          backgroundColor: budget.theme,
        }}
      />
    </div>
    <div className={"amount-indicators"}>
      <AmountWithLabel
        label={"Spent"}
        amount={budget.maximum - budget.remaining}
        color={budget.theme}
      />
      <AmountWithLabel
        label={"Remaining"}
        amount={budget.remaining}
        color={"rgb(248, 244, 240)"}
      />
    </div>
    <Card className="latest-spending">
      <span>Latest Spending</span>
      <div className="transaction-list">
        <Intersperse Separator={Divider}>
          {transactions.map((t, ix) => (
            <div key={`${t.category}-${t.name}-${ix}`}>
              <TransactionEntry transaction={t} />
            </div>
          ))}
        </Intersperse>
      </div>
    </Card>
  </Card>
);

const SpendingSummaryCard = ({ budgets }: { budgets: Budget[] }) => (
  <Card className="budgets-summary-card">
    <PieChart budgets={budgets} />
    <span>Spending Summary</span>
    <Intersperse Separator={Divider}>
      {budgets.map((b, ix) => (
        <div
          key={`budgets-summary-card-indicator-${ix}`}
          style={{
            display: "flex",
            alignItems: "center",
            whiteSpace: "nowrap",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "15px",
              fontSize: "0.7rem",
              fontWeight: "lighter",
              color: "grey",
            }}
          >
            <ColorBar color={b.theme} />
            {b.category}
          </span>
          <span
            style={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
              whiteSpace: "nowrap",
              fontSize: "0.75rem",
              fontWeight: "bold",
            }}
          >
            {formatCurrency(b.remaining, true)}
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: "lighter",
                color: "grey",
              }}
            >
              of {formatCurrency(b.maximum)}
            </span>
          </span>
        </div>
      ))}
    </Intersperse>
  </Card>
);

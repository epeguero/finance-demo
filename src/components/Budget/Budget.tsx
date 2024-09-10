import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { ReactComponent as CircleX } from "../../assets/images/icon-close-modal.svg";
import { Budget, BudgetCategory, Theme, Transaction } from "../../types/types";
import {
  AmountWithLabel,
  Card,
  CardHeader,
  Circle,
  ColorBar,
  Divider,
  formatCurrency,
  Intersperse,
  MoneyInput,
  PieChart,
  Select,
  useDialog,
} from "../utility/Utility";
import "./Budget.css";
import { useFinancialsContext } from "../../hooks/Financials";
import { TransactionEntry } from "../Transactions/TransactionEntry";

export const Budgets = (): JSX.Element => {
  const { budgets, categorizedTransactions } = useFinancialsContext();
  return (
    <div className="budgets-page">
      <span>
        Budgets <AddNewBudgetButton />
      </span>
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

const AddNewBudgetButton = () => {
  const { Dialog, close, open } = useDialog();
  return (
    <>
      <Card className="add-new-budget-button" onClick={open}>
        + Add New Budget
      </Card>
      <Dialog>
        <AddNewBudgetCard close={close} />
      </Dialog>
    </>
  );
};

const AddNewBudgetCard = ({ close }: { close: () => void }) => {
  const { budgets } = useFinancialsContext();
  const usedCategories = new Set<BudgetCategory>(
    budgets.map((b) => b.category)
  );
  const unusedCategories = (
    Object.values(BudgetCategory) as BudgetCategory[]
  ).filter((c) => !usedCategories.has(c));

  return (
    <Card id={"new-budget-dialog"}>
      <CardHeader
        title={"Add New Budget"}
        actionButton={
          <div
            className={"close-new-budget-button"}
            onClick={close}
            onKeyDown={(e) => e.key === "Enter" && close()}
            tabIndex={1}
            autoFocus
          >
            <CircleX />
          </div>
        }
      />
      <span>
        Choose a category to set a spending budget. These categories can help
        you monitor spending.
      </span>
      <Select
        title={"Budget Category"}
        options={unusedCategories.map((c) => ({
          value: c,
          render: <>{c}</>,
        }))}
      />
      <MoneyInput title={"Maximum Spend"} />

      <Select
        title={"Theme"}
        options={Object.entries(Theme).map(([colorName, color], ix) => ({
          value: color,
          render: (
            <div
              key={`new-budget-color-${ix}`}
              style={{ display: "flex", gap: "10px" }}
            >
              <Circle color={color} />
              {colorName}
            </div>
          ),
        }))}
      />
      <Card className="confirm-add-budget-button">
        <span>Add Budget</span>
      </Card>
    </Card>
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

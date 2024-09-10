import {
  AmountWithLabel,
  Card,
  CardHeader,
  CaretLink,
  Divider,
  Intersperse,
  PieChart,
  formatCurrency,
} from "../utility/Utility";
import { ReactComponent as PotIcon } from "../../assets/images/icon-pot.svg";
import { BillsSummary, Page } from "../../types/types";

import "./Overview.css";
import { TransactionEntry } from "../Transactions/TransactionEntry";
import { useNavigationContext } from "../../hooks/Navigation";
import { useFinancialsContext } from "../../hooks/Financials";

export const Overview = (): JSX.Element => {
  const { pots, budgets, transactions, billsSummary } = useFinancialsContext();
  const { navigate } = useNavigationContext();
  return (
    <div className="overview">
      <span className="overview-title">Overview</span>
      <div className="figures">
        <Figure
          className="current-balance"
          title={"Current Balance"}
          figure={4836}
        />
        <Figure title={"Income"} figure={3814.25} />
        <Figure title={"Expenses"} figure={1700.5} />
      </div>
      <Card className="pots">
        <CardHeader
          title="Pots"
          actionButton={
            <CaretLink
              title="See Details"
              onClick={() => navigate(Page.Pots)}
            />
          }
        />
        <Card className="total-saved">
          <PotIcon />
          <span>Total Saved</span>
          <span className="amount">{formatCurrency(850, false)}</span>
        </Card>
        <div className={"pot-sizes"}>
          {pots.map((pot, ix) => (
            <AmountWithLabel
              key={`pots-pot${ix + 1}`}
              className={`pot${ix + 1}`}
              label={pot.name}
              amount={pot.size}
              color={pot.theme}
            />
          ))}
        </div>
      </Card>
      <Card className="transactions">
        <CardHeader
          title="Transactions"
          actionButton={
            <CaretLink
              title="View All"
              onClick={() => navigate(Page.Transactions)}
            />
          }
        />
        <div className="transactions-list">
          <Intersperse Separator={Divider}>
            {transactions.map((t, ix) => (
              <TransactionEntry key={`overview-tx-${ix}`} transaction={t} />
            ))}
          </Intersperse>
        </div>
      </Card>
      <Card className="budgets">
        <CardHeader
          title="Budgets"
          actionButton={
            <CaretLink
              title="See Details"
              onClick={() => navigate(Page.Budgets)}
            />
          }
        />
        <PieChart budgets={budgets} />
        {budgets.map((b, ix) => (
          <AmountWithLabel
            key={`overview-budget-${ix}`}
            label={b.category}
            amount={b.maximum}
            color={b.theme}
            cents
          />
        ))}
      </Card>
      <Card className="recurring-bills">
        <CardHeader
          title="Recurring Bills"
          actionButton={
            <CaretLink
              title="See Details"
              onClick={() => navigate(Page.RecurringBills)}
            />
          }
        />
        {Object.keys(billsSummary).map((billCategory: string, ix) => (
          <Card key={`overview-billsummary-${ix}`}>
            <span>{billCategory}</span>
            <span>
              {formatCurrency(
                billsSummary[billCategory as keyof BillsSummary],
                true
              )}
            </span>
          </Card>
        ))}
      </Card>
    </div>
  );
};

const Figure = ({
  title,
  figure,
  className,
}: { title: string; figure: number } & React.ComponentProps<typeof Card>) => (
  <Card className={`${className ?? ""} figure`}>
    <span> {title} </span>
    <span> {formatCurrency(figure, true)} </span>
  </Card>
);

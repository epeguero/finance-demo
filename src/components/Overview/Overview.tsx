import { AmountWithLabel, Card, CardHeader, CaretLink, Divider, PieChart, formatCurrency } from "../utility/Utility";
import { ReactComponent as PotIcon } from '../../assets/images/icon-pot.svg';
import { BillsSummary, Budget, Pot, Transaction } from "../../types/types";
import { format } from "date-fns";

import './Overview.css';

export const Overview = ({
  pots, 
  transactions, 
  budgets,
  billsSummary
}: {pots: Pot[], transactions: Transaction[], budgets: Budget[], billsSummary: BillsSummary}) => {
  return (
    <div className="overview">
        <span className="overview-title">Overview</span>
        <div className="figures">
          <Figure className="current-balance" title={"Current Balance"} figure={4836}/>
          <Figure title={"Income"} figure={3814.25}/>
          <Figure title={"Expenses"} figure={1700.50}/>
        </div>
        <Card className="pots">
          <CardHeader title="Pots" actionButton={<CaretLink title="See Details"/>}/>
          <Card className="total-saved">
            <PotIcon/>
            <span>Total Saved</span>
            <span className='amount'>{formatCurrency(850, false)}</span>
          </Card>
          {pots.map((pot, ix) => 
            <AmountWithLabel key={`pots-pot${ix+1}`}className={`pot${ix+1}`} label={pot.name} amount={pot.size} color={pot.color}/>
          )}
        </Card>
        <Card className="transactions">
          <CardHeader title="Transactions" actionButton={<CaretLink title="View All"/>}/>
          {transactions.map(t => <TransactionEntry transaction={t}/>).flatMap(t => [<Divider/>, t]).slice(1)}
        </Card>
        <Card className="budgets">
          <CardHeader title="Budgets" actionButton={<CaretLink title="See Details"/>}/>
          <PieChart budgets={budgets}/>
          {budgets.map((b, ix) => <AmountWithLabel key={`budgets-budget-${ix}`} label={b.category} amount={b.max} color={b.color} cents/>)} 
        </Card>
        <Card className="recurring-bills">
          <CardHeader title="Recurring Bills" actionButton={<CaretLink title="See Details"/>}/>
          {Object.keys(billsSummary).map((billCategory: string) => 
            <Card>
              <span>{billCategory}</span>
              <span>{formatCurrency(billsSummary[billCategory as keyof BillsSummary], true)}</span>
            </Card>
          )}
        </Card>
      </div>
  );
}

const Figure = ({title, figure, className}: {title: string, figure: number} & React.ComponentProps<typeof Card>) =>
  <Card className={`${className ?? ''} figure`}>
    <span> {title} </span>
    <span> {formatCurrency(figure, true)} </span>
  </Card>

const TransactionEntry = ({transaction}: {transaction: Transaction}) =>
  <div className='transaction'>
    <img 
      className='avatar'
      src={
        require(
          `../../assets/images/avatars/${ 
            transaction.party.toLowerCase().split(' ').join('-')
          }.jpg`
        )
      }
      alt={transaction.party}
    />
    <span>{transaction.party}</span>
    <span className={transaction.amount > 0 ? 'positive-amount' : ''}>{transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount, true)}</span>
    <span>{format(transaction.transactionDate, 'd MMM y')}</span>
  </div>

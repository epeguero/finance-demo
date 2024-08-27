import { AmountWithLabel, Card, CardHeader, CaretLink, Divider, PieChart, formatCurrency } from "../utility/Utility";
import { ReactComponent as PotIcon } from '../../assets/images/icon-pot.svg';
import { BillsSummary, Budget, Pot, Transaction } from "../../types/types";
import { format } from "date-fns";

import './Overview.css';

export const Overview = () => {
  const pots: Pot[] = [
    {name: 'Savings', color: 'darkgreen', size: 159},
    {name: 'Concert Ticket', color: 'dimgrey', size: 110},
    {name: 'Gift', color: 'paleturquoise', size: 40},
    {name: 'New Laptop', color: 'moccasin', size: 10}
  ];

  const budgets: Budget[] = [
    {category: 'Entertainment', remaining: 15, max: 50, color: 'darkgreen'},
    {category: 'Bills', remaining: 150, max: 750, color: 'paleturquoise'},
    {category: 'Dining Out', remaining: 133, max: 75, color: 'moccasin'},
    {category: 'Personal Care', remaining: 40, max: 100,color: 'dimgrey'}
  ]

  const transactions: Transaction[] = [
    {
      party: 'Emma Richardson', 
      category: 'General',
      transactionDate: new Date(),
      amount: 75.50
    },
    {
      party: 'Savory Bites Bistro', 
      category: 'Dining Out',
      transactionDate: new Date(),
      amount: -55.50
    },
    {
      party: 'Daniel Carter', 
      category: '',
      transactionDate: new Date(),
      amount: -42.30
    },
    {
      party: 'Sun Park', 
      category: '',
      transactionDate: new Date(),
      amount: 120
    },
    {
      party: 'Urban Services Hub', 
      category: 'Dining Out',
      transactionDate: new Date(),
      amount: -65.00
    }
  ];

  const billsSummary: BillsSummary = {
    paid: 190,
    totalUpcoming: 194.98,
    dueSoon: 59.98,
  }

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
          {Object.keys(billsSummary).map((x: string) => 
            <Card>
              <span>Paid Bills</span>
              <span>{formatCurrency(billsSummary[x as keyof BillsSummary], true)}</span>
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
    />
    <span>{transaction.party}</span>
    <span className={transaction.amount > 0 ? 'positive-amount' : ''}>{transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount, true)}</span>
    <span>{format(transaction.transactionDate, 'd MMM y')}</span>
  </div>

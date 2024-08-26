import { AmountWithLabel, Card, CardHeader, CaretLink, Divider, formatCurrency } from "../utility/Utility";
import { ReactComponent as PotIcon } from '../../assets/images/icon-pot.svg';
import { Pot, Transaction } from "../../types/types";
import { format } from "date-fns";

import './Overview.css';

export const Overview = () => {
  const pots: Pot[] = [
    {name: 'Savings', color: 'darkgreen', size: 159},
    {name: 'Concert Ticket', color: 'dimgrey', size: 110},
    {name: 'Gift', color: 'paleturquoise', size: 40},
    {name: 'New Laptop', color: 'moccasin', size: 10}
  ];

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
    },
  ];

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
        </Card>
        <Card className="recurring-bills">
          <CardHeader title="Recurring Bills" actionButton={<CaretLink title="See Details"/>}/>
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

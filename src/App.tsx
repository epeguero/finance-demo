import React, { useState } from 'react';
import './App.css';
import { ReactComponent as PotIcon } from './icon-pot.svg';
import { ReactComponent as CaretRightIcon } from './icon-caret-right.svg';
import { ReactComponent as LogoSmallIcon } from './logo-small.svg';
import { ReactComponent as LogoLargeIcon } from './logo-large.svg';
import { ReactComponent as OverviewIcon } from './icon-nav-overview.svg';
import { ReactComponent as TransactionsIcon } from './icon-nav-transactions.svg';
import { ReactComponent as BudgetsIcon} from './icon-nav-budgets.svg';
import { ReactComponent as PotsIcon} from './icon-nav-pots.svg';
import { ReactComponent as RecurringBillsIcon} from './icon-nav-recurring-bills.svg';
import { ReactComponent as LeftArrowIcon } from './icon-minimize-menu.svg';

type Pot = {
  name: string,
  size: number,
  color: string
}

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <Overview/>
    </div>
  );
}

const Sidebar = () => {
  const [isMaximized, setIsMaximized] = useState(false);
  return <div className='sidebar' data-maximized={isMaximized}>
    <LogoSmallIcon className='small-logo'/>
    <LogoLargeIcon className='large-logo'/>
    <OverviewIcon className='overview-icon'/>
    <TransactionsIcon className='transactions-icon'/>
    <BudgetsIcon className='budgets-icon'/>
    <PotsIcon className='pots-icon'/>
    <RecurringBillsIcon className='recurring-bills-icon'/>
    <MaxMinimizeButton onClick={() => setIsMaximized(!isMaximized)}/>
  </div>
}


const Overview = () => {
  const pots: Pot[] = [
    {name: 'Savings', color: 'darkgreen', size: 159},
    {name: 'Concert Ticket', color: 'dimgrey', size: 110},
    {name: 'Gift', color: 'paleturquoise', size: 40},
    {name: 'New Laptop', color: 'moccasin', size: 10}
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

const AmountWithLabel = ({label, amount, cents=false, color, className, ...divProps}: {label: string, amount: number, cents?: boolean, color: string} & React.HTMLAttributes<HTMLDivElement>) => 
  <div className={`amount-with-label ${className}`} {...divProps}>
    <div style={{backgroundColor: color}} className='colorbar'></div>
    <span>{label}</span>
    <span>{formatCurrency(amount, cents)}</span>
  </div>

const Figure = ({title, figure, className}: {title: string, figure: number} & React.ComponentProps<typeof Card>) =>
  <Card className={`${className ?? ''} figure`}>
    <span> {title} </span>
    <br/>
    <span> {formatCurrency(figure)} </span>
  </Card>

const Card = ({children, className}: {children?: React.ReactNode} & React.HTMLAttributes<HTMLDivElement>) =>
  <div className={`card ${className ?? ''}`}>{children}</div>

const CardHeader = ({title, actionButton}: {title: React.ReactNode, actionButton?: React.ReactNode}) => 
  <div className='card-header'>
    <span>{title}</span>
    {actionButton}
  </div>

const CaretLink = ({title, className}: {title: string} & React.HTMLAttributes<HTMLDivElement>) => 
  <div className={`caret-link ${className ?? ''}`}>
    <span>{title}</span>
    <CaretRightIcon/>
  </div>

const MaxMinimizeButton = ({onClick}: React.ComponentProps<"div">) =>
  <div className='maximize-button' onClick={onClick}>
    <LeftArrowIcon/>
  </div>

const formatCurrency = (value: number, cents: boolean = false) =>
  value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: cents ? 2 : 0
  })



export default App;

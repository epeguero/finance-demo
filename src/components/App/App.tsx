import { useState } from 'react';
import { Overview } from '../Overview/Overview';
import { Sidebar } from '../Sidebar/Sidebar';
import './App.css';
import { BillsSummary, Budget, Page, Pot, Transaction } from '../../types/types';
import { Budgets } from '../Budget/Budget';

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
  "Paid": 190,
  "Total Upcoming": 194.98,
  "Due Soon": 59.98,
}

function App() {
  const [page, setPage] = useState<Page>('overview')
  return (
    <div className="App">
      <Sidebar currentPage={page} onPageSelect={(p) => {console.log(p);setPage(p)}}/>
      {
        (
          {
            overview: () => <Overview pots={pots} budgets={budgets} transactions={transactions} billsSummary={billsSummary}/>,
            pots: () => <div>Unimplemented</div>,
            budgets: () => <Budgets budgets={budgets}/>,
            transactions: () => <div>Unimplemented</div>,
            "recurring-bills": () => <div>Unimplemented</div>
          } satisfies Record<Page, () => JSX.Element>
        )[page]()
      }
    </div>
  );
}

export default App;

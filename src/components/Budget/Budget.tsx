import { Budget } from "../../types/types"
import { AmountWithLabel, Card, Circle, ColorBar, Divider, formatCurrency, PieChart } from "../utility/Utility"
import './Budget.css';

export const Budgets = ({budgets}: {budgets: Budget[]}) => {
  return <div className='budgets-page'>
    <span>Budgets</span>
    <SpendingSummaryCard budgets={budgets}/>
    {budgets.map((b, ix) => <BudgetCard key={`budget-${ix}`} budget={b}/>)}
  </div>
}

const BudgetCard = ({budget}: {budget: Budget}) =>
  <Card className='budget-card'>
    <span style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
      <Circle color={budget.color}/>{budget.category}
    </span>
    <span style={{color: 'grey', fontSize: '0.7rem'}}>
      {`Maximum of ${formatCurrency(budget.max, true)}`}
    </span>
    <div className={'percentage-bar'} >
      <div style={{position: 'relative', height: '100%', width: `${Math.min(budget.remaining / budget.max * 100, 100)}%`, backgroundColor: budget.color}}/>
    </div>
    <div className={'amount-indicators'}>
      <AmountWithLabel label={"Spent"} amount={budget.max - budget.remaining} color={budget.color}/>
      <AmountWithLabel label={"Remaining"} amount={budget.remaining} color={ 'rgb(248, 244, 240)'}/>
    </div>
    <Card className="latest-spending">
      <span>Latest Spending</span>
      <span>STUFF</span>
      <span>STUFF</span>
      <span>STUFF</span>
      <span>STUFF</span>
      <span>STUFF</span>
      <span>STUFF</span>
    </Card>
  </Card>

const SpendingSummaryCard = ({budgets}: {budgets: Budget[]}) =>
  <Card className='budgets-summary-card'>
    <PieChart budgets={budgets}/>
    <span>Spending Summary</span>
    {budgets.map(b => 
      <div style={{
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        justifyContent: 'space-between'
      }}>
        <span style={{
          display: 'inline-flex', 
          alignItems: 'center',
          gap: '15px',
          fontSize: '0.7rem',
          fontWeight: 'lighter',
          color: 'grey'
        }}>
          <ColorBar color={b.color}/>
          {b.category}
        </span>
        <span style={{
            display: 'flex',
            gap: '5px',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            fontSize: '0.75rem',
            fontWeight: 'bold'
        }}>
          {formatCurrency(b.remaining, true)}
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 'lighter',
            color: 'grey'
          }}>of {formatCurrency(b.max)}</span>
        </span>
      </div>
    ).flatMap(t => [<Divider/>, t]).slice(1)}
  </Card>
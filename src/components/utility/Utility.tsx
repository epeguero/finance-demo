import { useRef } from 'react';
import { ReactComponent as CaretRightIcon } from '../../assets/images/icon-caret-right.svg';
import './Utility.css';
import { Budget } from '../../types/types';

export const AmountWithLabel = ({label, amount, cents=false, color, className, ...divProps}: {label: string, amount: number, cents?: boolean, color: string} & React.HTMLAttributes<HTMLDivElement>) => 
  <div className={`amount-with-label ${className}`} {...divProps}>
    <div style={{backgroundColor: color}} className='colorbar'></div>
    <span>{label}</span>
    <span>{formatCurrency(amount, cents)}</span>
  </div>

export const Card = ({children, className}: {children?: React.ReactNode} & React.HTMLAttributes<HTMLDivElement>) =>
  <div className={`card ${className ?? ''}`}>{children}</div>

export const CardHeader = ({title, actionButton}: {title: React.ReactNode, actionButton?: React.ReactNode}) => 
  <div className='card-header'>
    <span>{title}</span>
    {actionButton}
  </div>

export const CaretLink = ({title, className}: {title: string} & React.HTMLAttributes<HTMLDivElement>) => 
  <div className={`caret-link ${className ?? ''}`}>
    <span>{title}</span>
    <CaretRightIcon/>
  </div>

export const Divider = () => <div className='divider'/>

export const PieChart = ({budgets}:{budgets: Budget[]}) => {
  const budgetAllocated = budgets.reduce((acc, b) => acc + b.max, 0);
  const budgetRemaining = budgets.reduce((acc, b) => acc + b.remaining, 0);
  const budgetSegments = budgets.map(b => b.max / budgetAllocated * 360);
  const conicSegments = budgetSegments.reduce(
    (acc, b, ix) => ({
      prevSegment: b,
      conicSegments: [...acc.conicSegments, `${budgets[ix].color} ${acc.prevSegment}deg ${budgetSegments[ix]}deg`]
    }), 
    {prevSegment: 0, conicSegments: [] as string[]}
  ).conicSegments;
  console.log(conicSegments)

  // e.g.:
  //"conic-gradient(green 0deg 20deg, lightblue 20deg 200deg, rgb(242, 205, 172) 200deg 240deg, rgb(98, 96, 112) 240deg 360deg)"
  return (
  <div className='pie-chart' style={{background:`conic-gradient(${conicSegments.join(', ')})`}}>
    <span>{formatCurrency(budgetRemaining)}</span>
    <span>of {formatCurrency(budgetAllocated)} limit</span>
  </div>)
}

export const formatCurrency = (value: number, cents: boolean = false) =>
  value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: cents ? 2 : 0
  })



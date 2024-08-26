import { ReactComponent as CaretRightIcon } from '../../assets/images/icon-caret-right.svg';
import './Utility.css';

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

export const formatCurrency = (value: number, cents: boolean = false) =>
  value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: cents ? 2 : 0
  })



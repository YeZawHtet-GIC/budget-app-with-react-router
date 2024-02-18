import React from 'react'
import { calculateSpentByBudget, formatCurrency } from '../Helpers';

export default function BudgetItem({ budget }) {
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);
  return (
    <div className='budget'>
      <div className='progress-text'>
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value="100">
        {/*percentage*/}
      </progress>
      <div className='progress-text'>
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount-spent)} remaining</small>
      </div>
    </div>
  )
}

//react imports
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useRef } from 'react'
//rrd imports
import { useFetcher } from 'react-router-dom';

export default function AddExpenseForm({ budgets }) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const formRef = useRef();
  const focusRef = useRef();
  useEffect(() => {
    if (!isSubmitting) {
      //clear form
      formRef.current.reset();
      //reset focus
      focusRef.current.focus();
    }
  }, [isSubmitting])
  return (
    <div className='form-wrapper'>
      <h2 className='h3'>Add new {" "}<span className='accent'>
        {budgets.length === 1 && `${budgets.map((budget) => budget.name)}`}
      </span>{" "} Expense</h2>
      <fetcher.Form method='post' className='grid-sm' ref={formRef}>
        <div className='expense-inputs'>
          <div className='grid-xs'>
            <label htmlFor='newExpense'>Expense Name</label>
            <input
              type='text'
              name='newExpense'
              id='newExpense'
              placeholder='e.g Coffee'
              ref={focusRef}
              required
            />
          </div>
          <div className='grid-xs'>
            <label htmlFor='newExpenseAmount'>Amount</label>
            <input
              type='number'
              name='newExpenseAmount'
              step='0.1'
              inputMode='decimal'
              id='newExpenseAmount'
              placeholder='e.g 3.50'
              required
            />
          </div>
        </div>
        <div className='grid-xs' hidden={budgets.length === 1}>
          <label htmlFor='newExpenseBudget'>Budget Category</label>
          <select name='newExpenseBudget' id='newExpenseBudget' required>
            {
              budgets.sort((a, b) => a.createdAt - b.createdAt)
                .map((budget) => {
                  return (
                    <option key={budget.id} value={budget.id}>
                      {budget.name}
                    </option>
                  )
                })
            }
          </select>
        </div>
        <input type='hidden' name='_action' value='createExpense' />
        <button
          type="submit"
          className="btn btn--dark btn-dark"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Add Expense</span>
              <PlusCircleIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  )
}

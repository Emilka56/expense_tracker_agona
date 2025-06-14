import React from 'react';

export interface ExpenseType {
  id: string;
  title: string;
  amount: number;
  category?: string;
  date: Date;
}

interface ExpenseProps {
  expense: ExpenseType;
  onDelete: (id: string) => void;
}

const Expense: React.FC<ExpenseProps> = ({ expense, onDelete }) => {
  const formattedDate = expense.date.toLocaleDateString('ru-RU');
  const formattedAmount = `${expense.amount.toFixed(2)} ₽`;
  
  return (
    <div className="expense-item">
      <div className="expense-details">
        <h3>{expense.title}</h3>
        <div className="expense-info">
          <span className="expense-date">{formattedDate}</span>
          {expense.category && (
            <span className="expense-category">{expense.category}</span>
          )}
        </div>
      </div>
      <div className="expense-amount">{formattedAmount}</div>
      <button 
        className="delete-btn" 
        onClick={() => onDelete(expense.id)}
        aria-label="Удалить расход"
      >
        Удалить
      </button>
    </div>
  );
};

export default Expense;
import React, { useState } from 'react';
import type {ExpenseType} from './Expense.tsx';

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<ExpenseType, 'id'>) => void;
  categories?: string[];
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense, categories = [] }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Пожалуйста, введите название расхода');
      return;
    }
    
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      setError('Пожалуйста, введите корректную сумму');
      return;
    }
    
    const newExpense = {
      title: title.trim(),
      amount: amountValue,
      date: new Date(),
      ...(category && { category })
    };
    
    onAddExpense(newExpense);
    
    setTitle('');
    setAmount('');
    setCategory('');
    setError('');
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>Добавить новый расход</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="expense-title">Название:</label>
        <input
          type="text"
          id="expense-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Например: Продукты"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="expense-amount">Сумма:</label>
        <input
          type="number"
          id="expense-amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          step="0.01"
          min="0"
        />
      </div>
      
      {categories.length > 0 && (
        <div className="form-group">
          <label htmlFor="expense-category">Категория:</label>
          <select
            id="expense-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Выберите категорию</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      )}
      
      <button type="submit" className="submit-btn">Добавить расход</button>
    </form>
  );
};

export default ExpenseForm;
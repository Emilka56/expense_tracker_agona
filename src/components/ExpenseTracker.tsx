import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Expense from './Expense';
import type {ExpenseType} from './Expense';
import ExpenseForm from './ExpenseForm';
import ExpenseChart from './ExpenseChart';


const EXPENSE_CATEGORIES = [
  'Продукты',
  'Транспорт',
  'Развлечения',
  'Коммунальные платежи',
  'Здоровье',
  'Одежда',
  'Другое'
];

const STORAGE_KEY = 'expenseTrackerData';

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const [activeFilter, setActiveFilter] = useState('');

  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);
  
  const handleAddExpense = (newExpense: Omit<ExpenseType, 'id'>) => {
    const expenseWithId = {
      ...newExpense,
      id: uuidv4()
    };
    
    setExpenses(prevExpenses => [...prevExpenses, expenseWithId]);
  };
  
  const handleDeleteExpense = (id: string) => {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  };
  
  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
  };
  
  const filteredExpenses = activeFilter
    ? expenses.filter(expense => expense.category === activeFilter)
    : expenses;
    
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  return (
    <div className="expense-tracker">
      <h1>Калькулятор расходов</h1>
      
      <div className="expense-summary">
        <h2>Общая сумма расходов:</h2>
        <div className="total-amount">{totalExpenses.toFixed(2)} ₽</div>
        
        <div className="category-filter">
          <label htmlFor="category-select">Фильтр по категории:</label>
          <select
            id="category-select"
            value={activeFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="">Все категории</option>
            {EXPENSE_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="charts-container">
        <ExpenseChart expenses={filteredExpenses} />
      </div>
      
      <div className="expense-container">
        <div className="expense-form-container">
          <ExpenseForm 
            onAddExpense={handleAddExpense} 
            categories={EXPENSE_CATEGORIES} 
          />
        </div>
        
        <div className="expenses-list">
          <h2>Ваши расходы {activeFilter && `(${activeFilter})`}</h2>
          
          {filteredExpenses.length === 0 ? (
            <p className="no-expenses">
              {activeFilter 
                ? `У вас нет расходов в категории "${activeFilter}"` 
                : 'У вас пока нет расходов. Добавьте свой первый расход!'}
            </p>
          ) : (
            <div>
              {filteredExpenses
                .slice()
                .sort((a, b) => b.date.getTime() - a.date.getTime())
                .map(expense => (
                  <Expense
                    key={expense.id}
                    expense={expense}
                    onDelete={handleDeleteExpense}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
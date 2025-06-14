import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ExpenseType } from './Expense';

interface ExpenseBarChartProps {
  expenses: ExpenseType[];
}

const ExpenseBarChart: React.FC<ExpenseBarChartProps> = ({ expenses }) => {
  const expensesByDate = expenses.reduce<Record<string, number>>((acc, expense) => {
    const date = expense.date;
    const dateKey = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    
    acc[dateKey] = (acc[dateKey] || 0) + expense.amount;
    return acc;
  }, {});

  const chartData = Object.entries(expensesByDate)
    .map(([date, amount]) => ({
      date,
      amount
    }))
    .sort((a, b) => {
      const [dayA, monthA] = a.date.split('.');
      const [dayB, monthB] = b.date.split('.');
      const dateA = new Date(new Date().getFullYear(), parseInt(monthA) - 1, parseInt(dayA));
      const dateB = new Date(new Date().getFullYear(), parseInt(monthB) - 1, parseInt(dayB));
      return dateA.getTime() - dateB.getTime();
    });

  if (chartData.length === 0) {
    return <div className="no-data-message">Нет данных для отображения графика</div>;
  }

  return (
    <div className="chart-container">
      <h2>Расходы по дням</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value) => [`${value} ₽`, 'Сумма']} />
          <Bar dataKey="amount" fill="#34b0b7" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseBarChart;
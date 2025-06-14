import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { ExpenseType } from './Expense';

interface ExpenseChartProps {
  expenses: ExpenseType[];
}

const COLORS = ['#123d40', '#23787e', '#34b0b7', '#64ced3', '#010404'];

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {

  const expensesByCategory = expenses.reduce<Record<string, number>>((acc, expense) => {
    const category = expense.category || 'Без категории';
    acc[category] = (acc[category] || 0) + expense.amount;
    return acc;
  }, {});


  const chartData = Object.entries(expensesByCategory).map(([name, value], index) => ({
    name,
    value,
    color: COLORS[index % COLORS.length]
  }));


  if (chartData.length === 0) {
    return <div className="no-data-message">Нет данных для отображения графика</div>;
  }

  return (
    <div className="chart-container">
      <h2>Распределение расходов по категориям</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value.toFixed(2)} ₽`, 'Сумма']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
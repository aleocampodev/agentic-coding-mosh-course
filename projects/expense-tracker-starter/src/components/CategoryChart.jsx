import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#f43f5e', '#f97316', '#eab308', '#10b981', '#06b6d4', '#8b5cf6', '#ec4899'];

function CategoryChart({ transactions }) {
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value
  }));

  if (data.length === 0) {
    return (
      <div className="chart-container">
        <h2>Expenses by Category</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>No expenses to display.</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h2>Expenses by Category</h2>
      <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
    </div>
  );
}

export default CategoryChart;

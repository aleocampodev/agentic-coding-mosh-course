function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="summary">
      <div className="summary-card income-card">
        <h3>Income</h3>
        <p className="amount income-amount">{formatAmount(totalIncome)}</p>
      </div>
      <div className="summary-card expense-card">
        <h3>Expenses</h3>
        <p className="amount expense-amount">{formatAmount(totalExpenses)}</p>
      </div>
      <div className="summary-card balance-card">
        <h3>Balance</h3>
        <p className="amount balance-amount">{formatAmount(balance)}</p>
      </div>
    </div>
  );
}

export default Summary;
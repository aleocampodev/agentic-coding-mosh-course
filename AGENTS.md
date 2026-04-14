# Expense Tracker

## Commands
```bash
npm run dev      # Dev server at http://localhost:5173
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint (no tests)
```

## Architecture
- Entry point: `src/main.jsx` → renders `App` with StrictMode
- State: local `useState` in `src/App.jsx` — no context, no external state library
- Components (`src/components/`):
  - `Summary.jsx` - calculates and displays income/expenses/balance
  - `TransactionForm.jsx` - form for adding new transactions
  - `TransactionList.jsx` - displays transactions with filtering

## Known Issues
- (None currently documented)

## Notes
- ESLint `no-unused-vars` rule ignores vars starting with `[A-Z_]`
- No TypeScript, no test framework

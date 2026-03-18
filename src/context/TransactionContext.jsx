import { createContext, useState } from "react";

const TransactionContext = createContext();

export function TransactionProvider(props) {
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("transactions")) ?? [
      {
        date: "2025-12-28",
        description: "Phone Bill",
        category: "Utilities",
        type: "expense",
        amount: -55,
      },
      {
        date: "2025-12-30",
        description: "Bonus",
        category: "Salary",
        type: "income",
        amount: 2000,
      },
      {
        date: "2026-01-01",
        description: "Rent Payment",
        category: "Housing",
        type: "expense",
        amount: -1200,
      },
      {
        date: "2026-01-02",
        description: "Dividend Payment",
        category: "Investment",
        type: "income",
        amount: 150,
      },
      {
        date: "2026-01-03",
        description: "Gym Membership",
        category: "Health",
        type: "expense",
        amount: -50,
      },
      {
        date: "2026-01-04",
        description: "Online Shopping",
        category: "Shopping",
        type: "expense",
        amount: -230,
      },
      {
        date: "2026-01-05",
        description: "Gas Station",
        category: "Transport",
        type: "expense",
        amount: -45,
      },
      {
        date: "2026-01-06",
        description: "Client Payment",
        category: "Freelance",
        type: "income",
        amount: 1200,
      },
      {
        date: "2026-01-07",
        description: "Internet Bill",
        category: "Utilities",
        type: "expense",
        amount: -60,
      },
      {
        date: "2026-01-08",
        description: "Investment Return",
        category: "Investment",
        type: "income",
        amount: 320,
      },
      {
        date: "2026-01-09",
        description: "Restaurant",
        category: "Food",
        type: "expense",
        amount: -65,
      },
      {
        date: "2026-01-10",
        description: "Electric Bill",
        category: "Utilities",
        type: "expense",
        amount: -85,
      },
      {
        date: "2026-01-11",
        description: "Freelance Project",
        category: "Freelance",
        type: "income",
        amount: 800,
      },
      {
        date: "2026-01-12",
        description: "Grocery Shopping",
        category: "Food",
        type: "expense",
        amount: -150,
      },
      {
        date: "2026-01-13",
        description: "Salary Deposit",
        category: "Salary",
        type: "income",
        amount: 5000,
      },
    ],
  );

  function getTopSpendingCategory() {
    const categoryTotals = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
        return acc;
      }, {});

    return Object.entries(categoryTotals).reduce(
      (top, [category, total]) =>
        total > top.total ? { category, total } : top,
      { category: null, total: 0 },
    );
  }

  function getCategories() {
    return [...new Set(transactions.map((t) => t.category))];
  }

  function getIncomeCategories() {
    return [
      ...new Set(
        transactions.filter((t) => t.type === "income").map((t) => t.category),
      ),
    ];
  }

  function getExpenseCategories() {
    return [
      ...new Set(
        transactions.filter((t) => t.type === "expense").map((t) => t.category),
      ),
    ];
  }

  function addTransaction(transaction) {
    const updated = [...transactions, transaction];
    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));
  }

  function acctBalance() {
    return transactions.reduce((accum, value) => accum + value.amount, 0);
  }

  return (
    <TransactionContext.Provider
      value={{
        acctBalance,
        transactions,
        addTransaction,
        getTopSpendingCategory,
        getCategories,
        getIncomeCategories,
        getExpenseCategories,
      }}
    >
      {props.children}
    </TransactionContext.Provider>
  );
}

export default TransactionContext;

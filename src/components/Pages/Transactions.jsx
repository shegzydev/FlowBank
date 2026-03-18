import React, { useContext, useState } from "react";
import "./Transactions.css";
import TransactionContext from "../../context/TransactionContext";

const Transactions = () => {
  const { transactions, getCategories } = useContext(TransactionContext);

  const [chosenType, chooseType] = useState("All");
  const [chosenCategory, chooseCategory] = useState("All");

  const [minDate, selectMinDate] = useState("1999-01-01");
  const [maxDate, selectMaxDate] = useState("3000-01-01");

  const categories = getCategories();

  var filterdTransactions = transactions.filter(
    (entry) =>
      chosenType === "All" ||
      entry.type.toLowerCase() === chosenType.toLowerCase(),
  );

  filterdTransactions = filterdTransactions.filter(
    (entry) =>
      chosenCategory === "All" ||
      entry.category.toLowerCase() === chosenCategory.toLowerCase(),
  );

  filterdTransactions = filterdTransactions.filter(
    (entry) =>
      new Date(entry.date) >= new Date(minDate) &&
      new Date(entry.date) <= new Date(maxDate),
  );

  filterdTransactions = filterdTransactions.toReversed();

  return (
    <>
      <div className="filter-section">
        <div className="filter">
          <p>Start Date</p>
          <input
            type="date"
            className="filter-input"
            value={minDate}
            onChange={(e) => selectMinDate(e.target.value)}
          />
        </div>
        <div className="filter">
          <p>End Date</p>
          <input
            type="date"
            className="filter-input"
            value={maxDate}
            onChange={(e) => selectMaxDate(e.target.value)}
          />
        </div>
        <div className="filter">
          <p>Type</p>
          <select
            className="filter-input"
            value={chosenType}
            onChange={(e) => chooseType(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <div className="filter">
          <p>Category</p>
          <select
            className="filter-input"
            value={chosenCategory}
            onChange={(e) => chooseCategory(e.target.value)}
          >
            <option value="All">All</option>
            {categories.map((entry) => (
              <option value={entry}>{entry}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="list-section">
        <div className="list-heading">
          <div>Date</div>
          <div>Description</div>
          <div>Category</div>
          <div>Type</div>
          <div>Amount</div>
        </div>
        <div className="transactions-list">
          {filterdTransactions.map((transaction) => (
            <>
              <div className="transaction-entry-wide">
                <div className="data-slot">{transaction.date}</div>
                <div className="data-slot">{transaction.description}</div>
                <div className="data-slot">{transaction.category}</div>
                <div className="data-slot">{transaction.type}</div>
                <div
                  className={`data-slot ${transaction.amount > 0 ? "credit" : "debit"}`}
                >
                  ₦{Math.abs(transaction.amount).toLocaleString()}
                </div>
              </div>
              <div className="transaction-entry-card">
                <div className="card-top">
                  <div>
                    <p className="transaction-name">
                      {transaction.description}
                    </p>
                    <p className="transaction-date">{transaction.date}</p>
                  </div>
                  <div
                    className={`transaction-amount ${transaction.amount > 0 ? "credit" : "debit"}`}
                  >
                    {transaction.amount < 0 && "-"}₦
                    {Math.abs(transaction.amount).toLocaleString()}
                  </div>
                </div>
                <hr />
                <div className="card-bottom">
                  <span className="transaction-category">
                    {transaction.category}
                  </span>
                  <span
                    className={`transaction-type ${transaction.amount > 0 ? "credit" : "debit"}`}
                  >
                    {transaction.type}
                  </span>
                </div>
              </div>
              <hr />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Transactions;

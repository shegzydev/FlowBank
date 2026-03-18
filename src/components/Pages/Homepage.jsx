import React, { useContext, useRef, useState } from "react";
import "./Homepage.css";
import { Link } from "react-router-dom";
import SectionContext from "../../context/SectionContext";
import TransactionContext from "../../context/TransactionContext";
import { BanknoteArrowDown, MoveDown, MoveUp, Send } from "lucide-react";
import LoadingContext from "../../context/LoadingContext";

const Homepage = () => {
  const [sendScreenActive, toggleSendScreen] = useState(false);

  const { selectSection } = useContext(SectionContext);

  const {
    transactions,
    getTopSpendingCategory,
    addTransaction,
    getExpenseCategories,
    acctBalance,
  } = useContext(TransactionContext);

  const { beginLoad, endLoad } = useContext(LoadingContext);

  const topSpend = getTopSpendingCategory();

  function Fund() {
    beginLoad("Loading");
    setTimeout(() => {
      addTransaction({
        date: new Date().toISOString().split("T")[0],
        description: "Monthly Income",
        category: "Salary",
        type: "income",
        amount: 3000,
      });
      endLoad(true);
    }, 5000);
  }

  const descriptionRef = useRef("");
  const [acctNo, setAcctNo] = useState("");
  const amountRef = useRef("");
  const categoryRef = useRef("");

  function sanitizeAcctNo(value, length) {
    return value.replace(/[^0-9]/g, "").slice(0, length);
  }

  function sanitizeInput(value) {
    return value.replace(/[^a-zA-Z0-9 ]/g, "");
  }

  function sendFund() {
    toggleSendScreen(false);
    beginLoad("Loading");

    const transaction = {
      date: new Date().toISOString().split("T")[0],
      description: sanitizeInput(descriptionRef.current.value),
      category: categoryRef.current.value,
      type: "expense",
      amount: -1 * Number(amountRef.current.value),
    };

    setTimeout(() => {
      addTransaction(transaction);
      endLoad(true);
    }, 5000);
  }

  return (
    <div className="homepage-container">
      <div className="balance-card">
        <p className="labels">Total Balance</p>
        <p className="balance-amount">
          ₦
          {transactions
            .reduce((accum, entry) => accum + entry.amount, 0)
            .toLocaleString()}
        </p>
        <div className="inc-exp">
          <div className="income">
            <p className="labels">Income</p>
            <span>
              ₦
              {transactions
                .reduce((accum, entry) => accum + Math.max(0, entry.amount), 0)
                .toLocaleString()}
            </span>
          </div>
          <div className="expense">
            <p className="labels">Expenses</p>
            <span>
              ₦
              {Math.abs(
                transactions.reduce(
                  (accum, entry) => accum + Math.min(0, entry.amount),
                  0,
                ),
              ).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="transact">
        <div className="transact-options">
          <button
            className="transact-button"
            onClick={() => {
              toggleSendScreen(true);
            }}
          >
            <Send /> Send Cash
          </button>
          <button className="transact-button" onClick={Fund}>
            <BanknoteArrowDown /> Fund Wallet
          </button>
        </div>
      </div>

      <div className="recent-transactions">
        <div className="head">
          <p className="header-text">Recent Transactions</p>
          <div className="all" onClick={() => selectSection(1)}>
            View all Transactions →
          </div>
        </div>
        <div className="transactions">
          {transactions.toReversed().map(
            (entry, index) =>
              index < 3 && (
                <div className="transaction">
                  <div className="details">
                    <div
                      className={`icon ${entry.amount > 0 ? "credit" : "debit"}`}
                    >
                      {entry.amount > 0 ? <MoveDown /> : <MoveUp />}
                    </div>
                    <div>
                      <p className="name">{entry.description}</p>
                      <p className="date">{entry.date}</p>
                    </div>
                  </div>
                  <div
                    className={`amt ${entry.amount > 0 ? "credit" : "debit"}`}
                  >
                    {entry.amount < 0 && "-"}₦
                    {Math.abs(entry.amount).toLocaleString()}
                  </div>
                </div>
              ),
          )}
        </div>
      </div>

      <div className="summary">
        <div className="head">
          <p className="header-text">Analytics Summary</p>
        </div>
        <div className="summary-container">
          <div className="summary-entry">
            <p className="labels">Total Income</p>
            <p className="summary-value">
              ₦
              {transactions
                .reduce((accum, entry) => accum + Math.max(0, entry.amount), 0)
                .toLocaleString()}
            </p>
            <p className="labels">All income transactions</p>
          </div>

          <div className="summary-entry">
            <p className="labels">Total Expenses</p>
            <p className="summary-value">
              ₦
              {Math.abs(
                transactions.reduce(
                  (accum, entry) => accum + Math.min(0, entry.amount),
                  0,
                ),
              ).toLocaleString()}
            </p>
            <p className="labels">All expense transactions</p>
          </div>

          <div className="summary-entry">
            <p className="labels">Most Spent On</p>
            <p className="summary-value">{topSpend.category}</p>
            <p className="labels">₦{topSpend.total.toLocaleString()} spent</p>
          </div>

          <div className="summary-entry">
            <p className="labels">Transaction Count</p>
            <p className="summary-value">{transactions.length}</p>
            <p className="labels">Total transactions</p>
          </div>
        </div>
      </div>

      {sendScreenActive && (
        <div className="send-screen" onClick={() => toggleSendScreen(false)}>
          <div className="send-card" onClick={(e) => e.stopPropagation()}>
            <p className="send-card-head">Send Funds</p>
            <form action={sendFund}>
              <label>
                Amount
                <input
                  type="number"
                  ref={amountRef}
                  placeholder="Enter amount..."
                  required
                  max={acctBalance()}
                  min={0}
                />
              </label>
              <label>
                Account Number
                <input
                  type="number"
                  value={acctNo}
                  placeholder="Enter account nuber..."
                  required
                  onBeforeInput={(e) => {
                    if (/[^0-9]/.test(e.data)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    setAcctNo(sanitizeAcctNo(e.target.value, 10));
                  }}
                />
              </label>
              <label>
                Description
                <input
                  type="text"
                  ref={descriptionRef}
                  placeholder="Enter description..."
                  required
                />
              </label>
              <label>
                Category
                <select name="" id="" ref={categoryRef}>
                  {getExpenseCategories().map((entry) => (
                    <option value={entry}>{entry}</option>
                  ))}
                </select>
              </label>
              <button>Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;

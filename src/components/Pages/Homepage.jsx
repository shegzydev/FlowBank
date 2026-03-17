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
    getCategories,
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
  const amountRef = useRef("");
  const categoryRef = useRef("");

  function sendFund() {
    toggleSendScreen(false);
    beginLoad("Loading");

    const transaction = {
      date: new Date().toISOString().split("T")[0],
      description: descriptionRef.current.value,
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
    <>
      <div className="balance-card">
        <p>Total Balance</p>
        <p className="balance-amount">
          ₦
          {transactions
            .reduce((accum, entry) => accum + entry.amount, 0)
            .toLocaleString()}
        </p>
        <div className="inc-exp">
          <div className="income">
            <p>Income</p>
            <p>
              ₦
              {transactions
                .reduce((accum, entry) => accum + Math.max(0, entry.amount), 0)
                .toLocaleString()}
            </p>
          </div>
          <div className="expense">
            <p>Expenses</p>
            <p>
              ₦
              {Math.abs(
                transactions.reduce(
                  (accum, entry) => accum + Math.min(0, entry.amount),
                  0,
                ),
              ).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="transact">
        <p className="header-text">Transact</p>
        <div className="transact-options">
          <button
            className="transact-button"
            onClick={() => {
              toggleSendScreen(true);
            }}
          >
            <Send /> Send Money
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
              index < 2 && (
                <div className="transaction">
                  <div className="details">
                    <div className="icon">
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
        <p className="header-text">Analytics Summary</p>
        <div className="summary-container">
          <div className="summary-entry">
            <p>Total Income</p>
            <p className="summary-value">
              ₦
              {transactions
                .reduce((accum, entry) => accum + Math.max(0, entry.amount), 0)
                .toLocaleString()}
            </p>
            <p>All income transactions</p>
          </div>

          <div className="summary-entry">
            <p>Total Expenses</p>
            <p className="summary-value">
              ₦
              {Math.abs(
                transactions.reduce(
                  (accum, entry) => accum + Math.min(0, entry.amount),
                  0,
                ),
              ).toLocaleString()}
            </p>
            <p>All expense transactions</p>
          </div>

          <div className="summary-entry">
            <p>Most Spent On</p>
            <p className="summary-value">{topSpend.category}</p>
            <p>₦{topSpend.total.toLocaleString()} spent</p>
          </div>

          <div className="summary-entry">
            <p>Transaction Count</p>
            <p className="summary-value">{transactions.length}</p>
            <p>Total transactions</p>
          </div>
        </div>
      </div>

      {sendScreenActive && (
        <div className="send-screen">
          <div className="send-card">
            <p className="send-card-head">Send Funds</p>
            <label>
              Enter Amount
              <input type="number" ref={amountRef} />
            </label>
            <label>
              Enter Description
              <input type="text" ref={descriptionRef} />
            </label>
            <label>
              Choose Category
              <select name="" id="" ref={categoryRef}>
                {getCategories().map((entry) => (
                  <option value={entry}>{entry}</option>
                ))}
              </select>
            </label>
            <button onClick={sendFund}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Homepage;

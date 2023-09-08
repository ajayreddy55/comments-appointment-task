import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TableMoneyItem from "./income";
import "./index.css";

const MoneyManagerApp = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalBalance, setTotalBalance] = useState(totalIncome - totalExpenses);
  const [incomeTitle, setIncomeTitle] = useState("");
  const [amountValueInput, setAmountValueInput] = useState("");
  const [incomeTypeInputValue, setIncomeTypeInputValue] = useState("INCOME");
  const [incomeDetailsList, setIncomeDetailsList] = useState([]);

  const changeTheIncomeTitle = (event) => {
    setIncomeTitle(event.target.value);
  };

  const changeAmountInputValue = (event) => {
    setAmountValueInput(event.target.value);
  };

  const changeTheIncomeTypeInput = (event) => {
    setIncomeTypeInputValue(event.target.value);
  };

  const submitTheIncomeDetails = (event) => {
    event.preventDefault();
    if (incomeTitle !== "" && amountValueInput !== "") {
      const incomeObject = {
        id: uuidv4(),
        incomeTitle,
        amountValue: amountValueInput,
        incomeType: incomeTypeInputValue,
      };
      if (incomeTypeInputValue === "INCOME") {
        setTotalIncome((prevIncome) => prevIncome + parseInt(amountValueInput));
        setTotalBalance(
          (prevBalance) => prevBalance + parseInt(amountValueInput)
        );
      } else if (incomeTypeInputValue === "EXPENSES") {
        setTotalExpenses(
          (prevExpenses) => prevExpenses + parseInt(amountValueInput)
        );
        setTotalBalance((prevBalance) => prevBalance - amountValueInput);
      }
      setIncomeDetailsList((prevList) => [...prevList, incomeObject]);
      setIncomeTitle("");
      setAmountValueInput("");
    }
  };

  const deleteTheListItem = (id) => {
    const deletedItem = incomeDetailsList.find(
      (eachItem) => eachItem.id === id
    );
    if (deletedItem.incomeType === "INCOME") {
      setTotalIncome(
        (prevIncome) => prevIncome - parseInt(deletedItem.amountValue)
      );
      setTotalBalance(
        (prevBalance) => prevBalance - parseInt(deletedItem.amountValue)
      );
    } else if (deletedItem.incomeType === "EXPENSES") {
      setTotalExpenses(
        (prevExpenses) => prevExpenses - parseInt(deletedItem.amountValue)
      );
      setTotalBalance(
        (prevBalance) => prevBalance + parseInt(deletedItem.amountValue)
      );
    }
    setIncomeDetailsList((prevList) =>
      prevList.filter((eachItem) => eachItem.id !== id)
    );
  };

  return (
    <div className="money-bg-container">
      <div className="money-manager-profile-container">
        <h1 className="money-profile-name">Hi, Richard</h1>
        <p className="money-profile-text">
          Welcome back to your{" "}
          <span className="money-profile-text-span">Money Manager</span>
        </p>
      </div>
      <div className="d-flex align-items-stretch mt-3 mb-3 justify-content-between">
        <div className="money-balance-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
            alt="balance"
            className="money-image"
          />
          <div className="d-flex flex-column justify-content-center ml-3">
            <p className="money-balance-text">Your Balance</p>
            <h3 className="money-balance-amount">Rs {totalBalance}</h3>
          </div>
        </div>
        <div className="money-income-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
            alt="income"
            className="money-image"
          />
          <div className="d-flex flex-column justify-content-center ml-3">
            <p className="money-balance-text">Your Income</p>
            <h3 className="money-balance-amount">Rs {totalIncome}</h3>
          </div>
        </div>
        <div className="money-expenses-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
            alt="expenses"
            className="money-image"
          />
          <div className="d-flex flex-column justify-content-center ml-3">
            <p className="money-balance-text">Your Expenses</p>
            <h3 className="money-balance-amount">Rs {totalExpenses}</h3>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-stretch mt-4 mb-4 justify-content-between">
        <form className="money-input-card" onSubmit={submitTheIncomeDetails}>
          <h1 className="money-add-transaction-heading">Add Transaction</h1>
          <div className="d-flex flex-column justify-content-center mt-2 mb-2">
            <label className="money-input-label" htmlFor="moneyTitle">
              TITLE
            </label>
            <input
              type="text"
              placeholder="TITLE"
              className="money-title-input"
              id="moneyTitle"
              value={incomeTitle}
              onChange={changeTheIncomeTitle}
            />
          </div>
          <div className="d-flex flex-column justify-content-center mt-2 mb-2">
            <label className="money-input-label" htmlFor="moneyAmount">
              AMOUNT
            </label>
            <input
              type="text"
              placeholder="AMOUNT"
              className="money-title-input"
              id="moneyAmount"
              value={amountValueInput}
              onChange={changeAmountInputValue}
            />
          </div>
          <div className="d-flex flex-column justify-content-center mt-2 mb-2">
            <label className="money-input-label" htmlFor="moneyType">
              TYPE
            </label>
            <select
              className="money-title-input"
              id="moneyType"
              onChange={changeTheIncomeTypeInput}
            >
              <option
                value={"INCOME"}
                className="money-select-options"
                selected
              >
                Income
              </option>
              <option value={"EXPENSES"} className="money-select-options">
                Expenses
              </option>
            </select>
          </div>
          <button
            className="btn btn-primary mt-2 mb-2 align-self-start"
            type="submit"
          >
            Add
          </button>
        </form>
        <div className="money-details-table-container">
          <h1 className="money-history-heading">History</h1>
          <table className="money-table-container">
            <tr className="money-table-row-main">
              <th className="money-table-header-text">Title</th>
              <th className="money-table-header-text">Amount</th>
              <th className="money-table-header-text">Type</th>
            </tr>
            {incomeDetailsList.map((eachIncome) => (
              <TableMoneyItem
                key={eachIncome.id}
                incomeDetails={eachIncome}
                deleteTheListItem={deleteTheListItem}
              />
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default MoneyManagerApp;

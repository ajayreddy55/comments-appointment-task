import "./index.css";

const TableMoneyItem = (props) => {
  const { incomeDetails, deleteTheListItem } = props;
  const { id, incomeTitle, amountValue, incomeType } = incomeDetails;

  const deleteTheItem = () => {
    deleteTheListItem(id);
  };

  return (
    <tr className="money-income-item-list">
      <td className="money-list-income-text">{incomeTitle}</td>
      <td className="money-list-income-text">{amountValue}</td>
      <td className="money-list-income-text">{incomeType}</td>
      <td className="money-list-income-text">
        <button className="money-delete-button-list" onClick={deleteTheItem}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="money-income-delete-icon"
          />
        </button>
      </td>
    </tr>
  );
};

export default TableMoneyItem;

// Write your code here

const TransactionItem = props => {
  const {item, deleteTransaction} = props

  const onClickDeleteBtn = () => {
    console.log(item.type)
    deleteTransaction(item.id)
  }

  return (
    <li>
      <p>{item.title}</p>
      <p>Rs {item.amount}</p>
      <p>{item.type}</p>
      <button data-testid="delete" type="button" onClick={onClickDeleteBtn}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem

// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {totalBalance, totalIncome, totalExpenses} = props
  return (
    <div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
        />
        <div>
          <p>Your Balance</p>
          <p data-testid="balanceAmount">Rs {totalBalance}</p>
        </div>
      </div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
        />
        <div>
          <p>Your Income</p>
          <p data-testid="incomeAmount">Rs {totalIncome}</p>
        </div>
      </div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
        />
        <div>
          <p>Your Expenses</p>
          <p data-testid="expensesAmount">Rs {totalExpenses}</p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails

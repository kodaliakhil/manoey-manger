import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import './index.css'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]
const initialTransactionDetailsList = [
  //   {
  //     id: uuidv4(),
  //     title: 'Salary',
  //     amount: 50000,
  //     type: 'Income',
  //   },
  //   {
  //     id: uuidv4(),
  //     title: 'Salary',
  //     amount: 50000,
  //     type: 'Income',
  //   },
  //   {
  //     id: uuidv4(),
  //     title: 'Salary',
  //     amount: 50000,
  //     type: 'Income',
  //   },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    transactionDetailsList: initialTransactionDetailsList,
    title: '',
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    amountEntered: '',
    typeSelected: transactionTypeOptions[0].displayText,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountEntered: parseInt(event.target.value)})
  }

  onChangeType = event => {
    this.setState({typeSelected: event.target.value})
  }

  getDetailsAndUpdate = event => {
    event.preventDefault()
    const {title, amountEntered, typeSelected} = this.state
    const newTransactionDetails = {
      id: uuidv4(),
      title,
      amount: amountEntered,
      type: typeSelected,
    }
    if (typeSelected === 'Income') {
      this.setState(prevSate => ({
        totalBalance: prevSate.totalBalance + amountEntered,
        totalIncome: prevSate.totalIncome + amountEntered,
      }))
    } else {
      this.setState(prevSate => ({
        totalBalance: prevSate.totalBalance - amountEntered,
        totalExpenses: prevSate.totalExpenses + amountEntered,
      }))
    }

    this.setState(prevSate => ({
      transactionDetailsList: [
        ...prevSate.transactionDetailsList,
        newTransactionDetails,
      ],
      title: '',
      amountEntered: '',
      typeSelected: transactionTypeOptions[0].displayText,
    }))
  }

  deleteTransaction = id => {
    const {transactionDetailsList} = this.state
    const deletedTransaction = transactionDetailsList.filter(
      eachItem => eachItem.id === id,
    )
    console.log(deletedTransaction[0])

    if (transactionDetailsList.length === 1) {
      this.setState({
        totalBalance: 0,
        totalIncome: 0,
        totalExpenses: 0,
      })
    } else if (deletedTransaction[0].type === 'Income') {
      this.setState(prevSate => ({
        totalBalance: prevSate.totalBalance - deletedTransaction[0].amount,
        totalIncome: prevSate.totalBalance - deletedTransaction[0].amount,
      }))
    } else if (deletedTransaction[0].type === 'Expenses') {
      this.setState(prevSate => ({
        totalExpenses: prevSate.totalExpenses - deletedTransaction[0].amount,
        totalBalance: prevSate.totalBalance + deletedTransaction[0].amount,
      }))
    }
    this.setState(prevSate => ({
      transactionDetailsList: prevSate.transactionDetailsList.filter(
        eachItem => eachItem.id !== id,
      ),
    }))
  }

  render() {
    const {
      title,
      amountEntered,
      typeSelected,
      transactionDetailsList,
      totalBalance,
      totalIncome,
      totalExpenses,
    } = this.state

    console.log(totalExpenses)
    return (
      <div>
        <div>
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <div>
          <MoneyDetails
            totalBalance={totalBalance}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
          />
        </div>
        <form>
          <h3>Add Transaction</h3>
          <label htmlFor="title-input">TITLE</label>
          <input
            placeholder="TITLE"
            id="title-input"
            onChange={this.onChangeTitle}
            value={title}
          />
          <label htmlFor="amount-input">AMOUNT</label>
          <input
            placeholder="AMOUNT"
            id="amount-input"
            onChange={this.onChangeAmount}
            value={amountEntered}
          />
          <select onChange={this.onChangeType} value={typeSelected}>
            {transactionTypeOptions.map(eachItem => (
              <option key={eachItem.optionId}>{eachItem.displayText}</option>
            ))}
          </select>
          <button type="submit" onClick={this.getDetailsAndUpdate}>
            Add
          </button>
        </form>
        <div>
          <h3>History</h3>
          <ul>
            <li>
              <p>Title</p>
              <p>Amount</p>
              <p>Type</p>
            </li>
            {transactionDetailsList.map(eachItem => (
              <TransactionItem
                item={eachItem}
                key={eachItem.id}
                deleteTransaction={this.deleteTransaction}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default MoneyManager

const transactionsUL = document.querySelector('#transactions')
const expenseDisplay = document.querySelector('#money-minus')
const incomeDisplay = document.querySelector('#money-plus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')


const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : []

//Vamos adicionar as transações ao dom

const removeTransaction = ID => {
    transactions = transactions.filter(transaction =>
        transaction.id !== ID)
    updateLocalStorage()
    init()
}

const addTransactionIntoDom = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')
    

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${transaction.name}
        <span>${operator}R$${amountWithoutOperator}</span>
        <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
            x
        </button>
    `
    transactionsUL.append(li)
}

const updateBalanceValues = () => {
    const transactionsAmounts = transactions
        .map(transaction => transaction.amount)
    const total = transactionsAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2)
    const income =transactionsAmounts
        .filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)
    const expense = Math.abs(transactionsAmounts
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)
        )

    balanceDisplay.textContent = `R$${total}`
    incomeDisplay.textContent = `R$${income}`
    expenseDisplay.textContent = `R$${expense}`
}

const init = () => {
    transactionsUL.innerHTML = ''
    transactions.forEach(addTransactionIntoDom)
    updateBalanceValues()
}
init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = Math.round(Math.random() * 1000000)

form.addEventListener('submit', event => {
    event.preventDefault()
    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()

    if (transactionName === '' || transactionAmount === '') {
        alert('Por favor, preencha todos os campos')
        return
    }

    const transaction = { 
        id: generateID,
        name: transactionName,
        amount: Number(transactionAmount)
     }

    
    transactions.push(transaction)
    init()
    updateLocalStorage()

    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
})
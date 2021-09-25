const transactionsUL = document.querySelector('#transactions')


const dummyTransactions = [
    { id: 1, name: 'Digispark ar1', amount: -20 },
    { id: 2, name: 'Bateria', amount: 300 },
    { id: 3, name: 'Controle', amount: -10 },
    { id: 4, name: 'Camera', amount: 150 }
]

//Vamos adicionar as transações ao dom

const addTransactionIntoDom = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')
    

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${transaction.name} <span> ${operator}R$${amountWithoutOperator}</span> <button class="delete-btn">x</button>
    `
    transactionsUL.append(li)
}

const updateBalanceValues = () => {
    const transactionsAmounts = dummyTransactions
        .map(transaction => transaction.amount)
    const total = transactionsAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
            .toFixed(2)
    const income =transactionsAmounts
        .filter(value => value > 0)
            .reduce((accumulator, value) => accumulator + value, 0)
                .toFixed(2)
    const expense =transactionsAmounts
    .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0)
            .toFixed(2)
    console.log(total)
    console.log(income)
    console.log(expense)
}

const init = () => {
    dummyTransactions.forEach(addTransactionIntoDom)
    updateBalanceValues()
}
init()
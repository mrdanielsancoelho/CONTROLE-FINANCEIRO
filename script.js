const dummyTransactions = [
    { id: 1, name: 'digispark ar1', amount: -20 },
    { id: 2, name: 'digispark ar2', amount: 300 },
    { id: 3, name: 'digispark ar3', amount: -10 },
    { id: 4, name: 'digispark ar4', amount: 150 }
]

//Vamos adicionar as transações ao dom

const addTransactionIntoDom = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    console.log(operator) 

    // < li class="minus" >
    //     Salário <span> -$400</span> <button class="delete-btn">x</button>
    // </li>
}

addTransactionIntoDom(dummyTransactions(0))
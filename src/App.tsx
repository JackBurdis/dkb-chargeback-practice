import './App.css'
import { TransactionItem } from "./components/TransactionItem"
import { transactions } from "./data/transactions"

function App() {
  return (<>
    <header>
      <p>
        Monopoly Bank
      </p>
    </header>
    <main>
      <h1>
        Dispute a transaction
      </h1>
      <section>
        <h2>
          Recent transactions
        </h2>
        <ul>
          <TransactionItem transaction={transactions[0]}/>
        </ul>
      </section>
    </main>
  </>)

}

export default App

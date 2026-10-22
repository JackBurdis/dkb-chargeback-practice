import './App.css'
import { useState } from "react"
import { TransactionItem } from "./components/TransactionItem"
import { transactions } from "./data/transactions"

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
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
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} onSelect={() => setSelectedId(transaction.id)}/>
          ))}
        </ul>
        <p>Selected: {selectedId}</p>
      </section>
    </main>
  </>)

}

export default App

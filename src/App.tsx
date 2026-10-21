import './App.css'

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
          <li className='transaction'>
            <div>
              <p className="merchant">IV Coffee Station</p>
              <p className="details"> 18 Oct 2026 · •••• 4532 </p>
            </div>
            <p className='amount'>£12.50</p>
          </li>
          <li className='transaction'>
            <div>
              <p className="merchant">Pizza by the Slice</p>
              <p className="details"> 18 Oct 2026 · •••• 4532 </p>
            </div>
            <p className='amount'>£1.99</p>
          </li>
          <li className='transaction'>
            <div>
              <p className="merchant">Unicycle Repair</p>
              <p className="details"> 18 Oct 2026 · •••• 4532 </p>
            </div>
            <p className='amount'>£40.49</p>
          </li>
        </ul>
      </section>
    </main>
  </>)

}

export default App

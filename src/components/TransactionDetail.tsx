import type { Transaction } from "../types/transaction";
import { formatMoney } from "../utils/formatMoney";
import { canDispute } from "../utils/canDispute";

type TransactionDetailProps = {
    transaction: Transaction;
}

export function TransactionDetail({ transaction }: TransactionDetailProps) {

    const check = canDispute(transaction, new Date());

    return (
        <div>
            <h2>
                Transaction Details
            </h2>
            <section className="transaction-detail card">
                <p>{transaction.merchant}</p>
                <p>{formatMoney(transaction.amountCents)}</p>
                <p>{transaction.date}</p>
                <p>{transaction.cardLast4}</p>
                <dl><dt>Status:</dt><dd>{transaction.status}</dd></dl>
                {transaction.disputeReference && <p>{transaction.disputeReference}</p>}
                {check.allowed ? <button>Start dispute</button> : <p>{check.reason}</p>}
            </section>
        </div>
    );
}
import type { Transaction } from "../types/transaction";
import { formatMoney } from "../utils/formatMoney";

type TransactionItemProps = {
    transaction: Transaction;
    onSelect: () => void;
}

export function TransactionItem({ transaction, onSelect }: TransactionItemProps) {
    return <li className='transaction card'>
        <button onClick={onSelect}>
            <div>
                <p className="merchant">{transaction.merchant}</p>
                <p className="details"> {transaction.date} · •••• {transaction.cardLast4}</p>
            </div>
            <p className='amount'>{formatMoney(transaction.amountCents)}</p>
        </button>
    </li>;
}

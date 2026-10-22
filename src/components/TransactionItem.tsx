import type { Transaction } from "../types/transaction";
import { formatMoney } from "../utils/formatMoney";

type TransactionItemProps = {
    transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
    return <li className='transaction'>
        <div>
            <p className="merchant">{transaction.merchant}</p>
            <p className="details"> {transaction.date} · •••• {transaction.cardLast4}</p>
        </div>
        <p className='amount'>{formatMoney(transaction.amountCents)}</p>
    </li>;
}

import type { Transaction } from "../types/transaction";

export type DisputeCheck = {
    allowed: boolean;
    reason?: string; // only when not allowed: a plain-language explanation
};

const DISPUTE_WINDOW_DAYS = 120;


export function canDispute(transaction: Transaction, today: Date): DisputeCheck {

    const ageInDays = (today.getTime() - new Date(transaction.date).getTime()) / (1000 * 60 * 60 * 24);

    if (transaction.status === "pending") {
        return { allowed: false, reason: "Unfortunately this transaction can't be disputed whilst its still pending." };
    }
    if (transaction.disputeReference) {
        return { allowed: false, reason: "This transaction has already been disputed, please see the dispute reference code below." };
    }

    if (ageInDays > DISPUTE_WINDOW_DAYS) {
        return { allowed: false, reason: "Unfortunately the dispute period for this transaction has expired." }
    }

    return { allowed: true };
}

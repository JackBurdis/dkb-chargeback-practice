export type Transaction = {
    id: string;
    merchant: string;
    amountCents: number;
    date: string; //"YYYY-MM-DD"
    cardLast4: string;
    status: "booked" | "pending";
    disputeReference?: string;
}
import type { Transaction } from "../types/transaction";

export const transactions: Transaction[] = [
    { id: "1", merchant: "Disc Jockeys", amountCents: 2500, date: "2026-10-12", cardLast4: "0232", status: "booked" }
    , { id: "2", merchant: "Space Cadets", amountCents: 3199, date: "2026-10-21", cardLast4: "8951", status: "booked" }
    , { id: "3", merchant: "Chocolate Kettle Co", amountCents: 1399, date: "2026-10-17", cardLast4: "0232", status: "pending" }
    , { id: "4", merchant: "Money Multipliers", amountCents: 10394, date: "2026-10-05", cardLast4: "4135", status: "booked", disputeReference: "DSP-48213" }
    , { id: "5", merchant: "Long Term Jetski Rentals", amountCents: 32330, date: "2026-03-21", cardLast4: "0232", status: "booked" }
    , { id: "6", merchant: "5p Kebab", amountCents: 5, date: "2026-10-21", cardLast4: "0232", status: "booked" }
];

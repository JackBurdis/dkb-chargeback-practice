import { describe, it, expect } from "vitest";
import { canDispute } from "./canDispute";
import type { Transaction } from "../types/transaction";

const today = new Date("2026-10-22");

const base: Transaction = {
    id: "t1",
    merchant: "Test Shop",
    amountCents: 1000,
    date: "2026-10-20",
    cardLast4: "1234",
    status: "booked",
};


describe("canDispute", () => {
    it("recent booked transaction can be disputed", () => {
        expect(canDispute(base, today).allowed).toBe(true);
    });
    it("a pending transaction cant be disputed", () => {
        expect(canDispute({ ...base, status: "pending" }, today).allowed).toBe(false);
    });
    it("an already-disputed transaction cant be disputed", () => {
        expect(canDispute({ ...base, disputeReference: '453-TOP' }, today).allowed).toBe(false);
    });
    it("120 days eaxctly since transaction made, can still be disputed", () => {
        expect(canDispute({ ...base, date: "2026-06-24" }, today).allowed).toBe(true);
    });
    it("over dispute period cant be disputed", () => {
        expect(canDispute({ ...base, date: "2026-06-23" }, today).allowed).toBe(false);
    });
});


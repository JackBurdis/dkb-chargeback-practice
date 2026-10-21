import { describe, it, expect } from "vitest";
import { formatMoney } from "./formatMoney";

describe("formatMoney", () => {
    it("formats 5 cents as 0,05 €", () => {
        expect(formatMoney(5)).toBe("0,05\u00a0€");
    });
    it("formats 0 cents as 0,00 €", () => {
        expect(formatMoney(0)).toBe("0,00\u00a0€");
    });
    it("formats 1999 cents as 19,99 €", () => {
        expect(formatMoney(1999)).toBe("19,99\u00a0€");
    });
    it("formats 123626 cents as 1.236,26 €", () => {
        expect(formatMoney(123626)).toBe("1.236,26\u00a0€");
    });
});
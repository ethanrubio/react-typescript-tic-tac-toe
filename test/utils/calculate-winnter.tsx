import { calculateWinner } from "../../src/utils/calculate-winner";

describe("calculateWinner()", () => {
    it("should return a winner when given the right combo", () => {
        expect(calculateWinner(["x", "x", "x", "o", "o", null, null, null])).toBeTruthy();
    });
});

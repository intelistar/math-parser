import evaluateExpression from "../parsers/evaluate";

describe("evaluateExpression", () => {
  test("should evaluate a simple expression", () => {
    expect(evaluateExpression("3 + 5")).toBe(8);
    expect(evaluateExpression("2 - 9")).toBe(-7);
    expect(evaluateExpression("5 * 2")).toBe(10);
    expect(evaluateExpression("5 / 5")).toBe(1);
    expect(evaluateExpression("0 * 213")).toBe(0);
    expect(evaluateExpression("0 / 1221")).toBe(0);
    expect(evaluateExpression("12 / 0")).toBe(Infinity);
  });

  test("should evaluate an expression with operator precedence", () => {
    expect(evaluateExpression("3 + 5 * 2")).toBe(13);
    expect(evaluateExpression("6 / 3 + 5 - 1")).toBe(6);
    expect(evaluateExpression("1 - 3 / 1 + 5")).toBe(3);
    expect(evaluateExpression("2 * 2 * 3 + 5 * 2")).toBe(22);
  });

  test("should evaluate an expression with parentheses", () => {
    expect(evaluateExpression("(3 + 5) * 2")).toBe(16);
    expect(evaluateExpression("(5 - 3 * (2 + 2) - 2) / 3")).toBe(-3);
    expect(evaluateExpression("3 * (4 + 1) / (4 - 1)")).toBe(5);
  });

  test("should evaluate a complex expression", () => {
    expect(evaluateExpression("10 + 2 * (6 - 4) / 2")).toBe(12);
    expect(evaluateExpression("0 / 10 + 3 * (2 + 1)")).toBe(9);
    expect(evaluateExpression("(1 - 3 * 2) / 5")).toBe(-1);
    expect(evaluateExpression("(1000 / 10 + 200 * (1 + 1) - 300) * 10")).toBe(
      2000
    );
    expect(evaluateExpression("(6 + 2 / 2) * 0 / 5")).toBe(0);
  });

  test("should throw an error for unsupported operators", () => {
    expect(() => evaluateExpression("3 % 2")).toThrow("Unknown symbol: %");
    expect(() => evaluateExpression("3 ! 2")).toThrow("Unknown symbol: !");
    expect(() => evaluateExpression("3 & 2")).toThrow("Unknown symbol: &");
    expect(() => evaluateExpression("3 ? 2")).toThrow("Unknown symbol: ?");
    expect(() => evaluateExpression("3 ^ 2")).toThrow("Unknown symbol: ^");
    expect(() => evaluateExpression("3 ^ 2")).toThrow("Unknown symbol: ^");
  });

  test("should evaluate a complex expression with comments", () => {
    expect(
      evaluateExpression(`1 + //cjcb 
      1) *2`)
    ).toBe(4);

    expect(
      evaluateExpression(`(3  //cjcb 
      -5) *//fsfs
      2 - 3`)
    ).toBe(-7);

    expect(
      evaluateExpression(`(3  /*cjcb 
      -5) - 6 * 7
      2 - 3**/ + 5) / 2`)
    ).toBe(4);

    expect(
      evaluateExpression(`(3  //cjcb + 54
        + 3) * 2`)
    ).toBe(12);
  });

  test("should evaluate expressions with multiple parentheses", () => {
    expect(evaluateExpression("((2 + 3) * 4) - 5")).toBe(15);
    expect(evaluateExpression("(3 + (2 * (5 - 1)))")).toBe(11);
    expect(evaluateExpression("(((2 + 3) * 4) - 5) / 3")).toBe(5);
    expect(evaluateExpression("(2 + (3 + 2 * (2 + 3 * (1 + 1)))) / 7")).toBe(3);
  });

  test("should handle edge cases with single numbers", () => {
    expect(evaluateExpression("42")).toBe(42);
    expect(evaluateExpression("0")).toBe(0);
    expect(evaluateExpression("102")).toBe(102);
    expect(evaluateExpression("34311343")).toBe(34311343);
  });

  test("should handle nested parentheses and operator precedence", () => {
    expect(evaluateExpression("((1 + 2) * (3 - 1) + 4) / 2")).toBe(5);
    expect(evaluateExpression("((1 + 2) * (3 - 1) + 4) / ((2 - 3) + 1)")).toBe(
      Infinity
    );
    expect(evaluateExpression("((5 + 5) / (1 + 1) - (1 + 3)) * 6")).toBe(6);
  });
});

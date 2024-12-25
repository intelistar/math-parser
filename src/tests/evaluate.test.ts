import evaluateExpression from "../parsers/evaluate";

describe("evaluateExpression", () => {
  test("should evaluate a simple expression", () => {
    expect(evaluateExpression("3 + 5")).toBe(8);
  });

  test("should evaluate an expression with operator precedence", () => {
    expect(evaluateExpression("3 + 5 * 2")).toBe(13);
  });

  test("should evaluate an expression with parentheses", () => {
    expect(evaluateExpression("(3 + 5) * 2")).toBe(16);
  });

  test("should evaluate a complex expression", () => {
    expect(evaluateExpression("10 + 2 * (6 - 4) / 2")).toBe(12);
  });

  test("should throw an error for unsupported operators", () => {
    expect(() => evaluateExpression("3 % 2")).toThrow("Unknown symbol: %");
  });

  // test("should evaluate expressions with negative numbers", () => {
  //   expect(evaluateExpression("-3 + 5")).toBe(2);
  //   expect(evaluateExpression("-3 * (2 + 4)")).toBe(-18);
  // });

  test("should evaluate expressions with multiple parentheses", () => {
    expect(evaluateExpression("((2 + 3) * 4) - 5")).toBe(15);
    expect(evaluateExpression("(3 + (2 * (5 - 1)))")).toBe(11);
  });

  test("should handle edge cases with single numbers", () => {
    expect(evaluateExpression("42")).toBe(42);
    expect(evaluateExpression("0")).toBe(0);
  });

  test("should handle division and multiplication by zero", () => {
    expect(evaluateExpression("0 * 42")).toBe(0);
    expect(() => evaluateExpression("42 / 0")).toBe("Infinity");
  });

  test("should handle nested parentheses and operator precedence", () => {
    expect(evaluateExpression("((1 + 2) * (3 - 1) + 4) / 2")).toBe(5);
  });

  test("should throw an error for mismatched parentheses", () => {
    expect(() => evaluateExpression("(3 + 5")).toThrow(
      "Mismatched parentheses"
    );
    expect(() => evaluateExpression("3 + 5)")).toThrow(
      "Mismatched parentheses"
    );
  });
});

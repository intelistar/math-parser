import Lexer from "../parsers/Lexer";
import TokenType from "../parsers/TokenType";

describe("Lexer", () => {
  test("should tokenize a simple expression", () => {
    const lexer = new Lexer("3 + 5 * (10 - 2)");
    const tokens = lexer.tokenize();

    expect(tokens).toEqual([
      { type: TokenType.Number, value: "3" },
      { type: TokenType.Operator, value: "+" },
      { type: TokenType.Number, value: "5" },
      { type: TokenType.Operator, value: "*" },
      { type: TokenType.Parenthesis, value: "(" },
      { type: TokenType.Number, value: "10" },
      { type: TokenType.Operator, value: "-" },
      { type: TokenType.Number, value: "2" },
      { type: TokenType.Parenthesis, value: ")" },
    ]);
  });
});

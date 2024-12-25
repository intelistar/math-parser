import Lexer from "./Lexer";
import Parser from "./Parser";

export default function evaluateExpression(expression: string): number {
  const lexer = new Lexer(expression);
  const tokens = lexer.tokenize();
  const parser = new Parser(tokens);
  return parser.parseExpression();
}

import Token from "./Token";
import TokenType from "./TokenType";

export default class Parser {
  private tokens: Token[];
  private position: number;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.position = 0;
  }

  private currentToken(): Token | null {
    return this.position < this.tokens.length
      ? this.tokens[this.position]
      : null;
  }

  // Skip current token
  private consume(): void {
    this.position++;
  }

  // Main parse method
  public parseExpression(): number {
    const stack: number[] = [];
    const operators: string[] = [];

    while (this.position < this.tokens.length) {
      const token = this.currentToken();

      switch (token!.type) {
        case TokenType.Number: {
          stack.push(parseFloat(token!.value));
          this.consume();
          break;
        }
        case TokenType.Operator: {
          while (
            operators.length > 0 &&
            this.precedence(operators[operators.length - 1]) >=
              this.precedence(token!.value)
          ) {
            this.compute(stack, operators);
          }
          operators.push(token!.value);
          this.consume();
          break;
        }
        case TokenType.Parenthesis: {
          if (token!.value === "(") {
            operators.push(token!.value);
          } else {
            while (
              operators.length > 0 &&
              operators[operators.length - 1] !== "("
            ) {
              this.compute(stack, operators);
            }
            operators.pop(); // Удаляем "("
          }
          this.consume();
          break;
        }
      }
    }

    while (operators.length > 0) {
      this.compute(stack, operators);
    }

    return stack.pop()!;
  }

  private compute(stack: number[], operators: string[]): void {
    const b = stack.pop()!;
    const a = stack.pop()!;
    const operator = operators.pop()!;

    switch (operator) {
      case "+":
        stack.push(a + b);
        break;
      case "-":
        stack.push(a - b);
        break;
      case "*":
        stack.push(a * b);
        break;
      case "/":
        stack.push(a / b);
        break;
      default:
        throw new Error(`Unknown operator: ${operator}`);
    }
  }

  // Priority operator
  private precedence(operator: string): number {
    switch (operator) {
      case "(":
        return 0;
      case "+":
      case "-":
        return 1;
      case "*":
      case "/":
        return 2;
      default:
        throw new Error(`Unknown operator: ${operator}`);
    }
  }
}

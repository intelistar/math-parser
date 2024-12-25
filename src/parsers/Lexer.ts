import Token from "./Token";
import TokenType from "./TokenType";

// Разбиение строки на токены
export default class Lexer {
  private input: string;
  private position: number;

  constructor(input: string) {
    this.input = input;
    this.position = 0;
  }

  // Проверка на конец выражения
  private isEnd(): boolean {
    return this.position >= this.input.length;
  }

  private skipWhitespace(): void {
    while (!this.isEnd() && /\s/.test(this.input[this.position])) {
      this.position++;
    }
  }

  private skipComment(): void {
    // Skip oneline comments
    if (this.input.startsWith("//", this.position)) {
      this.position += 2; // Skip //
      while (!this.isEnd() && this.input[this.position] !== "\n") {
        this.position++;
      }
    } else if (this.input.startsWith("/*", this.position)) {
      // Skip manylines comments
      this.position += 2; // Skip /*
      while (!this.isEnd() && !this.input.startsWith("*/", this.position)) {
        this.position++;
      }
      this.position += 2; // Skip */
    }
  }

  private isNumber(char: string): boolean {
    return /[0-9\.]/.test(char);
  }
  private parseNumber(): string {
    let number = "";
    while (!this.isEnd() && this.isNumber(this.input[this.position])) {
      number += this.input[this.position++];
    }
    return number;
  }

  private isOperator(char: string): boolean {
    return /[-+*/]/.test(char);
  }

  private isParenthesis(char: string): boolean {
    return /[()]/.test(char);
  }

  private debugPosition(): void {
    console.log(
      `Position: ${this.position}, Current char: ${
        this.input[this.position] || "EOF"
      }`
    );
  }

  // Получение следующего токена
  public nextToken(): Token | null {
    this.skipWhitespace();

    if (this.isEnd()) return null;

    const char = this.input[this.position];
    //console.log(this.input[this.position]);

    //Comments
    if (
      this.input.startsWith("//", this.position) ||
      this.input.startsWith("/*", this.position)
    ) {
      this.skipComment();
      return this.nextToken();
    }
    // Numbers
    if (this.isNumber(char)) {
      return { type: TokenType.Number, value: this.parseNumber() };
    }

    // Operators
    if (this.isOperator(char)) {
      this.position++;
      return { type: TokenType.Operator, value: char };
    }

    // Parenthesis
    if (this.isParenthesis(char)) {
      this.position++;
      return { type: TokenType.Parenthesis, value: char };
    }
    throw new Error(`Unknown symbol: ${char}`);
  }

  public tokenize(): Token[] {
    const tokens: Token[] = [];
    let token = this.nextToken();

    while (token !== null) {
      tokens.push(token);
      token = this.nextToken();
    }

    return tokens;
  }
}

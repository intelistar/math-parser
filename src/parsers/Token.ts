import TokenType from "./TokenType";

// Интерфейс токена
export default interface Token {
  type: TokenType;
  value: string;
}

import { useState } from "react";
import styles from "./App.module.css";
import evaluateExpression from "./parsers/evaluate";

const App = () => {
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string | number>("");

  const handleParse = () => {
    try {
      const result = evaluateExpression(expression);
      setResult(result);
    } catch (error) {
      setResult(
        `Ошибка: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.header}>Parser</h1>
      <div className={styles.container}>
        <textarea
          className={styles.textarea}
          placeholder="enter expression"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
        />
        <button className={styles.button} onClick={handleParse}>
          Выполнить
        </button>
        <div className={styles.result}>
          <strong>Result:</strong> {result}
        </div>
      </div>
    </div>
  );
};

export default App;

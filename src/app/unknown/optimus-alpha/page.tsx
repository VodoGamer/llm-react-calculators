"use client";

import React, { useState } from "react";

type Operator = "+" | "-" | "×" | "÷" | null;

const buttons = [
  ["C", "±", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

const isOperator = (val: string) => ["+", "-", "×", "÷"].includes(val);

const formatNumber = (num: number) =>
  num.toLocaleString(undefined, { maximumFractionDigits: 8 });

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>("0");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [operator, setOperator] = useState<Operator>(null);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit === "." ? "0." : digit);
      setWaitingForOperand(false);
    } else {
      if (digit === "." && display.includes(".")) return;
      setDisplay(display === "0" && digit !== "." ? digit : display + digit);
    }
  };

  const clear = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    setDisplay(
      display.charAt(0) === "-"
        ? display.slice(1)
        : display !== "0"
        ? "-" + display
        : display
    );
  };

  const inputPercent = () => {
    const value = parseFloat(display);
    if (!isNaN(value)) {
      setDisplay(String(value / 100));
    }
  };

  const performOperation = (nextOperator: Operator) => {
    const inputValue = parseFloat(display);

    if (operator && firstOperand !== null && !waitingForOperand) {
      let result = firstOperand;
      switch (operator) {
        case "+":
          result += inputValue;
          break;
        case "-":
          result -= inputValue;
          break;
        case "×":
          result *= inputValue;
          break;
        case "÷":
          result = inputValue === 0 ? NaN : result / inputValue;
          break;
      }
      setDisplay(isNaN(result) ? "Error" : formatNumber(result));
      setFirstOperand(isNaN(result) ? null : result);
    } else {
      setFirstOperand(inputValue);
    }
    setOperator(nextOperator);
    setWaitingForOperand(true);
  };

  const handleButtonClick = (val: string) => {
    if (!isNaN(Number(val)) || val === ".") {
      inputDigit(val);
    } else if (isOperator(val)) {
      performOperation(val as Operator);
    } else if (val === "=") {
      performOperation(null);
      setOperator(null);
    } else if (val === "C") {
      clear();
    } else if (val === "±") {
      toggleSign();
    } else if (val === "%") {
      inputPercent();
    }
  };

  // Keyboard support
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key >= "0" && e.key <= "9") ||
        e.key === "." ||
        e.key === "Enter" ||
        e.key === "=" ||
        e.key === "+" ||
        e.key === "-" ||
        e.key === "*" ||
        e.key === "/" ||
        e.key === "%" ||
        e.key === "Escape"
      ) {
        e.preventDefault();
        switch (e.key) {
          case "Enter":
          case "=":
            handleButtonClick("=");
            break;
          case "+":
            handleButtonClick("+");
            break;
          case "-":
            handleButtonClick("-");
            break;
          case "*":
            handleButtonClick("×");
            break;
          case "/":
            handleButtonClick("÷");
            break;
          case "%":
            handleButtonClick("%");
            break;
          case "Escape":
            handleButtonClick("C");
            break;
          default:
            handleButtonClick(e.key);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line
  }, [display, operator, firstOperand, waitingForOperand]);

  return (
    <div
      className="
        max-w-xs mx-auto mt-10 p-4 rounded-3xl shadow-lg
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-800
        transition-colors
      "
      aria-label="Calculator"
    >
      <div
        className="
          mb-4 h-16 flex items-end justify-end
          rounded-xl px-4 py-2
          bg-gray-100 dark:bg-gray-800
          shadow-sm
          text-3xl font-mono text-gray-900 dark:text-gray-100
          select-all
          border border-gray-200 dark:border-gray-700
        "
        aria-live="polite"
        data-testid="display"
      >
        {display}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {buttons.flat().map((btn, idx) => (
          <button
            key={btn + idx}
            onClick={() => handleButtonClick(btn)}
            className={`
              h-14 rounded-2xl flex items-center justify-center
              text-lg font-semibold
              shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-400
              transition
              ${btn === "0" ? "col-span-2" : "col-span-1"}
              ${
                isOperator(btn)
                  ? "bg-blue-500 text-white dark:bg-blue-600 dark:text-white border border-blue-600 dark:border-blue-500"
                  : btn === "="
                  ? "bg-green-500 text-white dark:bg-green-600 dark:text-white border border-green-600 dark:border-green-500"
                  : "bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-600"
              }
              hover:shadow-md
              active:scale-95
            `}
            aria-label={btn}
            tabIndex={0}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;

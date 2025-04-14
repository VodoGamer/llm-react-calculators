"use client";
import React, { useState } from "react";

type Operator = "+" | "-" | "*" | "/" | null;

const buttons = [
  ["C", "±", "%", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

const isOperator = (val: string) =>
  val === "+" || val === "-" || val === "*" || val === "/";

const formatNumber = (num: string) => {
  if (num === "") return "0";
  const [int, dec] = num.split(".");
  return (
    parseInt(int, 10).toLocaleString() + (dec !== undefined ? "." + dec : "")
  );
};

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>("0");
  const [firstOperand, setFirstOperand] = useState<string | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay((prev) =>
        prev === "0" ? digit : prev.length < 12 ? prev + digit : prev
      );
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clearAll = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    setDisplay((prev) =>
      prev.charAt(0) === "-" ? prev.slice(1) : prev !== "0" ? "-" + prev : prev
    );
  };

  const inputPercent = () => {
    setDisplay((prev) => (parseFloat(prev) / 100).toString());
  };

  const performOperation = (nextOperator: Operator) => {
    const inputValue = parseFloat(display);

    if (operator && firstOperand !== null) {
      const prevValue = parseFloat(firstOperand);
      let result = 0;
      switch (operator) {
        case "+":
          result = prevValue + inputValue;
          break;
        case "-":
          result = prevValue - inputValue;
          break;
        case "*":
          result = prevValue * inputValue;
          break;
        case "/":
          result = inputValue === 0 ? NaN : prevValue / inputValue;
          break;
      }
      setDisplay(
        isNaN(result) || !isFinite(result)
          ? "Error"
          : result.toString().slice(0, 12)
      );
      setFirstOperand(result.toString());
    } else {
      setFirstOperand(display);
    }
    setOperator(nextOperator);
    setWaitingForOperand(true);
  };

  const handleButtonClick = (val: string) => {
    if (!isNaN(Number(val))) {
      inputDigit(val);
    } else if (isOperator(val)) {
      performOperation(val as Operator);
    } else if (val === ".") {
      inputDot();
    } else if (val === "C") {
      clearAll();
    } else if (val === "±") {
      toggleSign();
    } else if (val === "%") {
      inputPercent();
    } else if (val === "=") {
      performOperation(null);
      setOperator(null);
      setFirstOperand(null);
      setWaitingForOperand(true);
    }
  };

  // Keyboard support
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key >= "0" && e.key <= "9") ||
        e.key === "." ||
        isOperator(e.key)
      ) {
        handleButtonClick(e.key);
      } else if (e.key === "Enter" || e.key === "=") {
        handleButtonClick("=");
      } else if (e.key === "Backspace") {
        setDisplay((prev) =>
          prev.length > 1 ? prev.slice(0, -1) : "0"
        );
      } else if (e.key === "Escape") {
        clearAll();
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
        bg-white dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-700
        transition-colors
      "
      aria-label="Calculator"
    >
      <div
        className="
          mb-4 h-16 flex items-end justify-end px-4
          rounded-xl bg-zinc-100 dark:bg-zinc-800
          shadow-inner
          text-3xl font-mono text-zinc-900 dark:text-zinc-100
          select-all
        "
        aria-live="polite"
        data-testid="display"
      >
        {formatNumber(display)}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {buttons.flat().map((btn, idx) => (
          <button
            key={btn + idx}
            className={`
              h-14 rounded-2xl flex items-center justify-center
              text-lg font-semibold
              shadow-sm
              border
              transition
              focus:outline-none focus:ring-2 focus:ring-blue-400
              ${
                btn === "="
                  ? "col-span-2 bg-blue-500 dark:bg-blue-600 text-white border-blue-500 dark:border-blue-600 shadow-md"
                  : btn === "C"
                  ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 border-red-200 dark:border-red-700"
                  : isOperator(btn)
                  ? "bg-zinc-200 dark:bg-zinc-700 text-blue-600 dark:text-blue-300 border-zinc-300 dark:border-zinc-600"
                  : "bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-700"
              }
              ${btn === "0" ? "col-span-2" : ""}
              hover:shadow-md active:scale-95
            `}
            onClick={() => handleButtonClick(btn)}
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

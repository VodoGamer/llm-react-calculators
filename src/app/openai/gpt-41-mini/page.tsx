"use client";

import React, { useState, useEffect, useRef } from "react";

type Operator = "+" | "-" | "*" | "/";

const buttons = [
  { label: "C", type: "action" },
  { label: "/", type: "operator" },
  { label: "*", type: "operator" },
  { label: "-", type: "operator" },
  { label: "7", type: "number" },
  { label: "8", type: "number" },
  { label: "9", type: "number" },
  { label: "+", type: "operator" },
  { label: "4", type: "number" },
  { label: "5", type: "number" },
  { label: "6", type: "number" },
  { label: "=", type: "equal" },
  { label: "1", type: "number" },
  { label: "2", type: "number" },
  { label: "3", type: "number" },
  { label: "0", type: "number" },
  { label: ".", type: "number" },
];

const isOperator = (val: string): val is Operator =>
  val === "+" || val === "-" || val === "*" || val === "/";

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>("0");
  const [operator, setOperator] = useState<Operator | null>(null);
  const [firstOperand, setFirstOperand] = useState<string | null>(null);
  const [waitingForSecond, setWaitingForSecond] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);

  // Evaluate expression safely
  const calculate = (
    first: number,
    second: number,
    op: Operator
  ): number | string => {
    switch (op) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "*":
        return first * second;
      case "/":
        return second === 0 ? "Error" : first / second;
      default:
        return second;
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setOperator(null);
    setFirstOperand(null);
    setWaitingForSecond(false);
  };

  const handleNumber = (num: string) => {
    if (waitingForSecond) {
      setDisplay(num === "." ? "0." : num);
      setWaitingForSecond(false);
    } else {
      if (num === "." && display.includes(".")) return;
      setDisplay(display === "0" && num !== "." ? num : display + num);
    }
  };

  const handleOperator = (op: Operator) => {
    if (operator && waitingForSecond) {
      setOperator(op);
      return;
    }

    if (firstOperand === null) {
      setFirstOperand(display);
    } else if (operator) {
      const result = calculate(
        parseFloat(firstOperand),
        parseFloat(display),
        operator
      );
      setDisplay(String(result));
      setFirstOperand(String(result));
    }

    setOperator(op);
    setWaitingForSecond(true);
  };

  const handleEqual = () => {
    if (operator && firstOperand !== null && !waitingForSecond) {
      const result = calculate(
        parseFloat(firstOperand),
        parseFloat(display),
        operator
      );
      setDisplay(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecond(false);
    }
  };

  const handleButtonClick = (label: string) => {
    if (label === "C") {
      handleClear();
    } else if (isOperator(label)) {
      handleOperator(label);
    } else if (label === "=") {
      handleEqual();
    } else {
      handleNumber(label);
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key >= "0" && e.key <= "9") ||
        e.key === "." ||
        e.key === "+" ||
        e.key === "-" ||
        e.key === "*" ||
        e.key === "/"
      ) {
        e.preventDefault();
        if (isOperator(e.key)) {
          handleOperator(e.key);
        } else {
          handleNumber(e.key);
        }
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        handleEqual();
      } else if (e.key === "Backspace") {
        e.preventDefault();
        if (display.length > 1) {
          setDisplay(display.slice(0, -1));
        } else {
          setDisplay("0");
        }
      } else if (e.key.toLowerCase() === "c") {
        e.preventDefault();
        handleClear();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [display, operator, firstOperand, waitingForSecond]);

  return (
    <div
      className="w-full max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-900 rounded-2xl
      shadow-md dark:shadow-lg border border-gray-200 dark:border-gray-700"
      role="region"
      aria-label="Calculator"
    >
      <div
        ref={inputRef}
        className="w-full h-20 mb-6 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl
        text-right text-4xl font-mono text-gray-900 dark:text-gray-100 select-none
        shadow-inner border border-gray-300 dark:border-gray-700"
        aria-live="polite"
        aria-atomic="true"
      >
        {display}
      </div>
      <div
        className="grid grid-cols-4 gap-4"
        role="group"
        aria-label="Calculator buttons"
      >
        {buttons.map(({ label, type }) => {
          const isAction = type === "action";
          const isOperatorBtn = type === "operator" || type === "equal";

          return (
            <button
              key={label}
              type="button"
              onClick={() => handleButtonClick(label)}
              className={`
                rounded-lg
                shadow-sm
                border border-gray-300 dark:border-gray-700
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                transition-colors duration-150
                select-none
                ${
                  isAction
                    ? "bg-red-100 dark:bg-red-700 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-600"
                    : isOperatorBtn
                    ? "bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-600"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
                }
                ${label === "0" ? "col-span-2" : ""}
                py-4
                text-xl
                font-semibold
                active:scale-95
                active:shadow-inner
              `}
              aria-label={
                label === "C"
                  ? "Clear"
                  : label === "="
                  ? "Equals"
                  : isOperator(label)
                  ? `Operator ${label}`
                  : `Number ${label}`
              }
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calculator;

"use client";
// Calculator.tsx
import React, { useState } from "react";

type Operator = "+" | "-" | "*" | "/";

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>("0");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [waitingForSecond, setWaitingForSecond] = useState<boolean>(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecond) {
      setDisplayValue(digit);
      setWaitingForSecond(false);
    } else {
      setDisplayValue((prev) => (prev === "0" ? digit : prev + digit));
    }
  };

  const inputDot = () => {
    if (waitingForSecond) {
      setDisplayValue("0.");
      setWaitingForSecond(false);
    } else if (!displayValue.includes(".")) {
      setDisplayValue((prev) => prev + ".");
    }
  };

  const clearAll = () => {
    setDisplayValue("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecond(false);
  };

  const performOperation = (
    nextOperator: Operator,
    prev: number,
    next: number
  ) => {
    switch (nextOperator) {
      case "+":
        return prev + next;
      case "-":
        return prev - next;
      case "*":
        return prev * next;
      case "/":
        return next === 0 ? 0 : prev / next;
      default:
        return next;
    }
  };

  const handleOperator = (nextOp: Operator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performOperation(operator, firstOperand, inputValue);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setOperator(nextOp);
    setWaitingForSecond(true);
  };

  const handleEqual = () => {
    if (operator && firstOperand !== null) {
      const inputValue = parseFloat(displayValue);
      const result = performOperation(operator, firstOperand, inputValue);
      setDisplayValue(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecond(true);
    }
  };

  const createDigitButton = (digit: string) => (
    <button
      onClick={() => inputDigit(digit)}
      className="
        flex justify-center items-center
        p-4 bg-white dark:bg-gray-700
        text-lg md:text-xl font-medium
        rounded-md shadow-sm
        border border-gray-200 dark:border-gray-600
        hover:bg-gray-100 dark:hover:bg-gray-600
        active:scale-95 transition
      "
      aria-label={`Digit ${digit}`}
    >
      {digit}
    </button>
  );

  return (
    <div
      className="w-full max-w-xs mx-auto my-8 p-4
      bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100
      rounded-lg shadow-lg"
    >
      <div
        className="
          mb-4 p-4 h-16
          bg-white dark:bg-gray-700
          rounded-sm border-b border-gray-300 dark:border-gray-600
          text-right text-2xl md:text-3xl font-semibold
          overflow-x-auto
        "
        data-testid="display"
      >
        {displayValue}
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={clearAll}
          className="
            col-span-2 p-4
            bg-red-100 dark:bg-red-700
            text-red-800 dark:text-red-200
            rounded-md shadow-sm
            border border-red-200 dark:border-red-600
            hover:bg-red-200 dark:hover:bg-red-600
            active:scale-95 transition
          "
        >
          C
        </button>
        <button
          onClick={() => handleOperator("/")}
          className="
            p-4 bg-blue-100 dark:bg-blue-700
            text-blue-800 dark:text-blue-200
            rounded-md shadow-sm
            border border-blue-200 dark:border-blue-600
            hover:bg-blue-200 dark:hover:bg-blue-600
            active:scale-95 transition
          "
        >
          ÷
        </button>
        <button
          onClick={() => handleOperator("*")}
          className="
            p-4 bg-blue-100 dark:bg-blue-700
            text-blue-800 dark:text-blue-200
            rounded-md shadow-sm
            border border-blue-200 dark:border-blue-600
            hover:bg-blue-200 dark:hover:bg-blue-600
            active:scale-95 transition
          "
        >
          ×
        </button>

        {["7", "8", "9"].map((d) => createDigitButton(d))}
        <button
          onClick={() => handleOperator("-")}
          className="
            p-4 bg-blue-100 dark:bg-blue-700
            text-blue-800 dark:text-blue-200
            rounded-md shadow-sm
            border border-blue-200 dark:border-blue-600
            hover:bg-blue-200 dark:hover:bg-blue-600
            active:scale-95 transition
          "
        >
          −
        </button>

        {["4", "5", "6"].map((d) => createDigitButton(d))}
        <button
          onClick={() => handleOperator("+")}
          className="
            p-4 bg-blue-100 dark:bg-blue-700
            text-blue-800 dark:text-blue-200
            rounded-md shadow-sm
            border border-blue-200 dark:border-blue-600
            hover:bg-blue-200 dark:hover:bg-blue-600
            active:scale-95 transition
          "
        >
          +
        </button>

        {["1", "2", "3"].map((d) => createDigitButton(d))}
        <button
          onClick={handleEqual}
          className="
            row-span-2 p-4
            bg-green-100 dark:bg-green-700
            text-green-800 dark:text-green-200
            rounded-md shadow-sm
            border border-green-200 dark:border-green-600
            hover:bg-green-200 dark:hover:bg-green-600
            active:scale-95 transition
          "
        >
          =
        </button>

        {createDigitButton("0")}
        <button
          onClick={inputDot}
          className="
            p-4 bg-white dark:bg-gray-700
            text-lg md:text-xl font-medium
            rounded-md shadow-sm
            border border-gray-200 dark:border-gray-600
            hover:bg-gray-100 dark:hover:bg-gray-600
            active:scale-95 transition
          "
        >
          .
        </button>
      </div>
    </div>
  );
};

export default Calculator;

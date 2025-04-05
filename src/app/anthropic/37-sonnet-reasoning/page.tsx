"use client";

import { useCallback, useState, useEffect } from "react";

type Operation = "+" | "-" | "×" | "÷" | null;

export default function Claude37SonnetReasoning() {
  const [displayValue, setDisplayValue] = useState<string>("0");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] =
    useState<boolean>(false);
  const [history, setHistory] = useState<string>("");

  // Format numbers with commas for better readability
  const formatNumber = (num: string): string => {
    if (num === "0") return num;
    const [integerPart, decimalPart] = num.split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decimalPart
      ? `${formattedInteger}.${decimalPart}`
      : formattedInteger;
  };

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === "0" ? digit : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplayValue("0.");
      setWaitingForSecondOperand(false);
      return;
    }

    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  const clearAll = () => {
    setDisplayValue("0");
    setFirstOperand(null);
    setOperation(null);
    setWaitingForSecondOperand(false);
    setHistory("");
  };

  const toggleSign = () => {
    setDisplayValue(String(-parseFloat(displayValue)));
  };

  const inputPercent = () => {
    const value = parseFloat(displayValue);
    setDisplayValue(String(value / 100));
  };

  const handleOperation = (nextOperation: Operation) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
      setHistory(`${displayValue} ${nextOperation}`);
    } else if (operation) {
      const result = calculate(firstOperand, inputValue, operation);
      setDisplayValue(String(result));
      setFirstOperand(result);
      setHistory(`${result} ${nextOperation}`);
    }

    setWaitingForSecondOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (
    firstOperand: number,
    secondOperand: number,
    operation: Operation
  ): number => {
    switch (operation) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "×":
        return firstOperand * secondOperand;
      case "÷":
        return secondOperand === 0 ? NaN : firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const performCalculation = () => {
    if (firstOperand === null || operation === null) {
      return;
    }

    const inputValue = parseFloat(displayValue);
    const result = calculate(firstOperand, inputValue, operation);

    setHistory(`${firstOperand} ${operation} ${inputValue} =`);
    setDisplayValue(String(result));
    setFirstOperand(result);
    setOperation(null);
    setWaitingForSecondOperand(false);
  };

  // Keyboard support
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;

      // Prevent default for calculator keys to avoid scrolling
      if (
        /\d/.test(key) ||
        ["+", "-", "*", "/", "Enter", "Escape", ".", "%", "Backspace"].includes(
          key
        )
      ) {
        event.preventDefault();
      }

      if (/\d/.test(key)) {
        inputDigit(key);
      } else if (key === ".") {
        inputDecimal();
      } else if (key === "Escape") {
        clearAll();
      } else if (key === "Backspace") {
        // Handle backspace to delete the last character
        if (displayValue.length > 1 && !waitingForSecondOperand) {
          setDisplayValue(displayValue.slice(0, -1));
        } else {
          setDisplayValue("0");
        }
      } else if (key === "+") {
        handleOperation("+");
      } else if (key === "-") {
        handleOperation("-");
      } else if (key === "*") {
        handleOperation("×");
      } else if (key === "/") {
        handleOperation("÷");
      } else if (key === "%") {
        inputPercent();
      } else if (key === "Enter" || key === "=") {
        performCalculation();
      }
    },
    [displayValue, firstOperand, operation, waitingForSecondOperand]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="mx-auto max-w-xs overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
      {/* Calculator display */}
      <div className="bg-gray-50 p-4 transition-colors duration-300 dark:bg-gray-900">
        <div className="mb-1 h-6 overflow-x-auto text-right text-xs whitespace-nowrap text-gray-500 dark:text-gray-400">
          {history}
        </div>
        <div className="flex h-16 items-end justify-end">
          <div className="scrollbar-hide overflow-x-auto text-3xl font-medium text-gray-800 dark:text-gray-100">
            {isNaN(parseFloat(displayValue))
              ? "Error"
              : formatNumber(displayValue)}
          </div>
        </div>
      </div>

      {/* Calculator buttons */}
      <div className="grid grid-cols-4 gap-2 bg-white p-3 transition-colors duration-300 dark:bg-gray-800">
        {/* Row 1 */}
        <button
          onClick={clearAll}
          className="col-span-1 h-14 rounded-xl bg-gray-200 font-medium text-red-500 transition-all hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:scale-95 dark:bg-gray-700 dark:text-red-400 dark:hover:bg-gray-600"
        >
          AC
        </button>
        <button
          onClick={toggleSign}
          className="col-span-1 h-14 rounded-xl bg-gray-200 font-medium text-gray-800 transition-all hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:scale-95 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          +/-
        </button>
        <button
          onClick={inputPercent}
          className="col-span-1 h-14 rounded-xl bg-gray-200 font-medium text-gray-800 transition-all hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:scale-95 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          %
        </button>
        <button
          onClick={() => handleOperation("÷")}
          className={`col-span-1 h-14 rounded-xl ${
            operation === "÷"
              ? "bg-white text-amber-500 ring-2 ring-amber-500 dark:bg-gray-600 dark:text-amber-400 dark:ring-amber-400"
              : "bg-amber-500 text-white dark:bg-amber-600"
          } font-medium transition-all hover:bg-amber-600 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none active:scale-95 dark:hover:bg-amber-700`}
        >
          ÷
        </button>

        {/* Row 2 */}
        <button
          onClick={() => inputDigit("7")}
          className="col-span-1 h-14 rounded-xl bg-gray-100 font-medium text-gray-800 transition-all hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:scale-95 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
        >
          7
        </button>
        <button
          onClick={() => inputDigit("8")}
          className="col-span-1 h-14 rounded-xl bg-gray-100 font-medium text-gray-800 transition-all hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:scale-95 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
        >
          8
        </button>
        <button
          onClick={() => inputDigit("9")}
          className="col-span-1 h-14 rounded-xl bg-gray-100 font-medium text-gray-800 transition-all hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:scale-95 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
        >
          9
        </button>
        <button
          onClick={() => handleOperation("×")}
          className={`col-span-1 h-14 rounded-xl ${
            operation === "×"
              ? "bg-white text-amber-500 ring-2 ring-amber-500 dark:bg-gray-600 dark:text-amber-400 dark:ring-amber-400"
              : "bg-amber-500 text-white dark:bg-amber-600"
          } font-medium transition-all hover:bg-amber-600 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none active:scale-95 dark:hover:bg-amber-700`}
        >
          ×
        </button>

        {/* Row 3 */}
        <button
          onClick={() => inputDigit("4")}
          className="col-span-1 h-14 rounded-xl bg-gray-100 font-medium text-gray-800 transition-all hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:scale-95 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
        >
          4
        </button>
        <button
          onClick={() => inputDigit("5")}
          className="col-span-1 h-14 rounded-xl bg-gray-100 font-medium text-gray-800 transition-all hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:scale-95 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
        >
          5
        </button>
        <button
          onClick={() => inputDigit("6")}
          className="col-span-1 h-14 rounded-xl bg-gray-100 font-medium text-gray-800 transition-all hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:scale-95 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
        >
          6
        </button>
        <button
          onClick={() => handleOperation("-")}
          className={`col-span-1 h-14 rounded-xl ${
            operation === "-"
              ? "bg-white text-amber-500 ring-2 ring-amber-500 dark:bg-gray-600 dark:text-amber-400 dark:ring-amber-400"
              : "bg-amber-500 text-white dark:bg-amber-600"
          } font-medium transition-all hover:bg-amber-600 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none active:scale-95 dark:hover:bg-amber-700`}
        >
          -
        </button>

        {/* Row 4 */}
        <button
          onClick={() => inputDigit("1")}
          className="col-span-1 h-14 rounded-xl bg-gray-100 font-medium text-gray-800 transition-all hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:scale-95 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
        >
          1
        </button>
        <button
          onClick={() => inputDigit("2")}
          className="col-span-1 h-14 rounded-xl bg-gray-100 font-medium text-gray-800 transition-all hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:scale-95 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
        >
          2
        </button>
        <button
          onClick={() => inputDigit("3")}
          className="col-span-1 h-14 rounded-xl bg-gray-100 font-medium text-gray-800 transition-all hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:scale-95 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
        >
          3
        </button>
        <button
          onClick={() => handleOperation("+")}
          className={`col-span-1 h-14 rounded-xl ${
            operation === "+"
              ? "bg-white text-amber-500 ring-2 ring-amber-500 dark:bg-gray-600 dark:text-amber-400 dark:ring-amber-400"
              : "bg-amber-500 text-white dark:bg-amber-600"
          } font-medium transition-all hover:bg-amber-600 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none active:scale-95 dark:hover:bg-amber-700`}
        >
          +
        </button>

        {/* Row 5 */}
        <button
          onClick={() => inputDigit("0")}
          className="col-span-2 h-14 rounded-xl bg-gray-100 font-medium text-gray-800 transition-all hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:scale-95 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
        >
          0
        </button>
        <button
          onClick={inputDecimal}
          className="col-span-1 h-14 rounded-xl bg-gray-100 font-medium text-gray-800 transition-all hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:scale-95 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
        >
          .
        </button>
        <button
          onClick={performCalculation}
          className="col-span-1 h-14 rounded-xl bg-amber-500 font-medium text-white transition-all hover:bg-amber-600 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none active:scale-95 dark:bg-amber-600 dark:hover:bg-amber-700"
        >
          =
        </button>
      </div>
    </div>
  );
}

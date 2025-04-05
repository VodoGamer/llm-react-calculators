"use client";

import { useState, useEffect } from "react";

type Operation = "+" | "-" | "×" | "÷" | null;

export default function Claude37Sonnet() {
  const [display, setDisplay] = useState<string>("0");
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [pendingOperation, setPendingOperation] = useState<Operation>(null);
  const [isNewInput, setIsNewInput] = useState<boolean>(true);
  const [memory, setMemory] = useState<number>(0);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/[0-9]/.test(e.key)) {
        handleNumberInput(e.key);
      } else if (e.key === ".") {
        handleDecimalInput();
      } else if (["+", "-"].includes(e.key)) {
        handleOperationInput(e.key as Operation);
      } else if (e.key === "*") {
        handleOperationInput("×");
      } else if (e.key === "/") {
        handleOperationInput("÷");
      } else if (e.key === "Enter" || e.key === "=") {
        handleEqualsInput();
      } else if (e.key === "Escape") {
        handleClearInput();
      } else if (e.key === "Backspace") {
        handleBackspace();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [display, currentValue, pendingOperation, isNewInput]);

  const handleNumberInput = (num: string) => {
    if (isNewInput) {
      setDisplay(num);
      setIsNewInput(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleDecimalInput = () => {
    if (isNewInput) {
      setDisplay("0.");
      setIsNewInput(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperationInput = (op: Operation) => {
    const value = parseFloat(display);

    if (pendingOperation === null) {
      setCurrentValue(value);
    } else {
      const result = performCalculation(currentValue, value, pendingOperation);
      setDisplay(formatResult(result));
      setCurrentValue(result);
    }

    setPendingOperation(op);
    setIsNewInput(true);
  };

  const handleEqualsInput = () => {
    if (pendingOperation === null) return;

    const value = parseFloat(display);
    const result = performCalculation(currentValue, value, pendingOperation);

    setDisplay(formatResult(result));
    setCurrentValue(result);
    setPendingOperation(null);
    setIsNewInput(true);
  };

  const handleClearInput = () => {
    setDisplay("0");
    setCurrentValue(0);
    setPendingOperation(null);
    setIsNewInput(true);
  };

  const handleBackspace = () => {
    if (isNewInput) return;

    if (display.length === 1) {
      setDisplay("0");
      setIsNewInput(true);
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handlePercentage = () => {
    const value = parseFloat(display) / 100;
    setDisplay(formatResult(value));
  };

  const handleToggleSign = () => {
    setDisplay(formatResult(parseFloat(display) * -1));
  };

  const handleMemoryAdd = () => {
    setMemory(memory + parseFloat(display));
  };

  const handleMemoryRecall = () => {
    setDisplay(formatResult(memory));
    setIsNewInput(true);
  };

  const handleMemoryClear = () => {
    setMemory(0);
  };

  const performCalculation = (
    a: number,
    b: number,
    operation: Operation
  ): number => {
    switch (operation) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return b !== 0 ? a / b : NaN;
      default:
        return b;
    }
  };

  const formatResult = (num: number): string => {
    if (isNaN(num)) return "Error";
    if (!isFinite(num)) return "∞";

    // Convert to string and handle potential precision issues
    const result = num.toString();

    // If the number is too long, use scientific notation
    if (result.length > 10) {
      return num.toPrecision(7);
    }

    return result;
  };

  const buttonClass = `
    flex items-center justify-center
    rounded-xl text-lg font-medium
    transition-all duration-150
    active:scale-95 active:opacity-80
    focus:outline-none
  `;

  const numberButtonClass = `
    ${buttonClass}
    bg-gray-100 dark:bg-gray-700
    text-gray-800 dark:text-gray-100
    hover:bg-gray-200 dark:hover:bg-gray-600
    shadow-sm border border-gray-200 dark:border-gray-600
  `;

  const operationButtonClass = `
    ${buttonClass}
    bg-amber-100 dark:bg-amber-900
    text-amber-800 dark:text-amber-100
    hover:bg-amber-200 dark:hover:bg-amber-800
    shadow-sm border border-amber-200 dark:border-amber-800
  `;

  const functionButtonClass = `
    ${buttonClass}
    bg-gray-200 dark:bg-gray-600
    text-gray-700 dark:text-gray-200
    hover:bg-gray-300 dark:hover:bg-gray-500
    shadow-sm border border-gray-300 dark:border-gray-500
  `;

  const equalsButtonClass = `
    ${buttonClass}
    bg-blue-500 dark:bg-blue-600
    text-white
    hover:bg-blue-600 dark:hover:bg-blue-500
    shadow-sm border border-blue-600 dark:border-blue-700
  `;

  return (
    <div
      className={`w-80 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800`}
    >
      {/* Display */}
      <div className="mb-4 rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-inner dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-1 h-4 text-xs text-gray-500 dark:text-gray-400">
          {pendingOperation && `${currentValue} ${pendingOperation}`}
        </div>
        <div className="overflow-hidden text-right text-3xl font-semibold text-gray-800 dark:text-gray-100">
          {display}
        </div>
      </div>

      {/* Memory buttons */}
      <div className="mb-2 grid grid-cols-3 gap-2">
        <button
          onClick={handleMemoryClear}
          className={`${functionButtonClass} text-sm`}
        >
          MC
        </button>
        <button
          onClick={handleMemoryRecall}
          className={`${functionButtonClass} text-sm`}
        >
          MR
        </button>
        <button
          onClick={handleMemoryAdd}
          className={`${functionButtonClass} text-sm`}
        >
          M+
        </button>
      </div>

      {/* Calculator buttons */}
      <div className="grid grid-cols-4 gap-2">
        <button onClick={handleClearInput} className={functionButtonClass}>
          C
        </button>
        <button onClick={handleToggleSign} className={functionButtonClass}>
          ±
        </button>
        <button onClick={handlePercentage} className={functionButtonClass}>
          %
        </button>
        <button
          onClick={() => handleOperationInput("÷")}
          className={operationButtonClass}
        >
          ÷
        </button>

        <button
          onClick={() => handleNumberInput("7")}
          className={numberButtonClass}
        >
          7
        </button>
        <button
          onClick={() => handleNumberInput("8")}
          className={numberButtonClass}
        >
          8
        </button>
        <button
          onClick={() => handleNumberInput("9")}
          className={numberButtonClass}
        >
          9
        </button>
        <button
          onClick={() => handleOperationInput("×")}
          className={operationButtonClass}
        >
          ×
        </button>

        <button
          onClick={() => handleNumberInput("4")}
          className={numberButtonClass}
        >
          4
        </button>
        <button
          onClick={() => handleNumberInput("5")}
          className={numberButtonClass}
        >
          5
        </button>
        <button
          onClick={() => handleNumberInput("6")}
          className={numberButtonClass}
        >
          6
        </button>
        <button
          onClick={() => handleOperationInput("-")}
          className={operationButtonClass}
        >
          -
        </button>

        <button
          onClick={() => handleNumberInput("1")}
          className={numberButtonClass}
        >
          1
        </button>
        <button
          onClick={() => handleNumberInput("2")}
          className={numberButtonClass}
        >
          2
        </button>
        <button
          onClick={() => handleNumberInput("3")}
          className={numberButtonClass}
        >
          3
        </button>
        <button
          onClick={() => handleOperationInput("+")}
          className={operationButtonClass}
        >
          +
        </button>

        <button
          onClick={() => handleNumberInput("0")}
          className={`${numberButtonClass} col-span-2`}
        >
          0
        </button>
        <button onClick={handleDecimalInput} className={numberButtonClass}>
          .
        </button>
        <button onClick={handleEqualsInput} className={equalsButtonClass}>
          =
        </button>
      </div>
    </div>
  );
}

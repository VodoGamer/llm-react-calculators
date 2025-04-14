"use client";

import React, { useState } from "react";

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>("0");
  const [firstValue, setFirstValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecond, setWaitingForSecond] = useState<boolean>(false);

  const handleNumberClick = (num: string) => {
    if (display === "0" || waitingForSecond) {
      setDisplay(num);
      setWaitingForSecond(false);
    } else {
      setDisplay((prev) => prev + num);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecond(false);
  };

  const handleOperatorClick = (op: string) => {
    if (firstValue === null) {
      setFirstValue(parseFloat(display));
    } else if (operator) {
      // Perform previous operation
      const result = performCalculation();
      setFirstValue(result);
      setDisplay(String(result));
    }
    setOperator(op);
    setWaitingForSecond(true);
  };

  const performCalculation = (): number => {
    if (firstValue === null || operator === null) return parseFloat(display);
    const secondValue = parseFloat(display);
    switch (operator) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    if (operator && firstValue !== null) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstValue(null);
      setOperator(null);
      setWaitingForSecond(false);
    }
  };

  const buttons = [
    {
      label: "C",
      onClick: handleClear,
      className: "bg-gray-200 dark:bg-gray-700",
    },
    {
      label: "÷",
      onClick: () => handleOperatorClick("÷"),
      className: "bg-gray-200 dark:bg-gray-700",
    },
    {
      label: "×",
      onClick: () => handleOperatorClick("×"),
      className: "bg-gray-200 dark:bg-gray-700",
    },
    {
      label: "-",
      onClick: () => handleOperatorClick("-"),
      className: "bg-gray-200 dark:bg-gray-700",
    },

    {
      label: "7",
      onClick: () => handleNumberClick("7"),
      className: "bg-gray-100 dark:bg-gray-600",
    },
    {
      label: "8",
      onClick: () => handleNumberClick("8"),
      className: "bg-gray-100 dark:bg-gray-600",
    },
    {
      label: "9",
      onClick: () => handleNumberClick("9"),
      className: "bg-gray-100 dark:bg-gray-600",
    },
    {
      label: "+",
      onClick: () => handleOperatorClick("+"),
      className: "bg-gray-200 dark:bg-gray-700",
    },

    {
      label: "4",
      onClick: () => handleNumberClick("4"),
      className: "bg-gray-100 dark:bg-gray-600",
    },
    {
      label: "5",
      onClick: () => handleNumberClick("5"),
      className: "bg-gray-100 dark:bg-gray-600",
    },
    {
      label: "6",
      onClick: () => handleNumberClick("6"),
      className: "bg-gray-100 dark:bg-gray-600",
    },
    {
      label: "=",
      onClick: handleEquals,
      className: "bg-blue-500 hover:bg-blue-600 text-white",
    },

    {
      label: "1",
      onClick: () => handleNumberClick("1"),
      className: "bg-gray-100 dark:bg-gray-600",
    },
    {
      label: "2",
      onClick: () => handleNumberClick("2"),
      className: "bg-gray-100 dark:bg-gray-600",
    },
    {
      label: "3",
      onClick: () => handleNumberClick("3"),
      className: "bg-gray-100 dark:bg-gray-600",
    },
    {
      label: "0",
      onClick: () => handleNumberClick("0"),
      className: "col-span-2 bg-gray-100 dark:bg-gray-600",
    },

    {
      label: ".",
      onClick: () => handleNumberClick("."),
      className: "bg-gray-100 dark:bg-gray-600",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 font-sans">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        {/* Display */}
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4 shadow-inner border border-gray-300 dark:border-gray-600 text-right text-3xl font-semibold text-gray-900 dark:text-gray-100 overflow-x-auto">
          {display}
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={btn.onClick}
              className={`rounded-lg shadow-sm border border-gray-300 dark:border-gray-600 px-4 py-3 text-lg font-medium transition-transform hover:scale-105 active:scale-95 ${btn.className}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;

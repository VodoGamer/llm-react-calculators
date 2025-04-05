"use client";

import { useState } from "react";

export default function Gemini20Flash() {
  const [displayValue, setDisplayValue] = useState<string>("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);

  const handleNumberClick = (number: string) => {
    if (displayValue === "0") {
      setDisplayValue(number);
    } else {
      setDisplayValue(displayValue + number);
    }
  };

  const handleOperatorClick = (operator: string) => {
    if (operation === null) {
      setPreviousValue(displayValue);
      setOperation(operator);
      setDisplayValue("0");
    } else {
      handleCalculate();
      setPreviousValue(displayValue);
      setOperation(operator);
      setDisplayValue("0");
    }
  };

  const handleDecimalClick = () => {
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  const handleClearClick = () => {
    setDisplayValue("0");
    setPreviousValue(null);
    setOperation(null);
  };

  const handleCalculate = () => {
    if (previousValue && operation) {
      const prev = parseFloat(previousValue);
      const current = parseFloat(displayValue);

      let result: number = 0;

      switch (operation) {
        case "+":
          result = prev + current;
          break;
        case "-":
          result = prev - current;
          break;
        case "*":
          result = prev * current;
          break;
        case "/":
          if (current === 0) {
            alert("Division by zero is not allowed!");
            return;
          }
          result = prev / current;
          break;
        default:
          return;
      }

      setDisplayValue(result.toString());
      setPreviousValue(null);
      setOperation(null);
    }
  };

  const handlePlusMinusClick = () => {
    setDisplayValue((parseFloat(displayValue) * -1).toString());
  };

  const buttons = [
    {
      text: "AC",
      action: handleClearClick,
      className:
        "col-span-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white",
    },
    {
      text: "+/-",
      action: handlePlusMinusClick,
      className: "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white",
    },
    {
      text: "/",
      action: () => handleOperatorClick("/"),
      className: "bg-orange-400 dark:bg-orange-600 text-white",
    },
    {
      text: "7",
      action: () => handleNumberClick("7"),
      className: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white",
    },
    {
      text: "8",
      action: () => handleNumberClick("8"),
      className: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white",
    },
    {
      text: "9",
      action: () => handleNumberClick("9"),
      className: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white",
    },
    {
      text: "*",
      action: () => handleOperatorClick("*"),
      className: "bg-orange-400 dark:bg-orange-600 text-white",
    },
    {
      text: "4",
      action: () => handleNumberClick("4"),
      className: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white",
    },
    {
      text: "5",
      action: () => handleNumberClick("5"),
      className: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white",
    },
    {
      text: "6",
      action: () => handleNumberClick("6"),
      className: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white",
    },
    {
      text: "-",
      action: () => handleOperatorClick("-"),
      className: "bg-orange-400 dark:bg-orange-600 text-white",
    },
    {
      text: "1",
      action: () => handleNumberClick("1"),
      className: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white",
    },
    {
      text: "2",
      action: () => handleNumberClick("2"),
      className: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white",
    },
    {
      text: "3",
      action: () => handleNumberClick("3"),
      className: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white",
    },
    {
      text: "+",
      action: () => handleOperatorClick("+"),
      className: "bg-orange-400 dark:bg-orange-600 text-white",
    },
    {
      text: "0",
      action: () => handleNumberClick("0"),
      className:
        "col-span-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white",
    },
    {
      text: ".",
      action: handleDecimalClick,
      className: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white",
    },
    {
      text: "=",
      action: handleCalculate,
      className: "bg-orange-400 dark:bg-orange-600 text-white",
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-white transition-colors duration-300 ease-in-out dark:bg-gray-900">
      <div className="calculator mx-auto w-64 rounded-2xl bg-white p-4 shadow-md transition-colors duration-300 ease-in-out dark:bg-gray-800">
        <div className="display mb-4 rounded-md bg-gray-100 p-3 text-right text-3xl font-semibold text-gray-800 shadow-inner transition-colors duration-300 ease-in-out dark:bg-gray-700 dark:text-white">
          {displayValue}
        </div>
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.action}
              className={` ${button.className} rounded-md p-3 text-xl font-medium shadow-sm transition-all duration-200 ease-in-out hover:shadow-md focus:ring-2 focus:ring-orange-500 focus:outline-none`}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

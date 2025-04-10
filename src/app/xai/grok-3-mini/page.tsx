"use client";

import React, { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState<string>("0");
  const [expression, setExpression] = useState<string>("");

  const handleButtonClick = (value: string) => {
    if (value === "C") {
      setDisplay("0");
      setExpression("");
      return;
    }

    if (value === "=") {
      try {
        const result = eval(expression); // Evaluate the expression
        setDisplay(result.toString());
        setExpression(result.toString());
      } catch (error) {
        setDisplay("Error");
        setExpression("");
      }
      return;
    }

    // Append value to expression and update display
    const newExpression = expression === "0" ? value : expression + value;
    setExpression(newExpression);
    setDisplay(newExpression);
  };

  return (
    <div className="max-w-xs mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-right text-2xl font-bold text-gray-800 dark:text-gray-200 overflow-hidden">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {["7", "8", "9", "/"].map((btn) => (
          <button
            key={btn}
            onClick={() => handleButtonClick(btn)}
            className="p-4 bg-gray-200 dark:bg-gray-600 rounded-md shadow-sm hover:bg-gray-300 dark:hover:bg-gray-500 active:bg-gray-400 dark:active:bg-gray-700 border border-gray-300 dark:border-gray-500"
          >
            {btn}
          </button>
        ))}
        {["4", "5", "6", "*"].map((btn) => (
          <button
            key={btn}
            onClick={() => handleButtonClick(btn)}
            className="p-4 bg-gray-200 dark:bg-gray-600 rounded-md shadow-sm hover:bg-gray-300 dark:hover:bg-gray-500 active:bg-gray-400 dark:active:bg-gray-700 border border-gray-300 dark:border-gray-500"
          >
            {btn}
          </button>
        ))}
        {["1", "2", "3", "-"].map((btn) => (
          <button
            key={btn}
            onClick={() => handleButtonClick(btn)}
            className="p-4 bg-gray-200 dark:bg-gray-600 rounded-md shadow-sm hover:bg-gray-300 dark:hover:bg-gray-500 active:bg-gray-400 dark:active:bg-gray-700 border border-gray-300 dark:border-gray-500"
          >
            {btn}
          </button>
        ))}
        {["0", ".", "C", "+"].map((btn) => (
          <button
            key={btn}
            onClick={() => handleButtonClick(btn)}
            className="p-4 bg-gray-200 dark:bg-gray-600 rounded-md shadow-sm hover:bg-gray-300 dark:hover:bg-gray-500 active:bg-gray-400 dark:active:bg-gray-700 border border-gray-300 dark:border-gray-500"
          >
            {btn}
          </button>
        ))}
        {["="].map((btn) => (
          <button
            key={btn}
            onClick={() => handleButtonClick(btn)}
            className="col-span-4 p-4 bg-blue-500 dark:bg-blue-600 rounded-md shadow-sm hover:bg-blue-600 dark:hover:bg-blue-700 active:bg-blue-700 dark:active:bg-blue-800 text-white font-bold"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

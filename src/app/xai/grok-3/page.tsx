"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: string | null;
  waitingForSecondOperand: boolean;
}

const Calculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>({
    display: "0",
    previousValue: null,
    operation: null,
    waitingForSecondOperand: false,
  });

  // Handle number button clicks
  const handleNumberClick = (value: string) => {
    if (value === "." && state.display.includes(".")) {
      return; // Do nothing if the display already contains a decimal point
    }
    setState((prev) => ({
      ...prev,
      display:
        prev.display === "0" && value !== "." ? value : prev.display + value,
      waitingForSecondOperand: false,
    }));
  };

  // Handle operation button clicks
  const handleOperationClick = (operation: string) => {
    setState((prev) => ({
      ...prev,
      previousValue: parseFloat(prev.display),
      operation,
      waitingForSecondOperand: true,
    }));
  };

  // Calculate result based on operation
  const calculateResult = () => {
    if (!state.previousValue || !state.operation) return;

    const current = parseFloat(state.display);
    let result = 0;

    switch (state.operation) {
      case "+":
        result = state.previousValue + current;
        break;
      case "-":
        result = state.previousValue - current;
        break;
      case "×":
        result = state.previousValue * current;
        break;
      case "÷":
        if (current === 0) {
          setState({
            display: "Error",
            previousValue: null,
            operation: null,
            waitingForSecondOperand: false,
          });
          return;
        }
        result = state.previousValue / current;
        break;
      default:
        return;
    }

    setState({
      display: result.toString(),
      previousValue: null,
      operation: null,
      waitingForSecondOperand: false,
    });
  };

  // Clear the calculator state
  const handleClear = () => {
    setState({
      display: "0",
      previousValue: null,
      operation: null,
      waitingForSecondOperand: false,
    });
  };

  // Button layout configuration
  const buttons = [
    "7",
    "8",
    "9",
    "÷",
    "4",
    "5",
    "6",
    "×",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "C",
    "+",
    "=",
  ];

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md dark:shadow-gray-700">
      {/* Display */}
      <div className="mb-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl text-right border border-gray-200 dark:border-gray-700 overflow-hidden">
        <span className="text-3xl font-mono font-semibold text-gray-900 dark:text-white truncate">
          {state.display}
        </span>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-3">
        {buttons.map((btn) =>
          btn === "=" ? (
            <Button
              key={btn}
              variant="default"
              className="h-14 text-lg rounded-lg bg-blue-500 hover:bg-blue-600 dark:bg-blue-900 dark:hover:bg-blue-800 transition-colors duration-200 col-span-4"
              onClick={calculateResult}
            >
              {btn}
            </Button>
          ) : btn === "C" ? (
            <Button
              key={btn}
              variant="outline"
              className="h-14 text-lg rounded-lg border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              onClick={handleClear}
            >
              {btn}
            </Button>
          ) : ["÷", "×", "-", "+"].includes(btn) ? (
            <Button
              key={btn}
              variant="outline"
              className={`h-14 text-lg rounded-lg border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 ${
                state.operation === btn && !state.waitingForSecondOperand
                  ? "bg-gray-200 dark:bg-gray-700"
                  : ""
              }`}
              onClick={() => handleOperationClick(btn)}
            >
              {btn}
            </Button>
          ) : (
            <Button
              key={btn}
              variant="outline"
              className="h-14 text-lg rounded-lg border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              onClick={() => handleNumberClick(btn)}
            >
              {btn}
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default Calculator;

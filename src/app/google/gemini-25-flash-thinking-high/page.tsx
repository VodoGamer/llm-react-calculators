"use client";

import React, { useState, useEffect } from "react";

// --- Type Definitions ---
type CalculatorOperation =
  | "+"
  | "-"
  | "*"
  | "/"
  | "="
  | "%"
  | "+/-"
  | "C"
  | ".";

// --- Reusable Button Component ---
interface CalculatorButtonProps {
  label: string;
  onClick: (value: string) => void;
  className?: string; // Optional custom Tailwind classes
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  label,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={() => onClick(label)}
      className={`
        flex items-center justify-center
        p-4 rounded-xl text-2xl font-medium
        shadow-md hover:shadow-lg transition duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-opacity-75
        ${className || ""}
      `}
    >
      {label}
    </button>
  );
};

// --- Main Calculator Component ---
const Calculator: React.FC = () => {
  const [currentInput, setCurrentInput] = useState<string>("0");
  const [previousInput, setPreviousInput] = useState<string | null>(null);
  const [operator, setOperator] = useState<CalculatorOperation | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] =
    useState<boolean>(false);

  // --- Core Calculator Logic ---

  // Handles numeric and decimal point button presses
  const handleNumberClick = (num: string) => {
    // If waiting for a new operand after an operator or equals
    if (waitingForSecondOperand) {
      setCurrentInput(num === "." ? "0." : num); // Start new input, handle leading decimal
      setWaitingForSecondOperand(false);
    } else {
      // Prevent multiple leading zeros (e.g., "007" becomes "7")
      if (currentInput === "0" && num !== ".") {
        setCurrentInput(num);
      }
      // Prevent multiple decimal points
      else if (num === "." && currentInput.includes(".")) {
        return;
      } else {
        setCurrentInput((prev) => prev + num);
      }
    }
  };

  // Handles operator button presses (+, -, *, /)
  const handleOperatorClick = (op: CalculatorOperation) => {
    // If an operator is already set and we're waiting for a second operand,
    // allow changing the operator without performing a calculation first.
    if (operator && waitingForSecondOperand) {
      setOperator(op);
      return;
    }

    if (previousInput === null) {
      // If this is the first operator, store current input as previous
      setPreviousInput(currentInput);
    } else if (currentInput !== "0" || operator === null) {
      // If chaining operations, perform the previous calculation
      // 'currentInput !== "0"' prevents calculating on a fresh '0' after an op
      performCalculation();
      setPreviousInput(currentInput); // After calculation, result becomes previous for next op
    }
    setOperator(op);
    setWaitingForSecondOperand(true); // Signal that the next number will be a new operand
  };

  // Performs the calculation based on stored values
  const performCalculation = () => {
    if (previousInput === null || operator === null) {
      return; // Not enough information to calculate
    }

    let result: number;
    const prev = parseFloat(previousInput);
    const current = parseFloat(current);

    switch (operator) {
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
          setCurrentInput("Error: Div by zero"); // Handle division by zero
          setPreviousInput(null);
          setOperator(null);
          setWaitingForSecondOperand(false);
          return;
        }
        result = prev / current;
        break;
      default:
        return; // Should not happen with defined operations
    }

    // Format the result to avoid floating-point inaccuracies
    // toFixed(10) ensures precision, parseFloat removes trailing zeros
    setCurrentInput(parseFloat(result.toFixed(10)).toString());
    setPreviousInput(null); // Reset previous input after calculation
    setOperator(null); // Reset operator
  };

  // Handles utility button presses (C, %, = , +/-)
  const handleUtilityClick = (util: CalculatorOperation) => {
    switch (util) {
      case "C": // Clear all
        setCurrentInput("0");
        setPreviousInput(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
        break;
      case "%": // Convert to percentage
        setCurrentInput((prev) =>
          parseFloat((parseFloat(prev) / 100).toFixed(10)).toString()
        );
        break;
      case "+/-": // Change sign
        setCurrentInput((prev) =>
          parseFloat((parseFloat(prev) * -1).toFixed(10)).toString()
        );
        break;
      case "=": // Execute calculation
        performCalculation();
        setWaitingForSecondOperand(true); // After equals, next number starts fresh input
        break;
      default:
        break;
    }
  };

  // --- Unified Button Click Handler ---
  const handleButtonClick = (value: string) => {
    if (
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(value)
    ) {
      handleNumberClick(value);
    } else if (["+", "-", "*", "/"].includes(value)) {
      handleOperatorClick(value as CalculatorOperation);
    } else if (["C", "%", "+/-", "="].includes(value)) {
      handleUtilityClick(value as CalculatorOperation);
    }
  };

  // --- Keyboard Support ---
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      if (/[0-9]/.test(key)) {
        handleNumberClick(key);
      } else if (key === ".") {
        handleNumberClick(".");
      } else if (["+", "-", "*", "/"].includes(key)) {
        handleOperatorClick(key as CalculatorOperation);
      } else if (key === "Enter" || key === "=") {
        event.preventDefault(); // Prevent default browser behavior (e.g., form submission)
        handleUtilityClick("=");
      } else if (key === "Backspace") {
        setCurrentInput((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
      } else if (key === "Escape") {
        handleUtilityClick("C");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentInput, previousInput, operator, waitingForSecondOperand]); // Dependencies to re-capture state for handler

  // --- Render UI ---
  return (
    <div
      className="
        flex flex-col items-center justify-center min-h-screen
        bg-gray-100 dark:bg-gray-900
        text-gray-900 dark:text-gray-100
        transition-colors duration-300
      "
    >
      <div
        className="
          w-96 p-6 rounded-2xl shadow-2xl
          bg-white dark:bg-gray-800
          border border-gray-200 dark:border-gray-700
          transition-colors duration-300
        "
      >
        {/* Calculator Display */}
        <div
          className="
            bg-gray-200 dark:bg-gray-700
            p-5 rounded-xl text-right text-5xl font-light mb-6
            shadow-inner border border-gray-300 dark:border-gray-600
            overflow-hidden whitespace-nowrap text-ellipsis
            h-24 flex items-center justify-end
            transition-colors duration-300
          "
        >
          {currentInput}
        </div>

        {/* Calculator Buttons Grid */}
        <div className="grid grid-cols-4 gap-4">
          {/* Row 1: Utility buttons */}
          <CalculatorButton
            label="C"
            onClick={handleButtonClick}
            className="
              col-span-1 bg-gray-400 dark:bg-gray-600
              text-gray-900 dark:text-gray-100
              hover:bg-gray-500 dark:hover:bg-gray-500
              focus:ring-gray-500
            "
          />
          <CalculatorButton
            label="+/-"
            onClick={handleButtonClick}
            className="
              col-span-1 bg-gray-400 dark:bg-gray-600
              text-gray-900 dark:text-gray-100
              hover:bg-gray-500 dark:hover:bg-gray-500
              focus:ring-gray-500
            "
          />
          <CalculatorButton
            label="%"
            onClick={handleButtonClick}
            className="
              col-span-1 bg-gray-400 dark:bg-gray-600
              text-gray-900 dark:text-gray-100
              hover:bg-gray-500 dark:hover:bg-gray-500
              focus:ring-gray-500
            "
          />
          <CalculatorButton
            label="/"
            onClick={handleButtonClick}
            className="
              col-span-1 bg-orange-500 dark:bg-orange-600
              text-white
              hover:bg-orange-600 dark:hover:bg-orange-700
              focus:ring-orange-500
            "
          />

          {/* Row 2: Numbers 7, 8, 9 + Multiply */}
          <CalculatorButton
            label="7"
            onClick={handleButtonClick}
            className="
              bg-gray-300 dark:bg-gray-700
              text-gray-900 dark:text-gray-100
              hover:bg-gray-400 dark:hover:bg-gray-600
              focus:ring-gray-400
            "
          />
          <CalculatorButton
            label="8"
            onClick={handleButtonClick}
            className="
              bg-gray-300 dark:bg-gray-700
              text-gray-900 dark:text-gray-100
              hover:bg-gray-400 dark:hover:bg-gray-600
              focus:ring-gray-400
            "
          />
          <CalculatorButton
            label="9"
            onClick={handleButtonClick}
            className="
              bg-gray-300 dark:bg-gray-700
              text-gray-900 dark:text-gray-100
              hover:bg-gray-400 dark:hover:bg-gray-600
              focus:ring-gray-400
            "
          />
          <CalculatorButton
            label="*"
            onClick={handleButtonClick}
            className="
              col-span-1 bg-orange-500 dark:bg-orange-600
              text-white
              hover:bg-orange-600 dark:hover:bg-orange-700
              focus:ring-orange-500
            "
          />

          {/* Row 3: Numbers 4, 5, 6 + Subtract */}
          <CalculatorButton
            label="4"
            onClick={handleButtonClick}
            className="
              bg-gray-300 dark:bg-gray-700
              text-gray-900 dark:text-gray-100
              hover:bg-gray-400 dark:hover:bg-gray-600
              focus:ring-gray-400
            "
          />
          <CalculatorButton
            label="5"
            onClick={handleButtonClick}
            className="
              bg-gray-300 dark:bg-gray-700
              text-gray-900 dark:text-gray-100
              hover:bg-gray-400 dark:hover:bg-gray-600
              focus:ring-gray-400
            "
          />
          <CalculatorButton
            label="6"
            onClick={handleButtonClick}
            className="
              bg-gray-300 dark:bg-gray-700
              text-gray-900 dark:text-gray-100
              hover:bg-gray-400 dark:hover:bg-gray-600
              focus:ring-gray-400
            "
          />
          <CalculatorButton
            label="-"
            onClick={handleButtonClick}
            className="
              col-span-1 bg-orange-500 dark:bg-orange-600
              text-white
              hover:bg-orange-600 dark:hover:bg-orange-700
              focus:ring-orange-500
            "
          />

          {/* Row 4: Numbers 1, 2, 3 + Add */}
          <CalculatorButton
            label="1"
            onClick={handleButtonClick}
            className="
              bg-gray-300 dark:bg-gray-700
              text-gray-900 dark:text-gray-100
              hover:bg-gray-400 dark:hover:bg-gray-600
              focus:ring-gray-400
            "
          />
          <CalculatorButton
            label="2"
            onClick={handleButtonClick}
            className="
              bg-gray-300 dark:bg-gray-700
              text-gray-900 dark:text-gray-100
              hover:bg-gray-400 dark:hover:bg-gray-600
              focus:ring-gray-400
            "
          />
          <CalculatorButton
            label="3"
            onClick={handleButtonClick}
            className="
              bg-gray-300 dark:bg-gray-700
              text-gray-900 dark:text-gray-100
              hover:bg-gray-400 dark:hover:bg-gray-600
              focus:ring-gray-400
            "
          />
          <CalculatorButton
            label="+"
            onClick={handleButtonClick}
            className="
              col-span-1 bg-orange-500 dark:bg-orange-600
              text-white
              hover:bg-orange-600 dark:hover:bg-orange-700
              focus:ring-orange-500
            "
          />

          {/* Row 5: 0, Decimal, Equals */}
          <CalculatorButton
            label="0"
            onClick={handleButtonClick}
            className="
              col-span-2 bg-gray-300 dark:bg-gray-700
              text-gray-900 dark:text-gray-100
              hover:bg-gray-400 dark:hover:bg-gray-600
              focus:ring-gray-400
            "
          />
          <CalculatorButton
            label="."
            onClick={handleButtonClick}
            className="
              bg-gray-300 dark:bg-gray-700
              text-gray-900 dark:text-gray-100
              hover:bg-gray-400 dark:hover:bg-gray-600
              focus:ring-gray-400
            "
          />
          <CalculatorButton
            label="="
            onClick={handleButtonClick}
            className="
              col-span-1 bg-blue-500 dark:bg-blue-600
              text-white
              hover:bg-blue-600 dark:hover:bg-blue-700
              focus:ring-blue-500
            "
          />
        </div>
      </div>
    </div>
  );
};

export default Calculator;

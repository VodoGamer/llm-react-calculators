"use client";
import React, { useState } from "react";

type Operation = "+" | "-" | "*" | "/" | "=";

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState("0");
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [pendingOperation, setPendingOperation] = useState<Operation | null>(
    null
  );
  const [readyForNewInput, setReadyForNewInput] = useState(false);

  const handleNumberClick = (num: string) => {
    if (readyForNewInput) {
      setDisplay(num);
      setReadyForNewInput(false);
    } else {
      setDisplay((prev) => (prev === "0" ? num : prev + num));
    }
  };

  const handleDecimalClick = () => {
    if (readyForNewInput) {
      setDisplay("0.");
      setReadyForNewInput(false);
    } else if (!display.includes(".")) {
      setDisplay((prev) => prev + ".");
    }
  };

  const handleOperationClick = (op: Operation) => {
    const inputValue = parseFloat(display);

    if (currentValue === null) {
      setCurrentValue(inputValue);
    } else if (pendingOperation) {
      let result: number;
      switch (pendingOperation) {
        case "+":
          result = currentValue + inputValue;
          break;
        case "-":
          result = currentValue - inputValue;
          break;
        case "*":
          result = currentValue * inputValue;
          break;
        case "/":
          result = currentValue / inputValue;
          break;
        default:
          result = inputValue;
      }
      setCurrentValue(result);
      setDisplay(result.toString());
    }

    setPendingOperation(op);
    setReadyForNewInput(true);
  };

  const handleEqualsClick = () => {
    if (pendingOperation && currentValue !== null) {
      const inputValue = parseFloat(display);
      let result: number;
      switch (pendingOperation) {
        case "+":
          result = currentValue + inputValue;
          break;
        case "-":
          result = currentValue - inputValue;
          break;
        case "*":
          result = currentValue * inputValue;
          break;
        case "/":
          result = currentValue / inputValue;
          break;
        default:
          result = inputValue;
      }
      setDisplay(result.toString());
      setCurrentValue(null);
      setPendingOperation(null);
      setReadyForNewInput(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setCurrentValue(null);
    setPendingOperation(null);
    setReadyForNewInput(false);
  };

  const handleToggleSign = () => {
    setDisplay((prev) => (parseFloat(prev) * -1).toString());
  };

  const handlePercentage = () => {
    setDisplay((prev) => (parseFloat(prev) / 100).toString());
  };

  const renderButton = (
    label: string,
    onClick: () => void,
    className?: string
  ) => (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center w-full h-16
        rounded-xl text-2xl font-semibold
        bg-gray-200 text-gray-800 shadow-sm
        hover:bg-gray-300 active:bg-gray-400
        dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:active:bg-gray-500
        transition-all duration-150 ease-in-out
        ${className || ""}
      `}
    >
      {label}
    </button>
  );

  return (
    <div
      className="
      p-6 rounded-3xl shadow-xl border border-gray-100
      bg-white
      dark:bg-gray-800 dark:border-gray-700
      max-w-sm mx-auto my-10
      "
    >
      <div
        className="
        bg-gray-100 dark:bg-gray-900
        text-right p-4 mb-5 rounded-2xl shadow-inner
        text-5xl font-light text-gray-900 dark:text-gray-50
        overflow-hidden break-words min-h-[90px]
        flex items-end justify-end
        "
      >
        {display}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {renderButton(
          "AC",
          handleClear,
          "bg-red-400 hover:bg-red-500 active:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 dark:active:bg-red-800 text-white"
        )}
        {renderButton("+/-", handleToggleSign)}
        {renderButton("%", handlePercentage)}
        {renderButton(
          "÷",
          () => handleOperationClick("/"),
          "bg-orange-400 hover:bg-orange-500 active:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 dark:active:bg-orange-800 text-white"
        )}

        {renderButton("7", () => handleNumberClick("7"))}
        {renderButton("8", () => handleNumberClick("8"))}
        {renderButton("9", () => handleNumberClick("9"))}
        {renderButton(
          "×",
          () => handleOperationClick("*"),
          "bg-orange-400 hover:bg-orange-500 active:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 dark:active:bg-orange-800 text-white"
        )}

        {renderButton("4", () => handleNumberClick("4"))}
        {renderButton("5", () => handleNumberClick("5"))}
        {renderButton("6", () => handleNumberClick("6"))}
        {renderButton(
          "-",
          () => handleOperationClick("-"),
          "bg-orange-400 hover:bg-orange-500 active:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 dark:active:bg-orange-800 text-white"
        )}

        {renderButton("1", () => handleNumberClick("1"))}
        {renderButton("2", () => handleNumberClick("2"))}
        {renderButton("3", () => handleNumberClick("3"))}
        {renderButton(
          "+",
          () => handleOperationClick("+"),
          "bg-orange-400 hover:bg-orange-500 active:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 dark:active:bg-orange-800 text-white"
        )}

        {renderButton("0", () => handleNumberClick("0"), "col-span-2")}
        {renderButton(".", handleDecimalClick)}
        {renderButton(
          "=",
          handleEqualsClick,
          "bg-blue-400 hover:bg-blue-500 active:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800 text-white"
        )}
      </div>
    </div>
  );
};

export default Calculator;

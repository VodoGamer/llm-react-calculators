"use client";

import { useState } from "react";

export default function LlamaMaverick() {
  const [displayValue, setDisplayValue] = useState("0");
  const [firstOperand, setFirstOperand] = useState("");
  const [operator, setOperator] = useState("");

  const handleNumberClick = (num: string) => {
    if (displayValue === "0" && num === "0") return;
    if (displayValue === "0") {
      setDisplayValue(num);
    } else {
      setDisplayValue(displayValue + num);
    }
  };

  const handleOperatorClick = (op: string) => {
    setFirstOperand(displayValue);
    setOperator(op);
    setDisplayValue("0");
  };

  const handleEqualsClick = () => {
    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(displayValue);
    let result: number;

    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num1 / num2;
        break;
      default:
        return;
    }

    setDisplayValue(result.toString());
    setFirstOperand("");
    setOperator("");
  };

  const handleClearClick = () => {
    setDisplayValue("0");
    setFirstOperand("");
    setOperator("");
  };

  return (
    <div
      className={`w-80 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 dark:shadow-gray-800`}
    >
      <div
        className={`mb-4 rounded-lg border border-gray-200 bg-gray-100 p-4 text-right text-3xl dark:border-gray-700 dark:bg-gray-700`}
      >
        {displayValue}
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button
          className={`col-span-1 rounded-lg bg-gray-200 p-4 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500`}
          onClick={handleClearClick}
        >
          C
        </button>
        <button
          className={`col-span-1 rounded-lg bg-gray-200 p-4 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500`}
          onClick={() => handleOperatorClick("/")}
        >
          /
        </button>
        <button
          className={`col-span-1 rounded-lg bg-gray-200 p-4 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500`}
          onClick={() => handleOperatorClick("*")}
        >
          *
        </button>
        <button
          className={`col-span-1 rounded-lg bg-gray-200 p-4 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500`}
          onClick={() => handleOperatorClick("-")}
        >
          -
        </button>
        <button
          className={`col-span-1 rounded-lg bg-gray-200 p-4 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500`}
          onClick={() => handleNumberClick("7")}
        >
          7
        </button>
        <button
          className={`col-span-1 rounded-lg bg-gray-200 p-4 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500`}
          onClick={() => handleNumberClick("8")}
        >
          8
        </button>
        <button
          className={`col-span-1 rounded-lg bg-gray-200 p-4 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500`}
          onClick={() => handleNumberClick("9")}
        >
          9
        </button>
        <button
          className={`col-span-1 rounded-lg bg-gray-200 p-4 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500`}
          onClick={() => handleOperatorClick("+")}
        >
          +
        </button>
        <button
          className={`col-span-1 rounded-lg bg-gray-200 p-4 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500`}
          onClick={() => handleNumberClick("4")}
        >
          4
        </button>
        <button
          className={`col-span-1 rounded-lg bg-gray-200 p-4 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500`}
          onClick={() => handleNumberClick("5")}
        >
          5
        </button>
        <button
          className={`col-span-1 rounded-lg bg-gray-200 p-4 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500`}
          onClick={() => handleNumberClick("6")}
        >
          6
        </button>
        <button
          className={`col-span-1 rounded-lg bg-orange-500 p-4 text-white hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700`}
          onClick={handleEqualsClick}
        >
          =
        </button>
        <button
          className={`col-span-1 rounded-lg bg-gray-200 p-4 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500`}
          onClick={() => handleNumberClick("1")}
        >
          1
        </button>
        <button
          className={`col-span-1 rounded-lg bg-gray-200 p-4 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500`}
          onClick={() => handleNumberClick("2")}
        >
          2
        </button>
        <button
          className={`col-span-1 rounded-lg bg-gray-200 p-4 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500`}
          onClick={() => handleNumberClick("3")}
        >
          3
        </button>
        <button
          className={`col-span-2 rounded-lg bg-gray-200 p-4 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500`}
          onClick={() => handleNumberClick("0")}
        >
          0
        </button>
        <button
          className={`col-span-1 rounded-lg bg-gray-200 p-4 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500`}
          onClick={() => handleNumberClick(".")}
        >
          .
        </button>
      </div>
    </div>
  );
}

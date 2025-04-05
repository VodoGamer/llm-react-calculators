"use client";

import { useState } from "react";

type OperationType = "+" | "-" | "×" | "÷" | null;

export default function Claude35Sonnet() {
  const [display, setDisplay] = useState<string>("0");
  const [firstNumber, setFirstNumber] = useState<string>("");
  const [operation, setOperation] = useState<OperationType>(null);
  const [newNumber, setNewNumber] = useState<boolean>(false);

  const handleNumberClick = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperationClick = (op: OperationType) => {
    setOperation(op);
    setFirstNumber(display);
    setNewNumber(true);
  };

  const handleEquals = () => {
    if (!operation || !firstNumber) return;

    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(display);
    let result: number;

    switch (operation) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "×":
        result = num1 * num2;
        break;
      case "÷":
        result = num1 / num2;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setOperation(null);
    setFirstNumber("");
    setNewNumber(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setFirstNumber("");
    setOperation(null);
    setNewNumber(false);
  };

  const Button: React.FC<{
    onClick: () => void;
    variant?: "primary" | "secondary" | "accent";
    children: React.ReactNode;
    className?: string;
  }> = ({ onClick, variant = "primary", children, className = "" }) => {
    const baseClasses =
      "flex items-center justify-center rounded-xl text-lg font-medium transition-all duration-200 hover:scale-95 active:scale-90";
    const variantClasses = {
      primary:
        "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700",
      secondary:
        "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200",
      accent:
        "bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700",
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="w-80 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-6 text-right">
        <div className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
          {display}
        </div>
        {operation && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {firstNumber} {operation}
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3">
        <Button onClick={handleClear} variant="secondary">
          C
        </Button>
        <Button onClick={() => handleOperationClick("÷")} variant="secondary">
          ÷
        </Button>
        <Button onClick={() => handleOperationClick("×")} variant="secondary">
          ×
        </Button>
        <Button onClick={() => handleOperationClick("-")} variant="secondary">
          -
        </Button>

        {[7, 8, 9].map((num) => (
          <Button key={num} onClick={() => handleNumberClick(num.toString())}>
            {num}
          </Button>
        ))}
        <Button onClick={() => handleOperationClick("+")} variant="secondary">
          +
        </Button>

        {[4, 5, 6].map((num) => (
          <Button key={num} onClick={() => handleNumberClick(num.toString())}>
            {num}
          </Button>
        ))}
        <Button onClick={handleEquals} variant="accent" className="row-span-2">
          =
        </Button>

        {[1, 2, 3].map((num) => (
          <Button key={num} onClick={() => handleNumberClick(num.toString())}>
            {num}
          </Button>
        ))}

        <Button onClick={() => handleNumberClick("0")} className="col-span-2">
          0
        </Button>
        <Button onClick={() => handleNumberClick(".")}>.</Button>
      </div>
    </div>
  );
}

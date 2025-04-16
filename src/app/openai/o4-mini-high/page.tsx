"use client";
// Calculator.tsx
import React, { useState } from "react";

type ButtonProps = {
  label: string;
  onClick: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ label, onClick, className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center justify-center rounded-lg shadow-sm border
       border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
       text-gray-800 dark:text-gray-100 hover:bg-gray-100
       dark:hover:bg-gray-600 focus:outline-none transition  
       ${className}`}
  >
    {label}
  </button>
);

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>("0");

  const handleClick = (value: string) => {
    if (display === "0" && value !== ".") {
      setDisplay(value);
    } else {
      setDisplay((prev) => prev + value);
    }
  };

  const handleClear = () => {
    setDisplay("0");
  };

  const handleEval = () => {
    try {
      // sanitize to digits/operators/decimal
      if (/^[\d+\-*/.() ]+$/.test(display)) {
        // eslint-disable-next-line no-new-func
        const result = Function(`"use strict";return (${display})`)();
        setDisplay(String(result));
      }
    } catch {
      setDisplay("Error");
      setTimeout(() => setDisplay("0"), 1000);
    }
  };

  const buttons: Array<{ label: string; action: () => void; span?: number }> = [
    { label: "C", action: handleClear },
    { label: "(", action: () => handleClick("(") },
    { label: ")", action: () => handleClick(")") },
    { label: "÷", action: () => handleClick("/") },
    { label: "7", action: () => handleClick("7") },
    { label: "8", action: () => handleClick("8") },
    { label: "9", action: () => handleClick("9") },
    { label: "×", action: () => handleClick("*") },
    { label: "4", action: () => handleClick("4") },
    { label: "5", action: () => handleClick("5") },
    { label: "6", action: () => handleClick("6") },
    { label: "−", action: () => handleClick("-") },
    { label: "1", action: () => handleClick("1") },
    { label: "2", action: () => handleClick("2") },
    { label: "3", action: () => handleClick("3") },
    { label: "+", action: () => handleClick("+") },
    { label: "0", action: () => handleClick("0"), span: 2 },
    { label: ".", action: () => handleClick(".") },
    { label: "=", action: handleEval },
  ];

  return (
    <div
      className="
        w-full max-w-md mx-auto p-6 bg-gray-100 dark:bg-gray-900
        rounded-2xl shadow-lg"
    >
      <div
        className="
          mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-inner
          text-right text-4xl font-light text-gray-900 dark:text-gray-50
          overflow-x-auto"
      >
        {display}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {buttons.map(({ label, action, span }, idx) => (
          <Button
            key={idx}
            label={label}
            onClick={action}
            className={span ? `col-span-${span}` : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;

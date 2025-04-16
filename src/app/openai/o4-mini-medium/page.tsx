"use client";
import React, { useState } from "react";

interface CalculatorProps {}

const Calculator: React.FC<CalculatorProps> = () => {
  const [display, setDisplay] = useState<string>("0");
  const [error, setError] = useState<boolean>(false);

  const append = (value: string) => {
    if (error) {
      setDisplay(value);
      setError(false);
    } else {
      setDisplay((prev) =>
        prev === "0" && value !== "." ? value : prev + value
      );
    }
  };

  const clear = () => {
    setDisplay("0");
    setError(false);
  };

  const del = () => {
    if (error) {
      clear();
      return;
    }
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };

  const evaluate = () => {
    try {
      // eslint-disable-next-line no-new-func
      const result = Function(`return ${display}`)();
      setDisplay(String(result));
    } catch {
      setDisplay("Error");
      setError(true);
    }
  };

  const btnClass =
    "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 " +
    "rounded-lg shadow-sm border border-gray-300 dark:border-gray-600 " +
    "hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none " +
    "focus:ring-2 focus:ring-blue-500 transition";

  return (
    <div
      className="w-full max-w-sm mx-auto mt-10 p-4 bg-gray-100 dark:bg-gray-800 
                 rounded-xl shadow-md"
    >
      <div
        className="w-full h-16 mb-4 px-4 flex items-center justify-end 
                   text-2xl font-mono text-gray-900 dark:text-gray-100 
                   bg-white dark:bg-gray-700 rounded-lg border 
                   border-gray-300 dark:border-gray-600 overflow-x-auto"
      >
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button onClick={clear} className={`${btnClass} text-red-500`}>
          C
        </button>
        <button onClick={del} className={`${btnClass} text-yellow-600`}>
          Del
        </button>
        <div />
        <button
          onClick={() => append("/")}
          className={`${btnClass} text-blue-600`}
        >
          /
        </button>

        {["7", "8", "9"].map((n) => (
          <button key={n} onClick={() => append(n)} className={btnClass}>
            {n}
          </button>
        ))}
        <button
          onClick={() => append("*")}
          className={`${btnClass} text-blue-600`}
        >
          ×
        </button>

        {["4", "5", "6"].map((n) => (
          <button key={n} onClick={() => append(n)} className={btnClass}>
            {n}
          </button>
        ))}
        <button
          onClick={() => append("-")}
          className={`${btnClass} text-blue-600`}
        >
          −
        </button>

        {["1", "2", "3"].map((n) => (
          <button key={n} onClick={() => append(n)} className={btnClass}>
            {n}
          </button>
        ))}
        <button
          onClick={() => append("+")}
          className={`${btnClass} text-blue-600`}
        >
          +
        </button>

        <button
          onClick={() => append("0")}
          className={`${btnClass} col-span-2`}
        >
          0
        </button>
        <button onClick={() => append(".")} className={btnClass}>
          .
        </button>
        <button
          onClick={evaluate}
          className={`${btnClass} bg-blue-500 text-white 
                     dark:bg-blue-600 col-span-1`}
        >
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;

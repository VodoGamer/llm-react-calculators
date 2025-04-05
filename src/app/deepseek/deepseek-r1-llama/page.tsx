"use client";
import { useState } from "react";

export default function DeepseekR1Llama() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");

  const handleNumber = (num: string) => {
    if (display === "0") {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + op);
    setDisplay("0");
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
  };

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  };

  const handleEqual = () => {
    try {
      const result = eval(equation + display);
      setDisplay(result.toString());
      setEquation("");
    } catch (error) {
      setDisplay("Error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 dark:bg-gray-900">
      <div className="w-full max-w-xs rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="mb-4">
          <div className="text-right text-3xl font-medium text-gray-800 dark:text-gray-200">
            {equation}
          </div>
          <div className="text-right text-4xl font-semibold text-gray-800 dark:text-gray-200">
            <input
              type="text"
              value={display}
              readOnly
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {/* Clear and Delete */}
          <button
            onClick={handleClear}
            className="col-span-2 rounded-lg bg-red-100 p-4 text-lg font-medium text-red-600 transition-all hover:bg-red-200 active:scale-95 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800"
          >
            AC
          </button>
          <button
            onClick={handleDelete}
            className="rounded-lg bg-yellow-100 p-4 text-lg font-medium text-yellow-600 transition-all hover:bg-yellow-200 active:scale-95 dark:bg-yellow-900 dark:text-yellow-100 dark:hover:bg-yellow-800"
          >
            DEL
          </button>
          <button
            onClick={() => handleOperator("/")}
            className="rounded-lg bg-blue-100 p-4 text-lg font-medium text-blue-600 transition-all hover:bg-blue-200 active:scale-95 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
          >
            ÷
          </button>

          {/* Numbers and Operators */}
          {["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."].map(
            (num) => (
              <button
                key={num}
                onClick={() => handleNumber(num)}
                className="rounded-lg bg-gray-100 p-4 text-lg font-medium text-gray-800 transition-all hover:bg-gray-200 active:scale-95 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                {num}
              </button>
            )
          )}
          <button
            onClick={handleEqual}
            className="col-span-2 rounded-lg bg-green-100 p-4 text-lg font-medium text-green-600 transition-all hover:bg-green-200 active:scale-95 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800"
          >
            =
          </button>
          <button
            onClick={() => handleOperator("*")}
            className="rounded-lg bg-blue-100 p-4 text-lg font-medium text-blue-600 transition-all hover:bg-blue-200 active:scale-95 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
          >
            ×
          </button>
          <button
            onClick={() => handleOperator("-")}
            className="rounded-lg bg-blue-100 p-4 text-lg font-medium text-blue-600 transition-all hover:bg-blue-200 active:scale-95 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
          >
            -
          </button>
          <button
            onClick={() => handleOperator("+")}
            className="rounded-lg bg-blue-100 p-4 text-lg font-medium text-blue-600 transition-all hover:bg-blue-200 active:scale-95 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

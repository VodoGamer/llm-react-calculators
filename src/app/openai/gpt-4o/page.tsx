"use client";

import { useState } from "react";

export default function GPT4o() {
  const [input, setInput] = useState<string>("");

  const handleButtonClick = (value: string) => {
    if (value === "C") {
      setInput("");
    } else if (value === "=") {
      try {
        // Evaluate the expression safely
        setInput(eval(input).toString());
      } catch {
        setInput("Error");
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "C",
    "0",
    "=",
    "+",
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-80 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="mb-4">
          <input
            type="text"
            value={input}
            readOnly
            className="w-full rounded-md border border-gray-300 bg-gray-100 p-3 text-right text-xl text-gray-800 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((button) => (
            <button
              key={button}
              onClick={() => handleButtonClick(button)}
              className="rounded-md bg-gray-200 p-3 text-gray-800 shadow-sm hover:bg-gray-300 focus:outline-none dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              {button}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

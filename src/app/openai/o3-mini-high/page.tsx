"use client";

import { useState } from "react";

export default function O3MiniHigh() {
  const [input, setInput] = useState<string>("");

  const handleButtonClick = (value: string) => {
    switch (value) {
      case "AC":
        setInput("");
        break;
      case "Del":
        setInput((prev) => prev.slice(0, -1));
        break;
      case "=":
        try {
          const result = eval(input);
          setInput(result.toString());
        } catch (error) {
          setInput("Error");
        }
        break;
      default:
        setInput((prev) => prev + value);
    }
  };

  // Define the layout of buttons in rows.
  const buttons: string[][] = [
    ["AC", "Del", "", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "=", ""],
  ];

  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
      {/* Display Panel */}
      <div className="mb-4 rounded bg-gray-100 p-4 text-right font-mono text-2xl shadow-inner dark:bg-gray-700">
        {input || "0"}
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-4 gap-2">
        {buttons.flat().map((btn, index) => {
          // Render an empty div for placeholders.
          if (btn === "") {
            return <div key={index} />;
          }

          return (
            <button
              key={index}
              onClick={() => handleButtonClick(btn)}
              className="rounded border border-gray-200 bg-gray-50 p-4 text-gray-900 shadow hover:bg-gray-200 focus:outline-none dark:border-gray-500 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
            >
              {btn}
            </button>
          );
        })}
      </div>
    </div>
  );
}

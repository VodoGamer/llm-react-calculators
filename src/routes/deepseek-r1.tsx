import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/deepseek-r1")({
  component: RouteComponent,
});

type Operator = "+" | "-" | "×" | "÷";
type ButtonValue = number | Operator | "." | "=" | "C" | "+/-";

function RouteComponent() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState<string[]>([]);
  const [isNewNumber, setIsNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperator = (op: Operator) => {
    setEquation([...equation, display, op]);
    setIsNewNumber(true);
  };

  const calculate = () => {
    try {
      const expression = equation
        .join("")
        .replace(/×/g, "*")
        .replace(/÷/g, "/");
      const result = eval(`${expression}${display}`);
      setDisplay(String(result));
      setEquation([]);
      setIsNewNumber(true);
    } catch (error) {
      setDisplay("Error");
      setEquation([]);
      setIsNewNumber(true);
    }
  };

  const handleButtonClick = (value: ButtonValue) => {
    if (typeof value === "number") {
      handleNumber(String(value));
    } else if (value === ".") {
      if (!display.includes(".")) setDisplay(display + ".");
    } else if (value === "C") {
      setDisplay("0");
      setEquation([]);
      setIsNewNumber(true);
    } else if (value === "+/-") {
      setDisplay(String(parseFloat(display) * -1));
    } else if (value === "=") {
      calculate();
    } else {
      handleOperator(value);
    }
  };

  const buttonClass = (value: ButtonValue) =>
    `p-4 text-xl font-medium transition-all rounded-lg shadow-sm 
    hover:shadow-md active:scale-95 dark:shadow-gray-800/50
    ${
      typeof value === "number" || value === "."
        ? "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
        : value === "="
          ? "bg-blue-500 hover:bg-blue-600 text-white"
          : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
    }`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <div className="w-full max-w-xs rounded-2xl bg-white p-4 shadow-xl dark:bg-gray-800 dark:shadow-gray-900/50">
        <div className="mb-4">
          <div className="h-6 text-right text-sm text-gray-400 dark:text-gray-500">
            {equation.join(" ")}
          </div>
          <div className="h-12 text-right text-3xl font-bold dark:text-white">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[
            "C",
            "+/-",
            "÷",
            "×",
            7,
            8,
            9,
            "-",
            4,
            5,
            6,
            "+",
            1,
            2,
            3,
            "=",
            0,
            ".",
          ].map((btn) => (
            <button
              key={btn}
              onClick={() => handleButtonClick(btn as ButtonValue)}
              className={`${buttonClass(btn as ButtonValue)} ${
                btn === 0 ? "col-span-2" : ""
              } ${btn === "=" ? "row-span-2 h-full" : "aspect-square"}`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

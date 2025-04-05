import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
export const Route = createFileRoute("/llama-37-70b")({
  component: RouteComponent,
});

function RouteComponent() {
  const [currentValue, setCurrentValue] = useState("0");
  const [previousValue, setPreviousValue] = useState("");
  const [operation, setOperation] = useState("");

  const handleNumberClick = (number: string) => {
    if (currentValue === "0") {
      setCurrentValue(number);
    } else {
      setCurrentValue(currentValue + number);
    }
  };

  const handleOperationClick = (op: string) => {
    setPreviousValue(currentValue);
    setOperation(op);
    setCurrentValue("0");
  };

  const handleEqualsClick = () => {
    let result: number;
    switch (operation) {
      case "+":
        result = parseFloat(previousValue) + parseFloat(currentValue);
        break;
      case "-":
        result = parseFloat(previousValue) - parseFloat(currentValue);
        break;
      case "*":
        result = parseFloat(previousValue) * parseFloat(currentValue);
        break;
      case "/":
        result = parseFloat(previousValue) / parseFloat(currentValue);
        break;
      default:
        result = 0;
    }
    setCurrentValue(result.toString());
    setPreviousValue("");
    setOperation("");
  };

  const handleClearClick = () => {
    setCurrentValue("0");
    setPreviousValue("");
    setOperation("");
  };

  return (
    <div className="mx-auto max-w-md rounded-lg p-4 shadow-md dark:bg-gray-800 dark:shadow-none">
      <div className="flex flex-col items-center">
        <input
          type="text"
          value={currentValue}
          className="w-full rounded-lg p-4 text-right text-3xl font-bold shadow-sm dark:bg-gray-700 dark:text-white"
          readOnly
        />
        <div className="mt-4 grid grid-cols-4 gap-4">
          <button
            className="rounded-lg p-4 text-2xl font-bold shadow-sm hover:shadow-md dark:bg-gray-700 dark:text-white"
            onClick={() => handleNumberClick("7")}
          >
            7
          </button>
          <button
            className="rounded-lg p-4 text-2xl font-bold shadow-sm hover:shadow-md dark:bg-gray-700 dark:text-white"
            onClick={() => handleNumberClick("8")}
          >
            8
          </button>
          <button
            className="rounded-lg p-4 text-2xl font-bold shadow-sm hover:shadow-md dark:bg-gray-700 dark:text-white"
            onClick={() => handleNumberClick("9")}
          >
            9
          </button>
          <button
            className="rounded-lg p-4 text-2xl font-bold shadow-sm hover:shadow-md dark:bg-gray-700 dark:text-white"
            onClick={handleOperationClick.bind(null, "/")}
          >
            /
          </button>
          <button
            className="rounded-lg p-4 text-2xl font-bold shadow-sm hover:shadow-md dark:bg-gray-700 dark:text-white"
            onClick={() => handleNumberClick("4")}
          >
            4
          </button>
          <button
            className="rounded-lg p-4 text-2xl font-bold shadow-sm hover:shadow-md dark:bg-gray-700 dark:text-white"
            onClick={() => handleNumberClick("5")}
          >
            5
          </button>
          <button
            className="rounded-lg p-4 text-2xl font-bold shadow-sm hover:shadow-md dark:bg-gray-700 dark:text-white"
            onClick={() => handleNumberClick("6")}
          >
            6
          </button>
          <button
            className="rounded-lg p-4 text-2xl font-bold shadow-sm hover:shadow-md dark:bg-gray-700 dark:text-white"
            onClick={handleOperationClick.bind(null, "*")}
          >
            *
          </button>
          <button
            className="rounded-lg p-4 text-2xl font-bold shadow-sm hover:shadow-md dark:bg-gray-700 dark:text-white"
            onClick={() => handleNumberClick("1")}
          >
            1
          </button>
          <button
            className="rounded-lg p-4 text-2xl font-bold shadow-sm hover:shadow-md dark:bg-gray-700 dark:text-white"
            onClick={() => handleNumberClick("2")}
          >
            2
          </button>
          <button
            className="rounded-lg p-4 text-2xl font-bold shadow-sm hover:shadow-md dark:bg-gray-700 dark:text-white"
            onClick={() => handleNumberClick("3")}
          >
            3
          </button>
          <button
            className="rounded-lg p-4 text-2xl font-bold shadow-sm hover:shadow-md dark:bg-gray-700 dark:text-white"
            onClick={handleOperationClick.bind(null, "-")}
          >
            -
          </button>
          <button
            className="rounded-lg p-4 text-2xl font-bold shadow-sm hover:shadow-md dark:bg-gray-700 dark:text-white"
            onClick={() => handleNumberClick("0")}
          >
            0
          </button>
          <button
            className="rounded-lg p-4 text-2xl font-bold shadow-sm hover:shadow-md dark:bg-gray-700 dark:text-white"
            onClick={handleClearClick}
          >
            C
          </button>
          <button
            className="rounded-lg p-4 text-2xl font-bold shadow-sm hover:shadow-md dark:bg-gray-700 dark:text-white"
            onClick={handleOperationClick.bind(null, "+")}
          >
            +
          </button>
          <button
            className="rounded-lg p-4 text-2xl font-bold shadow-sm hover:shadow-md dark:bg-gray-700 dark:text-white"
            onClick={handleEqualsClick}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

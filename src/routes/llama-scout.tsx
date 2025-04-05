import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/llama-scout")({
  component: RouteComponent,
});

function RouteComponent() {
  const [currentNumber, setCurrentNumber] = useState("");
  const [previousNumber, setPreviousNumber] = useState("");
  const [operation, setOperation] = useState("");

  const handleNumberClick = (number: string) => {
    setCurrentNumber((prevNumber) => `${prevNumber}${number}`);
  };

  const handleOperationClick = (op: string) => {
    setPreviousNumber(currentNumber);
    setOperation(op);
    setCurrentNumber("");
  };

  const handleEqualsClick = () => {
    let result;
    switch (operation) {
      case "+":
        result = parseFloat(previousNumber) + parseFloat(currentNumber);
        break;
      case "-":
        result = parseFloat(previousNumber) - parseFloat(currentNumber);
        break;
      case "*":
        result = parseFloat(previousNumber) * parseFloat(currentNumber);
        break;
      case "/":
        result = parseFloat(previousNumber) / parseFloat(currentNumber);
        break;
      default:
        result = 0;
    }
    setCurrentNumber(result.toString());
    setPreviousNumber("");
    setOperation("");
  };

  const handleClearClick = () => {
    setCurrentNumber("");
    setPreviousNumber("");
    setOperation("");
  };

  return (
    <div className="rounded-lg bg-gray-100 p-4 shadow-sm dark:bg-gray-800">
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          value={currentNumber || "0"}
          readOnly
          className="w-full rounded-lg bg-gray-200 p-2 text-right text-lg dark:bg-gray-700"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={() => handleNumberClick("7")}
          className="rounded-lg bg-gray-300 p-4 text-lg dark:bg-gray-600"
        >
          7
        </button>
        <button
          onClick={() => handleNumberClick("8")}
          className="rounded-lg bg-gray-300 p-4 text-lg dark:bg-gray-600"
        >
          8
        </button>
        <button
          onClick={() => handleNumberClick("9")}
          className="rounded-lg bg-gray-300 p-4 text-lg dark:bg-gray-600"
        >
          9
        </button>
        <button
          onClick={() => handleOperationClick("/")}
          className="rounded-lg bg-gray-300 p-4 text-lg dark:bg-gray-600"
        >
          /
        </button>
        <button
          onClick={() => handleNumberClick("4")}
          className="rounded-lg bg-gray-300 p-4 text-lg dark:bg-gray-600"
        >
          4
        </button>
        <button
          onClick={() => handleNumberClick("5")}
          className="rounded-lg bg-gray-300 p-4 text-lg dark:bg-gray-600"
        >
          5
        </button>
        <button
          onClick={() => handleNumberClick("6")}
          className="rounded-lg bg-gray-300 p-4 text-lg dark:bg-gray-600"
        >
          6
        </button>
        <button
          onClick={() => handleOperationClick("*")}
          className="rounded-lg bg-gray-300 p-4 text-lg dark:bg-gray-600"
        >
          *
        </button>
        <button
          onClick={() => handleNumberClick("1")}
          className="rounded-lg bg-gray-300 p-4 text-lg dark:bg-gray-600"
        >
          1
        </button>
        <button
          onClick={() => handleNumberClick("2")}
          className="rounded-lg bg-gray-300 p-4 text-lg dark:bg-gray-600"
        >
          2
        </button>
        <button
          onClick={() => handleNumberClick("3")}
          className="rounded-lg bg-gray-300 p-4 text-lg dark:bg-gray-600"
        >
          3
        </button>
        <button
          onClick={() => handleOperationClick("-")}
          className="rounded-lg bg-gray-300 p-4 text-lg dark:bg-gray-600"
        >
          -
        </button>
        <button
          onClick={() => handleNumberClick("0")}
          className="col-span-2 rounded-lg bg-gray-300 p-4 text-lg dark:bg-gray-600"
        >
          0
        </button>
        <button
          onClick={() => handleOperationClick("+")}
          className="rounded-lg bg-gray-300 p-4 text-lg dark:bg-gray-600"
        >
          +
        </button>
        <button
          onClick={handleEqualsClick}
          className="rounded-lg bg-green-300 p-4 text-lg dark:bg-green-600"
        >
          =
        </button>
        <button
          onClick={handleClearClick}
          className="col-span-2 rounded-lg bg-red-300 p-4 text-lg dark:bg-red-600"
        >
          C
        </button>
      </div>
    </div>
  );
}

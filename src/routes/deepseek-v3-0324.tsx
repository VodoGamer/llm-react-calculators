import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/deepseek-v3-0324")({
  component: RouteComponent,
});

type CalculatorOperation = "+" | "-" | "×" | "÷" | "%";
type CalculatorButtonValue = string | number | CalculatorOperation;

interface CalculatorState {
  currentValue: string;
  previousValue: string | null;
  operation: CalculatorOperation | null;
  overwrite: boolean;
}

function RouteComponent() {
  const [state, setState] = useState<CalculatorState>({
    currentValue: "0",
    previousValue: null,
    operation: null,
    overwrite: false,
  });

  const handleNumberInput = (number: number) => {
    if (state.overwrite) {
      return setState({
        ...state,
        currentValue: String(number),
        overwrite: false,
      });
    }

    setState({
      ...state,
      currentValue:
        state.currentValue === "0"
          ? String(number)
          : state.currentValue + number,
    });
  };

  const handleDecimalInput = () => {
    if (state.overwrite) {
      return setState({
        ...state,
        currentValue: "0.",
        overwrite: false,
      });
    }

    if (!state.currentValue.includes(".")) {
      setState({
        ...state,
        currentValue: state.currentValue + ".",
      });
    }
  };

  const handleOperation = (operation: CalculatorOperation) => {
    if (state.currentValue === "0" && operation !== "%") return;

    if (state.previousValue === null) {
      setState({
        ...state,
        operation,
        previousValue: state.currentValue,
        overwrite: true,
      });
      return;
    }

    const result = calculate();
    setState({
      currentValue: String(result),
      previousValue: String(result),
      operation,
      overwrite: true,
    });
  };

  const calculate = (): number => {
    if (!state.previousValue || !state.operation)
      return parseFloat(state.currentValue);

    const prev = parseFloat(state.previousValue);
    const current = parseFloat(state.currentValue);

    switch (state.operation) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "×":
        return prev * current;
      case "÷":
        return prev / current;
      case "%":
        return prev % current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (state.operation === null || state.previousValue === null) return;

    const result = calculate();
    setState({
      currentValue: String(result),
      previousValue: null,
      operation: null,
      overwrite: true,
    });
  };

  const handleClear = () => {
    setState({
      currentValue: "0",
      previousValue: null,
      operation: null,
      overwrite: false,
    });
  };

  const handleDelete = () => {
    if (state.overwrite) return;

    setState({
      ...state,
      currentValue:
        state.currentValue.length === 1 ? "0" : state.currentValue.slice(0, -1),
    });
  };

  const handleToggleSign = () => {
    setState({
      ...state,
      currentValue: String(-parseFloat(state.currentValue)),
    });
  };

  const formatDisplayValue = (value: string): string => {
    const num = parseFloat(value);
    if (isNaN(num)) return value;

    // Format with commas and limit decimal places
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 8,
    }).format(num);
  };

  const buttonClasses = (value: CalculatorButtonValue, isOperation = false) => {
    const baseClasses = [
      "h-16",
      "rounded-xl",
      "text-xl",
      "font-medium",
      "transition-all",
      "duration-200",
      "active:scale-95",
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-opacity-50",
    ];

    if (isOperation) {
      return [
        ...baseClasses,
        "bg-blue-500",
        "text-white",
        "dark:bg-blue-600",
        "hover:bg-blue-600",
        "dark:hover:bg-blue-700",
        "focus:ring-blue-300",
        "dark:focus:ring-blue-400",
      ].join(" ");
    }

    if (value === "AC") {
      return [
        ...baseClasses,
        "bg-red-500",
        "text-white",
        "dark:bg-red-600",
        "hover:bg-red-600",
        "dark:hover:bg-red-700",
        "focus:ring-red-300",
        "dark:focus:ring-red-400",
      ].join(" ");
    }

    if (value === "=") {
      return [
        ...baseClasses,
        "bg-green-500",
        "text-white",
        "dark:bg-green-600",
        "hover:bg-green-600",
        "dark:hover:bg-green-700",
        "focus:ring-green-300",
        "dark:focus:ring-green-400",
      ].join(" ");
    }

    return [
      ...baseClasses,
      "bg-gray-100",
      "text-gray-800",
      "dark:bg-gray-700",
      "dark:text-gray-200",
      "hover:bg-gray-200",
      "dark:hover:bg-gray-600",
      "focus:ring-gray-300",
      "dark:focus:ring-gray-400",
    ].join(" ");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 transition-colors duration-300 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 dark:bg-gray-800">
          {/* Display */}
          <div className="p-4">
            <div className="rounded-xl bg-gray-100 p-4 shadow-inner dark:bg-gray-700">
              <div className="h-6 text-right text-sm text-gray-500 dark:text-gray-400">
                {state.previousValue &&
                  `${formatDisplayValue(state.previousValue)} ${state.operation}`}
              </div>
              <div className="truncate text-right text-3xl font-bold text-gray-800 dark:text-white">
                {formatDisplayValue(state.currentValue)}
              </div>
            </div>
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-4 gap-3 p-4">
            {/* Row 1 */}
            <button
              onClick={handleClear}
              className={buttonClasses("AC")}
              aria-label="Clear"
            >
              AC
            </button>
            <button
              onClick={handleDelete}
              className={buttonClasses("DEL")}
              aria-label="Delete"
            >
              DEL
            </button>
            <button
              onClick={handleToggleSign}
              className={buttonClasses("+/-")}
              aria-label="Toggle sign"
            >
              +/-
            </button>
            <button
              onClick={() => handleOperation("%")}
              className={buttonClasses("%", true)}
              aria-label="Modulo"
            >
              %
            </button>

            {/* Row 2 */}
            <button
              onClick={() => handleNumberInput(7)}
              className={buttonClasses(7)}
              aria-label="7"
            >
              7
            </button>
            <button
              onClick={() => handleNumberInput(8)}
              className={buttonClasses(8)}
              aria-label="8"
            >
              8
            </button>
            <button
              onClick={() => handleNumberInput(9)}
              className={buttonClasses(9)}
              aria-label="9"
            >
              9
            </button>
            <button
              onClick={() => handleOperation("÷")}
              className={buttonClasses("÷", true)}
              aria-label="Divide"
            >
              ÷
            </button>

            {/* Row 3 */}
            <button
              onClick={() => handleNumberInput(4)}
              className={buttonClasses(4)}
              aria-label="4"
            >
              4
            </button>
            <button
              onClick={() => handleNumberInput(5)}
              className={buttonClasses(5)}
              aria-label="5"
            >
              5
            </button>
            <button
              onClick={() => handleNumberInput(6)}
              className={buttonClasses(6)}
              aria-label="6"
            >
              6
            </button>
            <button
              onClick={() => handleOperation("×")}
              className={buttonClasses("×", true)}
              aria-label="Multiply"
            >
              ×
            </button>

            {/* Row 4 */}
            <button
              onClick={() => handleNumberInput(1)}
              className={buttonClasses(1)}
              aria-label="1"
            >
              1
            </button>
            <button
              onClick={() => handleNumberInput(2)}
              className={buttonClasses(2)}
              aria-label="2"
            >
              2
            </button>
            <button
              onClick={() => handleNumberInput(3)}
              className={buttonClasses(3)}
              aria-label="3"
            >
              3
            </button>
            <button
              onClick={() => handleOperation("-")}
              className={buttonClasses("-", true)}
              aria-label="Subtract"
            >
              -
            </button>

            {/* Row 5 */}
            <button
              onClick={() => handleNumberInput(0)}
              className={buttonClasses(0)}
              aria-label="0"
            >
              0
            </button>
            <button
              onClick={handleDecimalInput}
              className={buttonClasses(".")}
              aria-label="Decimal point"
            >
              .
            </button>
            <button
              onClick={handleEquals}
              className={buttonClasses("=")}
              aria-label="Equals"
            >
              =
            </button>
            <button
              onClick={() => handleOperation("+")}
              className={buttonClasses("+", true)}
              aria-label="Add"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

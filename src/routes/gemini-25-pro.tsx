import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/gemini-25-pro")({
  component: RouteComponent,
});

type Operator = "+" | "-" | "*" | "/";

function RouteComponent() {
  // State variables
  const [displayValue, setDisplayValue] = useState<string>("0"); // Value shown on the display
  const [firstOperand, setFirstOperand] = useState<number | null>(null); // First number in an operation
  const [operator, setOperator] = useState<Operator | null>(null); // Selected operator
  const [waitingForSecondOperand, setWaitingForSecondOperand] =
    useState<boolean>(false); // Flag to indicate if the next number input should start a new number

  // --- Helper Functions ---

  const inputDigit = (digit: string): void => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      // Prevent multiple leading zeros or replace initial '0'
      setDisplayValue(displayValue === "0" ? digit : displayValue + digit);
    }
  };

  const inputDecimal = (): void => {
    // Add decimal point only if it doesn't exist yet
    if (waitingForSecondOperand) {
      // If waiting for second operand, start with '0.'
      setDisplayValue("0.");
      setWaitingForSecondOperand(false);
      return;
    }
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  const clearDisplay = (): void => {
    setDisplayValue("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator: Operator): void => {
    const inputValue = parseFloat(displayValue);

    // Handle sequence of operations (e.g., 5 + 3 * 2)
    if (firstOperand !== null && operator && !waitingForSecondOperand) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result); // Use the result as the new first operand
    } else {
      // Store the first operand
      setFirstOperand(inputValue);
    }

    setWaitingForSecondOperand(true); // Ready for the next number
    setOperator(nextOperator); // Set the new operator
  };

  const calculate = (
    operand1: number,
    operand2: number,
    op: Operator,
  ): number => {
    switch (op) {
      case "+":
        return operand1 + operand2;
      case "-":
        return operand1 - operand2;
      case "*":
        return operand1 * operand2;
      case "/":
        if (operand2 === 0) {
          // Basic error handling for division by zero
          alert("Error: Cannot divide by zero");
          clearDisplay(); // Reset calculator on error
          return 0; // Or throw an error / handle differently
        }
        return operand1 / operand2;
      default:
        return operand2; // Should not happen with typed operators
    }
  };

  const handleEquals = (): void => {
    const inputValue = parseFloat(displayValue);

    if (operator && firstOperand !== null) {
      // Prevent calculation if equals is pressed repeatedly without new input
      if (waitingForSecondOperand) {
        // If equals is pressed right after an operator, use display value as second operand
        // Example: 5 * = should result in 25 (5 * 5)
        const result = calculate(firstOperand, firstOperand, operator);
        setDisplayValue(String(result));
        // Keep firstOperand for potential further calculations with the result
        setFirstOperand(result);
      } else {
        const result = calculate(firstOperand, inputValue, operator);
        setDisplayValue(String(result));
        setFirstOperand(result); // Store result for chaining
      }

      // Reset operator and waiting state after calculation
      setOperator(null);
      setWaitingForSecondOperand(true); // Ready for a new calculation starting with the result or a new number
    }
  };

  // --- Button Configuration ---
  // Makes rendering the grid easier
  const buttonLayout = [
    { label: "AC", handler: clearDisplay, style: "op-special" },
    { label: "+/-", handler: () => {}, style: "op-special" }, // Placeholder for +/-
    { label: "%", handler: () => {}, style: "op-special" }, // Placeholder for %
    { label: "/", handler: () => performOperation("/"), style: "op" },
    { label: "7", handler: () => inputDigit("7") },
    { label: "8", handler: () => inputDigit("8") },
    { label: "9", handler: () => inputDigit("9") },
    { label: "*", handler: () => performOperation("*"), style: "op" },
    { label: "4", handler: () => inputDigit("4") },
    { label: "5", handler: () => inputDigit("5") },
    { label: "6", handler: () => inputDigit("6") },
    { label: "-", handler: () => performOperation("-"), style: "op" },
    { label: "1", handler: () => inputDigit("1") },
    { label: "2", handler: () => inputDigit("2") },
    { label: "3", handler: () => inputDigit("3") },
    { label: "+", handler: () => performOperation("+"), style: "op" },
    { label: "0", handler: () => inputDigit("0"), style: "zero" },
    { label: ".", handler: inputDecimal },
    { label: "=", handler: handleEquals, style: "op" },
  ];

  // --- Styling Function ---
  // Centralizes button styling logic
  const getButtonClasses = (style?: string): string => {
    let classes =
      "flex items-center justify-center h-16 text-xl font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-150 ease-in-out active:scale-95 "; // Base styles

    // Theme-independent structural styles
    if (style === "zero") {
      classes += " col-span-2"; // Zero button spans two columns
    }

    // Theme-dependent styles
    switch (style) {
      case "op": // Operators (+, -, *, /, =)
        classes +=
          "bg-orange-400 hover:bg-orange-500 dark:bg-orange-600 dark:hover:bg-orange-700 text-white focus:ring-orange-400 dark:focus:ring-orange-500";
        break;
      case "op-special": // Top row operators (AC, +/-, %)
        classes +=
          "bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 text-black dark:text-white focus:ring-gray-400 dark:focus:ring-gray-500 border border-gray-300 dark:border-gray-700";
        break;
      default: // Numbers and decimal
        classes +=
          "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white focus:ring-gray-400 dark:focus:ring-gray-500 border border-gray-200 dark:border-gray-600";
    }
    return classes;
  };

  // --- Render ---
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900">
      <div className="w-full max-w-xs rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800">
        {/* Display Screen */}
        <div className="mb-4 flex h-16 items-center justify-end overflow-hidden rounded-lg bg-gray-200 p-3 text-right shadow-inner dark:bg-gray-900">
          <span
            className="font-mono text-3xl break-all text-gray-800 dark:text-gray-100"
            aria-live="polite" // Announce changes to screen readers
          >
            {displayValue}
          </span>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-2">
          {buttonLayout.map((btn) => (
            <button
              key={btn.label}
              onClick={btn.handler}
              className={getButtonClasses(btn.style)}
              // Disable +/- and % for now
              disabled={btn.label === "+/-" || btn.label === "%"}
              aria-label={
                btn.label === "AC"
                  ? "All Clear"
                  : btn.label === "/"
                    ? "Divide"
                    : btn.label === "*"
                      ? "Multiply"
                      : btn.label === "-"
                        ? "Subtract"
                        : btn.label === "+"
                          ? "Add"
                          : btn.label === "="
                            ? "Equals"
                            : btn.label === "."
                              ? "Decimal"
                              : `Number ${btn.label}`
              }
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

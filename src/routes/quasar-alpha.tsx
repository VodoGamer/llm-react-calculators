import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/quasar-alpha")({
  component: RouteComponent,
});

const buttons = [
  "C",
  "±",
  "%",
  "÷",
  "7",
  "8",
  "9",
  "×",
  "4",
  "5",
  "6",
  "−",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "=",
];

type Operator = "+" | "−" | "×" | "÷" | null;

function RouteComponent() {
  const [display, setDisplay] = useState<string>("0");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] =
    useState<boolean>(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.");
      setWaitingForSecondOperand(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const toggleSign = () => {
    setDisplay((prev) => (prev.startsWith("-") ? prev.slice(1) : "-" + prev));
  };

  const inputPercent = () => {
    const value = parseFloat(display);
    if (!isNaN(value)) {
      setDisplay(String(value / 100));
    }
  };

  const handleOperator = (nextOperator: Operator) => {
    const inputValue = parseFloat(display);

    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (
    first: number,
    second: number,
    operator: Operator,
  ): number => {
    switch (operator) {
      case "+":
        return first + second;
      case "−":
        return first - second;
      case "×":
        return first * second;
      case "÷":
        return second !== 0 ? first / second : 0;
      default:
        return second;
    }
  };

  const handleButtonClick = (btn: string) => {
    if (!isNaN(Number(btn))) {
      inputDigit(btn);
    } else if (btn === ".") {
      inputDot();
    } else if (btn === "C") {
      clear();
    } else if (btn === "±") {
      toggleSign();
    } else if (btn === "%") {
      inputPercent();
    } else if (["+", "−", "×", "÷"].includes(btn)) {
      handleOperator(btn as Operator);
    } else if (btn === "=") {
      if (operator && firstOperand !== null) {
        const result = calculate(firstOperand, parseFloat(display), operator);
        setDisplay(String(result));
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
      }
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-xs rounded-3xl border border-gray-200 bg-white p-4 shadow-lg transition-colors dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-4 rounded-xl border border-gray-200 bg-gray-100 p-4 text-right font-mono text-3xl shadow-inner dark:border-gray-700 dark:bg-gray-800">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleButtonClick(btn)}
            className={`rounded-full border border-gray-200 p-4 text-lg font-semibold shadow-sm transition dark:border-gray-700 ${
              ["+", "−", "×", "÷", "="].includes(btn)
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            }`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

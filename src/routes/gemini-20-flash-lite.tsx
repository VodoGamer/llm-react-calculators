import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/gemini-20-flash-lite")({
  component: RouteComponent,
});

interface CalculatorButtonProps {
  value: string;
  onClick: (value: string) => void;
  className?: string;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  value,
  onClick,
  className,
}) => {
  return (
    <button
      className={`h-20 w-20 rounded-full bg-gray-200 text-2xl text-gray-800 shadow-md hover:bg-gray-300 focus:outline-none dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 ${className} `}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
};

function RouteComponent() {
  const [display, setDisplay] = useState("0");
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);

  const handleNumberClick = (number: string) => {
    if (display === "0") {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperatorClick = (op: string) => {
    if (storedValue === null) {
      setStoredValue(parseFloat(display));
      setOperator(op);
      setDisplay("0");
    } else {
      handleEqualsClick();
      setOperator(op);
      setStoredValue(parseFloat(display));
      setDisplay("0");
    }
  };

  const handleEqualsClick = () => {
    if (storedValue !== null && operator) {
      let result: number | null = null;
      const currentValue = parseFloat(display);
      switch (operator) {
        case "+":
          result = storedValue + currentValue;
          break;
        case "-":
          result = storedValue - currentValue;
          break;
        case "*":
          result = storedValue * currentValue;
          break;
        case "/":
          result = currentValue === 0 ? null : storedValue / currentValue;
          break;
      }
      if (result !== null) {
        setDisplay(result.toString());
        setStoredValue(null);
        setOperator(null);
      } else {
        setDisplay("Error");
        setStoredValue(null);
        setOperator(null);
      }
    }
  };

  const handleClearClick = () => {
    setDisplay("0");
    setStoredValue(null);
    setOperator(null);
  };

  const handleDecimalClick = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleSignClick = () => {
    if (display !== "0") {
      setDisplay((parseFloat(display) * -1).toString());
    }
  };

  const handleDeleteClick = () => {
    if (
      display.length === 1 ||
      (display.length === 2 && display.startsWith("-"))
    ) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 transition-colors duration-300 dark:bg-gray-800">
      <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl transition-colors duration-300 dark:bg-gray-900">
        <div className="p-4">
          <div className="text-right text-4xl text-gray-800 transition-colors duration-300 dark:text-white">
            {display}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 p-4">
          <CalculatorButton
            value="C"
            onClick={handleClearClick}
            className="bg-red-400 text-white hover:bg-red-500"
          />
          <CalculatorButton value="+/-" onClick={handleSignClick} />
          <CalculatorButton value="%" onClick={() => {}} />
          <CalculatorButton
            value="/"
            onClick={handleOperatorClick}
            className="bg-blue-400 text-white hover:bg-blue-500"
          />

          <CalculatorButton value="7" onClick={handleNumberClick} />
          <CalculatorButton value="8" onClick={handleNumberClick} />
          <CalculatorButton value="9" onClick={handleNumberClick} />
          <CalculatorButton
            value="*"
            onClick={handleOperatorClick}
            className="bg-blue-400 text-white hover:bg-blue-500"
          />

          <CalculatorButton value="4" onClick={handleNumberClick} />
          <CalculatorButton value="5" onClick={handleNumberClick} />
          <CalculatorButton value="6" onClick={handleNumberClick} />
          <CalculatorButton
            value="-"
            onClick={handleOperatorClick}
            className="bg-blue-400 text-white hover:bg-blue-500"
          />

          <CalculatorButton value="1" onClick={handleNumberClick} />
          <CalculatorButton value="2" onClick={handleNumberClick} />
          <CalculatorButton value="3" onClick={handleNumberClick} />
          <CalculatorButton
            value="+"
            onClick={handleOperatorClick}
            className="bg-blue-400 text-white hover:bg-blue-500"
          />

          <CalculatorButton
            value="0"
            onClick={handleNumberClick}
            className="col-span-2"
          />
          <CalculatorButton value="." onClick={handleDecimalClick} />
          <CalculatorButton
            value="="
            onClick={handleEqualsClick}
            className="bg-blue-400 text-white hover:bg-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

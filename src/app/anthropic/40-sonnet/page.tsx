"use client";

import React, { useState, useCallback } from "react";

type OperatorType = "+" | "-" | "*" | "/" | null;

interface CalculatorState {
  display: string;
  previousValue: number | null;
  operator: OperatorType;
  waitingForOperand: boolean;
  history: string[];
}

const Calculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>({
    display: "0",
    previousValue: null,
    operator: null,
    waitingForOperand: false,
    history: [],
  });

  const inputNumber = useCallback((num: string) => {
    setState((prevState) => {
      if (prevState.waitingForOperand) {
        return {
          ...prevState,
          display: num,
          waitingForOperand: false,
        };
      }

      const newDisplay =
        prevState.display === "0" ? num : prevState.display + num;

      return {
        ...prevState,
        display: newDisplay,
      };
    });
  }, []);

  const inputDecimal = useCallback(() => {
    setState((prevState) => {
      if (prevState.waitingForOperand) {
        return {
          ...prevState,
          display: "0.",
          waitingForOperand: false,
        };
      }

      if (prevState.display.indexOf(".") === -1) {
        return {
          ...prevState,
          display: prevState.display + ".",
        };
      }

      return prevState;
    });
  }, []);

  const clear = useCallback(() => {
    setState({
      display: "0",
      previousValue: null,
      operator: null,
      waitingForOperand: false,
      history: [],
    });
  }, []);

  const clearEntry = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      display: "0",
    }));
  }, []);

  const performOperation = useCallback((nextOperator: OperatorType) => {
    setState((prevState) => {
      const inputValue = parseFloat(prevState.display);

      if (prevState.previousValue === null) {
        return {
          ...prevState,
          previousValue: inputValue,
          operator: nextOperator,
          waitingForOperand: true,
        };
      }

      if (prevState.operator && prevState.waitingForOperand) {
        return {
          ...prevState,
          operator: nextOperator,
        };
      }

      const currentValue = prevState.previousValue || 0;
      let result: number;

      switch (prevState.operator) {
        case "+":
          result = currentValue + inputValue;
          break;
        case "-":
          result = currentValue - inputValue;
          break;
        case "*":
          result = currentValue * inputValue;
          break;
        case "/":
          result = inputValue !== 0 ? currentValue / inputValue : currentValue;
          break;
        default:
          result = inputValue;
      }

      const calculation = `${currentValue} ${prevState.operator} ${inputValue} = ${result}`;
      const newHistory = [...prevState.history, calculation].slice(-3);

      return {
        ...prevState,
        display: String(result),
        previousValue: nextOperator ? result : null,
        operator: nextOperator,
        waitingForOperand: !!nextOperator,
        history: nextOperator ? prevState.history : newHistory,
      };
    });
  }, []);

  const calculate = useCallback(() => {
    performOperation(null);
  }, [performOperation]);

  const toggleSign = useCallback(() => {
    setState((prevState) => {
      const value = parseFloat(prevState.display);
      return {
        ...prevState,
        display: String(value * -1),
      };
    });
  }, []);

  const percentage = useCallback(() => {
    setState((prevState) => {
      const value = parseFloat(prevState.display);
      return {
        ...prevState,
        display: String(value / 100),
      };
    });
  }, []);

  const formatDisplay = (value: string): string => {
    if (value.length > 12) {
      const num = parseFloat(value);
      if (Math.abs(num) >= 1e12 || (Math.abs(num) < 1e-6 && num !== 0)) {
        return num.toExponential(6);
      }
      return num.toPrecision(12);
    }
    return value;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:shadow-2xl p-6 w-full max-w-sm border border-gray-200 dark:border-gray-700 transition-all duration-300">
        {/* History */}
        <div className="mb-4 h-16 overflow-hidden">
          {state.history.length > 0 && (
            <div className="space-y-1">
              {state.history.slice(-2).map((calc, index) => (
                <div
                  key={index}
                  className="text-xs text-gray-500 dark:text-gray-400 font-mono opacity-60"
                >
                  {calc}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Display */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-100 dark:border-gray-600 transition-colors duration-300">
          <div className="text-right">
            <div className="text-4xl font-light text-gray-900 dark:text-white font-mono tracking-tight">
              {formatDisplay(state.display)}
            </div>
            {state.operator && state.previousValue !== null && (
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {state.previousValue} {state.operator}
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <button
            onClick={clear}
            className="col-span-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-4 px-6 rounded-xl transition-all duration-200 active:scale-95 border border-gray-300 dark:border-gray-600"
          >
            Clear
          </button>
          <button
            onClick={clearEntry}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-4 px-6 rounded-xl transition-all duration-200 active:scale-95 border border-gray-300 dark:border-gray-600"
          >
            CE
          </button>
          <button
            onClick={() => performOperation("/")}
            className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 active:scale-95 shadow-md"
          >
            ÷
          </button>

          {/* Row 2 */}
          <button
            onClick={() => inputNumber("7")}
            className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-4 px-6 rounded-xl transition-all duration-200 active:scale-95 border border-gray-200 dark:border-gray-600"
          >
            7
          </button>
          <button
            onClick={() => inputNumber("8")}
            className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-4 px-6 rounded-xl transition-all duration-200 active:scale-95 border border-gray-200 dark:border-gray-600"
          >
            8
          </button>
          <button
            onClick={() => inputNumber("9")}
            className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-4 px-6 rounded-xl transition-all duration-200 active:scale-95 border border-gray-200 dark:border-gray-600"
          >
            9
          </button>
          <button
            onClick={() => performOperation("*")}
            className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 active:scale-95 shadow-md"
          >
            ×
          </button>

          {/* Row 3 */}
          <button
            onClick={() => inputNumber("4")}
            className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-4 px-6 rounded-xl transition-all duration-200 active:scale-95 border border-gray-200 dark:border-gray-600"
          >
            4
          </button>
          <button
            onClick={() => inputNumber("5")}
            className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-4 px-6 rounded-xl transition-all duration-200 active:scale-95 border border-gray-200 dark:border-gray-600"
          >
            5
          </button>
          <button
            onClick={() => inputNumber("6")}
            className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-4 px-6 rounded-xl transition-all duration-200 active:scale-95 border border-gray-200 dark:border-gray-600"
          >
            6
          </button>
          <button
            onClick={() => performOperation("-")}
            className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 active:scale-95 shadow-md"
          >
            −
          </button>

          {/* Row 4 */}
          <button
            onClick={() => inputNumber("1")}
            className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-4 px-6 rounded-xl transition-all duration-200 active:scale-95 border border-gray-200 dark:border-gray-600"
          >
            1
          </button>
          <button
            onClick={() => inputNumber("2")}
            className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-4 px-6 rounded-xl transition-all duration-200 active:scale-95 border border-gray-200 dark:border-gray-600"
          >
            2
          </button>
          <button
            onClick={() => inputNumber("3")}
            className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-4 px-6 rounded-xl transition-all duration-200 active:scale-95 border border-gray-200 dark:border-gray-600"
          >
            3
          </button>
          <button
            onClick={() => performOperation("+")}
            className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 active:scale-95 shadow-md"
          >
            +
          </button>

          {/* Row 5 */}
          <button
            onClick={toggleSign}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-4 px-6 rounded-xl transition-all duration-200 active:scale-95 border border-gray-300 dark:border-gray-600"
          >
            ±
          </button>
          <button
            onClick={() => inputNumber("0")}
            className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-4 px-6 rounded-xl transition-all duration-200 active:scale-95 border border-gray-200 dark:border-gray-600"
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-4 px-6 rounded-xl transition-all duration-200 active:scale-95 border border-gray-200 dark:border-gray-600"
          >
            .
          </button>
          <button
            onClick={calculate}
            className="bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 active:scale-95 shadow-md"
          >
            =
          </button>
        </div>

        {/* Additional Functions */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={percentage}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg transition-all duration-200 active:scale-95 border border-gray-300 dark:border-gray-600 text-sm"
          >
            %
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;

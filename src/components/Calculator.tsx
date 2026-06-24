import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");

  const buttons = [
    "AC",
    "◀",
    "%",
    "^",
    "7",
    "8",
    "9",
    "x",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
    "/",
  ];

  const isStringOperator = (str?: string) => {
    return str == "/" || str == "+" || str == "x" || str == "-";
  };

  const isLastStringOperator = () => {
    const length = display.length - 1;
    const lastString = display.at(length);

    if (isStringOperator(lastString)) {
      return true;
    }
  };

  const handleOperation = (str: string) => {
    if (str == "=") {
      checkCalculation();
    } else if (str == "AC") {
      setDisplay("");
    } else if (str == "◀") {
      const val = display.slice(0, -1);
      setDisplay(val);
    } else {
      handleClick(str);
    }
  };

  const handleClick = (val: string) => {
    if (isStringOperator(val)) {
      const isOP = isLastStringOperator();

      if (isOP) {
        val = "";
      }
    }

    if (
      (display == "0" || display == "Cannot be divide to 0") &&
      !isStringOperator(val)
    ) {
      setDisplay(val);
      return;
    }

    setDisplay(display + val);
  };

  const evaluateDisplay = (value?: string) => {
    const val = value || display;

    const modifiedDisplay = val.replace("x", "*");
    let calString = eval(modifiedDisplay).toString();

    if (calString == "Infinity") {
      calString = "Cannot be divide to 0";
    }

    setDisplay(calString);
  };

  const checkCalculation = () => {
    const isOP = isLastStringOperator();
    if (isOP) {
      const value = display.slice(0, -1);
      setDisplay(value);
      evaluateDisplay(value);
    } else {
      evaluateDisplay();
    }
  };

  return (
    <div className="w-120 h-215 bg-[#080808] rounded-2xl shadow-xl">
      <div className="m-3 h-65 text-white text-6xl font-semibold bg-[#313131] rounded-t-xl p-2">
        <textarea
          className="w-full h-full outline-0 resize-none"
          name=""
          id=""
          value={display}
        ></textarea>
      </div>
      <div className="w-auto">
        <div className="grid grid-cols-4 gap-9 m-3 p-3">
          {buttons.map((str) => (
            <button
              className="w-20 h-20 text-black bg-white rounded-full text-2xl font-bold hover:bg-gray-400 transition-all duration-150"
              onClick={() => {
                handleOperation(str);
              }}
            >
              {str}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

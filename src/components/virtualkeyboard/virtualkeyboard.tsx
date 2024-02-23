"use client";
import React, { useState } from "react";

const VirtualKeyboard = ({ onKeyPress }) => {
  const [input, setInput] = useState("");
  const [capsLock, setCapsLock] = useState(false);
  const [shift, setShift] = useState(false);

  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const layout = {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = backspace",
      "tab q w e r t y u i o p [ ] \\",
      "caps a s d f g h j k l ; ' enter",
      "shift z x c v b n m , . / clear",
      "space",
    ],
    shift: [
      "~ ! @ # $ % ^ & * ( ) _ + backspace",
      "tab Q W E R T Y U I O P { } |",
      'caps A S D F G H J K L : " enter',
      "shift Z X C V B N M < > ? clear",
      "space",
    ],
  };

  const defaultkeyboardvalues = [
    "`",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "-",
    "=",
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "[",
    "]",
    "\\",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    ";",
    "'",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    ",",
    ".",
    "/",
  ];

  const shiftkeyboardvalues = [
    "~",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "_",
    "+",
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "{",
    "}",
    "|",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    ":",
    '"',
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "<",
    ">",
    "?",
  ];

  const randomkeyboardlayout = {
    default: [],
    shift: [],
  };
  randomkeyboardlayout.default = shuffleArray(defaultkeyboardvalues);
  randomkeyboardlayout.shift = shuffleArray(shiftkeyboardvalues);
  let k = 0;

  const handleKeyPress = (key: any) => {
    let processedKey = key;

    switch (key) {
      case "caps":
        setCapsLock(!capsLock);
        break;
      case "shift":
        setShift(!shift);
        break;
      default:
        processedKey = capsLock ? key.toUpperCase() : key.toLowerCase();
    }

    if (processedKey !== "caps" && processedKey !== "shift") {
      onKeyPress(processedKey);
    }
  };

  return (
    <div>
      <div className="grid grid-flow-row gap-2 h-fit w-fit bg-gray-200 rounded-md p-2 border-4 border-red-500">
        {layout[capsLock || shift ? "shift" : "default"].map((row, i) => (
          <div key={i} className="grid grid-flow-col gap-2">
            {row.split(" ").map((key, j) => (
              <button
                key={j}
                onClick={() => handleKeyPress(key)}
                className={`bg-white border-2 border-gray-300 p-2 rounded-md min-w-10 col-auto ${
                  shift && key === "shift" ? "bg-red-600" : ""
                } ${capsLock && key === "caps" ? "bg-red-600" : ""}`}
              >
                {key === "backspace" ||
                key === "clear" ||
                key === "enter" ||
                key === "space" ||
                key === "tab" ||
                key === "caps" ||
                key === "shift" ? (
                  key
                ) : (
                  <div className="relative grid grid-flow-col space-x-2">
                    <p className="absolute top-0 right-0-0 text-xs">{key}</p>
                    <p className="">{randomkeyboardlayout.default[i + j]}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualKeyboard;

"use client";
import React, { useState } from "react";

type KeyboardValue = string;
interface ShuffledJson {
  [key: string]: KeyboardValue;
}

interface KeyboardLayout {
  default: ShuffledJson;
  shift: ShuffledJson;
}

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
  randomKeyboardLayout: KeyboardLayout;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  onKeyPress,
  randomKeyboardLayout,
}) => {
  const [shift, setShift] = useState(false);
  console.log();

  const layout = {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = backspace",
      "tab q w e r t y u i o p [ ] \\",
      "caps a s d f g h j k l ; ' clear",
      "shift z x c v b n m , . / close",
      "space",
    ],
    shift: [
      "~ ! @ # $ % ^ & * ( ) _ + backspace",
      "tab Q W E R T Y U I O P { } |",
      'caps A S D F G H J K L : " clear',
      "shift Z X C V B N M < > ? close",
      "space",
    ],
  };
  const randomkeyboardlayout: ShuffledJson = randomKeyboardLayout;

  const handleKeyPress = (key: string) => {
    if (key === "shift" || key === "caps") {
      setShift(!shift);
    } else if (
      ["backspace", "clear", "close", "space", "tab", "caps", "shift"].includes(
        key,
      )
    ) {
      onKeyPress(key);
    } else {
      const mappedKey =
        randomKeyboardLayout[shift ? "shift" : "default"][key] || key;
      onKeyPress(mappedKey);
    }
  };
  return (
    <div className="mb-4 fixed bottom-0 left-1/2 transform -translate-x-1/2">
      <div className="grid grid-flow-row gap-2 h-fit w-fit bg-gray-200 rounded-md p-2 border-4 border-secondary font-sans">
        {layout[shift ? "shift" : "default"].map((row, i) => (
          <div key={i} className="grid grid-flow-col gap-2">
            {row.split(" ").map((key, j) => (
              <button
                key={j}
                onClick={() => handleKeyPress(key)}
                className={`bg-white border-2 border-gray-300 p-2 rounded-md min-w-10 col-auto shadow-[0_0_5px_#F7FEE7,0_0_10px_#F7FEE7,0_0_15px_#F7FEE7,0_0_25px_#F7FEE7] ${
                  shift && key === "shift" ? "bg-red-500" : ""
                } ${shift && key === "caps" ? "bg-red-500" : ""} ${key === "close" ? "bg-red-500" : ""}`}
              >
                {[
                  "backspace",
                  "clear",
                  "close",
                  "space",
                  "tab",
                  "caps",
                  "shift",
                ].includes(key) ? (
                  key
                ) : (
                  <div className="relative grid grid-flow-col space-x-2">
                    <p className="absolute top-0 right-0-0 text-xs">{key}</p>
                    <p className="text-secondary font-bold text-md">
                      {randomkeyboardlayout[shift ? "shift" : "default"][key]}
                    </p>
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

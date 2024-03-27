"use client";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { VirtualKeyboard } from "@/components";
import axios from 'axios';

type KeyboardValue = string;

interface ShuffledJson {
  [key: string]: KeyboardValue;
}

const page = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeInput, setActiveInput] = useState("");

  const defaultkeyboardvalues: KeyboardValue[] = [
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

  // Shuffle the array using the Durstenfeld shuffle algorithm
  // Function to shuffle an array
  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffleddefaultArray: KeyboardValue[] = shuffleArray([
    ...defaultkeyboardvalues,
  ]);
  const ShuffleddefaultKeypoard: ShuffledJson = {};

  for (let i = 0; i < defaultkeyboardvalues.length; i++) {
    ShuffleddefaultKeypoard[defaultkeyboardvalues[i]] = shuffleddefaultArray[i];
  }

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

  const shuffledShiftArray: KeyboardValue[] = shuffleArray([
    ...shiftkeyboardvalues,
  ]);
  const shuffledShiftKeyboard: ShuffledJson = {};

  for (let i = 0; i < shiftkeyboardvalues.length; i++) {
    shuffledShiftKeyboard[shiftkeyboardvalues[i]] = shuffledShiftArray[i];
  }
  const randomkeyboardlayout = {
    default: ShuffleddefaultKeypoard,
    shift: shuffledShiftKeyboard,
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    const inputValue: string = event.target.value.toString();
    const lastChar = inputValue.slice(-1); // Get the last character of the input value

    // Determine if the last character is in default or shift keyboard values
    const isDefault = defaultkeyboardvalues.includes(lastChar);
    const isShift = shiftkeyboardvalues.includes(lastChar);

    let mappedValue = inputValue; // Default to the input value itself

    // If the last character is in either default or shift keyboard values, map it
    if (isDefault || isShift) {
      const layout = isDefault
        ? randomkeyboardlayout.default
        : randomkeyboardlayout.shift;
      mappedValue = layout[lastChar] || inputValue; // Fallback to inputValue if not found in the layout
    }

    setInput((prevInput) => ({
      ...prevInput,
      [field]: prevInput[field as keyof typeof prevInput] + mappedValue,
    }));
  };

  const handleKeyPress = (key: any, field: string) => {
    setInput((prevInput: { [key: string]: string }) => {
      let updatedValue = prevInput[field];
      switch (key) {
        case "space":
          updatedValue += " ";
          break;
        case "backspace":
          updatedValue = updatedValue.slice(0, -1);
          break;
        case "clear":
          updatedValue = "";
          break;
        case "enter":
          updatedValue += "\n";
          break;
        case "tab":
          updatedValue += "\t";
          break;
        case "close":
          updatedValue += "";
          setShowKeyboard(false);
          break;
        default:
          updatedValue += key;
      }
      return {
        email: prevInput.email,
        password: prevInput.password,
        [field]: updatedValue,
      };
    });
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    // Perform any necessary validation or processing here
    console.log("Form submitted:", input);

    try {
      const response = await axios.post("/api/auth/authenticate", input);
      const data = await response.data;
      console.log(data)
      toast.success("Logged in Successfully");
    } catch (error) {
      toast.error("Invalid Credentials");
    }

    // Optionally, set the submission state to indicate that the form has been submitted
    setShowKeyboard(false);
  };

  return (
    <div>
      <h3 className={`text-black text-center text-4xl font-normal`}>Signin</h3>
      <form className={`flex flex-col gap-5 my-4`} onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          className={`h-10 md:w-80 bg-[#CCC5B980] font-sans rounded-md p-2`}
          placeholder="Email"
          value={input.email} // Use the value from the input state
          onChange={(e) => handleInputChange(e, "email")} // Update the input state
          onClick={() => {
            setShowKeyboard(true);
            setActiveInput("email");
          }}
        />
        <input
          type="password"
          id="password"
          className={`h-10 md:w-80 bg-[#CCC5B980] font-sans rounded-md p-2`}
          placeholder="Password"
          value={input.password} // Use the value from the input state
          onChange={(e) => handleInputChange(e, "password")} // Update the input state
          onClick={() => {
            setShowKeyboard(true);
            setActiveInput("password");
          }}
        />
        <input
          type="submit"
          value="Submit"
          className={`bg-secondary text-primary w-1/2 mx-auto rounded-md h-10`}
        />
      </form>

      {showKeyboard && (
        <div className="">
          <VirtualKeyboard
            randomKeyboardLayout={randomkeyboardlayout}
            onKeyPress={(key) => {
              handleKeyPress(key, activeInput);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default page;

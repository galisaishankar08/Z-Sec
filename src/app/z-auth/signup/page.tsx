"use client";
import React,{ useState } from "react";
import { VirtualKeyboard } from "@/components";
import toast from "react-hot-toast";
import { encrypt, packet } from '@/utilities/crypto';
import axios from 'axios';

type KeyboardValue = string;

interface ShuffledJson {
  [key: string]: KeyboardValue;
}

const page = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    date_of_birth: "",
    phone_number: "",
    password: "",
  });

  const [input, setInput] = useState({
    password: "",
  });
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeInput, setActiveInput] = useState("");
  const [validate, setValidate] = useState(false);

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
        password: prevInput.password,
        [field]: updatedValue,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.password = input.password;

    const encryptedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => {
      if (key === "email") {
        return [key, value];
      } else {
        return [key, packet(encrypt(value))];
      }
      })
    );
    // console.log(JSON.stringify(formData));
    // console.log(encryptedFormData);

    setShowKeyboard(false);
    try {
      const response = await axios.post("/api/auth/register", encryptedFormData);
      const data = await response.data;

      if (data.success) {
        toast.success("Registered successfully. Please login.");
        setFormData({
          full_name: "",
          email: "",
          date_of_birth: "",
          phone_number: "",
          password: "",
        });

        setInput({
          password: "",
        });
        window.location.href = "/z-auth/signin";
      } else {
        toast.error("Please provide valid data.");
        console.error("Error submitting form:", data.error);
      }
    } catch (error) {
      console.error("Error catch submitting form:", error);
    }
  };

  const validatePasswordPolicies = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const inputData = {
      name: formData.full_name,
      email: formData.email,
      dob: formData.date_of_birth,
      password: input.password,
    };
    if(inputData.password){
        const passwordPolicies = {
        length: inputData.password.length >= 8,
        uppercase: /[A-Z]/.test(inputData.password),
        lowercase: /[a-z]/.test(inputData.password),
        number: /[0-9]/.test(inputData.password),
        special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(inputData.password),
      };
      if (Object.values(passwordPolicies).every((policy) => policy)) {
        const response = await axios.post("https://secure-pass.azurewebsites.net/check_password", inputData);
        const data = await response.data;
        console.log(data)
        if (data && data.is_secure) {
          toast.success(data.message);
          setValidate(true);
        } else {
          toast.error(data.message);
        }
      } else {
        console.log("Password is invalid");
        toast.error("Password should contain at least 1 uppercase, lowercase, digit, special character, and have a minimum length of 8 characters");
      }
    }
    

    
  }

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div>
      <h3 className={`text-black text-center text-4xl font-normal`}>Signup</h3>
      <form className={`flex flex-col gap-5 my-4`} onSubmit={handleSubmit}>
        <input
          type="text"
          id="full_name"
          className={`h-10 md:w-80 bg-[#CCC5B980] font-sans rounded-md p-2`}
          placeholder="Full Name"
          value={formData.full_name}
          onChange={(e) =>
            setFormData((formData) => ({
              ...formData,
              full_name: e.target.value,
            }))
          }
          required
        />
        <input
          type="email"
          id="email"
          className={`h-10 md:w-80 bg-[#CCC5B980] font-sans rounded-md p-2`}
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData((formData) => ({ ...formData, email: e.target.value }))
          }
          required
        />
        <input
          type="date"
          id="date_of_birth"
          className={`h-10 md:w-80 bg-[#CCC5B980] font-sans rounded-md p-2`}
          placeholder="Date of Birth"
          value={formData.date_of_birth}
          onChange={(e) =>
            setFormData((formData) => ({
              ...formData,
              date_of_birth: e.target.value,
            }))
          }
          min="1900-01-01"
          max={currentDate}
          required
        />
        <input
          type="tel"
          id="phone_number"
          className={`h-10 md:w-80 bg-[#CCC5B980] font-sans rounded-md p-2`}
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={(e) =>
            setFormData((formData) => ({
              ...formData,
              phone_number: e.target.value,
            }))
          }
          required
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
          required
        />
        
        {validate ? 
        <input
          type="submit"
          value="Submit"
          className={`bg-secondary text-primary w-1/2 mx-auto rounded-md h-10`}
        />:
        <button
          value="Submit"
          className={`bg-secondary text-primary w-1/2 mx-auto rounded-md h-10`}
          onClick={validatePasswordPolicies}
        > Validate </button>
      }
        
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

import React from "react";
import { useId } from "react";
const Input = React.forwardRef(function Input(
  {
    label = "Input",
    type = "text",
    className = "",
    placeholder = "enter userinput",
    ...props
  },
  ref
) {
  const id = useId();
  return (
    <>
      {label && (
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        type={type}
        placeholder={placeholder}
        ref={ref}
        id={id}
        {...props}
      ></input>
    </>
  );
});
export default Input;

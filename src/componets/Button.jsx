import React from "react";

const Button = ({
  name,
  type = "button",
  bgcolor = "bg-white",
  hoverbgcolor = "bg-blue-100",
  txtcolor = "text-black",
  hovertxtcolor = "text-gray-300",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`rounded-md  px-3 py-2 text-sm ${txtcolor} hover:${hovertxtcolor} font-semibold ${bgcolor} text-white shadow-sm hover:${hoverbgcolor} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${className}`}
      {...props}
    >
      {name}
    </button>
  );
};

export default Button;

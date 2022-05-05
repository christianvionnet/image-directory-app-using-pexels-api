import React, { FC, InputHTMLAttributes } from "react";

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  type = "text",
  placeholder,
  value,
  name,
  onChange,
}) => {
  return (
    <div>
      <input
        className="input"
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        id={name}
        onChange={onChange}
        required
        autoComplete="off"
      />
    </div>
  );
};

export default Input;

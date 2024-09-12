import React, {  useState } from "react";
import Icon from "./Icon";

interface InputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  bg_color?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  bg_color = "bg-transparent",
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <div className="flex flex-col gap-1">
       {label && ( <label htmlFor={id} className="font-sora font-medium text-sm pl-1">
          {label}:
        </label>)}
        <div className="flex items-center gap-2">
          <input
            type={isPasswordVisible ? "text" : type}
            name={id}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoComplete="off"
            className={`${bg_color} border-line border placeholder:text-sub text-sm font-medium focus-within:border-sub px-4 h-10 w-full rounded-lg`}
          />

          {type === "password" && (
            <div
              onClick={togglePasswordVisibility}
              className="flex-center border cursor-default border-line bg-lighter h-10 min-w-10 rounded-lg"
            >
              <Icon styles="text-sub text-[19px]">
                {isPasswordVisible ? "visibility" : "visibility_off"}
              </Icon>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Input;

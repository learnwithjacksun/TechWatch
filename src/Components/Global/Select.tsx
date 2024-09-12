import React, { ChangeEvent } from "react";
import Icon from "./Icon";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  id: string;
  value?: string;
  options: SelectOption[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  bg_color?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  id,
  value,
  options,
  onChange,
  bg_color = "bg-transparent",
}) => {
  return (
    <div className="flex flex-col gap-1">
     {label && ( <label htmlFor={id} className="font-sora font-medium text-sm pl-1">
        {label}:
      </label>)}
      <div className="relative">
        <select
          name={id}
          id={id}
          value={value}
          onChange={onChange}
          className={`${bg_color} appearance-none border-line border text-sm font-medium focus-within:border-sub px-4 h-10 w-full rounded-lg`}
        >
          <option value="">Pick your {id}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute top-1/2 -translate-y-1/2 right-2 flex-center cursor-default border-line">
          <Icon styles="text-sub">keyboard_arrow_down</Icon>
        </div>
      </div>
    </div>
  );
};

export default Select;

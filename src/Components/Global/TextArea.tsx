import { ChangeEvent } from "react";

interface Props {
  label?: string;
  id: string;
  placeholder: string;
  bg_color?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
const TextArea: React.FC<Props> = ({
  label,
  id,
  placeholder,
  bg_color,
  value,
  onChange,
}) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="font-sora font-medium text-sm pl-1">
            {label}:
          </label>
        )}
              <textarea
                  rows={5}
          name={id}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${bg_color} border-line border placeholder:text-sub text-sm font-medium focus-within:border-sub px-4 pt-3 w-full rounded-lg`}
        ></textarea>
      </div>
    </>
  );
};

export default TextArea;

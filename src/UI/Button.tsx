"use client";

import { IconType } from "react-icons";

type Props = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
};

function Button({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{border:`${outline && '2px solid black'}`,backgroundColor:`${disabled && 'gray'}`}}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${
        outline
          ? "bg-white text-black"
          : "bg-rose-500 border-rose-500 text-white"
      } ${
        small
          ? "text-sm py-1 font-light border-[1px]"
          : "text-md py-3 font-semibold border-2"
      }`}
    >
        {Icon && <Icon size={24} className="absolute left-4 top-3"/>}
        {label}
    </button>
  );
}
export default Button;
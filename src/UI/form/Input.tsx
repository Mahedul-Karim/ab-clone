"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

type Props = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  placeholder?:string;
};

function Input({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
  placeholder
}: Props) {
  return (
    <div className="w-full relative">
      
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={placeholder}
        style={{borderWidth:'2px'}}
        type={type}
        className={`peer w-full p-4 pt-6 font-light bg-white !border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed border-rose-500 focus:border-rose-500 ${
          formatPrice ? "pl-9" : "pl-4"
        } ${
          errors[id]
            ? "border-rose-500 focus:border-rose-500"
            : "border-neutral-500 focus:border-black"
        }`}
      />
      {/* <label
      style={{left:`${formatPrice ? "2.25rem" : "1rem"}`}}
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
          errors[id] ? "text-rose-500" : "text-zinc-400"
        }`}
      >
        {label}
      </label> */}
    </div>
  );
}
export default Input;

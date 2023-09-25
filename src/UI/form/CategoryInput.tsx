"use client";

import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
};

function CategoryInput({ icon: Icon, label, selected, onClick }: Props) {
  return (
    <div
    onClick={()=>onClick(label)}
      style={{
        borderWidth: "2px",
        borderColor: `${selected ? "black" : ""}`,
        
      }}
      className={`rounded-xl p-4 flex flex-col gap-3  hover:border-black transition-all cursor-pointer`}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
}

export default CategoryInput;

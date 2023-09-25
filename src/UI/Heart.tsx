"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../../types";
import useFavourite from "@/hooks/useFavourites";

type Props = {
  listingId: string;
  currentUser?: SafeUser | null;
};

function Heart({ listingId, currentUser }: Props) {
  const {hasFavourite,toggleFavourite} = useFavourite({listingId,currentUser})
  
  
  return (
    <div
      onClick={toggleFavourite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiFillHeart
        size={24}
        fill={`${hasFavourite ? "#f43f5e" : "#737373"}`}
      />
    </div>
  );
}

export default Heart;

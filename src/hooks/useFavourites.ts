import axios from "axios";

import { SafeUser } from "../../types";
import toast from "react-hot-toast";
import { useState } from "react";

type Props = {
  listingId: string;
  currentUser?: SafeUser | null;
};

function useFavourite({ listingId, currentUser }: Props) {
  const [fav, setFav] = useState(currentUser?.favouriteIds || []);

  const toggleFavourite = async function (e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();

    if (!currentUser) {
      return toast.error("Login first to add favourite");
    }

    try {
      let request;

      if (fav.includes(listingId)) {
        setFav((prev) => prev.filter((id) => id !== listingId));

        request = () => axios.delete(`/api/favourites/${listingId}`);
      } else {
        setFav((prev) => [...prev, listingId]);

        request = () => axios.post(`/api/favourites/${listingId}`);
      }

      

      await request();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  let hasFavourite = fav.includes(listingId);

  return {
    hasFavourite,
    toggleFavourite,
  };
}

export default useFavourite;

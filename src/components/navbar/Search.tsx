'use client'

import { BiSearch } from "react-icons/bi";
import SearchModal from "../modal/SearchModal";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import useCountries from "@/hooks/useCountries";
import { differenceInDays } from "date-fns";

function Search() {

  const [searchOpen,setSearchOpen] = useState(false);

  const params = useSearchParams();
  const { getByValue } = useCountries();

  const  locationValue = params?.get('locationValue'); 
  const  startDate = params?.get('startDate');
  const  endDate = params?.get('endDate');
  const  guestCount = params?.get('guestCount');

  const locationLabel = locationValue ? getByValue(locationValue as string)?.label : 'Anywhere'
   

  const durationLabel = () => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return 'Any Week'
  };

  const guestLabel = () => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return 'Add Guests';
  };


  return (
    <>
    <SearchModal searchOpen={searchOpen} setSearchOpen={setSearchOpen}/>
    
    <div
    onClick={()=>setSearchOpen(true)}
      className="border-[1px] 
    w-full 
    md:w-auto 
    py-2 
    rounded-full 
    shadow-sm 
    hover:shadow-md 
    transition 
    cursor-pointer"
    >
      <div
        className="
          flex 
          flex-row 
          items-center 
          justify-between
        "
      >
        <div
          className="
            text-sm 
            font-semibold 
            px-6
          "
        >
          {locationLabel}
        </div>
        <div
          className="
            hidden 
            sm:block 
            text-sm 
            font-semibold 
            px-6 
            border-x-[1px] 
            flex-1 
            text-center
          "
        >
          {durationLabel()}
        </div>
        <div
          className="
            text-sm 
            pl-6 
            pr-2 
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-3
          "
        >
          <div className="hidden sm:block">{guestLabel()}</div>
          <div
            className="
              p-2 
              bg-rose-500 
              rounded-full 
              text-white
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
export default Search;
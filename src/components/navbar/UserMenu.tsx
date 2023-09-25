"use client";

import { useReducer, useState } from "react";
import Avatar from "../Avatar";
import { signOut } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from "./MenuItem";
import SignupModal from "../modal/SignupModal";
import LoginModal from "../modal/LoginModal";
import { User } from "@prisma/client";
import { SafeUser } from "../../../types";
import RentModal from "../modal/RentModal";
import { useRouter } from "next/navigation";

type Props = {
  cUser?: SafeUser | null;
};


function UserMenu({ cUser }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [rentOpen,setRentOpen]=useState(false);


  const router = useRouter();

  const handleRent = function () {
    if (!cUser) {
      setLoginModal(true);
      return;
    }
    setRentOpen(true)
  };

  return (
    <>
      <SignupModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <LoginModal signinOpen={loginModal} setSigninOpen={setLoginModal} />
      <RentModal rentOpen={rentOpen} setRentOpen={setRentOpen}/>
      <div className="relative">
        <div className="flex flex-row items-center gap-3">
          <div
            onClick={handleRent}
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          >
            Airbnb your home
          </div>
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition"
          >
            <AiOutlineMenu />
            <div className="hidden md:block">
              <Avatar src={"/images/placeholder.jpg"} />
            </div>
          </div>
        </div>
        {isOpen && (
          <div
            className="
          absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
          >
            <div className="flex flex-col cursor-pointer">
              {cUser ? (
                <>
                  <MenuItem label="My trips" onClick={() => router.push('/trips')} />
                  <MenuItem label="My favorites" onClick={() => router.push('/favorite')} />
                  <MenuItem label="My reservations" onClick={() => router.push('/reservations')} />
                  <MenuItem label="My properties" onClick={()=>router.push('/properties')} />
                  <MenuItem label="Airbnb your home" onClick={() => {}} />
                  <hr />
                  <MenuItem label="Logout" onClick={() => signOut()} />
                </>
              ) : (
                <>
                  <MenuItem label="Login" onClick={() => setLoginModal(true)} />
                  <MenuItem
                    label="Sign up"
                    onClick={() => setModalOpen(true)}
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default UserMenu;
